$(document).ready(function() {
    const er = $("#wrongpw");
    er.toggle().css("visibility","visible");

    const aj =_=>{
        $.ajax({
            type: "POST", url: "s/admin.php",
            data: {
                pw: encodeURIComponent($("#pw").val()),
            },
            success: fb=>{
                if(Number(fb)){window.location.replace('adminpage.php?p=1')}
                else{$('#pw').val('');er.hide().fadeIn(233);}
            }
        });
    }
    $('#ikz').click(()=>{aj()});
    $("#pw").keydown(function(e) {
        if (e.keyCode === 13) {aj()}
    });

});