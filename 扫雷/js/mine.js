var wrap = document.getElementById('wrap');
var btn = document.getElementById('btn');
var map = document.getElementById('map');
var mapMask = document.getElementById('mapMask');
var mapWidth = 500;
var levelNum = 1,
	levelArr = [10, 15, 20];
var mineNum = 20;
var num = 0;
game();
btn.onclick = function() {
	game();
}
function game() {
	maskCreat();
	map.innerHTML = '';
	// rowNum:长宽
	var rowNum = levelArr[levelNum];
	var mapLen = rowNum * rowNum;
	for (var i = 0; i < mapLen; i++) {
		map.innerHTML += '<div></div>'
	}
	var boxes = map.getElementsByTagName('div');
	for(var i = 0; i < mapLen; i++) {
		boxes[i].style.width = mapWidth / rowNum - 2 + 'px';
		boxes[i].style.height = mapWidth / rowNum - 2 + 'px';
		boxes[i].style.lineHeight = mapWidth / rowNum - 2 + 'px';
		boxes[i].style.fontSize = mapWidth / rowNum /2 - 2 + 'px';
	}
	// 随机生成雷
	var arr = [];
	var judgearr = [];
	function creatMine() {
		var temp = [];
		var len = 0;
		var num = 0;
		while(len < mineNum) {
			num = Math.floor(Math.random() * mapLen);
			if(!temp[num]) {
				temp[num] = 1;
				// boxes[num].style.background = 'red';
				// boxes[num].innerHTML = '雷';
				boxes[num].innerHTML = '<img src="../images/mine.png" alt="" />';
				arr.push(boxes[num]);
				judgearr.push(num);
				len++;
			}
		}
		// for(var i = 0; i < judgearr.length; i++) {
		// 	//上
		// 	if(judgearr[i]+1 > rowNum) {
		// 		boxes[judgearr[i] - rowNum].innerText += '1';
		// 	}
		// 	// 下
		// 	if(judgearr[i]+1 < mapLen - rowNum) {
		// 		boxes[judgearr[i] + rowNum].innerText += '1';
		// 	}
		// 	// 左
		// 	if((judgearr[i]+1) % rowNum != 1) {
		// 		boxes[judgearr[i]-1].innerText += '1';
		// 	} 
		// 	// 右
		// 	if((judgearr[i]+1) % rowNum != 0) {
		// 		boxes[judgearr[i]+1].innerText += '1';
		// 	}
		// 	//左上
		// 	// if((judgearr[i]+1 - rowNum) % rowNum != 1) {
		// 	// 	boxes[judgearr[i] - rowNum - 1].innerText += '1';
		// 	// }

		// 	// if(boxes[num].innerHTML == '1') {
		// 	// 	boxes[num].innerHTML = '<img src="../images/mine.png" alt="" />';
		// 	// }
		// }
		return arr;
	} creatMine();
	
	// console.log(arr);

	// 蒙版生成
	function maskCreat() {
		mapMask.innerHTML = '';
		var rowNum = levelArr[levelNum];
		var maskLen = rowNum * rowNum;
		for (var i = 0; i < maskLen; i++) {
			mapMask.innerHTML += '<div class="r-btn"></div>'
		}
		var masks = mapMask.getElementsByTagName('div');
		for(var i = 0; i < maskLen; i++) {
			masks[i].style.width = mapWidth / rowNum - 2 + 'px';
			masks[i].style.height = mapWidth / rowNum - 2 + 'px';
		}
		
		// 点击蒙版消失
		var m = 0;
		for(var i = 0; i < maskLen; i++) {
			masks[i].index = i;
			masks[i].onclick = function() {
				if(masks[this.index].className != 'rrr') {
					masks[this.index].style.visibility = 'hidden';
					m++;
				}
				num = this.index;
				var b = 0;
				if (m >= mapLen - mineNum) {
					alert('you win!!!');
					game();
				}
				// function fn() {
				// 	if(boxes[num + m].innerHTML == '') {
				// 		masks[num + m].style.visibility = 'hidden';
				// 		masks[num - 1 + m].style.visibility = 'hidden';
				// 		masks[num + 1 + m].style.visibility = 'hidden';
				// 		masks[num - rowNum + m].style.visibility = 'hidden';
				// 		masks[num + rowNum + m].style.visibility = 'hidden';
				// 		m++;
				// 		fn();
				// 	}
				// }
				// fn();

				// 点中雷爆炸***********************
				for(var i = 0; i < arr.length; i++) {
					if(arr[i] == boxes[num]) {
						if(masks[this.index].className != 'rrr') {
							boxes[this.index].innerHTML = '<img src="../images/boom.png" alt="" />';
							mapMask.innerHTML = null;
							alert('you has been boom!!!');
							// map.innerHTML = '<h2>you has been boom!!!</h2>';
						}
					}
					if(masks[this.index].className != 'rrr') {
						if (boxes[num - 1] != arr[i]) {
							if (boxes[num + 1] != arr[i]) {
								if (boxes[num - rowNum] != arr[i]) {
									if (boxes[num + rowNum] != arr[i]) {
										if (boxes[num + rowNum + 1] != arr[i]) {
											if (boxes[num + rowNum - 1] != arr[i]) {
												if (boxes[num - rowNum + 1] != arr[i]) {
													if (boxes[num - rowNum - 1] != arr[i]) {
														if (b == 0) {
															b = ""
														}
														boxes[num].innerHTML = b;
													}
													else {
														b++;
														// boxes[num].innerHTML = 'lll';
													}
												}else {b++;}
											}else {b++;}
										}else {b++;}
									}else {b++;}
								}else {b++;}
							}else {b++;}
						}else {b++;}
					}
				}
				//**********************************
				return num;
			}
			masks[i].oncontextmenu = function() {
				if(masks[this.index].className == 'r-btn') {
					masks[this.index].className = 'rrr';
				} else if(masks[this.index].className == 'rrr') {
					masks[this.index].className = 'r-btn';
				}
			}
		}
	}
}
window.onload = function() {
	var uId = document.getElementById('uId');
	document.oncontextmenu = function(e) {
		return false;
	}
	document.onclick = function() {
		uId.style.display = 'none';
	}
	var music = document.getElementById('music'),
		mp3btn = document.getElementById('mp3btn');
	mp3btn.onclick = function() {
		if(music.style.display == 'block') {
			music.style.display = 'none';
		} else {
			music.style.display = 'block';
		}
	}
}