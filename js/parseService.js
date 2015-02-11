var app = angular.module('chatroom');

app.service('parseService', function ($http, $q) {
  //Here you'll need to create two methods. One called postData and the other called getData.


  this.getData = function (str) {
    var deferred = $q.defer();
    str = str.split(' ').join('%');
    $http.get('https://api.parse.com/1/classes/' + str + '?order=-createdAt').then(function (data) {
      for (var i = 0; i < data.data.results.length; i++) {
        if (!data.data.results[i].text) {
          data.data.results.splice(i, 1)
        }
      }
      deferred.resolve(data.data.results)
    });
    return deferred.promise;
  };


  //postData method here
  this.postData = function (string, name) {
    var deferred = $q.defer();
    name = name.split(' ').join('%');
    $http.post('https://api.parse.com/1/classes/' + name, {
      text: string
    }).then(function (data) {
      deferred.resolve();
    });
    return deferred.promise;
  };
});