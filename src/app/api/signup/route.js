import { sql } from "@vercel/postgres";

  export async function GET(request, res) {
    const signdata = await sql`select * from signup ;`;
    return  Response.json(signdata.rows.length > 0 ? signdata.rows : null);
  }


  export async function POST(req) {
    try {
      const data = await req.json();
      const { name, phone, email, address, age, qualification, occupation, linkedin, youTube, dob } = data;
      
      const insertReview = await sql`
        INSERT INTO signup (name, phone, email, address, age, qualification, occupation, linkedin, youtube, dob) 
        VALUES (${name}, ${phone}, ${email}, ${address}, ${age}, ${qualification}, ${occupation}, ${linkedin}, ${youTube}, ${dob})
      `;
      console.log("worked insert data");
      const signdata = await sql`SELECT * FROM signup`;
      return new Response(JSON.stringify(signdata.rows), { status: 200 });
    } catch (error) {
      console.error("Error:", error);
      return new Response("Failed to insert data", { status: 500 });
    }
  }
  
