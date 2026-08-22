<?php

class Author
{
    public $id;
    public $name;
    public $email;
    public $phone;
    public $bio;
    public $status_id;

    public function __construct(
        $id = null,
        $name = "",
        $email = "",
        $phone = "",
        $bio = "",
        $status_id = 1
    ) {
        $this->id = $id;
        $this->name = $name;
        $this->email = $email;
        $this->phone = $phone;
        $this->bio = $bio;
        $this->status_id = $status_id;
    }

    public static function getAll()
    {
        global $db;

        $sql = "SELECT * FROM authors ORDER BY id DESC";

        $result = $db->query($sql);

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function create()
    {
        global $db;

        $sql = "INSERT INTO authors
                (name, email, phone, bio, status_id)
                VALUES
                (
                    '$this->name',
                    '$this->email',
                    '$this->phone',
                    '$this->bio',
                    $this->status_id
                )";

        $result = $db->query($sql);

        if ($result) {
            return $db->insert_id;
        }

        return "Error: " . $db->error;
    }
}