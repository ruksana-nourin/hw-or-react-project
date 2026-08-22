<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers:Content-Type");

//Handle browser preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(204);
    exit;
}


require_once "../config/db.php";
require_once "../helpers/img-upload-helper.php";

// require_once "../model/user.class.php";
foreach (glob("../model/*.class.php") as $modalfile) {
    require_once $modalfile;

}
// require_once "user-api.php";
// require_once "role-api.php";
foreach (glob("*-api.php") as $apifile) {
    require_once $apifile;

}

if ($_GET['endpoint']) {
    $endpoint = $_GET['endpoint'];
    $method = $_SERVER['REQUEST_METHOD'];

    if ($endpoint == 'users' && $method == 'GET') {
        getUsers();
    } elseif ($endpoint == 'user-create' && $method == 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);
        // print_r($data);
        // $data=[
        //     "id" => null,
        //     "name" => "Rina",
        //     "email" => "rina@example.com",
        //     "role_id" => 2,
        //     "password" => "123"
        // ];
        addNew($data);
    } elseif ($endpoint == 'user-update' && $method == 'PUT') {
        // echo "<h1>Update User $method</h1>";
        $data = json_decode(file_get_contents("php://input"), true);
        updateUser($data);
    } elseif ($endpoint == 'user-delete' && $method == 'DELETE') {
        // echo "<h1>Delete User $method</h1>";
        $id = $_GET['id'];

        deleteUSer($id);
    } elseif ($endpoint == 'user-details' && $method == 'GET') {
        $id = $_GET['id'];
        getUserById($id);
    } elseif ($endpoint == 'roles' && $method == 'GET') {
        getRoles();
    } elseif ($endpoint == 'categories' && $method == 'GET') {
        getCategories();
    } elseif ($endpoint == 'brands' && $method == 'GET') {
        getBrands();
    } elseif ($endpoint == 'products' && $method == 'GET') {
        getProducts();
    } elseif ($endpoint == 'product-create' && $method == 'POST') {
        // echo json_encode($_POST);
        // exit;
        //    echo "Product create API";
        // print_r($_POST);
        // print_r($_FILES);
        createProduct($_POST, $_FILES);
    } else {
        http_response_code(404);
    }
} else {
    http_response_code(404);
    echo "<h1>No endpoint specified.</h1>";
}

?>