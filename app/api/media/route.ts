import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { prisma } from "@/lib/prisma";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadFileToCloudinary(buffer: Buffer, folder: string): Promise<NextResponse> {
  return new Promise((resolve) => {
    const stream = cloudinary.uploader.upload_stream({ folder }, async (error, result) => {
      if (error || !result) {
        resolve(NextResponse.json({ error: error?.message ?? "Upload failed." }, { status: 500 }));
        return;
      }

      const media = await prisma.media.create({
        data: {
          publicId: result.public_id,
          url: result.secure_url,
          folder: result.folder || folder,
          type: result.resource_type,
          metadata: { width: result.width, height: result.height },
        },
      });

      resolve(NextResponse.json({ success: true, media }));
    });

    stream.end(buffer);
  });
}

export async function POST(request: Request): Promise<NextResponse> {
  const formData = await request.formData();
  const file = formData.get("file");
  const folder = formData.get("folder")?.toString() ?? "sanjose-siding";

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "File upload required." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  return uploadFileToCloudinary(buffer, folder);
}

export async function DELETE(request: Request) {
  const { publicId } = await request.json();
  if (!publicId) {
    return NextResponse.json({ error: "publicId is required." }, { status: 400 });
  }

  await cloudinary.uploader.destroy(publicId);
  await prisma.media.deleteMany({ where: { publicId } });
  return NextResponse.json({ success: true });
}
