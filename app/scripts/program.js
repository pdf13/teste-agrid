'use strict';

function Program(name, user, startTime, type, imageUrl){
	this.name =  name || '';
	this.user =  user || '';
	this.startTime =  startTime || -1;
	this.type = type || '';
	this.imageUrl =  imageUrl || '';
	this.dom = $('.card.hide').clone().removeClass('hide');

	function initialize(program){
		initializeDOM(program);
		setTriggers(program);
	}

	function initializeDOM(program){
		program.dom.find('.cover').css('background-image', 'url("'+program.imageUrl+'")');
		program.dom.find('.title').html(program.name);

		if(program.startTime === -1){
			program.dom.find('.info.time').remove();
		}else{
			program.dom.find('.info.time span').html(program.startTime + ':00h');
		}

		program.dom.find('.info.user span').html(program.user);
		program.dom.find('.media-type').attr('src', 'images/' + program.type + '.png');
		program.dom.find('.type p').html(program.type);
	}

	function setTriggers(program){
		program.dom.on('click', function(){
			$('.card.selected')
				.removeClass('selected')
				.find('paper-shadow')
				.attr('z', 1);
			program.dom
				.toggleClass('selected')
				.find('paper-shadow')
				.attr('z', 3);
			program.changeCardView(program);
		});
	}

	initialize(this);
}

Program.prototype = {
	changeCardView: function(){
		var cardView = $('.card-view');
		cardView.find('.cover').css('background-image', 'url("'+this.imageUrl+'")');
		cardView.find('.title').html(this.name);

		if(this.startTime === -1){
			cardView.find('.info.time').addClass('hide');
		}else{
			cardView.find('.info.time')
				.removeClass('hide')
				.find('span')
				.html(this.startTime + ':00h');
		}

		cardView.find('.info.user span').html(this.user);
		cardView.find('.media-type').attr('src', 'images/' + this.type + '.png');
		cardView.find('.type p').html(this.type);
	}
};
