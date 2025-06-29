import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/HomePage';
import Dashboard from '@/components/specific/Dashboard';
import DecisionForm from '@/components/specific/DecisionForm';
import SimulationResults from '@/components/specific/SimulationResults';
import AuthCallback from '@/components/common/AuthCallback';
import PricingSection from '@/components/premium/PricingSection';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/simulate" element={<DecisionForm />} />
                <Route path="/simulation/:simulationId" element={<SimulationResults />} />
                <Route
                  path="/pricing"
                  element={
                    <div className="py-24">
                      <PricingSection />
                    </div>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-4xl font-dotted text-emerald-400 mb-4">ABOUT US</h1>
                        <p className="text-xl text-gray-300 max-w-2xl">
                          We're building the future of decision-making with AI-powered life
                          simulations.
                        </p>
                      </div>
                    </div>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-4xl font-dotted text-emerald-400 mb-4">CONTACT US</h1>
                        <p className="text-xl text-gray-300 max-w-2xl">
                          Get in touch: hello@whatiflife.com
                        </p>
                      </div>
                    </div>
                  }
                />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
