$(document).ready(function(){
	console.log("ready")

	//When form is filled out, submit to Firebase
	$("#add-schedule").on("click", function(event) {
		event.preventDefault();
		saveSchedule();
	});

	$("#sign-in").on("click", function(event) {
		event.preventDefault();
		signIn_Github();
	});
})

// Assign the reference to the database to a variable named 'database'
var database = firebase.database();
var trainScheduleRef = database.ref("/trainSchedules");
var provider = new firebase.auth.GithubAuthProvider();

//Read Database
trainScheduleRef.on("child_added", function(snapshot) {
	trains = snapshot.val();
	var train;
	displaySchedule(snapshot, trains)
})

function displaySchedule(snapshot, trains) {
	if (snapshot.child("name").exists() && snapshot.child("destination").exists()) {
		var train = {
			"name": trains.name,
			"destination": trains.destination,
			"initialDeparture": trains.initialDeparture,
			"frequency": trains.frequencyRoute,
			"minutesPassed":  moment().diff(moment(trains.initialDeparture, 'HH:mm'), "minutes")
		}
	}
	else {
		var train = {
			"name": "None",
			"destination": "--",
			"initialDeparture": "--",
			"frequency": "0"
		}
	}
	console.log(train);
	var lastArrival = train.minutesPassed % train.frequency; //minutes ago
	var lastArrivalTime = moment().diff(lastArrival, "minutes");
	var minutesAway = train.frequency - lastArrival; //in minutes
	
	console.log(lastArrival);
	console.log(moment(lastArrivalTime));
	var names_td = $("<td>").text(train.name);
	var destination_td = $("<td>").text(train.destination);
	var initialDeparture_td = $("<td>").text(train.initialDeparture);
	var frequency_td = $("<td>").text(train.frequency);
	var lastArrivalTime_td = $("<td>").text(moment(lastArrivalTime).format("HH:mm"));
	var minutesAway_td = $("<td>").text(minutesAway);


	var trains_tr = $("<tr>").append(names_td)
								.append(destination_td)
								.append(initialDeparture_td)
								.append(frequency_td)
								.append(lastArrivalTime_td)
								.append(minutesAway_td);

	$("#trains > tbody").append(trains_tr);
}

function saveSchedule(){
	var name = $("#trainName-input").val();
	var destination = $("#destination-input").val();
	var initialDeparture = $("#initialDeparture-input").val();
	var frequencyRoute = $("#frequencyRoute-input").val();

	trainScheduleRef.push({
		"name": name,
		"destination": destination,
		"initialDeparture": initialDeparture,
		"frequencyRoute": frequencyRoute
	});

}


function signIn_Github() {
	firebase.auth().signInWithPopup(provider).then(function(result) {
		// This gives you a GitHub Access Token. You can use it to access the GitHub API.
		var token = result.credential.accessToken;
		// The signed-in user info.
		var user = result.user;
		console.log(user)
	}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// The email of the user's account used.
		var email = error.email;
		// The firebase.auth.AuthCredential type that was used.
		var credential = error.credential;
		console.log(error);
	});
}
