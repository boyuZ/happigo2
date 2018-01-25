define(["jquery", "cookie"], function ($) {
    class shoppingCar {
        constructor() {
        }
        init(obj) {
            this.obj = obj;
            this.ele = obj.ele;
            var cur_id = location.href.split("?")[1].split("=")[1];
            if (cur_id == undefined) return 0;
            this.cur_id = cur_id;
            this.ele.on("click", $.proxy(this.changeList, this, false));

        }
        changeList(obj_cur) {
            // var cur_id = $(e.target).parents()
            //     .filter("[data-id]").attr("data-id");
            var cur_id, count, cover;
            if (obj_cur instanceof Object) {
                cur_id = obj_cur.cur_id;
                count = obj_cur.count;
                cover = obj_cur.cover;
            } else {
                cur_id = this.cur_id;
                count = this.obj.count;
                cover = this.obj.cover;
            }
            var ocookie = $.cookie("shopping_list");
            if (ocookie) {
                //如果包含，添加
                ocookie = JSON.parse(ocookie);
                //
                var flag = true;
                for (var i = 0; i < ocookie.length; i++) {
                    if (ocookie[i].id == cur_id) {
                        if (cover)
                            ocookie[i].num = parseInt($(count).val());
                        else
                            ocookie[i].num += parseInt($(count).val());
                        flag = false;
                        break;
                    }
                }
                if (flag) {//从来没有过当前商品
                    ocookie.push({ id: cur_id, num: parseInt($(count).val()) });
                }
                //重新写入cookie中
                $.cookie("shopping_list", JSON.stringify(ocookie));
            } else {//构建结构
                $.cookie("shopping_list", JSON.stringify([{ id: cur_id, num: parseInt($(count).val()) }]));
            } /* */
            console.log(this.getList());
        }
        getList() {
            if ($.cookie("shopping_list")) {
                return JSON.parse($.cookie("shopping_list"));
            }
        }
        //未测试
        removeList(id) {
            var slist = $.cookie("shopping_list");
            if (slist) {
                var alist = JSON.parse(slist);
                for (var i = alist.length - 1; i >= 0; i--) {
                    if (alist[i].id == id) {
                        alist.splice(i, 1);
                        break;
                    }
                }
                $.cookie("shopping_list", JSON.stringify(alist));
            }
        }
    }


    return new shoppingCar();

})