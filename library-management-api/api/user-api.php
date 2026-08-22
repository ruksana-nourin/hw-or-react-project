<?php
require_once "../model/user.class.php";
function getUsers()
{
    // echo "getAll function called successfully";
    echo json_encode(User::getAll());
}

function getUserById($id)
{
    // echo "getUserById function called successfully";
    echo json_encode(User::getById($id));
}

function addUser($_data)
{
    //  echo " addUser function called successfully";
    $user = new User(
        null,
        $_data["name"],
        $_data["email"],
        $_data["phone"],
        $_data["role_id"],
        $_data["status_id"],
        $_data["department_id"],
        $_data["address"],
        $_data["notes"],
        $_data["created_at"],
        $_data["password"],

    );
    echo json_encode($user->create());
}

function updateUser($_data)
{
    $user = new User(
        $_data["id"],
        $_data["name"],
        $_data["email"],
        $_data["phone"],
        $_data["role_id"],
        $_data["status_id"],
        $_data["department_id"],
        $_data["address"],
        $_data["notes"]
    );

    echo json_encode($user->update());
}

function deleteUser($id)
{

}