$(window).on('load scroll', function () {
	var scrollValue = $(document).scrollTop();
	if (scrollValue) {
		$('body').addClass('scrolled');
	} else {
		$('body').removeClass('scrolled');
	}

	if ($('.bottom_btn_area').length) {
		$('.contents').addClass('bottom_btn')
	}

	if ($('[data-scroll-item]').length) {
		var bodyH, point;
		bodyH = $('body').height() / 2;
		point = $('[data-scroll-item]');

		$.each(point, function () {

			points = $(this).offset().top
			if (points <= scrollValue + bodyH + 120) {
				$(this).addClass('open')
			}

		})
	}
});

$(function () {
	//툴팁박스
	$('.tooltip_area').each(function () {
		if ($(this).hasClass('open')) {
			$(this).siblings('.tooltip_cont').show();
		}
	})

	$('.tooltip_btn').on('click', function () {
		let $tg = $(this).parents('.tooltip_area').siblings('.tooltip_cont');
		if ($(this).parents('.tooltip_area').hasClass('open')) {
			$tg.attr('aria-hidden', true);
			$tg.slideUp(400);
			$(this).parents('.tooltip_area').removeClass('open');
		} else {
			$tg.attr('aria-hidden', false);
			$tg.slideDown(400).focus();
			$(this).parents('.tooltip_area').addClass('open')
		}
	})
	///툴팁박스

	//스텝
	if ($('.cont_step').length) {
		let current, total;
		current = $('.cont_step .step em').text();
		total = $('.cont_step .step span').text();
		$('.cont_step .step').attr('aria-hidden', true);
		$('.cont_step').prepend('<span class="blind"></span>');
		$('.cont_step > .blind').html('' + total + '단계 중' + current + '단계');
	}
	///스텝

	// 토글박스
	$('.item_list.type_toggle a.item_top').on('click', function () {
		$(this).toggleClass('active').siblings('.item_btm').slideToggle(500);
	})

	$('a.toggle_tit').on('click', function () {
		$(this).toggleClass('active').siblings('.toggle_cont').slideToggle(500)
	})
	///토글박스

	//입력필드
	fieldUiSet();

	$('.field_wrap').on('click focusin', function () {
		if (!($(this).hasClass('active'))) {
			$(this).addClass('active');
		}
	})

	$('.field_wrap').on('focusout', function () {
		if (!($(this).find('input.val').val() || $(this).find('.val').text() || $(this).find('.datepicker').length)) {
			$(this).removeClass('active');
		}
		var tg = $(this).find('input.val')
		$.each(tg, function (index, value) {
			$val = $(value).val()

			if (!($val === '' || $val == undefined)) {
				$(this).parents('.field_wrap').addClass('active');
			} else {
				$(this).removeClass('active');
			}
		})
	})
	///입력필드

	// 상하 스크롤 블러영역
	$('.scroll_container').each(function () {
		scrVertical($(this));
	});
	/// 상하 스크롤 블러영역

	// 계좌선택영역
	$('.type_acc input').on('change', function () {
		var list;
		list = $(this).parents('.type_acc');

		if ($(this).prop('checked', 'checked')) {
			$(this).parents('.chk').siblings('.chk_for').find('p').slideDown(350);
			$(this).parents('li').siblings().find('.chk_for p').slideUp(350)
		}
	})
	///계좌선택영역

	// 상담버튼닫기
	if (contGetCookie($('.consult_wrap').attr('class'))) {
		$('.consulting').remove();
	}

	//상담레이어 닫기
	$('.consulting .btn_close').on('click', function () {
		consultingClose(this);
		$(this).parents('.consulting').remove();
	})
	///상담버튼닫기
})

function fieldUiSet() {
	$('.field_wrap').each(function () {
		if ($(this).find('input.val').val() || $(this).find('.val').text() || $(this).find('.datepicker').length) {
			$(this).addClass('active');
		}
	})
}

