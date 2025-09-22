<?php
// Test database connection (CLI version)
$host = 'localhost';
$dbname = 'carsales_db';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    echo " Database connection successful!\n";

    // Check if tables exist
    $stmt = $pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    echo " Tables found: " . implode(', ', $tables) . "\n";

    // Check users table
    if (in_array('users', $tables)) {
        $stmt = $pdo->query("SELECT COUNT(*) FROM users");
        $userCount = $stmt->fetchColumn();
        echo " Users in database: " . $userCount . "\n";

        // Show user data
        $stmt = $pdo->query("SELECT username, email FROM users");
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo " User accounts:\n";
        foreach ($users as $user) {
            echo "  - " . $user['username'] . " (" . $user['email'] . ")\n";
        }
    }
} catch (PDOException $e) {
    echo " Database error: " . $e->getMessage() . "\n";
    echo " Make sure:\n";
    echo "   1. XAMPP/WAMP MySQL is running\n";
    echo "   2. PHP has PDO MySQL extension enabled\n";
    echo "   3. Database 'carsales_db' exists\n";
}
