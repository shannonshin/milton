var isWeb;
var isTabl;
var isMobile;

$(document).ready(function(){
	//반응형
	$(window).resize(function(){
		if(jQuery(window).width() > 1007){ //웹
			isWeb = true;
			isTabl = false;
			isMobile = false;
		}else if(741 < jQuery(window).width() && jQuery(window).width() <= 1006){ //태블릿
			isWeb = false;
			isTabl = true;
			isMobile = false;
		}else if(741 >= jQuery(window).width()){ //모바일
			isWeb = false;
			isTabl = false;
			isMobile = true;
		}

		// subV
		if(isWeb == true){
			TweenMax.to($(".subV .titArea"), 0, {top:"55%", ease:Power3.easeOut});
		}else if(isTabl == true){
			TweenMax.to($(".subV .titArea"), 0, {top:"45%", ease:Power3.easeOut});
		}else if(isMobile == true){
			TweenMax.to($(".subV .titArea"), 0, {top:"42%", ease:Power3.easeOut});
		}

		// 헤더 검색창
		if(isWeb == false && $(".srchBtn").hasClass("on")){
			$(".srchArea").hide();
			$(".srchBtn").removeClass("on");
			$(".blackBg").css("z-index","2").stop().fadeOut(300);
		}

	});$(window).resize();

	// 2018-10-23 추가
	if($(".mainVis").length > 0 || $(".prodMainV").length > 0 || $(".historyArea").length > 0 || $(".companyDiv").length > 0){
		//$("html, body").css("overflow", "initial");
	}

	// GNB
	var gnbNum = -1;
	var gnb_state = false;
	$("#header #gnb > li").each(function(i){
		$(this).on("mouseenter", function(){
			$("#header #gnb > li").removeClass("on");
			$(this).addClass("on");
			if(gnb_state == false){
				gnb_state = true;
				$("#header #gnb > li .twoD").slideDown(300);
				$("#header .gnbBg").slideDown(300);
				$(".blackBg").fadeIn(300);
				$(".util .lang > div").hide();
				$(".util .srchBtn").removeClass("on");
				$("#header .srchArea").css("z-index", "0").slideUp(300);
			}
		});
	});

	$("#header #gnb").on("mouseleave", function(){
		$("#header #gnb > li").removeClass("on");
		$("#header #gnb > li .twoD").stop().slideUp(300, function(){
			gnb_state = false;
		});
		$("#header .gnbBg").stop().slideUp(300);
		$(".blackBg").stop().fadeOut(300);
	});



	// 헤더 검색 클릭 시
	$(".util .srchBtn").click(function(){
		if(!$(this).hasClass("on")){
			$(this).addClass("on");
			$("#header .srchArea").css("z-index", "15").slideDown(300);
			$(".util .lang > a").removeClass("on"); //초기화
			$(".util .lang > div").hide();
			$(".blackBg").stop().fadeIn(300);
		}else{
			$(this).removeClass("on");
			$("#header .srchArea").css("z-index", "0").slideUp(300);
			$(".blackBg").stop().fadeOut(300);
		}
	});

	// 전체메뉴 클릭 시
	$(".allMenuBtn").click(function(){
		if(!$(this).hasClass("on")){
			$(this).addClass("on");
			$("body, html").addClass("ovF");
			$("#header #gnb").hide();
			$("#header .rightDiv .smallBtn").hide();
			$("#header .rightDiv .lang > a").removeClass("on");
			$("#header .rightDiv .lang").hide();
			$("#header .rightDiv .lang div").hide();
			$("#header .rightDiv .srchBtn").removeClass("on");
			$("#header .rightDiv .srchBtn").hide();
			$(".blackBg").css("z-index","2").stop().fadeOut(300);
			$(".srchArea").hide();
			TweenMax.to($(".allMenu .openDiv"), 0.6,{left:0, display:"block", ease:Power3.easeOut});
			$("#header").css({"z-index" : 100, "margin-top" : 0}).addClass("mt0");
		}else{
			$(this).removeClass("on");
			$("body, html").removeClass("ovF");
			$("#header #gnb").show();
			$("#header .rightDiv .smallBtn").show();
			$("#header .rightDiv .lang").show();
			$("#header .rightDiv .srchBtn").show();
			TweenMax.to($(".allMenu .openDiv"), 0.6,{left:"100%", display:"none", ease:Power3.easeOut});
			if($(".topBanner").is(":visible")){
				$("#header").css({"z-index" : 10, "margin-top" : $(".topBanner").height()}).removeClass("mt0");
			}else{
				$("#header").css({"z-index" : 10, "margin-top" : 0}).removeClass("mt0");
			}
			$(".mainVis").css({"margin-top" : $(".topBanner").height()});
		}
	});

	// dimd 눌렀을 때
	$(".blackBg").click(function(){
		if(!$(".contArea .contBox").hasClass("on") && !$(".recruitG_box .grayBtn").hasClass("on")){ // 2018-10-25 수정
			$(".util .srchBtn").removeClass("on");
			$("#header .srchArea").css("z-index", "0").slideUp(300);
			$("#header #gnb > li").removeClass("on");
			$("#header #gnb > li .twoD").stop().slideUp(300);
			$("#header .gnbBg").stop().slideUp(300);
			$(".layerPop, .layerPop2, .alertArea").fadeOut(300);
			$(".blackBg").css("z-index","2").stop().fadeOut(300);
		}
	});

	// 메인 헤더
	$("#header #gnb > li").on("mouseenter", function(){
		$("#header.main").addClass("hover");
	});
	$("#header #gnb").on("mouseleave", function(){
		$("#header.main").removeClass("hover");
	});

	$(".util .lang > a").click(function(){
		if(!$(this).hasClass("on")){
			$("#header.main").removeClass("hover");
		}else{
			$("#header.main").addClass("hover");
		}
	});

	$(".util .srchBtn").click(function(){
		if(!$(this).hasClass("on")){
			$("#header.main").removeClass("hover");
		}else{
			$("#header.main").addClass("hover");
		}
	});

	$(".allMenuBtn").click(function(){
		if(!$(this).hasClass("on")){
			$("#header.main").removeClass("hover");
		}else{
			$("#header.main").addClass("hover");
		}
	});


	//모바일_ 전체메뉴_아코디언
	var mAllOpen = -1;
	var mAllOpen2 = -1;
	$(".allMenu .openDiv .oneD_area").each(function(q){
		$(this).find(".oneD").click(function(){
			if(isTabl == true || isMobile == true){
				if(q!=mAllOpen){
					if($(this).hasClass("on")){
						$(".allMenu .openDiv .oneD_area .twoD_area").slideUp(500);
						$(this).removeClass("on");
						mAllOpen = -1;
					}else{
						$(".allMenu .openDiv .oneD_area .twoD_area").slideUp(500);
						$(this).next(".twoD_area").slideDown(500);
						$(".allMenu .openDiv .oneD_area .oneD").removeClass("on");
						$(this).addClass("on");
						mAllOpen = q;
					}
				}else{
					$(this).next(".twoD_area").slideUp(500);
					$(".allMenu .openDiv .oneD_area .oneD").removeClass("on");
					mAllOpen = -1;
				}
			}
		});
	});

	$(".allMenu .openDiv .oneD_area > .twoD_area .twoD").each(function(q){
		$(this).find(".thrBt").click(function(){
			if(isTabl == true || isMobile == true){
				if(q!=mAllOpen2){
					$(".allMenu .openDiv .oneD_area > .twoD_area .twoD .thrBt").removeClass("curent");
					$(".allMenu .openDiv .oneD_area > .twoD_area .twoD .thrD").slideUp(500);
					$(this).addClass("curent");
					$(this).next(".thrD").slideDown(500);
					mAllOpen2 = q;
				}else{
					$(this).removeClass("curent");
					$(this).next(".thrD").slideUp(500);
					mAllOpen2 = -1;
				}
			}
		});
	});

	// CSR 이미지 롤링
	if($(".csrArea2").length > 0){
		var csrSwiper = $(".csrArea2 .csrBox .imgBox .swiper-container");

		csrSwiper.each(function(index, element){
			var $this = $(this);
			var swiper = new Swiper(this, {
				navigation:{
					nextEl : $this.find(".swiper-button-next")[0],
					prevEl : $this.find(".swiper-button-prev")[0]
				}
			});

			if($this.find(".swiper-slide").length == 1){
				$this.find(".swiper-button-prev, .swiper-button-next").hide();
			}
		});

		$(".csrArea2 .csrTab a").each(function(i){
			$(this).click(function(){
				$(".csrArea2 .csrTab a").removeClass("on");
				$(this).addClass("on");
				TweenMax.to($("html, body"), 1.5, {scrollTop:$(".csrArea2 .csrTit").eq(i).offset().top - 70, ease:Power3.easeInOut, onComplete:function(){
					$(".csrArea2 .csrTit").eq(i).focus();
				}});
			});
		});
	}

	// 탑버튼
	$(window).scroll(function(){
		if($(window).scrollTop() > $("#header").height()){
			$(".topBtn").fadeIn(200);
		}else if($(window).scrollTop() <= $("#header").height()){
			$(".topBtn").fadeOut(200);
		}
		if($(window).scrollTop() + $(window).height() > $("#footer").offset().top){
			if(isWeb && !isTabl && !isMobile){
				$(".topBtn").css({"position":"absolute", "bottom" : $("#footer").height() + 50});
			}else if(!isWeb && !isTabl && isMobile){
				$(".topBtn").css({"position":"absolute", "bottom" : $("#footer").height() + 20});
			}
		}else{
			if(isWeb && !isTabl && !isMobile){
				$(".topBtn").css({"position":"fixed", "bottom" : 50});
			}else if(!isWeb && !isTabl && isMobile){
				$(".topBtn").css({"position":"fixed", "bottom" : 20});
			}
		}
	});
	$(window).resize(function(){
		if($(window).scrollTop() + $(window).height() > $("#footer").offset().top){
			if(isWeb && !isTabl && !isMobile){
				$(".topBtn").css({"position":"absolute", "bottom" : $("#footer").height() + 50});
			}else if(!isWeb && !isTabl && isMobile){
				$(".topBtn").css({"position":"absolute", "bottom" : $("#footer").height() + 20});
			}
		}else{
			if(isWeb && !isTabl && !isMobile){
				$(".topBtn").css({"position":"fixed", "bottom" : 50});
			}else if(!isWeb && !isTabl && isMobile){
				$(".topBtn").css({"position":"fixed", "bottom" : 20});
			}
		}
	});$(window).resize();

	$(".topBtn").click(function(){
		TweenMax.to($("html, body"), 1, {scrollTop:0, ease:Power3.easeInOut});
	});

	$(window).scroll(function(){
		if($(".lnb").size() != 0){
			if(isWeb == true){ // pc
				if($(window).scrollTop() > $(".subV").offset().top){
					$(".lnb").addClass("scroll");
				}else{
					$(".lnb").removeClass("scroll");
				}
			}else{	// 태블릿, 모바일
				if($(window).scrollTop() > $("#header").height() + $(".subV").height() - $(".lnb").height()){
					$(".lnb").addClass("scroll");
				}else{
					$(".lnb").removeClass("scroll");
				}
			}
		}
	});


});
