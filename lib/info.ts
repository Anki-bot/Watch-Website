export type InfoSection = {
  heading: string;
  body: string[];
  bullets?: string[];
};

export type InfoPage = {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  sections: InfoSection[];
  faqs?: { question: string; answer: string }[];
};

export const infoPages: InfoPage[] = [
  {
    slug: "about",
    title: "Our story",
    eyebrow: "The house",
    intro:
      "Meridian is a small watch house in New York, built on a simple idea: keep fewer watches, choose them better, and look after them for life.",
    sections: [
      {
        heading: "A smaller, more considered collection",
        body: [
          "Meridian began in 2014 as a single cabinet of watches in a downtown studio. We were collectors first, and we were frustrated by how difficult it was to find well-chosen pieces presented honestly — without noise, exaggeration or pressure.",
          "Today the collection spans fourteen houses, from Rolex and Omega to Grand Seiko and Seiko. It is deliberately small. We would rather know every reference intimately than carry a thousand watches we have never worn.",
        ],
      },
      {
        heading: "Examined by hand, not by algorithm",
        body: [
          "Every watch passes through our atelier before it is photographed or listed. Our watchmakers inspect the movement, case, dial, hands and bracelet, then run the watch on a timing machine and check water resistance where appropriate.",
          "What we find is written into the listing — including the things a photograph cannot show. If a piece is not right for us, it does not reach the site.",
        ],
      },
      {
        heading: "Built for the long term",
        body: [
          "A fine watch should outlive its first owner. We support every piece we sell with a 24-month mechanical warranty and lifetime service advice, and we are always happy to help with a strap change, a service referral or a question about provenance.",
          "If you are in New York, you are welcome to visit the atelier by appointment. There is a pot of coffee and usually a watch or two on the table.",
        ],
        bullets: [
          "Founded in New York in 2014",
          "Fourteen maisons, curated by hand",
          "In-house authentication and servicing support",
          "24-month mechanical warranty on every watch",
        ],
      },
    ],
  },
  {
    slug: "shipping",
    title: "Shipping & returns",
    eyebrow: "Client care",
    intro:
      "Every order is packed by hand, fully insured, and sent with signature required. Here is exactly what to expect.",
    sections: [
      {
        heading: "Processing",
        body: [
          "In-stock orders are dispatched within one business day. You will receive a confirmation email when your order is placed and a tracking link once it leaves the atelier.",
          "If you need a watch by a specific date, write to care@meridian.watch before ordering and we will do our best to accommodate.",
        ],
      },
      {
        heading: "Delivery",
        body: [
          "Domestic orders arrive in 2–4 business days via insured express courier. International delivery usually takes 5–10 business days, depending on destination and customs.",
          "All shipments require an adult signature. We cannot deliver to PO boxes or leave packages unattended.",
        ],
        bullets: [
          "Complimentary insured shipping on orders over $1,000",
          "A flat $25 insured shipping fee below that threshold",
          "Tracked, signature-required delivery on every order",
          "Import duties and taxes are the responsibility of the recipient",
        ],
      },
      {
        heading: "Returns",
        body: [
          "If a watch is not right, you may return it within 14 days of delivery for a full refund. It must be unworn, with all protective stickers, tags, documents and packaging intact.",
          "Email care@meridian.watch with your order number and we will arrange a fully insured return label. Refunds are issued to the original payment method within five business days of inspection.",
          "Engraved or customised pieces, and watches that have been worn or sized, cannot be returned.",
        ],
      },
    ],
  },
  {
    slug: "warranty",
    title: "Warranty",
    eyebrow: "Client care",
    intro:
      "Every watch sold by Meridian is covered by our own 24-month mechanical warranty — and by our help for as long as you own it.",
    sections: [
      {
        heading: "What is covered",
        body: [
          "The Meridian warranty covers mechanical defects in the movement, including faults in timekeeping, winding, date changes and chronograph function that arise under normal use.",
          "Where the original manufacturer's warranty is still active, we will help you use it. Our warranty sits alongside it, not instead of it.",
        ],
      },
      {
        heading: "What is not covered",
        body: [
          "The warranty does not cover normal wear, accidental damage, water damage from improper use, magnetic damage, or work carried out by a third-party watchmaker. It also does not cover straps, crystals or batteries, which are consumable items.",
        ],
      },
      {
        heading: "Making a claim",
        body: [
          "Write to care@meridian.watch with your order number and a description of the issue. We will arrange insured shipping to our atelier, assess the watch, and keep you updated at every stage.",
          "Most mechanical services are completed within two to four weeks. We will always confirm costs with you before any work begins.",
        ],
      },
    ],
  },
  {
    slug: "authentication",
    title: "Authentication",
    eyebrow: "The standard",
    intro:
      "Every watch is examined in-house before it is offered. No exceptions, no shortcuts, and no reliance on paperwork alone.",
    sections: [
      {
        heading: "Sourcing",
        body: [
          "We buy from established dealers, private collectors and long-standing trade partners. Provenance matters to us as much as condition, and we decline watches whose history cannot be explained.",
        ],
      },
      {
        heading: "Inspection",
        body: [
          "Our watchmakers check the case and lugs for refinishing or damage, verify dial and hand originality where possible, inspect the movement, and test timekeeping on a timing machine. Where a watch is rated for water resistance, we pressure test it.",
          "Reference numbers, serial placement, engravings and bracelet codes are checked against our records. Anything that does not add up is investigated further or rejected.",
        ],
        bullets: [
          "Case, dial, hands and movement inspected by hand",
          "Timekeeping verified on a timing machine",
          "Water resistance tested where applicable",
          "Reference and serial details cross-checked",
        ],
      },
      {
        heading: "What you receive",
        body: [
          "Every watch ships with a Meridian certificate of authentication, the 24-month warranty card, and any original box and papers where stated in the listing. If a watch is sold without original papers, we say so clearly.",
        ],
      },
    ],
  },
  {
    slug: "contact",
    title: "Concierge",
    eyebrow: "We're here",
    intro:
      "Questions about a watch, a sizing detail, or a reference you cannot find? Write to us — a real person will answer.",
    sections: [
      {
        heading: "The atelier",
        body: [
          "Meridian Fine Timepieces",
          "18 Crosby Street, Floor 3",
          "New York, NY 10013",
        ],
        bullets: [
          "Monday–Friday, 10am–6pm ET",
          "Saturday by appointment",
          "care@meridian.watch",
          "+1 (212) 555-0148",
        ],
      },
      {
        heading: "Sourcing requests",
        body: [
          "If you are looking for a specific reference, tell us the model, year and condition you have in mind. We will search our trade network and come back to you within two business days with options.",
        ],
      },
    ],
  },
  {
    slug: "faq",
    title: "Questions, answered",
    eyebrow: "Client care",
    intro: "The things people ask us most, in plain language.",
    sections: [],
    faqs: [
      {
        question: "Are all of your watches authentic?",
        answer:
          "Yes. Every watch is inspected and authenticated by our in-house watchmakers before it is listed. Each purchase ships with a Meridian certificate of authentication.",
      },
      {
        question: "Do watches come with box and papers?",
        answer:
          "Where available, yes — and the listing will tell you exactly what is included. Some pre-owned pieces are sold as watch only, which is reflected in the price.",
      },
      {
        question: "Can I return a watch?",
        answer:
          "You have 14 days from delivery to return an unworn watch in its original condition and packaging for a full refund. Return shipping is covered by us.",
      },
      {
        question: "Do you offer servicing?",
        answer:
          "Yes. Our watchmakers can service most mechanical watches, and we are happy to advise on manufacturer servicing for more complex pieces. Email us for a quote.",
      },
      {
        question: "How do I know a watch will fit?",
        answer:
          "Case sizes and strap details are listed on every product page. If you are unsure, send us your wrist measurement and we will make a recommendation. Bracelets can usually be adjusted before dispatch at no cost.",
      },
      {
        question: "Can you source a specific reference?",
        answer:
          "Often, yes. Send the details to care@meridian.watch and we will search our trade network. Sourcing usually takes two to six weeks depending on rarity.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "Our demonstration checkout accepts card payments in test mode. In a live store we would accept major cards, bank transfer and PayPal.",
      },
      {
        question: "Is this a real store?",
        answer:
          "This is a demonstration storefront built to showcase the Meridian collection and experience. No payments are processed and no orders are shipped.",
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy",
    eyebrow: "Legal",
    intro:
      "We collect as little as possible, use it only to serve you, and never sell it. Here is the detail.",
    sections: [
      {
        heading: "Information we collect",
        body: [
          "When you place an order or contact us we collect your name, email address, shipping address, phone number and order details. In a live checkout, payment details would be handled by our payment processor and never stored on our servers.",
          "This demonstration site stores your bag and wishlist locally in your browser. No data is transmitted to a server.",
        ],
      },
      {
        heading: "How we use it",
        body: [
          "To process orders, arrange delivery, provide warranty support, answer questions, and — only if you opt in — send our occasional newsletter.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          "You may request a copy of your data, correct it, or ask us to delete it at any time by writing to care@meridian.watch. We will respond within 30 days.",
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of sale",
    eyebrow: "Legal",
    intro:
      "The straightforward terms that apply when you shop with Meridian.",
    sections: [
      {
        heading: "Orders",
        body: [
          "All orders are subject to acceptance and availability. We reserve the right to decline an order where a watch has sold elsewhere, where pricing is clearly in error, or where we cannot verify the purchaser.",
          "This demonstration checkout does not create a binding sale and no payment is taken.",
        ],
      },
      {
        heading: "Pricing",
        body: [
          "Prices are shown in US dollars. Shipping and applicable tax are calculated at checkout. International duties and import taxes are the responsibility of the buyer.",
        ],
      },
      {
        heading: "Condition and descriptions",
        body: [
          "We describe every watch as accurately as we can, including any refinishing or replacement parts we identify. Studio renders on this demonstration site are illustrative; in a live store, each listing would show photographs of the actual watch.",
        ],
      },
      {
        heading: "Returns and warranty",
        body: [
          "Returns are accepted within 14 days in unworn condition. The Meridian 24-month mechanical warranty applies alongside any remaining manufacturer warranty.",
        ],
      },
      {
        heading: "Governing law",
        body: [
          "These terms are governed by the laws of the State of New York. Any dispute will be subject to the exclusive jurisdiction of the courts of New York County.",
        ],
      },
    ],
  },
];

export const infoSlugs = infoPages.map((page) => page.slug);

export function getInfoPage(slug: string): InfoPage | undefined {
  return infoPages.find((page) => page.slug === slug);
}
