$(function() {

    /* ==========================================================================
       * banner
     ==========================================================================*/

    $('#banner').each(function() {
        $(this).find('.slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            // prevArrow:'<button type="button" class="slick-prev slick-arrow"><span class="iconM-left-open-big"></span></button>',
            // nextArrow:'<button type="button" class="slick-next slick-arrow"><span class="iconM-right-open-big"></span></button>',
            dots: true,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 2000,
            pauseOnHover: false,
            pauseOnFocus: false,
            easing: "easeInOutCubic"
        });
    });


    /* ==========================================================================
       * 網頁防呆設定[內容不足高度時防破版]
     ==========================================================================*/

    $(window).on('resize', function() {
        var footH = $('#footer').outerHeight();
        $('#main').css({
            paddingBottom: footH
        });
        $('#footer').css({
            marginTop: -footH
        });
    }).trigger('resize');


    /* ==========================================================================
       * 卷軸捲動時防呆
     ==========================================================================*/

    $(window).on("mousewheel", function() {
        $('html,body').stop();
    });


    /* ==========================================================================
       * 圖片,連結禁止拖曳
     ==========================================================================*/

    $("img,a[href]").attr("draggable", "false");


    $(window).on('scroll',function(){
        var scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();

        if (scrollBottom <= 30) {
            if (!$("#footer").hasClass('active')) {
                $("#footer").addClass('active');
            }
        }else if (scrollBottom > 30){
            $("#footer").removeClass('active');
        }

    }).trigger('scroll');

    /* ==========================================================================
       * load完成後 卷軸美化 頁面顯示 捲動特效
     ==========================================================================*/
     $('body').addClass("animated fadeIn d2");

});
