$(document).ready(function () {
	myHTMLInclude();
})

function myHTMLInclude() {
	var z, i, a, file, xhttp, title;
	title = $('.header').data('title');
	z = document.getElementsByTagName("*");
	for (i = 0; i < z.length; i++) {
		if (z[i].getAttribute("w3-include-html")) {
			a = z[i].cloneNode(false);
			file = z[i].getAttribute("w3-include-html");
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function () {
				if (xhttp.readyState == 4 && xhttp.status == 200) {
					a.removeAttribute("w3-include-html");
					a.innerHTML = xhttp.responseText;
					z[i].parentNode.replaceChild(a, z[i]);
					myHTMLInclude();

					// 헤더 타이틀
					if ($('.header') && $('.header').data('title')) {
						$('.header_tit').text(title);
						$('.header').removeAttr('data-title');
					}
					///

					if (contGetCookie($('.consult_wrap').attr('class'))) {
						$('.consulting').remove();
					}

					//상담레이어 닫기
					$('.consulting .btn_close').on('click', function () {
						consultingClose(this);
						$(this).parents('.consulting').remove();
					})
					///

				}
			}
			xhttp.open("GET", file, true);
			xhttp.send();
			return;
		}
	}
}