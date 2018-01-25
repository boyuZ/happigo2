require(["scripts/config.js"], function () {
    require(["jquery", "register"], function ($, register) {

        //var check = $("#c1").is(':checked');

        //需要的参数：
        var obj = {
            ouser: "#user_name",
            opsw: "#psw",
            opsw2: "#psw2",
            ovcode: "#vcode",
            obtn: "#register_btn",
            agree_flag: "#c3"
        }
        register.init(obj, function (res) {
            switch (res.status) {
                case "fail":
                    break;
                case "success": location.href = "login.html";
                default: break;
            }
        });

    })
})