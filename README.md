/*
Written by Alessandro Infurna
*/

# Cordova NSR Plugin

The plugin has functions that allows your app to have bidirectional communication with Samsung Gear 3 Series Tizen  applications and Cordova applications.

## Installation
With Cordova CLI, from npm:

$ cordova plugin add https://ale_infu@bitbucket.org/ale_infu/aleinfugear.git
$ phonegap plugin add https://ale_infu@bitbucket.org/ale_infu/aleinfugear.git

## Usage

GalaxyGear.onConnect(function(data) {
		console.log("OK");
		console.log(JSON.stringify(data));
		
		GalaxyGear.onDataReceived({},function(data) {
				console.log("OK");
				console.log(JSON.stringify(data));
			},function(error) {
				console.log("KO");
				console.log(JSON.stringify(error));
		});	
		
	},function(error) {
		console.log("KO");
		console.log(JSON.stringify(error));
});


GalaxyGear.onConnect(function(data) {
		console.log("OK");
		console.log(JSON.stringify(data));
		
		GalaxyGear.sendData({"int": 1, "message": "Messaggio di prova"},true,function(data) {
				console.log("OK");
				console.log(JSON.stringify(data));
			},function(error) {
				console.log("KO");
				console.log(JSON.stringify(error));
		});
		
	},function(error) {
		console.log("KO");
		console.log(JSON.stringify(error));
});


## Protocols

JSON Object Protocol example

    var commands = ["$connect:", "$start:", "$pause:", "$stop:", "$get_data:"];

	//from Tizen to Android
    var exReceivedObj = {

        'command': '$start:',
        'payload': [{
                    max_speed: 23,
                    dislivello: 2,
                    nr_discesa: 13,
                    altitudine: 2000,
                    total_time: 15*60*000,
                    message: "free text..."
        }, {}, ...]

    };

	//from Android to Tizen
    var exSentObj = {

        'payload': [{
            max_speed: 23,
            dislivello: 2,
            nr_discesa: 13,
            altitudine: 2000,
            total_time: 15*60*000, //15min in millisecs
            message: "free text..."
        }, {}, ...];
