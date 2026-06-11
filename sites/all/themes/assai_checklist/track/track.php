<?php

/**
 * Endpoint de monitoramento — grava eventos em data/events.jsonl.
 * Aceita apenas POST com JSON.
 */

require_once __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo '{"ok":false,"error":"method_not_allowed"}';
  exit;
}

$raw = file_get_contents('php://input');
if ($raw === '' || strlen($raw) > 16384) {
  http_response_code(400);
  echo '{"ok":false,"error":"invalid_payload"}';
  exit;
}

$d = json_decode($raw, TRUE);
$allowed = array('item_toggle', 'download');

$event_type = isset($d['type']) ? $d['type'] : '';
if (!is_array($d) || !in_array($event_type, $allowed, TRUE)) {
  http_response_code(400);
  echo '{"ok":false,"error":"invalid_event"}';
  exit;
}

$remote_addr = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '';
$ip_hash = substr(hash('sha256', $remote_addr . '|' . ASSAI_CHECKLIST_IP_SALT), 0, 12);

$rec = array(
  'ts' => date('c'),
  'ipid' => $ip_hash,
  'event' => $d,
);

$dir = __DIR__ . '/data';
if (!is_dir($dir)) {
  @mkdir($dir, 0775, TRUE);
}

$file = $dir . '/events.jsonl';
$line = json_encode($rec, JSON_UNESCAPED_UNICODE) . "\n";

if (@file_put_contents($file, $line, FILE_APPEND | LOCK_EX) === FALSE) {
  http_response_code(500);
  echo '{"ok":false,"error":"write_failed"}';
  exit;
}

echo '{"ok":true}';
exit;
