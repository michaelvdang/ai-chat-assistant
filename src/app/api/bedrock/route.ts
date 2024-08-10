import { NextResponse } from "next/server";
import {main} from './hello.mjs';

export async function GET() {
  // return NextResponse.json({ message: "Hello, World!",});

  try {
    const {response, error, errorMessage} = await main();
    
    if (error) {
      return NextResponse.json({
        error: true,
        message: errorMessage,
      })
    }
    else {
      return NextResponse.json({ 
        message: "Hello, World!",
        response
      });
    }
  }
  catch (err) {
    console.log(err);
    // process.exit(1);
  }
}


