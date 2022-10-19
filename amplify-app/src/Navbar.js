import React from "react";
import {Link} from "react-router-dom";
import {Flex, View, Card, Text} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function Navbar() {
    return (<View backgroundColor="#f2f3f3" padding="1rem">

        <Flex direction="column" gap="1rem">
            <Card variation="elevated">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Activity Tracker</Link>
                        </li>
                        <li>
                            <Link to="/record">Activity Recorder</Link>
                        </li>
                    </ul>
                </nav>
            </Card>
            <Text fontSize="0.9em">AWS re:Invent 2022</Text>
            <Link to="/licenses">Licenses</Link>
        </Flex>
    </View>);
}

export default Navbar;
