import { Layers3, Scissors, Wrench, FileText } from 'lucide-react';

export const menuItems = {
  'Steel Products': {
    icon: Layers3,
    items: [
      {
        title: 'Structural Steel',
        links: [
          'Carbon & High Strength Steel',
          'Low Alloy Structural Steel',
          'Heavy Steel Plate',
          'Abrasion Resistant Steel',
        ],
      },
      {
        title: 'Specialty Steel',
        links: [
          'Offshore Marine Steel',
          'Pressure Vessel Steel',
          'Boiler Steel Plate',
          'Wear Resistant Steel',
        ],
      },
      {
        title: 'Standards',
        links: [
          'EN Standard Steel',
          'ASTM Standard',
          'Caterpillar Spec Steel',
          'JIS Standard Steel',
        ],
      },
    ],
  },
  'Processing': {
    icon: Scissors,
    items: [
      {
        title: 'Cutting Services',
        links: [
          'Plasma Cutting',
          'Laser Cutting',
          'Flame Cutting',
          'Waterjet Cutting',
        ],
      },
      {
        title: 'Surface Treatment',
        links: [
          'Shot Blasting',
          'Painting',
          'Anti-corrosion',
          'Heat Treatment',
        ],
      },
      {
        title: 'Value Added',
        links: [
          'Drilling',
          'Beveling',
          'Forming',
          'Edge Preparation',
        ],
      },
    ],
  },
  'Services': {
    icon: Wrench,
    items: [
      {
        title: 'Technical Services',
        links: [
          'Engineering Support',
          'Material Testing',
          'Quality Control',
          'Project Management',
        ],
      },
      {
        title: 'Logistics',
        links: [
          'Warehousing',
          'Distribution',
          'Just-in-time Delivery',
          'Export Packing',
        ],
      },
      {
        title: 'Support',
        links: [
          'Technical Documentation',
          'Material Certificates',
          'Custom Solutions',
          'Consulting',
        ],
      },
    ],
  },
  'Resources': {
    icon: FileText,
    items: [
      {
        title: 'Documentation',
        links: [
          'Technical Guides',
          'Material Data Sheets',
          'Case Studies',
          'White Papers',
        ],
      },
      {
        title: 'Tools',
        links: [
          'Steel Calculator',
          'Grade Comparison',
          'Weight Calculator',
          'Cost Estimator',
        ],
      },
      {
        title: 'Support',
        links: [
          'FAQs',
          'Knowledge Base',
          'Video Tutorials',
          'Contact Support',
        ],
      },
    ],
  },
};