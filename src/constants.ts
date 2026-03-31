export interface Product {
  id: string;
  name: string;
  benefit: string;
  price: number;
  description: string;
  features: string[];
  specs: Record<string, string>;
  image: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "mlok-angled-foregrip",
    name: "M-LOK Angled Foregrip",
    benefit: "Lightweight Tactical Control Grip",
    price: 45.00,
    description: "Most aftermarket grips are either bulky, weak, or poorly designed for actual use. This angled foregrip was engineered to provide optimal control while maintaining a lightweight, low-profile design.",
    features: [
      "Enhanced weapon control and stability",
      "Lightweight design without sacrificing strength",
      "Secure M-LOK attachment with minimal movement",
      "Ergonomic angle for improved handling",
      "Built for durability in demanding environments"
    ],
    specs: {
      "Mount Type": "M-LOK",
      "Material": "High-strength polymer / resin",
      "Weight": "1.8 oz",
      "Finish": "Matte black",
      "Compatibility": "Standard M-LOK rail systems",
      "Manufacturing Method": "Precision + Additive Manufacturing"
    },
    image: "https://picsum.photos/seed/tactical-grip/800/600"
  },
  {
    id: "rail-covers",
    name: "Tactical Rail Covers",
    benefit: "Heat Resistance & Enhanced Grip",
    price: 25.00,
    description: "Protect your hands and your rails with our precision-fit covers. Designed to withstand extreme heat while providing a non-slip texture.",
    features: [
      "Superior heat dissipation",
      "Aggressive non-slip texture",
      "Low profile design",
      "Easy snap-on installation"
    ],
    specs: {
      "Material": "Heat-resistant composite",
      "Length": "4.7 inches",
      "Compatibility": "Picatinny / M-LOK options"
    },
    image: "https://picsum.photos/seed/rail-cover/800/600"
  },
  {
    id: "barricade-stop",
    name: "Precision Barricade Stop",
    benefit: "Rock-Solid Shooting Platform",
    price: 35.00,
    description: "Engineered for competitive shooters and tactical professionals. Provides a stable point of contact against barricades and obstacles.",
    features: [
      "Aggressive teeth for maximum bite",
      "Compact and lightweight",
      "M-LOK compatible",
      "CNC machined precision"
    ],
    specs: {
      "Material": "6061-T6 Aluminum",
      "Weight": "1.2 oz",
      "Finish": "Hardcoat Anodized"
    },
    image: "https://picsum.photos/seed/barricade-stop/800/600"
  },
  {
    id: "tactical-sling-mount",
    name: "QD Tactical Sling Mount",
    benefit: "Rapid Transition & Secure Carry",
    price: 29.00,
    description: "A low-profile, high-strength sling mount designed for M-LOK systems. Features a limited rotation QD socket to prevent sling twisting.",
    features: [
      "Limited rotation QD socket",
      "Low-profile snag-free design",
      "High-strength steel construction",
      "Easy M-LOK installation"
    ],
    specs: {
      "Material": "Heat-treated steel",
      "Weight": "0.9 oz",
      "Compatibility": "Standard QD swivels"
    },
    image: "https://picsum.photos/seed/sling-mount/800/600"
  },
  {
    id: "extended-charging-handle",
    name: "Extended Charging Handle",
    benefit: "Faster Manipulation & Better Grip",
    price: 85.00,
    description: "Engineered for speed and reliability. The oversized latch allows for easy manipulation even with gloves or under stress.",
    features: [
      "Ambidextrous design",
      "Oversized textured latches",
      "Enhanced gas redirection",
      "Precision CNC machined"
    ],
    specs: {
      "Material": "7075-T6 Aluminum",
      "Finish": "Type III Hardcoat Anodized",
      "Compatibility": "Standard AR-15 platforms"
    },
    image: "https://picsum.photos/seed/charging-handle/800/600"
  }
];
