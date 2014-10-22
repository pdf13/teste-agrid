'use strict';

function sortByStartTime(a, b){
	return ((a.startTime < b.startTime) ? -1 : ((a.startTime > b.startTime) ? 1 : 0));
}

function Schedule(){
	this.programs = [];
	this.dom = $('.schedule');
}

Schedule.prototype = {
	addProgram :  function(name, user, startTime, type, imageUrl){
		var schedule = this;
		var program = new Program(name, user, startTime, type, imageUrl);

		if(!startTime){
			schedule.dom.append(program.dom);
			schedule.programs.push(program);
			return;
		}

		$.each(schedule.programs, function(ind, obj){
			if(obj.startTime >= program.startTime){
				schedule.programs.splice(ind, 0, program);
				program.dom.insertBefore(schedule.dom.find('.card').eq(ind));
				program = null;
				return false;
			}
		});

		if(program){
			schedule.dom.append(program.dom);
			schedule.programs.push(program);
		}
	},
	sortPrograms: function(data){
		var now = (new Date()).getHours();
		var greaterThen = [], lessThenEqual = [];
		$.each(data, function(){
			if(this.startTime > now){
				greaterThen.push(this);
				return true;
			}
			lessThenEqual.push(this);
		});

		greaterThen.sort(sortByStartTime);
		lessThenEqual.sort(sortByStartTime);

		return $.merge(greaterThen, lessThenEqual);
	},
	initializeSchedule :  function(){
		var schedule = this;
		$.getJSON( '/scripts/data.json')
		.done(function(data) {
			data = schedule.sortPrograms(data);
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
