'use strict';
/* global zxcvbn*/

var sc = angular.module('stellarClient');

sc.controller('PasswordCtrl', function($scope) {  
  $scope.loading = false;
  $scope.passwordConfirmation = '';
  $scope.passowrdScore = 0;
  $scope.passwordStrength = '';
  
  $scope.$watch('data.password', function(newValue, oldValue) {
    var score = zxcvbn($scope.data.password).score;
    if (score < 2) {
       $scope.passowrdScore = 'level1';
       $scope.passwordStrength = 'WEAK';
       return 
    }
    if (score < 3) { 
      $scope.passowrdScore = 'level2';
      $scope.passwordStrength = 'ALMOST';
      return 
    }
    if (strength < 4) { 
      $scope.passowrdScore = 'level3';
      $scope.passwordStrength = 'GOOD';
      return  
    }
    $scope.passowrdScore = 'level4';
    $scope.passwordStrength = 'STRONG';
    return  
  });

  $scope.checkPassword = function(){
    $scope.errors.passwordErrors = [];
    $scope.status.passwordValid = (zxcvbn($scope.data.password).score > 3);
    $scope.checkConfirmPassword();
  };

  $scope.checkConfirmPassword = function(){
    $scope.status.passwordConfirmValid = ($scope.data.password === $scope.data.passwordConfirmation);

    if($scope.status.passwordConfirmValid) {
      $scope.errors.passwordConfirmErrors = [];
    }
  };

  $scope.passwordClass = function(){
    return $scope.status.passwordValid ? 'glyphicon-ok' : 'glyphicon-none';
  };

  $scope.confirmPasswordClass = function(){
    if($scope.status.passwordConfirmValid) {
      return 'glyphicon-ok';
    } else {
      var passwordPrefix = $scope.data.password.slice(0, $scope.data.passwordConfirmation.length);
      return $scope.data.passwordConfirmation !== passwordPrefix ? 'glyphicon-remove' : 'glyphicon-none';
    }
  };

  // Validate the passwords are valid and matching.
  function validateInput() {
    // Remove any previous error messages.
    $scope.errors.passwordErrors        = [];
    $scope.errors.passwordConfirmErrors = [];

    var validInput = true;

    if(!$scope.data.password){
      validInput = false;
      $scope.errors.passwordErrors.push('The password field is required.');
    }
    else if(!$scope.status.passwordValid){
      validInput = false;
      $scope.errors.passwordErrors.push('The password is not strong enough.');
    }
    else if(!$scope.status.passwordConfirmValid){
      validInput = false;
      $scope.errors.passwordConfirmErrors.push('The passwords do not match.');
    }

    return validInput;
  }

  $scope.validators.push(validateInput);
});
