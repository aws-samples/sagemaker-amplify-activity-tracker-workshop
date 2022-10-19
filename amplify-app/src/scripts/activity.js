import {Amplify, API} from 'aws-amplify';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);


var send_timer;
var buffer_timer;
var sample_values = [];

var data_buffer = {}
const data_element_names = [
    'ax',
    'ay',
    'az',
    'aigx',
    'aigy',
    'aigz',
    'rralpha',
    'rrbeta',
    'rrgamma'
];

var send_interval = 5000; // How often to send data to the web service endpoint.
var sample_interval = 1000; // How long to collect data for.  This must be less than the send_interval.

var upDateFunction;

function init_data_buffer() {
    data_buffer = {
        "ax": [],
        "ay": [],
        "az": [],
        "aigx": [],
        "aigy": [],
        "aigz": [],
        "rralpha": [],
        "rrbeta": [],
        "rrgamma": []
    }

    console.log('data_buffer');
    console.log(data_buffer);

}
init_data_buffer();

export function startTracking(passedUpDateFunction) {

    upDateFunction = passedUpDateFunction;
    upDateFunction("Sensing...");
    window.addEventListener("devicemotion", motionHandle);
    send_timer = setInterval(send_data, send_interval);
    buffer_timer = setInterval(calc_std_and_clear_buffer, sample_interval);

}

export function stopTracking() {

    window.removeEventListener("devicemotion", motionHandle);
    clearInterval(send_timer);
    clearInterval(buffer_timer);
    upDateFunction("...");
}

export function requestPermission() {

    // //////////////////////////////////////////////////////////////////////////
    // Request permission to access device motion for iOS 13+ devices
    // //////////////////////////////////////////////////////////////////////////
    if (DeviceMotionEvent && typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission().then(permissionState => {
            if (permissionState === 'granted') {
                console.log('DeviceOrientationEvent permission granted.');
            } else {
                console.log('DeviceOrientationEvent permission DENIED.');
                window.location.replace("./permission");
            }
        }).catch(console.error);
    } else {
        console.log('Not an iOS device.');
    }

}

function motionHandle(event) { /********************************************************
  
        motionHandle
  
        Called by the motion event.  
        Adds observed values to the data buffer.
  
    ********************************************************/

    // Ordering is important here: 
    const tmp = [
        event.acceleration.x,
        event.acceleration.y,
        event.acceleration.z,
        event.accelerationIncludingGravity.x,
        event.accelerationIncludingGravity.y,
        event.accelerationIncludingGravity.z,
        event.rotationRate.alpha,
        event.rotationRate.beta,
        event.rotationRate.gamma,
        event.interval
    ]

    for (var i = 0; i < data_element_names.length; i++) {
        data_buffer[data_element_names[i]].push(tmp[i]);
    }

}

function send_data() { /********************************************************

        send_data

        Sends sample values to the web service endpoint.
        First checks to ensure values exist. 

    ********************************************************/
    console.log('Send data');
    if (sample_values.length > 0) {
        console.log('Sending data...');

        var send_data = "";
        send_data = send_data + data_element_names.join() + "\n";
        send_data = send_data + sample_values.join();

        console.log(send_data);

        const apiName = 'api'; // replace this with your api name.
        const path = '/'; // replace this with the path you have configured on your API
        const myInit = {
            body: send_data, // replace this with attributes you need
        };

        API.post(apiName, path, myInit).then(response => {
            upDateFunction(response);
        }).catch(error => {
            console.log(error.response);
        });

    }
}

function calc_std_and_clear_buffer() { /********************************************************

        calc_std_and_clear_buffer

        For each feature, we calc the standard deviation and
        get the values ready to be sent. 
        We then clear the data buffer. 

    ********************************************************/
    console.log('Calculating std and clearing buffer.');

    var tmp = [];
    for (var i = 0; i < data_element_names.length; i++) {
        tmp.push(getStandardDeviation(data_buffer[data_element_names[i]]));
    }
    sample_values = tmp;

    console.log('Sample values:')
    console.log(sample_values);

    init_data_buffer();
}

// https://stackoverflow.com/questions/7343890/standard-deviation-javascript
function getStandardDeviation(array) {
    const n = array.length
    if (n < 1) {
        return 0;
    }
    const mean = array.reduce((a, b) => a + b) / n
    return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
}
