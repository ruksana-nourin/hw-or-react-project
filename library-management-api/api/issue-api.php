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

function getNextIssueCode()
{
    echo json_encode(Issue::getNextIssueCode());
}
