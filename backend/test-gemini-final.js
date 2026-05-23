import { InferenceClient } from "@huggingface/inference"
import dotenv from "dotenv"
dotenv.config();

const client = new InferenceClient(process.env.HF_API_KEY);

try {
  const result = await client.textGeneration({
    model: "meta-llama/Meta-Llama-3-8B",
    inputs: `
Return ONLY valid JSON.

{
  "message": "hello"
}
`,
    parameters: {
      max_new_tokens: 50,
    }
  })

  console.log(result)
}catch(error){
  console.log(error);
}