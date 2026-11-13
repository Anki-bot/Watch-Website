import type { Brand } from "./types";

export const brands: Brand[] = [
  {
    slug: "rolex",
    name: "Rolex",
    country: "Switzerland",
    founded: 1905,
    tagline: "A crown for every achievement",
    description:
      "Few names carry the weight of Rolex. From the depths of the Submariner to the elegance of the Datejust, each watch is a study in Swiss precision, built to be worn for a lifetime and passed on for generations.",
    accent: "#1c5b3c",
  },
  {
    slug: "omega",
    name: "Omega",
    country: "Switzerland",
    founded: 1848,
    tagline: "Pioneering the frontiers of time",
    description:
      "Omega has timed the Olympic Games, walked on the Moon and dived to the deepest trenches of the ocean. It is horology with a sense of adventure — precise, robust and quietly confident.",
    accent: "#1b3f6b",
  },
  {
    slug: "seiko",
    name: "Seiko",
    country: "Japan",
    founded: 1881,
    tagline: "The art of Japanese watchmaking",
    description:
      "Seiko brought quartz to the world and never stopped innovating. Today its Prospex, Presage and King Seiko lines offer remarkable craftsmanship and character at prices that make serious watchmaking accessible.",
    accent: "#4a4f57",
  },
  {
    slug: "tag-heuer",
    name: "TAG Heuer",
    country: "Switzerland",
    founded: 1860,
    tagline: "Racing spirit since 1860",
    description:
      "Born on the racetrack, TAG Heuer has spent more than a century building chronographs for people who measure life in hundredths of a second. Bold, sporty and unmistakably Swiss.",
    accent: "#1d4f43",
  },
  {
    slug: "tudor",
    name: "Tudor",
    country: "Switzerland",
    founded: 1926,
    tagline: "Built for the bold",
    description:
      "Tudor takes the tool-watch formula and makes it its own: robust movements, honest materials and a design language that feels as at home in the ocean as it does in the city.",
    accent: "#6b1f24",
  },
  {
    slug: "longines",
    name: "Longines",
    country: "Switzerland",
    founded: 1832,
    tagline: "Elegance is an attitude",
    description:
      "The oldest registered watch brand still in operation, Longines pairs classical elegance with a sporting heritage. Its winged hourglass has become a symbol of timeless design.",
    accent: "#1f3f6e",
  },
  {
    slug: "tissot",
    name: "Tissot",
    country: "Switzerland",
    founded: 1853,
    tagline: "Swiss craftsmanship, thoughtfully priced",
    description:
      "Tissot has been making Swiss watches for everyday life since 1853. The brand is known for intelligent design, solid movements and value that punches well above its price.",
    accent: "#3a3f47",
  },
  {
    slug: "hamilton",
    name: "Hamilton",
    country: "United States",
    founded: 1892,
    tagline: "American spirit, Swiss precision",
    description:
      "Founded in Lancaster, Pennsylvania, Hamilton built its reputation on railroad and military watches. Today it blends that utilitarian American spirit with modern Swiss movements.",
    accent: "#5a3a24",
  },
  {
    slug: "citizen",
    name: "Citizen",
    country: "Japan",
    founded: 1918,
    tagline: "Better starts now",
    description:
      "Citizen pioneered Eco-Drive solar technology, freeing watches from the battery. It is innovation in service of everyday life — dependable, precise and designed to keep going.",
    accent: "#2c3e50",
  },
  {
    slug: "grand-seiko",
    name: "Grand Seiko",
    country: "Japan",
    founded: 1960,
    tagline: "The nature of time",
    description:
      "Grand Seiko is Japan's answer to the finest Swiss watchmaking. Hand-finished cases, dials inspired by the natural world and the uniquely smooth Spring Drive movement define the house.",
    accent: "#2f4a52",
  },
  {
    slug: "cartier",
    name: "Cartier",
    country: "France",
    founded: 1847,
    tagline: "The story of elegance",
    description:
      "Cartier is a jeweller first and a watchmaker by instinct. The Santos, Tank and Ballon Bleu are design icons — Parisian elegance translated into objects made to be worn for decades.",
    accent: "#7b1f2b",
  },
  {
    slug: "casio",
    name: "Casio",
    country: "Japan",
    founded: 1946,
    tagline: "The watch that earned its place",
    description:
      "Casio created the G-Shock and changed what a watch could survive. Practical, tough and endlessly collectible, Casio watches are a reminder that great design does not need a great price.",
    accent: "#2b2d31",
  },
  {
    slug: "breitling",
    name: "Breitling",
    country: "Switzerland",
    founded: 1884,
    tagline: "Aviation, by design",
    description:
      "Breitling built the first wrist-worn chronographs for pilots and has been instrumenting the cockpit ever since. Its watches are legible, technical and built for action.",
    accent: "#173a5e",
  },
  {
    slug: "iwc",
    name: "IWC Schaffhausen",
    country: "Switzerland",
    founded: 1868,
    tagline: "Engineering for the few",
    description:
      "IWC approaches watchmaking like engineering: clean dials, purposeful complications and a restrained, industrial elegance that has defined the Portugieser and Pilot families.",
    accent: "#3b3f46",
  },
  {
    slug: "armani-exchange",
    name: "Armani Exchange",
    country: "Italy",
    founded: 1991,
    tagline: "Milanese style, everyday attitude",
    description:
      "Armani Exchange distils the Armani aesthetic into accessible, urban watches. Graphic chronographs, slim leather pieces and confident steel cases — designed in Milan, worn everywhere.",
    accent: "#1b1b1b",
  },
  {
    slug: "tommy-hilfiger",
    name: "Tommy Hilfiger",
    country: "United States",
    founded: 1985,
    tagline: "Classic American, everyday confidence",
    description:
      "Tommy Hilfiger brings the ease of American sportswear to the wrist. Open-heart automatics, bold chronographs and two-tone bracelets — recognisable, wearable and built for daily life.",
    accent: "#0f2f5c",
  },
];

export function getBrand(slug: string): Brand | undefined {
  return brands.find((brand) => brand.slug === slug);
}
