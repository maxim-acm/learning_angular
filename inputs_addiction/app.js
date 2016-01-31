angular.module('app', [])
    .directive('myDirective', function () {
        return {
            restrict: "E",
            templateUrl: 'my-directice.html',
            scope: {},
            link: function ($scope, element) {

                var defaultOption = {
                    value: 0,
                    label: 'zero'
                };

                $scope.local = {
                    items: {
                        checkbox: {
                            value: false
                        },
                        select: {
                            options: {

                                defaultOption: {
                                    value: 1,
                                    label: 'One'
                                },

                                dependencyOption: {
                                    value: 0,
                                    label: 'zero'
                                }
                            },

                            selectedOption: defaultOption
                        },
                        textarea: {
                            value: ""
                        }
                    }
                };

                $scope.value = $scope.value || 0;

                var canUpdateValue = false;

                var value;

                if ($scope.value === 1) {
                    value = 1;
                } else if ($scope.value === 0) {
                    value = 0;
                } else if (_.isString($scope.value)) {
                    value = '';
                }

                switch (value) {
                    case 0:
                        canUpdateValue = true;
                        break;
                    case 1:
                        $scope.local.items.checkbox.value = true;
                        $scope.local.items.select.selectedOption = defaultOption;
                        canUpdateValue = true;
                        break;
                    case '':
                        $scope.local.items.checkbox.value = true;
                        $scope.local.items.select.selectedOption = $scope.local.items.select.options.defaultOption;
                        $scope.local.items.textarea.value = $scope.value;
                        canUpdateValue = true;
                        break;
                }

                $scope.$watch('local.items.checkbox.value', function (newValue, oldValue) {

                    if (canUpdateValue) {
                        if (newValue != oldValue) {
                            if (!newValue) {
                                $scope.local.items.select.selectedOption = defaultOption;
                                $scope.value = 0;
                            } else if (newValue) {
                                $scope.value = 1;
                            }
                        }
                    }
                });

                $scope.$watch('local.items.select.selectedOption', function (newValue, oldValue) {
                    if (canUpdateValue) {
                        if (newValue != oldValue) {
                            if (newValue.value === 0) {
                                $scope.local.items.textarea.value = '';
                                if ($scope.local.items.checkbox.value) {
                                    $scope.value = 1;
                                }
                            } else if (newValue.value === 1) {
                                $scope.local.items.textarea.value = '';
                                $scope.value = '';
                            }
                        }
                    }
                });

                $scope.$watch('local.items.textarea.value', function (newVal, oldVal) {
                    if (canUpdateValue) {
                        if (newVal != oldVal) {
                            if ($scope.local.items.select.selectedOption.value === 1) {
                                $scope.value = newVal;
                            }
                        }
                    }
                });
            }
        }
    });