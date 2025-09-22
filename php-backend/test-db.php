<?php
// Test database connection
require_once 'config/database.php';

try {
    // Test basic connection
    echo " Database connection successful!\n";

    // Check if tables exist
    $stmt = $pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    echo " Tables found: " . implode(', ', $tables) . "\n";

    // Check users table
    if (in_array('users', $tables)) {
        $stmt = $pdo->query("SELECT COUNT(*) FROM users");
        $userCount = $stmt->fetchColumn();
        echo "👥 Users in database: " . $userCount . "\n";

        // Show user data
        $stmt = $pdo->query("SELECT username, email FROM users");
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo " User accounts:\n";
        foreach ($users as $user) {
            echo "  - " . $user['username'] . " (" . $user['email'] . ")\n";
        }
    }

    // Check car_listings table
    if (in_array('car_listings', $tables)) {
        $stmt = $pdo->query("SELECT COUNT(*) FROM car_listings");
        $carCount = $stmt->fetchColumn();
        echo " Cars in database: " . $carCount . "\n";
    }
} catch (PDOException $e) {
    echo " Database error: " . $e->getMessage() . "\n";
}
