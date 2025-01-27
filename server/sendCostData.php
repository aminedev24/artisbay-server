<?php
// Get the JSON data from the request
$data = json_decode(file_get_contents("php://input"), true);

// Ensure that data is received
if (!$data) {
    http_response_code(400);
    echo json_encode(["message" => "No data received."]);
    exit;
}

// Prepare the email content
$subject = "Car Dismantling Cost Calculator Submission";
$body = "
    Make: " . htmlspecialchars($data['make']) . "\n
    Model: " . htmlspecialchars($data['model']) . "\n
    Units: " . htmlspecialchars($data['units']) . "\n
    Buying Price: ¥" . number_format($data['buyingPrice']) . "\n
    Transportation: ¥" . number_format($data['transportation']) . "\n
    Total Cost (Per Unit): ¥" . number_format($data['totalCostPerUnit']) . "\n
    Grand Total (All Units): ¥" . number_format($data['grandTotalCost']) . "\n\n
    Cut Selections:\n";

foreach ($data['cutSelections'] as $itemId => $selection) {
    $body .= $itemId . ": " . $selection . "\n";
}

$body .= "\nOptional Removals:\n";
foreach ($data['optionalRemovals'] as $itemId => $selected) {
    $body .= $itemId . ": " . ($selected ? "Yes" : "No") . "\n";
}

// Define the recipient email address
$to = "your_email@example.com"; // Replace with your email address
$headers = "From: no-reply@yourdomain.com\r\n";
$headers .= "Reply-To: no-reply@yourdomain.com\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send the email
if (mail($to, $subject, $body, $headers)) {
    echo json_encode(["message" => "Email sent successfully!"]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Failed to send email."]);
}
?>
