import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import { FormPage } from "./Pages/FormPage";
import { ThankYou } from "./Pages/ThankYou";
import { Disqualified } from "./Pages/Disqualified";

function LandingPage() {
    return (
        <>
            <Navbar />
            <main className="flex-grow">
                <Hero />
                {/* Additional sections will go here */}
            </main>
            <Footer />
        </>
    );
}

function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/form" element={<FormPage />} />
                <Route path="/thank-you" element={<ThankYou />} />
                <Route path="/disqualified" element={<Disqualified />} />
            </Routes>
        </div>
    );
}

export default App;
