Polymer('form-action', {
	addProgram: function(){
		var name = this.name || null;
		var user = this.user || null;
		var startTime = this.startTime || null;
		var type = this.shadowRoot.querySelector('paper-radio-group').selected || null;
		console.log(type);
		var imageUrl = 'images/image-placeholder.png';

		if(name && user && type){
			mainSchedule.addProgram(name, user, startTime, type, imageUrl);
			this.shadowRoot.querySelector('paper-dialog').toggle();
			this.clearFields();
		}

	},
	clearFields: function(){
		this.name = '';
		this.user = '';
		this.startTime = null;
		this.shadowRoot.querySelector('paper-radio-group').selected = "";
		this.imageUrl = 'images/tonight-show.jpg';
	},
	openDialog: function(){
		this.shadowRoot.querySelector('paper-dialog').toggle();
	}
});
