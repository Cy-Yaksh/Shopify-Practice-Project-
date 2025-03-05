import { json } from "@remix-run/node";
import db from "../../db.server";
import { cors } from "remix-utils/cors";


export async function loader({ request }) {
  const url = new URL(request.url);
  const customerId = url.searchParams.get("customerId");

  if (!customerId) {
    return json({ message: "Missing customerId" }, { status: 400 });
  }

  try {
    // Fetch collections for the customer
    const collection = await db.collection.findMany({
      where: { customerId },
      select: { id: true, name: true, visibility: true, createdAt: true },
    });

    return cors(request, json(collection));
  } catch (error) {
    console.error("Error fetching collections:", error);
    return json({ message: "Internal Server Error" }, { status: 500 });
  }
}
export async function action({ request }) {
  const data = Object.fromEntries(await request.formData());
  const { customerId, collectionId } = data;

  if (!customerId || !collectionId) {
    return json({ message: "Missing data: customerId and collectionId are required." });
  }

  // Check if the collection exists
  const collection = await db.collection.findUnique({
    where: { id: collectionId, customerId }
  });

  if (!collection) {
    return json({ message: "Collection not found." }, { status: 404 });
  }

  // Delete associated wishlist items first
  await db.wishlist.deleteMany({ where: { collectionId } });

  // Now delete the collection
  await db.collection.delete({ where: { id: collectionId } });

  return cors(request, json({ message: "Collection and associated wishlist items deleted" }));
}
