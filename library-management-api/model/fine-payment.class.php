<?php

class FinePayment
{
    public static function create(
        $issueId,
        $paidAmount,
        $paymentDate = null,
        $receivedBy = null,
        $notes = null
    ) {
        global $db;

        // Payment status
        // 1 = Paid
        $paymentStatusId = 1;

        $sql = "INSERT INTO fine_payments
                (
                    issue_id,
                    payment_status_id,
                    paid_amount,
                    payment_date,
                    received_by,
                    notes
                )
                VALUES
                (
                    '$issueId',
                    '$paymentStatusId',
                    '$paidAmount',
                    " . ($paymentDate ? "'$paymentDate'" : "NULL") . ",
                    " . ($receivedBy ? "'$receivedBy'" : "NULL") . ",
                    " . ($notes ? "'$notes'" : "NULL") . "
                )";

        $result = $db->query($sql);

        if ($result) {

            return [
                "success" => true,
                "id" => $db->insert_id,
                "message" => "Fine payment recorded successfully"
            ];
        }

        return [
            "success" => false,
            "message" => $db->error
        ];
    }
}
