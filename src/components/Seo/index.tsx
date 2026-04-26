import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export default function SEO({ page = "home" }) {
    const { t } = useTranslation();

    return (
        <Helmet>
            {/* Title */}
            <title>{t(`seo.${page}.title`)}</title>

            {/* Description */}
            <meta name="description" content={t(`seo.${page}.description`)} />

            {/* Open Graph */}
            <meta property="og:title" content={t(`seo.${page}.title`)} />
            <meta property="og:description" content={t(`seo.${page}.description`)} />
            <meta property="og:type" content="website" />
        </Helmet>
    );
}