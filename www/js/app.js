// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform, $http, $cordovaSQLite) {
    $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }

        try {
            db = $cordovaSQLite.openDB({name:"Onetapp9.db",location:'default'});
        } catch (error) {
            alert(error);
        }

        $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS MsgSended (id INTEGER PRIMARY KEY AUTOINCREMENT, Msg TEXT, SendTo VARCHAR(200))');

    });
    $http.defaults.headers.common['Authorization'] = 'qwer1234';
})

.controller('startCtrl',function($scope, $http, $cordovaSQLite){
    $scope.user = {};
    
    $scope.sendMsg = function() 
    {
        var sender = $scope.user.Msg;
        var question = ""; 
        var answer = "";
        var sent_at = $scope.user.SendTo;

        console.log("sender: ", $scope.user.Msg);
        console.log("sent_at: ", $scope.user.SendTo);

        var query = "INSERT INTO MsgSended (Msg, SendTo) VALUES (?,?)";
        $cordovaSQLite.execute(db, query, [sender, sent_at]).then(function(res)
        {
            console.log("insertId: " + res.insertId);
            $scope.sender(sender, question, answer, sent_at);

        }, function (err) 
        {
            console.error(err);
        });
    }

    $scope.sendMsg = function(sender, question, answer, sent_at) 
    {
        $http.get("http://api-test-fabianprado.c9users.io,", { 
            params: { 
                "sender": sender,
                "question": question, 
                "answer": answer, 
                "sent_at": sent_at
            } 
        })
        .success(function(data) 
        {
            alert("SUCCESS");
        })
        .error(function(data) 
        {
            alert("ERROR");
        });
    }
})
