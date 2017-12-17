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
                clientID: 'CLIENTID',
                domain:'DOMAIN',
                responseType: 'token id_token',
                redirectUril: 'http://localhost:3000/callback',
                scope: 'openid profile',
                audience: 'AUDIENCE'
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
