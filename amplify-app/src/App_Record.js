import React from 'react';
import {useState} from 'react';
import './App.css';

import {Heading, Text} from '@aws-amplify/ui-react';
import {View, Flex, Card} from '@aws-amplify/ui-react';
import {Button, Badge} from '@aws-amplify/ui-react';
import {TextField, SwitchField} from '@aws-amplify/ui-react';
import {Table, TableCell, TableBody, TableHead, TableRow} from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react/styles.css';
import './styles.css';

import {requestPermission, startRecording, stopRecording, shareData} from "./scripts/activity_record";

import NoSleep from 'nosleep.js';

var noSleep = new NoSleep();

function App() {

    const [started, setStarted] = useState(false);
    const [startButtonText, setStartButtonText] = useState('Start recording');
    const [tableValues, setTableValues] = useState({
        ax: '-',
        ay: '-',
        az: '-',
        aigx: '-',
        aigy: '-',
        aigz: '-',
        rralpha: '-',
        rrbeta: '-',
        rrgamma: '-',
        interval: '-',
        samples: '-'
    });

    const [shareSessionName, setShareSessionName] = useState('data');
    const [shareDisabled, setShareDisabled] = useState(true);
    const [shareResponse, setShareResponse] = useState('');
    const [shareAsText, setShareAsText] = useState(false);

    function HandleRecordButtonClick() {

        requestPermission();

        if (started) { // Button pressed while running.  So it's time to stop.

            console.log('Stopping recording...');
            noSleep.disable();

            stopRecording();

            setStartButtonText('Start');
            setStarted(false);

            setShareDisabled(false);
            setShareResponse('');

            console.log('Stopped');
        } else { // Button pressed while stopped.  So it's time to start.

            console.log('Starting recording...');
            noSleep.enable();

            startRecording(setTableValues);

            setStartButtonText('Stop');
            setStarted(true);

            setShareDisabled(true);
            setShareResponse('');

            console.log('Started');
        }

    }

    return (<View backgroundColor="#f2f3f3" padding="1rem">

        <Flex direction="column" gap="1rem">

            <Heading level={4}>Activity Recorder</Heading>

            <Flex direction="row" gap="0.5rem" wrap="wrap">
                <Badge variation="info">reInvent</Badge>
                <Badge variation="info">Amplify</Badge>
                <Badge variation="info">SageMaker</Badge>
            </Flex>

            <Card variation="elevated">

                <Flex direction="column" gap="1rem">

                    <TextField // descriptiveText="Enter name of session"
                        placeholder="Session name"
                        label="Session"
                        errorMessage="Required"
                        onChange={
                            (e) => setShareSessionName(e.currentTarget.value)
                        }/>

                    <Table caption=""
                        highlightOnHover={false}
                        size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell as="th">Metric</TableCell>
                                <TableCell as="th" className="activity-table-cell-right">Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Accel X</TableCell>
                                <TableCell className="activity-table-cell-right"> {
                                    tableValues.ax
                                }</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Accel Y</TableCell>
                                <TableCell className="activity-table-cell-right"> {
                                    tableValues.ay
                                }</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Accel Z</TableCell>
                                <TableCell className="activity-table-cell-right"> {
                                    tableValues.az
                                }</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Accel (Grav) X</TableCell>
                                <TableCell className="activity-table-cell-right"> {
                                    tableValues.aigx
                                }</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Accel (Grav) Y</TableCell>
                                <TableCell className="activity-table-cell-right"> {
                                    tableValues.aigy
                                }</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Accel (Grav) Z</TableCell>
                                <TableCell className="activity-table-cell-right"> {
                                    tableValues.aigz
                                }</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Alpha</TableCell>
                                <TableCell className="activity-table-cell-right"> {
                                    tableValues.rralpha
                                }</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Beta</TableCell>
                                <TableCell className="activity-table-cell-right"> {
                                    tableValues.rrbeta
                                }</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Gamma</TableCell>
                                <TableCell className="activity-table-cell-right"> {
                                    tableValues.rrgamma
                                }</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Interval</TableCell>
                                <TableCell className="activity-table-cell-right"> {
                                    tableValues.interval
                                }</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Samples</TableCell>
                                <TableCell className="activity-table-cell-right"> {
                                    tableValues.samples
                                }</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <Button variation="primary"
                        isFullWidth={true}
                        onClick={
                            () => HandleRecordButtonClick()
                    }> {startButtonText} </Button>

                    <Text variation="primary" as="div" color="gray" fontSize="1em">
                        Once started, motion is recorded.  When stopped you will have the option to 
                        send the data to yourself for processing.
                    </Text>

                    <Text variation="primary" as="div" color="gray" fontSize="1em">
                        While collecting data, try not to interact with the phone screen.  Taps and swipes may 
                        effect the data collected. 
                    </Text>

                    <Button // variation="primary"
                        isFullWidth={true}
                        isDisabled={shareDisabled}
                        onClick={
                            () => shareData(shareSessionName, shareAsText, setShareResponse) 
                    }>
                        Share Data
                    </Button>

                    <Text variation="error" as="div" color="red" fontSize="1em">
                        {shareResponse}
                    </Text>

                    <SwitchField
                        isDisabled={false}
                        label="Send data as text"
                        labelPosition="start"
                        isChecked={shareAsText}
                        onChange={
                            (e) => setShareAsText(e.target.checked)
                        }/>

                    <Text as="div" color="gray" fontSize="1em">
                    Sending data as CSV attachment is not supported on some phones.  Instead try sending the data as raw text.
                    </Text>
                
                </Flex>

            </Card>

        </Flex>

    </View>);
}

export default App;
