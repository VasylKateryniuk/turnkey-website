<?php

$servername = "cy541350.mysql.tools";
$username = "cy541350_db";
$password = "fVHdAZVg";
$dbname = "cy541350_db";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
   
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['userResponse']) && isset($data['inputElement']) && isset($data['imageUrl'])) {
        $userResponse = htmlspecialchars($data['userResponse']);
        $inputElement = htmlspecialchars($data['inputElement']);
        $imageUrl = $data['imageUrl'];

      
        $stmt = $conn->prepare("INSERT INTO responses (userResponse, inputElement, imageUrl) VALUES (:userResponse, :inputElement, :imageUrl)");
        $stmt->bindParam(':userResponse', $userResponse);
        $stmt->bindParam(':inputElement', $inputElement);
        $stmt->bindParam(':imageUrl', $imageUrl);
        $stmt->execute();

        echo json_encode(array('status' => 'success', 'message' => 'Data saved successfully'));
    } else {
        echo json_encode(array('status' => 'error', 'message' => 'Заповніть всі поля та додайте фото'));
    }
} catch(PDOException $e) {
    echo json_encode(array('status' => 'error', 'message' => 'Connection failed: ' . $e->getMessage()));
}

?>

