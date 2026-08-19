<?php
function getUsers()
{
    echo json_encode(User::getAll());
}
function getUserById($_id){
    echo json_encode(User::getById($_id));
}

function addNew($_data){
    // echo json_encode($_data);
    $user = new User (null, $_data["name"], $_data["email"], $_data["role_id"], $_data["password"]);
    echo json_encode($user->create());
}

?>