<?php
require_once 'config/database.php';

try {
    // Generate new password hash
    $password = 'password123';
    $hash = password_hash($password, PASSWORD_DEFAULT);

    // Update user password
    $stmt = $pdo->prepare("UPDATE users SET password_hash = ? WHERE username = 'testuser'");
    $stmt->execute([$hash]);

    echo "Password updated successfully!\n";
    echo "You can now login with:\n";
    echo "Username: testuser\n";
    echo "Password: password123\n";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