// 데이트피커
function datepickerSet() {
	$('.datepicker').datepicker({
		beforeShow: function () {
			$('body').append('<div class="layer_popup_box layer_datepicker" data-popup="layerDatepicker"><div class="dim"></div><div class="popup"><div class="popup_head"><h4 class="popup_tit">날짜 선택</h4></div><div class="popup_content"></div><button type="button" class="btn_popup_close" onclick="fn_hide_popup("layerDatepicker");"><span class="blind">닫기</span></button></div></div>');
			$('#ui-datepicker-div').appendTo('[data-popup=layerDatepicker] .popup_content');
			fn_open_popup('layerDatepicker', this);
		},
		onClose: function () {
			fn_hide_popup('layerDatepicker');
			$('[data-popup=layerDatepicker]').remove();
		}
	});
}

$(function () {
	$.datepicker.setDefaults({
		dateFormat: 'yy.mm.dd',
		prevText: '이전 달',
		nextText: '다음 달',
		monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		dayNames: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
		showMonthAfterYear: true,
		yearSuffix: '년',
		showOn: "button",
		buttonImageOnly: false,
		buttonText: "날짜 선택",
	});

	datepickerSet();
})
///데이트피커

// 상하 스크롤 블러영역
function scrVertical(_obj) {
	if (_obj.height() < _obj.children('.scroll_track').children('.scroll_content').height()) {
		_obj.addClass('scroll_start');
	}

	_obj.children('.scroll_track').on('scroll', function (e) {
		var currTop = this.scrollTop,
			scrHeight = this.scrollHeight,
			trackHeight = $(this).height();

		// 하단 블러
		if (currTop === 0 || currTop + trackHeight < scrHeight) {
			_obj.removeClass('scroll_end').addClass('scroll_start')
		} else if (currTop + trackHeight === scrHeight) {
			_obj.removeClass('scroll_start')
		}
		// 상단, 하단 블러 
		// if (currTop === 0) {
		// 	_obj.removeClass('scrolling').removeClass('scroll_end').addClass('scroll_start')
		// } else if (currTop + trackHeight < scrHeight) {
		// 	_obj.removeClass('scroll_start').removeClass('scroll_end').addClass('scrolling')
		// } else if (currTop + trackHeight === scrHeight) {
		// 	_obj.removeClass('scrolling').removeClass('scroll_start').addClass('scroll_end')
		// }
	})
}
///상하 스크롤 블러영역

