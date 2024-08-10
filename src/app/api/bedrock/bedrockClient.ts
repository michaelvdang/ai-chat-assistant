import {
  BedrockRuntimeClient,
  ConverseCommand,
  ConverseStreamCommand,
} from "@aws-sdk/client-bedrock-runtime";
import { fromIni } from "@aws-sdk/credential-providers";

export const getBedrockClient = async () => {

  
  try {
    // Create a Bedrock Runtime client in the AWS Region you want to use.
    const config = { region: "us-west-2", credentials: fromIni({ profile: "dev" }), };
    return new BedrockRuntimeClient(config);
  }
  catch (err) {
    console.log(err);
    // process.exit(1); 
  }
}