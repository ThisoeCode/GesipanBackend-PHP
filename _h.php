<?php $t = (time()-1666777888); ?>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $title; ?> | Thisoe</title>
    <link rel="icon" href="../icon.png" />
    <link rel="stylesheet" href="s/s.css?v=<?php echo $t; ?>">
    <meta name="theme-color" content="#178577">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="s/_.js?v=0"></script><script src="s/<?php echo $js.'.js?v='.$t; ?>"></script>
</head>
<body>
<img id="menubtn" class="imgbtn" src="s/menu.svg" alt="menu" title="메뉴">
<img id="menu-x" class="imgbtn" src="s/x.svg" alt="close" title="메뉴">
<img id="totop" class="imgbtn" src="s/top.svg" alt="Top" title="맨 위로 가기">
<?php if($js=="s"){
    echo '<img id="pen" class="imgbtn" src="s/pen.svg" alt="New" title="새로 쓰기">';}
    else{echo '<img id="home" class="imgbtn" src="s/home.svg" alt="home" title="홈">';}
?>
<nav>
    <h1>메뉴</h1><hr>
    <a href="index.php">게시판</a>
    <a href="post.php">새로 쓰기</a>
    <a href="admin.php">관리</a>
</nav>

<header>Thisoe 게시판</header>
<main>