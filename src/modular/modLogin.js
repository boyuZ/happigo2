define(["jquery", "cookie"], function ($, cookie) {

    //------------------
    //localStorage.setItem("key", json);
    //var c = localStorage.getItem("key");
    //------------------
    var json = [{
        user_name: "zby",
        psw: "111",
        login_time: new Date()
    }, {
        user_name: "admin",
        psw: "0000",
        login_time: new Date()
    }]

    //需要的参数：
    var obj = {
        ouser: "#user_name",
        opsw: "#psw",
        ovcode: "#vcode",
        obtn: "#login_btn",
        remember_flag: true
    }


    class Login {
        constructor() {
            this.result = {};
        }
        init(obj, callback) {
            this.oUser = $(obj.ouser);
            this.oPsw = $(obj.opsw);
            this.oVcode = $(obj.ovcode);
            this.oBtn = $(obj.obtn);
            this.remember_flag = obj.remember_flag;
            this.callback = callback;

            //给控件绑定事件
            this.oUser.focus(function () {
                $(this).next().css({
                    visibility: "visible"
                });
            })
                .blur(function () {
                    $(this).removeClass().next().css({
                        visibility: "hidden"
                    }).removeClass().find("b").html("登录名可能是您的手机号、邮箱或用户名");
                })

            this.oPsw.focus(function () {
                $(this).next().css({
                    visibility: "visible"
                })
            })
                .blur(function () {
                    $(this).next().css({
                        visibility: "hidden"
                    });
                })
            this.oVcode.focus(function () {
                $(this).next().css({
                    visibility: "visible"
                })
            })
                .blur(function () {
                    $(this).next().css({
                        visibility: "hidden"
                    });
                })
            //------
            this.oBtn.on("click", $.proxy(this.handle, this));

            this.callback(this.result);//this.result;// 返回的对象的结构：
            /*
            result:{
                status:fail || success
                tip:"" || 不能为空 || 错误
            }
            */
        }
        handle() {
            var res = this.comparison();
            switch (res) {
                case -1: this.result.tip = "账户名或密码不能为空";
                    this.result.status = "null"; break;
                case 1: this.result.tip = "成功登陆";
                    this.result.status = "success"; break;
                case -2: this.result.tip = "用户名或密码错误";
                    this.result.status = "fail"; break;
            }
            if (res == 1)
                this.setCookie();
            this.callback(this.result);
        }
        //用来和存入localStorage中的数据做比对，返回比对结果
        comparison() {
            //初步的非空判断
            if (!this.oUser.val() || !this.oPsw.val())
                return -1;
            //判定是否含有当前用户数据
            var data = localStorage.getItem("user_datas");
            var d_json;
            if (data)
                d_json = JSON.parse(data);
            for (var p in d_json) {
                if (d_json[p].user_name == this.oUser.val() && d_json[p].psw == this.oPsw.val())
                    return 1;
            }
            return -2;
        }

        setCookie() {
            var check = $("#c1").is(':checked');
            console.log(check);
            //根据是否选中--记住用户名，设置cookie的有效时间,选中：3天，未选中：session
            if (check)
                $.cookie("user_name", this.oUser.val(), {
                    path: '/',//cookie的作用域  
                    expires: 3
                });
            else
                $.cookie("user_name", this.oUser.val());
        }
    }

    return new Login();

});