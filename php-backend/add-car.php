<?php
require_once 'config/database.php';

// Simple authentication check (in production, use proper JWT validation)
function validateAuth($headers)
{
    if (isset($headers['Authorization'])) {
        $token = str_replace('Bearer ', '', $headers['Authorization']);
        // For demo purposes, accept any non-empty token
        // In production, validate JWT or session token properly
        return !empty($token);
    }
    return false;
}

// Input validation
function validateCarData($data)
{
    $errors = [];

    if (empty($data['make']) || strlen(trim($data['make'])) < 2) {
        $errors[] = 'Make is required and must be at least 2 characters';
    }

    if (empty($data['model']) || strlen(trim($data['model'])) < 1) {
        $errors[] = 'Model is required';
    }

    if (!isset($data['year']) || !is_numeric($data['year']) || $data['year'] < 1900 || $data['year'] > (date('Y') + 1)) {
        $errors[] = 'Valid year is required';
    }

    if (!isset($data['mileage']) || !is_numeric($data['mileage']) || $data['mileage'] < 0) {
        $errors[] = 'Valid mileage is required';
    }

    if (empty($data['location']) || strlen(trim($data['location'])) < 3) {
        $errors[] = 'Location is required and must be at least 3 characters';
    }

    if (!isset($data['price']) || !is_numeric($data['price']) || $data['price'] <= 0) {
        $errors[] = 'Valid price is required';
    }

    if (empty($data['seller']) || strlen(trim($data['seller'])) < 2) {
        $errors[] = 'Seller information is required';
    }

    return $errors;
}

$headers = getallheaders();
if (!validateAuth($headers)) {
    echo json_encode(['success' => false, 'message' => 'Authentication required']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
    exit;
}

$errors = validateCarData($input);
if (!empty($errors)) {
    echo json_encode(['success' => false, 'message' => implode(', ', $errors)]);
    exit;
}

$make = trim($input['make']);
$model = trim($input['model']);
$year = (int)$input['year'];
$mileage = (int)$input['mileage'];
$location = trim($input['location']);
$price = (int)$input['price'];
$seller = trim($input['seller']);

try {
    $stmt = $pdo->prepare("INSERT INTO car_listings (make, model, year, mileage, location, price, seller) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$make, $model, $year, $mileage, $location, $price, $seller]);

    $carId = $pdo->lastInsertId();

    $newCar = [
        'id' => (string)$carId,
        'make' => $make,
        'model' => $model,
        'year' => $year,
        'mileage' => $mileage,
        'location' => $location,
        'price' => $price,
        'seller' => $seller
    ];

    echo json_encode(['success' => true, 'car' => $newCar]);
} catch (PDOException $e) {
    error_log("Add car error: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Failed to add car listing. Please try again.']);
}
