var mainApp = angular.module("bookWorm", []);

mainApp.controller('bookController', function ($scope, $http) {

  $scope.fiction = {};
  var fictionRef = firebase.database().ref("Fiction/");
  var nFictionRef = firebase.database().ref("Non Fiction/");
  var romanceRef = firebase.database().ref("Romance/");
  var miscellaneousRef = firebase.database().ref("Miscellaneous/");
  mydefault()
  function mydefault(){
$scope.homeScreen = true;
      $scope.cartScreen = false;
      $scope.contactScreen = false;
      $scope.active = "home"
  }

setTimeout(function() {
  console.log("Applyyyy",$scope.fiction)
  $scope.$apply(function() {
   var temp1 = $scope.nFiction;
   var temp2 = $scope.fiction;
   var temp3 = $scope.romance;
   var temp4 = $scope.miscellaneous;
   });

}, 1800);
// because data arrives late and thus binding doesn't happen. Thus waiting 1800ms for data to load

  fictionRef.on("value", function (snapshot) {

console.log("fictionReffictionReffictionReffictionRef",snapshot.val())
  // $scope.$apply(function() {
       $scope.fiction = snapshot.val();
// });



  });

  nFictionRef.on("value", function (snapshot) {


    $scope.nFiction = snapshot.val();


  });

  romanceRef.on("value", function (snapshot) {


    $scope.romance = snapshot.val();


  });

  miscellaneousRef.on("value", function (snapshot) {


    $scope.miscellaneous = snapshot.val();


  });
  
  $scope.readBookDetails = function (data) {
    $scope.readBookData = data;
  }
  
   /**
     * Handles the sign in button press.
     */
    $scope.toggleSignIn = function() {
      if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
      } else //if($scope.emailVerified==false){
        {
        var email = $scope.email
        var password = $scope.password
        if (email == undefined || email == null || email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password == undefined || password == null || password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        if($scope.emailVerified==false){
        alert('email verification required');
          // return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var  errorCode = error.code;
           var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          document.getElementById('quickstart-sign-in').disabled = false;
          // [END_EXCLUDE]
        });
        // [END authwithemail]
        document.getElementById('quickstart-sign-in').disabled = true;
      }
    }
    /**
     * Handles the sign up button press.
     */
    $scope.handleSignUp = function() {
      var email = $scope.email;
      var password = $scope.password;
      var displayName = $scope.displayName;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      // Sign in with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END createwithemail]
      
    }
    /**
     * Sends an email verification to the user.
     */
     $scope.sendEmailVerification = function() {
      // [START sendemailverification]
      firebase.auth().currentUser.sendEmailVerification().then(function() {
        // Email Verification sent!
        // [START_EXCLUDE]
        alert('Email Verification Sent!');
        // [END_EXCLUDE]
      });
      // [END sendemailverification]
    
    }
     $scope.sendPasswordReset= function() {
      var email = $scope.email
      // [START sendpasswordemail]
      firebase.auth().sendPasswordResetEmail(email).then(function() {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        alert('Password Reset Email Sent!');
        // [END_EXCLUDE]
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/invalid-email') {
          alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END sendpasswordemail];
    }
    /**
     * initApp handles setting up UI event listeners and registering Firebase auth listeners:
     *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
     *    out, and that is where we update the UI.
     */
    function initApp() {
      // Listening for auth state changes.
      // [START authstatelistener]
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          $scope.displayName = user.displayName;
          $scope.email = user.email;
          $scope.emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // [START_EXCLUDE]
          document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
          document.getElementById('quickstart-sign-in').textContent = 'Sign out';
          document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
          // [END_EXCLUDE]
        } else {
          // User is signed out.
          // [START_EXCLUDE]
          document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
          document.getElementById('quickstart-sign-in').textContent = 'Sign in';
          document.getElementById('quickstart-account-details').textContent = 'null';
          // [END_EXCLUDE]
        }
        // [START_EXCLUDE silent]
        document.getElementById('quickstart-sign-in').disabled = false;
        // [END_EXCLUDE]
      });
    }

    window.onload = function() {
      initApp();
    };
    
    $scope.signIn = function(){
      $scope.login = true;
      $scope.signUp = false;
    }

    $scope.register = function(){
      $scope.login = false;
      $scope.signUp = true;
    }

    $scope.homef = function () {
      $scope.homeScreen = true;
      $scope.cartScreen = false;
      $scope.contactScreen = false;
      $scope.active = "home"
    }
    $scope.cartf = function () {
      $scope.homeScreen = false;
      $scope.cartScreen = true;
      $scope.contactScreen = false;
      $scope.active = "cart"
    }
    $scope.contactf = function () {
      $scope.homeScreen = false;
      $scope.cartScreen = false;
      $scope.contactScreen = true;
      $scope.active = "contact"
    }

});


