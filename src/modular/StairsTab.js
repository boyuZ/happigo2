define(["jquery"], function ($) {

    /*3. 楼梯选项卡 StairsTab 
             var obj = {
             stair: ".stairs", 左侧楼梯整体
             step: "#stairs li", 每一层台阶
             level: "section", 每一级内容
             //active: "active",
         }
 */

    function StairsTab() {
    }
    StairsTab.prototype = {
        init: function (obj) {
            //参数判断
            if (!obj.active) obj.active = "active";
            //
            this.aSteps = $(obj.step);
            this.aLevel = $(obj.level);
            this.oStair = $(obj.stair);
            this.obj = obj;
            //
            var arrSteps = [].slice.call(this.aSteps);
            var _this = this;
            arrSteps.forEach(function (item, index) {
                item.onclick = _this.LinkToStep.bind(_this, index);
            });


            this.load();
        },
        load: function () {

            var _this = this;
            //创建用于楼层判断的数组
            this.arr_tops = [];
            var arrLevels = [].slice.call(this.aLevel);
            arrLevels.forEach(function (item, index) {
                _this.arr_tops[index] = item.offsetTop + $(item).height();
                //console.log("aaaa" + item.offsetTop, "bbbb" + $(item).height(), _this.arr_tops[index]);
            })
            //
            this.timer;
            onscroll = function () {
                clearTimeout(this.timer);
                setTimeout(() => {
                    _this.change();
                }, 30);
            }
        },
        //跳转到对应楼层
        LinkToStep: function (index) {
            //document.documentElement.scrollTop = this.aLevel[index].offsetTop;
            $(document.documentElement).animate({
                scrollTop: this.aLevel[index].offsetTop
            })
            for (var i = 0; i < this.aSteps.length; i++) {
                $(this.aSteps[i]).removeClass(this.obj.active);
            }
            $(this.aSteps[index]).addClass(this.obj.active);
        },
        change: function () {
            //控制楼梯的显示和隐藏时机
            var scrollTop = document.documentElement.scrollTop;
            if (scrollTop >= this.aLevel[0].offsetTop - 50)
                this.oStair.css("display", "block");
            else
                this.oStair.css("display", "none");
            //实时更换楼层
            for (var i = 0; i < this.arr_tops.length; i++) {
                if (this.arr_tops[i] >= scrollTop) {
                    if (this.index == i) break;
                    for (var j = 0; j < this.aSteps.length; j++) {
                        $(this.aSteps[j]).removeClass(this.obj.active);
                    }
                    $(this.aSteps[i]).addClass(this.obj.active);
                    this.index = i;
                    //console.log(scrollTop);
                    break;
                }

            }


        }
    }
    return new StairsTab();
});

