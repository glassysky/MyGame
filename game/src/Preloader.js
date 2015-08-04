Ball.Preloader = function(game){
	// 定义宽高
	Ball.GAME_WIDTH = 640;
	Ball.GAME_HEIGHT = 960;
};
Ball.Preloader.prototype = {
	preload: function(){
		// 设置背景颜色和预加载图片
		this.stage.backgroundColor = '#B4D9E7';
		this.preloadBar = this.add.sprite((Ball.GAME_WIDTH-311)/2, (Ball.GAME_HEIGHT-27)/2, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);
		// load images
		this.load.image('background', 'img/background.png');
		this.load.image('floor', 'img/floor.png');
		this.load.image('monster-cover', 'img/monster-cover.png');
		this.load.image('title', 'img/title.png');
		this.load.image('game-over', 'img/gameover.png');
		this.load.image('score-bg', 'img/score-bg.png');
		this.load.image('button-pause', 'img/button-pause.png');
		// 加载像素图
		this.load.spritesheet('ball', 'img/ball.png', 82, 98);
		this.load.spritesheet('monster-idle', 'img/monster-idle.png', 103, 131);
		this.load.spritesheet('button-start', 'img/button-start.png', 401, 143);
	},
	create: function(){
		// 开启MainMenu状态
		this.state.start('MainMenu');
	}
};