<?php
$fileFormat = explode('.',basename($_FILES['file']['name']))[1];
$file = 'images/' . $_POST['img'] . 'base.' . $fileFormat;
move_uploaded_file($_FILES['file']['tmp_name'], $file);
exit(json_encode(['path' => $file]));