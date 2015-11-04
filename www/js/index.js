// var app = {
//     // Application Constructor
//     initialize: function() {
//         this.bindEvents();
//     },
//     // Bind Event Listeners
//     //
//     // Bind any events that are required on startup. Common events are:
//     // 'load', 'deviceready', 'offline', and 'online'.
//     bindEvents: function() {
//         document.addEventListener('deviceready', this.onDeviceReady, false);
//     },
//     // deviceready Event Handler
//     //
//     // The scope of 'this' is the event. In order to call the 'receivedEvent'
//     // function, we must explicity call 'app.receivedEvent(...);'
//     onDeviceReady: function() {
//         alert("lala");
//         app.receivedEvent('deviceready');

//         var ref = window.open('http://apache.org', '_blank', 'location=yes');

//         ref.addEventListener('loadstart', function(event) { alert('start: ' + event.url); });
//         ref.addEventListener('loadstop', function(event) { alert('stop: ' + event.url); });
//         ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message); });
//         ref.addEventListener('exit', function(event) { alert(event.type); });
//     },
//     // Update DOM on a Received Event
//     receivedEvent: function(id) {
//         var parentElement = document.getElementById(id);
//         var listeningElement = parentElement.querySelector('.listening');
//         var receivedElement = parentElement.querySelector('.received');

//         listeningElement.setAttribute('style', 'display:none;');
//         receivedElement.setAttribute('style', 'display:block;');

//         console.log('Received Event: ' + id);
//     }
// };


var module = ons.bootstrap('app', ['onsen']);

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

function openExternal(elem) {
    window.open("http://barnsonic.com", "_system");
    return false; // Prevent execution of the default onClick handler 
}

module.controller('AppController',function($scope, $window) {  
    ons.ready(function() {
        $scope.nav = $window.myNavigator
        document.querySelector("#button1").onclick = function(){$scope.nav.pushPage('stereVolume', { animation : 'slide' } );}
    });
});

// Stere ----->>>> volume
module.controller('StereVolumeCtrl', function($scope) {
    $scope.getVolume = function() {
        $scope.volume="";
        $scope.showValidationMessages = true;
        if ($scope.stereVolumeForm.stereInput.$valid && $scope.stereVolumeForm.longBucheInput.$valid){
            $scope.volume = ($scope.stere/getCoeff($scope.longbuche)).toFixed(2);
            $scope.stereCtrl = $scope.stere;
            $scope.longbucheCtrl = $scope.longbuche;
            $scope.showValidationMessages = false;
        }
        return $scope.volume;
    }
    ons.ready(function() {
      // Init code here
        $scope.showValidationMessages = false;
        $scope.volume="";
    });
});

// Dimensions du bucher ---->>> Stere
module.controller('BucherStereCtrl', function($scope) {
    $scope.getStere = function() {
        $scope.stere="";
        $scope.showValidationMessages = true;
        if ($scope.bucherStereForm.longTasInput.$valid && $scope.bucherStereForm.largeTasInput.$valid && $scope.bucherStereForm.hautTasInput.$valid && $scope.bucherStereForm.longBucheInput.$valid){
            $scope.volume = Number($scope.longtas)*Number($scope.largetas)*Number($scope.hauttas);
            $scope.stere = (getCoeff($scope.longbuche)*$scope.volume).toFixed(2);
            $scope.longbucheCtrl = $scope.longbuche;
            $scope.volume = $scope.volume.toFixed(2);
            $scope.showValidationMessages = false;
        }
        return $scope.stere;
    }
    ons.ready(function() {
      // Init code here
        $scope.showValidationMessages = false;
        $scope.stere="";
    });
});

// volume ----->>>> Stere
module.controller('VolumeStereCtrl', function($scope) {
    $scope.getStere = function() {
        $scope.stere="";
        $scope.showValidationMessages = true;
        if ($scope.volumeStereForm.volumeInput.$valid && $scope.volumeStereForm.longBucheInput.$valid){
            $scope.volumeCtrl = Number($scope.volume);
            $scope.stere = (getCoeff($scope.longbuche)*$scope.volumeCtrl).toFixed(2);
            $scope.longbucheCtrl = $scope.longbuche;
            $scope.showValidationMessages = false;
        }
        return $scope.stere;
    }
    ons.ready(function() {
      // Init code here
        $scope.showValidationMessages = false;
        $scope.stere="";
    });
});

// aide
module.controller('AideCtrl', function($scope) {
   
    ons.ready(function() {
      // Init code here
    });
});

// volume ----->>>> Stere
module.controller('AProposCtrl', function($scope) {
    ons.ready(function() {
      // Init code here
    });
});

