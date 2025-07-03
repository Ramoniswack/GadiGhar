# Car Sales Application - Backend Setup

## Requirements

- PHP 7.4 or higher
- MySQL 5.7 or higher (or XAMPP/WAMP/MAMP)
- Web browser

## ⚠️ IMPORTANT SECURITY UPDATES

This backend has been updated with essential security features:

- **Password authentication** (previously missing!)
- **Input validation** and sanitization
- **Basic authentication** for protected endpoints
- **Error logging** instead of exposing details
- **SQL injection** prevention

## Setup Instructions

### 1. Database Setup

1. Start your MySQL server (through XAMPP, WAMP, or standalone MySQL)
2. Open phpMyAdmin or MySQL command line
3. **BACKUP ANY EXISTING DATA FIRST!**
4. Run the updated SQL script from `database_setup.sql`
   - This will create the `carsales_db` database
   - Create `users` and `car_listings` tables with **password support**
   - Insert demo car data
   - The test user password is "password123"

### 2. Database Migration (If you have existing data)

If you already have a `users` table without passwords, run this SQL:

```sql
ALTER TABLE users ADD COLUMN password_hash VARCHAR(255) NOT NULL DEFAULT '';
UPDATE users SET password_hash = '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE password_hash = '';
```

### 3. PHP Backend Setup

1. Navigate to the php-backend folder in terminal
2. Start PHP development server:
   ```
   php -S localhost:8000
   ```
3. Your PHP backend will be running at `http://localhost:8000`

### 3. React Frontend Setup

1. Navigate to your React project folder
2. Make sure axios is installed: `npm install axios`
3. Start the React development server: `npm run dev`
4. Your React app will run at `http://localhost:5173`

## API Endpoints

### Authentication

- `POST /register.php` - Register new user
- `POST /login.php` - User login

### Car Listings

- `GET /cars.php` - Get all car listings
- `POST /add-car.php` - Add new car listing
- `POST /search-cars.php` - Search/filter cars

## Database Schema

### users table

- id (INT, AUTO_INCREMENT, PRIMARY KEY)
- name (VARCHAR(255), NOT NULL)
- username (VARCHAR(100), UNIQUE, NOT NULL)
- email (VARCHAR(255), UNIQUE, NOT NULL)
- password_hash (VARCHAR(255), NOT NULL) - **NEW: Secure password storage**
- address (TEXT)
- phone (VARCHAR(20))
- created_at (TIMESTAMP)

### car_listings table

- id (INT, AUTO_INCREMENT, PRIMARY KEY)
- make (VARCHAR(100), NOT NULL)
- model (VARCHAR(100), NOT NULL)
- year (INT, NOT NULL)
- mileage (INT, NOT NULL)
- location (VARCHAR(255), NOT NULL)
- price (INT, NOT NULL)
- seller (VARCHAR(100), NOT NULL)
- created_at (TIMESTAMP)

## Security Features Added

✅ Password hashing with PHP's `password_hash()`
✅ Input validation and sanitization
✅ Authentication required for adding cars
✅ SQL injection prevention with prepared statements
✅ Error logging instead of exposing database errors
✅ XSS prevention with `htmlspecialchars()`

## Next Steps for Production

1. Implement proper JWT token authentication
2. Add rate limiting
3. Use HTTPS only
4. Add proper session management
5. Implement user roles and permissions
6. Add API request logging
7. Set up proper error monitoring

- phone (VARCHAR(20))
- created_at (TIMESTAMP)

### car_listings table

- id (INT, AUTO_INCREMENT, PRIMARY KEY)
- make (VARCHAR(100))
- model (VARCHAR(100))
- year (INT)
- mileage (INT)
- location (VARCHAR(255))
- price (INT)
- seller (VARCHAR(100))
- created_at (TIMESTAMP)

## Testing

1. Demo login credentials: username: `demo`, password: `demo`
2. Register new users through the React app
3. Add new car listings through the dashboard
4. Search and filter cars on the search page

## Troubleshooting

- Make sure CORS headers are properly set in PHP files
- Verify MySQL database connection in `config/database.php`
- Check browser network tab for API request/response details
- Ensure PHP server is running on port 8000
- Ensure React dev server is running on port 5173
