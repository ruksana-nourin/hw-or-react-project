<?php
class User
{
    public $id;
    public $name;
    public $email;
    public $role_id;
    private $password;
    public function __construct($id, $name, $email, $role_id, $password = "")
    {
        $this->id = $id;
        $this->name = $name;
        $this->email = $email;
        $this->role_id = $role_id;
        $this->password = password_hash($password, PASSWORD_DEFAULT);

    }

    public static function getAll()
    {
        // return "function called successfully";

        global $db;
        $query = "SELECT u.id, u.name, u.email, u.role_id, r.name as role 
        from users as u , roles as r
        WHERE u.role_id = r.id
        order by u.id desc";
        $result = $db->query($query);
        return $result->fetch_all(MYSQLI_ASSOC);

    }
    public static function getById($id)
    {

        global $db;
        $query = "SELECT u.id, u.name, u.email, u.role_id, r.name as role 
        from users as u , roles as r
        WHERE u.role_id = r.id and u.id =$id";
        $result = $db->query($query);
        return $result->fetch_assoc();

    }
    public function create()
    {
        global $db;
        $query = "INSERT into users(name, email, role_id, password)
        values('$this->name', '$this->email', $this->role_id, '$this->password')
        ";
        $result = $db->query($query);
        if ($result) {
            return $db->insert_id;
        } else {
            return "Error:" . $db->error;
        }
    }
    public function update()
    {
        global $db;
        $query = "UPDATE users 
            SET name = '$this->name', 
            email = '$this->email', 
            role_id = $this->role_id 
            where id= $this->id";
        $result = $db->query($query);
        if ($result) {
            return "Updated Successfully";
        } else {
            return "Error:" . $db->error;
        }
    }
    public static function delete($_id)
    {
        global $db;
        $found= User::getById($_id);
        if($found){

            $query = "DELETE FROM  users 
                where id= $_id";
            $result = $db->query($query);
            if ($result) {
                return "delete Successfully!";
            } else {
                return "Error:" . $db->error;
            }
        }else{
                http_response_code(404);
                return "User not found!";

        }
    }
}
?>