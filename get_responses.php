<?php

$servername = "cy541350.mysql.tools";
$username = "cy541350_db";
$password = "fVHdAZVg";
$dbname = "cy541350_db";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
   
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT userResponse, inputElement, imageUrl FROM responses";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $responses = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($responses);
} catch(PDOException $e) {
    echo json_encode(["error" => "Помилка підключення до бази даних: " . $e->getMessage()]);
}
?>