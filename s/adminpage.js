$(document).ready(()=>{
    $("#blind,#eor,#msg,#allshown").hide().css("visibility","visible");
    const spiterr = (x,s)=>{
        console.error(x.responseText);
        $("#errstat").text(s); $('#eor').show();
    }

    // ajax
    let offset = 0;
    const aRow = `
    <div class="row">
        <p></p>
        <p><input name="title" type="text"></p>
        <p><input name="auther" type="text"></p>
        <p></p>
        <p class="content">본문</p><p class="save">저장</p>
        <p><input type="checkbox" value="" class="check"></p>
        <textarea style="display:none"></textarea>
    </div>`;
    const newHTML = (jd,after)=>{
        const utn = t=>{
            let ut = new Date(t * 1000);
            return ut.toLocaleDateString("ko-KR", {year: "numeric", month: "2-digit", day: "2-digit"}).replace(/ /g,'').slice(0, -1);
        }
        let table = $('#admintable');
        let html = '';
        for (let i=0; i<jd.length; i++) {
            html+=aRow;
        }
        $(after).after($(html));
        $.each(jd, function(_, jdrow) {
            offset+=1;
            $.each(jdrow, function(y, value) {
                /** OffSet in nth-child */
                let os = offset +1;
                switch(y) {
                    case 0:
                        table.find('.row:nth-child('+os+')').each(function(_){
                            $(this).find('p:nth-child(1)').text(value);
                        });
                        table.find('.row:nth-child('+os+')').each(function(_){
                            $(this).find('.check').val(value);
                        });
                        break;

                    case 1:
                        table.find('.row:nth-child('+os+')').each(function(_){
                            $(this).find('input[name="title"]').val(value);
                        });
                        break;

                    case 2:
                        table.find('.row:nth-child('+os+')').each(function(_){
                            $(this).find('input[name="auther"]').val(value);
                        });
                        break;

                    case 3:
                        table.find('.row:nth-child('+os+')').each(function(_){
                            $(this).find('p:nth-child(4)').text(utn(value));
                        });
                        break;

                    case 4:
                        table.find('.row:nth-child('+os+')').each(function(_){
                            $(this).find('textarea').val(value);
                        });
                        break;
                }
            });
        });
    }
    const fetch = (isInit=0) => {
        $('#msg').show();
        $.ajax({
            url: "s/admin.php", method: "POST",
            data: { offset: offset },
            success: function(data) {
                if(isInit){
                    if(data=="000"){
                        $('#allshown').text('게시 없음').show();
                        $('#more').remove();
                    }else{
                        newHTML(data,"#title");
                    }
                } else{
                    if(data!="000"){
                        $('#more').show();
                        newHTML(data,".row:last");
                    }
                    else{$('#allshown').show()}
                }
                $('#msg').hide();
            },
            error: function(x,s){$('#msg').hide();spiterr(x,s)}
        });
    }
    $("#more").click(function(){
        $(this).hide(); $('#msg').show();
        fetch();
        $('#msg').hide();
    });


    // open detail
    let editarea;
    $(document).on('click', '.content', function() {
        editarea=$(this).parent().find('textarea');
        $("#bltxt").val(editarea.val());
        $("#blind").show();
    });
    $("#closetxtedit").click(_=>{
        editarea.val($("#bltxt").val());
        $("#blind").hide();
        $("#bltxt").val('');
    });


    // delete selected
    $('#deleteselect').click(_=>{
        $('#msg').show();
        let todelete = [];
        $(".check").each(function(){
            if ($(this).is(":checked")) {
                todelete.push($(this).val());
            }
        });
        const xdels=todelete.length;
        let cfmmsg='';
        if(xdels==1){
            cfmmsg='이 항목을 완전히 삭제하시겠습니까?';
        }else{
            cfmmsg=`이 ${xdels}개의 항목을 완전히 삭제하시겠습니까?`;
        }
        if(!xdels<1){ if(confirm(cfmmsg)){
            $.ajax({
                url: "s/admin.php", method: "DELETE",
                data: JSON.stringify(todelete),
                error: function(x,s){spiterr(x,s)},
                complete: function(xhr) {
                    if(xhr.status==204){ location.reload() }
                },
            });
        }}
        $('#msg').hide();
    });


    // save changed data
    $(document).on("click", ".save", function(){
        $('#msg').show();
        const g = $(this).parent();
        let tosave = [];
        tosave.push(g.find('p:eq(0)').text());
        tosave.push(g.find('input[name="title"]').val());
        tosave.push(g.find('input[name="auther"]').val());
        tosave.push(g.find('textarea').val());
        $.ajax({
            url: "s/admin.php", method: "PUT",
            data: JSON.stringify(tosave),
            error: function(x,s){spiterr(x,s)},
            complete: function(xhr) {
                if(xhr.status==204){location.reload()}
            },
        });
        $('#msg').hide();
    });
    // hover save highlight
    $(document).on("mouseenter", ".save", function() {
        $(this).parent().find('p:eq(1),p:eq(2),p:eq(4)').addClass("yellow");
    });
    $(document).on("mouseleave", ".save", function() {
        $(this).parent().find('p:eq(1),p:eq(2),p:eq(4)').removeClass("yellow");
    });

    // document init
    fetch(1);
});