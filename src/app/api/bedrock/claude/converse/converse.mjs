// Use the Conversation API to send a text message to Anthropic Claude.
import { fileURLToPath } from "url";
import {
  BedrockRuntimeClient,
  ConverseCommand,
  ConverseStreamCommand,
} from "@aws-sdk/client-bedrock-runtime";
import { fromIni } from "@aws-sdk/credential-providers";

export const converse = async (userMessage) => {
  
  const modelId = "anthropic.claude-3-haiku-20240307-v1:0";
  try {
    // Create a Bedrock Runtime client in the AWS Region you want to use.
    const config = { region: "us-west-2", credentials: fromIni({ profile: "dev" }), };
    const client = new BedrockRuntimeClient(config);

    // Set the model ID, e.g., Claude 3 Haiku.

    // Start a conversation with the user message.
    const conversation = [
      {
        role: "user",
        content: [{ text: userMessage }],
      },
    ];

    // Create a command with the model ID, the message, and a basic configuration.
    const command = new ConverseCommand({
      modelId,
      messages: conversation,
      inferenceConfig: { maxTokens: 512, temperature: 0.5, topP: 0.9 },
    });

    // Send the command to the model and wait for the response
    const response = await client.send(command);

    // Extract and print the response text.
    const responseText = response.output.message.content[0].text;
    console.log('Response:', responseText);
    return {
      response: responseText,
      error: false,
      errorMessage: null
    };
  } catch (err) {
    console.log(`ERROR: Can't invoke '${modelId}'. Reason: ${err}`);
    // process.exit(1);
    return {
      response: null,
      error: true,
      errorMessage: err
    }
  }

}

export const converseStream = async (userMessage) => {
  // TODO

  const modelId = "anthropic.claude-3-haiku-20240307-v1:0";
  try {
    // Create a Bedrock Runtime client in the AWS Region you want to use.
    const config = { region: "us-west-2", credentials: fromIni({ profile: "dev" }), };
    const client = new BedrockRuntimeClient(config);

    // Set the model ID, e.g., Claude 3 Haiku.

    // Start a conversation with the user message.
    const conversation = [
      {
        role: "user",
        content: [{ text: userMessage }],
      },
    ];

    // Create a command with the model ID, the message, and a basic configuration.
    const command = new ConverseStreamCommand({
      modelId,
      messages: conversation,
      inferenceConfig: { maxTokens: 512, temperature: 0.5, topP: 0.9 },
    });

    // Send the command to the model and wait for the response
    const response = await client.send(command);

    // Extract and print the streamed response text in real-time.
    for await (const item of response.stream) {
      if (item.contentBlockDelta) {
        process.stdout.write(item.contentBlockDelta.delta?.text);
      }
    }

    // return {
    //   response: responseText,
    //   error: false,
    //   errorMessage: null
    // };
  } catch (err) {
    console.log(`ERROR: Can't invoke '${modelId}'. Reason: ${err}`);
    // process.exit(1);
    return {
      response: null,
      error: true,
      errorMessage: err
    }
  }
  
}

// Invoke main function if this file was run directly.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const userMessage = 'Describe the purpose of a "OOP" program in one line.'
  
  await converseStream(userMessage);
  // await converse(userMessage);
}