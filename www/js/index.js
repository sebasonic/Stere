var module = ons.bootstrap('my-app', ['onsen']);

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

module.controller('AppController', function($scope) { });

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