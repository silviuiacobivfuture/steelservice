export interface Product {
    id: string;
    description: string;
    formulaId?: string;
    materialId: string;
    material: {
      name: string;
      attributes: Array<{
        attribute: {
          name: string;
          var: string;
          unit: {
            unit: string;
          };
        };
      }>;
    };
    attributes: Array<{
      insertableForQuotation: boolean;
      attribute: {
        name: string;
        var: string;
        unit: {
          unit: string;
        };
      };
    }>;
  }
  
  export interface User {
    id: string;
    profile?: {
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      addressOne: string;
      addressTwo?: string;
      postalCode: string;
    };
  }