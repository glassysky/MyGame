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
	game.maketable();
});