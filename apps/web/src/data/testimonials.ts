// Swap-ready testimonial store. EMPTY until we have REAL, user-approved
// testimonials collected in-app after a genuine win (see TestimonialPrompt +
// the `testimonials` table, migration 0031). NEVER add fabricated entries, 
// "no fake numbers / no fake reviews" is the brand's positioning and the FTC
// bans fake testimonials. While this is empty, the trust UI shows honest proof
// (the real usage counter + the evidence) instead of any quotes.
//
// To publish a real one: review pending rows in the `testimonials` table, then
// hand-add the approved quote here (curated, with the user's consent).

export interface Testimonial {
  quote: string;
  /** First name + last initial, or "A recruit", never a full name without consent. */
  name: string;
  /** Honest context, e.g. "Army · AFQT 42 → 58". */
  context?: string;
}

export const TESTIMONIALS: Testimonial[] = [];
