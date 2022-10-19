import React from 'react';

import {Heading} from '@aws-amplify/ui-react';
import {View, Flex, Card} from '@aws-amplify/ui-react';
import {Image} from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react/styles.css';
import './styles.css';

function App() {

    return (<View backgroundColor="#f2f3f3" padding="1rem">

        <Flex direction="column" gap="1rem">

            <Heading level={4}>&#x26A0; iOS Needs Permission</Heading>

            <Card variation="elevated">

                <div>On iOS devices, the tracker needs permission to access 
                                 motion and orientation data.</div>

                <div>When you see a dialogue that looks like this image, you 
                                 will need to tap 'Allow' for the tracker to work.</div>

                <Image padding="2rem" src="./img/dialogue.jpg"/>

                <div>The Tracker does not have access to motion and orientation 
                                 data on this device.  To enable this access, follow the 
                            steps here to reset site data, and retry the 
                                 tracker.</div>

                <div>Follow these steps:</div>
                <ul>
                    <li>iOS Settings</li>
                    <li>Safari</li>
                    <li>Advanced</li>
                    <li>Website Data</li>
                    <li>Search for or scroll to 'amplifyapp.com'.</li>
                    <li>Tap Edit (top right)</li>
                    <li>Tap '<span role="img" aria-label="(-)">&#9940;</span> amplifyapp.com</li>
                    <li>Confirm delete</li>
                    <li>Try the Tracker again:
                        <a href="index.html">Data Logger</a>
                    </li>
                </ul>

            </Card>

        </Flex>

    </View>);
}

export default App;
