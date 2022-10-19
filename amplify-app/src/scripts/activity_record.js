import {Amplify} from 'aws-amplify';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig);

var sample_values = [];

var data_buffer = {}
var buffer_timer;
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

var sample_interval = 1000; // How long to collect data for.  This must be less than the send_interval.

var upDateFuntion;

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
}
init_data_buffer();

export function startRecording(passedUpDateFuntion) {

    upDateFuntion = passedUpDateFuntion;

    init_data_buffer();
    sample_values = [];

    upDateFuntion("Sensing...");
    window.addEventListener("devicemotion", motionHandle);

    // Start the timer used to send data.
    buffer_timer = setInterval(calc_std_and_clear_buffer, sample_interval);
}

export function stopRecording() {

    window.removeEventListener("devicemotion", motionHandle);
    clearInterval(buffer_timer);

}

export function requestPermission() { // Request permission to access device motion for iOS 13+ devices
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

function motionHandle(event) {
    /********************************************************
  
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

    const round = 2;

    upDateFuntion({
        ax: Number(
            (tmp[0]).toFixed(round)
        ),
        ay: Number(
            (tmp[1]).toFixed(round)
        ),
        az: Number(
            (tmp[2]).toFixed(round)
        ),
        aigx: Number(
            (tmp[3]).toFixed(round)
        ),
        aigy: Number(
            (tmp[4]).toFixed(round)
        ),
        aigz: Number(
            (tmp[5]).toFixed(round)
        ),
        rralpha: Number(
            (tmp[6]).toFixed(round)
        ),
        rrbeta: Number(
            (tmp[7]).toFixed(round)
        ),
        rrgamma: Number(
            (tmp[8]).toFixed(round)
        ),
        interval: Number(
            (tmp[9]).toFixed(round)
        ),
        samples: `${
            data_buffer['ax'].length
        }/${
            sample_values.length
        }`
    });

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
        if (data_buffer[data_element_names[i]].length > 0) {
            tmp.push(getStandardDeviation(data_buffer[data_element_names[i]]));
        }
    }
    if (tmp.length > 0) {
        sample_values.push(tmp.join());
    }
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

export function shareData(shareSessionName, shareAsText, setShareResponse) {

    sample_values.unshift(data_element_names);

    console.log(`Atempting to share data ${shareSessionName}`);
    console.log(`Data: ${sample_values}`);

    setShareResponse('');

    if (!navigator.canShare) {
        setShareResponse("Sorry - Your browser doesn't support the Web Share API.");
        return
    }

    if (shareAsText) {

        if (navigator.share) {
            navigator.share({title: `Data: ${shareSessionName}.csv`, text: sample_values.join("\n")}).then(() => setShareResponse('Successful share')).catch((error) => setShareResponse(`Sorry - Unable to share data. Error: ${
                error.message
            }`));
        } else {
            setShareResponse("Sorry - Your system doesn't support sharing.");
        }

    } else {

        var file = new File([sample_values.join("\n")], `${shareSessionName}.csv`);

        if ( navigator.share ) {
            navigator.share(
                {
                    files: [file], 
                    title: `Data: ${shareSessionName}.csv`, 
                    text: `Activity data:\t${shareSessionName}\nLines:\t\t${sample_values.length}\n\nEnjoy!`
                }
            ).then(
                () => setShareResponse('Successful share')).catch((error) => setShareResponse(`Sorry - Unable to share data. Error: ${error.message}`)
            );        
        } else {
            setShareResponse("Sorry - Your system doesn't support sharing text file attachments.  Try Sending as raw text.");
        }

    }

}
