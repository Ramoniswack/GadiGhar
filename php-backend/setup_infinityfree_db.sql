-- GadiGhar Database Setup for InfinityFree
-- Copy and paste this into your phpMyAdmin SQL tab

-- Users table for registration and authentication
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    address TEXT,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Car listings table
CREATE TABLE IF NOT EXISTS car_listings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    mileage INT NOT NULL,
    location VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    seller VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert demo car data
INSERT INTO car_listings (make, model, year, mileage, location, price, seller) VALUES
('Tesla', 'Model S', 2023, 15000, 'San Francisco, CA', 89500, 'demo_user'),
('BMW', 'M4 Competition', 2022, 8500, 'Los Angeles, CA', 78200, 'demo_user'),
('Mercedes-Benz', 'AMG GT', 2023, 5200, 'Miami, FL', 142000, 'demo_user'),
('Porsche', '911 Turbo S', 2022, 12000, 'New York, NY', 198500, 'demo_user'),
('Audi', 'RS6 Avant', 2023, 3800, 'Chicago, IL', 125000, 'demo_user'),
('Lamborghini', 'Huracán EVO', 2022, 2100, 'Las Vegas, NV', 285000, 'demo_user'),
('Ferrari', '488 GTB', 2023, 1500, 'Beverly Hills, CA', 320000, 'demo_user'),
('McLaren', '720S', 2022, 3200, 'Austin, TX', 295000, 'demo_user');

-- Insert demo users with known passwords
-- Password for testuser: "password123"
INSERT INTO users (name, username, email, password_hash, address, phone) VALUES
('Test User', 'testuser', 'test@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '123 Test Street, Test City', '(555) 123-4567');

-- Password for admin: "admin123"
INSERT INTO users (name, username, email, password_hash, address, phone) VALUES
('Admin User', 'admin', 'admin@gadighar.com', '$2y$10$B6vTixLNZcbhP5GF9WT8TeBubbh4Tk5KJj9x5VJcKjJa5VXuTONsi', '456 Admin Street, Admin City', '(555) 987-6543');

-- Show tables to verify creation
SHOW TABLES;
