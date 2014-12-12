// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('zeez', ['ionic'])

.controller("MainController",function($scope, $http, $timeout) {


// Light Values
// Sleep Red: color?hue=26.68&saturation=1.0&brightness=.39
// Work High Kelvin: color":{"hue":0.0,"saturation":0.0,"brightness":1.0,"kelvin":8000}
//  Evening Kelvin: "color":{"hue":0.0,"saturation":0.0,"brightness":1.0,"kelvin":2500}
// brightness lower for lower intensity
// subtle option -> blue(30 minutes before wake) -> blue/white(wake+15) -> orange (ps-1.5) -> orange dim(ps -1) -> red sleep(ps) -> flash red a few times->dim red  to readable(ps + 1)
  $scope.toggleLights = function() {
    console.log("Lights toggled, fuck yeah. .61 yee")
     // $http.put("http://lifx-http.local:56780/lights/all/toggle")
      //$http.put("http://lifx-http.local:56780/lights/all/color?hue=26.68&saturation=1.0&brightness=.05&duration=5s")
     // $http.put("http://192.168.2.2:56780/lights/all/color?hue=230&saturation=0.19&brightness=0.0");
     $http.put("http://localhost:56780/lights/all/color?hue=230&saturation=0.19&brightness=0.0");



  };
  // Store Sleep and Wake times



   $scope.setWake = function () {
    // TODO cancel current timeout promise before setting new timer
    //
   // console.log($timeout.cancel(timeoutPromise))
    //the timeout function below calls sunrise in milliseconds

    var timeoutPromise = $timeout(function(){$scope.simulateSunRise()}, $scope.timeToSunrise($scope.wake));
    $scope.turnLightsOff();
    console.log($scope.wake);
    // set new pre sleep time when user goes to sleep
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



   $scope.timeToSunrise = function(wakeTime){
      //get milliseconds between now and set wake time tomorrow
      $scope.currentTime = moment().format("HH:mm:s a");
      $scope.now = moment();
      $scope.wakeTime = moment(wakeTime, "HH:mm");
      // get the difference in ms between waketime and now
      $scope.wakeDiffMs = $scope.wakeTime.diff($scope.now);

      //if diffms is negative, meaning the current time is after the wake time, add one day to wake time
      if ($scope.wakeDiffMs < 0) {
        $scope.wakeTime.add(1, 'days')
        $scope.wakeDiffMs = $scope.wakeTime.diff($scope.now)
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
      $scope.setPreSleepTomorrow();
     // $scope.showSleepButton();
    };

    $scope.setPreSleepTomorrow = function(){
      $scope.preSleepDiffMs.add(1, 'days');
    };

    $scope.simulateSunRise = function () {
      console.log("The sun rise is happening");
      $http.put("http://lifx-http.local:56780/lights/all/color?hue=230&saturation=0.19&brightness=1&duration=15m");
      //lights should come on, intensifying to blue 20 minutes before wake up time
      //10 minutes after wakeup they should change to more white
    };


    $scope.simulateDayDemo = function () {
      console.log("Be real Productive, its the day.");
      $http.put("http://192.168.1.114:56780/lights/all/color?hue=0.0&saturation=0.0&brightness=1&kelvin=8000&duration=5s");
    };

     $scope.simulateEveningDemo = function () {
      console.log("Low Kelvin, Evening");
      $http.put("http://192.168.1.114:56780/lights/all/color?hue=0.0&saturation=0.0&brightness=1&kelvin=2500&duration=5s")
    };

$scope.simulatePreSleepDemo = function () {
      console.log("Orange");
      $http.put("http://192.168.1.114:56780/lights/all/color?hue=26.68&saturation=1.0&brightness=.39&duration=5s")
    };

$scope.simulateSleepDemo = function () {
      console.log("Sleep");
      $http.put("http://192.168.1.114:56780/lights/all/color?hue=26.68&saturation=1.0&brightness=0&duration=5s")
    };



     $scope.simulateSunRiseDemo = function () {
      console.log("The sun rise is happening");
      $http.put("http://lifx-http.local:56780/lights/all/color?hue=230&saturation=0.19&brightness=1&duration=7s");

      //lights should come on, intensifying to blue 20 minutes before wake up time
      //10 minutes after wakeup they should change to more white
    };

    $scope.preSleepLights = function () {
      //get all lights ready for pre-sleep
      console.log("Getting you ready for sleep")
      $http.put("http://192.168.2.2:56780/lights/all/color?hue=26.68&saturation=1.0&brightness=.39")
    };

    $scope.showSleepButton = function () {
      console.log("Sleep button appeared")
    };

    $scope.turnLightsOff = function() {
      console.log("going to sleep and turning lights off")
      $http.put("http://lifx-http.local:56780/lights/all/color?hue=230&saturation=0.19&brightness=0&duration=5s");
    }

} );

