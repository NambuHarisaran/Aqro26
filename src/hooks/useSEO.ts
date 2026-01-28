import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
}

/**
 * Custom hook for setting page-specific SEO meta tags
 * Updates document title and meta description for each page
 */
export const useSEO = ({ title, description, canonical }: SEOProps) => {
  useEffect(() => {
    // Set document title
    const fullTitle = title.includes('AQRO') ? title : `${title} | AQRO`;
    document.title = fullTitle;

    // Update meta description if provided
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
      
      // Also update OG description
      let ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute('content', description);
      }
    }

    // Update canonical URL if provided
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute('href', canonical);
      }
    }

    // Cleanup - restore default title when component unmounts
    return () => {
      document.title = 'AQRO - Web Development, Video Editing & AI Ads | Creative Digital Agency India';
    };
  }, [title, description, canonical]);
};

export default useSEO;
