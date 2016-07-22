
/**
 * 通用 imgmask
 * */
window.Zimgmask = {
    init: function () {
        this.cstyle();
        this.initEvent();
        this.cpage();
    },
    cstyle: function () {
        var imagestyle = {
            ".maskimg": {
                "cursor": "pointer",
                color: "#ba8bdc"
            },
            ".zmaskpanel": {
                position: "fixed",
                width: "100%",
                height: "100%",
                "z-index": "1000",
                background: "rgba(0,0,0,0.65)",
                display: " none",
                ".image-info": {
                    position: "absolute",
                    height: "80px",
                    color: "whitesmoke",
                     left:"50%",
//                    "line-height": "30px",
                    "font-size": "12px",
                    "text-align": "center",
                    " padding-bottom": "0px",
                    ".link": {
                        color: "whitesmoke",
                        "&:hover": {
                            color: "#ef4545"
                        }
                    },
                },
                ".mask-image": {
                    position: "fixed",
                    left: "50%",
                    top: "50%",
                    border: "1px solid #000000",
                },
                ".mask-image-close ": {
                    position: "absolute",
                    "z-index": "10",
                    height: "30px",
                    width: "30px",
                    " line-height": "150px",
                    overflow: "hidden",
                    background: "#ff6464",
                    "border-radius": "50%",
                    ".zimgclose": {
                        display: "block",
                        height: "30px",
                        width: "30px",
                        overflow: "hidden",
                        cursor: "pointer",
                        "text-align": "center",
                        "line-height": "26px",
                        opacity: "1",
                        "color": "#fff",
                        "font-size": "30px"
                    }
                },
            }
        };
        CssTool.makstyle(imagestyle)
    }, cpage: function () {
        var dom = zen("div.zmaskpanel>div.image-info+div.mask-image+div.mask-image-close");
        var imageinfo = $(dom).find(".image-info");
        imageinfo.zen("p+a.link");
        $(imageinfo).find("a").attr("href", "").attr("target", "_blank");
        var maskimage = $(dom).find(".mask-image");
        maskimage.zen("img");
        $(maskimage).find("img").attr("src", "");
        var imageclose = $(dom).find(".mask-image-close");
        imageclose.zen(".zimgclose");
        $(imageclose).find(".zimgclose").attr("onclick", "jQuery('.zmaskpanel').fadeOut()").html("×");
        $("body").append(dom)
    },
    initEvent: function () {
        $(".maskimg").on("click", function (e) {
            var link = $(this).attr("_link") || $(this).html();
            Zimgmask.changeImage(link);
        });
    }, changeImage: function (link) {
        $('.mask-image img').attr("src", link);
        var _w = $(window).width() - 400;
        var _h = $(window).height() - 400
        var img = new Image();
        img.src = link;
        img.onload = function () {
            var img_size = img.height.toString() + "*" + img.width;
            $('.image-info p ').html('图片尺寸：' + img_size);
            $('.image-info a ').attr("href", link).html('图片地址：' + link);
        
            if (img.width <= _w)
            {   
                $('.image-info ').css('width', img.width).css('margin-left',  - img.width / 2).css('margin-top', $(window).height() / 2 - img.height / 2 - 130);
                $('.mask-image ').css('width', img.width).css('height', img.height).css('margin-left', -img.width / 2).css('margin-top', -img.height / 2);
                $('.mask-image img').css('width', img.width).css('height', img.height);
                $('.mask-image-close').css('right', $(window).width() / 2 - img.width / 2 - 15).css('margin-top', $(window).height() / 2 - img.height / 2 - 65);
                if (img.height >= _h)
                {
                    $('.image-info ').css('margin-top', 50);
                    $('.mask-image ').css('height', _h).css('margin-top', -(_h) / 2);
                    $('.mask-image img').css('height', _h);
                    $('.mask-image-close').css('margin-top', 135);
                }
            } else{
                $('.image-info ').css('width', _w).css('margin-top', $(window).height() / 2 - img.height / 2 - 110).css('margin-left',-(_w) / 2);
                $('.mask-image ').css('width', _w).css('height', img.height).css('margin-left', -_w / 2).css('margin-top', -img.height / 2);
                $('.mask-image img').css('width', _w).css('height', img.height);
                $('.mask-image-close').css('right', 185).css('margin-top', $(window).height() / 2 - img.height / 2 - 15);
                if (img.height >= _h){
                    $('.image-info ').css('margin-top', 50);
                    $('.mask-image ').css('height', _h).css('margin-top', -(_h) / 2);
                    $('.mask-image img').css('height', _h);
                    $('.mask-image-close').css('margin-top', 135);
                }
            }
            img.src = link;
        };
        $('.zmaskpanel').fadeIn();
    }
};
$(function () {
    Zimgmask.init();
});