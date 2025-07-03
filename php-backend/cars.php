<?php
require_once 'config/database.php';

try {
    $stmt = $pdo->query("SELECT * FROM car_listings ORDER BY id DESC");
    $cars = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Convert to match your CarListing interface
    $formattedCars = array_map(function ($car) {
        return [
            'id' => (string)$car['id'],
            'make' => htmlspecialchars($car['make']),
            'model' => htmlspecialchars($car['model']),
            'year' => (int)$car['year'],
            'mileage' => (int)$car['mileage'],
            'location' => htmlspecialchars($car['location']),
            'price' => (int)$car['price'],
            'seller' => htmlspecialchars($car['seller'])
        ];
    }, $cars);

    echo json_encode($formattedCars);
} catch (PDOException $e) {
    error_log("Get cars error: " . $e->getMessage());
    echo json_encode([]);
}
