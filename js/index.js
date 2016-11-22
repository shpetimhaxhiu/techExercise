var usersApp = angular.module('usersApp', []);


// Header Controller
usersApp.controller("HeaderController", function($scope, $location) {
	$scope.appDetails = {};
	$scope.appDetails.title = "Users List";
});



// User List Controller
usersApp.controller("UsersListController", function($scope, $http){
	$scope.saved = localStorage.getItem('usersApp');
	$scope.userRepositories = "";
	$scope.users = "";



	// If there are users get them
	if(localStorage.getItem('usersApp')!==null) {
		$scope.users = JSON.parse($scope.saved);	
	} 
	else {
		// Add sample data to localstorage
		$scope.users = [ 
			{id: "1", firstName: "Shpetim", lastName: "Haxhiu", gitHubId: "shpetimhaxhiu", email: "shpetim.h@gmail.com"},
			{id: "2", firstName: "Betim", lastName: "Kovanxhiu", gitHubId: "OpenFibers", email: "shpetim.h@gmail.com"},
			{id: "3", firstName: "Dren", lastName: "Shporta", gitHubId: "fatlotus", email: "shpetim.h@gmail.com"},
			{id: "4", firstName: "Ariana", lastName: "Bekteshi", gitHubId: "waveto", email: "bekteshiariana@gmail.com"},			]
	};

	// Send results to localstorage
	localStorage.setItem('usersApp', JSON.stringify($scope.users));

	


	// Insert function 
	$scope.insertUser = function() {
		// Add user to array of users
		$scope.users.push({
			id: generateGuid(),
			firstName: $scope.firstName,
			lastName: $scope.lastName,
			gitHubId: $scope.gitHubId,
			email: $scope.email
		});

		// Add users array to localstorage
		localStorage.setItem('usersApp', JSON.stringify($scope.users));

		$scope.result = "Data saved successfuly.";

		$scope.firstName = "";
		$scope.lastName = "";
		$scope.gitHubId = "";
		$scope.email = "";

		$('#addNewsUserForm').modal('hide');

	};



	// Delete User Function
	$scope.deleteUser = function(usrId) {
		var result = $.grep($scope.users, function(e){ 
			return e.id == usrId; 
		});

		console.log(usrId);

		if (result.length === 0) {
		  // not found
		  console.log("User not found");
		} else if (result.length == 1) {
		  // access the foo property using result[0].foo
		  console.log("User found");
		  console.log(result[0].id, result[0].firstName);
		  console.log($scope.users);

		  var i = $scope.users.indexOf(result[0]);
			if(i != -1) {
				$scope.users.splice(i, 1);
				localStorage.setItem('usersApp', JSON.stringify($scope.users));

			}
			console.log($scope.users);
		} else {
		  // multiple items found
		}

	}


	$scope.editUser = function(userId) {

		var result = $.grep($scope.users, function(e){ 
			return e.id == userId; 
		});



		if (result.length === 0) {
		  // not found
		  console.log("User not found");

		} else if (result.length == 1) {
		  // access the foo property using result[0].foo
		  console.log("User found");
		  console.log(result[0].id, result[0].firstName);


		// Fill the form
		  $scope.id = result[0].id;
		  $scope.firstName = result[0].firstName;
		  $scope.lastName = result[0].lastName;
		  $scope.gitHubId = result[0].gitHubId;
		  $scope.email = result[0].email;


		  $scope.theUser = result[0];
		  console.log($scope.theUser);
		  
		  var i = $scope.users.indexOf(result[0]);

		  
			// if(i != -1) {
			// 	$scope.users.splice(i, 1);
			// 	localStorage.setItem('todos', JSON.stringify($scope.users));

			// }
			// console.log($scope.users);
		} else {
		  // multiple items found
		}


		$('#editUserForm').modal('show');
	}

	$scope.saveUser = function(userId) {
		var result = $.grep($scope.users, function(e){ 
			return e.id == userId; 
		});



		if (result.length === 0) {
		  // not found
		  console.log("User not found");
		  console.log(result);


		} else if (result.length == 1) {
		  // access the foo property using result[0].foo
		  console.log("User found");
		  console.log("rezultati: " +result);

		} else {
			console.log("Multiple Users with the same ID");
		  	console.log(result);

		}

		var i = $scope.users.indexOf(result[0]);
			if(i != -1) {
				$scope.users[i] = ({
					id: $scope.id,
					firstName: $scope.firstName,
					lastName: $scope.lastName,
					gitHubId: $scope.gitHubId,
					email: $scope.email
				});
				console.log("e" +$scope.users[i]);
				console.log("scope: " +$scope.users);

				localStorage.setItem('usersApp', JSON.stringify($scope.users));

			}
			console.log($scope.users);
			console.log($scope.users[0]);



			$('#editUserForm').modal('hide');







		localStorage.setItem('todos', JSON.stringify($scope.users));
		$scope.result = "Data saved successfuly.";
	}


	$scope.viewUser = function(userId) {

		var result = $.grep($scope.users, function(e){ 
			return e.id == userId; 
		});



		if (result.length === 0) {
		  // not found
		  console.log("User not found");

		} else if (result.length == 1) {
			// access the foo property using result[0].foo
			console.log("User found");
			console.log(result[0].id, result[0].firstName);


			// Fill the form
			$scope.id = result[0].id;
			$scope.firstName = result[0].firstName;
			$scope.lastName = result[0].lastName;
			$scope.gitHubId = result[0].gitHubId;
			$scope.email = result[0].email;

			var i = $scope.users.indexOf(result[0]);

		} else {
		  // multiple items found
		}
		getRepos(result[0].gitHubId);
		$('#viewUserForm').modal('show');
	}


	function getRepos(userGitHubId){
	console.log("Repoz funcc");
		$http.get("https://api.github.com/users/" +userGitHubId+"/repos")
		    .then(function(response) {
		    	if(response.data.message == 'Not Found') {
		    		$scope.userRepositories = [{full_name: "There was a problem fetching data from GitHub"}];
		    	}
		    	else {

			        $scope.userRepositories = response.data;

			    	console.log(response.status);
			    	console.log(response.data);
			        console.log($scope.userRepositories);
		    	}
		    });
		}

	function generateGuid() {
	  var result, i, j;
	  result = '';
	  for(j=0; j<32; j++) {
	    if( j == 8 || j == 12|| j == 16|| j == 20) 
	      result = result + '-';
	    i = Math.floor(Math.random()*16).toString(16).toUpperCase();
	    result = result + i;
	  }
	  return result;
	}


});




