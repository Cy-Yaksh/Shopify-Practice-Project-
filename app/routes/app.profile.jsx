import { useState } from "react";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import db from "../db.server";
import { Page, Card, Text, Thumbnail, Select } from "@shopify/polaris";

// Loader function to fetch wishlist data
export async function loader() {
  const wishlist = await db.wishlist.findMany({
    select: {
      id: true,
      customerId: true,
      productId: true,
      productName: true,
      productImage: true,
      shop: true,
      collectionId: true,
    },
  });

  return json({ wishlist });
}

export default function AppProfile() {
  const { wishlist } = useLoaderData();
  const [sortBy, setSortBy] = useState("productName");

  const sortedWishlist = [...wishlist].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return -1;
    if (a[sortBy] > b[sortBy]) return 1;
    return 0;
  });

  return (
    <Page>
      <Card>
        <Text variant="headingMd">Wishlist Items</Text>
        <Select
          label="Sort by"
          options={[
            { label: "Product Name", value: "productName" },
            { label: "Product ID", value: "productId" },
            { label: "Shop", value: "shop" },
            { label: "coollectionID", value: "collectionId"}
            // Add more sorting options as needed
          ]}
          onChange={setSortBy}
          value={sortBy}
        />
        {sortedWishlist.length > 0 ? (
          sortedWishlist.map((item) => (
            <Card key={item.id} sectioned>
              <Thumbnail
                source={item.productImage.startsWith("http") ? item.productImage : `${item.productImage}`}
                alt={item.productName}
              />
              <Text variant="headingSm">{item.productName}</Text>
              <Text>Product ID: {item.productId}</Text>
              <Text>Customer ID: {item.customerId}</Text>
              <Text>Shop: {item.shop}</Text>
              <Text>Collection: {item.collectionId || "Default"}</Text>
            </Card>
          ))
        ) : (
          <Text>No wishlist items found.</Text>
        )}
      </Card>
    </Page>
  );
}
