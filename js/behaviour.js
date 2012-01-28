$(document).ready(function() {
	
	var down = 'click',
	sounds = new Array ($("#sound1")[0], $("#sound2")[0]),
	currentSound = sounds[0],
	$startButton = $("#start-stop"),
	$themeSwitcher = $("#sound-theme-switcher"),
	$theme = $("#sound-theme"),
	$kugel = $("#kugel"),
	$body = $("body"),
	$note = $(".note");
	
	var renderInterval;
	var animate = false;
	
	
	function initApp() {
	
		if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i))) { 
			down = 'touchstart';
			$(document).bind('touchmove', function(event) { event.preventDefault() });
		}
		
		$startButton.bind(down, function() {
			toggle();
		});
		
		$themeSwitcher.bind('change', function() {
			stop();
			swapSound ($themeSwitcher.val());
		});
		
	}
	
	function swapSound(newSound) {
		var newClass;
		currentSound = sounds[newSound];
		
		switch(newSound) {
			case "0":
				newClass = "birds";
				break;
			case "1":
				newClass = "waves";
				break;
		}
		$theme.removeClass().addClass(newClass);
	}
	
	
	function toggle () {
		if ($body.hasClass('stopped')) {
			play();
		} else {
			stop();
		}
	}
	
	function play () {
		currentSound.play();
		$startButton.html('Stop');
		$body.removeClass('stopped');
		animate = true;
		render();
	}
	
	function stop () {
		currentSound.pause();
		$startButton.html('Start');
		$body.addClass('stopped');
		animate = false;
	}

	
	function render () {
		var timeShift = Math.random();
		$note.css({'-webkit-transition': 'all 0.0s', top: ($kugel.offset().top + 50 + Math.random()*30), left: ($kugel.offset().left + Math.random()*300),  opacity: 1 });
		window.setTimeout(function(){
			$note.css({'-webkit-transition': 'all '+(timeShift*1.0+1.0)+'s ease-out', top: ($note.offset().top - 20 - Math.random()*60), left: $note.offset().left + Math.random()*20, opacity: 0 });		
		}, 1);
		if (animate)
			window.setTimeout(render, timeShift*1000 + 1000);
	}
	
	
	initApp();
	
});
