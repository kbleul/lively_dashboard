interface ProductImage {
    uuid: string;
    mime_type: string;
    url: string;
  }
  
  interface ProductTitle {
    english: string;
    amharic: string;
  }
  
  interface ProductDescription {
    english: string;
    amharic: string;
  }
  
  interface Product {
    id: string;
    unit_id: string;
    brand_id: string;
    variant_type: string;
    title: ProductTitle;
    description: ProductDescription;
    status: number;
    created_at: string;
    updated_at: string;
  }
  
  export interface SearchProductData {
    id: string;
    product_id: string;
    value: null;
    product_image: ProductImage;
    product: Product;
  }
  