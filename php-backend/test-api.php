<?php
// Test login endpoint
$testData = [
    'username' => 'demo',
    'password' => 'demo'
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'http://localhost:8000/login.php');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($testData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "=== TESTING DEMO LOGIN ===\n";
echo "HTTP Code: $httpCode\n";
echo "Response: $response\n\n";

// Test testuser login
$testData2 = [
    'username' => 'testuser',
    'password' => 'password123'
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'http://localhost:8000/login.php');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($testData2));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response2 = curl_exec($ch);
$httpCode2 = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "=== TESTING TESTUSER LOGIN ===\n";
echo "HTTP Code: $httpCode2\n";
echo "Response: $response2\n\n";

// Test registration
$regData = [
    'name' => 'New User',
    'username' => 'newuser',
    'email' => 'newuser@example.com',
    'password' => 'newpassword123',
    'address' => '456 New Street',
    'phone' => '555-123-4567'
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'http://localhost:8000/register.php');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($regData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response3 = curl_exec($ch);
$httpCode3 = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "=== TESTING REGISTRATION ===\n";
echo "HTTP Code: $httpCode3\n";
echo "Response: $response3\n";
