
<?php

if (php_sapi_name() !== 'cli') {
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');

    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        exit(0);
    }
}

// Auto-detect environment and set appropriate database credentials
if (isset($_SERVER['HTTP_HOST']) && (strpos($_SERVER['HTTP_HOST'], 'infinityfreeapp.com') !== false || strpos($_SERVER['HTTP_HOST'], 'infy.uk') !== false)) {
    // InfinityFree production credentials
    $host = 'sql312.infinityfree.com';
    $dbname = 'if0_39383968_gadighar';
    $username = 'if0_39383968';
    $password = '72JtVOWZ9Tk';
} else {
    // Local development credentials
    $host = 'localhost';
    $dbname = 'gadighar_db';
    $username = 'root';
    $password = '';
}

try {
    // Check if PDO MySQL extension is available
    if (!extension_loaded('pdo_mysql')) {
        throw new Exception('PDO MySQL extension not loaded. Please enable php_pdo_mysql.dll in your php.ini file.');
    }

    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false
    ];

    // Only add MySQL-specific options if available
    if (defined('PDO::MYSQL_ATTR_USE_BUFFERED_QUERY')) {
        $options[PDO::MYSQL_ATTR_USE_BUFFERED_QUERY] = true;
    }

    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password, $options);

    // Only show success if accessed directly
    if (basename($_SERVER['PHP_SELF']) === 'database.php') {
        echo json_encode(["success" => true, "message" => "Database connected successfully"]);
    }
} catch (PDOException $e) {
    error_log("Database connection failed: " . $e->getMessage());

    // Only show error if accessed directly
    if (basename($_SERVER['PHP_SELF']) === 'database.php') {
        echo json_encode([
            "success" => false,
            "message" => "DB connection failed: " . $e->getMessage(),
            "error_code" => $e->getCode(),
            "host" => $host,
            "database" => $dbname
        ]);
    }
    exit;
} catch (Exception $e) {
    error_log("Database setup error: " . $e->getMessage());

    // Only show error if accessed directly
    if (basename($_SERVER['PHP_SELF']) === 'database.php') {
        echo json_encode([
            "success" => false,
            "message" => $e->getMessage(),
            "solution" => "Enable PDO MySQL extension in your php.ini file"
        ]);
    }
    exit;
}
