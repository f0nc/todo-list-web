import { NextResponse } from 'next/server';

const { withApiAuthRequired, getAccessToken } = require('@auth0/nextjs-auth0');

const DELETE = withApiAuthRequired(async (req, { params }) => {
    const entryId = params.id;
    const url = `${process.env.BACKEND_URL}/entry/${entryId}`;
    const { accessToken } = await getAccessToken();

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        console.log(`Error calling ${url}:${response.statusText}(${response.status})`);

        return NextResponse.json({ error: 'Something went wrong' }, { status: 400 });
    }

    return new NextResponse(null, { status: 200 });
});

// eslint-disable-next-line import/prefer-default-export
export { DELETE };
