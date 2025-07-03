<?php
require_once 'config/database.php';

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || empty($input['username']) || empty($input['password'])) {
    echo json_encode(['success' => false, 'message' => 'Username and password are required']);
    exit;
}

$username = trim($input['username']);
$password = $input['password'];

try {
    // Demo user check (for development only - remove in production)
    if ($username === 'demo' && $password === 'demo') {
        echo json_encode([
            'success' => true,
            'user' => [
                'id' => 'demo',
                'name' => 'Demo User',
                'username' => 'demo',
                'email' => 'demo@example.com',
                'address' => '123 Demo Street',
                'phone' => '(555) 123-4567'
            ],
            'token' => 'demo_token_' . time() // Simple token for demo
        ]);
        exit;
    }

    // Regular user check
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        // For debugging
        error_log("User found: " . $user['username']);
        error_log("Stored hash: " . $user['password_hash']);
        error_log("Attempting to verify password...");

        $verified = password_verify($password, $user['password_hash']);
        error_log("Password verification result: " . ($verified ? "SUCCESS" : "FAILED"));

        if (!$verified) {
            error_log("DEBUG: Input password length: " . strlen($password));
            error_log("DEBUG: Hash format check: " . (strpos($user['password_hash'], '$2y$') === 0 ? "Valid bcrypt" : "Invalid format"));
        }
    } else {
        error_log("No user found with username: " . $username);
    }

    if ($user && $verified) {
        error_log("Password verified successfully!");
        // Generate a simple session token (in production, use JWT or proper session management)
        $token = bin2hex(random_bytes(32));

        echo json_encode([
            'success' => true,
            'user' => [
                'id' => $user['id'],
                'name' => $user['name'],
                'username' => $user['username'],
                'email' => $user['email'],
                'address' => $user['address'],
                'phone' => $user['phone']
            ],
            'token' => $token
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid username or password']);
    }
} catch (PDOException $e) {
    error_log("Login error: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Login failed. Please try again.']);
}
