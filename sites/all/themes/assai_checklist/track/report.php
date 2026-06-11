<?php

/**
 * Relatório de monitoramento — Guia do Comerciante Campeão.
 * Acesso: report.php?key=SUA_CHAVE (definida em config.php)
 */

require_once __DIR__ . '/config.php';

$key = isset($_GET['key']) ? $_GET['key'] : '';
if ($key !== ASSAI_CHECKLIST_REPORT_KEY) {
  http_response_code(403);
  header('Content-Type: text/plain; charset=utf-8');
  echo 'Acesso negado.';
  exit;
}

$file = __DIR__ . '/data/events.jsonl';

/**
 * Lê todos os eventos do arquivo JSONL.
 */
function assai_report_load_events($file) {
  $rows = array();
  if (!is_file($file)) {
    return $rows;
  }
  $handle = fopen($file, 'r');
  if (!$handle) {
    return $rows;
  }
  while (($line = fgets($handle)) !== FALSE) {
    $line = trim($line);
    if ($line === '') {
      continue;
    }
    $rec = json_decode($line, TRUE);
    if (is_array($rec)) {
      $rows[] = $rec;
    }
  }
  fclose($handle);
  return $rows;
}

/* Download CSV */
if (isset($_GET['download']) && $_GET['download'] === 'csv') {
  $events = assai_report_load_events($file);
  if (empty($events)) {
    http_response_code(404);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Nenhum dado registrado ainda.';
    exit;
  }

  header('Content-Type: text/csv; charset=utf-8');
  header('Content-Disposition: attachment; filename="checklist-eventos-' . date('Y-m-d') . '.csv"');
  echo "\xEF\xBB\xBF";

  $out = fopen('php://output', 'w');
  fputcsv($out, array(
    'data_hora',
    'ipid',
    'tipo',
    'categoria',
    'secao',
    'titulo',
    'marcado',
    'formato',
    'qtd_itens',
    'itens',
  ), ';');

  foreach ($events as $rec) {
    if (!isset($rec['event']['type'])) {
      continue;
    }
    $ev = $rec['event'];
    $items = '';
    if (!empty($ev['items']) && is_array($ev['items'])) {
      $items = implode(' | ', $ev['items']);
    }
    fputcsv($out, array(
      isset($rec['ts']) ? $rec['ts'] : '',
      isset($rec['ipid']) ? $rec['ipid'] : '',
      isset($ev['type']) ? $ev['type'] : '',
      isset($ev['category']) ? $ev['category'] : '',
      isset($ev['section']) ? $ev['section'] : '',
      isset($ev['title']) ? $ev['title'] : '',
      isset($ev['checked']) ? ($ev['checked'] ? 'sim' : 'nao') : '',
      isset($ev['format']) ? $ev['format'] : '',
      isset($ev['count']) ? (int) $ev['count'] : '',
      $items,
    ), ';');
  }

  fclose($out);
  exit;
}

/* Agrega estatísticas */
$item_checks = array();
$item_unchecks = array();
$downloads_by_format = array('png' => 0, 'pdf' => 0);
$downloads_by_category = array();
$recent_downloads = array();
$total_events = 0;

