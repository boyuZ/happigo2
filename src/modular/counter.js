/*1. 计数器
           
*/
var obj = {
    btn_sub: "#sub",
    btn_add: "#add",
    input_count: "#counter"
}

define(["jquery"], function ($) {

    class Counter {
        constructor() {
        }
        init(obj) {
            this.$sub = $(obj.btn_sub);
            this.$add = $(obj.btn_add);
            this.$oinput = $(obj.input_count);
            this.$sub.on("click", function () {
                var counter = parseInt($(obj.input_count).val());
                if (counter <= 1) return;
                $(obj.input_count).val(--counter);
            });
            this.$add.on("click", function () {
                var counter = parseInt($(obj.input_count).val());
                $(obj.input_count).val(++counter);
            })
            this.$oinput[0].onchange = function () {
                (this.v = function () {
                    if (!parseInt(this.value)) {
                        this.value = 1;
                        return 0;
                    }
                    this.value = this.value.replace(/[^0-9]+/, '1');
                })
                    .call(this);
            }
            this.$oinput.blur(function () {
                if (!$(this).val()) $(this).val(1);
            })

        }
    }

    return Counter;
});
