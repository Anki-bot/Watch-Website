export type Gender = "Men" | "Women" | "Unisex";

export type Movement =
  | "Automatic"
  | "Manual"
  | "Quartz"
  | "Solar"
  | "Spring Drive";

export type StrapType =
  | "Steel"
  | "Titanium"
  | "Gold"
  | "Leather"
  | "Rubber"
  | "NATO";

export type CaseTone =
  | "steel"
  | "gold"
  | "rose-gold"
  | "two-tone"
  | "titanium"
  | "black";

export type Bezel = "smooth" | "fluted" | "dive" | "tachymeter" | "gmt";

export type DialStyle = "batons" | "roman" | "arabic" | "digital";

export type DialTexture = "sunburst" | "matte" | "mother-of-pearl" | "snowflake";

export type Badge =
  | "Best Seller"
  | "New Arrival"
  | "Limited"
  | "Editor's Pick";

export type Condition = "New" | "Pre-owned";

export type WatchImage = {
  src: string;
  thumb?: string;
  alt: string;
};

export type Watch = {
  slug: string;
  name: string;
  brand: string;
  collection: string;
  price: number;
  compareAtPrice?: number;
  priceOnRequest?: boolean;
  gender: Gender;
  movement: Movement;
  caseSize: number;
  caseMaterial: string;
  caseTone: CaseTone;
  caseShape?: "round" | "tank";
  dialName: string;
  dialHex: string;
  dialTexture?: DialTexture;
  dialStyle?: DialStyle;
  chrono?: boolean;
  strapName: string;
  strapType: StrapType;
  strapHex: string;
  bezel: Bezel;
  bezelHex?: string;
  waterResistance: string;
  glass: string;
  reference?: string;
  year: number;
  condition: Condition;
  rating: number;
  reviewCount: number;
  badges?: Badge[];
  stock: number;
  description: string;
  features: string[];
  images?: WatchImage[];
};

export type Brand = {
  slug: string;
  name: string;
  country: string;
  founded: number;
  tagline: string;
  description: string;
  accent: string;
};
