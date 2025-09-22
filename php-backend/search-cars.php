<?php
require_once 'config/database.php';

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    echo json_encode([]);
    exit;
}

try {
    $query = "SELECT * FROM car_listings WHERE 1=1";
    $params = [];

    // Filter by make/model with input sanitization
    if (!empty($input['model'])) {
        $searchTerm = trim($input['model']);
        if (strlen($searchTerm) > 0) {
            $query .= " AND (make LIKE ? OR model LIKE ?)";
            $searchPattern = '%' . $searchTerm . '%';
            $params[] = $searchPattern;
            $params[] = $searchPattern;
        }
    }

    // Filter by location
    if (!empty($input['location'])) {
        $location = trim($input['location']);
        if (strlen($location) > 0) {
            $query .= " AND location LIKE ?";
            $params[] = '%' . $location . '%';
        }
    }

    // Filter by max price
    if (!empty($input['maxPrice']) && is_numeric($input['maxPrice'])) {
        $maxPrice = (int)$input['maxPrice'];
        if ($maxPrice > 0) {
            $query .= " AND price <= ?";
            $params[] = $maxPrice;
        }
    }

    // Filter by min year
    if (!empty($input['minYear']) && is_numeric($input['minYear'])) {
        $minYear = (int)$input['minYear'];
        if ($minYear >= 1900 && $minYear <= (date('Y') + 1)) {
            $query .= " AND year >= ?";
            $params[] = $minYear;
        }
    }

    $query .= " ORDER BY id DESC";

    $stmt = $pdo->prepare($query);
    $stmt->execute($params);
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
    error_log("Search cars error: " . $e->getMessage());
    echo json_encode([]);
}
?>
'make' => $car['make'],
'model' => $car['model'],
'year' => (int)$car['year'],
'mileage' => (int)$car['mileage'],
'location' => $car['location'],
'price' => (int)$car['price'],
'seller' => $car['seller']
];
}, $cars);

echo json_encode($formattedCars);
} catch(PDOException $e) {
echo json_encode([]);
}
?>