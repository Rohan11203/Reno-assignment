import { NextResponse, NextRequest } from "next/server";
import { query } from "@/app/lib/db";
import { ResultSetHeader } from "mysql2";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get("image") as File | null;

    if (!imageFile) {
      return NextResponse.json(
        { message: "Image is required" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await imageFile.arrayBuffer());

    const cloudinaryResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "school_images" },
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    const uploadedImage = cloudinaryResponse as { secure_url: string };
    const dbImagePath = uploadedImage.secure_url;

    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email_id = formData.get("email_id");

    const [result] = (await query(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        name!.toString(),
        address!.toString(),
        city!.toString(),
        state!.toString(),
        contact!.toString(),
        dbImagePath,
        email_id!.toString(),
      ]
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    )) as [ResultSetHeader, any];

    return NextResponse.json(
      {
        id: result.insertId,
        message: "School added successfully with image uploaded to Cloudinary!",
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("API Error:", error);
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { message: "Error adding school", error: message },
      { status: 500 }
    );
  }
}
