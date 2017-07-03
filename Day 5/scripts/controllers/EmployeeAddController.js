hrApp.controller('EmployeeAddController', ['$scope', '$http', '$location', 'CommonResourcesFactory', 'ManagerService', '$routeParams',
    function($scope, $http, $location, CommonResourcesFactory, ManagerService, $routeParams) {
        $scope.employee = {};
        $scope.requiredErrorMessage = "Please fill out this form!";
        $scope.patternDateNotRespectedMessage = "The date format should be yyyy-mm-dd";
        $scope.patternCommisionNotRespectedMessage = "Commission should be in the format 0.XX";

        //TODO #HR1

        ManagerService.findManagerId()
            .then(function (res) {
                $scope.managers = ManagerService.findManagerFromEmployees(res.data);
            }, function (err) {
                console.log("Error at employees/findOne: " + err);
            });
        ManagerService.findDepartmentId()
            .then(function (res) {
                $scope.departments = res.data;
            // }, function (err) {
            //     console.log("Error at employees/findOne: " + err);
            });
        ManagerService.findJobId()
            .then(function (res) {
                $scope.jobs = res.data;
                // }, function (err) {
                //     console.log("Error at employees/findOne: " + err);
            });




        // $http({url: CommonResourcesFactory.findAllDepartmentsUrl, method: 'GET'})
        //     .success(function (data, status, headers, config) {
        //         $scope.departments = data;
        //     });
        // $http({url: CommonResourcesFactory.findAllJobsUrl, method: 'GET'})
        //     .success(function (data, status, headers, config) {
        //         $scope.jobs = data;
        //     });
        /**
         * Reset form
         */
        $scope.reset = function () {
            this.employee = {};
        };

        /**
         * Persist an employee
         * @param addEmployee - employee to be persisted
         */
        $scope.create = function (addEmployee) {
            $http({url: $commonResourcesFactory.addEmployeeUrl, method: 'POST', data: addEmployee})
                .success(function (data) {
                    $scope.employee = data;
                    $location.url('/employeeView/' + $scope.employee.employeeId);
                });
        };

        $scope.datePattern = /^\d{4}-\d{2}-\d{2}$/;
        $scope.commissionPattern = /^[0]\.\d{1}(\d)?$/;
}]);