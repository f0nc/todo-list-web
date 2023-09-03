import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0"
import { NextResponse } from "next/server";


const GET = withApiAuthRequired(async (req, res) => {
        const url = `${process.env.BACKEND_URL}/entry`;
        const { accessToken } = await getAccessToken(req, res);

        const entriesResponse = await fetch(url, {
            headers: {
                Authorization: "Bearer " + accessToken,
            }
        });

        const entries = await entriesResponse.json();

        return NextResponse.json(entries);
    }
);

export { GET }