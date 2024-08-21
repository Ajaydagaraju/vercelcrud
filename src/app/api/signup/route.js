import { sql } from "@vercel/postgres";

export async function POST(req, res) {
    const { name, phone, email, age, qualification, occupation, linkedin, youTube,dob} = await req.json();
    const insertReview = await sql`insert into signup (name, phone, email, age, qualification, occupation, linkedIn, youTube,dob) values (${name}, ${phone}, ${email}, ${age}, ${qualification}, ${occupation}, ${linkedin}, ${youTube}, ${dob})`;
    const signdata = await sql`select * from signuup`;
    return new Response.json(signdata.rows.length > 0 ? signdata.rows : null);
  };

  export async function GET(request, res) {
    const signdata = await sql`select * from signup ;`;
    return new Response.json(signdata.rows.length > 0 ? signdata.rows : null);
  }