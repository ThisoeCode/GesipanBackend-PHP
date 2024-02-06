<?php
require_once "./req/envi.php";

$D1=$_ENV['DB_HOSTNAME'];
$D2=$_ENV['DB_USERNAME'];
$D3=$_ENV['DB_PASSWORD'];
$D4=$_ENV['DB_DATABASE'];

$in_su = mysqli_connect($D1,$D2,$D3,$D4);
if ($in_su->connect_error) {
    http_response_code(500);
    die("[Thisoe] DB Connection failed: " . $in_su->connect_error);
}