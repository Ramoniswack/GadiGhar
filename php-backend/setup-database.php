<?php
$host = 'localhost';
$username = 'root';
$password = '';

try {
    // First connect without a database to create it
    $pdo = new PDO("mysql:host=$host", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Read and execute the SQL file
    $sql = file_get_contents('database_setup.sql');

    echo "Starting database setup...\n";

    // Split the SQL file into individual statements
    $statements = array_filter(array_map('trim', explode(';', $sql)));

    foreach ($statements as $statement) {
        if (empty($statement)) continue;

        try {
            echo "Executing: " . substr($statement, 0, 50) . "...\n";
            $pdo->exec($statement);
            echo "Success!\n";
        } catch (PDOException $e) {
            echo "Error executing statement: " . $e->getMessage() . "\n";
            echo "Statement was: $statement\n";
        }
    }

    echo "\nDatabase setup completed successfully!\n";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage() . "\n";
}