// animation plugin
$(function () {
	var aniOption = {
		animateClass: 'animate__animated', // for v3 or 'animate__animated' for v4
		animateThreshold: -3000,
		scrollPollInterval: false,
	}

	$('.ani-fadeinup').AniView(aniOption);

	var aniScroll = {
		animateClass: 'animate__animated',
		animateThreshold: 0,
		scrollPollInterval: 20,
	}

	$('input[type="checkbox"][data-ani-trigger], input[type="radio"][data-ani-trigger]').not('[data-chk-all]').on('change', function () {
		ani_op(this);
	})

	$('input.val[data-ani-trigger]').on('change', function () {
		$(this).bind('blur', 'focusout', function () {
			if ($(this).val()) {
				ani_op(this);
			}
		})
	})

	$('.opt_wrap button').on('click', function () {
		let $val, $layer;
		$val = $(this).text();
		$layer = $(this).parents('.layer_popup_box').data('popup');

		$(".type_select[data-wa-btn='focus']").find('.val').text($val);

		if ($(".type_select[data-wa-btn='focus']").find('.val').attr('data-ani-trigger')) {
			ani_op(".type_select[data-wa-btn='focus'] .val");
		}

		fn_hide_popup($layer);
	})

	var $chkAll = $('[data-chk-all]');

	$chkAll.on('change', function () {
		var name, checked;
		name = $(this).attr('name');
		checked = $(this).prop('checked');
		$("input[name=" + name + "]").prop('checked', checked);
	})

	$('input[type=checkbox]').on('change', function () {
		var name, chks, chkeds, compare;
		name = $(this).attr('name');
		chks = $("input[type=checkbox][name =" + name + "]").not("[data-chk-all]").length;
		chkeds = $("input[type=checkbox][name =" + name + "]:checked").not("[data-chk-all]").length;
		compare = (chks == chkeds)
		$chkAll.prop('checked', compare);
		if (compare && $chkAll.attr('data-ani-trigger')) {
			ani_op("input[type=checkbox][name =" + name + "][data-chk-all]");
		}
	})

	$('[data-ani-trigger]').not('input, div.val').on('click', function () {
		ani_op(this);
	})

	function ani_op(controller) {
		var controller = $(controller);
		var target = $("[data-ani-target=" + controller.data('ani-trigger') + "]");

		if (controller.attr('data-ani-trigger')) {


			if ($("[data-ani-trigger=" + controller.data('ani-trigger') + "]").length > 1 && controller.is(":not(input[type=checkbox])")) {
				var inp, inps, select, selects;
				inp = $("input.val[data-ani-trigger=" + controller.data('ani-trigger') + "]");
				inps = [];
				select = $("div.val[data-ani-trigger=" + controller.data('ani-trigger') + "]");
				selects = [];



				$.each(select, function (key, value) {
					if (!($(this).text() === '')) {
						selects.push($(this).text())
					}
				})

				$.each(inp, function (index, value) {
					if (!($(value).val() === '' || $(value).val() == undefined)) {
						inps.push($(value).val())
					}
				})

				if (inps.length == inp.length && selects.length == select.length) {
					if (target.length > 1) {

						$.each(target, function () {
							target.wrap('<div class="ani-fadeinup" data-av-animation="animate__fadeInUp" tabindex="0"></div>')
						})

						target.parents('.ani-fadeinup').AniView(aniOption);
						$("[data-ani-trigger=" + controller.data('ani-trigger') + "]").removeAttr('data-ani-trigger');

					} else {
						target.wrapAll('<div class="ani-fadeinup" data-av-animation="animate__fadeInUp" tabindex="0"></div>')
						target.parents('.ani-fadeinup').AniView(aniOption);
						$("[data-ani-trigger=" + controller.data('ani-trigger') + "]").removeAttr('data-ani-trigger');
					}
				}

			} else {
				if (target.length > 1) {

					$.each(target, function () {
						target.wrap('<div class="ani-fadeinup" data-av-animation="animate__fadeInUp" tabindex="0"></div>')
					})

					target.parents('.ani-fadeinup').AniView(aniOption);
					$("[data-ani-trigger=" + controller.data('ani-trigger') + "]").removeAttr('data-ani-trigger');

				} else {
					target.wrapAll('<div class="ani-fadeinup" data-av-animation="animate__fadeInUp" tabindex="0"></div>')
					target.parents('.ani-fadeinup').AniView(aniOption);
					$("[data-ani-trigger=" + controller.data('ani-trigger') + "]").removeAttr('data-ani-trigger');
				}
			}
		}
	}
	///animation plugin

	// 탭메뉴
	if ($('.tab .current').length && $('.tab_cont_wrap').length) {
		let target;
		target = $('.tab .current').find('a').attr('href').slice(1);

		$("[data-tab-cont=" + target + "]").addClass('open');
	}

	$('.tab a').on('click', function (e) {
		e.preventDefault();
		if ($(this).parents('li').not('.current')) {
			$(this).parents('li').addClass('current').siblings().removeClass('current');

			if ($(this).attr('href').includes("cont") || $(this).attr('href').includes("tab")) {
				var target;
				target = $(this).attr('href').slice(1);
				$("[data-tab-cont=" + target + "]").addClass('open').siblings().removeClass('open');

				if ($('.banner_toggle_slide').length) {
					bannerToggleSlide.slidePrev(800);
					$('.banner_toggle_slide').find('.swiper-wrapper').css({
						height: $('.banner_toggle_slide').find('.swiper-wrapper .slide:eq(0)').outerHeight(true)
					})
				}
			}
		}

		if ($('.tab3 .bg').is(":visible")) {
			tab3Curr();
		}
	})

	$('.tab3 a').on('click', function () {
		tab3Curr();
	})

	function tab3Curr() {
		if ($('.tab3 .bg').length && $('.tab3 .current')) {
			var bg, point, points;
			bg = $('.tab3 .bg');
			point = $('.tab3 .current').parents('li').index == 0 ? 0 : $('.tab3 .current').prevAll();
			points = 0

			$.each(point, function () {
				points += point.width();
			})

			if (bg.length && point !== undefined) {
				bg.css({
					"width": $('.tab3 .current a').width(),
					"transform": "translateX(" + points + "px" + ")",
				})
			}
		}
	}

	if ($('.tab3 .bg').length && $('.tab3 .current')) {
		var bg, point, points;
		bg = $('.tab3 .bg');
		point = $(this).parents('li').index == 0 ? 0 : $(this).parents('li').prevAll();
		points = 0

		$.each(point, function () {
			points += $(this).width();
		})

		if (bg.length && point !== undefined) {
			bg.css({
				"width": $('.tab3 .current a').width(),
				"transform": "translateX(" + points + "px" + ")",
			})
		}
	}

	///탭메뉴

	// 스와이퍼
	var basicSlide = new Swiper(".basic_slide", {
		slidesPerView: "auto",
		spaceBetween: 0,
		centeredSlides: true,
		loop: false,
		speed: 800,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},

	});

	var promotionSlide = new Swiper(".promotion_slide", {
		slidesPerView: "auto",
		spaceBetween: 0,
		centeredSlides: true,
		autoplay: {
			delay: 3500
		},
		loop: false,
		speed: 800,
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},

	});

	$(".promotion_slide .swiper-button-pause").click(function () {
		promotionSlide.autoplay.stop();
		$(this).hide();
		$(this).siblings('.swiper-button-play').show();
	});

	$(".promotion_slide .swiper-button-play").click(function () {
		promotionSlide.autoplay.start();
		$(this).hide();
		$(this).siblings('.swiper-button-pause').show();
	});

	var cardSlide = new Swiper(".card_slide.card_type1", {
		slidesPerView: "auto",
		spaceBetween: 0,
		centeredSlides: true,
		autoplay: {
			delay: 3500
		},
		loop: false,
		//autoHeight: false,
		//observer: true,
		//observeParents: true,

		speed: 800,
		// allowTouchMove: false,
		// resistance: false,
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},

	});

	var cardSlide2 = new Swiper(".card_slide.card_type2", {
		slidesPerView: "auto",
		spaceBetween: 0,
		centeredSlides: true,
		slidesOffsetBefore: 0,
		loop: false,
		//autoHeight: false,
		observer: true,
		observeParents: true,
		slideToClickedSlide: true,

		speed: 800,
		//allowTouchMove: true,
		//resistance: false,
	});

	$(".card_slide .swiper-button-pause").click(function () {
		cardSlide.autoplay.stop();
		$(this).hide();
		$(this).siblings('.swiper-button-play').show();
	});

	$(".card_slide .swiper-button-play").click(function () {
		cardSlide.autoplay.start();
		$(this).hide();
		$(this).siblings('.swiper-button-pause').show();
	});

	var bannerToggleSlide = new Swiper(".banner_toggle_slide", {
		slidesPerView: 1,
		spaceBetween: 48,
		autoplay: false,
		loop: false,
		autoHeight: true,
		//observer: true,
		//observeParents: true,

		speed: 800,
		allowTouchMove: false,
		resistance: false,
		pagination: false,
		navigation: {
			nextEl: ".slide .link_btn_list button",
			prevEl: ".slide .link_arr, .tab li a",
		},

		on: {
			slideNextTransitionStart: function () {
				var point, height, tabHeight;
				point = $('.banner_scroll .banner_top').outerHeight(true) + 5;
				height = $('.banner_toggle_slide .swiper-slide').eq(0).outerHeight() > $('.banner_toggle_slide .swiper-slide').eq(1) ? $('.banner_toggle_slide .swiper-slide').eq(0) : $('.banner_toggle_slide .swiper-slide').eq(1).outerHeight();
				tabHeight = $('.banner_scroll .tab') ? $('.banner_scroll .tab').outerHeight(true) : 0;


				$('.banner_scroll').css({
					"transform": "translateY(" + -point + "px" + ")",
					"height": height + tabHeight + 40
				})

				$('.popup_content').animate({
					'scrollTop': 0
				}, 600)
			},

			slidePrevTransitionStart: function () {
				$('.popup_content').animate({
					'scrollTop': 0
				}, 600)

				$('.banner_scroll').removeAttr('style');
				var target;

				target = $('.banner_scroll .btn_more').parents('.btn_wrap').siblings('ul')
				target.find('li:gt(1)').remove();
			}
		}
	});

	$('.swiper_close').on('click', function () {
		var tgSlide;
		tgSlide = $(this).parents('.swiper-container');

		tgSlide.slideUp(600);
		setTimeout(() => {
			tgSlide.remove();
		}, 600)
	})

	$('.link_btn_list button').on('click', function () {
		$(this).parents('li').addClass('active').siblings().removeClass('active')
	})

	$('.banner_scroll .btn_more').on('click', function () {
		var target, node, count, point, height, tabHeight;
		target = $(this).parents('.btn_wrap').siblings('ul');
		node = target.find('li');
		count = node.length + 1;
		target.append(
			"<li><div class='ani-fadeinup' data-av-animation='animate__fadeInUp' tabindex='0'><span class='chk'><input type='checkbox' onchange='productCount(this);'  name='chk1' id=" + "chk1_" + count + "><label for=" + "chk1_" + count + ">선택</label></span><div class='chk_for' aria-labelledby=" + "chk1_" + count + "><span class='status level4'>다소높은 위험</span><strong>NH-Amundi하나로TDF2050증권 투자신탁 [주식혼합-재간접형]<br>C-P2e(퇴직연금)</strong><p class='mt_2'>고객의 은퇴시점에 따라 포트폴리오 비중을알아서 조절하는 글로벌 자산배분 펀드</p><div class='income mt_4'><span>최근 3개월 수익률</span><strong class='increase'>19.23%</strong></div><div class='mt_6 btn_flex_wrap'><button type='button' class='btn btn_sm btn_outline_primary'>관심상품으로 등록</button><button type='button' class='btn btn_sm btn_outline_black'>상품 상세정보 보기</button></div></div></div></li>"
		)

		point = $('.banner_scroll .banner_top').outerHeight() + 5;
		height = $(this).parents('.swiper-slide').outerHeight();
		tabHeight = $('.banner_scroll .tab') ? $('.banner_scroll .tab').outerHeight(true) : 0;

		$('.banner_scroll').css({
			"transform": "translateY(" + -point + "px" + ")",
			"height": height + tabHeight + 40
		});

		bannerToggleSlide.updateAutoHeight(600);
		target.find('li').eq(count - 1).find('.ani-fadeinup').AniView(aniOption);

	})
	///스와이퍼
})

