<?php

class Book
{
    public $id;
    public $title;
    public $isbn;
    public $author_id;
    public $category_id;
    public $publisher_id;
    public $total_copies;
    public $status_id;
    public $cover_image;
    public $created_at;
    public $updated_at;

    public function __construct(
        $id = null,
        $title = "",
        $isbn = "",
        $author_id = null,
        $category_id = null,
        $publisher_id = null,
        $total_copies = 0,
        $status_id = null,
        $cover_image = "",
        $created_at = "",
        $updated_at = ""
    ) {
        $this->id = $id;
        $this->title = $title;
        $this->isbn = $isbn;
        $this->author_id = $author_id;
        $this->category_id = $category_id;
        $this->publisher_id = $publisher_id;
        $this->total_copies = $total_copies;
        $this->status_id = $status_id;
        $this->cover_image = $cover_image;
        $this->created_at = $created_at;
        $this->updated_at = $updated_at;
    }

    public static function getAll()
    {
        global $db;

        $query = "SELECT 
                b.id,
                b.title,
                b.isbn,
                b.author_id,
                a.name AS author,
                b.category_id,
                c.name AS category,
                b.publisher_id,
                p.name AS publisher,
                b.total_copies as copies,
                b.status_id,
                s.name AS status,
                b.cover_image AS cover,
                b.created_at,
                b.updated_at
              FROM books AS b,
                   authors AS a,
                   categories AS c,
                   publishers AS p,
                   book_statuses AS s
              WHERE b.author_id = a.id
                AND b.category_id = c.id
                AND b.publisher_id = p.id
                AND b.status_id = s.id
              ORDER BY b.id DESC";

        $result = $db->query($query);

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function create()
    {
        global $db;

        $sql = "INSERT INTO books
            (
                title,
                isbn,
                author_id,
                category_id,
                publisher_id,
                total_copies,
                status_id,
                cover_image
            )
            VALUES
            (
                '$this->title',
               ' $this->isbn',
                $this->author_id,
                $this->category_id,
                $this->publisher_id,
                $this->total_copies,
                $this->status_id,
                '$this->cover_image'
            )";

        $result = $db->query($sql);

        if ($result) {
            return $db->insert_id;
        } else {
            return $db->error;
        }
    }

}
?>