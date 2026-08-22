<?php
function getBrands()
{
    echo json_encode(Brand::getAll());
}


?>