import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/pages/Home';
import Experience from './components/pages/Experience';
import Skills from './components/pages/Skills';
import Education from './components/pages/Education';
import Projects from './components/pages/Projects';
import ProjectDetail from './components/pages/ProjectDetail';
import Awards from './components/pages/Awards';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Resume from './components/pages/Resume';

// Admin Components
import { AuthProvider } from './context/AuthContext';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import Login from './components/admin/Login';
import MFAChallenge from './components/admin/MFAChallenge';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Admin Routes - No public layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/mfa" element={<MFAChallenge />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          {/* Settings could be a separate component later */}
          <Route path="settings" element={<div style={{ padding: '2rem' }}>Settings view in progress...</div>} />
        </Route>

        {/* Public Routes - Wrapped in Layout */}
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/education" element={<Education />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/awards" element={<Awards />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </AuthProvider>
  );
}

export default App;
