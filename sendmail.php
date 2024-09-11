<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';


if (!empty($_POST['name']) && !empty($_POST['phone'] || !empty($_POST['email'] ))   && !empty($_POST['coordinates']) && !empty($_POST['power'])) {
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $coordinates = $_POST['coordinates'];
    $power = $_POST['power'];


    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ua', 'phpmailer/language/');

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.ukr.net';
        $mail->SMTPAuth = true;
        $mail->Username = 'power.energy@ukr.net';
        $mail->Password = 'YVjQAgyaHGwbobT2';
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;
        $mail->setFrom('power.energy@ukr.net', 'POWER ENERGY'); 
        $mail->addAddress('power.energy@ukr.net', 'POWER ENERGY');
        $mail->isHTML(true);
        $mail->Subject = 'Заявка на приєднання';
        $mail->Body = "<p><strong>Ім'я:</strong> $name</p><p><strong>Телефон:</strong> $phone</p><p><strong>email:</strong> $email</p><p><strong>Координати ділянки:</strong> $coordinates</p><p><strong>Прогнозована потужність:</strong> $power</p>";

        $mail->send();
        $message = 'Ви успішно відправили повідомлення. Вернутись назад?';
    } catch (Exception $e) {
        $message = 'Помилка: ' . $mail->ErrorInfo;
    }
} else {
    $message = 'Не всі поля заповнені';
}

$response = ['message' => $message];
header('Content-type: application/json');
echo json_encode($response);

?>