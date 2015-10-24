requirejs.config({
	urlArgs: "bust=" + (new Date()).getTime(),
	baseUrl: 'js',
	paths: {
		jquery: 'lib/jquery-1.11.3.min',
		bootstrap: 'lib/bootstrap.min',
		game: 'game'
	},
	shim: {
		'jquery': { exports : 'jquery' },
		'bootstrap': { 
			exports : 'bootstrap',
			deps : ['jquery'] 
		},
		'game' : { exports : 'game' }
	}
});

requirejs(['game'],function(game){
	var randomArray = [];
	game.makeTable();
	randomArray = game.makeNumber();
	var drawText = game.makeTimer();
    // 点击开始游戏，计时开始
	$("#start-memory").on("click",function(){
		var memoryTime = $("#memory-time").val();
		drawText = game.makeTimer(memoryTime);
		drawText();
	});
});