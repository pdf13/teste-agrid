'use strict';

$(function(){

	var programType = {0: 'tv', 1: 'show', 2: 'movie'};

	function Program(name, user, startTime, type, imageUrl){
		this.name =  name || '';
		this.user =  user || '';
		this.startTime =  startTime || -1;
		this.type = programType[type] || '';
		this.imageUrl =  imageUrl || '';
		this.dom = $('.card.hide').clone().removeClass('hide');


		this.dom.find('.cover').css('background-image', 'url("'+this.imageUrl+'"")');
		this.dom.find('.title').html(this.name);
		this.dom.find('.info.time span').html(this.startTime);
		this.dom.find('.info.user span').html(this.user);
		this.dom.find('.media-type').attr('src', 'images/' + this.type + '.png');
		this.dom.find('type p').html(this.type);
	}

	function Schedule(){
		this.programs = [];
		this.dom = $('.schedule');
	}

	Schedule.prototype = {
		addProgram :  function(){},
		removeProgram : function(){},
		initializeSchedule :  function(){
			var schedule = this;
			$.getJSON( '/scripts/data.json')
			.done(function(data) {
				$.each(data, function(ind, obj){
					var program = new Program(obj.name, obj.user, obj.startTime, obj.type,  obj.imageUrl);

					schedule.programs.push(program);
					schedule.dom.append(program.dom);
				});
			})
			.fail(function(jqxhr, textStatus, error) {
				console.log('Erro na requisição dos dados iniciais:');
				console.error(error);
			});
		}
	};

	var mainSchedule = new Schedule();
	mainSchedule.initializeSchedule();
});
