angular.module('autocompleteList',[])
    .directive('liveResultList', function () {
        return {
            restrict: "E",
            templateUrl: 'blocks/tag-inspector/live-input-result/live-result-list-template.html',
            scope: {
                autocompletedList: '=',
                inputTag: '=',
                selectItem: '='
            },
            link: function($scope){

                $scope.matchesWords = [];

                $scope.$watch('inputTag', function (data) {
                    if (data.length === 0) {
                        removeMatches();
                    } else {
                        sort($scope.autocompletedList, data);
                    }
                });

                $scope.addItem = function (item) {
                    $scope.selectItem = item;
                    removeMatches();
                };

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
            }
        }
    });

