(function(){
    angular.module('app').service('authService', authService);

    authService.$inject = ['$state', 'angularAuth0', '$timeout'];
    function authService($state, angularAuth0, $timeout) {
        function login(){
            angularAuth0.authorize();
        }

        function handleAuthentication() {
            angularAuth0.parseHash(function(err, authResult){
                if(authResult && authResult.accessToken && authResult.idToken){
                    console.log(authResult);
                    setSession(authResult);
                    $timeout(function(){
                        $state.go('home');
                    })
                }
            })
        }

        function setSession(authResult) {
            var expiresAt = JSON.stringify(
                (authResult.expiresIn * 1000) + new Date().getTime()
            );

            var profile = {
                name: authResult.idTokenPayload.name,
                nickname: authResult.idTokenPayload.nickname,
                picture: authResult.idTokenPayload.picture,
            }

            localStorage.setItem('accessToken', authResult.accessToken);
            localStorage.setItem('idToken', authResult.idToken);
            localStorage.setItem('expiresAt', expiresAt);
            localStorage.setItem('profile', JSON.stringify(profile));
        }

        function logout(){
            localStorage.removeItem('accessToken');
            localStorage.removeItem('idToken');
            localStorage.removeItem('expiresAt');
            localStorage.removeItem('profile');
        }

        function isAuthenticated(){
           var expiresAt = JSON.parse(localStorage.getItem('expiresAt'));
           return new Date().getTime() < expiresAt;
        }

        return {
            login: login,
            logout: logout,
            isAuthenticated: isAuthenticated,
            handleAuthentication: handleAuthentication
        }
    }
})();