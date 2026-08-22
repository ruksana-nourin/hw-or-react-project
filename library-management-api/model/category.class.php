<?php

class Category{
    public $id = '';
    public $name = '';
public function __construct($id, $name)
    {
        $this->id = $id;
        $this->name = $name;

    }
    public static function getAll()
    {

        global $db;
        $sql = "SELECT * from categories";
        $result = $db->query($sql);
        return $result->fetch_all(MYSQLI_ASSOC);

    }
}

?>