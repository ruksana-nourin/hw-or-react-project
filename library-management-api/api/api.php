<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle browser preflight request

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(204);
    exit;
}
// Database
require_once __DIR__ . "/../config/db.php";

// Image helper
require_once __DIR__ . "/../helpers/img-upload-helper.php";

// JWT helper
require_once __DIR__ . "/../helpers/jwt-helper.php";

// Load all model files
foreach (glob(__DIR__ . "/../model/*.class.php") as $modelFile) {
    require_once $modelFile;
}

// Load all API files
foreach (glob(__DIR__ . "/*-api.php") as $apiFile) {
    require_once $apiFile;
}

if (!isset($_GET['endpoint']) || $_GET['endpoint'] == "") {
    http_response_code(404);
    echo "<h2>No endpoint found!</h2>";
    exit;
}

if (isset($_GET['endpoint'])) {
    $endpoint = $_GET['endpoint'];
    $method = $_SERVER['REQUEST_METHOD'];
    $id = $_GET['id'] ?? null;
    if ($endpoint == 'login' && $method == 'POST') {

        $data = json_decode(
            file_get_contents("php://input"),
            true
        );

        checkLogin($data);
    } elseif ($endpoint == 'new-token' && $method == 'GET') {

        $data = [
            "user_id" => 15,
            "name" => "Mina",
            "role_id" => 1,
        ];
        echo generateJWT($data);
    } elseif ($endpoint == 'check-token' && $method == 'GET') {

        $header = getallheaders();

        if (!isset($header['Authorization'])) {
            http_response_code(401);
            echo json_encode([
                "success" => false,
                "message" => "Authorization token missing"
            ]);
            exit;
        }

        $jwt = explode(" ", $header['Authorization']);

        if (count($jwt) < 2) {
            http_response_code(401);
            echo json_encode([
                "success" => false,
                "message" => "Invalid Authorization format"
            ]);
            exit;
        }

        $valid = validateJWT($jwt[1]);

        if ($valid) {
            echo json_encode([
                "success" => true,
                "message" => "Token is valid",
                "data" => $valid
            ]);
        } else {
            http_response_code(401);
            echo json_encode([
                "success" => false,
                "message" => "Token is invalid or expired"
            ]);
        }
    } else {
        //middleware


        //endpoint
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
        } elseif ($endpoint == 'book-update' && $method == 'POST') {

            updateBook($_POST, $_FILES);
        } elseif ($endpoint == 'book-details' && $method == 'GET') {

            $id = $_GET['id'];

            getBookById($id);
        } elseif ($endpoint == 'book-delete' && $method == 'DELETE') {

            $id = $_GET['id'];

            deleteBook($id);
        }

        //members
        elseif ($endpoint == 'members' && $method == 'GET') {

            getMembers();
        } elseif ($endpoint == 'member-create' && $method == 'POST') {
            $data = json_decode(
                file_get_contents("php://input"),
                true
            );
            createMember($data);
        } elseif ($endpoint == 'member-code' && $method == 'GET') {

            getNextMemberCode();
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
        } elseif ($endpoint == 'fine-payment' && $method == 'POST') {

            $data = json_decode(
                file_get_contents("php://input"),
                true
            );

            $result = FinePayment::create(
                $data['issueId'],
                $data['paidAmount'],
                $data['paymentDate'] ?? null,
                $data['receivedBy'] ?? null,
                $data['notes'] ?? null
            );

            echo json_encode($result);
        }
    }
}
