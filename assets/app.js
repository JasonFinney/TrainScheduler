var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();
    var name = $("#train-name-input").val();
    var destination = $("#destination-input").val();
    var time = $("#first-train-time-input").val();
    var freaquency = $("#freaquency-input").val();

    var newTrain = {
        name,
        destination,
        time,
        freaquency
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.freaquency);

    alert("Train Schedule Updated");

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#freaquency-input").val("");

});

database.ref().on("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        var data = childSnapshot.val();
        console.log(data);
        var name = data.name;
        console.log(name);
        var destination = data.destination;
        console.log(destination);
        var time = data.time;
        console.log(time);
        var freaquency = data.freaquency;
        console.log(freaquency);

        var diffTime1 = moment().diff(moment(time), "minutes");
        console.log("let's try this: " + diffTime1);
        var tRemainder = diffTime1 % freaquency;
        console.log(tRemainder);
        var nextTrain = freaquency - tRemainder;
        console.log(nextTrain);
        var next1 = moment().add(nextTrain, "minutes");
        var next = moment(next1).format("hh:mm");
        console.log(next);


        var momentapp = moment().toISOString();
        var currenTime = momentapp.slice(11, 16);
        console.log(momentapp);
        console.log(currenTime);
        var diffTime = moment.utc(moment(currenTime, "HH:mm").diff(moment(time, "HH:mm"))).format("HH:mm");
        console.log(diffTime);
        var hoursTime = time.slice(0, 2);
        console.log(hoursTime);
        var hours = diffTime.slice(0, 2);
        console.log(hours);
        var minutes = diffTime.slice(3);
        console.log(minutes);
        var minutehours = hours * Number(60);
        console.log(minutehours);
        var minutehoursPlus = Number(minutehours) + Number(minutes);
        console.log(minutehoursPlus);
        var minutehoursRemainder = Math.floor(minutehoursPlus % freaquency);
        console.log(minutehoursRemainder);
        var minutehoursDivide = Math.floor(minutehoursPlus / freaquency);
        console.log(minutehoursDivide);
        var minutehoursDividePlus = minutehoursDivide + Number(freaquency);
        console.log(minutehoursDividePlus);
        var thisIsGettingRidiculous = minutehoursDividePlus * freaquency;
        console.log(thisIsGettingRidiculous);
        var thisIsGetting = thisIsGettingRidiculous - Number(minutes);
        console.log(thisIsGetting);
        var thisIs = Math.floor(thisIsGetting / Number(60)) + Number(hoursTime);
        console.log(thisIs);



        var newTDname = $("<td>");
        newTDname.append(name);
        console.log(newTDname);
        var newTDdestination = $("<td>");
        newTDdestination.append(destination);
        console.log(newTDdestination);
        var newTDfreaquency = $("<td>");
        newTDfreaquency.append(freaquency);
        console.log(newTDfreaquency);
        var newTDnext = $("<td>");
        newTDnext.append(next);
        console.log(newTDnext);
        var newTDaway = $("<td>");
        newTDaway.append(minutehoursRemainder);
        console.log(newTDaway);
        var newTR = $("<tr>");
        newTR.append(newTDname);
        newTR.append(newTDdestination);
        newTR.append(newTDfreaquency);
        newTR.append(newTDnext);
        newTR.append(newTDaway);
        console.log(newTR);
        $("#train-table").append(newTR);
    });
});
