import { NextResponse } from "next/server";

// clearing of the cookies
export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success : true,
        }
        )
        response.cookies.set("token", "",{
             httpOnly : true, expires : new Date(0)
        });
        return response // returning response
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message},
            { status: 500 })
    }
}