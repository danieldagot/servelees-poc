import { Handler, Context, Callback, PreSignUpTriggerHandler } from 'aws-lambda';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { middyfy } from '@libs/lambda';
const cognitoIdp = new CognitoIdentityServiceProvider();

const preSignUp: PreSignUpTriggerHandler = async (event, context: Context,) => {
  // const { userName, request } = event.request;

  try {
    // Validate the sign-up request data
    event.response.autoConfirmUser = true;
    // Add custom attributes to the user
   return event
    // Continue with the sign-up process
  } catch (error) {
    console.error(error);
    return error
  }
}; 

export const main = preSignUp;