$events = assai_report_load_events($file);
foreach ($events as $rec) {
  if (!isset($rec['event']['type'])) {
    continue;
  }
  $total_events++;
  $ev = $rec['event'];
  $ts = isset($rec['ts']) ? $rec['ts'] : '';

  if ($ev['type'] === 'item_toggle') {
    $label = (isset($ev['category']) ? $ev['category'] : '') . ' › ' . (isset($ev['title']) ? $ev['title'] : '');
    if (!empty($ev['checked'])) {
      if (!isset($item_checks[$label])) {
        $item_checks[$label] = 0;
      }
      $item_checks[$label]++;
    }
    else {
      if (!isset($item_unchecks[$label])) {
        $item_unchecks[$label] = 0;
      }
      $item_unchecks[$label]++;
    }
  }
  elseif ($ev['type'] === 'download') {
    $fmt = isset($ev['format']) ? $ev['format'] : 'unknown';
    if (!isset($downloads_by_format[$fmt])) {
      $downloads_by_format[$fmt] = 0;
    }
    $downloads_by_format[$fmt]++;

    $cat = isset($ev['category']) ? $ev['category'] : '(sem categoria)';
    if (!isset($downloads_by_category[$cat])) {
      $downloads_by_category[$cat] = 0;
    }
    $downloads_by_category[$cat]++;

    array_unshift($recent_downloads, array(
      'ts' => $ts,
      'format' => $fmt,
      'category' => $cat,
      'count' => isset($ev['count']) ? (int) $ev['count'] : 0,
      'items' => isset($ev['items']) && is_array($ev['items']) ? $ev['items'] : array(),
    ));
    if (count($recent_downloads) > 50) {
      array_pop($recent_downloads);
    }
  }
}

arsort($item_checks);
arsort($downloads_by_category);

/* Diagnóstico */
$diag = isset($_GET['diag']) && $_GET['diag'] === '1';
$data_dir = __DIR__ . '/data';
if (!is_dir($data_dir)) {
  @mkdir($data_dir, 0775, TRUE);
}
$data_writable = is_dir($data_dir) && is_writable($data_dir);
$file_exists = is_file($file);
$file_size = $file_exists ? filesize($file) : 0;
$track_url = str_replace('report.php', 'track.php', $_SERVER['SCRIPT_NAME']);
$logo_url = str_replace('/track/report.php', '/images/logo-assai.png', $_SERVER['SCRIPT_NAME']);

function h($s) {
  return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
}

