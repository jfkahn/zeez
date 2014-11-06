// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('zeez', ['ionic'])

.controller("MainController",function($scope, $http, $timeout) {

  $scope.toggleLights = function() {
    console.log("Lights toggled, fuck yeah")
    $http.put("http://localhost:56780/lights/all/toggle")
  };
  // Store Sleep and Wake times



   $scope.setWake = function () {
    // TODO cancel current timeout promise before setting new timer
    //
   // console.log($timeout.cancel(timeoutPromise))
    //the timeout function below calls sunrise in milliseconds

    var timeoutPromise = $timeout(function(){$scope.simulateSunRise()}, $scope.timeToSunrise($scope.wake));

    console.log($scope.wake);
   };

   $scope.setPreSleep = function () {
    //TODO if updating preSleep, I need to cancel the current timer

    $timeout(function(){$scope.activatePreSleep()}, $scope.timeToPreSleep($scope.preSleepTime));
   };

   $scope.timeToPreSleep = function(preSleepTime){
      //get milliseconds between now and set wake time tomorrow
       var now = moment();
       var pST = moment(preSleepTime, "HH:mm")
      // get the difference in ms between waketime and now
      $scope.preSleepDiffMs = pST.diff(now)

      //if diffms is negative, meaning the current time is after the wake time, add one day to wake time
      if ($scope.preSleepDiffMs < 0) {
        pST.add(1, 'days')
        $scope.preSleepDiffMs = pST.diff(now)
        return $scope.preSleepDiffMs
      }
      else {
        return $scope.preSleepDiffMs
      }
   };

   $scope.testPreSleep = function() {
      console.log("this worked!")
   };

   $scope.timeToSunrise = function(wakeTime){
      //get milliseconds between now and set wake time tomorrow
      $scope.currentTime = moment().format("HH:mm:s a");
      $scope.now = moment();
      $scope.wakeTime = moment(wakeTime, "HH:mm")
      // get the difference in ms between waketime and now
      $scope.diffMs = $scope.wakeTime.diff($scope.now)

      //if diffms is negative, meaning the current time is after the wake time, add one day to wake time
      if ($scope.diffMs < 0) {
        $scope.wakeTime.add(1, 'days')
        $scope.diffMs = $scope.wakeTime.diff($scope.now)
        return $scope.wakeDiffMs
      }
      else {
        return $scope.wakeDiffMs
      }
   };

    $scope.wakeUp = function () {
      $scope.simulateSunRise();
    };

    $scope.activatePreSleep = function(){
      $scope.preSleepLights();
      $scope.showSleepButton();
    };

    $scope.simulateSunRise = function () {
      console.log("The sun rise is happening");
      $http.put("http://localhost:56780/lights/all/toggle")
      //lights should come on, intensifying to blue 20 minutes before wake up time
      //10 minutes after wakeup they should change to more white
    };

    $scope.preSleepLights = function () {
      console.log("Getting you ready for sleep")
      $http.put("http://localhost:56780/lights/all/toggle")
    };

    $scope.showSleepButton = function () {
      console.log("Sleep button appeared")
    };



} );

