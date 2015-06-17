/**
 * Created by GILGAMESH on 2015.06.07..
 */

var indexHero = angular.module('indexHero', [ 'angular-md5']);


indexHero.service('toMD5', function(md5){
    this.hash = function ($str) { return md5.createHash($str);}

});

function mainController($scope, $http, toMD5) {
    $scope.formData = {};
    $scope.hash = null;

    $http.get('/ranking')
        .success(function(data) {
            $scope.ranking = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $http.get('/heroes')
        .success(function(data) {
            $scope.heroes = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.testService = function ($name){
        $scope.hash = toMD5.hash($name);
    };

}

indexHero.directive('toplist', function () {
    return {
        template: '<td>{{ rank.place }}</td><td>{{ rank.name }}</td><td popularity></td>'
    };
});

indexHero.directive('popularity', function () {
    return {
        template: '<progress value="{{ rank.popularity }}"> </progress>  {{ rank.popularity*100 }}%'
    };
});

indexHero.directive('youtube', function($sce) {
    return {
        restrict: 'EA',
        scope: { code:' @id' },
        replace: true,
        template: '<iframe width="640" height="360" src="{{url}}" frameborder="0" allowfullscreen></iframe>',
        link: function (scope) {
            scope.$watch('code', function (newVal) {
                if (newVal) {
                    scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal);
                }
            });
        }
    };
});



indexHero.directive('herolist', function(){
    return {
        template: '<td>Name: {{ hero.name }}</td><td>Type: {{ hero.type }}</td>'
    };
});

