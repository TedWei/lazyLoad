    //  support multiple script loading
    //  example 
    //  loadScript('jQuery.js',function(){
    //	   /*do something in here*/
    //	})
    //  or multiple
    //  loadScript(['jQuery.js','bootstrap.js'],function(){
    //	   /*do something in here*/
    //	})
    var loadScript = function(script_url, callback) {
        if (!script_url) {
            console.error("not found script");
            return;
        }


        var toString = function(){
            return Object.prototype.toString.apply;
        }
        var tmpArray = [];
        var loadS = function(url, callB) {
            var newScript = document.createElement('script');
            newScript.type = "text/javascript";
            if (newScript.readyState) {
                newScript.onreadystatechange = function() {
                    if (newScript.readyState === 'loaded' || newScript.readyState === 'complete') {
                        newScript.onreadystatechange = null;
                        tmpArray.shift(url);
                        if (!tmpArray.length) {
                            callB && callB();
                        }
                    }
                };
            } else {
                newScript.onload = function() {
                    tmpArray.shift(url);
                    if (!tmpArray.length) {
                        callB && callB();
                    }
                };
            }
            newScript.src = url;
            document.getElementsByTagName('head')[0].appendChild(newScript);
        };

        var init = function() {
            if (toString(script_url) === '[object Array]') {
                tmpArray = script_url;
            } else if (toString(script_url) === "[object String]") {
                tmpArray.push(script_url);
            }

            for (var i = tmpArray.length - 1; i >= 0; i--) {
                loadS(tmpArray[i], callback);
            }
        }

        init();
    }