import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Project from "./pages/Project";
import About from "./pages/About";
import "./index.css";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide loading screen after everything has presumably loaded
    const handleLoad = () => setLoading(false);
    
    // If the page is already fully loaded
    if (document.readyState === 'complete') {
      const timer = setTimeout(() => setLoading(false), 800);
      return () => clearTimeout(timer);
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <>
      {loading && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'var(--primary-background)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--blue-500)', fontSize: '24px', fontFamily: 'var(--primary-font)'
        }}>
          Loading...
        </div>
      )}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<Project />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
