// app.analytics.jsx
import { Page, Card, DataTable } from "@shopify/polaris";

export default function AppAnalytics() {
  const rows = [
    ["Total Sales", "$5000"],
    ["Orders", "120"],
    ["Customers", "85"],
  ];

  return (
    <Page title="Analytics">
      <Card>
        <DataTable columnContentTypes={["text", "numeric"]} headings={["Metric", "Value"]} rows={rows} />
      </Card>
    </Page>
  );
}