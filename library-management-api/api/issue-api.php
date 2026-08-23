<?php

function getIssues()
{
    echo json_encode(Issue::getAll());
}

function createIssue($data)
{
    $issue = new Issue(
        null,
        $data['issueCode'],
        $data['memberId'],
        $data['bookId'],
        $data['issueDate'],
        $data['dueDate'],
        null,
        1,
        0
    );

    echo json_encode($issue->create());
}

function getIssueById($id)
{
    echo json_encode(Issue::getById($id));
}

function getNextIssueCode()
{
    echo json_encode(Issue::getNextIssueCode());
}
function returnIssue($data)
{
    $issue = new Issue(
        $data['id'],
        "",
        0,
        0,
        "",
        "",
        "",
        0,
        $data['fineAmount']
    );

    echo json_encode(
        $issue->returnBook(
            $data['returnDate'],
            $data['fineAmount'],
            $data['statusId']
        )
    );
}