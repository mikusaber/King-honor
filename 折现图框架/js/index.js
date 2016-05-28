	
//横坐标初始化
var horArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
//纵坐标初始化
var verArr = [40, 35, 30, 25, 20, 15, 10, 5, 0, -5];
var horArrLen = horArr.length;
var verArrLen = verArr.length;
//初始化函数
function init() {
	var graphtLeft = $('#graph').offset().left;
	var lineChartTitLeft = 	$('#lineChart').offset().left;
	var graphtWidth = $('#graph').width();
	var linTitWidth = $('.line-tit').width();
	var graphtHeight = $('#graph').height();
	var lineChartHeight = $('#lineChart').height();
	var verCooTitHeight = $('.ver-coo-tit').height();

	$('.line-tit').css({left : graphtLeft - lineChartTitLeft + (graphtWidth - linTitWidth) / 2});
	$('.ver-coo-tit').css({top : (lineChartHeight - verCooTitHeight) / 2});
	//添加横坐标的刻度
	for (var i = 0; i < horArrLen; i++) {
		$('.horizontal').append('<em>' + horArr[i] + '</em>')
	}
	//添加纵坐标的刻度
	for (var i = 0; i < verArrLen; i++) {
		$('.vertical').append('<em>' + verArr[i] + '</em>')
	}
	var verNum = graphtHeight / verArrLen;
	$('.vertical em').css({
		height : verNum + 'px',
		lineHeight : verNum + 'px'
	})
	var verEmHeight = $('.vertical em').height();
	//设置纵坐标每个刻度的位置
	for (var i = 0; i < verArrLen; i++) {
		$('.vertical em').eq(i).css({top : verNum * i + verEmHeight / 2 + 'px'})
	}
	$('.horizontal em').css({width : graphtWidth / horArrLen});
	$('#graph').append('<canvas id="can"></canvas>');
	$('#can').css({
		position : 'absolute',
		top : '5px',
		left: 0
	})
	var convasl = document.getElementById('can');
	console.log(convasl)
	function DrowButton(WBut, HBut, spacH, spacW, linenum, Hb, len, orgin, end) {
		convasl.width = WBut;
		convasl.height = HBut;
		var context = convasl.getContext('2d');
		// 绘制基准线
		for(var i = 0; i < linenum; i++) {
			if(i == (linenum - 1)) {
				for(var i = 0; i < len; i++) {
					var num = i * spacW;
					context.beginPath();
					context.moveTo((0 + num), HBut);
					context.lineTo((0 + num), (HBut - Hb));
					context.lineTo((spacW + num), (HBut - Hb));
					context.lineTo((spacW + num), HBut);
					context.strokeStyle = '#39f';
					context.stroke();
				}
				break;
			}
			var nub = i * spacH;
			context.beginPath();
			context.moveTo(orgin, (verEmHeight - 5 + nub));
			context.lineTo(end, (verEmHeight - 5 + nub));
			context.strokeStyle = '#ccc';
			context.lineWidth = 1;
			context.stroke();
		}
	}
	DrowButton(700, 300, verEmHeight, 700 / horArrLen, 10, 5, horArrLen, 0, 700);
}
/* 功能：生成线的函数，多次调用生成多条线
 * city：点集合的父级div
 * points：点
 * poColor：点与线的颜色
 * AxisY：点的Y坐标集合
 * canvas：连线的id名
 */
