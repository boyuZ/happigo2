/*1. 选项卡 Tab
           btn 选项集合
           content 内容集合
           active 选项响应类名，默认类名为active
           type 响应方式 1 hover 2 active ，默认为hover
      
            var obj = {
            btn: "#list li",
            content: "#content li",
            //active: "active",
            //type: "active"
        }
*/
define(function () {
    //
    function appendClassName(dom, className) {
        if (dom.className.indexOf(className) == -1) {
            dom.className = (dom.className + " " + className).trim();
            return true;
        }
        else return false;
    }
    function removeClassName(dom, className) {
        if (dom.className.indexOf(className) != -1) {
            dom.className = dom.className.replace(className, "").trim();
            return true;
        }
        else return false;
    }
    //
    function Tab() {
    }
    Tab.prototype = {
        init: function (obj) {
            this.obj = obj;
            //参数判断
            if (!obj.active) obj.active = "active";
            if (!obj.type) obj.type = "hover";
            //选择元素 
            var $ = document.querySelectorAll.bind(document);
            this.aBtn = $(obj.btn);
            this.aCon = $(obj.content);
            //绑定事件
            var arrBtn = [].slice.call(this.aBtn);
            var _this = this;
            arrBtn.forEach(function (item, index) {
                //判定响应的模式
                if (obj.type == "active")
                    item.onclick = _this.ItemChange.bind(_this, index);
                else
                    item.onmouseover = _this.ItemChange.bind(_this, index);
            })
        },
        ItemChange: function (btn_index) {
            // var evt = event || window.event;
            var arrCon = [].slice.call(this.aCon);
            var _this = this;
            arrCon.forEach(function (item, index) {
                item.style.display = "none";
                removeClassName(_this.aBtn[index], _this.obj.active);
            })
            //
            this.aCon[btn_index].style.display = "block";
            appendClassName(_this.aBtn[btn_index], _this.obj.active);
        }
    }

    return Tab;
});
