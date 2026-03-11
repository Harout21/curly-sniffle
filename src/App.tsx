import {Navigation} from "./components/Navigation";
import {Hero} from "./components/Hero";
import {AboutUs} from "./components/AboutUs";
import {ProductionProcess} from "./components/ProductionProcess";
import {Technologies} from "./components/Technologies";
import {Products} from "./components/Products";
import {Projects} from "./components/Projects";
import {Contact} from "./components/Contact";
import {Footer} from "./components/Footer";
import {PriceCalculator} from "./components/PriceCalculator";


export default function App() {
    return (
        <div className="min-h-screen">
            <Navigation/>
            <Hero/>
            <AboutUs/>
            <ProductionProcess/>
            <PriceCalculator/>
            <Technologies/>
            <Products/>
            <Projects/>
            <Contact/>
            <Footer/>
        </div>
    );
}
