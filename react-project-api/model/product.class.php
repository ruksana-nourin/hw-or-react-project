<?php

class Product
{
    public $id;
    public $name;
    public $category_id;
    public $brand_id;
    public $short_description;
    public $price;
    public $quantity;
    public $point_of_restock;
    public $image;
    public $active;
    public function __construct($id, $name, $category_id, $brand_id, $short_description, $price, $quantity, $point_of_restock, $image, $active)
    {
        $this->id = $id;
        $this->name = $name;
        $this->category_id = $category_id;
        $this->brand_id = $brand_id;
        $this->short_description = $short_description;
        $this->price = $price;
        $this->quantity = $quantity;
        $this->point_of_restock = $point_of_restock;
        $this->image = $image;
        $this->active = $active;
    }
    public function create()
    {
        global $db;
        $sql = "INSERT INTO products(name, category_id, brand_id, short_description, price, quantity, point_of_restock, image, active) 
        VALUES(
        '$this->name', 
        $this->category_id, 
        $this->brand_id,
        '$this->short_description', 
        $this->price, 
        $this->quantity, 
        $this->point_of_restock, 
        '$this->image', 
        $this->active)";
        // $result = $db->query($sql);
        // return $db->insert_id;
        $result = $db->query($sql);
        if ($result) {
            return $db->insert_id;
        } else {
            return $db->error;
        }
        // return $db->insert_id;
    }
    static public function getAll()
    {
        global $db;
        $sql = "SELECT p.id, p.name, p.price, p.quantity, b.name as brand, c.name as category, p.image as image_path
        FROM products p, brands b, categories c
        WHERE p.brand_id = b.id AND p.category_id = c.id
        ORDER BY id DESC";

        $result = $db->query($sql);
        return $result->fetch_all(MYSQLI_ASSOC);
    }
}

?>