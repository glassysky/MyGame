requirejs.config({
	urlArgs: "bust=" + (new Date()).getTime(),
	baseUrl: 'js',
	paths: {
		jquery: 'lib/jquery-1.11.3.min',
		bootstrap: 'lib/bootstrap.min',
		maketable: 'maketable'
	},
	shim: {
		'jquery': { exports : 'jquery' },
		'bootstrap': { 
			exports : 'bootstrap',
			deps : ['jquery'] 
		},
		'maketable' : { exports : 'maketable' }
	}
});

requirejs(['maketable'],function(maketable){
	maketable.test();
});