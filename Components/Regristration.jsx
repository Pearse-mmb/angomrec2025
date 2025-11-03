'use client'; // for Next.js app router — remove if using pages router

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
 
// Option A: import an existing supabase client from your project
// import { supabase } from '../lib/supabaseClient';

// Option B: create a local client here (ensure NEXT_PUBLIC_SUPABASE_URL/ANON_KEY are set)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function RegisterForm() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!firstName.trim() || !email.trim()) {
      setMessage({ type: 'error', text: 'Please provide both first name and email.' });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('registrations')
        .insert([{ firstName, email }])
        .select('id') // return the new id so you can display it if needed
        .single();

      if (error) {
        throw error;
      }

      setMessage({ type: 'success', text: `Registered successfully. Your registration id: ${data.id}` });
      setFirstName('');
      setEmail('');
    } catch (err) {
      console.error('Insert error', err);
      setMessage({ type: 'error', text: err.message || 'Unexpected error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 420 }}>
      <div>
        <label htmlFor="firstName">First name</label>
        <input
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div style={{ marginTop: 8 }}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div style={{ marginTop: 12 }}>
        <button type="submit" disabled={loading}>
          {loading ? 'Registering…' : 'Register'}
        </button>
      </div>

      {message && (
        <div style={{ marginTop: 12, color: message.type === 'error' ? 'crimson' : 'green' }}>
          {message.text}
        </div>
      )}
    </form>
  );
}