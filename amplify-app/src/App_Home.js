import React from 'react';
import {useState} from 'react';
import './App.css';

import {Heading, Text} from '@aws-amplify/ui-react';
import {View, Flex, Card} from '@aws-amplify/ui-react';
import {Button, Badge} from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react/styles.css';
import './styles.css';

import { FaWalking, FaChair, FaRunning, FaCar, FaBed, FaRegQuestionCircle } from 'react-icons/fa';
import { MdDirectionsBike } from 'react-icons/md';
import {GiDesk } from 'react-icons/gi';

import {requestPermission, startTracking, stopTracking} from "./scripts/activity";

import NoSleep from 'nosleep.js';

var noSleep = new NoSleep();

function App() {

    const [started, setStarted] = useState(false);
    const [startButtonText, setStartButtonText] = useState('Start');
    const [activityLabelText, setActivityLabelText] = useState('...');

    function HandleButtonClick() {

        requestPermission();

        if (started) {
            console.log('Stopping...');
            noSleep.disable();
            stopTracking();
            setStartButtonText('Start');
            setStarted(false);
            console.log('Stopped');
        } else {
            console.log('Starting...');
            noSleep.enable();
            startTracking(setActivityLabelText);
            setStartButtonText('Stop');
            setStarted(true);
            console.log('Started');
        }

    }

    function getIcon(activity){

        switch(activity) {
            case 'walk':
              return(<FaWalking size="10rem"/>);
            case 'run':
              return(<FaRunning size="10rem"/>);
            case 'recline':
                return(<FaBed size="10rem"/>);
            case 'bike':
                return(<MdDirectionsBike size="10rem"/>);
            case 'car':
                return(<FaCar size="10rem"/>);
            case 'sit':
                return(<FaChair size="10rem"/>);
            case 'desk':
                return(<GiDesk size="10rem"/>);
            default:
              return(<FaRegQuestionCircle color="lightgray" size="10rem"/>);
          }

    }

    return (<View backgroundColor="#f2f3f3" padding="1rem">

        <Flex direction="column" gap="1rem">

            <Heading level={4}>Activity Tracker</Heading>

            <Flex direction="row" gap="0.5rem" wrap="wrap">
                <Badge variation="info">reInvent</Badge>
                <Badge variation="info">Amplify</Badge>
                <Badge variation="info">SageMaker</Badge>
            </Flex>

            <Card variation="elevated">

                <Flex direction="column" alignItems="center" gap="1rem">

                    {getIcon(activityLabelText)}

                    <Text className="activity-text" variation="primary" as="div" color="black" lineHeight="2.5em" fontSize="1em"> {activityLabelText} </Text>

                    <Button variation="primary"
                        isFullWidth={true}
                        onClick={
                            () => HandleButtonClick()
                    }> {startButtonText} </Button>

                    <Text variation="primary" as="div" color="gray" fontSize="1em">
                        Once started, motion is recorded and periodically sent to the service endpoint.  
                                    Allow the prediction to settle before changing activity.
                    </Text>

                </Flex>

            </Card>

        </Flex>

    </View>);
}

export default App;
