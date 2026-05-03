import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export default function SEO({ page, titleOverride, descriptionOverride }) {
    const { t } = useTranslation();

    // If titleOverride exists (for single pages), use it.
    // Otherwise, fallback to the translation file keys.
    const seoTitle = titleOverride || t(`seo.${page}.title`);
    const seoDescription = descriptionOverride || t(`seo.${page}.description`);

    return (
        <Helmet>
            <title>{seoTitle}</title>
            <meta name="description" content={seoDescription} />

            {/* OG Tags for Social Media sharing */}
            <meta property="og:title" content={seoTitle} />
            <meta property="og:description" content={seoDescription} />
        </Helmet>
    );
}