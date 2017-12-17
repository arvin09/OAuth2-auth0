(function(){
    angular
        .module('app', ['auth0.auth0', 'ui.router', 'angular-jwt'])
        .config(config)

        config.$inject = [
            '$stateProvider',
            '$urlRouterProvider',
            '$locationProvider',
            'angularAuth0Provider',
            'jwtOptionsProvider',
            '$httpProvider'
        ]

        function config(
            $stateProvider,
            $urlRouterProvider,
            $locationProvider,
            angularAuth0Provider,
            jwtOptionsProvider,
            $httpProvider
        ){
            $stateProvider.state('home', {
                url: '/',
                controller: 'HomeController',
                templateUrl: 'app/home/home.html',
                controllerAs: 'vm'
            })
            .state('callback',{
                url: '/callback',
                controller: 'CallbackController',
                templateUrl: 'app/callback/callback.html',
                controllerAs: 'vm'
            })
            .state('profile',{
                url: '/profile',
                controller: 'ProfileController',
                templateUrl: 'app/profile/profile.html',
                controllerAs: 'vm'
            });

            angularAuth0Provider.init({
              clientID: AUTH0_CLIENT_ID,
              domain: AUTH0_DOMAIN,
              responseType: 'token id_token',
              redirectUri: AUTH0_CALLBACK_URL,
              scope: 'openid profile',
              audience: AUTH0_API_AUDIENCE
            });

            jwtOptionsProvider.config({
                tokenGetter: function(){
                    return localStorage.getItem('accessToken');
                },
                whiteListedDomains: ['localhost']
            });

            $httpProvider.interceptors.push('jwtInterceptor');

            $urlRouterProvider.otherwise('/');

            $locationProvider.hashPrefix(''); // discover more about this

            $locationProvider.html5Mode(true); //


        }
})();
