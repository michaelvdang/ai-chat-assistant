import { NextResponse } from "next/server";
import {converse, converseStream} from './converse.mjs';
import { getBedrockClient } from "../../bedrockClient";
import { ConverseCommand, ConverseStreamCommand } from "@aws-sdk/client-bedrock-runtime";
import { Readable } from 'stream';

export async function GET() {
  // get user message from body
  const userMessage = 'Describe the purpose of a "penalty" in soccer in one line.'
  const modelId = "anthropic.claude-3-haiku-20240307-v1:0";
  try {

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
    const bedrockClient = await getBedrockClient();
    const response = await bedrockClient?.send(command);
    console.log('response: ', response);

    // Extract and print the streamed response text in real-time.
    for await (const item of response.stream) {
      if (item.contentBlockDelta) {
        process.stdout.write(item.contentBlockDelta.delta?.text);
      }
    }

    return NextResponse.json({
      message: 'Success',
    })
    // return new NextResponse(stream) // Return the stream as the response

  }
  catch (err) {
    console.log(err);
    // process.exit(1);
    return NextResponse.json({
      message: null,
      error: true,
      errorMessage: err
    })
  }
}


export async function POST(req) {
  try {
    const body = await req.json();
    const userMessage = body[body.length - 1].content;
    const modelId = "anthropic.claude-3-haiku-20240307-v1:0";

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
    const bedrockClient = await getBedrockClient();
    const response = await bedrockClient?.send(command);
    
    console.log('response: ', response);
    // Create a ReadableStream from the response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response.stream) {
            if (chunk.contentBlockDelta?.delta?.text) {
              controller.enqueue(chunk.contentBlockDelta.delta.text);
            }
          }
          controller.close();
        } catch (error) {
          console.error("Streaming error:", error);
          controller.error(error);
        }
      },
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/plain',
        'Transfer-Encoding': 'chunked',
      },
    });
    
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      message: null,
      error: true,
      errorMessage: err.message || 'An error occurred',
    });
  }
}

