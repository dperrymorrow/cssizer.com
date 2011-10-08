var TwitterBuild = function( dom_element ){
	
	this.element = dom_element;
	this.build_id = "";
	this.field = {};
	this.new_name = "";
	
	this.build = function(){
		this.field = this.element.find('input[type="text"]').first();
		this.build_id = this.field.data('id');
		this.field.blur( $.proxy(this,"saveChanges" ));
		
		this.field.keyup( $.proxy(this,'checkForEnter'));
		
		this.new_name = this.field.val();
	}
	
	this.checkForEnter=function(event){
		if( event.keyCode == '13'){
			this.saveChanges();
		}
	}
	
	this.saveChanges = function(){
		if( this.new_name == this.field.val() ){
			return;
		}
		
		this.new_name = this.field.val();
		this.element.find('.status').show();
		this.field.hide();
		this.sendData();
	}
	
	this.sendData = function(){
		$.post('/build/update_name', {name:this.new_name,id:this.build_id}, $.proxy(this,"saved"));
	}
	
	this.saved=function(response){
		this.element.find('.status').slideUp(100);
		this.field.slideDown(100);
	}
	
	this.build();
}