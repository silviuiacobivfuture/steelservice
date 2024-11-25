// Image placeholders
export const placeholderImages = {
  steel1: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=480&q=60',
  steel2: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=480&q=60',
  steel3: 'https://images.unsplash.com/photo-1590846083693-f23fdede3a7e?w=480&q=60',
  steel4: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=480&q=60',
  steel5: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=480&q=60',
  steel6: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=480&q=60',
  steel7: 'https://images.unsplash.com/photo-1589792923962-537704632910?w=480&q=60',
  steel8: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=480&q=60',
  steel9: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=480&q=60',
};

// Mock Users
export const users = [
  {
    id: 'user1',
    banned: false,
    profile: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '+1234567890',
      addressOne: '123 Steel Street',
      addressTwo: 'Suite 100',
      postalCode: '12345',
      entityTypeId: 'entity1',
      countryId: 'country1',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'user2',
    banned: false,
    profile: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phoneNumber: '+1987654321',
      addressOne: '456 Iron Avenue',
      postalCode: '67890',
      entityTypeId: 'entity1',
      countryId: 'country1',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Mock Materials
export const materials = [
  {
    id: 'mat1',
    name: 'Carbon Steel',
    attributes: [
      {
        attribute: {
          name: 'Tensile Strength',
          var: 'tensile_strength',
          unit: { unit: 'MPa' },
        },
      },
    ],
  },
  {
    id: 'mat2',
    name: 'Stainless Steel',
    attributes: [
      {
        attribute: {
          name: 'Hardness',
          var: 'hardness',
          unit: { unit: 'HRC' },
        },
      },
    ],
  },
];

// Mock Products
export const products = [
  {
    id: 'prod1',
    description: 'High-strength structural steel plate',
    materialId: 'mat1',
    material: materials[0],
    attributes: [
      {
        insertableForQuotation: true,
        attribute: {
          name: 'Thickness',
          var: 'thickness',
          unit: { unit: 'mm' },
        },
      },
    ],
  },
  {
    id: 'prod2',
    description: 'Corrosion-resistant steel plate',
    materialId: 'mat2',
    material: materials[1],
    attributes: [
      {
        insertableForQuotation: true,
        attribute: {
          name: 'Width',
          var: 'width',
          unit: { unit: 'mm' },
        },
      },
    ],
  },
];

// Mock Services
export const services = [
  {
    id: 'serv1',
    name: 'Plasma Cutting',
    description: 'High-precision plasma cutting for steel plates',
    image: placeholderImages.steel4,
  },
  {
    id: 'serv2',
    name: 'Heat Treatment',
    description: 'Professional heat treatment services',
    image: placeholderImages.steel5,
  },
];

// Mock Quote Types
export const quoteTypes = [
  {
    id: 'qt1',
    name: 'Standard Quote',
  },
  {
    id: 'qt2',
    name: 'Rush Quote',
  },
];

// Mock Quotes
export const quotes = [
  {
    id: 'quote1',
    clientId: 'user1',
    agentId: 'user2',
    typeId: 'qt1',
    status: 'draft',
    quoteeInputId: 'qi1',
    quoteeInput: {
      id: 'qi1',
      comment: 'Need urgent delivery',
      quoteeInternalReference: 'REF-001',
    },
    products: [
      {
        id: 'pq1',
        productId: 'prod1',
        quantity: 5,
        comment: 'Special cutting required',
      },
    ],
    quoteeSelectedServices: [
      {
        id: 'qps1',
        productId: 'prod1',
        serviceId: 'serv1',
      },
    ],
    quoteProductInputValues: [
      {
        id: 'qpiv1',
        productId: 'prod1',
        quoteeProductInput: {
          thickness: '10',
          width: '1500',
          length: '3000',
        },
      },
    ],
    requests: [
      {
        id: 'req1',
        message: 'Please provide certification documents',
        satisfied: false,
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Mock Partners
export const partners = [
  {
    id: 'partner1',
    name: 'Manufacturing Facility 1',
    image: placeholderImages.steel7,
  },
  {
    id: 'partner2',
    name: 'Manufacturing Facility 2',
    image: placeholderImages.steel8,
  },
];