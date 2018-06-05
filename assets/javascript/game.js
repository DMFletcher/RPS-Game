// Initialize Firebase
var config = {
    apiKey: "AIzaSyDTSgKRNk5byObO_v1bgJ_RXITZlTC9c5o",
    authDomain: "trainschedule-5987c.firebaseapp.com",
    databaseURL: "https://trainschedule-5987c.firebaseio.com",
    projectId: "trainschedule-5987c",
    storageBucket: "trainschedule-5987c.appspot.com",
    messagingSenderId: "1021724447113"
};
firebase.initializeApp(config);
var database = firebase.database();
var dbRef = database.ref("Trains/");
var members;

dbRef.on('child_added', function (childSnapshot) {
    var snap = childSnapshot.val();
    console.log(snap);
    var time = snap.StartTime;

    var frequency = snap.Frequency;
    //console.log(frequency);
    var nowTime = moment().format('L');
    //console.log(moment(time).toNow());
    //console.log(moment(time).diff(moment(), "minutes"));
    
    console.log(time, "\n", nowTime, "\n", frequency);
    //console.log(moment.unix(time), "\n", nowTime, "\n", frequency);
    var timeArray = time.split(':');
    var nowTimeArray = nowTime.split('/');
    var toMomentArray = moment().hours(timeArray[0]).minutes(timeArray[1]);
    console.log(toMomentArray);
    var firstTrain = moment(toMomentArray).unix();
    var unixNowTime = moment().unix();
    var unixFrequency = frequency  * 60;
    var yourTime;
    console.log(firstTrain , "\n" ,
                unixNowTime , "\n" ,
                unixFrequency);
    if (firstTrain > unixNowTime){
        yourTime = moment.unix(firstTrain).format('HH:MM');
        console.log("your train will depart at :" + yourTime);

    }else{
        while(firstTrain < unixNowTime){
            console.log(firstTrain);
            firstTrain += unixFrequency;
        }
        yourTime = moment.unix(firstTrain).format('HH:MM');
    }

    console.log(yourTime);

    //var nextTrain = youtTime;

    var row = $("<tr>").attr({
        class: "info-row"
    });
    var nameCell = $("<td>").attr({
        class: "info-cell"
    });
    var destinationCell = $("<td>").attr({
        class: "info-cell"
    });
    var startCell = $("<td>").attr({
        class: "info-cell"
    });
    var rateCell = $("<td>").attr({
        class: "info-cell"
    });
    var nextCell = $("<td>").attr({
        class: "info-cell"
    });

    $(nameCell).text(snap.Name);
    $(destinationCell).text(snap.Destination);
    $(startCell).text(snap.StartTime);
    $(rateCell).text(frequency);
    $(nextCell).text(yourTime);
    $(row).append(nameCell, destinationCell, startCell, rateCell, nextCell);
    $("#table-body").append(row);


})

$("#submit-button").on('click', function (e) {

    train = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    startTime = $("#train-start").val().trim();
    frequency = $("#frequency").val().trim();

    alert(train);

    database.ref('Trains/').push({
        Name: train,
        Destination: destination,
        StartTime: startTime,
        Frequency: frequency
    });
});