@echo off
echo Setting up Car Sales Database...
echo.
echo Make sure MySQL is running (XAMPP/WAMP)
echo.
pause

echo Running database setup...
mysql -u root -p < database_setup.sql

if %ERRORLEVEL% == 0 (
    echo.
    echo Database setup completed successfully!
    echo.
    echo Database: carsales_db
    echo Tables: users, car_listings
    echo Demo data: 8 car listings added
    echo Test user: testuser (password: password123)
    echo Demo login: demo/demo
    echo.
) else (
    echo.
    echo  Database setup failed!
    echo Please check your MySQL connection and try again.
    echo.
)

pause
