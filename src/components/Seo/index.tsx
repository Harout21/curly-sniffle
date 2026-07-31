import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router-dom";

interface SEOProps {
    page: string;
    titleOverride?: string;
    descriptionOverride?: string;
    imageOverride?: string;
}

const DOMAIN = "https://bestproject.am";
const SUPPORTED_LANGS = ["hy", "en", "ru"];

export default function SEO({
                                page,
                                titleOverride,
                                descriptionOverride,
                                imageOverride,
                            }: SEOProps) {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const { lang } = useParams<{ lang: string }>();

    const currentLang = lang || i18n.language || "hy";

    // 1. Title and Description Fallbacks
    const seoTitle = titleOverride || t(`seo.${page}.title`, "Best Project - Solid Surface Stones");
    const seoDescription = descriptionOverride || t(`seo.${page}.description`, "Best Project - High quality Corian and Grandex solid surface stone solutions.");
    const seoImage = imageOverride || `${DOMAIN}/apple-touch-icon.png`;

    // 2. Extract clean path without current language prefix safely
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const cleanPathSegments =
        pathSegments.length > 0 && SUPPORTED_LANGS.includes(pathSegments[0])
            ? pathSegments.slice(1)
            : pathSegments;

    // Construct path without lang, ensuring it starts with / but avoids trailing double slashes
    const pathWithoutLang = cleanPathSegments.length > 0 ? `/${cleanPathSegments.join("/")}` : "";

    // 3. Full Canonical URL (e.g., https://bestproject.am/hy/stones/corian)
    const canonicalUrl = `${DOMAIN}/${currentLang}${pathWithoutLang}${location.search}`;

    return (
        <Helmet>
            {/* Basic HTML Meta Tags */}
            <title>{seoTitle}</title>
            <meta name="description" content={seoDescription} />
            <link rel="canonical" href={canonicalUrl} />

            {/* 🌐 SEO HREFLANG ALTERNATE TAGS */}
            {SUPPORTED_LANGS.map((supportedLang) => (
                <link
                    key={supportedLang}
                    rel="alternate"
                    hrefLang={supportedLang}
                    href={`${DOMAIN}/${supportedLang}${pathWithoutLang}`}
                />
            ))}
            {/* Default fallback language for search engines */}
            <link
                rel="alternate"
                hrefLang="x-default"
                href={`${DOMAIN}/hy${pathWithoutLang}`}
            />

            {/* 📲 OPEN GRAPH (Facebook / LinkedIn / Telegram) */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={seoTitle} />
            <meta property="og:description" content={seoDescription} />
            <meta property="og:image" content={seoImage} />
            <meta property="og:locale" content={currentLang === "hy" ? "hy_AM" : currentLang === "ru" ? "ru_RU" : "en_US"} />

            {/* 🐦 TWITTER CARDS */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={canonicalUrl} />
            <meta name="twitter:title" content={seoTitle} />
            <meta name="twitter:description" content={seoDescription} />
            <meta name="twitter:image" content={seoImage} />
        </Helmet>
    );
}