<?php session_start();
function forbid(){echo '403 Forbidden';http_response_code(403);die;}
if(isset($_POST['pw'])){
    if($_POST['pw']==='admin'){
        $_SESSION['a']='targ0';
        $_SESSION['timeout'] = time();
        echo '1'; exit;
    }
    else{echo '0';}

} else if(isset($_POST['offset'])){
    $os = $_POST['offset'];
    require "in.su.php";
    $result = $in_su->query("SELECT `no`,title,`name`,dt,ctt FROM gesipan ORDER BY `no` DESC LIMIT $os, 30");
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

} else if(isset($_POST['repoffset'])){
    $os = $_POST['repoffset'];
    $to = $_POST['to'];
    require "in.su.php";
    $result = $in_su->query("SELECT `no`,ctt,`name`,dt FROM gesipan_reply WHERE `to` = $to ORDER BY `no` DESC LIMIT $os, 30;");
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

} else if(isset($_POST['g'])){
    $p = $_POST['g'];
    require "s/in.su.php";
    $result = $in_su->query("SELECT * FROM gesipan WHERE `no`=$p");
    if($r = mysqli_fetch_array($result)){
        echo nl2br($r['ctt']);
    }else{
        http_response_code(204);
    }
    exit;

} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $ids = json_decode(file_get_contents('php://input'), true);
    if (!empty($ids)) {
        require "in.su.php";
        $ids_str = implode(',', array_map('intval', $ids));
        $sql = "DELETE FROM gesipan WHERE `no` IN ($ids_str)";
        if ($in_su->query($sql) === TRUE) {
            http_response_code(204);exit;
        } else {
            echo $in_su->error;
            http_response_code(500);exit;
        }
    } else {
        http_response_code(200);exit;
    }

}else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);
    if (count($data)==4) {
        require "in.su.php";
        $sql = "UPDATE gesipan SET `title`=?, `name`=?, `ctt`=? WHERE `no`=?";
        $stmt = $in_su->prepare($sql);
        $stmt->bind_param("sssi", $data[1], $data[2], $data[3], $data[0]);
        if ($stmt->execute()) {
            http_response_code(204);
        } else {
            echo "Error PUTting: " . $in_su->error;
            http_response_code(500);
        }
        $stmt->close();$in_su->close();
    }else{forbid();}

}else if (isset($_POST['rput'])) {
    $json_data = $_POST['rput'];
    $data = json_decode($json_data, true);
    if (count($data)==3) {
        require "in.su.php";
        $sql = "UPDATE gesipan_reply SET `ctt`=?, `name`=? WHERE `no`=?";
        $stmt = $in_su->prepare($sql);
        $stmt->bind_param("ssi", $data[0],$data[1],$data[2]);
        if ($stmt->execute()) {
            http_response_code(204);
        } else {
            echo "Error PUTting: " . $in_su->error;
            http_response_code(500);
        }
        $stmt->close();$in_su->close();
    }else{forbid();}

} else if (isset($_POST['rdel'])){
    $ids = json_decode($_POST['rdel'], true);
    if (!empty($ids)) {
        require "in.su.php";
        $imp = implode(',', array_map('intval', $ids));
        $sql = "DELETE FROM gesipan_reply WHERE `no` IN ($imp)";
        if ($in_su->query($sql) === TRUE) {
            http_response_code(204);exit;
        } else {
            echo $in_su->error;
            http_response_code(500);exit;
        }
    } else {
        http_response_code(200);exit;
    }

} else {forbid();} exit;