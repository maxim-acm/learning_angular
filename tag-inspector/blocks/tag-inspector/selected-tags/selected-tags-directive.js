angular.module('tagInspectorApp')
    .directive('selectedTags', function () {
        return {
            restrict: 'E',
            templateUrl: 'blocks/tag-inspector/selected-tags/selected-tags-template.html',
            scope: {
                model: '='
            },
            link: function ($scope) {
                $scope.removeTag = function (tag) {

                    _.remove($scope.model, function(e){
                        return e === tag;
                    });
                }
            }
        }
    });
