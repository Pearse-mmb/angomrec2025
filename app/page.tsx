'use client';
import { useState } from 'react';
import { RegistrationForm, RegistrationData } from '@/Components/RegistrationForm';
import { AdminDashboard } from '@/Components/AdminDashboard';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Calendar, MapPin, Clock, Music, Mic2, Users, Award, ShieldCheck } from 'lucide-react';
import { Badge } from '@/Components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/Components/ui/dailog';
import { Label } from '@/Components/ui/label';



import * as sonner from 'sonner';
const sonner203 = sonner;



const ADMIN_PASSWORD = '@angomrec2025!'; 

export default function App() {
  const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');


  const handleRegistration = (data: RegistrationData) => {

    const existingRegistration = registrations.find(
      reg => reg.email.toLowerCase() === data.email.toLowerCase()
    );

    if (existingRegistration) {
      sonner203.toast.error('This email is already registered!', {
        description: 'Please use a different email address or contact support.',
      });
      return;
    }

    // Add registration
    setRegistrations(prev => [...prev, data]);
    
    const fullName = `${data.firstName} ${data.middleName} ${data.lastName}`.trim();
    
    sonner203.toast.success('Registration Successful!', {
      description: 'Click below to complete payment via WhatsApp',
      action: {
        label: 'Pay via WhatsApp',
        onClick: () => {
          const message = `Hello, I just registered for ANGOMREC 10th Anniversary.%0A%0AName: ${fullName}%0AEmail: ${data.email}%0APhone: ${data.phone}%0ASpecialty: ${data.specialty}%0A%0AI would like to complete my payment of ₦5,000.`;
          window.open(`https://wa.me/+2348023248579?text=${message}`, '_blank');
        },
      },
    });
  };

  // Handle admin login
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAdminLoggedIn(true);
      setShowAdminLogin(false);
      setAdminPassword('');
      sonner203.toast.success('Welcome, Admin!');
    } else {
      sonner203.toast.error('Incorrect password. Please try again.');
      setAdminPassword('');
    }
  };

  // Handle admin logout
  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    sonner203.toast.success('Logged out successfully');
  };

  // Show admin dashboard if logged in
  if (isAdminLoggedIn) {
    return (
      <>
        <AdminDashboard registrations={registrations} onLogout={handleAdminLogout} />
        <sonner203.Toaster position="top-center" richColors />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-800 via-amber-600 to-yellow-400">

      <sonner203.Toaster position="top-center" richColors />
      
      {/* Admin Login Button */}
      <div className="fixed top-4 right-4 z-50">
        <Button 
          onClick={() => setShowAdminLogin(true)}
          variant="outline"
          className="bg-white/10 backdrop-blur-md shadow-2xl text-black border-4 border-amber-100"
        >
          <ShieldCheck className="h-4 w-4 mr-2 text-black" />
          Admin
        </Button>
      </div>

      {/* Admin Login Modal */}
      <Dialog open={showAdminLogin} onOpenChange={setShowAdminLogin}>
  <DialogContent className="sm:max-w-[420px] p-8 border-4 border-amber-200 shadow-2xl">
    <DialogHeader>
      {/* Title is a rich amber color */}
      <DialogTitle className="text-3xl font-extrabold text-amber-900 flex items-center justify-center gap-2">
        <ShieldCheck className="h-6 w-6" /> Admin Access
      </DialogTitle>
      {/* Description is clear and slightly darker */}
      <DialogDescription className="text-gray-600 text-center mt-2">
        Enter the secure password to access the registration dashboard.
      </DialogDescription>
    </DialogHeader>
    <form onSubmit={handleAdminLogin} className="space-y-6 pt-4">
      <div className="space-y-2">
        <Label htmlFor="password" className="text-amber-800 font-semibold">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          placeholder="Enter admin password"
          // Added focus styling
          className="h-10 border-amber-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          required
        />
      </div>
      <Button 
        type="submit" 
        // Corrected typo from 'bg-linear-to-r' to 'bg-gradient-to-r'
        className="w-full h-12 bg-linear-to-r from-amber-600 to-yellow-600 font-bold text-lg 
                   hover:from-amber-700 hover:to-yellow-700 transition-all shadow-lg hover:shadow-xl"
      >
        Login
      </Button>
    </form>
  </DialogContent>
</Dialog>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
  {/* Overlay */}
  <div className="absolute inset-0 bg-linear-to-r from-amber-900/90 to-yellow-900/90 z-10"></div>


  {/* Content */}
  <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
  <div className="text-center text-white">
    {/* Enhanced Badge */}
    <Badge 
  className="bg-amber-900 border-2 border-yellow-400 text-yellow-300 hover:bg-amber-800 mb-6 font-bold text-sm uppercase tracking-widest px-4 py-1"
>10th Anniversary Celebration
</Badge>
    {/* Enhanced Title with Gold Shadow */}
    <h1 
      className="text-white mb-4 text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight"
      style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 215, 0, 0.4)' }}
    >
      ANGOMREC 2025
    </h1>
    
    {/* Main Tagline */}
    <p className="text-xl md:text-2xl mb-10 text-yellow-300 font-medium italic">
      All Nigerian Gospel Music Revival Conference
    </p>
    
    {/* Event Details - Improved Color Contrast */}
    <div className="flex flex-wrap justify-center gap-6 mb-12">
  <div className="flex items-center gap-2 text-yellow-200 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
    <Calendar className="h-5 w-5 text-yellow-400" />
    <span className="font-semibold">December 17th, 2025</span>
  </div>

 
  <div className="flex items-center gap-2 text-yellow-200 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg -mt-2 sm:mt-0">
  <MapPin className="h-5 w-5 text-yellow-400 relative -top-3 sm:top-0" />

    <span className="font-semibold">
    Radio Lagos,  Lateef Jakande Road, Agidingbi Ikeja Lagos
    </span>
  </div>

  <div className="flex items-center gap-2 text-yellow-200 bg-white/10 backdrop-blur-sm px-6 py-4 rounded-lg">
    <span className="font-semibold">₦5,000</span>
  </div>
</div>

   
    <div className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-3 rounded-full shadow-2xl font-bold tracking-wider animate-pulse">
      
      Registration closes November 30th, 2025
    </div>
  </div>
</div>
</section>


    
      <section className="py-20 md:py-32 bg-amber-50"> 
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-amber-900 mb-4 text-4xl font-extrabold">Why Attend ANGOMREC?</h2>
      <p className="text-gray-700 max-w-3xl mx-auto text-lg">
        Join us for an unforgettable experience of worship, learning, and networking with gospel music industry leaders.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* CARD 1: Worship & Revival */}
      <Card className="border-t-4 border-amber-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <CardContent className="pt-8 p-6">
          <div className="h-16 w-16 bg-linear-to-br from-amber-600 to-yellow-500 rounded-xl flex items-center justify-center mb-4 shadow-xl">
            <Music className="h-8 w-8 text-white" />
          </div>
          <h3 className="mb-2 text-2xl font-bold text-amber-900">Worship & Revival</h3>
          <p className="text-gray-600">
            Experience powerful worship sessions** and spiritual revival that will transform your music ministry and life.
          </p>
        </CardContent>
      </Card>

     
      <Card className="border-t-4 border-amber-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <CardContent className="pt-8 p-6">
          <div className="h-16 w-16 bg-linear-to-br from-amber-600 to-yellow-500 rounded-xl flex items-center justify-center mb-4 shadow-xl">
            <Mic2 className="h-8 w-8 text-white" />
          </div>
          <h3 className="mb-2 text-2xl font-bold text-amber-900">Expert Speakers</h3>
          <p className="text-gray-600">
            Learn from renowned gospel artists, producers, and industry experts sharing their insights and experiences.
          </p>
        </CardContent>
      </Card>

   
      <Card className="border-t-4 border-amber-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <CardContent className="pt-8 p-6">
          <div className="h-16 w-16 bg-linear-to-br from-amber-600 to-yellow-500 rounded-xl flex items-center justify-center mb-4 shadow-xl">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h3 className="mb-2 text-2xl font-bold text-amber-900">Networking</h3>
          <p className="text-gray-600">
            Connect with fellow gospel musicians and ministry leaders from across Nigeria to build meaningful collaborations.
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
</section>

      
      <section className="py-16 md:py-24 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-amber-900 mb-4 text-4xl font-extrabold">Our Esteemed Facilitators</h2>
      <p className="text-gray-700 max-w-3xl mx-auto text-lg">
        We are honored to host these seasoned men of God and industry pillars at ANGOMREC 2025.
      </p>
    </div>

    
    <div className="bg-amber-50 py-16 px-6">
  <h2 className="text-3xl font-semibold text-amber-900 text-center mb-12">
    Meet Our Facilitators
  </h2>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
  {[
    { name: "Pastor Wole Oladiyun", img: "/wole.jpeg", role: "Facilitator" },
    { name: "Pastor Joseph Ayewa", img: "/ayewa.jpeg", role: "Facilitator" },
    { name: "Timi Orokoya Telemi", img: "/timi.jpg", role: "Convener" },
    { name: "Tosin Alao", img: "/tosinnew.jpeg", role: "Facilitator" },
    { name: "Ayo Ajewole", img: "/woli.jpeg", role: "Facilitator" },
    { name: "Mike Abdul", img: "/mike.jpeg", role: "Facilitator" },
    { name: "Tope Olukole", img: "/olukole.jpg", role: "Conference Chairman " },
    { name: "Psalmist Isreal", img: "/psal.jpg", role: "Program Director" },
    { name: "Bunmi Leranmo", img: "/bu.jpg", role: "Welfare Director" },
    { name: "Bunmi Adegbite", img: "/adeg.jpg", role: "Conference Register" },
  ].map((person, i) => (
    <div
      key={i}
      className="text-center bg-white p-4 sm:p-5 rounded-xl shadow-md border-t-4 border-amber-500 hover:shadow-lg transition-all"
    >
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-3 rounded-full overflow-hidden border-4 border-amber-300 shadow-md">
        <img
          src={person.img}
          alt={person.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-base sm:text-lg font-semibold text-amber-900 mb-1">
        {person.name}
      </h3>
      <p className="text-sm text-amber-700 font-medium">{person.role}</p>
    </div>
  ))}
</div>

</div>

  </div>
</section>
      <section id="register" className="py-16 md:py-24 bg-white"> 
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-amber-900 mb-4 text-4xl font-extrabold">Register Now</h2>
          <p className="text-gray-600 text-lg">
            Secure your spot at ANGOMREC 2025. Registration fee is ₦5,000.
          </p>
        </div>

      
        <Card className="border-t-8 border-amber-400 shadow-2xl">
        
          <CardContent className="pt-6 text-gray-900"> 
          
            
            <RegistrationForm onSubmit={handleRegistration} />
            
          
            <div className="mt-8 p-4 bg-amber-50 rounded-lg border-2 border-amber-200">
              <p className="text-amber-900 font-bold mb-2 flex items-center gap-2">
          
              </p>
              <ol className="list-decimal list-inside text-gray-700 space-y-1 ml-4">
              <li> Name must match Account Details</li>
                <li> Complete the registration form above</li>
                <li>Click the WhatsApp button in the success message after payment </li>
                <li>Send payment of ₦5,000 to complete your registration</li>
                <li>Screenshot the account number </li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>

      <footer className="bg-linear-to-r from-amber-900 to-yellow-900 text-white py-14">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
      {/* Left Column */}
      <div>
        <h3 className="text-white mb-4 text-xl font-bold">ANGOMREC 2025</h3>
        <p className="text-amber-100 leading-relaxed">
          All Nigerian Gospel Music Revival Conference — 10th Anniversary Edition.<br />
          Theme: <span className="italic font-semibold text-yellow-300">Is It Possible? It Is Possible!</span>
        </p>
      </div>

      {/* Middle Column */}
      <div>
        <h3 className="text-white mb-4 text-xl font-bold">Contact & Event Info</h3>
        <div className="space-y-2 text-amber-100">
          <p><strong>Date:</strong> December 17th, 2025</p>
          <p><strong>Venue:</strong> Radio Lagos, Lateef Jakande Road Agidinbi Lagos</p>
         </div>
      </div>

      {/* Right Column */}
      <div>
        <h3 className="text-white mb-4 text-xl font-bold">Registration Details</h3>
        <div className="space-y-2 text-amber-100">
          <p><strong>Fee:</strong> ₦5,000</p>
          <p><strong>Account Name:</strong> Telemi Gospel Music</p>
          <p><strong>Account Number:</strong> 2003583162 — First Bank</p>
          <p><strong>Closing Date:</strong> November 30th, 2025</p>
          <Button
            onClick={() => {
              const registerSection = document.getElementById('register');
              registerSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            variant="outline"
            className="mt-2 bg-white text-amber-900 font-semibold hover:bg-amber-50"
          >
            Register Now
          </Button>
        </div>
      </div>
    </div>

    {/* Giveaway Notice */}
    <div className="mt-10 mx-auto max-w-xl bg-amber-800/40 border border-amber-600 py-6 px-4 rounded-xl text-center shadow-lg">
    <p className="text-yellow-300 font-extrabold text-lg mb-3">
        🎵 TELEMI GOSPEL MUSIC GIVEAWAY 🎵
    </p>
    <p className="text-amber-100 text-sm sm:text-base leading-relaxed">
        Telemi Gospel Music is giving out <strong>free 2 studio sessions each to 10 artistes</strong> to produce a three-minute single, <br className="sm:hidden" />
        and <strong>2 hours to 5 artistes for live studio worship recordings</strong>. 
        Winning envelopes will be available at the conference centre between <strong>8 AM and 10 AM</strong>.
    </p>
</div>

    {/* Footer Bottom */}
    <div className="border-t border-amber-700 pt-6 mt-10 text-center text-amber-100">
      <p>© 2025 ANGOMREC. All rights reserved. Celebrating 10 years of gospel music excellence.</p>
      <p className="text-sm text-amber-300 mt-2">
        Website developed by <strong>Pearse Boluwatife handle: +234-9069107129, 
        +234-9035133943</strong>
      </p>
    </div>
  </div>
      </footer>

    </div>
  );
}
