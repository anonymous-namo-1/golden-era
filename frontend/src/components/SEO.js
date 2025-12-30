import { Helmet } from 'react-helmet-async';

export const SEO = ({
  title,
  description,
  image = `${window.location.origin}/og-default.jpg`,
  url,
  type = 'website'
}) => {
  const siteName = 'The Golden Era';
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} - Premium Handcrafted Jewelry`;
  const canonicalUrl = url || window.location.href;

  const defaultDescription = "Discover exquisite handcrafted gold and diamond jewelry at The Golden Era. Premium quality, certified purity, and timeless designs. Shop online or visit our stores nationwide.";
  const metaDescription = description || defaultDescription;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={metaDescription} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
};