//레이어
$(function () {
	$('.layer_popup_box').each(function () {
		if ($(this).hasClass('open')) {
			$('body').addClass('layer_open');
		} else {
			$(this).attr('aria-hidden', true);
		}
	})

	$('.layer_popup_box .dim').on('click', function (e) {
		e.preventDefault;
		let $layer = $(this).parents('.layer_popup_box').data('popup');
		fn_hide_popup($layer);
	})
})
//
function fn_open_popup(id, e) {
	$(e).attr('data-wa-btn', 'focus');
	$('body').addClass('layer_open');
	$(".layer_popup_box[data-popup=" + id + "]").addClass('open');
	$(".layer_popup_box[data-popup=" + id + "]").attr('aria-hidden', false);
	$(".layer_popup_box[data-popup=" + id + "]").attr('tabindex', '0').focus();

	var aniOption = {
		animateClass: 'animate__animated', // for v3 or 'animate__animated' for v4
		animateThreshold: -3000,
		scrollPollInterval: false,
	}

	$('.ani-pop-fade').AniView(aniOption);
}

function fn_hide_popup(id) {
	$('body').removeClass('layer_open');
	$(".layer_popup_box[data-popup=" + id + "]").attr('aria-hidden', true);
	$(".layer_popup_box[data-popup=" + id + "]").removeClass('open');
	$("[data-wa-btn='focus']").focus();
	$("[data-wa-btn='focus']").removeAttr('data-wa-btn');
}

