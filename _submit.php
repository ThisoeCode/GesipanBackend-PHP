<?php
// post
function ifempty($i,$msg){
    return empty($i) ? $msg : strval(urldecode($i));
}
if(isset($_POST['u'])){
    $t=ifempty($_POST['t'],"제목 없음");
    $u=ifempty($_POST['u'],"(익명 발표)");
    $c=ifempty($_POST['c'],"본문 없음");
    $dt=time();$i=1;

    require "s/in.su.php";
    $query = "INSERT INTO `gesipan` (`title`, `name`,`ctt`,dt,stat) VALUES (?,?,?,?,?)";
    $stmt = $in_su->prepare($query);
    $stmt->bind_param("sssii",$t,$u,$c,$dt,$i);
    if ($stmt->execute()) {
        http_response_code(201);
        echo "[Thisoe] New Gesi created.";exit;
    } else {
        http_response_code(500);
        echo "[Thisoe] SQL error: " . $in_su->error;
    }

// reply
} else if(isset($_POST['n'])){
    $n=ifempty($_POST['n'],"(익명 발표)");
    $c=ifempty($_POST['c'],"");
    $to=$_POST['i'];
    $dt=time();$i=1;

    require "s/in.su.php";
    $query = "INSERT INTO `gesipan_reply` (`to`, `name`,`ctt`,dt,stat) VALUES (?,?,?,?,?)";
    $stmt = $in_su->prepare($query);
    $stmt->bind_param("issii",$to,$n,$c,$dt,$i);
    if ($stmt->execute()) {
        http_response_code(201);
        echo "[Thisoe] New Gesi created.";exit;
    } else {
        http_response_code(500);
        echo "[Thisoe] SQL error: " . $in_su->error;
    }

} else {echo '403 Forbidden';http_response_code(403);}