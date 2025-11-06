import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import { FormPage } from "./Pages/FormPage";
import { ThankYou } from "./Pages/ThankYou";
import { Disqualified } from "./Pages/Disqualified";


function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Hero />} />
                    <Route path="/form" element={<FormPage />} />
                    <Route path="/thank-you" element={<ThankYou />} />
                    <Route path="/disqualified" element={<Disqualified />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
