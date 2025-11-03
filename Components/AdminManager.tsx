'use client';
import { useState, useEffect } from 'react';
import { AdminDashboard } from './AdminDashboard'; // Assuming AdminDashboard is in the same folder
import { RegistrationForm, RegistrationData } from './RegistrationForm'; // Assuming RegistrationForm is in the same folder
import { toast } from 'sonner';

// Define the key for local storage
const LOCAL_STORAGE_KEY = 'angomrec_registrations';

export function AdminManager() {
  const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
  // In a real app, this would handle your login state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(true); 

  // 1. 📂 Load data from Local Storage when the component first mounts
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        // We ensure the saved data is treated as RegistrationData[]
        setRegistrations(JSON.parse(saved) as RegistrationData[]);
        toast.info(`Loaded ${JSON.parse(saved).length} registrations from local storage.`);
      }
    } catch (error) {
      console.error("Could not load data from local storage:", error);
      toast.error("Error loading saved data. Starting fresh.");
    }
  }, []);

  // 2. 📝 Function to handle new submissions (saves to state AND local storage)
  const handleNewRegistration = (data: RegistrationData) => {
    setRegistrations(prev => {
      const newRegistrations = [...prev, data];
      
      // Save the updated list back to Local Storage
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newRegistrations));
      
      return newRegistrations;
    });
    // The RegistrationForm already shows a success toast, so no need for another here.
  };

  // 3. 🚪 Simple Logout (clears session, but NOT the data)
  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    toast.info("Logged out. Local data is still available.");
    // In a real app, you might navigate away or show a login form
  };

  // --- RENDERING ---

  if (isAdminLoggedIn) {
    return (
      <AdminDashboard 
        registrations={registrations} 
        onLogout={handleLogout} 
      />
    );
  }

  // Fallback view for the main public form
  return (
    <div className="p-4 md:p-8 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold text-amber-800 mb-6 text-center">Register Now</h2>
      <RegistrationForm 
        onSubmit={handleNewRegistration} 
      />
      {/* You could add a login button here */}
    </div>
  );
}

// In your main page component (e.g., page.tsx), you would just render:
// <AdminManager />