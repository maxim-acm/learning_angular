angular.module('app', ['tagInspectorApp'])
    .controller('tagController', function ($scope) {
        $scope.autocompletedList = ['example1', 'example2', 'example3', 'example4', 'example5', 'text', 'angular'];

        $scope.model = ['#example'];

        $scope.config = {
            customTags: false,
            autoComplete: true,
            onlyModelTags: true
        };
    });