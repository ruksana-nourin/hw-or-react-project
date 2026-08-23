<?php

class Member
{
    public static function getAll()
    {
        global $db;

        $sql = "SELECT
                    id,
                    member_code,
                    name,
                    email,
                    phone,
                    status_id
                FROM members
                ORDER BY id DESC";

        $result = $db->query($sql);

        if (!$result) {
            return [
                "success" => false,
                "message" => $db->error
            ];
        }

        return $result->fetch_all(MYSQLI_ASSOC);
    }
}