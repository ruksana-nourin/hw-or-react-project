<?php

function getMembers()
{
    echo json_encode(Member::getAll());
}