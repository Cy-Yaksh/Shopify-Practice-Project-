import {
  reactExtension,
  useApplyCartLinesChange,
  BlockStack,
  Text,
  Image,
  Checkbox,
  Pressable,
  InlineLayout,
  Heading,
  useApi,
  useCartLines,
  useSettings
} from "@shopify/ui-extensions-react/checkout";


import { useEffect, useState } from "react";

export default reactExtension("purchase.checkout.cart-line-list.render-after", () => (
  <VariantSuggestions />
));
 const variantId = "gid://shopify/ProductVariant/45176510840985"

 interface VariantData {
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  image?: {
    url: string;
    altText: string;
  };
  product: {
    title: string;
    featuredImage?: {
      url: string;
      altText: string;
    };
  };
 }
function VariantSuggestions() {
  const { query } = useApi();
  // 2. Fetch variant data
  const [variantData, setVariant] = useState<null | VariantData>(null);
  const [checked, setChecked] = useState(false);

  const cartLines = useCartLines();
  const applyCartLinesChange = useApplyCartLinesChange();

  const settings = useSettings();
  // const variantID = settings.selected_variant as string;

  useEffect(()=>{
    async function getVariantData() {
      const queryResult = await query<{ node: VariantData }> (`{
        node(id: "${variantId}") {
          ... on ProductVariant {
            title
            price {
              amount
              currencyCode
            }
            image {
              url
              altText
            }
            product{
              title
              featuredImage{
                url
                altText
              }
            }  
    }
   }
 }`); 

 console.log(queryResult);
  
 if(queryResult.data) {
     setVariant(queryResult.data.node) 
  
   }
  
 } 
 getVariantData();
}, []);
  

useEffect(()=>{
  if (checked){
  applyCartLinesChange({
    type: "addCartLine",
    merchandiseId: variantId,
    quantity: 1
   })}
  else {
  const cartLineId = cartLines.find(
    (cartLine) => cartLine.merchandise.id === variantId)?.id;
  if (cartLineId) {
    applyCartLinesChange(
      { type: "removeCartLine", 
        id: cartLineId, 
        quantity: 1  
      });
    }
  }
} , [checked]);

if (!variantData) return null;

  return (
<>
<Heading level={2}> Other Products You May Like</Heading> 
  <Pressable onPress={() => setChecked(!checked)}>
    <InlineLayout
    blockAlignment="center"
    spacing={["base","base"]}
    columns={["auto", 80, "fill"]}
    padding="base"
    >
      <Checkbox  checked={checked} />
      <Image 
      source={variantData.image?.url || variantData.product.featuredImage?.url}
      accessibilityDescription={variantData.image?.altText || variantData.product.featuredImage?.altText}
      borderRadius="base"
      border="base"
      borderWidth="base"
       />
       <BlockStack>
         <Text>{variantData.title} - {variantData.product.title}</Text>
         <Text>{variantData.price.currencyCode} {variantData.price.amount}</Text>
       </BlockStack>
      </InlineLayout>
      </Pressable>
      </>
  );
}
