import React from 'react';

import {Heading} from '@aws-amplify/ui-react';
import {View, Flex, Card} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './styles.css';

function App() {

    return (<View backgroundColor="#f2f3f3" padding="1rem">

        <Flex direction="column" gap="1rem">

            <Heading level={4}>Licenses</Heading>

            <Card variation="elevated">

                <div>Activity Tracker App<br/>
                <br/>
                MIT No Attribution<br/>
                <br/>
                Copyright 2022 Amazon Web Services<br/>
                <br/>
                Permission is hereby granted, free of charge, to any person obtaining a copy of this
                software and associated documentation files (the "Software"), to deal in the Software
                without restriction, including without limitation the rights to use, copy, modify,
                merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
                permit persons to whom the Software is furnished to do so.<br/>
                <br/>
                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
                INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
                HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
                OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
                SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.<br/><br/></div>

                <div>---------------------------<br/><br/></div>

                <div>NoSleep.js - https://github.com/richtr/NoSleep.js/<br/>
                <br/>
                The MIT License (MIT)<br/>
                <br/>
                Copyright (c) Rich Tibbett<br/>
                <br/>
                Permission is hereby granted, free of charge, to any person obtaining
                a copy of this software and associated documentation files (the
                "Software"), to deal in the Software without restriction, including
                without limitation the rights to use, copy, modify, merge, publish,
                distribute, sublicense, and/or sell copies of the Software, and to
                permit persons to whom the Software is furnished to do so, subject to
                the following conditions:<br/>
                <br/>
                The above copyright notice and this permission notice shall be
                included in all copies or substantial portions of the Software.<br/>
                <br/>
                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
                EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
                MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
                NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
                LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
                OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
                WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                </div>

            </Card>

        </Flex>

    </View>);
}

export default App;
