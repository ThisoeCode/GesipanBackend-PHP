<?php session_start();
function lout(){
    session_unset();
    session_destroy();
    header('Location: admin.php');die;
}
if(!isset($_SESSION['a'])){
    header('Location: admin.php');die;
} else {
    if(time() - $_SESSION['timeout'] > 30*60) {lout();}
    else {
        if(isset($_GET['p'])){
            if($_GET['p']=='1'){
                $title = "게시판 관리";
                $js = "adminpage";
                require '_h.php';
                require "req/reqadmin.php";
            }else if($_GET['p']=='2'){
                $title = "답장 관리";
                $js = "adminreply";
                require '_h.php';
                require "req/reqadcom.php";
            }
            $_SESSION['timeout']=time();
        }else{lout();}
    }
}
?>