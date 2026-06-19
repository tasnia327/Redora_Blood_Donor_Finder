import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const {
      fullName,
      email,
      password,
      bloodGroup,
      phone,
      city,
      area,
      available,
    } = await request.json();

    if (
      !fullName ||
      !email ||
      !password ||
      !bloodGroup ||
      !phone ||
      !city ||
      !area
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // simulate delay (important for UI testing)
    await new Promise((res) => setTimeout(res, 800));

    console.log("FAKE DONOR REGISTERED:", {
      fullName,
      email,
      bloodGroup,
      phone,
      city,
      area,
      available,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Donor registered successfully (mock)",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}