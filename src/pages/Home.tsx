import {Hero} from "../components/Hero";
import {AboutUs} from "../components/AboutUs";
import {ProductionProcess} from "../components/ProductionProcess";
import {Technologies} from "../components/Technologies";
import {Products} from "../components/Products";
import {Projects} from "../components/Projects";
import {Contact} from "../components/Contact";
import {PriceCalculator} from "../components/PriceCalculator";
import SEO from "../components/Seo";
import {BrandCarousel} from "../components/BrandCarousel";


export default function Home() {
    return (
        <>
            <SEO page="home" />
            <div className="min-h-screen">
                <Hero/>
                <AboutUs/>
                <ProductionProcess/>
                <PriceCalculator/>
                <Technologies/>
                <BrandCarousel />
                <Products/>
                <Projects/>
                <Contact/>
            </div>
        </>
    );
}