<?php 
    $title = "게시판";
    $js = "detail";
    require_once '_h.php';
?>
<section><h2>게시 본문</h2><article>
<?php
    $noctt='<p id="unexist">이 게시물은 존재하지 않거나 삭제되었습니다.</p></article>';

    if(isset($_GET['g'])){
        $p = $_GET['g'];
        require "s/in.su.php";
        $result = $in_su->query("SELECT * FROM gesipan WHERE `no`=$p");
        if($r = mysqli_fetch_array($result)){
            if($r['stat']==1){
                show($r);
                comment();
            } else {echo $noctt;}
        }else{
            echo $noctt;
        }
    }else{echo $noctt;}

// comment
function show($i){
    echo "<h3>".$i['title']."</h3>";
    echo "<h5>작성자 ".$i['name']."<br>";
    echo "작성일 <span>".$i['dt']."</span></h5>";
    // 1. Replace URLs with <a> tags; 2. THE `nl2br()` MUST BE THE OUTER LAYER
    echo '<p id="maintxt">'.nl2br(preg_replace('/(https?:\/\/[^\s\n]+)/','<a href="$1" target="_blank">$1</a>',$i['ctt']))."</p>";
}
function comment(){
echo "
</article>
<details>
    <summary>답장 쓰기</summary>
    <div id='w'>
        <textarea placeholder='답장 본문...'></textarea>
        <input type='text' placeholder='작성자 이름'>
        <button id='bp'>답글 보내기</button>
    </div>
    <div id='fin'><p>발표 완료 됐습니다.</p><button id='onemore'>또 하나 쓰기</button></div>
    <div id='err'><p style='color:darkred'>[<span id='errstat'></span>] 오류가 발생했습니다.</p></div>
</details>
<div id='comment'><h4>답장 일람</h4>
<p id='msg'>로드 중...</p><p id='allshown'>모든 게시가 표시됩니다.</p>
<div id='btnrow'>
    <button id='more'>더보기</button>
    <button id='gotoreply'>답장 쓰기</button>
</div></div>
";
}
?>
</section></main></body></html>