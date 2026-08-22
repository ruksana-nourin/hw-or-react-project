<?php
function createProduct($_data, $_files)
{
    $img = null;
    if (isset($_files['image'])) {
        //     echo "file uploded";
        $result = imgUpload($_files['image'], "../uploads/products");
        // print_r($result);
        if (isset($result['success'])) {
            $img = $result['success'];
        } else {
            http_response_code(400);
            echo $result['error'];
            exit;
        }
    } else {
        //     echo "file not uploded";


    }
    $product = new Product(
        null,
        $_data['name'],
        $_data['category_id'],
        $_data['brand_id'],
        $_data['desc'],
        $_data['price'],
        $_data['quantity'],
        $_data['restock'],
        $img,
        $_data['active']
    );
    echo json_encode ($product->create());
}
function getProducts(){
        echo json_encode(Product:: getAll());
    }
?>