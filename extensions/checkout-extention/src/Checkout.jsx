/* eslint-disable react-hooks/exhaustive-deps */
import {
  reactExtension,
  Text,
} from "@shopify/ui-extensions-react/checkout";


// 1. Choose an extension target
export default reactExtension('purchase.checkout.block.render', () => (
  <Extension />
));


function Extension() {

  return (<>
<Text> hello from checkout ui</Text>
      </>
    );
  }