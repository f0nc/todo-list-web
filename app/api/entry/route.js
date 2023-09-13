import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0"
import { NextResponse } from "next/server";


const GET = withApiAuthRequired(async (req, res) => {
    const url = `${process.env.BACKEND_URL}/entry`;
    const { accessToken } = await getAccessToken(req, res);
    
    const entriesResponse = await fetch(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    });

    const entries = await entriesResponse.json();

    return NextResponse.json(entries);
});

const POST = withApiAuthRequired(async (req) => {
    const url = `${process.env.BACKEND_URL}/entry`;
    const formData = await req.formData();
    const { accessToken } = await getAccessToken();

    const dueDateTime = new Date(formData.get("dueDateTime"));
    const formattedDueDateTime = dueDateTime.toISOString();

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,

        },
        body: JSON.stringify({
            description: formData.get("description"),
            dueDateTime: formattedDueDateTime,
        })
    });

    if (!response.ok) {
        const apiErrorResponse = await response.json();
        console.log("Api error message: " + JSON.stringify(apiErrorResponse));

        return NextResponse.json({ error: "Something went wrong" }, { status: 400 });
    }

    const entry = await response.json();

    return NextResponse.json(entry);
});

export { GET, POST }