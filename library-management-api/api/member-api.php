<?php

function getMembers()
{
    echo json_encode(Member::getAll());
}


function createMember($data)
{
    $membershipTypeId = [
        "Regular" => 1,
        "Student" => 2,
        "Premium" => 3
    ];

    $paymentStatusId = [
        "Paid" => 1,
        "Partial" => 2,
        "Unpaid" => 3
    ];

    $statusId = [
        "Active" => 1,
        "Inactive" => 2
    ];


    $memberCode = Member::getNextMemberCode();
    $member = new Member(
        null,
        $memberCode,
        $data['name'],
        $data['email'],
        $data['phone'],
        $data['address'],
        $membershipTypeId[$data['membershipType']],
        $data['registrationFee'],
        $paymentStatusId[$data['paymentStatus']],
        $data['registrationDate'],
        $statusId[$data['status']]
    );


    $result = $member->create();


    if (is_numeric($result)) {

        echo json_encode([
            "success" => true,
            "message" => "Member created successfully",
            "id" => $result
        ]);

    } else {

        http_response_code(400);

        echo json_encode([
            "success" => false,
            "message" => $result
        ]);
    }
}

function getNextMemberCode()
{
    echo json_encode([
        "success" => true,
        "memberCode" => Member::getNextMemberCode()
    ]);
}