function genCity(city, points, poColor, AxisY, canvas) {
	var graphtLeft = $('#graph').offset().left;
	$('#graph').append('<div class="' + city + '"></div>');
	$('.' + city).css({
		position: 'absolute',
		left: 0,
		top: 0,
		width: '100%',
		height: '300px'
	})
	//生成点
	for (var i = 0; i < horArrLen; i++) {
		$('.' + city).append('<div class="' + points + '"></div>');
	}
	$('.' + city + ' .' + points).css({
		position: 'absolute',
		width: '8px',
		height: '8px',
		borderRadius: '90px',
		cursor: 'pointer',
		background : poColor,
		'z-index': '10'
	});
	var horEmWidth = $('.horizontal em').width();
	var cityPoints = $('.' + city + ' .' + points).width();
	//每个点的X坐标
	for (var i = 0; i < horArrLen; i++) {
		var verEmLeft = $('.horizontal em').eq(i).offset().left;
		$('.' + city + ' .' + points).eq(i).css({left : verEmLeft - graphtLeft + (horEmWidth - cityPoints) / 2});
	}
	chartsInit(city, points, AxisY, poColor);
	ligature(city, points, poColor, canvas);

	
}
//功能：根据输入的Y坐标值，生成相应的纵坐标轴刻度值
function chartsInit(city, points , AxisY, poColor) {
	var axesY = $('.' + city + ' .' + points);
	var arrAxisY = [];
	//将输入的Y坐标值集合进行排序
	for(var i = 0; i < AxisY.length; i++) {
		arrAxisY.push(AxisY[i]);
	}
	arrAxisY.sort(function(a, b) {
		return b - a;
	});
	//判断输入的Y坐标值的最大/最小值，并且取整十。作为纵坐标轴的最大/最小值。
	// if (arrAxisY[0] > 0) {
	// 	var maxArrY = Math.ceil(arrAxisY[0] / 10) * 10;
	// }
	// else {
	// 	var maxArrY = Math.ceil(arrAxisY[0] / 10) * 10;
	// }
	// if (arrAxisY[arrAxisY.length - 1] > 0) {
	// 	var minArrY = Math.floor(arrAxisY[arrAxisY.length - 1] / 10) * 10;
	// }
	// else {
	// 	var minArrY = Math.floor(arrAxisY[arrAxisY.length - 1] / 10) * 10;
	// }
	// var newVerArr = [];
	// var spacing = (maxArrY - minArrY) / 10;
	//通过最大/最小值对纵坐标刻度进行设置
	// for (var i = 0; i < 10; i++) {
	// 	newVerArr[i] = maxArrY - spacing * i;
	// }
	var newVerEM = $('.vertical em');
	// for (var i = 0; i < newVerArr.length; i++) {
	// 	newVerEM[i].innerHTML = newVerArr[i];
	// }
	var minArrY = -5;
	var maxArrY = 40;
	inputY();
	//寻找输入的Y坐标值，在图标上的位置，并显示出来。
	function inputY() {
		for(var i = 0; i < AxisY.length; i++) {
			var unitLen = 300 / (maxArrY - minArrY);
			$(axesY[i]).css({top : 300 - ((AxisY[i] - minArrY) * unitLen - unitLen - $(axesY[i]).height() / 2) + 'px'});
		}
	}

	// 鼠标移入圆点上出现的hover效果
	for(var i = 0; i < horArrLen; i++) {
		$(' .' + city + ' .' + points).append('<div>' + 12 + '</div>')
	}
	$(' .' + city + ' .' + points + ' div').css({
		display: 'none',
		position: 'absolute',
		left: '-35px',
		top: '-42px',
		width: '80px',
		height: '30px',
		padding: '5px',
		background: '#ccc',
		color: poColor,
		'z-index': '20'
	})
	$(' .' + city + ' .' + points).hover(function() {
		var _inde = $(this).index()
		var strcon = $('.horizontal em').eq(_inde).html();
		$(' .' + city + ' .' + points).eq(_inde).children('div').text(city + ' ' + strcon + ' ' + AxisY[_inde] + '℃');
		$(' .' + city + ' .' + points).eq(_inde).children('div').stop(true).fadeIn(600);
		$(' .' + city + ' .' + points).eq(_inde).stop(true).animate({
			padding: '2px'
		})
	}, function() {
		var _inde = $(this).index()
		$(' .' + city + ' .' + points).eq(_inde).children('div').stop(true).fadeOut(600);
		$(' .' + city + ' .' + points).eq(_inde).stop(true).animate({
			padding: '0px'
		})
	})
}
//绘制线条~
function ligature(city, points, poColor, canvas) {
	$('.' + city).append('<canvas class="canvas" id="' + canvas + '"></canvas>');
	var canvasLine = document.getElementById(canvas);
		canvasLine.width = 700;
		canvasLine.height = 300;
	var context = canvasLine.getContext('2d');
	var points = $('.' + city + ' .' + points);
	for (var i = 0; i < points.length - 1; i++) {
		var poLeft1 = points.eq(i).position().left + points.eq(i).width() / 2;
		var poTop1 = points.eq(i).position().top + points.eq(i).height() / 2;
		var poLeft2 = points.eq(i + 1).position().left + points.eq(i + 1).width() / 2;
		var poTop2 = points.eq(i + 1).position().top + points.eq(i + 1).height() / 2;
		context.beginPath();
		context.moveTo(poLeft1, poTop1);
		context.lineTo(poLeft2, poTop2);
		context.strokeStyle = poColor;
		context.stroke();
	}
}


