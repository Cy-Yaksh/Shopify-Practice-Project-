
import { Page, Card, Text, Button } from "@shopify/polaris";
// import { useState } from "react";
import authenticate from "../shopify.server";

export const loader = async ({ request }) => {
  try {
    const auth = await authenticate(request);
    if (!auth?.admin) {
      throw new Error("Admin authentication failed");
    }
    
    const response = await auth.admin.graphql(
      `#graphql
      query fetchShop {
        shop {
          id
          name
        }
      }`
    );
    
    const shopData = await response.json();
    console.log(shopData?.data);
    return null;
  } catch (error) {
    console.error("Error fetching shop data:", error);
    return null;
  }
};

export default function AppProducts() {
  return (
    <Page title="Products">
      <Card>
        <Text variant="headingMd">Prashant Mahajan - Store Owner</Text>
        <Button onClick={() => shopify.toast.show("Button pressed")}>Button</Button>
      </Card>
    </Page>
  );
}
