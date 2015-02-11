var app = angular.module('chatroom');

app.controller('mainCtrl', function ($scope, parseService) {
  $scope.chatCreation = false;
  $scope.returnHome = false;
  $scope.createBtn = true;
  var currentRoom = 'chat';
  //In your controller you'll have a getParseData function and a postData function, but should be placed on $scope.
  $scope.sortBy = true;
  $scope.sort = function () {
    $scope.sortBy = !$scope.sortBy;
  };
  //The getParseData function will call the getData method on the parseService object. You'll then save the result of that request to 
  //your controllers $scope as messages ($scope.messages)
  $scope.getParseData = function () {
    parseService.getData(currentRoom).then(function (response) {
      $scope.messages = response;
    });
  };

  $scope.getParseData();
  //The postData function will take whatever the user typed in (hint: look at the html and see what ng-model correlates to on the input box),
  //pass that text to the postData method on the parseService object which will then post it to the parse backend.

  $scope.postData = function () {
    parseService.postData($scope.message, currentRoom).then(function () {
      $scope.message = '';

    });

  };



  //uncomment this code when your getParseData function is finished
  //This goes and gets new data every second, which mimicking a chat room experience.
  setInterval(function () {
    $scope.getParseData();
  }, 1500)


  $scope.newChatroom = function () {
    $scope.chatCreation = true;
    $scope.createBtn = false;
  };

  $scope.createChatroom = function () {
    currentRoom = $scope.chatName
    $scope.chatName = '';
    $scope.getParseData();
    $scope.chatCreation = false;
    $scope.createBtn = true;
    $scope.returnHome = true;
  }

  $scope.backHome = function () {
    currentRoom = 'chat';
    $scope.getParseData();
    $scope.chatCreation = false;
    $scope.createBtn = true;
    $scope.returnHome = false;
  }


});