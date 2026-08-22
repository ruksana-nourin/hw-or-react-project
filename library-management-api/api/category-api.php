<?php
function getCategories()
{
    echo json_encode(Category::getAll());
}


?>