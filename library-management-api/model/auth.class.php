<?php

class Auth
{
    public static function login($email, $password)
    {
        global $db;

        $sql = "SELECT * FROM users WHERE email = '$email'";

        $result = $db->query($sql);

        if ($result) {

            $user = $result->fetch_assoc();

            if ($user) {

                if (password_verify($password, $user['password'])) {
                    unset($user['password']);
                    http_response_code(200);

                    return [
                        "token" => generateJWT($user, 3600),
                        "user" => $user
                    ];
                } else {

                    http_response_code(401);

                    return "Invalid Password.";
                }
            } else {

                http_response_code(401);

                return "User not found.";
            }
        } else {

            return $db->error;
        }
    }
}
