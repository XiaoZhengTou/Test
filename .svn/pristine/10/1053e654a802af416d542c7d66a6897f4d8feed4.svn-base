function httpshowloading() {
	
	var html = '<div id="httploadbg" num="1" class="httpload">';
	html += '<div class="httploadimg">';
	html += '<img src="img/load.gif">';
	html += '</div>';
	html += '</div>';
	if (!(document.querySelectorAll('#httploadbg').length > 0)) {
		angular.element(document.body).append(html);
	} else {
		var num = parseInt(angular.element(document.querySelectorAll('#httploadbg')[0]).attr('num'));
		num += 1;
		angular.element(document.querySelectorAll('#httploadbg')[0]).attr('num', num);
	}
	//setTimeout(httpremoveloading, 10000);
};

function httpremoveloading() {
	//setTimeout(function() {
		var divs = document.querySelectorAll('#httploadbg');
		if (divs.length > 0) {
			var num = parseInt(angular.element(document.querySelectorAll('#httploadbg')[0]).attr('num'));
			if (num <= 1) {
				for (var i = 0; i < divs.length; i++) {
					angular.element(divs[i]).remove();
				}
			} else {
				num -= 1;
				angular.element(document.querySelectorAll('#httploadbg')[0]).attr('num', num);
				//console.log(num);
			}
		}

	//}, 100);

}

function httpremoveError() {
	//setTimeout(function() {
		var divs = document.querySelectorAll('#httperror');
		for (var i = 0; i < divs.length; i++) {
			angular.element(divs[i]).remove();
		}
	//}, 100);

}

function httpshowError(msg) {
	var html = '<div ng-controller="httploadCtrl" id="httperror" class="httpload" >';
	html += '<div class="httploadmsg md-whiteframe-4dp">';
	//			if (grade == 1) {
	//				html += '<p style="color:#000;text-align: center;">' + msg + '</p>';
	//			} else if (grade == 2) {
	//
	//			} else {
	//html += '<p style="font-size: 1.2em;color:#F44E43;">哎哟~服务器居然累倒了</h4>';
	//html += '<p style="font-size: 0.8em;color:#000;">别急，攻城狮正在紧急处理，马上就好</p>';
	html += '<div style="color:#000;text-align: center;">' + msg + '</div>';
	//}
	html += '<section layout="row" layout-sm="column" layout-align="center center" layout-wrap>';
	html += '';
	html += '<button class="md-primary md-button md-default-theme md-ink-ripple _md-autofocus" type="button" onclick="httpremoveError()" aria-label="Got it!"><span class="ng-binding ng-scope">确定</span><div class="md-ripple-container"></div></button>';
	html += '</section>';
	html += '</div>';
	html += '</div>';
	console.log(document.querySelectorAll('#httperror'));
	if (!(document.querySelectorAll('#httperror').length > 0)) {
		angular.element(document.body).append(html);
		//$compile(angular.element(document.querySelectorAll('#httperror')))(scope);
	}

};