<?php

class Issue
{
    public $id;
    public $issue_code;
    public $member_id;
    public $book_id;
    public $issue_date;
    public $due_date;
    public $return_date;
    public $status_id;
    public $fine_amount;

    public function __construct(
        $id = null,
        $issue_code = "",
        $member_id = 0,
        $book_id = 0,
        $issue_date = "",
        $due_date = "",
        $return_date = null,
        $status_id = 1,
        $fine_amount = 0
    ) {
        $this->id = $id;
        $this->issue_code = $issue_code;
        $this->member_id = $member_id;
        $this->book_id = $book_id;
        $this->issue_date = $issue_date;
        $this->due_date = $due_date;
        $this->return_date = $return_date;
        $this->status_id = $status_id;
        $this->fine_amount = $fine_amount;
    }

    public function create()
    {
        global $db;
        // Get next ID
        $result = $db->query(
            "SELECT MAX(id) AS max_id FROM issues"
        );

        $row = $result->fetch_assoc();

        $nextId = ((int) $row['max_id']) + 1;

        // Generate issue code
        $issueCode = "ISS-" . str_pad(
            $nextId,
            4,
            "0",
            STR_PAD_LEFT
        );

        $sql = "INSERT INTO issues
                (
                    issue_code,
                    member_id,
                    book_id,
                    issue_date,
                    due_date,
                    return_date,
                    status_id,
                    fine_amount
                )
                VALUES
                (
                    '$this->issue_code',
                    '$this->member_id',
                    '$this->book_id',
                    '$this->issue_date',
                    '$this->due_date',
                    NULL,
                    '$this->status_id',
                    '$this->fine_amount'
                )";

        $result = $db->query($sql);

        if ($result) {
            return [
                "success" => true,
                "id" => $db->insert_id,
                "message" => "Issue created successfully"
            ];
        }

        return [
            "success" => false,
            "message" => $db->error
        ];
    }

    public static function getAll()
    {
        global $db;

        $sql = "SELECT
                    i.id,
                    i.issue_code,
                    i.member_id,
                    m.member_code,
                    m.name AS member_name,
                    i.book_id,
                    b.title AS book_title,
                    b.isbn,
                    i.issue_date,
                    i.due_date,
                    i.return_date,
                    i.status_id,
                    i.fine_amount
                FROM issues i, members m, books b
                WHERE i.member_id = m.id
                AND i.book_id = b.id
                ORDER BY i.id DESC";

        $result = $db->query($sql);

        if (!$result) {
            return [
                "success" => false,
                "message" => $db->error
            ];
        }

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public static function getNextIssueCode()
    {
        global $db;

        $sql = "SELECT MAX(id) AS max_id FROM issues";

        $result = $db->query($sql);

        if (!$result) {
            return [
                "success" => false,
                "message" => $db->error
            ];
        }

        $row = $result->fetch_assoc();

        $nextId = ((int) $row['max_id']) + 1;

        $issueCode = "ISS-" . str_pad(
            $nextId,
            4,
            "0",
            STR_PAD_LEFT
        );

        return [
            "success" => true,
            "issueCode" => $issueCode
        ];
    }
    public static function getById($id)
    {
        global $db;

        $sql = "SELECT
            i.id,
            i.issue_code,
            i.member_id,
            m.member_code,
            m.name AS member_name,
            i.book_id,
            b.title AS book_title,
            b.isbn,
            i.issue_date,
            i.due_date,
            i.return_date,
            i.status_id,
            i.fine_amount
        FROM issues i, members m, books b
        WHERE i.member_id = m.id
        AND i.book_id = b.id
        AND i.id = '$id'
        LIMIT 1";

        $result = $db->query($sql);

        if (!$result) {
            return [
                "success" => false,
                "message" => $db->error
            ];
        }

        if ($result->num_rows == 0) {
            return [
                "success" => false,
                "message" => "Issue not found"
            ];
        }

        return [
            "success" => true,
            "data" => $result->fetch_assoc()
        ];
    }
    public function returnBook(
        $returnDate,
        $fineAmount,
        $statusId
    ) {
        global $db;

        $sql = "UPDATE issues
            SET
                return_date = '$returnDate',
                status_id = '$statusId',
                fine_amount = '$fineAmount'
            WHERE id = '$this->id'";

        $result = $db->query($sql);

        if ($result) {

            return [
                "success" => true,
                "message" => "Book returned successfully"
            ];

        }

        return [
            "success" => false,
            "message" => $db->error
        ];
    }
}
