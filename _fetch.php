<?php
function encode($i){
    return json_encode($i);
}
if(isset($_POST['offset'])){
    $os = $_POST['offset'];
    require "s/in.su.php";
    $result = $in_su->query("SELECT `no`,title,`name`,dt FROM gesipan WHERE stat = 1 ORDER BY `no` DESC LIMIT $os, 30");
    $data = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $values = array_values($row);
            $data[] = $values;
        }
        header('Content-Type: application/json');
        echo json_encode($data);
    } else {echo '000';}
    exit;


} else if(isset($_POST['load'])){
    $os = $_POST['load'];
    $id = $_POST['g'];
    require "s/in.su.php";
    $result = $in_su->query("SELECT `name`,dt,ctt FROM gesipan_reply WHERE `to` = $id AND ctt != '' AND stat = 1 ORDER BY `no` DESC LIMIT $os, 15;");
    $data = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $values = array_values($row);
            $data[] = $values;
        }
        header('Content-Type: application/json');
        echo json_encode($data);
    } else {echo '000';}
    exit;


} else {echo '403 Forbidden';http_response_code(403);} exit;