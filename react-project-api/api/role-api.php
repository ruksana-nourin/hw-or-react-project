<?php
function getRoles()
{
    // echo "Role API";
    echo json_encode(Role::getAll());
}


?>