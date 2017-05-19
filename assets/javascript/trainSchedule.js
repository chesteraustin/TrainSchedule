$(document).ready(function(){
	console.log("ready")
})

// Assign the reference to the database to a variable named 'database'
var database = firebase.database();
var trainScheduleRef = database.ref("/trainSchedule");

//Read Database
trainScheduleRef.on("value", function(snapshot) {
	trains = snapshot.val();
	console.log(trains);
});
