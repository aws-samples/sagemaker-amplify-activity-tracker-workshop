
# MIT No Attribution

# Copyright 2022 Amazon Web Services

# Permission is hereby granted, free of charge, to any person obtaining a copy of this
# software and associated documentation files (the "Software"), to deal in the Software
# without restriction, including without limitation the rights to use, copy, modify,
# merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
# permit persons to whom the Software is furnished to do so.

# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
# INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
# PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
# HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
# OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
# SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import json, os
import boto3

def handler(event, context):
    
    # Print out the event (for debugging)
    # It can help to grab a copy of this from CloudWatch and 
    # add it in as a test case in the Lambda console.
    print(json.dumps(event))
    
    # Get the input from the client.
    event_body = event['body'].replace('"', '')
    event_body = event_body.replace("\\n", '\n')
    print(event_body)
    
    labels = os.environ['LABELS'].split(',')

    # Send the input to the hosted SageMaker endpoint.
    sm = boto3.client('sagemaker-runtime')
    response = sm.invoke_endpoint(
        EndpointName=os.environ['SMENDPOINTNAME'],
        Body=event_body,
        ContentType='text/csv' 
    )
    
    # The response from SageMaker is a pointer to a StreamingBody object.
    # We need to read from that object to get the actual result.
    response_body_object = response['Body']
    response_data = response_body_object.read()
    response = response_data.decode("utf-8")
    
    output_layer = [float(x) for x in response.split(',')]
    label_index = output_layer.index(max(output_layer))
    
    prediction = labels[label_index]
    
    # Return the response to the client.
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(prediction)
    }