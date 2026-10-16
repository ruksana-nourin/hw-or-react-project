<?php

function getBooks()
{
    // echo "getBooks function called successfully";

    echo json_encode(Book::getAll());
}

function getBookById($id)
{
    $book = Book::getById($id);

    if (!$book) {

        http_response_code(404);

        echo json_encode([
            "success" => false,
            "message" => "Book not found"
        ]);

        return;
    }

    echo json_encode($book);
}

function createBook($_data, $_files)
{
    $img = null;

    if (isset($_files['cover_image'])) {

        $result = imgUpload(
            $_files['cover_image'],
            "../uploads/books"
        );

        if (isset($result['success'])) {
            $img = $result['success'];
        } else {
            http_response_code(400);
            echo $result['error'];
            exit;
        }
    }

    $book = new Book(
        null,
        $_data['title'],
        $_data['isbn'],
        $_data['author_id'],
        $_data['category_id'],
        $_data['publisher_id'],
        $_data['total_copies'],
        $_data['status_id'],
        $img
    );

    echo json_encode($book->create());
}

function updateBook($_data, $_files)
{
    global $db;

    // Get the existing book's cover image
    $sql = "SELECT cover_image
            FROM books
            WHERE id = " . (int)$_data['id'];

    $result = $db->query($sql);

    if (!$result || $result->num_rows === 0) {
        http_response_code(404);

        echo json_encode([
            "success" => false,
            "message" => "Book not found"
        ]);

        exit;
    }

    $bookData = $result->fetch_assoc();

    // Get the existing book's cover image
    $img = $bookData['cover_image'];

    //new image
    if (
        isset($_files['cover_image']) &&
        $_files['cover_image']['error'] === 0
    ) {

        $uploadResult = imgUpload(
            $_files['cover_image'],
            "../uploads/books"
        );

        if (isset($uploadResult['success'])) {

            // if there is a new image, delete the old one
            $img = $uploadResult['success'];

        } else {

            http_response_code(400);

            echo json_encode([
                "success" => false,
                "message" => $uploadResult['error']
            ]);

            exit;
        }
    }

    $book = new Book(
        $_data['id'],
        $_data['title'],
        $_data['isbn'],
        $_data['author_id'],
        $_data['category_id'],
        $_data['publisher_id'],
        $_data['total_copies'],
        $_data['status_id'],
        $img
    );

    echo json_encode(
        $book->update()
    );
}

function deleteBook($id)
{
    $result = Book::deleteById($id);

    if (!$result["success"]) {

        http_response_code(404);

    }

    echo json_encode($result);
}


?>