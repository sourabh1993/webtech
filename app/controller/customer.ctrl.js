/*
* @Customer controllers module
*/

(function(){

	angular.module("customer_module",["upper_directive","service_module"]);

	angular.module("customer_module").controller("customerInfoController",function($scope){
		 $scope.userInfo=JSON.parse(localStorage.getItem("user"));
	});

	angular.module("customer_module").controller("RestaurantDetailsController",function($scope, $rootScope, $routeParams, RestaurantService){

		//$scope.menuItems = [];
		
		(function() {
			RestaurantService.getRestaurantDetails($routeParams.restaurantName).then(function(result){
				$scope.restaurantDetails = result.data[0];
				$scope.menuitems = $scope.restaurantDetails.menuItems;
				console.log($scope.restaurantDetails);
			});
		})();

		// $rootScope.cartItems = {};
		// $rootScope.currentRestaurant= "";
		// $rootScope.totalPrice = 0;
		$scope.addToCart = function(menuItem, restaurantName) {
			if($rootScope.currentRestaurant==undefined){
				$rootScope.currentRestaurant = restaurantName;
				$rootScope.cartItems = {};
				$rootScope.totalPrice = 0;
			}

			if(restaurantName!=$rootScope.currentRestaurant && Object.keys($rootScope.cartItems).length>0) {
				console.log("Can't add item from this restaurant while cart has items from other restaurants");
			}
			else {
				if($rootScope.cartItems[menuItem.name]==undefined) {
					$rootScope.cartItems[menuItem.name] = 1;
					$rootScope.totalPrice += menuItem.price;
				}
				else {
					$rootScope.cartItems[menuItem.name] += 1;
					$rootScope.totalPrice += menuItem.price;
				}
				$rootScope.totalPrice = Math.round($rootScope.totalPrice*100)/100;
			}
		}


	});



	angular.module("customer_module").controller("customerLoginController",function($scope , $rootScope){


		$scope.userInfo=JSON.parse(localStorage.getItem("user"));
		$scope.newInfo = {};

		$scope.name = null;
		$scope.address = null;

		 $scope.updateCustomer = function () {
		 	$scope.userInfo = {};
		 	$scope.userInfo.name = $scope.name;
		 	$scope.userInfo.address = $scope.address;
		 	console.log($scope.newInfo);
		 	localStorage.setItem("user", JSON.stringify($scope.newInfo));
		 	document.body.style.backgroundImage = 'none';
		 	window.location.replace("#/");
		 };
	
		var init = function () {
		   	document.body.style.backgroundImage = "url('/images/restaurant.jpg')";
			document.body.style.backgroundSize= "cover";

			console.log(localStorage.getItem("user"));
			if( localStorage.getItem("user") &&
				(typeof $rootScope.change!= 'undefined' && $rootScope.change==false)){
				console.log("redirecting");
				document.body.style.backgroundImage = 'none';
				window.location.replace("#/");
			}

			$rootScope.change=false;
		};

		init();
	});

})();
	