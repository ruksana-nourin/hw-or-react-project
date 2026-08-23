<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle browser preflight request

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(204);
    exit;
}
require_once "../config/db.php";
require_once "../helpers/img-upload-helper.php";


// require_once "../model/user.class.php";

// Load all model files
foreach (glob("../model/*.class.php") as $modelFile) {
    require_once $modelFile;
}

// Load all API files
foreach (glob("*-api.php") as $apiFile) {
    require_once $apiFile;
}

if (isset($_GET['endpoint'])) {
    $endpoint = $_GET['endpoint'];
    $method = $_SERVER['REQUEST_METHOD'];
    $id = $_GET['id'] ?? null;

    //user endpoint
    // GET    users
    // GET    user-details
    // POST   user-create
    // PUT    user-update
    // DELETE user-delete

    if ($endpoint == 'users' && $method == 'GET') {
        // echo "users api";
        getUsers();
    } elseif ($endpoint == 'user-details' && $method == 'GET') {
        // echo "user-details api";
        $id = $_GET['id'];
        getUserById($id);
    } elseif ($endpoint == 'user-create' && $method == 'POST') {
        // echo "user-create api";
        $data = json_decode(file_get_contents("php://input"), true);
        // print_r($data);
        // exit;
        //  $data=[
        // "id":  null,
        // "name":  "Rina",
        // "email":  "tuuioa@example.com",
        // "role_id":  2,
        // "password":  "123",
        // "phone":  "123",
        // "status_id":  "123",
        // "department_id":  "123",
        // "address":  "123",
        // "notes":  "123",
        // "created_at":  "123"
        // ];
        addUser($data);
    } elseif ($endpoint == 'user-update' && $method == 'PUT') {

        // echo "user-update api<br>";

        // $rawData = file_get_contents("php://input");

        // echo "RAW DATA:<br>";
        // var_dump($rawData);

        // $data = json_decode($rawData, true);

        // echo "DECODED DATA:<br>";
        // var_dump($data);
        $data = json_decode(file_get_contents("php://input"), true);

        updateUser($data);
    } elseif ($endpoint == 'user-delete' && $method == 'DELETE') {
        echo "user-delete api";
    } elseif ($endpoint == 'categories' && $method == 'GET') {
        getCategories();
    }
    //author
    elseif ($endpoint == 'authors' && $method == 'GET') {
        getAuthor();
    } elseif ($endpoint == 'author-create' && $method == 'POST') {

        $data = json_decode(
            file_get_contents("php://input"),
            true
        );
        createAuthor($data);
    }
    //publisher
    elseif ($endpoint == 'publishers' && $method == 'GET') {
        getPublisher();
    }

    //books
    elseif ($endpoint == 'books' && $method == 'GET') {
        getBooks();
    } elseif ($endpoint == 'book-create' && $method == 'POST') {
        createBook($_POST, $_FILES);
    }

    //members
    elseif ($endpoint == 'members' && $method == 'GET') {

        getMembers();

    }

    //issues
    elseif ($endpoint == 'issue' && $method == 'GET' && $id) {

        getIssueById($id);

    } elseif ($endpoint == 'issues' && $method == 'GET') {

        getIssues();
    } elseif ($endpoint == 'issue-create' && $method == 'POST') {

        $data = json_decode(
            file_get_contents("php://input"),
            true
        );

        createIssue($data);
    } elseif ($endpoint == 'issue-code' && $method == 'GET') {
        getNextIssueCode();
    } elseif ($endpoint == 'issue-return' && $method == 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);
        returnIssue($data);

    }
} else {
    http_response_code(404);
    echo "No endpoint found";
}
