import { NextResponse } from "next/server";
import {main} from '../../../../tutorial/hello.mjs';

export async function GET() {
  const response = await main();
  
  return NextResponse.json({ 
    message: "Hello, World!",
    response
  });
}


