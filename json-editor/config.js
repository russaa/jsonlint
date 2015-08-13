
(function () {
    
    require.config({
    	
//    	debugMode: true,
    	
		config: {
			'initApp': {
				grammarEditorClass: 'editor',
				waitDialogCssPath: 'json-editor/css/'
			}
		},
	
		paths : {
			
			'jsonlint': 'jsonlint-ext'
				
		    // libraries:
		    , 'jquery': 'json-editor/libs/jquery-2.1.3'
			, 'esprima' : 'json-editor/libs/esprima'
			
			, 'orioneditor': 'json-editor/libs/built-editor-amd'
			
			, 'lodash': 'json-editor/libs/lodash'
				
			, 'waitDialog': 'json-editor/libs/stdlne-wait-dlg'
				
			//app code
			, 'app': 'json-editor/app'
			, 'initApp': 'json-editor/initApp'
			, 'parseOptions': 'json-editor/parseOptions'
			, 'appUtil': 'json-editor/appUtil'
			, 'validationUtil': 'json-editor/validationUtil'
			, 'grammarValidator' : 'json-editor/jsonGrammarValidator'
			, 'grammarEditor': 'json-editor/grammarEditor'
		},
	
		shim : {
			'jsonlint' : {exports: 'jsonlint'}
		}
		
    });

    //start application:
    require(['app']);

}());
