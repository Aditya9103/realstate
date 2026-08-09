import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import './App.css'
import Layout from './components/layout/Layout'
import ScrollToTop from './components/layout/ScrollToTop'
import Home from './pages/Home'
import Properties from './pages/Properties'
import PropertyDetails from './pages/PropertyDetails'
import AboutUs from './pages/AboutUs'
import Services from './pages/Services'
import ServiceDetails from './pages/ServiceDetails'
import Contact from './pages/Contact'
import ScheduleVisit from './pages/ScheduleVisit'

// Admin imports
import AdminLogin from './pages/admin/AdminLogin'
import AdminSignup from './pages/admin/AdminSignup'
import AdminDashboard from './pages/admin/AdminDashboard'
import ManageProperties from './pages/admin/ManageProperties'
import AddEditProperty from './pages/admin/AddEditProperty'
import ManageMessages from './pages/admin/ManageMessages'
import ManageVisits from './pages/admin/ManageVisits'
import AdminSettings from './pages/admin/AdminSettings'
import ProtectedRoute from './components/admin/ProtectedRoute'
import AdminLayout from './components/admin/AdminLayout'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Admin Routes (No Layout) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="properties" element={<ManageProperties />} />
          <Route path="properties/add" element={<AddEditProperty />} />
          <Route path="properties/edit/:id" element={<AddEditProperty />} />
          <Route path="messages" element={<ManageMessages />} />
          <Route path="visits" element={<ManageVisits />} />
          <Route path="settings" element={<AdminSettings />} />
          {/* Add more protected admin routes here in the future */}
        </Route>

        {/* Public Routes (Wrapped in Layout) */}
        <Route path="*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetails />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/properties/:id" element={<PropertyDetails />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/schedule-visit" element={<ScheduleVisit />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </>
  )
}

export default App
