define(function () {
    function template(temp, obj, class_name) {
        //正则处理字符串
        //1.匹配出 <% %>
        temp = temp.replace(/<%=(.+?)%>/g, "`) \n print($1) \n print(` ")
        temp = temp.replace(/<%(.+?)%>/g, "`) \n $1 print(`")
        temp = "print(`" + temp + "`)"
        //准备一段代码，动态生成一个函数，把刚才准备好的temp代码嵌入当中

        let StrFn = `(function(){
            var data = obj;
            var html = "";
            var cln = class_name;
            function print(str){
                html += str
            }
            ${temp}
            return html;
        })`

        //使用eval执行代码，生成并返回这个函数
        var fn = eval(StrFn);
        //调用这个函数，得到最终的字符串模板
        var res = fn(obj);
        return res;
    }
    return template;

});