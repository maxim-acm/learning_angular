angular.module('tagInspectorApp')
    .directive('tagInspector', function ($rootScope, $document) {
        return {
            templateUrl: 'blocks/tag-inspector/tag-inspector-template.html',
            restrict: 'E',
            scope:{
                model: '=',
                autocompletedList: '=',
                config: '='
            },
            link: function($scope, element, attrs){

                $scope.inputTag = '';
                $scope.selectItem = '';

                var config = {
                    customTags: true,
                    autoComplete: true,
                    onlyModelTags: true
                };

                function addTag(tag){

                    if (!$scope.onlyModelTags){

                        if ($scope.customTags) {
                            $scope.model.push(tag);
                            $scope.inputTag = '';
                        } else {
                            _.each($scope.autocompletedList, function (value) {

                                if (value === tag) {
                                    $scope.model.push(tag);
                                    $scope.inputTag = '';
                                }
                            })
                        }
                    }
                }

                if (!$scope.config.customTags) {
                    $scope.customTags = $scope.config.customTags;
                } else {
                    $scope.customTags = config.customTags;
                }

                if (!$scope.config.autoComplete) {
                    $scope.autoComplete = $scope.config.autoComplete;
                } else {
                    $scope.autoComplete = config.autoComplete;
                }

                if (!$scope.config.onlyModelTags) {
                    $scope.onlyModelTags = $scope.config.onlyModelTags;
                } else {
                    $scope.onlyModelTags = config.onlyModelTags;
                }

                $scope.$watch('selectItem',function(newValue){
                    addTag(newValue);
                });

                $scope.$watch('inputTag', function (newValue) {
                    $rootScope.$broadcast('inputValue', newValue);
                });

                $scope.addInputKey = function(keyEvent) {
                    if (keyEvent.which === 13) {
                        addTag($scope.inputTag);
                    }
                };

                $scope.focus = function(){
                   element[0].querySelector('input').focus();
                };

                element.on('click', function(e) {
                    e.stopPropagation();
                });

                var addInputClick = function() {
                    $scope.$apply(function() {
                        addTag($scope.inputTag);
                    });
                };

                $document.on('click', addInputClick);

                $scope.$on('$destroy', function() {
                    $document.off('click', addInputClick);
                });
            }
        }
    });
