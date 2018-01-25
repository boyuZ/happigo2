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
        opsw2: "#psw2",
        ovcode: "#vcode",
        obtn: "#login_btn",
        agree_flag: "#c3"
    }


    class Register {
        constructor() {
            this.result = {};
        }
        init(obj, callback) {
            this.oUser = $(obj.ouser);
            this.oPsw = $(obj.opsw);
            this.oPsw2 = $(obj.opsw2);
            this.oVcode = $(obj.ovcode);
            this.oBtn = $(obj.obtn);
            this.oAgree = $(obj.agree_flag);
            this.callback = callback;

            //给控件绑定事件
            var b_obj = {
                reg: /^1[3|4|5|8][0-9]\d{8}$/,
                tip: "请输入11位手机号码",
                error_tip: '请输入正确的手机号码',
                othis: this.oUser
            }
            this.b_obj = b_obj;
            var _this = this;
            this.oUser.focus(this.setFocus)
                .blur(this.setBlur.bind(this, b_obj));
            var p_obj = {
                reg: /^[^/\\\*<>\|\?]{6,20}$/,
                tip: "请输入您的密码,您的密码必须为字母、数字或符号六位以上的组合",
                error_tip: '您的密码不符合要求',
                othis: this.oPsw
            }
            this.p_obj = p_obj;
            var p2_obj = {
                pw1: this.oPsw,
                tip: "请再次输入密码",
                error_tip: '两次输入的密码不一致',
                othis: this.oPsw2
            }
            this.p2_obj = p2_obj;
            this.oPsw.focus(this.setFocus)
                .blur(function () {
                    _this.setBlur(p_obj);
                    _this.setBlur(p2_obj);
                });

            this.oPsw2.focus(this.setFocus)
                .blur(function () {
                    _this.setBlur(p_obj);
                    _this.setBlur(p2_obj);
                });

            this.oVcode.focus(this.setFocus)
                .blur(function () {
                    $(this).next().css({
                        visibility: "hidden"
                    });
                })
            //------
            this.oBtn.on("click", $.proxy(this.handle, this));

            // this.oAgree.on("click", function () {
            //     var check = $(this).is(':checked');
               
            // })

            this.callback(this.result);//this.result;// 返回的对象的结构：

            
        }
        handle() {
            var res = this.comparison();
            switch (res) {
                case 0: this.result.tip = "账户名或密码不能为空";
                    this.result.status = "fail";
                    this.setBlur(this.b_obj);
                    this.setBlur(this.p_obj);
                    this.setBlur(this.p2_obj);
                    break;
                case 1: this.result.tip = "成功注册";
                    this.result.status = "success";
                    break;
            }
            this.callback(this.result);
        }

        comparison() {
            //初步的非空判断
            if (!this.oUser.pass_flag || !this.oPsw.pass_flag || !this.oPsw2.pass_flag)
                return 0;
            else {
                var data = localStorage.getItem("user_datas");
                var d_json;
                if (data) {
                    d_json = JSON.parse(data);
                    d_json.push({
                        user_name: $(this.oUser).val(),
                        psw: $(this.oPsw).val(),
                        login_time: new Date()
                    })
                } else {
                    d_json = [{
                        user_name: $(this.oUser).val(),
                        psw: $(this.oPsw).val(),
                        login_time: new Date()
                    }]
                }
                localStorage.setItem("user_datas", JSON.stringify(d_json));
                return 1;
            }
        }                               
        setFocus() {
            $(this).next().css({
                visibility: "visible"
            });
        }
        setBlur(para) {
            var res;
            if (para.reg)
                res = para.reg.test($(para.othis).val());
            if ($(para.pw1).val())
                res = $(para.pw1).val() == para.othis.val() ? true : false;
            if (!$(para.othis).val()) {
                $(para.othis).removeClass().next().css("visibility", "hidden").removeClass().find("b").html(para.tip);
                para.othis.pass_flag = false;
                return 0;
            }
            if (!res) {
                $(para.othis).removeClass().addClass("border").next().addClass("error").css("visibility", "visible").find("b").html(para.error_tip);
                para.othis.pass_flag = false;
            }
            else {
                $(para.othis).removeClass().addClass("success").next().css({
                    visibility: "hidden"
                }).removeClass().find("b").html(para.tip);
                para.othis.pass_flag = true;
            }
        }
    }

    return new Register();

});