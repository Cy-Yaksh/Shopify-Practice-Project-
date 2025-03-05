// api/wishlist.js
import { json } from "@remix-run/node";
import db from "../../db.server";
import { cors } from "remix-utils/cors";

export async function loader({ request }) {
  const url = new URL(request.url);
  const customerId = url.searchParams.get("customerId");
  const shop = url.searchParams.get("shop");
  const productId = url.searchParams.get("productId"); // optional

  if (!customerId || !shop) {
    return json({
      message: "Missing data. Required: customerId, shop",
      method: "GET"
    });
  }

  let wishlist;
  if (productId) {
    wishlist = await db.wishlist.findMany({
      where: { customerId, shop, productId },
      include: { collection: true }
    });
  } else {
    wishlist = await db.wishlist.findMany({
      where: { customerId, shop },
      include: { collection: true }
    });
  }

  return cors(request, json({
    ok: true,
    message: "Success",
    data: wishlist,
  }));
}

export async function action({ request }) {
  let data = await request.formData();
  data = Object.fromEntries(data);

  const { customerId, productId, productName, productHandle, productImage, shop, _action, collectionId, newCollectionName, newVisibility } = data;

  if (!customerId || !productId || !productName || !productImage || !shop || !_action) {
    return json({
      message: "Missing required data.",
      method: _action,
    });
  }

  let response;
  switch (_action) {
    case "CREATE": {
      let finalCollectionId = collectionId;
      if (newCollectionName) {
        const newCollection = await db.collection.create({
          data: {
            name: newCollectionName,
            visibility: newVisibility || "private",
            customerId,
          },
        });
        finalCollectionId = newCollection.id;
      }
      
      await db.wishlist.create({
        data: {
          customerId,
          productId,
          productName,
          productHandle,
          productImage: productImage.startsWith("http") ? productImage : `${productImage}`,
          shop,
          collectionId: finalCollectionId || null,
        },
      });
      
      response = json({ message: "Product added to wishlist", method: _action, wishlisted: true });
      return cors(request, response);
    }
    case "DELETE": {
      await db.wishlist.deleteMany({
        where: { customerId, shop, productId, collectionId: collectionId || null },
      });
      response = json({ message: "Product removed from wishlist", method: _action, wishlisted: false });
      return cors(request, response);
    }
    default:
      return new Response("Method Not Allowed", { status: 405 });
  }
}
