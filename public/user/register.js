/**
 * Created by GILGAMESH on 2015.06.06..
 */

var register = angular.module('register', []);

function regBody($scope, $http){

    $scope.regForm = {};

    $scope.show = true;

    $scope.registerUser = function(){
        $http.post('/users', $scope.regForm)
            .success(function(data){
                $scope.regForm = {};
                $scope.show = false;
            })
            .error(function(data){
                console.log('Error at register: '+ data);
            });
    }
}