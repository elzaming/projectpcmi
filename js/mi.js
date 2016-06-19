//实现banner 轮播
~function () {
    var bannerCenter = document.getElementById('banner_center');
    var bannerImgContainer = document.getElementById('banner_img');
    var oBannerTip=utils.children(bannerCenter, "ul")[0];
    var oLis = oBannerTip.getElementsByTagName("li");
    var imgList = bannerImgContainer.getElementsByTagName("img");
    var bannerLeft = utils.children(bannerCenter, "a")[0], bannerRight = utils.children(bannerCenter, "a")[1];
    var jsonData = null;
    var count = null;
    console.log(bannerImgContainer);
    //ajax获取数据
    !function () {
        var xhr = new XMLHttpRequest();
        xhr.open("get", "json/banner.txt?_=" + Math.random(), false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
                jsonData = utils.formatJSON(xhr.responseText);
            };
        };
        xhr.send(null);
    }();

    //字符串拼接，数据绑定
    ~function () {
        var str = '';
        if (jsonData) {
            for (var i = 0; i < jsonData.length; i++) {
                var curData = jsonData[i];
                str += '<div><img src="' + curData["img"] + '"/></div>';
            }
           str += '<div><img src="' + jsonData[0]["img"] + '"/></div>';
        }
        bannerImgContainer.innerHTML = str;
        //console.log(bannerImgContainer.innerHTML);
        count = jsonData.length + 1;
        utils.css(bannerImgContainer, "width", count * 1226);

//绑定焦点
        str = '';
        if (jsonData) {
            for (i = 0, len = jsonData.length; i < len; i++) {
                i === 0 ? str += '<li class="select"></li>' : str += '<li></li>';
            }
        }
        oBannerTip.innerHTML = str;

    }();
//延迟加载
/*
    window.setTimeout(lazyImg, 500);
    function lazyImg() {
        for (var i = 0, len = imgList.length; i < len; i++) {
            ~function (i) {
                var curImg = imgList[i];
                var oImg = new Image;
                oImg.src = curImg.getAttribute("trueImg");
                oImg.onload = function () {
                    curImg.src = this.src;
                    curImg.style.display = "block";
                    oImg = null;
                    zhufengAnimate(curImg, {opacity: 1}, 300);
                }
            }(i);
        }
    }
*/

    //4、实现自动轮播
    //->记录的是步长(当前是哪一张图片,零是第一张图片)
    var step = 0, interval = 2000, autoTimer = null;
    autoTimer = window.setInterval(autoMove, interval);
    function autoMove() {
        if (step >= (count - 1)) {
            step = 0;
           // utils.setCss(bannerImgContainer,"left",0);
            bannerImgContainer.style.left = 0;
        }
        step++;
        zhufengAnimate(bannerImgContainer, {left: -step * 1226}, 1000);
        changeTip(step);
    }

    //5、实现焦点对齐
    function changeTip(n) {
        if(n>=oLis.length){
            n=0;
        }
        for(var i=0; i<oLis.length;i++){
            oLis[i].className = '';
        }
        oLis[n].className='select';
    }

    //->6、停止和开启自动轮播
    bannerCenter.onmouseover = function () {
        window.clearInterval(autoTimer);
        bannerLeft.style.display = bannerRight.style.display = "block";
    };
    bannerCenter.onmouseout = function () {
        autoTimer = window.setInterval(autoMove, interval);
        bannerLeft.style.display = bannerRight.style.display = "none";
    };

    //->7、单击焦点实现轮播图的切换
    ~function () {
        for (var i = 0, len = oLis.length; i < len; i++) {
            var curLi = oLis[i];
            curLi.index = i;
            curLi.onclick = function () {
                step = this.index;
                changeTip(step);
                zhufengAnimate(bannerImgContainer,{left: -step * 1226}, 1000);
            }
        }
    }();

    //8、实现左右切换
    bannerRight.onclick = autoMove;
    bannerLeft.onclick = function () {
        if (step <= 0) {
            step = count - 1;
            utils.css(bannerImgContainer, "left", -step * 1226);
        }
        step--;
        zhufengAnimate(bannerImgContainer, {left: -step * 1226}, 1000);
        changeTip();
    }
}()
/*//shoppingcart
~function () {
    var shoppingList=document.getElementById("shoppingList");
    var shoppingCart=document.getElementById("shoppingCart");
    shoppingCart.onmouseover=function () {
        $(shoppingList).stop().slideDown(200);
        shoppingList.style.display="block";
    }
    shoppingCart.onmouseout=function () {
        $(shoppingList).stop().slideUp(200);

    }
}();*/

/*购物框显示*/
~function () {
    var shoppingList=document.getElementById("shoppingList");
    var cartIcon=document.getElementById("cartIcon");
    shoppingList.onmouseover = function (e) {
        e = e || window.event;
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
    }
    document.body.onmouseover=function (e) {
        e=e||window.event;
        var tar=e.target||e.srcElement;
        if(tar.id==="cartIcon"){
            $(shoppingList).stop().slideDown(200);
            shoppingList.style.display="block";
            cartIcon.style.background="#FFFFFF";
            cartIcon.style.color="#ff6700";
            return;
        }
        shoppingList.style.display="none";
        cartIcon.style.background="#424242";
        cartIcon.style.color="#b0b0b0";
    }
}();

//header_nav 显示 detail
~function(){
    var bannerLeft = document.getElementById("bannerLeft"), bannerLeftList = utils.getElementsByClass("bannerLeftLi");
    console.log(bannerLeftList);
    for (var i = 0; i < bannerLeftList.length; i++) {
        var curLi = bannerLeftList[i];
        curLi["curDetail"] = utils.lastChild(curLi);

        //->如果想每一个详细信息都是顶头对齐,需要动态设置top值
        curLi["curDetail"].style.top = 0+"px";

        curLi.onmouseover = function () {
            this["curDetail"].style.display = "block";
        };
        curLi.onmouseout = function () {
            this["curDetail"].style.display = "none";
        };
    }
}()



//*!/bestSeller 轮播
/*~function(){
var bestSellerList = utils.getElementsByClass("bestSellerList");

    var step = 0, interval = 2000, autoTimer = null,count = null;
    autoTimer = window.setInterval(autoMove, interval);
    function autoMove() {
        if (step >= (count - 1)) {
            step = 0;
            utils.css(bestSellerList,"left",0);

        }
        step++;
        zhufengAnimate(bannerImgContainer, {left: -step * 234}, 1000);
        changeTip(step);
    }

}()*/

//点击图片时候的动画效果
~function () {
    var moveUpList=utils.getElementsByClass("brick-item-m",document);
    for (var i=0;i<moveUpList.length;i++){
        var curEle=moveUpList[i];
        curEle.onmouseover=function () {
            utils.addClass(this,"active");
        }
        curEle.onmouseleave=function () {
            utils.removeClass(this,"active");
        }

    }

}();

//评价

/*评价出现*/
~function () {
    var  $brickItem=$(".tab-content>li:not(.brick-item-s)");
    $brickItem.on('mouseover',function (item,index) {
        $(this).children(".reviver-wrapper").stop().animate({bottom:0,opacity:1},200);
    })
    $brickItem.on('mouseout',function (item,index) {
        $(this).children(".reviver-wrapper").stop().animate({bottom:-67,opacity:0},200);
    })

}();