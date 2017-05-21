$(document).ready(function(){
	console.log("ready")

	//When form is filled out, submit to Firebase
	$("#add-schedule").on("click", function(event) {
		event.preventDefault();
	});
})

// Assign the reference to the database to a variable named 'database'
var database = firebase.database();
var trainScheduleRef = database.ref("/trainSchedule");

//Read Database
trainScheduleRef.on("value", function(snapshot) {
	trains = snapshot.val();
	if (snapshot.child("name").exists() && snapshot.child("destination").exists()) {
		var train = {
			"name": trains.name,
			"destination": trains.destination,
			"frequency": trains.frequency
		}
	}
	else {

	}


});

function saveSchedule(){
	var name = "name3";
	var destination = "destination3";
	var frequency = "frequency3";

	trainScheduleRef.child("newentry2").set({
		"name": name,
		"destination": destination,
		"frequency": frequency
	});
}
