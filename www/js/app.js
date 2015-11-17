var getCoeff = function(longueurBuche){
    var coeff = 1;
    longueurBuche = Number(longueurBuche)/100;
    switch (true) {
        case longueurBuche < 0.25:
            coeff = 1.76;
            break;
        case longueurBuche < 0.30:
            coeff = 1.67;
            break;
        case longueurBuche < 0.33:
            coeff = 1.52;
            break;
        case longueurBuche < 0.40:
            coeff = 1.43;
            break;
        case longueurBuche < 0.45:
            coeff = 1.36;
            break;   
        case longueurBuche < 0.5:
            coeff = 1.3;
            break;   
        case longueurBuche < 1:
            coeff = 1.25;
            break;    
        case longueurBuche >= 1:
            coeff = 1;
            break;                  
    }
    return coeff;
}

var openExternal = function (elem) {
    window.open(elem, "_system");
    return false; // Prevent execution of the default onClick handler 
}

angular.module('starter', ['ionic', 'ngMessages'])

.directive('hideTabs', function($rootScope) {
    return {
      restrict: 'A',
      link: function(scope, element, attributes) {

            scope.$on('$ionicView.beforeEnter', function() {
                scope.$watch(attributes.hideTabs, function(value){
                    $rootScope.hideTabs = value;
                });
            });

            scope.$on('$ionicView.beforeLeave', function() {
                scope.$watch(attributes.hideTabs, function(value){
                    $rootScope.hideTabs = value;
                });
            });
        }
    };
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "templates/home.html"
        }
      }
    })
    .state('tabs.stereVolume', {
      url: "/stereVolume",
      views: {
        'home-tab': {
          templateUrl: "templates/stereVolume.html",
          controller: 'stereVolumeCtrl'
        }
      }
    })
    .state('tabs.bucherStere', {
      url: "/bucherStere",
      views: {
        'home-tab': {
          templateUrl: "templates/bucherStere.html",
          controller: 'bucherStereCtrl'
        }
      }
    })
    .state('tabs.volumeStere', {
      url: "/volumeStere",
      views: {
        'home-tab': {
          templateUrl: "templates/volumeStere.html",
          controller: 'volumeStereCtrl'
        }
      }
    })
    .state('tabs.help', {
      url: "/help",
      views: {
        'help-tab': {
          templateUrl: "templates/help.html"
        }
      }
    })
    .state('tabs.about', {
      url: "/about",
      views: {
        'about-tab': {
          templateUrl: "templates/about.html"
        }
      }
    })
    .state('tabs.result', {
      url: "/result",
      params: {
        'stere': '', 
        'm3': '', 
        'longueurBuche': ''
      },
      views: {
        'home-tab': {
          templateUrl: "templates/result.html",
          controller: "resultCtrl"
        }
      }
    });

   $urlRouterProvider.otherwise("/tab/home");

})

.controller('stereVolumeCtrl', function($scope, $ionicPlatform, $state) {
  $scope.getVolume = function(stereVolumeForm, data) {
    $scope.showValidationMessages = true;
    if (stereVolumeForm.$valid){
        $scope.volume = (data.stere/getCoeff(data.longbuche)).toFixed(2);
        $scope.showValidationMessages = false;
        $state.go('tabs.result', { "stere": data.stere, "m3": $scope.volume, "longueurBuche": data.longbuche});
    }
  }
  $ionicPlatform.ready(function() {
    $scope.showValidationMessages = false;
  });
})
.controller('bucherStereCtrl', function($scope, $ionicPlatform, $state) {
  $scope.getStere = function(bucherStereForm, data) {
    $scope.showValidationMessages = true;
    if (bucherStereForm.$valid){
        $scope.volume = Number(data.longtas)*Number(data.largetas)*Number(data.hauttas);
        $scope.stere = (getCoeff(data.longbuche)*$scope.volume).toFixed(2);
        $scope.volume = $scope.volume.toFixed(2);
        $scope.showValidationMessages = false;
        $state.go('tabs.result', { "stere": $scope.stere, "m3": $scope.volume, "longueurBuche": data.longbuche});
    }
  }
  $ionicPlatform.ready(function() {
    $scope.showValidationMessages = false;
  });
})
.controller('volumeStereCtrl', function($scope, $ionicPlatform, $state) {
  $scope.getStere = function(volumeStereForm, data) {
    $scope.showValidationMessages = true;
    if (volumeStereForm.$valid){
      $scope.volumeCtrl = Number(data.volume);
      $scope.stere = (getCoeff(data.longbuche)*$scope.volumeCtrl).toFixed(2);
      $scope.showValidationMessages = false;
      $state.go('tabs.result', { "stere": $scope.stere, "m3": data.volume, "longueurBuche": data.longbuche});
    }
  }
  $ionicPlatform.ready(function() {
    $scope.showValidationMessages = false;
  });
})
.controller('resultCtrl', function($scope, $ionicPlatform, $stateParams, $state) {
 $scope.stere=$stateParams.stere;
 $scope.m3=$stateParams.m3;
 $scope.longueurBuche=$stateParams.longueurBuche;
});
