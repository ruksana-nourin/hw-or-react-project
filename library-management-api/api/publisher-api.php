<?php
function getPublisher()
{
    echo json_encode(Publisher::getAll());
}


?>