<?php
$json = file_get_contents('php://input');
$json = json_decode($json);

if(isset($json->texture)){
    unlink('images/texture/' . $json->img . 'texture.png');
} else if(isset($json->image)) {
    unlink('images/' . $json->img . 'base.jpg');
    unlink('images/' . $json->img . 'base.png');
} else {
    unlink('images/texture/' . $json->img . 'texture.png');
    unlink('images/' . $json->img . 'base.jpg');
    unlink('images/' . $json->img . 'base.png');
}


exit(json_encode(['message' => 'Success delete']));
