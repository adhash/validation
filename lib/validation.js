;(function($){
'use strict';
	var map = {};
	var gloerr = {};
    var validation = function(form, options){
      this.form = form;
	  this.index = this.form.selector;
	  this.defaults = $.extend({
        event       : 'blur',
		errorClass  : 'error',
		invalidClass: 'invalid',
		//validClass  : 'valid', //optional
      }, options);
    };
    validation.prototype = {
		
	  isItForm: function(){
		  
			try {
			 if( !this.form.is('form') ) throw this.index + ' ' + 'must be a <form>';
			}
			catch(err){
			  console.log(err);
			}
	  },	
	  setGloObj: function(){
		  
		  	this.isItForm();
			gloerr[this.index] = [];
		    map[this.index] = [];
	  },
	  checkRegex: function(string){
		  
		var isItExpression = function(str){
			  for( var key in $.fn.validation.patterns ){
				if( $.fn.validation.patterns.hasOwnProperty(str) ){
				  return false;
				} else { return true; }
			  }
			};

			if( !isItExpression(string) ){
			  return $.fn.validation.patterns[string];
			} else {
				
			  var expression = string.split(' ')[0];
			  var flag       = string.split(' ')[1];
				
			  	  return new RegExp(expression, flag);
			}
	  },
      onload: function(){
		
		var validation = this;
		var inputs = this.form.find('input').not(':submit');

			$(inputs).each(function(){
			  //mapping inputs for validate();
			  map[validation.index].push(this);
				
			  if( $(this).attr('data-val') && $(this).attr('data-val') !== ''){
				//onload bind events to inputs
				$(this).on(validation.defaults.event, function(){
				  validation.validate(this);
				});
				//onload test all inputs
				validation.validate(this, true);
			  } else if( $(this).attr('data-val-compare') && $(this).attr('data-val-compare') !== '' ) {
				  
				var compare = this;
				var compareWith = $(this).attr('data-val-compare');
				  
					$(this).on(validation.defaults.event, function(){
					  validation.compare(this);
					});
					$( compareWith ).on(validation.defaults.event, function(){
						validation.compare( compare );
					});
				  
					validation.compare(this, true);
			  }
			});
      },
      validate: function(input, boolean){
		 
		var regex = this.checkRegex( $(input).attr('data-val') );
		  
			if( (!regex.test( $(input).val() ) && $(input).prop('readonly') === false ) && 
			    (!regex.test( $(input).val() ) && $(input).prop('disabled') === false) ){
				
			  this.addError(input, boolean);
			}
			else{
			  this.removeError(input);
			}
      },
	  compare: function(input, boolean){
	    
	  	var compareWith = $(input).attr('data-val-compare');
		var compareWithVal = $( compareWith ).val();
		var val = $(input).val();
		  
			if( ( (val !== compareWithVal && $(input).prop('disabled') === false) &&
			      (val !== compareWithVal && $(input).prop('readonly') === false) ) ){
				
			  this.addError(input, boolean);
			} else {
			  this.removeError(input);
			}
	  },
	  addError: function(input, boolean){
		  
			if(!($.inArray( input , gloerr[this.index]) > -1)){
			  gloerr[this.index].push( input );
			}
			//hide messege onload?
			if(boolean !== true){
			  this.showMessage(input);
			}
	  },
	  removeError: function(input){
		  
			if($.inArray( input , gloerr[this.index]) > -1){
			  gloerr[this.index].splice($.inArray( input , gloerr[this.index]), 1);
			  this.hideMessage(input);
			}
	  },
      preventSend: function(){
		  
	    var validation = this;
	    var sender = this.form.find('input').is(':submit') === true ? this.form.find('input:submit') : this.form.find('button');

			$(sender).on('click', function(){

			  if( gloerr[validation.index].length > 0 ){
				validation.message();
				gloerr[validation.index][0].focus();
				return false;
			  } else { return true; }
			});
      },
      message:function(){
		  
		var validation = this;
		  
			$.each(gloerr[this.index], function(){
			  validation.showMessage(this);
			});
      },
      showMessage: function(input){
		
		var msg = $(input).attr('data-val-msg');
		  
			if( $(input).next().attr('class') !== this.defaults.errorClass){
			  $(input).after('<p class="' + this.defaults.errorClass + '">' + msg + '</p>')
			          .addClass(this.defaults.invalidClass);
			};
      },
      hideMessage: function(input){
		  
			if( $(input).next().attr('class') === this.defaults.errorClass){
				$(input).removeClass(this.defaults.invalidClass).next().remove();
			};
      },
    }
  	$.fn.validation = function(options){
		
	  var val = new validation(this, options);
		
		  val.setGloObj();
		  val.onload();
		  val.preventSend();
  	}
	$.fn.isvalid = function(){
		
	  var form = this.selector;
		
		  for(var key in gloerr){
			  
			try{
			  if( gloerr.hasOwnProperty(form) ){
			    if( gloerr[form].length > 0 ){
				  return false;
			    } else {
				  return true;
			    }
			  } else { throw form + ' ' + 'is not under validation! Check your <file_name>.js...'; }
			}
		    catch(err){
			  console.log(err);
			  return false;
		    }
		  };
	};
	$.fn.validate = function(){

		  for(var key in map){
			if($.inArray( $(this).get(0) , map[key]) > -1)
			{
			  var val = new validation( $(key) );
				
			  if( $(this).attr('data-val-compare') ){
			  	val.compare( $(this).get(0) );
			  } else {
			    val.validate( $(this).get(0) );
			  }	
			}
		  }
	};
	$.fn.validation.patterns = {
	  empty:/^[a-z]$/,
	}
	$.extend($.fn.validation.patterns, $.fn.custom_patterns); 
})(jQuery);