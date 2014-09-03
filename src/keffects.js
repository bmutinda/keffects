/**
 * jQuery Text odometer/shuffle plugin 
 * 
 * @developer: Mutinda Boniface
 * @website <https://github.com/mutindaz/keffects>
 * @email: <boniface.info@gmail.com>
 * 
 * 
 * 
 * Usage:
 * 	$("#text").kEffects({ time: 1000 });
 * 
 * NB: Free to use for any project, both commercial or personal 
 * 
 */ 
(function($){
	
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXTZ';
	var time = 2000;
	
	var KEffects = {
		obj : "",
		opts : {},
		text: "",
		
		elapsed : 0,
		fps: 20,
		
		init: function( _obj, _opts ){
			this.obj = _obj;
			this.opts = _opts;
			this.text = this.opts.text || $(this.obj).text();
			this.applyEffects( );
		},
		
		applyEffects: function( ){
			var texts = this.text.split("");
			
			// clear holder html 
			this.clearHolder();
			
			var spans_data = [];
			for( var i=0 ; i<texts.length; i++ ){
				var this_text = texts[i];
				var elem_id = "keffects-span-"+( this_text == " "? parseInt(Math.random(0,100)*100) : this_text );
				
				var this_span = {};
				this_span.text = this_text;
				this_span.id = elem_id;
				spans_data.push( this_span );
				
				var text_span = "<span id='"+elem_id+"' style='display:inline-block;position:relative'></spans_data>";
				$(this.obj).append(text_span );				
			}
			var parent = this;
			var timer = setInterval( function(){
				for( var i=0; i<spans_data.length; i++ ){
					parent.animateText( spans_data[i].id , spans_data[i].text );
				}
				parent.elapsed+=parent.fps;
				if( parent.elapsed>= parent.opts.time ){
					clearInterval( timer );
					parent.restartSession();
				}
			},  parent.fps );
		},
		
		animateText: function( elem, text ){
			$("#"+elem).html( this.chooseRandomText(text) );
		},
		
		chooseRandomText: function( cur_text ){
			var rand_text = "";
			if( parseInt( cur_text) ){
				rand_text = parseInt( Math.random(0,10)*100)+"";
			}else{
				rand_index = parseInt( Math.random( 0, this.opts.chars.length-1 )*10 );
				rand_text= this.opts.chars[rand_index]
			}
			return  rand_text;
		},
		
		clearHolder: function( ){
			$(this.obj).html("");
		},
		restartSession: function( ){
			$(this.obj).html( this.text );
			this.elapsed = 0;
		}
	}
	
	$.fn.kEffects = function( options ){
		
		var settings=$.extend({
			time: time,
			text: "",
			chars: chars
		}, options);
		
		return this.each( function(){
			KEffects.init( this, settings );
		});
		
	}
}(jQuery));