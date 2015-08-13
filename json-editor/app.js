
define(['require', 'jquery', 'validationUtil', 'waitDialog'
        , 'initApp'
    ], 
function(require, $, validationUtil, waitDialog
//		, init
){
	


	/**
	 * App initializer (triggered on-doc-ready by jQuery; see below)
	 * 
	 * @private
	 * @type Function
	 * @memberOf TestGrammarApp
	 */
	var _initAppOnDocReady = function() {

//		console.log('dom ready');

		require(['jsonEditor', 'parseOptions'], function(edt, opt){

			edt.setAutoValidationEnabled(true);
			
			initValidateControls(edt, opt);
			
			_hideLoader();
			
			edt.validate();
		});
		
		
		
	};
	//register with jQuery ondocready:
	$(_initAppOnDocReady);
	
	
	function initValidateControls(editor, options){
		
		$("#reformat,#strict-mode,#extract-loc").on('change', function(evt){
			editor.validate();
		});
		
		
		document.getElementById("button").onclick = function () {
			try {

				if (options.isLoc()) {
					jsonlint.setLocEnabled(true);//enable extraction of location meta data   
				}
				else {
					jsonlint.setLocEnabled(false);//enable extraction of location meta data   
				}

				if (options.isStrict()) {
					jsonlint.setStrict(true);//enable extraction of location meta data   
				}
				else {
					jsonlint.setStrict(false);//enable extraction of location meta data   
				}

				var result = jsonlint.parse(editor.getText());//document.getElementById("source").value);
				if (result) {
					var resultEl = $("#result");
					resultEl.find(".text").text("JSON is valid!");
					resultEl.attr("class", "pass");
					if (options.isReformat()) {
//						document.getElementById("source").value =
							editor.setText( JSON.stringify(result, null, "  ") );
					}
				}
			} catch(e) {
				var resultEl = $("#result");
				resultEl.find(".text").text(e);
				resultEl.attr("class", "fail");
			}
		};
		
	}

	var _hideLoaderTimer;
	var _showLoaderTimer;
	/**
	 * Shows a wait dialog.
	 * 
	 * @private
	 * @type Function
	 * @memberOf TestGrammarApp
	 */
	function _showLoader(text, delay, func, argsArray) {

		clearTimeout(_hideLoaderTimer);
		
		if (!delay) {
			_showLoaderTimer = setTimeout(function() {
				waitDialog.show(text, 'app');
				if(func){
					func.apply(null, argsArray);
				}
			}, 50);
			
		} else {
			_showLoaderTimer = setTimeout(function() {
				
					waitDialog.show(text, 'app');
					
					if(func){
						setTimeout(function() {
							func.apply(null, argsArray);
						}, delay);
					}
//				}
			}, 50);
		}

	}

	/**
	 * Hides the wait dialog
	 * 
	 * @private
	 * @type Function
	 * @memberOf TestGrammarApp
	 */
	function _hideLoader() {
		
		clearTimeout(_showLoaderTimer);
		
		_hideLoaderTimer = setTimeout(function(){
			waitDialog.hide('app');
		}, 50);
		
	}
	
	/**
	 * HELPER for converting the current editor input (or the text argument)
	 * 		  into a JSON object.
	 * 
	 * If the text is an invalid JSON definition, an error dialog will be shown
	 * to the user.
	 * 
	 *  NOTE this helper should only be used in reaction to an explicit user action.
	 * 
	 * @private
	 * @type Function
	 * @memberOf TestGrammarApp
	 */
	function _inputTextToJSON(view, text) {
		
		if(typeof text === 'undefined'){
			text = view.getJsonGrammarText();
		}
		
		var jsonObj = validationUtil.validateJson(text, function(err){
			
//			var doSelectLine = function(){
//				util.selectLine(lineNo, view.getEditor());
//				setTimeout(function() {
//					util.selectLine(lineNo, view.getEditor());
//				}, 500);
//			};
			
			var msg = err.message;
			
				
//			_showErrorDialog('Error: Invalid JSON Fromat',
//					'Error on parsing grammar text into a JSON object.',
//					'<pre>' + msg + '</pre>'
////					, doSelectLine, doSelectLine
//			);
				
		});
		
		if(jsonObj){
			return jsonObj;
		}
		return false;
	}

	return {};
});