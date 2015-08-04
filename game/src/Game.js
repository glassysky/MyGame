Ball.Game = function(game){
	// define needed variables for Candy.Game
	this._player = null;//人物
	this._ballGroup = null;//精灵球组
	this._platforms = null;//背景组
	this._spawnBallTimer = 0;//产生精灵球的时间
	this._fontStyle = null;//字体
	// define Candy variables to reuse them in Candy.item functions
	Ball._scoreText = null;//得分板内容
	Ball._score = 0;//得分
	Ball._health = 0;//血条
};
Ball.Game.prototype = {
	create: function(){
		// 启动物理引擎
		this.physics.startSystem(Phaser.Physics.ARCADE);
		// 设置全局重力
		this.physics.arcade.gravity.y = 200;
		// 加载背景，地板和得分板
		this.add.sprite(0, 0, 'background');
		// this.add.sprite(-30, Ball.GAME_HEIGHT-160, 'floor');
		this.add.sprite(10, 5, 'score-bg');
		//初始平台组
		this._platforms = this.add.group();
		this._platforms.enableBody = true;
		var ground = this._platforms.create(-30, Ball.GAME_HEIGHT-85, 'floor');
		ground.body.collideWorldBounds = true;
		// 增加暂停按钮，调用暂停函数
		this.add.button(Ball.GAME_WIDTH-96-10, 5, 'button-pause', this.managePause, this);
		// 创建人物
		this._player = this.add.sprite(5, 740, 'monster-idle');
		// 给人物添加物理引擎
	    this.physics.arcade.enable(this._player);
	    this._player.body.collideWorldBounds = true;
		// 增添人物动作图片
		this._player.animations.add('left', [0,1,2,3], 10, true);
		this._player.animations.add('right', [5,6,7,8], 10, true);
		// 拖动人物
		this._player.inputEnabled = true;
		this._player.input.enableDrag(false, true);
		this._player.input.allowVerticalDrag = false;
		// 初始化按键
		cursors = this.input.keyboard.createCursorKeys();
		// 启动动作
		// this._player.animations.play('idle');
		// 设置字体
		this._fontStyle = { font: "40px Arial", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" };
		// 初始化精灵球产生时间
		this._spawnBallTimer = 0;
		// 初始化得分板文字为0，及位置
		Ball._scoreText = this.add.text(120, 20, "0", this._fontStyle);
		// 设置初始血量
		Ball._health = 100;
		// new一个精灵球组
		this._ballGroup = this.add.group();
		this._ballGroup.enableBody = true;
		// 产生第一个精灵球
		Ball.item.spawnBall(this);
	},
	managePause: function(){
		// 暂停游戏
		this.game.paused = true;
		// 提示暂停信息，设置位置
		var pausedText = this.add.text(100, 250, "Game paused.\nTap anywhere to continue.", this._fontStyle);
		// 点击屏幕任一点，游戏继续
		this.input.onDown.add(function(){
			// 移除暂停文字
			pausedText.destroy();
			// 解除暂停
			this.game.paused = false;
		}, this);
	},
	update: function(){
		this.physics.arcade.collide(this._player, this._platforms);
		this._player.body.velocity.x = 0;
		if (cursors.left.isDown){
			this._player.body.velocity.x = -400;
			this._player.animations.play('left');
		} else if (cursors.right.isDown) {
			this._player.body.velocity.x = 400;
			this._player.animations.play('right');
		} else {
			this._player.animations.stop();
			this._player.frame = 4;
		}
		// 更新计时器
		this._spawnBallTimer += this.time.elapsed;
		// 产生间隔大于1000毫秒
		if(this._spawnBallTimer > 1000) {
			// 重置
			this._spawnBallTimer = 0;
			// 产生新精灵球
			Ball.item.spawnBall(this);
		}
		// 循环屏幕中所有精灵球
		this._ballGroup.forEach(function(ball){
			// 旋转
			ball.angle += ball.rotateMe;
		});
		// 血量检测
		if(!Ball._health) {
			// 显示gameover
			this.add.sprite((Ball.GAME_WIDTH-594)/2, (Ball.GAME_HEIGHT-271)/2, 'game-over');
			// 并且暂停游戏
			this.game.paused = true;
		}
		this.physics.arcade.overlap(this._player, this._ballGroup, this.collectBall, null, this);
	},
	collectBall: function(player,ball){
		console.log(1);
		// kill精灵球
		ball.kill();
		// 加分
		Ball._score += 1;
		// 更新得分板
		Ball._scoreText.setText(Ball._score);
	}
};

Ball.item = {
	spawnBall: function(game){
		// 随机丢精灵球的位置
		var dropPos = Math.floor(Math.random()*Ball.GAME_WIDTH);
		// define the offset for every candy
		var dropOffset = [-27,-36,-36,-38,-48];
		// 随机精灵球类型
		var ballType = Math.floor(Math.random()*5);
		// 生成精灵球
		var ball = game.add.sprite(dropPos, dropOffset[ballType], 'ball');
		// 新增动作
		ball.animations.add('anim', [ballType], 60, true);
		// 动起来
		ball.animations.play('anim');
		// 给精灵球开启物理引擎
		game.physics.enable(ball, Phaser.Physics.ARCADE);
		// 让精灵球可点击
		// ball.inputEnabled = true;
		// 精灵球出屏幕会触发一个事件
		ball.checkWorldBounds = true;
		// 出屏幕时重置精灵球
		ball.events.onOutOfBounds.add(this.removeBall, this);
		// set the anchor (for rotation, position etc) to the middle of the candy
		ball.anchor.setTo(0.5, 0.5);
		// 设置随机旋转值
		ball.rotateMe = (Math.random()*4)-2;  
		// 增添精灵球到组里
		game._ballGroup.add(ball);
	},
	removeBall: function(ball){
		// kill精灵球
		ball.kill();
		// 掉血
		Ball._health -= 10;
	}
};