function fn_open_in_popup(id, e) {
	var parentPopup, z, o;
	parentPopup = $(e).parents(".layer_popup_box");
	z = parentPopup.css('z-index');
	parentPopup.attr('aria-hidden', true);
	parentPopup.css({
		'z-index': z - 1
	});

	$.each($('.layer_popup_box.open').not(parentPopup), function () {
		o = $(this).css('z-index');
		z < o ? o - 1 : o
		$(this).css({
			'z-index': o - 1
		})
	})

	$(e).attr('data-wa-in-btn', 'focus');
	$(".layer_popup_box[data-in-popup=" + id + "]").addClass('open');
	$(".layer_popup_box[data-in-popup=" + id + "]").attr('aria-hidden', false);
	$(".layer_popup_box[data-in-popup=" + id + "]").attr('tabindex', '0').focus();
}

function fn_hide_in_popup(id) {
	var parentPopup;
	parentPopup = $("[data-wa-in-btn='focus']").parents(".layer_popup_box");
	parentPopup.attr('aria-hidden', false);
	parentPopup.css({
		'z-index': ''
	})

	$(".layer_popup_box[data-in-popup=" + id + "]").attr('aria-hidden', true);
	$(".layer_popup_box[data-in-popup=" + id + "]").removeClass('open');
	$("[data-wa-in-btn='focus']").focus();
	$("[data-wa-in-btn='focus']").removeAttr('data-wa-btn');
}
///레이어

