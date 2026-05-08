import { NextResponse } from "next/server";
import { clientPromise } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const Employer = client.db().collection("Employer");

    const employers = await Employer.find({}, { projection: { password: 0 } }).toArray();

    return NextResponse.json({ success: true, employers });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch users", error },
      { status: 500 }
    );
  }
}

export async function PATCH(request: { json: () => PromiseLike<{ id: any; status: any; }> | { id: any; status: any; }; }) {
  try {
    const { id, status } = await request.json();

    if (!id || typeof status !== "string") {
      return NextResponse.json(
        { success: false, message: "Invalid input" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const Employer = client.db().collection("Employer");

    const result = await Employer.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Employer not found or status unchanged" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.error("Error updating status:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error },
      { status: 500 }
    );
  }
}