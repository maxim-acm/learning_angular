angular.module('app', [])
    .directive('myDirective', function () {
       return {
           restrict: "E",
           templateUrl: 'my-directice.html',
           scope: {

           },
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
                       select:{
                           options: [
                               {
                                   value: 1,
                                   label: 'One'
                               },
                               {
                                   value: 0,
                                   label: 'zero'
                               }
                           ]
                       },
                       textarea: {
                           value: ""
                       }
                   },

                   selectedOption: defaultOption,

                   itemsVisibility: {
                       checkbox: true,
                       select: false,
                       textarea: false
                   }
               };

               $scope.$watch('local.items.checkbox.value', function (newValue, oldValue) {
                    if (newValue) {
                        $scope.local.itemsVisibility.select = true;
                    } else if (!newValue){
                        $scope.local.itemsVisibility.select = false;
                        $scope.local.itemsVisibility.textarea = false;
                        $scope.local.selectedOption = defaultOption;
                    }
               });

               $scope.$watch('local.selectedOption', function(newValue, oldValue){

                    if (newValue.value == 1){

                        $scope.local.itemsVisibility.textarea = true;
                    } else if (newValue.value == 0){
                        $scope.local.itemsVisibility.textarea = false;
                    }
               });
           }

       }
    });