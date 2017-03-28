/**
 * Created by wudengke on 2017/2/7.
 */
$(function(){
    $.fn.extend({
        contextMenu:contextMenu
    });

    var Body=$("body");
    Body.on("mousedown",function(e){
        //点击目标不在contextmenu内且contextmenu存在就移除contextmenu
        var menu=$(".context-menu");
        if(e.target.classList.value.indexOf("context-menu")==-1&&menu.length){
            menu.remove();
        }
    });
    function contextMenu(settings){
        settings=settings||{};
        var defaults={

        };
        defaults=$.extend(defaults,settings);
        var Dom=this;
        Dom.on("contextmenu",function(){
            //禁用默认的右键菜单
            return false;
        })
            .on("mouseup",function(e){
            e.preventDefault();
            if(e.which==3){
                var left=e.clientX,
                    top=e.clientY;

                var contextMenu=createDom(this);
                Body.append(contextMenu);
                contextMenu.css({left:left,top:top}).show();
            }
            return false;//!!!
        });
        return Dom;

        function createDom(target){
            var contextMenu=$("<div class='context-menu'>" +
                "<ul class='context-menu-list'></ul>" +
                "</div>"),
                menuList=contextMenu.find(".context-menu-list"),
                icon=false;
            for(var i=0,length=defaults.items.length;i<length;i++){
                for(var j=0,length2=defaults.items[i].length;j<length2;j++){
                        $("<li class='context-menu-list-item'>" +
                        (defaults.items[i][j].icon?(icon=true,"<span class='context-menu-list-item-icon' style='background-image: url("+defaults.items[i][j].icon+")'></span>"):"")+
                        "<span class='context-menu-list-item-text'>"+(defaults.items[i][j].text||"")+"</span>" +
                        "<span class='context-menu-list-item-shortcut'>"+(defaults.items[i][j].shortcut||"")+"</span>" +
                        "</li>")
                        .on("mouseup",function(){
                            //点击事件回调
                            if(this.callback){
                                this.callback(target);
                            }
                            contextMenu.remove();
                            return false;//!!!不加上，会冒泡，弹出父元素的contextmenu
                        }).appendTo(menuList)[0]
                          .callback=defaults.items[i][j].callback;

                }
                icon&&contextMenu.addClass("context-menu-icon");
                if(i<length-1){
                    menuList.append($("<span class='context-menu-list-hr'></span>"));
                }
            }
            return contextMenu;
        }
    }
});