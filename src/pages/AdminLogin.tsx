import React, { useState } from 'react';
import { adminLogin } from '../api/admin';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Lock } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (token: string) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await adminLogin(username, password);
      localStorage.setItem('adminToken', data.token);
      onLogin(data.token);
    } catch (err) {
      setError('Identifiants incorrects');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <div className="glass-card p-8 rounded-3xl space-y-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gala-gold/10 rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8 text-gala-gold" />
          </div>
          <h2 className="text-2xl font-serif text-white">Connexion Admin</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 text-red-500 p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}
          <Input 
            label="Nom d'utilisateur" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
          <Input 
            label="Mot de passe" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <Button type="submit" isLoading={loading} className="w-full bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#C5A059] text-black font-bold">
            Se connecter
          </Button>
        </form>
      </div>
    </div>
  );
};
