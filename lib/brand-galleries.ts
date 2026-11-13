import type { GalleryItem } from "./gallery";
import { armaniGallery } from "./armani-gallery";
import { fossilGallery } from "./fossil-gallery";
import { tissotGallery } from "./tissot-gallery";
import { tommyGallery } from "./tommy-gallery";

/**
 * Brand photo libraries shown on each brand page.
 * Add a brand here once its photos have been optimised into /public/watches.
 */
export const brandGalleries: Record<string, GalleryItem[]> = {
  tissot: tissotGallery,
  "armani-exchange": armaniGallery,
  "tommy-hilfiger": tommyGallery,
  fossil: fossilGallery,
};
