
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB4qwAlv7TWZTKsI86R29AMFWUsjGvkHcc",
    authDomain: "train-scheduler-cb990.firebaseapp.com",
    databaseURL: "https://train-scheduler-cb990.firebaseio.com",
    storageBucket: "train-scheduler-cb990.appspot.com",
    messagingSenderId: "536257464300"
  };
  
  firebase.initializeApp(config);
	
	//Create a variable to reference database
  	var database = firebase.database();

  //Capture Submit Button Click
  $("#add-train").on("click", function(event) {
  	event.preventDefault();
  	
  	//Grab values from text boxes
  	var trainName = $("#train-name").val().trim();
  	var trainDest = $("#destination").val().trim();
  	var trainTime = moment($("#train-time").val().trim(), "HH:mm").subtract(10, "years").format("X");
  	var trainFreq = $("#frequency").val().trim();
  	
  	//Creating local object stores train data
  	var newTrain = {
  		train_name: trainName,
  		destination: trainDest,
  		train_time: trainTime,
  		frequency: trainFreq,
 	};

	//Upload new train data into database
	database.ref().push(newTrain);

  	//Console log snapshot
  	console.log(newTrain.train_name);
  	console.log(newTrain.destination);
  	console.log(newTrain.train_time);
  	console.log(newTrain.frequency);


  	//Clears text input fields
  	$("#train-name").val("");
  	$("#destination").val("");
  	$("#train-time").val("");
  	$("#frequency").val("");

  	return false;
 
 });

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
	

	console.log(childSnapshot.val());

	//Store data into variables
	var trainName = childSnapshot.val().train_name;
	var trainDest = childSnapshot.val().destination;
	var trainTime = childSnapshot.val().train_time;
	var trainFreq = childSnapshot.val().frequency;

	//Log the train info
	console.log(trainName);
	console.log(trainDest);
	console.log(trainTime);
	console.log(trainFreq);

	var trainTimeDone = moment().diff(moment.unix(trainTime), "minutes");
	var remainingMin = moment().diff(moment.unix(trainTime), "minutes")  % trainFreq;
	var minutes = trainFreq - remainingMin;
	var arrivalTime = moment().add(minutes, "m").format("hh:mm A");

	//Add each train data to the the table
  	$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" +
  	 trainDest + "</td><td>" + trainFreq + "</td><td>" + arrivalTime +
  	  "</td><td>" + minutes + "</td>");

});

