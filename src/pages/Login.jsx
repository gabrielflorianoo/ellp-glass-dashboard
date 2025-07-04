
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import GlassCard from '../components/GlassCard';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <GlassCard className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-white text-3xl font-bold animate-float mb-2">
            ELLP Sistema
          </h1>
          <p className="text-blue-200 text-sm">
            Educação Lógica, Lúdica e Programação
          </p>
          <p className="text-white/70 text-xs mt-1">
            UTFPR - Campus Cornélio Procópio
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/30 transition-all duration-200"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/30 transition-all duration-200"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="text-red-300 text-sm text-center bg-red-500/20 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:scale-105 transition-transform duration-200 disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="mt-8 p-4 bg-white/5 rounded-lg">
          <h3 className="text-white font-semibold mb-3 text-center">Contas de Demonstração:</h3>
          <div className="space-y-2 text-sm text-white/80">
            <div>
              <strong>Admin:</strong> admin@ellp.com / admin123
            </div>
            <div>
              <strong>Voluntário:</strong> professor@ellp.com / prof123
            </div>
            <div>
              <strong>Coordenador:</strong> coordenador@ellp.com / coord123
            </div>
            <div>
              <strong>Responsável:</strong> responsavel@ellp.com / resp123
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default Login;
