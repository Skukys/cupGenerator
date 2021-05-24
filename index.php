<?php
$uri = $_SERVER['REQUEST_URI'];
$uri = explode('/', $uri);
if ($uri[1]) include 'routes/' . $uri[1] . '.php';
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.11/cropper.min.css">
    <link rel="stylesheet" href="assets/css/style.css">
    <title>Document</title>
</head>
<body>
<div class="content">
    <div class="header"></div>
    <div class="bg flex center">
        <p>Конструктор стаканов</p>
        <img src="assets/img/bg.png" alt="">
    </div>
    <div class="generator__block">
        <div class="generator flex"></div>
        <div class="generator__loader flex center">
            <div class="lds-dual-ring"></div>
        </div>
    </div>
</div>
</body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.11/cropper.js"></script>
<script src="assets/js/vendor/three.js"></script>
<script src="assets/js/index.js" type="module"></script>
</html>