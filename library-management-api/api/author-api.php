<?php
function getAuthor()
{
    echo json_encode(Author::getAll());
}

function createAuthor($_data)
{
    $author = new Author(
        null,
        $_data['name'],
        $_data['email'] ?? '',
        $_data['phone'] ?? '',
        $_data['bio'] ?? '',
        $_data['status_id'] ?? 1
    );

    echo json_encode($author->create());
}


?>