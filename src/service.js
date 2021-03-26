/*global angular*/

(function (ng) {
	'use strict';

	var app = ng.module('fayzaan.gRecaptcha.v3');

	app.provider('gRecaptcha', function () {
		var service = this;

		service.$get = ['$window', '$q', '$document', '$interval',
			function ($window, $q, $document, $interval) {
				var key = null;
				var url = 'https://www.google.com/recaptcha/api.js';
				var onLoadFunctionName = 'onGRecaptchaScriptLoaded';
				var defered = $q.defer();
				var initializing = false;
				var initialized = false;

				function writeScript () {
		      var tag = document.createElement('script');
		      tag.src = url + '?render=' + key + '&onload=' + onLoadFunctionName + '&render=explicit';
		      $document.find('body')[0].appendChild(tag);
		    }

		    function isExecuteAvailable () {
		      return angular.isFunction(($window.grecaptcha || {}).execute);
		    }

		    function scriptExists () {
		      return $window.document.querySelector('script[src^="' + url + '"]')
		    }

		    function execute (params) {
		      if (isInitializing() || !isExecuteAvailable()) {
		        return defered
		          .promise
		          .then(function () {
		            return execute(params);
		          })
		      }
		      return $window.grecaptcha.execute(key, params)
		    }

		    function isInitialized () {
		      return !!initialized;
		    }

		    function isInitializing () {
		      return !!initializing;
		    }

		    function reset () {
		      return $window.grecaptcha.reset();
		    }

		    function initialize (params) {
		      setTimeout(function () {
		        try {
		          if (!params || !params.key) {
		            throw new Error('Missing required public key for reCaptcha.');
		          }

		          key = params.key + '';

		          if (isExecuteAvailable()) {
		            initialized = true;
		            initializing = false;
		            defered.resolve();
		          } else if (scriptExists()) {
		            initializing = true;
		            var wait = $interval(function () {
		              if (isExecuteAvailable()) {
		                $interval.cancel(wait);

		                initialized = true;
		                initializing = false;
		                defered.resolve();
		              }
		            }, 50)
		          } else {
		            initializing = true;
		            $window[onLoadFunctionName] = function () {
		              initialized = true;
		              initializing = false;
		              defered.resolve();
		            };

		            writeScript();
		          }


		        } catch (e) {
		          defered.reject(e);
		        }
		      });

		      return defered.promise;
		    }

				return {
					initialize: initialize,
					execute: execute,
					reset: reset,
					isInitialized: isInitialized,
					isInitializing: isInitializing
				};
			}
		]
	})
})(angular)
