<?php

class Role{
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
        $sql = "SELECT * from roles";
        $result = $db->query($sql);
        return $result->fetch_all(MYSQLI_ASSOC);

    }
}

?>