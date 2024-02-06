$(document).ready(function() {
    $("#fin,#err,#msg,#allshown").hide().css("visibility","visible");
    const $dw = $("details");
    const g = new URLSearchParams(window.location.search).get("g");
    const retime$ = t =>{
        let u = $(t).text();
        let ut = new Date(u*1000);
        let uyear = ut.getFullYear();
        let umonth = (ut.getMonth() + 1).toString(); // Month is zero-based
        let uday = ut.getDate().toString();
        let uh = ut.getHours().toString();
        let um = ut.getMinutes().toString();
        $(t).text(`${uyear}/${umonth}/${uday}  ${uh}시${um}분`);
    }
    retime$("span");


    // post reply
    const post = ()=>{
        if (confirm('답장 발표하기 확실합니까?\n나중에 수정할 수 없습니다.')) {
            $.ajax({
                type: "POST",
                url: "_submit.php",
                data: {
                    n: encodeURIComponent($("input").val()),
                    c: encodeURIComponent($("textarea").val()),
                    i: g
                },
                success: (ret)=>{
                    console.log(ret);
                    $("#w").hide(); $('#fin').show();
                },
                error: function(x,s) {
                    console.error(x.responseText);
                    $("#errstat").text(s); $('details').remove();
                    $('#err').show();
                }
            });
        }
    }
    $("input").keydown(e=>{ if(e.keyCode===13){post()} });
    $("#bp").click(()=>{post()});
    $("#onemore").click(()=>{
        $("textarea,input").val('');
        $("#fin").hide(); $("#w").show();
    });


    // reply ajax
    let i = 0;
    const newHTML = jd=>{
        let html = '';
        $.each(jd, function(_, row) {
            html += '<div class="replywrap">';
            $.each(row, function(index, value) {
                i+=1;
                switch(index){
                    case 0: html += `<h6><span>${value}</span><span>•</span><span>`; break;
                    case 1:
                        ut = new Date(value * 1000);
                        let uyear = ut.getFullYear(); let umonth = (ut.getMonth() + 1).toString();  uday = ut.getDate().toString(); let uh = ut.getHours().toString(); let um = ut.getMinutes().toString();
                        html += `${uyear}/${umonth}/${uday}  ${uh}시${um}분</span></h6>`; break;
                    case 2:
                        html += `<div class="cmtwrap"><div></div><p>${value.replace(/(https?:\/\/[^\s\n]+)/g, function(url){ return `<a href="${url}" target="_blank">${url}</a>`; }).replace(/\n/g, '<br>')}</p></div></div><hr>`; break;
                }
            });
        });
        return html;
    }
    const fetch = (isInit=0) => {
        $.ajax({
            url: "_fetch.php",
            method:"POST",
            data: {load:i, g:g},
            success: data=>{
                if(isInit){
                    if(data=="000"){
                        $('details').prop('open',true);
                        $('#allshown').text('답장 없음').show();
                        $('#gotoreply,#more').hide();
                    }else{
                        $("h4").after($(newHTML(data))); $("hr:last").remove();
                    }
                } else{
                    if(data!="000"){
                        $('#more').show();
                        $(".replywrap:last").after($(newHTML(data)));  $("hr:last()").remove();
                    }
                    else{$('#allshown').show()}
                }
            },
            error: function(x,s) {
                console.error(x.responseText);
                $("#errstat").text(s);
                $('#eor').show();
            }
        });
    }
    fetch(1);
    $('#more').click(function(){
        $(this).hide(); $('#msg').show();
        fetch();
        $('#msg').hide();
    });


    // goto reply from bottom button
    $("#gotoreply").click(function() {
        $dw.prop('open',true);
        $("section").animate(
            {scrollTop: '+=' + ( $dw.offset().top - 99)}, 500,
            ()=>{$("textarea").focus()}
        );
    });
});