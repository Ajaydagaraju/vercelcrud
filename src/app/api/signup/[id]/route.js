import { sql } from "@vercel/postgres";



export async function DELETE(request, { params }) {
    try {
        const id = params.id;
        const result = await sql`DELETE FROM signup WHERE id = ${id} RETURNING *;`;

        if (result.rows === 0) {
            return new Response(JSON.stringify({ error: 'No user detail found with the provided id' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify({ message: 'User detail deleted successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Failed to delete User detail.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};

export async function GET(request, {params}) {
    try{
        const deleteAddress = await sql`UPDATE signup SET address = NULL WHERE id = ${params.id}`;
        const signdata = await sql`select * from signup WHERE id = ${params.id} ;`;
        return  Response.json(signdata.rows.length > 0 ? signdata.rows : null);
    }catch(error){
        console.log("Error : ", error);
        return new Response("Failed to fetch user data", {status : 500})
    }
  }

export async function PUT(req, { params }) {
    try {
        const data = await req.json();
        const { name, phone, email, address, age, qualification, occupation, linkedin, youTube, dob } = data;
        const updateDetail = await sql`update signup set name = ${name}, phone = ${phone}, email = ${email}, address = ${address}, age = ${age}, qualification = ${qualification}, occupation = ${occupation}, linkedin = ${linkedin}, youTube = ${youTube}, dob = ${dob} where id = ${params.id}`;
        console.log("updateDetail", updateDetail)
        const signupdata = await sql`SELECT * FROM signup`;
        return new Response(JSON.stringify(signupdata.rows), { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return new Response("Failed to insert data", { status: 500 });
    }
};
