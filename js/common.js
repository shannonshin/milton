var mvNum = 0;
var mvMax;
var autoRoll, autoTime = 7000;
var mainVisMove = false;

$(document).ready(function(){
	//이미지맵
	$('img[usemap]').rwdImageMaps();
	$("#img").width("100%");
	
	// 탑배너
	if( $(".topBanner").length > 0)
	{
		var mainPopBanSwiper = new Swiper('.swiper-container.topBanner', {
			slidesPerView: 1,
			speed: 500,
			loop: false,
			navigation: {
				nextEl: '.swiper-container.topBanner .swiper-button-next',
				prevEl: '.swiper-container.topBanner .swiper-button-prev',
			},
	    });

		$(".topBanner .xbt a").click(function(){
			$(".topBanner").stop().slideUp(200);
			TweenMax.to($('.mainVis'), 0.2, {height:$(window).height(), ease:Power3.easeNone});
			TweenMax.to($('.mainConWrap'), 0.2, {marginTop:$(window).height(), ease:Power3.easeNone});
			TweenMax.to($('.mainVis .indiArea'), 0.2, {width:$(window).height(), ease:Power3.easeNone});
			TweenMax.to($('.mainVis, #header'), 0.2, {marginTop:0, ease:Power0.easeNone, onComplete:function(){
				$('.mainVis, #header').addClass("mt0");
			}});
		});
	}

	// 메인 비주얼
	$(".mainVis").height($(window).height() - $(".topBanner").height());
	$(".mainVis, #header").css({"margin-top" : $(".topBanner").height()});
	$(".mainConWrap").css("margin-top", $(".mainVis").height());
	$(".indiArea").width($(window).height());
	$(".mainVis .rollArea .roll .bg").css({"width" : $(window).width(), "height" : $(window).height()});

	$(window).resize(function(){
		$(".mainVis").height($(window).height() - $(".topBanner").height());
		$(".mainVis, #header").css({"margin-top" : $(".topBanner").height()});
		$(".mainConWrap").css("margin-top", $(".mainVis").height());
		$(".indiArea").width($(".mainVis").height());
		$(".mainVis .rollArea .roll .bg").css({"width" : $(window).width(), "height" : $(window).height()});

		/*if(!isWeb){
			clearInterval(autoRoll);
		}else{
			clearInterval(autoRoll);
			autoRoll = setInterval("mainVisRoll()", autoTime);
		}*/
	});

	mvMax = $('.mainVis .rollArea .roll').length - 1;
	$(window).load(function(){
		TweenMax.to($('.mainVis .rollArea .roll').eq(mvNum).find(".tit"), 1, {top:0, opacity:1, delay:0.5, ease:Power3.easeOut});
		TweenMax.to($('.mainVis .rollArea .roll').eq(mvNum).find(".txt"), 1, {top:0, opacity:1, delay:0.7, ease:Power3.easeOut});
		TweenMax.to($('.mainVis .rollArea .roll').eq(mvNum).find(".btn"), 1, {left:0, opacity:1, delay:0.9, ease:Power3.easeOut});
		TweenMax.to($(".mainVis .scroll"), 1, {bottom:0, opacity:1, delay:1.1, ease:Power3.easeOut});


	});
	$(".mainVis .indiArea .indi a").each(function(i){
		$(this).click(function(){
			if(!$(this).hasClass("on")){
				mainVisRoll(i);
				if(!$(".mainVis .autoBtn").hasClass("on")){
					/*if(!isWeb){
						clearInterval(autoRoll);
					}else{
						clearInterval(autoRoll);
						autoRoll = setInterval("mainVisRoll()", autoTime);
					}*/
				}
			}
		});
	});

	$(".mainVis .autoBtn").click(function(){
		if(!$(this).hasClass("on")){
			$(this).addClass("on");
			clearInterval(autoRoll);
		}else{
			$(this).removeClass("on");
			autoRoll = setInterval("mainVisRoll()", autoTime);
		}
	});

	// mainCon1
	TweenMax.to($(".mainCon1 > .conArea .boxArea .box"), 0, {backgroundSize:"100% 100%", ease:Power3.easeOut});
	TweenMax.to($(".mainCon1 > .conArea .boxArea .box .hoverBg"), 0, {backgroundSize:"100% 100%", ease:Power3.easeOut});
	$(".mainCon1 .box").each(function(){
		$(this).find("a").on("mouseenter focusin", function(){
			TweenMax.to($(this).parent(), 1, {backgroundSize:"110% 110%", ease:Power3.easeOut});
			TweenMax.to($(this).parent().find(".hoverBg"), 1, {backgroundSize:"110% 110%", display:"block", opacity:1, ease:Power3.easeOut});
		});
		$(this).find("a").on("mouseleave focusout", function(){
			TweenMax.to($(this).parent(), 1, {backgroundSize:"100% 100%", ease:Power3.easeOut});
			TweenMax.to($(this).parent().find(".hoverBg"), 1, {backgroundSize:"100% 100%", opacity:0, ease:Power3.easeOut, onComplete:function(){
				$(this).parent().find(".hoverBg").hide();
			}});
		});
	});

	// mainCon3
	$(".counter").counterUp({
		delay: 10,
        time: 1300
	});
	$(".mainCon3 .bottomArea .box").each(function(i){
		$(this).on("mouseenter", function(){
			if(!$(this).hasClass("on")){
				$(".mainCon3 .bottomArea .box .hover").stop().fadeOut(300);
				$(".mainCon3 .bottomArea .box").removeClass("on");
				$(this).addClass("on");
				$(this).find(".hover").fadeIn(300);
			}
		});
	});

	// mainCon4 - NEWS
	var swiperMainCon1 = new Swiper('.newsRoll .swiper-container', {
		autoHeight : true,
		spaceBetween:22,
		navigation: {
			nextEl: '.newsRoll .swiper-button-next',
			prevEl: '.newsRoll .swiper-button-prev',
		},
		breakpoints: {
			1920: {
				slidesPerView:3,
				spaceBetween:18,
				autoHeight : true
			},
			1024: {
				slidesPerView:3,
				spaceBetween:18,
				autoHeight : true
			},
			758: {
				slidesPerView:1,
				spaceBetween:0,
				slidesPerView:1,
			},
			640: {
				slidesPerView:1,
				spaceBetween:0,
				slidesPerView:1,
			},
		}
	});

	// 스크롤 이벤트
	var st = $(window).scrollTop(), st2 = $(window).scrollTop() + ($(window).height()/2);
	$(window).scroll(function(){
		st = $(window).scrollTop();
		st2 = $(window).scrollTop() + ($(window).height()/2);

		if(st <= $(".topBanner").outerHeight(true)){
			if(!$('.mainVis, #header').hasClass("mt0")){
				$(".mainVis, #header").css("margin-top", $(".topBanner").outerHeight(true) - st);
			}
		}else{
			$(".mainVis, #header").css("margin-top", 0);
		}

		// 헤더
		if(st > $(".topBanner").height()){
			$("#header.main").addClass("scrolled");
		}else{
			$("#header.main").removeClass("scrolled");
		}

		// 메인비주얼
		if(st <= $(window).height()){
			TweenMax.to($('.mainVis'), 0.2, {top:-st/3, ease:Power3.easeOut});
		}

		// 메인 스크롤 모션
		if($(".mainCon1").size() != 0 && $(".mainCon2").size() != 0 && $(".mainCon3").size() != 0 && $(".mainCon4").size() != 0){
			if(st2 >= $(".mainCon1").offset().top && st2 < $(".mainCon2").offset().top){
				TweenMax.to($('.mainCon1 > .txt'), 1, {top:0, opacity:1, ease:Power3.easeOut});
				TweenMax.to($('.mainCon1 > .conArea .txtImg1'), 2, {right:-435, opacity:1, delay:0.1, ease:Power3.easeOut});
				TweenMax.to($('.mainCon1 > .conArea .boxArea .box.box1'), 1, {top:100, opacity:1, delay:0.7, ease:Power3.easeOut});
				TweenMax.to($('.mainCon1 > .conArea .boxArea .box.box2'), 1, {top:0, opacity:1, delay:0.9, ease:Power3.easeOut});
				TweenMax.to($('.mainCon1 > .conArea .boxArea .box.box3'), 1, {top:100, opacity:1, delay:1.1, ease:Power3.easeOut});
				TweenMax.to($('.mainCon1 > .conArea .boxArea .box.box4'), 1, {top:0, opacity:1, delay:1.3, ease:Power3.easeOut});
				TweenMax.to($('.mainCon1 > .conArea .boxArea .box.box5'), 1, {top:0, opacity:1, delay:1.3, ease:Power3.easeOut});
				TweenMax.to($('.mainCon1 > .conArea .boxArea .box.box6'), 1, {top:100, opacity:1, delay:1.3, ease:Power3.easeOut});
				TweenMax.to($('.mainCon1 > .conArea .txtImg2'), 2, {left:-431, opacity:1, delay:1.1, ease:Power3.easeOut});
			}
			if(st2 >= $(".mainCon2").offset().top && st2 < $(".mainCon3").offset().top){
				TweenMax.to($('.mainCon2 .txtArea .tit'), 1, {top:6, opacity:1, ease:Power3.easeOut});
				TweenMax.to($('.mainCon2 .img'), 2, {left:"50%", opacity:1, ease:Power3.easeOut});
				TweenMax.to($('.mainCon2 .txtArea .txt'), 1, {top:0, opacity:1, delay:0.2, ease:Power3.easeOut});
				TweenMax.to($('.mainCon2 .txtArea .btns'), 1, {top:0, opacity:1, delay:0.4, ease:Power3.easeOut});
				TweenMax.to($('.mainCon2 .txtArea .downBtns'), 1, {top:0, opacity:1, delay:0.6, ease:Power3.easeOut});
			}
			if(st2 >= $(".mainCon3 .bottomArea").offset().top - 300 && st2 < $(".mainCon4").offset().top){
				TweenMax.to($('.mainCon3 .bottomArea'), 1, {top:0, opacity:1, ease:Power3.easeOut});
			}
			if(st2 >= $(".mainCon4").offset().top){
				TweenMax.to($('.mainCon4 .inner > .tit'), 1, {left:0, opacity:1, ease:Power3.easeOut});
				TweenMax.to($('.mainCon4 .main-btn'), 1, {right:0, opacity:1, ease:Power3.easeOut});
				TweenMax.to($('.mainCon4 .newsRoll'), 1, {top:0, opacity:1, delay:0.2, ease:Power3.easeOut});
				TweenMax.to($('.mainCon5 .boxArea'), 1, {top:0, opacity:1, delay:0.4, ease:Power3.easeOut});
			}
		}
	});
});

