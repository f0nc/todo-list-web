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

    const [formattedDueDateTime, apiErrorResponse] = parseDueDateTimeISOString(formData.get("dueDateTime"));
    if (apiErrorResponse) {
        console.log("Error response:" + JSON.stringify(apiErrorResponse));
        return NextResponse.json(apiErrorResponse, { status: 400 });
    }

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

        return NextResponse.json({ errors: apiErrorResponse.errors }, { status: 400 });
    }

    const entry = await response.json();

    return NextResponse.json(entry);
});

function parseDueDateTimeISOString(dueDateTimeString) {
    let formattedDueDateTime = null;
    let validationErrors = null;

    try {
        const dueDateTime = new Date(dueDateTimeString);
        formattedDueDateTime = dueDateTime.toISOString();
    } catch (error) {
        validationErrors = {
            errors: {
                dueDateTime: ["Invalid date time"]
            }
        };
    }

    return [formattedDueDateTime, validationErrors]
}

export { GET, POST }