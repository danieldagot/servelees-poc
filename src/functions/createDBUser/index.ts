import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';



import { DynamoDB } from 'aws-sdk';

export interface UserInfo {
  username : string  
  height: number;
  weight: number;
  age: number;
  gender: string;
  bmi: number;
  bmr: number;
}

const dynamodb = new DynamoDB({ region: 'us-west-2' });

export async function putUserInfo(userInfo: UserInfo): Promise<void> {
  const tableName = 'UserTable';

  const itemParams: DynamoDB.Types.PutItemInput = {
    Item: {
      userId: { S: '1' }, // Replace with your own userId value
      height: { N: userInfo.height.toString() },
      weight: { N: userInfo.weight.toString() },
      age: { N: userInfo.age.toString() },
      gender: { S: userInfo.gender },
      bmi: { N: userInfo.bmi.toString() },
      bmr: { N: userInfo.bmr.toString() },
    },
    TableName: tableName,
  };

  await dynamodb.putItem(itemParams).promise();
  console.log(`Saved user info to table ${tableName}`);
}

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'hello',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
