$(document).ready(function() {
    $("nav").toggle().css("visibility","visible");
    $("#home").click(()=>{window.location.href="index.php"});
    $("#pen").click(()=>{window.location.href = 'post.php'});
    $("#menubtn,#menu-x").click(()=>{
        $("nav,#menubtn,#menu-x").stop();
        $("nav").toggle("slide");
        $("#menubtn").fadeToggle();
        $("#menu-x").fadeToggle();
    });
    $("section").scroll(function() {
        if ($(this).scrollTop() > 100) {
            $("#totop").stop().fadeIn();
        } else {
            $("#totop").stop().fadeOut();
        }
    });
    $("#totop").click(()=>{$("section").scrollTop(0)});
});