export interface ProductAttribute {
  name: string;
  var: string;
  unit: {
    unit: string;
  };
  value?: string;
  range?: string;
}

export interface MaterialAttribute {
  attribute: ProductAttribute;
}

export interface Material {
  name: string;
  grade: string;
  attributes: MaterialAttribute[];
}

export interface ProductAttributeWithQuotation {
  insertableForQuotation: boolean;
  attribute: ProductAttribute;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  materialId: string;
  material: Material;
  attributes: ProductAttributeWithQuotation[];
  image: string;
  category: string;
  applications: string[];
  certifications: string[];
  inStock: boolean;
  minOrderQuantity: number;
}