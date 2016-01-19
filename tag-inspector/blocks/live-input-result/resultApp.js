angular.module('resultApp',[])
    .directive('liveResultList', function ($rootScope) {
        return {
            restrict: "E",
            templateUrl: 'blocks/live-input-result/live-result-list-template.html',
            scope: {
                autocompletedList: '='
            },
            link: function($scope){

                $scope.matchesWords = [];

                $scope.$on('inputValue', function (event, data) {

                    if (data.length === 0) {
                        removeMatches();
                    }

                    else {
                        sort($scope.autocompletedList, data);
                    }
                });

                function removeMatches() {
                    $scope.matchedWords = [];
                }

                function sort(array, string ){

                    $scope.matchedWords = [[],[]];

                    _.each(array, function (value) {
                        if(value.indexOf(string) === 0){
                            $scope.matchedWords[0].push(value);
                        }

                        else if(value.indexOf(string) > 0){
                            $scope.matchedWords[1].push(value);
                        }
                    });

                    $scope.matchedWords = $scope.matchedWords.reduce(function(flat, current) {
                        return flat.concat(current);
                    }, []);
                }

                $scope.sendItem = function (item) {
                    $rootScope.$broadcast('selectItem', item);
                }

            }
        }
    });

