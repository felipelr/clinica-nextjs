
import { NextResponse } from "next/server";

export async function GET(
    _req: Request,
    { params }: { params: { slug: string } },
) {
    const domain = decodeURIComponent(params.slug);
    let status = "Valid Configuration";
    let domainJson = {
        name: 'teste'
    }

    return NextResponse.json({
        status,
        domainJson,
    });
}
