<?php

function checkLogin($data)
{
    echo json_encode(
        Auth::login(
            $data['email'],
            $data['password']
        )
    );
}