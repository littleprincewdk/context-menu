自己写的插件ContextMenu
-
[demo](http://princekin.tjxuechuang.com/projects/xcontextmenu/index.html)
###使用方法

    /*
     *text:菜单文本
     *shortcut:快捷键文本
     *icon:图标
     *callback:点击事件回调函数，ele是右键点击的元素
     */
    $(".test").contextMenu({
                items:[
                    [
                        {text:"返回",shortcut:"Alt+向左箭头",callback:function(ele){
                            console.log($(ele))
                        }},
                        {text:"重新加载(R)",shortcut:"Ctrl+R",icon:"icon/lol.jpg"}
                    ],
                    [
                        {text:"另存为(A)",shortcut:"Ctrl+S",icon:"icon/powerword.ico"},
                        {text:"打印(P)",shortcut:"Ctrl+P"}
                    ]
                ]
            });