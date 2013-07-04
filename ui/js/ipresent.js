
var timeline = Object.create(null);

timeline.dom = $('#timeline');
timeline.seconds = 0;
timeline.now = 0;
timeline.framewidth = 0;
timeline.frames = new Array();
timeline.currentbar = null;
timeline.interval = null;
timeline.timegap = 200;
timeline.stopButton = null;
timeline.playButton = null;
timeline.isrunning = false;
timeline.controlholder = false;

timeline.init = function() {

	this.dom.html('');

	this.now = 1;
	this.seconds = 50;

	this.controlholder = $('#controls');
	this.controlholder.append('<input type="button" onclick="timeline.play()" value="play" id="btn-play" />');
	this.controlholder.append('<input type="button" onclick="timeline.stop()" value="stop" id="btn-stop" />');

	this.stopButton = $('#btn-stop');
	this.playButton = $('#btn-play');

	this.stopButton.attr('disabled', true);

	this.dom.append('<ul></ul>');

	for (var i = 1; i <= this.seconds; i++) {
		var frame = $('<li class="frame" frame="'+i+'"><sup>'+i+'</sup></li>');
		this.dom.find('ul').append(frame);
	}
	this.frames = this.dom.find('li');

	var docwidth = $(document).width();
	this.framewidth = Math.floor(docwidth / this.seconds) - 1;
	this.frames.css('width', this.framewidth);

	this.currentbar = $('<div id="current" frame="'+this.now+'"></div>');
	this.dom.append(this.currentbar);

	this.currentbar.draggable({
		snap: '.frame',
		axis: 'x',
		stop: function(event, ui) {
			var snapped = $(this).data('ui-draggable').snapElements;
			var snappedTo = $.map(snapped, function(element) {
				if (element.snapping) {
					return element.item;
				}
			});
			this.now = $(snappedTo).filter(':last').attr('frame');
		}
	});

	this.frames.click(function(){
		timeline.setNow($(this).attr('frame'));
	});

	$('body').bind('keyup', function(event){
		if (event.keyCode == 32) {
			if (timeline.isrunning) {
				timeline.stop();
			} else {
				timeline.play();
			}
		}
	});
}

timeline.setNow = function(frame) {

	this.now = frame;
	this.currentbar.css('left', $('li[frame="'+frame+'"]').position().left);

}

timeline.play = function() {

	this.isrunning = true;

	this.currentbar.addClass('active');

	this.stopButton.attr('disabled', false);
	this.playButton.attr('disabled', true);

	timeline.nextFrame();
	this.interval = window.setInterval(function(){
		timeline.nextFrame();
	}, this.timegap);

}

timeline.stop = function() {

	this.isrunning = false;

	this.currentbar.stop(true);
	this.currentbar.removeClass('active');

	this.stopButton.attr('disabled', true);
	this.playButton.attr('disabled', false);

	window.clearInterval(this.interval);

}

timeline.nextFrame = function() {

	/*
	this.dom.find('li').each(function(){
		if (parseInt($(this).attr('frame')) <= timeline.now) {
			$(this).addClass('passed');
		}
	});
	*/

	this.currentbar.animate({
		left: '+='+(this.framewidth + 1)+'px'
	}, this.timegap, 'linear');

}

timeline.init();

