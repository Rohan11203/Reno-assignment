import { RowDataPacket } from "mysql2";
import { query } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const sqlQuery = "SELECT id, name, address, city, image FROM schools";

    const [schools] = (await query(sqlQuery, [])) as [RowDataPacket[], any];

    return NextResponse.json(schools, { status: 200 });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Error fetching schools", error: error.message },
      { status: 500 }
    );
  }
}
