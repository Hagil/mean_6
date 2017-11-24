console.log('loaded frontend_app');

angular.module('employees', []).controller('do_data', do_data);

function do_data($scope, $http) {
    console.log('doing data');
    $scope.message = 'Welcome to Mean 5'

    $scope.read = function () {
        console.log('reading data');
        $http.get('/api/v6/read').then(function (results){
            console.log(results);
            $scope.employees = results.data
        });
    }
    $scope.read();

    $scope.create = function () {
        console.log('creating data');
        var data = {
            name: $scope.input_name,
            email: $scope.input_email,
            gender: $scope.input_gender,
            job: $scope.input_job,
            favourite_colours: $scope.input_favourite_colours,
            avatar: $scope.input_avatar
        }
        $http.post('/api/v6/create', data).then(function (result){
            console.log(result);
            $scope.message = result.data.message;
        });
        $scope.read();
    }

    $scope.update = function (employee) {
        console.log('updating data');
        console.log(employee)
        $http.put('/api/v6/update', employee).then(function (result){
            console.log(result);
            $scope.message = result.data.message;
            $scope.read();
        });

    }


    $scope.delete = function (employee) {
        console.log('deleting data');
        console.log(employee);
        $http.delete('/api/v6/delete' + employee._id).then(function (result){
            console.log(result);
            $scope.message = result.data.message;
            $scope.read();
        });

    }
}