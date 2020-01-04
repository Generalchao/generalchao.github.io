
/*-------------------------------------------------------------------------------------------------------------------------------*/
/*This is main JS file that contains custom style rules used in this template*/
/*-------------------------------------------------------------------------------------------------------------------------------*/
/* Template Name: "Modesto"*/
/* Version: 1.0 Initial Release*/
/* Build Date: 06-02-2016*/
/* Author: LionStyle*/
/* Website: http://moonart.net.ua/modesto/ 
/* Copyright: (C) 2016 */
/*-------------------------------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------------*/
/* TABLE OF CONTENTS: */
/*--------------------------------------------------------*/
/* 01 - VARIABLES */
/* 02 - page calculations */
/* 03 - function on document ready */
/* 04 - function on page load */
/* 05 - function on page resize */
/* 06 - function on page scroll */
/* 07 - swiper sliders */


$(function() {

    "use strict";

    /*================*/
    /* 01 - VARIABLES */
    /*================*/
    var swipers = [], winW, winH, winScr, footerTop, _isresponsive, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i), htmlVal = $('html'), headerVal = $('header');

    /*========================*/
    /* 02 - page calculations */
    /*========================*/
    function pageCalculations(){
        winW = $(window).width();
        winH = $(window).height();
        footerTop = ($('footer').length)?$('footer').offset().top : 0;
        if($('.portfolio-detail-related-entry').length) footerTop = $('.portfolio-detail-related-entry').offset().top;
        if($('.is-mobile').is(':visible')) _isresponsive = true;
        else _isresponsive = false;
        $('.page-height').css({'height':winH, 'min-height':(winH<480)?480:winH});
        if(winH<=600) $('body').addClass('min-height');
        else $('body').removeClass('min-height');
        $('.rotate').each(function(){
            $(this).css({'width':$(this).parent().height()});
        });

        /*flex align - fix IE*/
        if(!_isresponsive){
            $('.flex-js').each(function(){
                if(winH<$(this).height()){
                    $(this).css('height','100%');    
                }else{
                    $(this).css('height',winH); 
                }
            });
        }   
        /*flex align - fix IE*/
    }

    /*=================================*/
    /* 03 - function on document ready */
    /*=================================*/
        //loader
        // $('#loader-wrapper').fadeOut(300);



    $('.input').each(function(){
        if($(this).val()!=='') $(this).parent().addClass('focus');
    });
    if(_ismobile) $('body').addClass('mobile');
    pageCalculations();

    /*============================*/
    /* 04 - function on page load */
    /*============================*/
    $(window).on('load', function(){

        initSwiper();

        $('body').addClass('loaded');
            setTimeout(function(){
                pageCalculations();
            },0);

        
        /*isotope*/    
        if($('.grid').length > 0){
            var $grid = $('.grid').isotope({
              itemSelector: '.grid-item',
              masonry: {
                columnWidth: '.grid-sizer'
              }
            });

            $('.sorting-menu li').on('click',function(){
                if($(this).hasClass('active')) return false;
                $(this).parent().find('.active').removeClass('active');
                $(this).addClass('active');
                var filterValue = $(this).attr('data-filter');
                $grid.isotope({ filter: filterValue });
                var sorting_menu_btn = $('.sorting-menu .button-drop a span');
                sorting_menu_btn.text($(this).data('name'));
 

                var list = $('.sorting-menu ul');
                list.removeClass('active');
                $('.sorting-menu .button-drop').removeClass('active');



                return false;
            });
        };

        // 显示模式切换
        $('#single_modle').click(function(){
            $('#grid-items').removeClass('double_modle').addClass('single_modle');
            var filterValue = $('.sorting-menu li').parent().find('.active').attr('data-filter');
            $grid.isotope({ filter: filterValue });
            $('#double_modle').removeClass('active');
            $('#single_modle').addClass('active');
        }); 
        $('#double_modle').click(function(){
            $('#grid-items').removeClass('single_modle').addClass('double_modle');
            var filterValue = $('.sorting-menu li').parent().find('.active').attr('data-filter');
            $grid.isotope({ filter: filterValue });
            $('#single_modle').removeClass('active');
            $('#double_modle').addClass('active');
        }); 


        /*lightbox*/
        if($('.lightbox').length > 0){
            $(function(){
                var lightbox = $('.lightbox').simpleLightbox({
                    disableScroll: false
                });
            });
        }
        

    });


    /*==============================*/
    /* 05 - function on page resize */
    /*==============================*/
    function resizeCall(){
        pageCalculations();
    }
    if(!_ismobile){
        $(window).resize(function(){
            resizeCall();
        });
    } else{
        window.addEventListener("orientationchange", function() {
            resizeCall();
        }, false);
    }

    /*==============================*/
    /* 06 - function on page scroll */
    /*==============================*/
    // $(window).scroll(function(){
    //  if ($('.swiper-style-banner').length){
    //     if ($(this).scrollTop() >= winH){  
    //         headerVal.addClass('fixed');
    //     }
    //     else{
    //         headerVal.removeClass('fixed');
    //     } 
    //  }else{
    //      headerVal.addClass('fixed');
    //  }

    // });

    // 滚动收起菜单
    $(window).scroll(function(){
        $('#menu_btn').removeClass('active').addClass('default');
        headerVal.removeClass('active');
        $('.mask').fadeOut();

    });


    /*=====================*/
    /* 07 - swiper sliders */
    /*=====================*/

    function initSwiper(){
        var initIterator = 0;
        $('.swiper-container').each(function(){                               
            var $t = $(this);                                 

            var index = 'swiper-unique-id-'+initIterator;

            $t.addClass('swiper-'+index+' initialized').attr('id', index);
            $t.find('.swiper-pagination').addClass('swiper-pagination-'+index);

            if($t.find('.swiper-button').length>=1){
                $t.find('.swiper-button-prev').addClass('swiper-button-prev-'+index);
                $t.find('.swiper-button-next').addClass('swiper-button-next-'+index);
            }else if($t.parent().find('.swiper-button').length>=1){
                $t.parent().find('.swiper-button-prev').addClass('swiper-button-prev-'+index);
                $t.parent().find('.swiper-button-next').addClass('swiper-button-next-'+index);
            }

            if($t.find('.swiper-slide').length<=1) $('.slider-click[data-pagination-rel="'+$t.data('pagination-rel')+'"]').addClass('disabled');

            var slidesPerViewVar = ($t.data('slides-per-view'))?$t.data('slides-per-view'):1,
                loopVar = ($t.data('loop'))?parseInt($t.data('loop'), 10):0;
            if(slidesPerViewVar!='auto') slidesPerViewVar = parseInt(slidesPerViewVar, 10);

            swipers['swiper-'+index] = new Swiper('.swiper-'+index,{
                // paginationType: ($t.data('pagination'))?$t.data('pagination'):'bullets',
                pagination: '.swiper-pagination-'+index,
                paginationClickable: true,
                nextButton: '.swiper-button-next-'+index,
                prevButton: '.swiper-button-prev-'+index,
                slidesPerView: slidesPerViewVar,
                autoHeight: ($t.data('auto-height'))?parseInt($t.data('auto-height'), 10):0,
                loop: loopVar,
                autoplay: ($t.data('autoplay'))?parseInt($t.data('autoplay'), 10):0,
                centeredSlides: ($t.data('center'))?parseInt($t.data('center'), 10):0,
                breakpoints: ($t.data('breakpoints'))? { 767: { slidesPerView: parseInt($t.attr('data-xs-slides'), 10) }, 991: { slidesPerView: parseInt($t.attr('data-sm-slides'), 10) }, 1199: { slidesPerView: parseInt($t.attr('data-md-slides'), 10) } } : {},
                initialSlide: ($t.data('ini'))?parseInt($t.data('ini'), 10):0,
                watchSlidesProgress: true,
                speed: ($t.data('speed'))?parseInt($t.data('speed'), 10):500,
                parallax: ($t.data('parallax'))?parseInt($t.data('parallax'), 10):0,
                slideToClickedSlide: true,
                keyboardControl: true,
                mousewheelControl: ($t.data('mousewheel'))?parseInt($t.data('mousewheel'), 10):0,
                mousewheelReleaseOnEdges: true,
                spaceBetween: ($t.data('space'))?parseInt($t.data('space'), 10):0,
                direction: ($t.data('direction'))?$t.data('direction'):'horizontal',
                paginationType: ($t.data('pagination'))?$t.data('pagination'):'bullets',
                paginationCustomRender: function(swiper, current, total){
                    return ((current.toString().length<2)?('<span class="swiper-pagination-current">0'+current +'</span>'):current)  + '<span class="line"></span>' + ((total.toString().length<2)?('0'+total):total) ;
                }
                
            });
            swipers['swiper-'+index].update();
            initIterator++;
        });
        $('.swiper-container.swiper-control-top-js').each(function(){
            swipers['swiper-'+$(this).attr('id')].params.control = swipers['swiper-'+$(this).closest('.swipers-couple-wrapper').find('.swiper-control-bottom-js').attr('id')];
        });
        $('.swiper-container.swiper-control-bottom-js').each(function(){
            swipers['swiper-'+$(this).attr('id')].params.control = swipers['swiper-'+$(this).closest('.swipers-couple-wrapper').find('.swiper-control-top-js').attr('id')];
        });

    }


    function watchSwiperProgress(container, swiper, index){
        if($('.homepage-1-backgrounds[data-pagination-rel="'+container.data('pagination-rel')+'"]').length){
            $('.homepage-1-backgrounds .entry.active').removeClass('active');
            $('.homepage-1-backgrounds .entry[data-rel='+index+']').addClass('active');
        }
        if($('.slider-click-label[data-pagination-rel="'+container.data('pagination-rel')+'"]').length){
            $('.slider-click-label[data-pagination-rel="'+container.data('pagination-rel')+'"]').removeClass('active prev next');
            $('.slider-click-label[data-pagination-rel="'+container.data('pagination-rel')+'"][data-slide-to="'+index+'"]').addClass('active');
        }
        if($('.pagination-slider-wrapper[data-pagination-rel="'+container.data('pagination-rel')+'"]').length){
            var foo = $('.pagination-slider-wrapper[data-pagination-rel="'+container.data('pagination-rel')+'"]');
            foo.css({'top':(-1)*parseInt(foo.find('.active').attr('data-slide-to'), 10)*foo.parent().height()});
        }        
    }

    var slide_index = 1;
    $('.all-slides').text($('.left-right .swiper-container.my-bg-swiper .swiper-slide').length);
    $('.prev-slide').text(slide_index);
    $('.next-slide').text(slide_index+1);

    $('.slider-click.left').on('click', function(){
        if($(this)[0].hasAttribute('data-pagination-rel')){
            swipers['swiper-'+$('.swiper-container[data-pagination-rel="'+$(this).data('pagination-rel')+'"]').attr('id')].slidePrev();
            $(this).find('.preview-entry').removeClass('active');
        }
    });

    $('.slider-click.right').on('click', function(){
        if($(this)[0].hasAttribute('data-pagination-rel')){
            swipers['swiper-'+$('.swiper-container[data-pagination-rel="'+$(this).data('pagination-rel')+'"]').attr('id')].slideNext();
            $(this).find('.preview-entry').removeClass('active');
        }
    });

    $('.slider-click-label').on('click', function(){
        swipers['swiper-'+$('.swiper-container[data-pagination-rel="'+$(this).data('pagination-rel')+'"]').attr('id')].slideTo($(this).data('slide-to'));
    });


    /*==============================*/
    /* 09 - New */
    /*==============================*/
    var scroll_index = 0;

//sorting-menu click
    $('.sorting-menu .button-drop').on('click', function(){
        var list = $('.sorting-menu ul');
            if($(this).hasClass('active')){
            $(this).removeClass('active');
            list.removeClass('active');
        }else{
            $(this).addClass('active');
            list.addClass('active');
        }
        return false;
    });


   
    /*window scroll*/




//pages scroll (.nav-fix-a; .scroll-animate)

var scrollingAnimate = 0;

$('.nav-fix-a').on('click', function(){
    if(scrollingAnimate) return false;
      scrollingAnimate = 1;
        var index = $(this).parent().find('.nav-fix-a').index(this);
        $('body, html').animate({'scrollTop':$('.scroll-animate').eq(index).offset().top}, function(){scrollingAnimate = 0;});
      $(this).addClass('active').parent().find('.active').not(this).removeClass('active');
      window.location.hash = $(this).attr('data-link');
});

$('.scroll-animate').on('mousewheel', function(event) {
    if(!_isresponsive){
        var thisH = $(this).height(),
            winH = $(window).height(),
        thisTop = $(this).offset().top,
        winScr = $(window).scrollTop();

        if(event.deltaY<0) {
            if(thisH>winH && (thisH+thisTop)>(winH+winScr)){
        
            }
            else{
                if($('.nav-fix-a.active').next().hasClass('nav-fix-a')){
                    event.preventDefault();
                    $('.nav-fix-a.active').next().click();
                }
            
          }
        }
        else {
            if(thisH>winH && (thisTop)<(winScr)){
        
            }
            else{
                event.preventDefault();
                if(thisTop<winScr) $('.nav-fix-a.active').click();
                else $('.nav-fix-a.active').prev().click();
          }
        }
    }     
});

var  stop_out;
       
$.fn.scrollStopped = function(callback) {
    if(!_isresponsive){      
        $(this).scroll(function(){
            var self = this, $this = $(self);
            if ($this.data('scrollTimeout')) {
                stop_out = $this.data('scrollTimeout');
                clearTimeout($this.data('scrollTimeout'));
            }
            $this.data('scrollTimeout', setTimeout(callback,500,self));
        });
    }
};
var index_h_s = 0;

$(window).scrollStopped(function(){
    if(!_isresponsive){
        $('.scroll-animate').each(function(index, element){
            if($(element).offset().top<($(window).scrollTop()+$(window).height()*0.5) && ($(this).height()+$(this).offset().top) > ($(window).scrollTop()+$(window).height()*0.5)){
                if(!$('.nav-fix-a').eq(index).hasClass('active'))$('.nav-fix-a').eq(index).click();
            }
        });
    }
});


    /*btn-down*/
    $('.btn-down').on('click', function(event){
        event.preventDefault();
        var anchor = $(this).data('anchor');
        $('nav ul li a').parent().removeClass('active');
        $('nav ul li:eq(1)').addClass('active');
        $('html, body').animate({scrollTop:$('#'+anchor).offset().top}, 1000);
    });


    
    
    /*menu click*/
    $('nav ul li a, .bottom_link_btn a').on('click',function(event){
      if ($(this).attr('data-anchor').length) {
            event.preventDefault();
            var anchor = $(this).data('anchor');
            $('nav ul li a').parent().removeClass('active');
            $('header').removeClass('active');
            $('#menu_btn').removeClass('active').addClass('default');
            $('.mask').fadeOut();
            $(this).parent().addClass('active');
            $('html, body').animate({scrollTop:$('#'+anchor).offset().top}, 1000);
       }
    });

	// 我的作品添加选中跳转
    $('.my_portfolio').on('click',function(event){
        event.preventDefault();
        var anchor = $(this).data('anchor');
        $('html, body').animate({scrollTop:$('#'+anchor).offset().top}, 1000);
        $('nav ul li a').parent().removeClass('active');
        $('nav ul li:eq(2)').addClass('active');
    });

    //#menu_btn展开菜单
    $('#menu_btn').on('click', function(){
        if ($(this).hasClass('active')) {
            $(this).removeClass('active').addClass('default');
            headerVal.removeClass('active');
            $('.mask').fadeOut();
            $('nav ul li').removeClass('fadeInLeft').addClass('fadeOutLeft');
            // $('#content').css("transform","perspective(500px) translate3d(0,0,0)");
        } else {
            $(this).addClass('active').removeClass('default');
            headerVal.addClass('active');
            $('.mask').fadeIn();
            $('nav ul li').addClass('fadeInLeft').removeClass('fadeOutLeft');
            // $('#content').css("transform","perspective(500px) translate3d(0,0,-20px)");
        }
    });

    // 点遮罩收起菜单
    $('.mask').on('click',function(){
            $('#menu_btn').removeClass('active').addClass('default');
            headerVal.removeClass('active');
            $('.mask').fadeOut();
    });




});



// 我的js


// 加载loading
$(window).load(function(){ 
    $('#loader-wrapper').fadeOut(300);
});   


// 点击平滑跳转到底部
$('#section-topbar,#section-topbar2,#section-topbar02').click(function(){$('html,body').animate({scrollTop:$(document).height()-$(window).height()}, 800);});      


//百度统计
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?f49f664c274810db237c8a6f98735396";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

        