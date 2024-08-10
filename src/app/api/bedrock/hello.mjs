import { fileURLToPath } from "url";
import { fromIni } from "@aws-sdk/credential-providers";

import {
  BedrockClient,
  ListFoundationModelsCommand,
} from "@aws-sdk/client-bedrock";

const REGION = "us-west-2";
// const client = new BedrockClient({ region: REGION });
//   const client = new BedrockClient({ 
//     region: REGION,
//     credentials: fromIni({ profile: "dev1" }),
//     // credentials: fromIni({ profile: "637423606269_AdministratorAccess" }),
//    });

export const main = async () => {
  try {
    const client = new BedrockClient({ 
      region: REGION,
      // credentials: fromIni({ profile: "dev" }),
      credentials: fromIni({ profile: "637423606269_AdministratorAccess" }),
     });


    const command = new ListFoundationModelsCommand({});

    const response = await client.send(command);
    const models = response.modelSummaries;

    console.log("Listing the available Bedrock foundation models:");

    for (let model of models) {
      console.log("=".repeat(42));
      console.log(` Model: ${model.modelId}`);
      console.log("-".repeat(42));
      console.log(` Name: ${model.modelName}`);
      console.log(` Provider: ${model.providerName}`);
      console.log(` Model ARN: ${model.modelArn}`);
      console.log(` Input modalities: ${model.inputModalities}`);
      console.log(` Output modalities: ${model.outputModalities}`);
      console.log(` Supported customizations: ${model.customizationsSupported}`);
      console.log(` Supported inference types: ${model.inferenceTypesSupported}`);
      console.log(` Lifecycle status: ${model.modelLifecycle.status}`);
      console.log("=".repeat(42) + "\n");
    }

    const active = models.filter(
      (m) => m.modelLifecycle.status === "ACTIVE",
    ).length;
    const legacy = models.filter(
      (m) => m.modelLifecycle.status === "LEGACY",
    ).length;

    console.log(
      `There are ${active} active and ${legacy} legacy foundation models in ${REGION}.`,
    );

    return {response, error: false, errorMessage: null};  
}
  catch (err) {
    console.log(err);
    // process.exit(1);
    return {
      response: null,
      error: true,
      errorMessage: err
    };
  }
};

// Invoke main function if this file was run directly.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await main();
}