var Ball = {};
Ball.Boot = function(game){};
Ball.Boot.prototype = {
	preload: function(){
		// preload the loading indicator first before anything else
		// this.load.image('preloaderBar', 'img/candy.png');
	},
	create: function(){
		// 设置比例选项
		this.input.maxPointers = 1;
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.scale.setScreenSize(true);
		// 开启preloader状态
		this.state.start('Preloader');
	}
};