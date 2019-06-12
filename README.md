# angularjs-google-recaptcha-v3
Google ReCaptcha v3 wrapper for AngularJS 1

This is a simple Google ReCaptcha v3 wrapper for AngularJS (1.x). Inject the module, call initialize({key: ${your_public_recaptcha_key_for_v3}}) and then call execute() as needed. If you need to hide the badge, refer to Google's Recaptcha docs, here (https://developers.google.com/recaptcha/docs/faq).

## Getting Started ##

Install Script
``` npm install angularjs-google-recaptcha-v3 ```

Include the Script

```
<script src="node_modules/angularjs-google-recaptcha-v3/release/angularjs-google-recaptcha-v3.js"></script>
```

Add as dependency to your app

```angular.module('myApp', ['fayzaan.gRecaptcha.v3']);```

Initialize before use

```
app.controller("appCtrl",
  function ($scope, gRecaptcha) {
    gRecaptcha.initialize({key: $scope.recaptchaPublicKey}) // returns a promise
  }
)
```

Call execute() wherever you need to use it

```
app.controller("appCtrl",
  function ($scope, gRecaptcha) {
    // parameters get passed in to Google Recaptcha's execute function
    gRecaptcha.execute({action: 'purchase'})
      .then(function (token) {
        // returns token from Google Recaptcha
      })
  }
)
```
