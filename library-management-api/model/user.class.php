<?php

// require_once "../config/db.php";

// echo "USER CLASS LOADED<br>";
class User
{

    public $id;
    public $name;
    public $email;
    public $phone;
    public $role_id;
    public $status_id;
    public $department_id;
    public $address;
    public $notes;
    public $created_at;

    private $password;

    public function __construct(
        $id = null,
        $name = "",
        $email = "",
        $phone = "",
        $role_id = null,
        $status_id = null,
        $department_id = null,
        $address = null,
        $notes = null,
        $created_at = "",
        $password = ""
    ) {

        $this->id = $id;
        $this->name = $name;
        $this->email = $email;
        $this->phone = $phone;
        $this->role_id = $role_id;
        $this->status_id = $status_id;
        $this->department_id = $department_id;
        $this->address = $address;
        $this->notes = $notes;
        $this->created_at = $created_at;

        if ($password !== "") {
            $this->password = password_hash($password, PASSWORD_DEFAULT);
        }
    }

    public static function getAll()
    {
        // echo "function called Succesfully";
        global $db;

        $query = "SELECT 
                    u.id,
                    u.name,
                    u.email,
                    u.phone,
                    u.role_id,
                    r.name AS role,
                    u.status_id,
                    s.name AS status,
                    u.department_id,
                    d.name AS department,
                    u.created_at
                  FROM users AS u, 
                       roles AS r,
                       statuses AS s,
                       departments AS d
                  WHERE u.role_id = r.id
                    AND u.status_id = s.id
                    AND u.department_id = d.id
                  ORDER BY u.id DESC";

        $result = $db->query($query);

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public static function getById($id)
    {

        global $db;
        $query = "SELECT 
                    u.id,
                    u.name,
                    u.email,
                    u.phone,
                    u.role_id,
                    r.name AS role,
                    u.status_id,
                    s.name AS status,
                    u.department_id,
                    d.name AS department,
                    u.created_at,
                    u.address,
                    u.last_login
                  FROM users AS u, 
                       roles AS r,
                       statuses AS s,
                       departments AS d
                  WHERE u.role_id = r.id
                    AND u.status_id = s.id
                    AND u.department_id = d.id
                    AND u.id = $id";
        $result = $db->query($query);
        return $result->fetch_assoc();
    }
    public function create()
    {
        global $db;
        $query = "INSERT into users(name, email, phone, address, role_id, status_id, department_id ,notes, password)
        values('$this->name', '$this->email','$this->phone', '$this->address', $this->role_id, '$this->status_id', '$this->department_id', '$this->notes', '$this->password')
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
        phone = '$this->phone',
        role_id = $this->role_id,
        status_id = $this->status_id,
        department_id = $this->department_id,
        address = '$this->address',
        notes = '$this->notes'
        where id = $this->id";

        $result = $db->query($query);

        if ($result) {
            return "Updated Successfully";
        } else {
            return "Error:" . $db->error;
        }
    }


}
