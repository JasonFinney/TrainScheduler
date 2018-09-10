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

    var longString = moment()._d;
    var momentapp = longString.toISOString();
    var currenTime = momentapp.slice(11, 16);
    var diffTime = moment.utc(moment(currenTime, "HH:mm").diff(moment(time, "HH:mm"))).format("HH:mm");
    var hours = diffTime.slice(0, 2);
    var convertedhours = Number(hours) - 5;
    var minutes = diffTime.slice(3);
    var minutehours = convertedhours * Number(60);
    var minutehoursPlus = Number(minutehours) + Number(minutes);
    var minutehoursDivide = Math.floor(minutehoursPlus / freaquency);
    var nextTraincoming = minutehoursDivide + 1;
    var nextTraincoming1 = nextTraincoming * freaquency;
    var away = nextTraincoming1 - minutehoursPlus;
    var hoursplace = currenTime.slice(0, 2);
    var hoursplace1 = Number(hoursplace) - 5;
    var minutesplace = currenTime.slice(3);
    var nextTraincomingTime = Number(minutesplace) + Number(away);
    var hoursplace2 = hoursplace1.toString();
    var minutesplace1 = nextTraincomingTime.toString();
    var next = hoursplace2 + ":" + minutesplace1;

    var newTDname = $("<td>");
    newTDname.append(name);
    var newTDdestination = $("<td>");
    newTDdestination.append(destination);
    var newTDfreaquency = $("<td>");
    newTDfreaquency.append(freaquency);
    var newTDnext = $("<td>");
    newTDnext.append(next);
    var newTDaway = $("<td>");
    newTDaway.append(away);
    var newTR = $("<tr>");
    newTR.append(newTDname);
    newTR.append(newTDdestination);
    newTR.append(newTDfreaquency);
    newTR.append(newTDnext);
    newTR.append(newTDaway);
    $("#train-table").append(newTR);

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

var flag = true;

database.ref().on("value", function (snapshot) {
    if (flag) {
        snapshot.forEach(function (childSnapshot) {
            var data = childSnapshot.val();
            console.log(data);
            var name = data.name;
            console.log("Train Name: " + name);
            var destination = data.destination;
            console.log("Train Des: " + destination);
            var time = data.time;
            console.log("First depart time: " + time);
            var freaquency = data.freaquency;
            console.log("Every " + freaquency + "min");
            var longString = moment()._d;
            var momentapp = longString.toISOString();
            var currenTime = momentapp.slice(11, 16);
            var diffTime = moment.utc(moment(currenTime, "HH:mm").diff(moment(time, "HH:mm"))).format("HH:mm");
            var hours = diffTime.slice(0, 2);
            var convertedhours = Number(hours) - 5;
            var minutes = diffTime.slice(3);
            var minutehours = convertedhours * Number(60);
            var minutehoursPlus = Number(minutehours) + Number(minutes);
            var minutehoursDivide = Math.floor(minutehoursPlus / freaquency);
            var nextTraincoming = minutehoursDivide + 1;
            var nextTraincoming1 = nextTraincoming * freaquency;
            var away = nextTraincoming1 - minutehoursPlus;
            var hoursplace = currenTime.slice(0, 2);
            var hoursplace1 = Number(hoursplace) - 5;
            var minutesplace = currenTime.slice(3);
            var nextTraincomingTime = Number(minutesplace) + Number(away);
            var hoursplace2 = hoursplace1.toString();
            var minutesplace1 = nextTraincomingTime.toString();
            var next = hoursplace2 + ":" + minutesplace1;

            var newTDname = $("<td>");
            newTDname.append(name);
            var newTDdestination = $("<td>");
            newTDdestination.append(destination);
            var newTDfreaquency = $("<td>");
            newTDfreaquency.append(freaquency);
            var newTDnext = $("<td>");
            newTDnext.append(next);
            var newTDaway = $("<td>");
            newTDaway.append(away);
            var newTR = $("<tr>");
            newTR.append(newTDname);
            newTR.append(newTDdestination);
            newTR.append(newTDfreaquency);
            newTR.append(newTDnext);
            newTR.append(newTDaway);
            $("#train-table").append(newTR);
        });
        flag = false;
    };
});
