<?php 
    $title = "게시판 관리";
    $js = "admin";$_SESSION['timeout'] = time();
    require_once '_h.php';
    session_start();
    if ( isset($_SESSION['a'])
    && $_SESSION['a']=='targ0'
    && (!(time() - $_SESSION['timeout'] > 30*60)) ) {
        $_SESSION['timeout'] = time();
        header('Location: adminpage.php?p=1');exit;
    } else {
        if(isset($_SESSION['timeout']) && time() - $_SESSION['timeout'] > 9*60){
            session_unset();
            session_destroy();
        }
        echo '<section id="adminsection">
        <div id="form">
            <label for="pw">관리원 번호</label>
            <input type="password" id="pw">
            <button id="ikz">로그인</button>
            <p id="wrongpw">다시 시도하십시오.</p>
        </div>';
    }
?>

</section></main></body></html>