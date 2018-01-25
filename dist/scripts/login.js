require(["scripts/config.js"], function () {
    require(["jquery", "login"], function ($, login) {

        //var check = $("#c1").is(':checked');

        //需要的参数：
        var obj = {
            ouser: "#user_name",
            opsw: "#psw",
            ovcode: "#vcode",
            obtn: "#login_btn",
            remember_flag: "#c1"
        }
        login.init(obj, function (res) {
            switch (res.status) {
                case "null":
                case "fail":
                    $(obj.ouser).addClass("border").next().addClass("error").css("visibility", "visible").find("b").html(res.tip);
                    break;
                case "success": location.href = "index.html";
                default: break;
            }
        });

        /*        var json = [{
                   user_name: "zby",
                   psw: "111",
                   login_time: new Date()
               }, {
                   user_name: "admin",
                   psw: "0000",
                   login_time: new Date()
               }]
       
               localStorage.setItem("user_datas", JSON.stringify(json)); */

    })
})