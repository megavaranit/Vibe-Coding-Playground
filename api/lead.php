<?php
/**
 * Приём заявок с формы /#leads.
 * Сохраняет JSON-строку в data/leads.jsonl и отдаёт 200 OK.
 */
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header('Access-Control-Allow-Methods: POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type, Accept');
  http_response_code(204);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
  exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!is_array($data)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Invalid JSON']);
  exit;
}

$name = trim((string)($data['name'] ?? ''));
$phone = trim((string)($data['phone'] ?? ''));
$email = trim((string)($data['email'] ?? ''));
$service = trim((string)($data['service'] ?? ''));
$message = trim((string)($data['message'] ?? ''));

$phoneDigits = preg_replace('/[^\d+]/', '', $phone);
$nameLen = function_exists('mb_strlen') ? mb_strlen($name) : strlen($name);
$phoneLen = function_exists('mb_strlen') ? mb_strlen($phoneDigits) : strlen($phoneDigits);

if ($nameLen < 2 || $phoneLen < 10 || $service === '') {
  http_response_code(422);
  echo json_encode(['ok' => false, 'error' => 'Validation failed']);
  exit;
}

$entry = [
  'id' => bin2hex(random_bytes(8)),
  'name' => $name,
  'phone' => $phone,
  'email' => $email,
  'service' => $service,
  'message' => $message,
  'createdAt' => $data['createdAt'] ?? gmdate('c'),
  'source' => $data['source'] ?? '',
  'ip' => $_SERVER['REMOTE_ADDR'] ?? '',
  'ua' => substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 240),
];

$dir = __DIR__ . '/data';
if (!is_dir($dir) && !mkdir($dir, 0750, true) && !is_dir($dir)) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Storage unavailable']);
  exit;
}

$file = $dir . '/leads.jsonl';
$line = json_encode($entry, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . PHP_EOL;

if (file_put_contents($file, $line, FILE_APPEND | LOCK_EX) === false) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Write failed']);
  exit;
}

http_response_code(200);
echo json_encode(['ok' => true, 'id' => $entry['id']]);