header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Relatório — Guia do Comerciante | Assaí</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,700;9..40,800&family=Montserrat:wght@700;800;900&display=swap" rel="stylesheet" />
  <style>
    :root {
      --blue-bg: #003ca8;
      --blue-deep: #00215d;
      --orange: #ff7300;
      --yellow: #ffde00;
      --display: "Montserrat", "Arial Black", sans-serif;
      --body: "DM Sans", system-ui, sans-serif;
    }
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      min-height: 100%;
      font-family: var(--body);
      color: #fff;
      background: var(--blue-bg);
    }
    body::before {
      content: "";
      position: fixed;
      inset: 0;
      pointer-events: none;
      background-image: repeating-radial-gradient(circle at 50% 0%,
        rgba(255,255,255,0.04) 0px,
        rgba(255,255,255,0.04) 2px,
        transparent 3px,
        transparent 132px);
      z-index: 0;
    }
    .stage {
      position: relative;
      z-index: 1;
      max-width: 1100px;
      margin: 0 auto;
      padding: 32px 20px 64px;
    }
    .header {
      text-align: center;
      margin-bottom: 32px;
    }
    .header__logo {
      width: 120px;
      height: auto;
      margin-bottom: 16px;
    }
    .header h1 {
      margin: 0 0 8px;
      font-family: var(--display);
      font-weight: 800;
      font-size: clamp(1.4rem, 4vw, 2rem);
      color: var(--yellow);
      text-transform: uppercase;
      letter-spacing: -0.02em;
    }
    .header .meta {
      margin: 0;
      font-size: 0.95rem;
      color: rgba(255,255,255,0.85);
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      justify-content: center;
      margin-bottom: 28px;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 14px 28px;
      background: var(--orange);
      color: #fff;
      text-decoration: none;
      border: 0;
      border-radius: 50px;
      font-family: var(--display);
      font-weight: 700;
      font-size: 0.95rem;
      cursor: pointer;
      box-shadow: 0 6px 0 rgba(0,0,0,0.18);
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 7px 0 rgba(0,0,0,0.2);
    }
    .btn--ghost {
      background: transparent;
      border: 2px solid rgba(255,255,255,0.5);
      box-shadow: none;
    }
    .btn--ghost:hover {
      background: rgba(255,255,255,0.08);
      box-shadow: none;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-bottom: 24px;
    }
    .card {
      background: #fff;
      border-radius: 20px;
      padding: 24px;
      color: #1a1a2e;
      box-shadow: 0 8px 32px rgba(0,0,0,0.15);
    }
    .card h2 {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 0 0 18px;
      font-family: var(--display);
      font-weight: 800;
      font-size: 0.85rem;
      color: var(--orange);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .card h2::before {
      content: "";
      flex: 0 0 36px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--orange);
    }
    .card--diag {
      border: 3px solid var(--orange);
      margin-bottom: 24px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.88rem;
    }
    th, td {
      text-align: left;
      padding: 10px 8px;
      border-bottom: 1px solid #e8ecf4;
      vertical-align: top;
    }
    th {
      font-weight: 700;
      color: var(--blue-deep);
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    .num {
      text-align: right;
      white-space: nowrap;
      font-weight: 800;
      color: var(--blue-bg);
    }
    .empty {
      color: #888;
      font-style: italic;
      margin: 0;
    }
    .items-list {
      margin: 4px 0 0;
      padding-left: 18px;
      font-size: 0.82rem;
      color: #444;
    }
    .stat-big {
      margin: 0;
      font-family: var(--display);
      font-size: 2.8rem;
      font-weight: 900;
      color: var(--blue-bg);
      line-height: 1;
    }
    .stat-label {
      margin: 4px 0 16px;
      color: #666;
      font-size: 0.9rem;
    }
    .stat-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #eee;
      font-size: 0.9rem;
    }
    .stat-row strong {
      color: var(--blue-bg);
      font-weight: 800;
    }
    .ok { color: #0a7a2f; font-weight: 700; }
    .fail { color: #c00; font-weight: 700; }
    code {
      background: #f0f4fa;
      padding: 2px 8px;
      border-radius: 6px;
      font-size: 0.82rem;
      word-break: break-all;
      color: var(--blue-deep);
    }
    #diag-result { margin-top: 12px; font-size: 0.9rem; }
    @media (max-width: 600px) {
      .stage { padding: 20px 14px 48px; }
      .card { padding: 18px; border-radius: 16px; }
    }
  </style>
</head>
<body>
  <div class="stage">

    <header class="header">
      <img class="header__logo" src="<?php echo h($logo_url); ?>" alt="Assaí Atacadista" />
      <h1>Relatório de Monitoramento</h1>
      <p class="meta">Guia Prático do Comerciante Campeão — <?php echo h(date('d/m/Y H:i')); ?></p>
    </header>

    <div class="actions">
      <a class="btn" href="?key=<?php echo h($key); ?>&amp;download=csv">Baixar CSV</a>
      <?php if (!$diag): ?>
        <a class="btn btn--ghost" href="?key=<?php echo h($key); ?>&amp;diag=1">Diagnóstico</a>
      <?php endif; ?>
    </div>

    <?php if ($diag): ?>
    <div class="card card--diag">
      <h2>Diagnóstico do tracking</h2>
      <table>
        <tr><th>Pasta data/</th><td><?php echo $data_writable ? '<span class="ok">gravável</span>' : '<span class="fail">SEM permissão de escrita</span>'; ?></td></tr>
        <tr><th>Caminho data/</th><td><code><?php echo h($data_dir); ?></code></td></tr>
        <tr><th>events.jsonl</th><td><?php echo $file_exists ? 'existe (' . (int) $file_size . ' bytes)' : 'ainda não criado'; ?></td></tr>
        <tr><th>Endpoint track.php</th><td><code><?php echo h($track_url); ?></code></td></tr>
        <tr><th>URL da LP (debug)</th><td><code>https://www.assai.com.br/checklist/?track_debug=1</code></td></tr>
      </table>
      <p style="margin-top:16px">
        <button type="button" class="btn" id="btn-test-track" style="margin:0">Enviar evento de teste</button>
      </p>
      <div id="diag-result"></div>
      <script>
      (function () {
        var btn = document.getElementById('btn-test-track');
        var out = document.getElementById('diag-result');
        var trackUrl = <?php echo json_encode($track_url); ?>;
        btn.addEventListener('click', function () {
          out.textContent = 'Enviando...';
          fetch(trackUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'item_toggle', category: 'TESTE', section: 'diag', title: 'Evento de teste', checked: true })
          })
          .then(function (r) { return r.text().then(function (t) { out.innerHTML = 'HTTP ' + r.status + ': <code>' + t + '</code>'; location.reload(); }); })
          .catch(function (e) { out.innerHTML = '<span class="fail">Erro: ' + e + '</span>'; });
        });
      })();
      </script>
    </div>
    <?php endif; ?>

    <div class="grid">
      <div class="card">
        <h2>Resumo</h2>
        <p class="stat-big"><?php echo (int) $total_events; ?></p>
        <p class="stat-label">eventos registrados</p>
        <div class="stat-row"><span>Downloads PNG</span><strong><?php echo (int) (isset($downloads_by_format['png']) ? $downloads_by_format['png'] : 0); ?></strong></div>
        <div class="stat-row"><span>Downloads PDF</span><strong><?php echo (int) (isset($downloads_by_format['pdf']) ? $downloads_by_format['pdf'] : 0); ?></strong></div>
      </div>
      <div class="card">
        <h2>Downloads por categoria</h2>
        <?php if (empty($downloads_by_category)): ?>
          <p class="empty">Nenhum download ainda.</p>
        <?php else: ?>
          <table>
            <thead><tr><th>Categoria</th><th class="num">Total</th></tr></thead>
            <tbody>
              <?php foreach ($downloads_by_category as $cat => $n): ?>
                <tr><td><?php echo h($cat); ?></td><td class="num"><?php echo (int) $n; ?></td></tr>
              <?php endforeach; ?>
            </tbody>
          </table>
        <?php endif; ?>
      </div>
    </div>

    <div class="card" style="margin-bottom:24px">
      <h2>Itens mais marcados</h2>
      <?php if (empty($item_checks)): ?>
        <p class="empty">Nenhum item marcado ainda.</p>
      <?php else: ?>
        <table>
          <thead><tr><th>Item</th><th class="num">Marcações</th></tr></thead>
          <tbody>
            <?php foreach (array_slice($item_checks, 0, 30, TRUE) as $label => $n): ?>
              <tr><td><?php echo h($label); ?></td><td class="num"><?php echo (int) $n; ?></td></tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      <?php endif; ?>
    </div>

    <div class="card">
      <h2>Últimos downloads</h2>
      <?php if (empty($recent_downloads)): ?>
        <p class="empty">Nenhum download ainda.</p>
      <?php else: ?>
        <table>
          <thead>
            <tr>
              <th>Data/hora</th>
              <th>Formato</th>
              <th>Categoria</th>
              <th class="num">Itens</th>
              <th>Lista</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($recent_downloads as $dl): ?>
              <tr>
                <td><?php echo h($dl['ts']); ?></td>
                <td><?php echo h(strtoupper($dl['format'])); ?></td>
                <td><?php echo h($dl['category']); ?></td>
                <td class="num"><?php echo (int) $dl['count']; ?></td>
                <td>
                  <?php if (!empty($dl['items'])): ?>
                    <ul class="items-list">
                      <?php foreach ($dl['items'] as $item): ?>
                        <li><?php echo h($item); ?></li>
                      <?php endforeach; ?>
                    </ul>
                  <?php else: ?>
                    —
                  <?php endif; ?>
                </td>
              </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      <?php endif; ?>
    </div>

  </div>
</body>
</html>
