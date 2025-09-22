<?php
require_once 'config/database.php';

// Input validation function
function validateInput($data)
{
    $errors = [];

    if (empty($data['name']) || strlen($data['name']) < 2) {
        $errors[] = 'Name must be at least 2 characters long';
    }

    if (empty($data['username']) || strlen($data['username']) < 3) {
        $errors[] = 'Username must be at least 3 characters long';
    }

    if (empty($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Valid email is required';
    }

    if (empty($data['password']) || strlen($data['password']) < 6) {
        $errors[] = 'Password must be at least 6 characters long';
    }

    return $errors;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
    exit;
}

// Validate input
$errors = validateInput($input);
if (!empty($errors)) {
    echo json_encode(['success' => false, 'message' => implode(', ', $errors)]);
    exit;
}

$name = trim($input['name']);
$username = trim($input['username']);
$email = trim($input['email']);
$password = $input['password'];
$address = isset($input['address']) ? trim($input['address']) : '';
$phone = isset($input['phone']) ? trim($input['phone']) : '';

try {
    error_log("[Register] Starting registration process for username: " . $username);
    error_log("[Register] Input data: " . json_encode([
        'name' => $name,
        'username' => $username,
        'email' => $email,
        'address' => $address,
        'phone' => $phone
    ]));

    // Check if username already exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
    $stmt->execute([$username, $email]);

    if ($stmt->rowCount() > 0) {
        error_log("User already exists with this username or email");
        echo json_encode(['success' => false, 'message' => 'Username or email already exists']);
        exit;
    }

    // Hash password
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    // Log hash generation info
    error_log("Registration - Password length: " . strlen($password));
    error_log("Registration - Generated hash: " . $passwordHash);
    error_log("Registration - Hash format check: " . (strpos($passwordHash, '$2y$') === 0 ? "Valid bcrypt" : "Invalid format"));    // Hash password and insert new user
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);
    error_log("[Register] Password hashed successfully");

    $stmt = $pdo->prepare("INSERT INTO users (name, username, email, password_hash, address, phone) VALUES (?, ?, ?, ?, ?, ?)");
    error_log("[Register] Attempting to insert new user");

    try {
        $stmt->execute([$name, $username, $email, $passwordHash, $address, $phone]);
        error_log("[Register] User successfully inserted into database");

        // Return success with more information
        echo json_encode([
            'success' => true,
            'message' => 'Registration successful',
            'user' => [
                'name' => $name,
                'username' => $username,
                'email' => $email
            ]
        ]);
        exit;
    } catch (PDOException $insertError) {
        error_log("[Register] Failed to insert user. Error: " . $insertError->getMessage());
        error_log("[Register] SQL State: " . $insertError->errorInfo[0]);
        error_log("[Register] Error Code: " . $insertError->errorInfo[1]);
        throw $insertError;
    }
} catch (PDOException $e) {
    error_log("[Register] Error: " . $e->getMessage());
    error_log("[Register] Full error details: " . print_r($e, true));

    // Send more specific error messages to the frontend
    $errorMessage = 'Registration failed. ';
    if (strpos($e->getMessage(), 'Duplicate entry') !== false) {
        if (strpos($e->getMessage(), 'username') !== false) {
            $errorMessage .= 'Username already exists.';
        } else if (strpos($e->getMessage(), 'email') !== false) {
            $errorMessage .= 'Email already exists.';
        } else {
            $errorMessage .= 'Username or email already exists.';
        }
    } else {
        $errorMessage .= 'Please try again.';
    }

    echo json_encode(['success' => false, 'message' => $errorMessage]);
}
