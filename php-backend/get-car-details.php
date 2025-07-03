<?php
require_once 'config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    die(json_encode(["success" => false, "message" => "Method not allowed"]));
}

$carId = isset($_GET['id']) ? $_GET['id'] : null;

if (!$carId) {
    http_response_code(400);
    die(json_encode(["success" => false, "message" => "Car ID is required"]));
}

try {
    $stmt = $pdo->prepare("SELECT cl.*, u.name as seller_name, u.phone as seller_phone, u.email as seller_email 
                          FROM car_listings cl 
                          LEFT JOIN users u ON cl.seller = u.username 
                          WHERE cl.id = ?");
    $stmt->execute([$carId]);
    $car = $stmt->fetch();

    if ($car) {
        echo json_encode([
            "success" => true,
            "car" => $car
        ]);
    } else {
        http_response_code(404);
        echo json_encode([
            "success" => false,
            "message" => "Car not found"
        ]);
    }
} catch (PDOException $e) {
    error_log("Error fetching car details: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to fetch car details"
    ]);
}
