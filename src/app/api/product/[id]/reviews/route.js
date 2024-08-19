import { sql } from "@vercel/postgres";

export async function GET(request, { params }) {
  const reviews = await sql`select * from reviwes where ref_product = ${params.id}`;
  return Response.json(reviews.rows.length > 0 ? reviews.rows : null);
}

export async function POST(req, { params }) {
  const { name, text, ref_product} = await req.json();
  const insertReview = await sql`insert into reviwes (name, text, ref_product) values (${name}, ${text}, ${ref_product})`;
  const reviewspost = await sql`select * from reviwes where ref_product = ${params.id}`;

  return Response.json(reviewspost.rows.length > 0 ? reviewspost.rows : null);

};

export async function PUT(req, { params }) {
  const { name, text, ref_product} = await req.json();
  const updateReview = await sql`update reviwes set name = ${name}, text = ${text}, ref_product = ${ref_product} where id = ${params.id}`;
  const reviewspost = await sql`select * from reviwes where ref_product = ${ref_product}`;

  return Response.json(reviewspost.rows.length > 0 ? reviewspost.rows : null);

};



export async function DELETE(request, { params }) {
  try {
    const id = params.id;
    const result = await sql`DELETE FROM reviwes WHERE id = ${id} RETURNING *;`;

    if (result.rows === 0) {
      return new Response(JSON.stringify({ error: 'No review found with the provided id' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'Review deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to delete review' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};