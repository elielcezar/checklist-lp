<?php

/**
 * Relatório simples de monitoramento.
 * Acesso: /checklist/report?key=SUA_CHAVE (definida em config.php)
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

/* Download do arquivo bruto */
if (isset($_GET['download']) && $_GET['download'] === '1') {
  if (!is_file($file)) {
    http_response_code(404);
    echo 'Nenhum dado registrado ainda.';
    exit;
  }
  header('Content-Type: application/x-ndjson; charset=utf-8');
  header('Content-Disposition: attachment; filename="events.jsonl"');
  readfile($file);
  exit;
}

/* Agrega estatísticas */
$item_checks = array();
$item_unchecks = array();
$downloads_by_format = array('png' => 0, 'pdf' => 0);
$downloads_by_category = array();
$recent_downloads = array();
$total_events = 0;

if (is_file($file)) {
  $handle = fopen($file, 'r');
  if ($handle) {
    while (($line = fgets($handle)) !== FALSE) {
      $line = trim($line);
      if ($line === '') {
        continue;
      }
      $rec = json_decode($line, TRUE);
      if (!is_array($rec) || !isset($rec['event']['type'])) {
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
    fclose($handle);
  }
}

arsort($item_checks);
arsort($downloads_by_category);

/* Diagnóstico (adicione &diag=1 na URL) */
$diag = isset($_GET['diag']) && $_GET['diag'] === '1';
$data_dir = __DIR__ . '/data';
if (!is_dir($data_dir)) {
  @mkdir($data_dir, 0775, TRUE);
}
$data_writable = is_dir($data_dir) && is_writable($data_dir);
$file_exists = is_file($file);
$file_size = $file_exists ? filesize($file) : 0;
$track_url = str_replace('report.php', 'track.php', $_SERVER['SCRIPT_NAME']);

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
  <title>Relatório — Guia do Comerciante</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; margin: 0; padding: 24px; background: #f4f6fb; color: #1a1a2e; }
    h1 { margin: 0 0 8px; font-size: 1.5rem; color: #003ca8; }
    .meta { color: #666; margin-bottom: 24px; font-size: 0.9rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 28px; }
    .card { background: #fff; border-radius: 10px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,.08); }
    .card h2 { margin: 0 0 14px; font-size: 1rem; color: #ea5b0c; }
    table { width: 100%; border-collapse: collapse; font-size: 0.88rem; }
    th, td { text-align: left; padding: 8px 6px; border-bottom: 1px solid #eee; vertical-align: top; }
    th { font-weight: 600; color: #555; }
    .num { text-align: right; white-space: nowrap; font-weight: 700; color: #003ca8; }
    .btn { display: inline-block; margin-bottom: 20px; padding: 10px 18px; background: #003ca8; color: #fff; text-decoration: none; border-radius: 6px; font-size: 0.9rem; }
    .btn:hover { background: #002d7a; }
    .empty { color: #999; font-style: italic; }
    .items-list { margin: 4px 0 0; padding-left: 18px; font-size: 0.82rem; color: #444; }
    .stat-big { font-size: 2rem; font-weight: 800; color: #003ca8; }
    .ok { color: #0a7a2f; font-weight: 700; }
    .fail { color: #c00; font-weight: 700; }
    code { background: #eee; padding: 2px 6px; border-radius: 4px; font-size: 0.85rem; word-break: break-all; }
    #diag-result { margin-top: 12px; font-size: 0.9rem; }
  </style>
</head>
<body>
  <h1>Relatório de Monitoramento</h1>
  <p class="meta">Guia Prático do Comerciante Campeão — <?php echo h(date('d/m/Y H:i')); ?></p>

  <a class="btn" href="?key=<?php echo h($key); ?>&amp;download=1">Baixar events.jsonl</a>
  <?php if (!$diag): ?>
    <a class="btn" href="?key=<?php echo h($key); ?>&amp;diag=1" style="background:#ea5b0c">Diagnóstico</a>
  <?php endif; ?>

  <?php if ($diag): ?>
  <div class="card" style="margin:20px 0;border:2px solid #ea5b0c">
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
      <p>eventos registrados</p>
      <p>Downloads PNG: <strong><?php echo (int) (isset($downloads_by_format['png']) ? $downloads_by_format['png'] : 0); ?></strong></p>
      <p>Downloads PDF: <strong><?php echo (int) (isset($downloads_by_format['pdf']) ? $downloads_by_format['pdf'] : 0); ?></strong></p>
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

  <div class="card" style="margin-bottom:28px">
    <h2>Itens mais marcados (cliques com checked=true)</h2>
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
    <h2>Últimos downloads (até 50)</h2>
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
</body>
</html>
