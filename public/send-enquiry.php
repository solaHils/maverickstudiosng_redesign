<?php
// Receives the contact form (JSON) and emails it to the studio inbox.
header('Content-Type: application/json');

// Addresses live in send-enquiry.config.php, which is not committed.
// Copy send-enquiry.config.example.php to send-enquiry.config.php and fill it in.
$configFile = __DIR__ . '/send-enquiry.config.php';
if (!is_file($configFile)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Form is not configured']);
    exit;
}
require $configFile; // defines TO_EMAIL and FROM_EMAIL

function fail($code, $msg) {
    http_response_code($code);
    echo json_encode(['ok' => false, 'error' => $msg]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') fail(405, 'Method not allowed');

$data = json_decode(file_get_contents('php://input'), true);
if (!is_array($data)) fail(400, 'Invalid request');

// Spam trap: real visitors never fill the hidden field
if (!empty($data['website'])) {
    echo json_encode(['ok' => true]);
    exit;
}

// Strip line breaks so nothing can inject extra mail headers
function clean($v, $max) {
    $v = is_string($v) ? trim($v) : '';
    return mb_substr(str_replace(["\r", "\n"], ' ', $v), 0, $max);
}

$name    = clean($data['name'] ?? '', 100);
$email   = clean($data['email'] ?? '', 150);
$company = clean($data['company'] ?? '', 150);
$type    = clean($data['projectType'] ?? '', 50);
$message = is_string($data['message'] ?? null) ? trim(mb_substr($data['message'], 0, 5000)) : '';

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail(422, 'Please fill in your name, a valid email and a message.');
}

$subject = "Website enquiry from $name" . ($type ? " ($type)" : '');
$body = "Name: $name\nEmail: $email\nCompany: " . ($company ?: '-') . "\nProject type: " . ($type ?: '-') . "\n\n$message\n";

$headers = [
    'From: Maverick Studios Website <' . FROM_EMAIL . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'Content-Type: text/plain; charset=UTF-8',
];

if (!mail(TO_EMAIL, $subject, $body, implode("\r\n", $headers))) {
    fail(500, 'Could not send message');
}

echo json_encode(['ok' => true]);
