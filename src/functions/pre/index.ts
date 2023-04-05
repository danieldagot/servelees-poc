
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  // events: [
  //   {
  //     cognitoUserPool: {
  //       pool : "weight-tracker-user-pool" ,
  //       //ts-ignore 
  //       trigger : 'PreSignUp'
  //   }
  //   },
  // ],
};
