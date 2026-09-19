# Ghost-Slip — Founding 50 GitHub Pages package

This is a static, mobile-first landing page for the first paid-reservation validation test.

## Publish on GitHub Pages
1. Create a repository, e.g. `ghost-slip-founding-50`.
2. Upload everything in this folder to the repository root.
3. In GitHub: **Settings → Pages → Build and deployment → Deploy from a branch**.
4. Choose the `main` branch and `/ (root)`.
5. GitHub will display the public Pages URL.

## Before sending the page to anyone
Edit `config.js`:
- `formEndpoint`: create a Formspree form (or replace the JS submission with your preferred form provider).
- `paymentUrl`: Stripe, Mercado Pago, PayPal or another payment-link URL.
- `contactEmail` / `whatsappNumber`: optional contact fallbacks.
- `videoEmbedUrl`: add the real demo video later.
- `ga4Id` / `metaPixelId`: optional analytics.
- change `setupMode` from `true` to `false`.

## Reservation flow
Visitor → landing page → form → form data stored by your form provider → redirect to reservation payment link.

Recommended starting reservation: **MX$250**, refundable while the product remains in validation. Review the reservation terms with local counsel before accepting funds.

## Video
Record the real prototype:
1. phone insertion
2. rear-waist placement
3. walking
4. sitting
5. bending
6. stairs
7. jumping
8. one-hand removal

Upload to YouTube/Vimeo and paste the embed URL into `config.js`.

## Measurement
Use UTM-tagged links for every outreach source:
`?utm_source=whatsapp&utm_medium=personal&utm_campaign=founding50&utm_content=family`

Capture at minimum:
- country
- phone model / case
- current carry method
- primary reason
- reservation
- referral source

## Legal / trust
The included reservation terms and privacy pages are drafts for launch preparation, not jurisdiction-specific legal advice.
