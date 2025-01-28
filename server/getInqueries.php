<?php
include 'db_connection.php';
include 'headers.php';
session_start(); // Ensure the session is started

// Ensure user_id is set in the session
if (!isset($_SESSION['email'])) {
    http_response_code(401); // Unauthorized
    echo json_encode(["error" => "Unauthorized access. User not logged in."]);
    exit();
}

$user_email = $_SESSION['email']; // Get user ID from session

// Query to select data from the submitted_inquiries table for the specific user
$sql = "SELECT make, model, year_from, year_to, price_from, price_to, body_type, mileage_from, mileage_to, transmission, steering, created_at 
        FROM submitted_inquiries 
        WHERE email = ?";

$stmt = $conn->prepare($sql); // Use prepared statements for security

if ($stmt === false) {
    http_response_code(500); // Internal Server Error
    echo json_encode(["error" => "Failed to prepare the SQL statement."]);
    exit();
}

// Bind the user_id parameter to the query
$stmt->bind_param("s", $user_email); // "i" indicates an integer parameter

// Execute the statement
$stmt->execute();

// Get the result
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $vehicles = [];
    while ($row = $result->fetch_assoc()) {
        $vehicles[] = $row;
    }
    // Return data as JSON
    header('Content-Type: application/json');
    echo json_encode($vehicles);
} else {
    echo json_encode([]);
}

$conn->close();
