import {
  Box,
  Card,
  Page,
  Text,
  BlockStack,
  TextField,
  InlineGrid,
  Button,
} from "@shopify/polaris";
import { useState } from "react";
import { TitleBar } from "@shopify/app-bridge-react";

import { useLoaderData, Form,json } from "@remix-run/react";

//importing prisma db 
import  db  from "../db.server";


// export async function loader() {
//   let settings = await db.settings.findFirst();
//   return json(settings);
// }

export async function action({ request }) {
  let settings = await request.formData();
  settings = Object.fromEntries(settings);
  // update the database
  await db.settings.upsert({
    where: { id: settings.id, },
    update: {
      id : settings.id,
      name: settings.name,
      description: settings.description
    },
    create: {
      id: settings.id,
      name: settings.name,
      description: settings.description
  },
  });

  // return the updated settings

  return json(settings);
}

export default function SettingsPage() {
  const settings = useLoaderData();
  const [formState, setFormState] = useState(settings);

  return (
    <Page>
      
      <TitleBar title="Settings page" />
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Settings
              </Text>
              <Text as="p" variant="bodyMd">
                Update app settings and preferences
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <Form method="POST">
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                App details
              </Text>
              <TextField label= 'ID' name="id" value={formState?.id} onChange={(value)=>{ setFormState({...formState, id: value})}} > </TextField>
              <TextField label="app name" name="name" value={formState?.name} onChange={(value)=>{ setFormState({...formState, name: value})}} />
              <TextField label="description" name="description" value={formState?.description} onChange={(value)=>{ setFormState({...formState, description: value})}} />
              <h1>{formState?.name}</h1>
              <Button primary submit={true} type="submit">Save</Button>
            </BlockStack>
            </Form>
          </Card>
        </InlineGrid>
      </BlockStack>
    </Page>
  );
}
