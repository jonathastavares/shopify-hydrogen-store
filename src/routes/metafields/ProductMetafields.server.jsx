import {gql, useShopQuery} from '@shopify/hydrogen';

export default function ProductMetafields({productId, namespace, keyName}) {
  const {data} = useShopQuery({
    query: PRODUCT_QUERY,
    variables: {
      productId,
      namespace,
      keyName,
    },
    preload: true,
  });

  return <div>{data?.product?.metadata?.value}</div>;
}

const PRODUCT_QUERY = gql`
  query Product($productId: ID!, $namespace: String!, $keyName: String!) {
    product(id: $productId) {
      id
      title
      vendor
      metadata: metafield(namespace: $namespace, key: $keyName) {
        value
      }
    }
  }
`;