function consultingClose(winName) {
	var id = $(winName).parents('.consult_wrap').attr('class');
	consultingCookie(id, "done", 1);
	$('.' + id).hide();
}

function contGetCookie(name) {
	var nameOfCookie = name + "=";
	var x = 0;
	while (x <= document.cookie.length) {
		var y = (x + nameOfCookie.length);
		if (document.cookie.substring(x, y) == nameOfCookie) {
			if ((endOfCookie = document.cookie.indexOf(";", y)) == -1)
				endOfCookie = document.cookie.length;
			return unescape(document.cookie.substring(y, endOfCookie));
		}
		x = document.cookie.indexOf(" ", x) + 1;
		if (x == 0)
			break;
	}
	return "";
}

function consultingCookie(name, value, expiredays) {
	var todayDate = new Date();
	todayDate = new Date(parseInt(todayDate.getTime() / 86400000) * 86400000 + 54000000);
	if (todayDate > new Date()) {
		expiredays = expiredays - 1;
	}
	todayDate.setDate(todayDate.getDate() + expiredays);
	document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

function preFieldChange(btn, extra) {
	var btn, before, after, inp, inps;
	btn = $(btn);
	before = btn.parent().siblings('.pre_field_txt.before');
	after = btn.parent().siblings('.pre_field_txt.after');
	inp = before.find('input.pre_field');
	inps = [];

	$.each(inp, function (index, value) {
		if (!($(value).val() === '' || $(value).val() == undefined)) {
			inps.push($(value).val())
		}
	})

	if (inps.length == inp.length) {

		if (before.is(":visible")) {
			before.hide();
			after.show();

			$.each(inp, function (index, value) {
				after.find(".pre_field[data-pre-result=" + $(value).data('pre-val') + "]").text($(value).val())
			})

			if (before.find('[data-pre-ex-trigger]').length) {
				after.find('[data-pre-ex]').text(before.find('[data-pre-ex-trigger]').val() * extra);
			}

			after.find('.pre_field, [data-pre-ex]').counterUp({
				delay: 10,
				time: 500
			});
		} else {
			after.hide();
			before.show();
			inp.val('')
		}
	}
}