import React from "react";
import {Heading, View} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function Banner() {
    return (<View backgroundColor="darkorange" padding="1rem">
        <Heading color="white"
            level={6}>BOA318 Workshop</Heading>
    </View>);
}

export default Banner;
