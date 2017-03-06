var movementRate = 1;
var shrinkRate = 0.05;
function moveit(id) {
	var fish = $(id)[0];

	var newTop = fish.style.top;
	var newLeft = fish.style.left;
	var newSize = fish.style.width;
	if(fish.style.top == ""){
		newTop = Math.floor(Math.random()*$(window).height()) + "px";
		newLeft = Math.floor(Math.random()*$(window).width()) + "px";
		newSize = "10%";
	}
	
	var direction1 = fish.className.split(" ")[1];
	var direction2 = fish.className.split(" ")[2];
	var shrinkage = fish.className.split(" ")[3];
	
	if( Math.random() < 0.05) {
		direction1 = Math.floor(Math.random()*3 - 0.0001) -1;
		direction2 = Math.floor(Math.random()*3 - 0.0001) -1;
		shrinkage = Math.floor(Math.random()*3 - 0.0001) -1;
		fish.className = "fish " + direction1 + " " + direction2 + " " + shrinkage;
		
		if(direction2 == 1 && !fish.src.includes("fliped")){
			fish.src = fish.src.split(".png")[0] + "_fliped.png";
		} else if ( fish.src.includes("fliped")) {
			fish.src = fish.src.split("_fliped.png")[0] + ".png";
		}
	}
	
	newTop = newTop.replace("px" , "")*movementRate + direction1*1;
	newLeft = newLeft.replace("px" , "")*movementRate + direction2*1;
	newSize = (newSize.replace("%" , "")*1 + shrinkage*shrinkRate*1);
	
	if(newTop < 30 ) newTop = 30;
	if(newTop > $(window).height() -100 ) newTop = $(window).height() -100;
	if(newLeft < 30 ) newLeft = 30;
	if(newLeft > $(window).width() -230 ) newLeft = $(window).width() -230;
	if(newSize > 30) newSize = 30;
	if(newSize < 2) newSize = 2;
	newSize += "%";
	
	$(id).animate({
		top: newTop,
		left: newLeft,
		width: newSize,
	}, 50, function() {
			moveit(id);
	});
}

$(document).ready(function() {
		var fishes = $('.fish');
		for(var j = 0; j< fishes.length; j++){
			var id = "#" + fishes[j].id;
			moveit(id);
		}
	
});