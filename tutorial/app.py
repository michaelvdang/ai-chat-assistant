import boto3
import json

bedrock_runtime = boto3.client('bedrock-runtime', region_name='us-west-2')

prompt = 'What is the capital city of Australia?'

kwargs = {
  "modelId": "anthropic.claude-3-5-sonnet-20240620-v1:0",
  "contentType": "application/json",
  "accept": "application/json",
  "body": json.dumps({
    "anthropic_version": "bedrock-2023-05-31",
    "max_tokens": 1000,
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "image",
            "source": {
              "type": "base64",
              "media_type": "image/jpeg",
              "data": "iVBORw..."
            }
          },
          {
            "type": "text",
            "text": "What's in this image?"
          }
        ]
      }
    ]
  })
}

response = bedrock_runtime.invoke_model(**kwargs)

body = json.loads(response['body'].read())

print(body)

