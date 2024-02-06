$(document).ready(()=>{
    $("#blind,#eor,#msg,#allshown,#replist,#rmsg,#rashown").hide().css("visibility","visible");
    $("#asd,#noreply").hide();
    const spiterr = (x,s)=>{
        console.error(x.responseText);
        $("#errstat").text(s); $('#eor').show();
    }

    // #ar
    let offset = 0
        ,repoffset = 0;
    const aRow = `
    <div class="row">
        <p class="gid"></p>
        <p class="cp"></p>
        <p><img src="s/ellipsis.svg" alt="ellipsis" title="답장 보기"></p>
        <input name="m"></input>
    </div>`
    ,newHTML = (jd,after)=>{
        let table = $('#ar');
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
                            $(this).find('.gid').text(value);
                        });
                        table.find('.row:nth-child('+os+')').each(function(_){
                            $(this).find('.check').text(value);
                        });
                        break;

                    case 1:
                        table.find('.row:nth-child('+os+')').each(function(_){
                            $(this).find('.cp').append('&nbsp;'+value);
                        });
                        break;
                }
            });
        });
    }
    ,fetch = (isInit=false) => {
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
            error: function(x,s){spiterr(x,s)}
        });
    }
    $("#more").click(function(){
        $(this).hide();
        fetch();
    });


    // #asd (#replist)
    let thisg,thisr;
    const asd = $('#replist,#asd')
        ,noasd = $('#replist,#noreply')
        ,repRow = `
    <div class="row">
        <p class="rid"></p>
        <p class="ut"></p>
        <p class="rtxt"><textarea rows="1"></textarea></p>
        <p><input type="text" class="rz"></p>
        <p class="rsave">저장</p>
        <p><input type="checkbox" class="check"></p>
    </div>`
    ,utn = t=>{
        let ut = new Date(t * 1000);
        return ut.toLocaleDateString("ko-KR", {year: "numeric", month: "2-digit", day: "2-digit"}).replace(/ /g,'').slice(0, -1);
    }
    ,newREPL = (jd,after)=>{
        let table = $('#asd');
        let html = '';
        for (let i=0; i<jd.length; i++) {
            html+=repRow;
        }
        $(after).after($(html));
        $.each(jd, function(_, jdrow) {
            repoffset+=1;
            $.each(jdrow, function(y, value) {
                let os = repoffset +1;
                switch(y) {
                    case 0:
                        table.find('.row:nth-child('+os+')').each(function(_){
                            $(this).find('.rid').text(value);
                        });
                        table.find('.row:nth-child('+os+')').each(function(_){
                            $(this).find('.check').val(value);
                        });
                        break;

                    case 1:
                        table.find('.row:nth-child('+os+')').each(function(_){
                            $(this).find('textarea').val(value);
                        });
                        break;

                    case 2:
                        table.find('.row:nth-child('+os+')').each(function(_){
                            $(this).find('.rz').val(value);
                        });
                        break;
    
                    case 3:
                        table.find('.row:nth-child('+os+')').each(function(_){
                            $(this).find('.ut').text(utn(value));
                        });
                        break;
                }
            });
        });
    }
    ,getreplies= (t,rInit=false)=>{
        $('#rmsg').show();
        $.ajax({
            url: "s/admin.php", method: "POST",
            data: { repoffset: repoffset, to: t },
            success: function(data) {
                if(rInit){
                    if(data=="000"){
                        noasd.show();
                    }else{
                        newREPL(data,"#asdtitle");
                        asd.show();
                        $('#rmore').show();
                    }
                } else {
                    if(data!="000"){
                        $('#rmore').show();
                        newREPL(data,".row:last");
                    }
                    else{$('#rashown').show()}
                }
                $('#rmsg').hide();
            },
            error: function(x,s){spiterr(x,s)}
        });
    }
    $(document).on('click','#ar .row',function(){
        thisg = $(this).find('.gid').text();
        repoffset = 0;
        getreplies(thisg,true);
    });
    $("#rmore").click(function(){
        $(this).hide();
        getreplies(thisg);
    });

    // close #asd(#replist)
    $('#closereplist').click(_=>{
        $('#replist,#rmsg,#rashown').hide();
        asd.hide(); noasd.hide();
        $("#asd .row").remove();
        $('#rmore').show();
    });


    // #blind
    $(document).on('click','.rtxt,.rtxt textarea',function(){
        thisr = $(this).find('textarea');
        $("#bltxt").val(thisr.val());
        $("#blind").show();
    });
    $("#closetxtedit").click(_=>{
        thisr.val($("#bltxt").val());
        $("#blind").hide();
        $("#bltxt").val('');
    });


    // save changed data
    $(document).on("click", ".rsave", function(){
        $('#rmsg').show();
        const g = $(this).parent();
        let tosave = [];
        tosave.push(g.find('textarea').val());
        tosave.push(g.find('.rz').val());
        tosave.push(g.find('.rid').text());
        $.ajax({
            url: "s/admin.php", method: "POST",
            data: {rput: JSON.stringify(tosave)},
            error: function(x,s){spiterr(x,s)},
            complete: function(xhr) {
                if(xhr.status==204){location.reload()}
            },
        });
    });


    // delete selected
    $('#deleteselect').click(_=>{
        $('#rmsg').show();
        let todelete = [];
        $(".check").each(function(){
            if ($(this).is(":checked")) {
                todelete.push($(this).val());
            }
        });
        const xdels=todelete.length;
        let cfmmsg='';
        if(xdels==1){cfmmsg='이 항목을 완전히 삭제하시겠습니까?';}
        else{cfmmsg=`이 ${xdels}개의 항목을 완전히 삭제하시겠습니까?`;}
        if(!xdels<1){ if(confirm(cfmmsg)){
            $.ajax({
                url: "s/admin.php", method: "POST",
                data: {rdel: JSON.stringify(todelete)},
                error: function(x,s){spiterr(x,s)},
                complete: function(xhr) {
                    console.log(xhr.status);
                    if(xhr.status==204){location.reload()}
                },
            });
        }}
    });


    // document init
    fetch(true);
});