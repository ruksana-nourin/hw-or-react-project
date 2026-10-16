<?php

class Member
{
    public $id;
    public $member_code;
    public $name;
    public $email;
    public $phone;
    public $address;
    public $membership_type_id;
    public $registration_fee;
    public $payment_status_id;
    public $registration_date;
    public $status_id;

    public function __construct(
        $id = null,
        $member_code = "",
        $name = "",
        $email = "",
        $phone = "",
        $address = "",
        $membership_type_id = null,
        $registration_fee = 0,
        $payment_status_id = null,
        $registration_date = "",
        $status_id = null
    ) {
        $this->id = $id;
        $this->member_code = $member_code;
        $this->name = $name;
        $this->email = $email;
        $this->phone = $phone;
        $this->address = $address;
        $this->membership_type_id = $membership_type_id;
        $this->registration_fee = $registration_fee;
        $this->payment_status_id = $payment_status_id;
        $this->registration_date = $registration_date;
        $this->status_id = $status_id;
    }
    public static function getAll()
    {
        global $db;

        $sql = "SELECT
                m.id,
                m.member_code,
                m.name,
                m.email,
                m.phone,

                mt.name AS membership_types,

                m.registration_fee,

                ps.name AS payment_statuses,

                m.registration_date,
                m.address,

                s.name AS status

            FROM members AS m,
                membership_types AS mt,
                payment_statuses AS ps,
                statuses AS s

        WHERE m.membership_type_id = mt.id
          AND m.payment_status_id = ps.id
          AND m.status_id = s.id

            ORDER BY m.id DESC";

        $result = $db->query($sql);

        if (!$result) {
            return [
                "success" => false,
                "message" => $db->error
            ];
        }

        return $result->fetch_all(MYSQLI_ASSOC);
    }

    public function create()
    {
        global $db;

        $sql = "INSERT INTO members
            (
                member_code,
                name,
                email,
                phone,
                address,
                membership_type_id,
                registration_fee,
                payment_status_id,
                registration_date,
                status_id
            )
            VALUES
            (
                '$this->member_code',
                '$this->name',
                '$this->email',
                '$this->phone',
                '$this->address',
                $this->membership_type_id,
                $this->registration_fee,
                $this->payment_status_id,
                '$this->registration_date',
                $this->status_id
            )";

        $result = $db->query($sql);

        if ($result) {
            return $db->insert_id;
        } else {
            return $db->error;
        }
    }

    public static function getNextMemberCode()
    {
        global $db;

        $sql = "SELECT id
            FROM members
            ORDER BY id DESC
            LIMIT 1";

        $result = $db->query($sql);

        if ($result && $result->num_rows > 0) {

            $row = $result->fetch_assoc();

            $nextId = (int)$row['id'] + 1;
        } else {

            $nextId = 1;
        }

        return "MEM-" . str_pad($nextId, 4, "0", STR_PAD_LEFT);
    }
}
