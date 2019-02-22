$(document).ready(function () {
    //判断访问终端
    var browser = {
        versions: function () {
            var u = navigator.userAgent,
                app = navigator.appVersion;
            return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
                qq: u.match(/\sQQ/i) == " qq" //是否QQ
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }

    if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios || (/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent))) {
        $('.block>a,.download-href').attr('href', 'https://game233.oss-cn-shenzhen.aliyuncs.com/ios_11/index.html');
        var navigatorScrollTop = $('body');
    } else if (browser.versions.android) {
        $('.block>a,.download-href').attr('href', 'http://d.jinjumoney.com/bmqpGameLobby_1_9900861811080001_sign.apk');
        var navigatorScrollTop = $('body,html');
    } else {
        $('.block>a,.download-href').attr('href', 'http://d.jinjumoney.com/bmqpGameLobby_1_9900861811080001_sign.apk');
        var navigatorScrollTop = $('body,html');
    }

    var screenHeight = screen.height;
    var animated = true;
    var targetScrollTop, calculation, setprop, bodyHeight, bodyWidth, animateLimit;
    $('.block,.download,.dlbtn').on('touchstart', function (e) {
        e.preventDefault();
        $(this).css('transform', 'scale(.9)');
    });
    $('.block,.download,.dlbtn').on('touchend', function () {
        $(this).css('transform', 'scale(1)');
    });
    function checkImg() {
        if (document.querySelectorAll('.mainbg')[0].complete) {
            bodyHeight = $('body').height();
            bodyWidth = $('body').width();
            animateLimit = bodyWidth < 800 ? 0.02 : 0.2;
            // console.log('animateLimit'+animateLimit);
            aniTargetTop = $('.games').offset().top;
            clearInterval(setprop);
            testAnimate();
        }
    }
    function testAnimate() {
        //scroll top值
        targetScrollTop = navigatorScrollTop.scrollTop();
        //scroll top - 遊戲區距離頂部的高
        calculation = (targetScrollTop / bodyHeight).toFixed(2);
        // console.log(calculation);

        //qr-code
        if (calculation <= 0.7) {
            $('.qr-code').animate({
                top: targetScrollTop + screenHeight * 0.1 + 'px'
            }, 500, 'swing');
        } else {
            $('.qr-code').animate({
                top: bodyHeight - screenHeight * 0.8 + 'px'
            }, 500, 'swing');
        }

        //遊戲區
        if (calculation >= animateLimit && animated) {
            animated = false;
            $('.games').addClass('animate');
        } else if (calculation <= animateLimit && !animated) {
            animated = true;
            $('.games').removeClass('animate');
        }
    }

    $(window).scroll(_.throttle(testAnimate, 250));
    testAnimate();
    setprop = setInterval(checkImg, 1000);
});
