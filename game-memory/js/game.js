define(['jquery','bootstrap'],function($,bootstrap){
	return {
		makeTable : function(){
			var gridContainer = $(".grid-container");

			for(var i = 0;i<10;i++){
				for(var j = 0;j<10;j++){
					gridContainer.append("<div class='grid-cell' id='grid-cell-" + i + "-" + j +"'></div>");
				}
			}

			$(".grid-cell").css({"height":$(".grid-cell").width(),"line-height":$(".grid-cell").width() + "px"});
			$(window).resize(function(){
				$(".grid-cell").css({"height":$(".grid-cell").width(),"line-height":$(".grid-cell").width() + "px"});
			});
		},
		makeNumber : function(){
			var randomArray = [],
				randomNum = 0;

			for(var i = 0;i<10;i++){
				randomArray[i] = [];
				for(var j = 0;j<10;j++){
					randomNum = parseInt(Math.random()*101,10);
					randomArray[i].push(randomNum);
					$("#grid-cell-" + i + "-" + j).html(randomNum);
				}
			}

			return randomArray;
		},
		makeTimer : function(){
			var canvas = $("#canvas");
			canvas.css("height",canvas.width()*0.3 + "px");
			var ctx = canvas.get(0).getContext('2d');
		}
	};
});