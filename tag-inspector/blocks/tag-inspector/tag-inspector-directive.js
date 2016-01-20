angular.module('tagInspectorApp')
    .directive('tagInspector', function ($rootScope, $document) {
        return {
            templateUrl: 'blocks/tag-inspector/tag-inspector-template.html',
            restrict: 'E',
            scope:{
                model: '=',
                autocompletedList: '='
            },
            link: function($scope, element, attrs){

                $scope.inputTag = '';

                $scope.selectItem = '';

                $scope.$watch('selectItem',function(newValue){
                    if (newValue) {
                        $scope.model.push(newValue);
                        $scope.inputTag = '';
                    }
                });

                $scope.$watch('inputTag', function (newValue) {
                    $rootScope.$broadcast('inputValue', newValue);
                });

                $scope.addInputKey = function(keyEvent) {
                    if (keyEvent.which === 13) {

                        if ($scope.inputTag.length) {
                            $scope.model.push($scope.inputTag);
                            $scope.inputTag = '';
                        }
                    }
                };

                $scope.focus = function(){
                    $rootScope.$broadcast('focusInput', true);
                };

                element.on('click', function(e) {
                    e.stopPropagation();
                });

                var addInputClick = function() {
                    $scope.$apply(function() {
                        if ($scope.inputTag.length) {
                            $scope.model.push($scope.inputTag);
                            $scope.inputTag = '';
                        }
                    });
                };

                $document.on('click', addInputClick);

                $scope.$on('$destroy', function() {
                    $document.off('click', addInputClick);
                });
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
