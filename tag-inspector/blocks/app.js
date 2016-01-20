angular.module('app', ['tagInspectorApp'])
    .controller('tagController', function ($scope) {
        $scope.autocompletedList = ['example1', 'example2', 'example3', 'example4', 'text', ''];

        $scope.model = ['#example'];
    });