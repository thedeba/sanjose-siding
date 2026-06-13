import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { leadSchema } from "@/lib/validators";
import nodemailer from "nodemailer";

const emailTransport = process.env.EMAIL_SMTP_URL ? nodemailer.createTransport(process.env.EMAIL_SMTP_URL) : null;

export async function POST(request: Request) {
  const json = await request.json();
  const result = leadSchema.safeParse(json);

  if (!result.success) {
    return NextResponse.json({ error: result.error.format() }, { status: 422 });
  }

  const lead = await prisma.lead.create({
    data: {
      name: result.data.name,
      email: result.data.email,
      phone: result.data.phone,
      address: result.data.address,
      service: result.data.service,
      message: result.data.message,
    },
  });

  if (emailTransport) {
    await emailTransport.sendMail({
      from: process.env.EMAIL_FROM ?? "no-reply@sanjosesidingpros.com",
      to: process.env.EMAIL_TO ?? process.env.EMAIL_FROM,
      subject: `New lead from ${lead.name}`,
      text: `New inquiry for ${lead.service} from ${lead.name} (${lead.email}, ${lead.phone}). Message: ${lead.message}`,
    });
  }

  return NextResponse.json({ success: true, lead });
}
