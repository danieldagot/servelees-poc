import type { AWS } from '@serverless/typescript';

import {pre} from '@functions/index';

const serverlessConfiguration: AWS = {
  service: 'aws-serverless-typescript-api',
  frameworkVersion: '3',
   
  plugins: ['serverless-esbuild','serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    region : "us-east-1",
     
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  "resources": {
    "Resources": {
        "WeightTrackerDynamoDBTable": {
            "Type": "AWS::DynamoDB::Table",
            "Properties": {
                "TableName": "weight-tracker",
                "AttributeDefinitions": [
                    {
                        "AttributeName": "username",
                        "AttributeType": "S"
                    },
                ],
                "KeySchema": [
                    {
                        "AttributeName": "username",
                        "KeyType": "HASH"
                    }
                ],
                "ProvisionedThroughput": {
                    "ReadCapacityUnits": 1,
                    "WriteCapacityUnits": 1
                }
            }
        },
        "WeightTrackerUserPool": {
            "Type": "AWS::Cognito::UserPool",
            "Properties": {
                
                "UserPoolName": "weight-tracker-user-pool",
                // "AutoVerifiedAttributes": [
                //     "email"
                // ],
                "Policies": {
                    "PasswordPolicy": {
                        "MinimumLength": 8,
                        "RequireUppercase": false,
                        "RequireLowercase": false,
                        "RequireNumbers": false,
                        "RequireSymbols": false
                    }
                },
                "Schema": [
                    {
                        "Name": "name",
                        "AttributeDataType": "String",
                        "Mutable": true,
                        "Required": false
                    }
                ]
            }
        }
    }
},
  // import the function via paths
  functions: { pre },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
