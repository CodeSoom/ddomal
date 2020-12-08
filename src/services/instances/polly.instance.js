import AWS from 'aws-sdk';

AWS.config.region = process.env.AWS_REGION;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({ IdentityPoolId: process.env.AWS_ID });

const polly = new AWS.Polly({ apiVersion: '2016-06-10' });

export default polly;
