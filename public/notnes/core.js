var scotchTodo = angular.module('scotchTodo', []);

function mainController($scope, $http) {
	$scope.formData = {};


    $scope.pass = '';

    $scope.asd = 'Mee';

	// when landing on the page, get all todos and show them
	$http.get('/ranking')
		.success(function(data) {
			$scope.ranking = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// when submitting the add form, send the text to the node API
	$scope.createHero = function() {
		$http.post('/heroes', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
                $http.get('/heroes')
                    .success(function(data) {
                        $scope.heroes = data;
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });

				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a todo after checking it
	$scope.deleteHero = function(id) {
		$http.delete('/heroes/' + id)
			.success(function(data) {
                $http.get('/heroes')
                    .success(function(data) {
                        $scope.heroes = data;
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

    $scope.updateHero = function() {
        $http.put('/heroes/' + $scope.formData.id, $scope.formData)
            .success(function (data){
                $http.get('/heroes')
                    .success(function(data) {
                        $scope.heroes = data;
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.updateRanking = function() {
        $http.put('/ranking/' + $scope.formData.place, $scope.formData)
            .success(function (data){
                $scope.formData = {};
                $http.get('/ranking')
                    .success(function(data) {
                        $scope.ranking = data;
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}

scotchTodo.directive('toplist', function () {
    return {
        template: '<td>Place: {{ rank.place }}</td><td>Name: {{ rank.name }}</td><td popularity></td>'
    };
});

scotchTodo.directive('popularity', function () {
    return {
        template: '<progress value="{{ rank.popularity }}"> </progress>  {{ rank.popularity*100 }}%'
    };
});

scotchTodo.directive('youtube', function($sce) {
    return {
        restrict: 'EA',
        scope: { code:' @id' },
        replace: true,
        template: '<iframe width="420" height="315" src="{{url}}" frameborder="0" allowfullscreen></iframe>',
        link: function (scope) {
            scope.$watch('code', function (newVal) {
                if (newVal) {
                    scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal);
                }
            });
        }
    };
});

