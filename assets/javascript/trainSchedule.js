$(document).ready(function(){
	console.log("ready")

	//When form is filled out, submit to Firebase
	$("#add-schedule").on("click", function(event) {
		event.preventDefault();
		saveSchedule();
	});
})

// Assign the reference to the database to a variable named 'database'
var database = firebase.database();
var trainScheduleRef = database.ref("/trainSchedules");

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
			"frequency": trains.frequency
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

	var names_td = $("<td>").text(train.name);
	var destination_td = $("<td>").text(train.destination);
	var initialDeparture_td = $("<td>").text(train.initialDeparture);
	var frequency_td = $("<td>").text(train.frequency);

	var trains_tr = $("<tr>").append(names_td)
								.append(destination_td)
								.append(initialDeparture_td)
								.append(frequency_td);

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

	//TODO: Clear Inputs
}
