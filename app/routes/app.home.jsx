import { Card, Layout, Page, Frame, MediaCard } from "@shopify/polaris";

export default function AppHome() {
  return (
    <Frame>
      <div style={{
        backgroundColor: "#00848e",
        padding: "15px",
        textAlign: "center",
        color: "white",
        fontSize: "24px",
        fontWeight: "bold",
      }}>
        Polaris UI
      </div>
      <Page title="What is Polaris?">
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <p style={{ fontSize: "16px", lineHeight: "1.6" }}>
                Polaris is a design system created by Shopify to help developers
                and designers build consistent, high-quality user experiences in
                Shopify apps.
              </p>
            </Card>
            <MediaCard
      title="Get closer to launching your store"
      primaryAction={{
        content: 'Add a product',
        onAction: () => {},
      }}
      secondaryAction={{
        content: 'Learn more',
        onAction: () => {},
      }}
      description="Start your business with eye-catching inventory."
      popoverActions={[{content: 'Dismiss', onAction: () => {}}]}
    >
      <img
        alt=""
        width="100%"
        height="100%"
        style={{objectFit: 'cover', objectPosition: 'center'}}
        src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
      />
    </MediaCard>
    <Card sectioned>
       <p style={{ fontSize: "16px", lineHeight: "1.6" }}>
          Polaris is a design system created by Shopify to help developers
          and designers build consistent, high-quality user experiences in
          Shopify apps.
          </p>
    </Card>
          </Layout.Section>
        </Layout>

      </Page>
      <footer style={{
        marginTop: "20px",
        padding: "10px",
        textAlign: "center",
        backgroundColor: "#f4f6f8",
        fontSize: "14px",
        fontWeight: "bold",
        animation: "fadeIn 2s ease-in-out",
      }}>
        Made with ❤️ by Lubus
      </footer>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
    </Frame>
  );
}
