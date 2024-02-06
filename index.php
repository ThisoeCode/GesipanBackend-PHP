<?php 
    $title = "게시판";
    $js = "s";
    require_once '_h.php';
?>
<section>
    <h2>홈</h2>
    <div id="table">
        <div id="title">
            <p>번호</p>
            <p>제목</p>
            <p>작성자</p>
            <p>발표한 날짜</p>
        </div>
    </div>
    <button id="more">더보기</button>
    <p id="msg">로드 중...</p><p id="allshown">모든 게시가 표시됩니다.</p>
    <div id="eor"><p style="color:darkred">[<span id="errstat"></span>] 오류가 발생했습니다.</p></div>
</section></main></body></html>