function mainVisRoll(index){
	if(!mainVisMove){
		mainVisMove = true;
		$(".mainVis .indiArea").removeClass("roll" + mvNum);
		$(".mainVis .indiArea .indi a").eq(mvNum).removeClass("on");
		TweenMax.to($('.mainVis .rollArea .roll').eq(mvNum), 0, {zIndex:1, ease:Power3.easeOut});
		TweenMax.to($('.mainVis .rollArea .roll').eq(mvNum), 1, {width:0, left:"-100%", delay:0.3, ease:Power3.easeIn});
		TweenMax.to($('.mainVis .rollArea .roll').eq(mvNum).find(".dimd"), 1, {display:"block", opacity:1, delay:0.1, ease:Power3.easeIn});
		if(index === undefined){
			mvNum++;
			if(mvNum > mvMax) mvNum = 0;
		}else{
			mvNum = index;
		}
		$(".mainVis .indiArea").addClass("roll" + mvNum);
		$(".mainVis .indiArea .indi a").eq(mvNum).addClass("on");
		TweenMax.to($('.mainVis .rollArea .roll').eq(mvNum), 0, {zIndex:2, left:"auto", right:0, ease:Power3.easeIn});
		TweenMax.to($('.mainVis .rollArea .roll').eq(mvNum).find(".tit"), 0, {top:-100, opacity:0, ease:Power3.easeOut});
		TweenMax.to($('.mainVis .rollArea .roll').eq(mvNum).find(".txt"), 0, {top:-100, opacity:0, ease:Power3.easeOut});
		TweenMax.to($('.mainVis .rollArea .roll').eq(mvNum).find(".btn"), 0, {left:100, opacity:0, ease:Power3.easeOut});
		TweenMax.to($('.mainVis .rollArea .roll').eq(mvNum).find(".dimd"), 0, {display:"none", opacity:0, ease:Power3.easeOut});
		TweenMax.to($('.mainVis .rollArea .roll').eq(mvNum), 1, {width:"100%", ease:Power3.easeIn, onComplete:function(){
			TweenMax.to($('.mainVis .rollArea .roll').eq(mvNum).find(".tit"), 1, {top:0, opacity:1, ease:Power3.easeOut});
			TweenMax.to($('.mainVis .rollArea .roll').eq(mvNum).find(".txt"), 1, {top:0, opacity:1, delay:0.2, ease:Power3.easeOut});
			TweenMax.to($('.mainVis .rollArea .roll').eq(mvNum).find(".btn"), 1, {left:0, opacity:1, delay:0.4, ease:Power3.easeOut, onComplete:function(){
				mainVisMove = false;
			}});
		}});
	}
}
