import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { query } from "@/app/lib/db";

import { ResultSetHeader } from "mysql2";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email_id = formData.get("email_id");
    const imageFile = formData.get("image");

    if (!name || !address || !city || !state || !email_id || !imageFile) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public", "schoolImages");

    await fs.mkdir(uploadDir, { recursive: true });

    const buffer = Buffer.from(await (imageFile as File).arrayBuffer());

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniqueSuffix}-${(imageFile as File).name.replaceAll(
      " ",
      "_"
    )}`;
    const imagePath = path.join(uploadDir, filename);

    await fs.writeFile(imagePath, buffer);

    const dbImagePath = `/schoolImages/${filename}`;

    const [result] = (await query(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, dbImagePath, email_id]
    )) as [ResultSetHeader, any];

    return NextResponse.json(
      { id: result.insertId, message: "School added successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.log("API ERROR", error);
    return NextResponse.json(
      {
        message: "ERror adding school to database",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
