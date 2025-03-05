import {
    Page,
    Card,
    InlineGrid,
    BlockStack,
    Box,
    Divider,
    SkeletonBodyText,
    SkeletonDisplayText,
  } from "@shopify/polaris";
  import { ArchiveIcon, DeleteIcon, DuplicateIcon } from "@shopify/polaris-icons";
  
  export default function AppDetails() {
    return (
      <Page
        backAction={{ content: "Products", url: "/products" }}
        title="Product Details"
        secondaryActions={[
          {
            content: "Duplicate",
            icon: DuplicateIcon,
            onAction: () => alert("Duplicate action"),
          },
          {
            content: "Archive",
            icon: ArchiveIcon,
            onAction: () => alert("Archive action"),
          },
          {
            content: "Delete",
            icon: DeleteIcon,
            destructive: true,
            onAction: () => alert("Delete action"),
          },
        ]}
        pagination={{ hasPrevious: true, hasNext: true }}
      >
        <InlineGrid columns={{ xs: 1, md: "2fr 1fr" }} gap="400">
          <BlockStack gap="400">
            <Card roundedAbove="sm">
              <BlockStack gap="400">
                <SkeletonDisplayText size="small" />
                <Box border="divider" borderRadius="base" minHeight="20rem" />
              </BlockStack>
            </Card>
            <Card roundedAbove="sm">
              <BlockStack gap="400">
                <SkeletonDisplayText size="small" />
                <InlineGrid columns={{ xs: 1, md: 2 }}>
                  <Box border="divider" borderRadius="base" minHeight="10rem" />
                  <Box border="divider" borderRadius="base" minHeight="10rem" />
                </InlineGrid>
              </BlockStack>
            </Card>
          </BlockStack>
          <BlockStack gap={{ xs: "400", md: "200" }}>
            <Card roundedAbove="sm">
              <BlockStack gap="400">
                <SkeletonDisplayText size="small" />
                <Box border="divider" borderRadius="base" minHeight="2rem" />
                <Divider />
                <SkeletonBodyText />
              </BlockStack>
            </Card>
            <Card roundedAbove="sm">
              <BlockStack gap="400">
                <SkeletonDisplayText size="small" />
                <Box border="divider" borderRadius="base" minHeight="2rem" />
                <SkeletonBodyText />
              </BlockStack>
            </Card>
          </BlockStack>
        </InlineGrid>
      </Page>
    );
  }
  