<?php

function getBooks()
{
    // echo "getBooks function called successfully";

    echo json_encode(Book::getAll());
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



?>