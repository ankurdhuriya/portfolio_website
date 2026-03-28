import { useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CaseStudyPage from './pages/CaseStudyPage';

// A simple 404 Component
const NotFound = () => (
  <div style={{ padding: "50px", textAlign: "center" }}>
    <h1>404 - Page Not Found</h1>
    <p>Oops! The page you're looking for doesn't exist.</p>
    <Link to="/" style={{ color: "#0070f3", textDecoration: "underline" }}>
      Return Home
    </Link>
  </div>
);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work/:slug" element={<CaseStudyPage />} />
        
        {/* The Catch-all Route: Must be the LAST route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;