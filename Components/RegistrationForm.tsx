'use client';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from "sonner";
// Removed: import { supabase } from '@/supabaseClient';

interface RegistrationFormProps {
  onSubmit: (data: RegistrationData) => void;
}

export interface RegistrationData {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  specialty: string;
  registrationDate: string;
}

// 🛑 REMOVED: const GOOGLE_SCRIPT_URL = "..."; 🛑

// 🛑 CRITICAL: OFFICIAL PAYMENT DETAILS 🛑
const PAYMENT_RECIPIENT_NAME = "Telemi Gospel Music";
const PAYMENT_ACCOUNT_NUMBER = "2003583162";
const PAYMENT_BANK_NAME = "First Bank";
const WHATSAPP_NUMBER = "2348023348579";


export function RegistrationForm({ onSubmit }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    specialty: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // --- Validation Checks ---
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.specialty) {
      toast.error('Please fill in all required fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (formData.phone.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    setIsSubmitting(true);

    try {
      const registrationData: RegistrationData = {
        ...formData,
        registrationDate: new Date().toISOString(),
      };

      // 🛑 REMOVED: All Google Sheet fetch code 🛑
      // We rely solely on the onSubmit call below to save the data.

      // --- SUCCESS LOGIC: Local storage save is handled by the parent component (AdminManager) ---
      // This call updates the parent state, which triggers the Local Storage save.
      onSubmit(registrationData); 
      toast.success('Registration saved! Please complete your payment.');
      
      // Switch the view to the payment success screen
      setIsRegistered(true); 

    } catch (error) {
      console.error("Unexpected Submission Error:", error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // -----------------------------------------------------------
  // Conditional Render: Show Payment View if Registration is Complete
  // -----------------------------------------------------------

  if (isRegistered) {
    const userFullName = `${formData.firstName} ${formData.lastName}`;
    const initialMessage = `Hello, my name is ${userFullName} and I have successfully registered with the email: ${formData.email}. I am now sending my payment receipt.`;
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(initialMessage)}`;
    
    return (
      <div className="p-6 border border-green-400 bg-green-50 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-4">✅ Registration Successful!</h2>
        <p className="text-gray-700 mb-6">
            Your details have been saved. Please complete your registration by making the payment below and sending the receipt via WhatsApp.
        </p>
        
        <div className="bg-white p-4 border border-amber-300 rounded-md mb-6">
          <h3 className="text-xl font-semibold mb-3 text-amber-600">Payment Details:</h3>
          <p className="text-left mb-2">
            <span className="font-medium text-gray-800">Bank Name:</span> {PAYMENT_BANK_NAME}
          </p>
          <p className="text-left mb-2">
            <span className="font-medium text-gray-800">Account Name:</span> {PAYMENT_RECIPIENT_NAME}
          </p>
          <p className="text-left font-extrabold text-2xl text-red-600">
            {PAYMENT_ACCOUNT_NUMBER}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            (Please verify the name and account number before payment)
          </p>
        </div>

        <a 
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="w-full bg-green-500 hover:bg-green-600">
            Send Receipt to WhatsApp
          </Button>
        </a>
      </div>
    );
  }

  // -----------------------------------------------------------
  // Original Form View (Renders if isRegistered is false)
  // -----------------------------------------------------------
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            required
            placeholder="Enter first name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="middleName">Middle Name</Label>
          <Input
            id="middleName"
            value={formData.middleName}
            onChange={(e) => handleChange('middleName', e.target.value)}
            placeholder="Enter middle name (optional)"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            required
            placeholder="Enter last name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
            placeholder="your.email@example.com"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            required
            placeholder="+234 xxx xxx xxxx"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="specialty" className="text-gray-700">Specialty *</Label>
          <Select value={formData.specialty} onValueChange={(value: string) => handleChange('specialty', value)}>
            <SelectTrigger 
              id="specialty"
              className="h-10 border border-amber-300 text-gray-900"
            >
              <SelectValue placeholder="Select your specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Singer">Singer</SelectItem>
              <SelectItem value="Instrumentalist">Instrumentalist</SelectItem>
              <SelectItem value="Producer">Producer</SelectItem>
              <SelectItem value="Others">Others</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-linear-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600"
      >
        {isSubmitting ? 'Submitting...' : 'Register Now'}
      </Button>
    </form>
  );
}