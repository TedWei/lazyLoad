    //  support multiple script loading
    //  example 
    //  loadScript('jQuery.js',function(){
    //	   /*do something in here*/
    //	})
    //  or multiple
    //  loadScript(['jQuery.js','bootstrap.js'],function(){
    //	   /*do something in here*/
    //	})
    var loadScript = function(script,callback){
    	if (!script){
    		console.error("not found script");
    		return;
    	}
    	var loadS = function(url,callB){
            var newScript = document.createElement('script');
            newScript.type = "text/javascript";
            if (newScript.readyState){
            	newScript.onreadystatechange = function(){
            		if (newScript.readyState === 'loaded' || newScript.readyState === 'complete'){
            			newScript.onreadystatechange = null;
            			callB();
            		}
            	};
            }else{
            	newScript.onload = function(){
                    callB()
            	};
            }
            newScript.src = url;
            document.getElementsByTagName('head')[0].appendChild(newScript);
    	};
        if (Object.prototype.toString.apply(script) === '[object Array]'){
            (function loadSIter(){
            	loadS(script[0],function(){
            	    script.shift();
            	    if (script.length === 0){
            	        callback();
            	    }else{
            	        loadSIter();
            	    }
            	})
            })()
        }else{
            loadS(script,callback);
        }
    }