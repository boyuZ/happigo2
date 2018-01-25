require(["scripts/config.js"], function () {
    require(["jquery", "cookie"], function ($, cookie) {

        $(function () {
            var str_un = $.cookie("user_name");
            if (str_un != "null" && str_un != undefined) {
                $("#h_l span").html("欢迎您，");
                $("#h_l i").css("display", "none");
                $("#admin").css("display", "inline-block").html(str_un).next().css({
                    display: "inline-block"
                });
                $("#login").css("display", "none");
                $("#register").css("display", "none");

            } else {
                $("#h_l span").html("欢迎来到快乐购！");
                $("#h_l i").css("display", "inline-block");
                $("#admin").css("display", "none");
                $("#exit").css("display", "none");
                //
                $("#login").css("display", "inline-block");
                $("#register").css("display", "inline-block");
            }
            $("#exit").on("click", function () {
                $.cookie("user_name", null);
            })

        })

    })
})