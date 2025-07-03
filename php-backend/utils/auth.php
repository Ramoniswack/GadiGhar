<?php
// Authentication utilities

function validateToken($token)
{
    // Simple token validation for demo purposes
    // In production, use JWT or proper session management
    if ($token === 'demo_token' || strpos($token, 'demo_token_') === 0) {
        return ['id' => 'demo', 'username' => 'demo'];
    }

    // For now, accept any token with length > 10
    // In production, validate against database or JWT
    if (strlen($token) > 10) {
        return ['id' => 'user', 'username' => 'authenticated'];
    }

    return false;
}

function requireAuth()
{
    $headers = getallheaders();
    $token = null;

    if (isset($headers['Authorization'])) {
        $token = str_replace('Bearer ', '', $headers['Authorization']);
    }

    if (!$token || !validateToken($token)) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Authentication required']);
        exit;
    }

    return validateToken($token);
}

function sanitizeInput($input)
{
    if (is_array($input)) {
        return array_map('sanitizeInput', $input);
    }
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}
