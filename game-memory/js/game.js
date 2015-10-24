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
		makeTimer : function(minute,bool){
			var canvas = document.getElementById("canvas");
			var ctx = canvas.getContext('2d');
			var second = 0;
			var txt = "";

			canvas.height = canvas.width*0.3;

			function addZero(num) {
				if(num < 10){
					return "0" + num;
				} else {
					return num;
				}
			}

			function drawText(){
				setTimeout(function(){
					
					setTimeout(drawText);
				},1000);
				ctx.fillStyle = "red";
				ctx.strokeStyle = "cornflowerblue";
				ctx.fillText(txt, canvas.width/2, canvas.height/2);
				ctx.strokeText(txt, canvas.width/2, canvas.height/2);
			}

			txt = addZero(minute) + ":" + addZero(second);
			ctx.font = "400% Helvetica";
			ctx.textBaseline = "middle";
			ctx.textAlign = "center";

			return drawText;
		}
	};
});