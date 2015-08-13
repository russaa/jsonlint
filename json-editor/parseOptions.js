
define(['jquery'], function($){
	
	return {
		
		isReformat: function(){
			var el = $("#reformat")
			return el.length? el[0].checked : false;
		},
		
		isStrict: function(){
			var el = $("#strict-mode");
			return el.length? el[0].checked : false;
		},
		
		isLoc: function(){
			var el = $("#extract-loc");
			return el.length? el[0].checked : false;
		}
	}
	
});