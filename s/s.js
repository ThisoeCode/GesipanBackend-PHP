$(document).ready(()=>{
    $("#eor,#msg,#allshown").toggle().css("visibility","visible");

    // ajax
    let i = 0;
    const newHTML = jd=>{
        let html = '';
        $.each(jd, function(_, row) {
            i+=1;
            html += '<div class="row">';
            $.each(row, function(index, value) {
                if(index==3){
                    ut = new Date(value * 1000);
                    ut = ut.toLocaleDateString("ko-KR", {year: "numeric", month: "2-digit", day: "2-digit"})
                        .replace(/ /g,'').slice(0, -1);
                    html += '<p>'+ut+'</p>';
                }
                else{html += '<p>'+value+'</p>';}
            });
            html += '</div>';
        });
        return html;
    }
    const fetch = (isInit=0) => {
        $.ajax({
            url: "_fetch.php",
            method: "POST",
            data: { offset: i },
            success: function(data) {
                if(isInit){
                    if(data=="000"){
                        $('#allshown').text('게시 없음').show();
                        $('#more').remove();
                    }else{
                        $("#title").after($(newHTML(data)));
                    }
                } else{
                    if(data!="000"){
                        $('#more').show();
                        $(".row:last").after($(newHTML(data)));
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
    $("#more").click(function(){
        $(this).hide(); $('#msg').show();
        fetch();
        $('#msg').hide();
    });

    // go to detail
    $(document).on('click', '.row', function() {
        g=$(this).find('p:first').text();
        window.location.href = 'detail.php?g='+g;
    });

    fetch(1);
});