;
window.onload = function() {
	//获取标签元素的方法
	function $(idName) {
		return document.getElementById(idName);

	}
	//获取样式使用最终值得函数
	function getStyle(ele, attr) {
		var res = null;
		if (ele.currentStyle) {
			res = ele.currentStyle[attr];
		} else {
			res = window.getComputedStyle(ele, null)[attr];
		}
		return parseFloat(res);
	}
	//获取需要使用到的标签元素
	var game = $("game"),
		//游戏开始的界面
		gameStart = $("gameStart"),
		easy = $("easy"),
		diffcult = $("diffcult"),
		//进入游戏的界面
		gameEnter = $("gameEnter"),
		myPlane = $("myPlane"),
		bulletsP = $("bullets"),
		enemysP = $("enemys"),
		s = $("scores").firstElementChild.firstElementChild;
	//获取需要使用到的元素样式
	//1.获取游戏界面的宽、高
	var gameW = getStyle(game, "width"),
		gameH = getStyle(game, "height");
	//2.游戏界面的左上外边距
	var gameML = getStyle(game, "marginLeft"),
		gameMT = getStyle(game, "marginTop");
	//3.获取己方飞机的宽、高
	var myPlaneW = getStyle(myPlane, "width"),
		myPlaneH = getStyle(myPlane, "height");
	//4.子弹的宽高
	var bulletW = 6,
		bulletH = 14;
	//声明需要使用到的全局变量
	var gameStatus = false, //当前的游戏状态
		a = null, //创建子弹的定时器
		b = null, //创建敌机的计时器
		c = null, //背景图的计时器
		backgroundPY = 0, //背景y轴的值 
		bullets = [], //所有子弹的集合 
		enemys = [], //所有敌机的集合
		scores = 0;//开始的得分为0

	//开始游戏
	//简单
	gameStart.firstElementChild.onclick = function() {
		gameStart.style.display = "none";
		gameEnter.style.display = "block";
		//给当前的文档添加键盘事件
		document.onkeyup = function(evt) {
			var e = evt || window.event;
			//获取到键盘的键值
			var keyVal = e.keyCode;
			if (keyVal == 32) {
				if (!gameStatus) {
					//初始化得分
					scores = 0;
					//游戏开始
					this.onmousemove = myPlaneMove;
					//实现游戏开始之后的背景图的运动
					bgMove(15);
					//实现射击
					shot(250);
					//敌机出现
					appearEnemy(1500);
					//暂停游戏之后的 重新开始
					//子弹的继续运动
					if (bullets.length != 0)
						reStart(bullets, 1);
					//飞机的继续运动
					if (enemys.length != 0)
						reStart(enemys);
				} else {
					//游戏暂停
					this.onmousemove = null;
					//清除创建敌机和创建子弹的定时器
					clearInterval(a);
					clearInterval(b);
					//清除背景图的定时器
					clearInterval(c)
					a = null;
					b = null;
					c = null;
					//清除所有子弹和所有的敌机上的运动的定时器
					clear(bullets);
					clear(enemys);
				}
				gameStatus = !gameStatus;
			}
		}



	}
	//一般
	easy.onclick = function() {
		gameStart.style.display = "none";
		gameEnter.style.display = "block";
		//给当前的文档添加键盘事件
		document.onkeyup = function(evt) {
			var e = evt || window.event;
			//获取到键盘的键值
			var keyVal = e.keyCode;
			if (keyVal == 32) {
				if (!gameStatus) {
					//初始化得分
					scores = 0;
					//游戏开始
					this.onmousemove = myPlaneMove;
					//实现游戏开始之后的背景图的运动
					bgMove(10);
					//实现射击
					shot(150);
					//敌机出现
					appearEnemy(1000);
					//暂停游戏之后的 重新开始
					//子弹的继续运动
					if (bullets.length != 0)
						reStart(bullets, 1);
					//飞机的继续运动
					if (enemys.length != 0)
						reStart(enemys);
				} else {
					//游戏暂停
					this.onmousemove = null;
					//清除创建敌机和创建子弹的定时器
					clearInterval(a);
					clearInterval(b);
					//清除背景图的定时器
					clearInterval(c)
					a = null;
					b = null;
					c = null;
					//清除所有子弹和所有的敌机上的运动的定时器
					clear(bullets);
					clear(enemys);
				}
				gameStatus = !gameStatus;
			}
		}
	}
	//困难
	diffcult.onclick = function() {
		gameStart.style.display = "none";
		gameEnter.style.display = "block";
		//给当前的文档添加键盘事件
		document.onkeyup = function(evt) {
			var e = evt || window.event;
			//获取到键盘的键值
			var keyVal = e.keyCode;
			if (keyVal == 32) {
				if (!gameStatus) {
					//初始化得分
					scores = 0;
					//游戏开始
					this.onmousemove = myPlaneMove;
					//实现游戏开始之后的背景图的运动
					bgMove(5);
					//实现射击
					shot(90);
					//敌机出现
					appearEnemy(400);
					//暂停游戏之后的 重新开始
					//子弹的继续运动
					if (bullets.length != 0)
						reStart(bullets, 1);
					//飞机的继续运动
					if (enemys.length != 0)
						reStart(enemys);
				} else {
					//游戏暂停
					this.onmousemove = null;
					//清除创建敌机和创建子弹的定时器
					clearInterval(a);
					clearInterval(b);
					//清除背景图的定时器
					clearInterval(c)
					a = null;
					b = null;
					c = null;
					//清除所有子弹和所有的敌机上的运动的定时器
					clear(bullets);
					clear(enemys);
				}
				gameStatus = !gameStatus;
			}
		}
	
	
	
	}

	function myPlaneMove(evt) { 
		var e = evt || window.event;
		//获取鼠标移动的位置
		var mouse_x = e.x || e.pageX,
			mouse_y = e.y || e.pageY;
		//计算得到鼠标移动时己方飞机的左上边距
		var last_myPlane_left = mouse_x - gameML - myPlaneW / 2,

			last_myPlane_top = mouse_y - gameMT - myPlaneH / 2;
		//alert(myPlaneH);

		//控制飞机不能脱离游戏界面
		if (last_myPlane_left <= 0) {
			last_myPlane_left = 0;
		} else if (last_myPlane_left >= gameW - myPlaneW) {
			last_myPlane_left = gameW - myPlaneW;
		}
		if (last_myPlane_top <= 0) {
			last_myPlane_top = 0;
		} else if (last_myPlane_top >= gameH - myPlaneH) {
			last_myPlane_top = gameH - myPlaneH;
		}
		myPlane.style.left = last_myPlane_left + "px";
		myPlane.style.top = last_myPlane_top + "px";
	}
	//单位时间内创建子弹
	function shot(sudu) {
		this.sudu = sudu;
		if (a)
			return;
		a = setInterval(function() {
			//创建子弹
			createBullet();
		}, sudu);
	}
	//制造子弹
	function createBullet() {
		var bullet = new Image(bulletW, bulletH);
		bullet.src = "image/bullet1.png";
		bullet.className = "b";

		//创建每一颗子弹都需要确定己方飞机的位置
		var myplaneL = getStyle(myPlane, "left"),
			myplaneT = getStyle(myPlane, "top");
		//确定创建子弹的位置
		var bulletL = myplaneL + myPlaneW / 2 - bulletW / 2,
			bulletT = myplaneT - bulletH;
		bullet.style.left = bulletL + "px";
		bullet.style.top = bulletT + "px";
		bulletsP.appendChild(bullet);

		bullets.push(bullet);
		move(bullet, "top");
	}

	//子弹的运动 ：运动函数（匀速运动）
	function move(ele, attr) {
		var speed = -8;
		ele.timer = setInterval(function() {
			var moveVal = getStyle(ele, attr);
			//子弹运动出游戏界面，清除子弹的定时器，删除子弹元素
			if (moveVal <= -bulletH) {
				clearInterval(ele.timer);
				ele.parentNode.removeChild(ele);
				//bullets.unshift();
				bullets.splice(0,1);
			} else {
				ele.style[attr] = moveVal + speed + "px";
			}
		}, 50)
	}
	//创建敌机数据对象
	var enemysObj = {
		enemy1: {
			width: 34,
			height: 24,
			score: 10,
			hp: 100
		},
		enemy2: {
			width: 46,
			height: 60,
			score: 50,
			hp: 800
		},
		enemy3: {
			width: 110,
			height: 164,
			score: 100,
			hp: 2000
		},
	}
	//创建敌机的定时器
	function appearEnemy(sudu) {
		this.sudu = sudu;
		if (b)
			return;
		b = setInterval(function() {
			//制造敌机
			createEnemy();
			//删除敌机
			delEnemy();
		}, sudu);
	}
	//制造敌机的函数

	function createEnemy() {
		//敌机出现概率
		var percentData = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3];
		//敌机的类型
		var enemyType = percentData[Math.floor(Math.random() * percentData.length)];
		//得到当前随机产生敌机的数据
		var enemyData = enemysObj["enemy" + enemyType];
		//创建敌机所在的元素
		var enemy = new Image(enemyData.width, enemyData.height);
		enemy.src = "image/enemy" + enemyType + ".png";
		enemy.t = enemyType;
		enemy.score = enemyData.score;
		enemy.hp = enemyData.hp;
		enemy.className = "e";
		enemy.dead = false;
		//确定敌机出现的位置
		var enemyL = Math.floor(Math.random() * (gameW - enemyData.width + 1)),
			enemyT = -enemyData.height;

		enemy.style.left = enemyL + "px";
		enemy.style.top = enemyT + "px";
		enemysP.appendChild(enemy);

		enemys.push(enemy);
		enemyMove(enemy, "top");
	}
	//敌机的运动
	function enemyMove(ele, attr) {
		var speed = null;
		if (ele.t == 1) {
			speed = 1.5;
		} else if (ele.t == 2) {
			speed = 1;
		} else if (ele.t == 3) {
			speed = 0.5;
		}

		ele.timer = setInterval(function() {	
			var moveVal = getStyle(ele, attr);
			if (moveVal >= gameH) {
				clearInterval(ele.timer);
				enemysP.removeChild(ele);
				enemys.splice(0,1);
				//enemys.unshift();
			} else {
				ele.style[attr] = moveVal + speed + "px";
				//每一架飞机运动时，检测和每一颗子弹的碰撞
				danger(ele);
				//检测碰撞
				gameOver();
			}
		}, 10);
	}
	//清除所有敌机和所有与子弹上得运动定时器
	function clear(childs) {
		for (var i = 0; i < childs.length; i++) {
			clearInterval(childs[i].timer);
		}
	}
	//暂停游戏之后的继续游戏
	function reStart(childs, type) {
		for (var i = 0; i < childs.length; i++) {
			type == 1 ? move(childs[i], "top") : enemyMove(childs[i], "top");
		}
	}
	//开始游戏
	function bgMove(sudu) {
		this.sudu = sudu;
		c = setInterval(function() {
			backgroundPY += 0.4;
			if (backgroundPY >= gameH) {
				backgroundPY = 0;
			}
			gameEnter.style.backgroundPositionY = backgroundPY + "px";
		}, sudu);
	}
	//检测子弹和敌机的碰撞
	function danger(enemy) {
		for (var i = 0; i < bullets.length; i++) {
			//得到子弹的左上边距
			var bulletL = getStyle(bullets[i], "left"),
				bulletT = getStyle(bullets[i], "top");
			//得到敌机的左上边距
			var enemyL = getStyle(enemy, "left"),
				enemyT = getStyle(enemy, "top");
			//得到敌机的宽高
			var enemyW = getStyle(enemy, "width"),
				enemyH = getStyle(enemy, "height");
			//alert( enemyH);
			var condition = bulletL + bulletW >= enemyL && bulletL <= enemyL + enemyW && bulletT <= enemyT + enemyH && bulletT +
				bulletH >= enemyT;
			if (condition) {
				//子弹和飞机的碰撞，删除子弹
				//1、先清除碰撞子弹的定时器
				//console.lon("sgsg");
				clearInterval(bullets[i].timer);
				//2、删除元素
				bulletsP.removeChild(bullets[i]);
				//3、从集合中删除子弹 
				bullets.splice(i, 1);
				//4、子弹和敌机发生碰撞后，敌机血量减少，血量为0时，删除敌机
				enemy.hp -= 100;
				if (enemy.hp == 0) {
					//删除敌机
					clearInterval(enemy.timer);
					//删除敌机元素
					enemy.src = "image/bz" + enemy.t + ".gif";
					//标记死亡敌机
					enemy.dead = true;
					//计算得分
					scores  += enemy.score;
					s.innerHTML = scores;
				}
			}
		}
	}
	//删除掉集合和文档中的死亡敌机
	function delEnemy() {
		for (var i = enemys.length - 1; i >= 0; i--) {
			if (enemys[i].dead) {
				(function(index) {
					//从文档中删除死亡敌机元素
					enemysP.removeChild(enemys[index]);
					//从集合中删除死亡敌机元素
					enemys.splice(index, 1);
				})(i)
			}
		}
	}
	//飞机碰撞,游戏结束
	function gameOver(){
		for(var i=0;i<enemys.length;i++){
			if(!enemys[i].dead){//游戏中现在存活的飞机
				//检测碰撞
				//1.获取敌机的左上边距
				var enemyL = getStyle(enemys[i],"left"),
				enemyT = getStyle(enemys[i],"top");
				//2.获取敌机的宽高
				var enemyW = getStyle(enemys[i],"width"),
				enemyH = getStyle(enemys[i],"height");
				//3.获取己方飞机的左上边距
				var myplaneL = getStyle(myPlane,"left"),
				myplaneT = getStyle(myPlane, "top");
				
				var condition = myplaneL + myPlaneW >= enemyL && myplaneL <= enemyL + enemyW && myplaneT <= enemyT + enemyH && myplaneT + myPlaneH >= enemyT;
				if(condition){//己方飞机和敌机的碰撞
					clearInterval(a);
					clearInterval(b);
					clearInterval(c);
					a = null;
					b = null;
					c = null;
					//删除子弹和敌机元素
					remove(bullets);
					remove(enemys);
					//清空集合
					bullets = [];
					enemys = [];
					//清除己方飞机的移动事件
					document.onmousemove = null;
					//提示得分
					alert("Game Over:"+ scores+"分");
					
					//回到游戏开始界面
					gameStart.style.display = "block";
					gameEnter.style.display = "none";
					myPlane.style.left = "147px";
					myPlane.style.top = gameH - myPlaneH+"px"; 
					scores  = 0;
					s.innerHTML = scores;
					//alert(myPlane.style.left,myPlane.style.bottom);
 				}
			}
		}
	}
	//删除元素
	function remove(childs){
		for(var i=childs.length - 1;i>=0;i--){
			clearInterval(childs[i].timer);
			childs[i].parentNode.removeChild(childs[i]);
		}
	}
}
