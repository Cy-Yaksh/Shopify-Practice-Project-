import {
    Page,
    Layout,
    Card,
    BlockStack,
    Text,
    Button,
    List,
    Badge,
  } from "@shopify/polaris";
  import { TitleBar } from "@shopify/app-bridge-react";
  
  export default function PricingPage() {
    return (
      <Page>
        <TitleBar title="WiFi Pricing Plans" />
        <Layout>
          {/* Basic Plan */}
          <Layout.Section oneThird>
            <Card title="Basic Plan" sectioned>
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  $9.99 / month
                </Text>
                <Badge status="success">Best for Individuals</Badge>
                <List>
                  <List.Item>Speed: Up to 50 Mbps</List.Item>
                  <List.Item>Unlimited Data</List.Item>
                  <List.Item>24/7 Support</List.Item>
                </List>
                <Button primary>Choose Plan</Button>
              </BlockStack>
            </Card>
          </Layout.Section>
  
          {/* Standard Plan */}
          <Layout.Section oneThird>
            <Card title="Standard Plan" sectioned>
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  $19.99 / month
                </Text>
                <Badge status="attention">Most Popular</Badge>
                <List>
                  <List.Item>Speed: Up to 200 Mbps</List.Item>
                  <List.Item>Unlimited Data</List.Item>
                  <List.Item>Priority Support</List.Item>
                </List>
                <Button primary>Choose Plan</Button>
              </BlockStack>
            </Card>
          </Layout.Section>
  
          {/* Premium Plan */}
          <Layout.Section oneThird>
            <Card title="Premium Plan" sectioned>
              <BlockStack gap="200">
                <Text as="h2" variant="headingMd">
                  $29.99 / month
                </Text>
                <Badge status="critical">Best for Businesses</Badge>
                <List>
                  <List.Item>Speed: Up to 500 Mbps</List.Item>
                  <List.Item>Unlimited Data</List.Item>
                  <List.Item>Dedicated Support</List.Item>
                </List>
                <Button primary>Choose Plan</Button>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }
  