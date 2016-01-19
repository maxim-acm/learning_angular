angular.module('tagApp')
    .directive('tagInspector', function ($rootScope) {
        return {
            templateUrl: 'blocks/tag-inspector/tag-inspector-template.html',
            restrict: 'E',
            scope:{
                model: '=',
                autocompletedList: '='
            },
            link: function($scope){
                $scope.inputTag = '';

                $scope.$watch('inputTag', function (newValue) {
                    $rootScope.$broadcast('inputValue', newValue);
                });

                $scope.addInputTag = function(keyEvent) {
                    if (keyEvent.which === 13) {

                        if ($scope.inputTag.length) {
                            $scope.model.push($scope.inputTag);
                            $scope.inputTag = '';
                        }
                    }
                };

                $scope.$on('selectItem', function (event, data) {
                    $scope.model.push(data);
                    $scope.inputTag = '';
                });

                $scope.focus = function(){
                    $scope.$broadcast('focusInput', true);
                };
            }
        }
    })
    .directive('focusInput', function(){
        return {
            scope: {

            },
            link: function ($scope, element) {
                $scope.$on('focusInput', function (event, data) {
                    if (data === true) {
                        element[0].focus();
                    }
                })
            }
        }
    });
