import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { User } from "next-auth";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function DELETE(
  request: Request,
  { params }: { params: { messageid: string } }
) {
  const messageId = params.messageid;

  await dbConnect();
  const session = await getServerSession(authOptions);
  const _user: User = session?.user as User;

  if (!session || !_user) {
    return Response.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }

  try {
    const updateResult = await UserModel.updateOne(
      { _id: _user._id },
      { $pull: { messages: { _id: messageId } } }
    );

    if (updateResult.modifiedCount == 0) {
      return Response.json(
        { success: false, message: "Message not found or already deleted" },
        { status: 404 }
      );
    }

    return Response.json(
      { success: true, message: `Message Deleted: ${messageId}` },
      { status: 200 }
    );
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
