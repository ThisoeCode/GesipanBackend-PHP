<?php 
    $title = "새로 쓰기";
    $js = "post";
    require_once '_h.php';
?>
<section>
    <h2>새 게시 쓰기<span id="f"></span></h2>
    <div id="post">
        <input id="titl" type="text" placeholder="제목">
        <input id="name" type="text" placeholder="작성자 이름">
        <textarea placeholder="본문..."></textarea>
        <button id="bp">발표하기</button>
    </div>
    <div id="suc">
        <p>발표 완료 됐습니다.</p>
        <p><span id="s">10</span>초 후에 홈페이지로 이동합니다.</p>
        <button id="goto">홈으로 가기</button>
    </div>
    <div id="err"><p style="color:darkred">[<span id="errstat"></span>] 오류가 발생했습니다.</p></div>
</section></main></body></html>