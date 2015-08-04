Ball.MainMenu = function(game){};
Ball.MainMenu.prototype = {
	create: function(){
		// 显示图片
		this.add.sprite(0, 0, 'background');
		this.add.sprite(0, Ball.GAME_HEIGHT-514, 'monster-cover');
		this.add.sprite((Ball.GAME_WIDTH-395)/2, 60, 'title');
		// 增加开始按钮
		this.add.button(Ball.GAME_WIDTH-401-10, Ball.GAME_HEIGHT-143-10, 'button-start', this.startGame, this, 1, 0, 2);
	},
	startGame: function() {
		// 开启游戏状态
		this.state.start('Game');
	}
};