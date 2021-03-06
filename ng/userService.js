angular.module('app')
.service('UserService',function($http){
	var svc = this;
	svc.getUser= function(){
		return $http.get('/api/users',{
			headers:{ 'x-auth': this.token}
		});
	};
	svc.login=function(username, password){
		return $http.post('/api/sessions', {
			username: username,
			password: password
		}).then(function(val){
			svc.token = val.data;
			$http.defaults.headers.common['x-auth']= val.data;
			return svc.getUser();
		});
	};
	
});