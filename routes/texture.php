<?php
$json = file_get_contents('php://input');
$json = json_decode($json);


$type = explode('.', $json->path)[1];
$image = $type == 'jpg' ? imagecreatefromjpeg($json->path) : imagecreatefrompng($json->path);
$baseTexture = imagecreatefrompng('assets/img/models/baseTexture.png');

$imageRotate = imagerotate($image, -$json->rotate, 0);
$cropImage = imagecrop($imageRotate, ['x' => $json->x, 'y' => $json->y, 'width' => $json->width, 'height' => $json->height]);

if($json->two){
    imagecopyresampled($baseTexture, $cropImage, 0, 51, 0, 0, 1024, 930, imagesx($cropImage), imagesy($cropImage));
    imagecopyresampled($baseTexture, $cropImage, 1024, 51, 0, 0, 1024, 930, imagesx($cropImage), imagesy($cropImage));
} else
    imagecopyresampled($baseTexture, $cropImage, 0, 51, 0, 0, 2048, 930, imagesx($cropImage), imagesy($cropImage));

$file = 'images/texture/';
$file = $file . $json->img . 'texture';

imagepng($baseTexture, "$file.png");

exit(json_encode(['path' => $file]));
