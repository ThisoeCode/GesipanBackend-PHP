$(document).ready(function() {
    $("#suc,#err").toggle();
    $("#suc,#post").css("visibility","visible");

    let itv;
    let i=9;
    const tohome = ()=>{
        clearInterval(itv);
        window.location.replace('index.php');
    }

    // posting
    $("#bp").click(()=>{
        if (confirm('게시 발표하시겠습니까?\n나중에 수정할 수 없습니다.')) {
            $.ajax({
                type: "POST",
                url: "_submit.php",
                data: {
                    t: encodeURIComponent($("#titl").val()),
                    u: encodeURIComponent($("#name").val()),
                    c: encodeURIComponent($("textarea").val()),
                },
                success: _=>{
                    window.open("index.php","_self");
                    // $('#post').remove(); $('#f').text(' 완료');
                    // itv=setInterval(()=>{
                    //     if(i<=0){tohome()}
                    //     $('#s').text(i);
                    //     i+=-1;
                    // },999);
                    // $('#suc').show();
                    // $('#goto').click(()=>{tohome()});
                },
                error: function(x,s) {
                    console.error(x.responseText);
                    $("#errstat").text(s); $('#post').remove();
                    $('#err').show();
                }
            });
        }
    });

});