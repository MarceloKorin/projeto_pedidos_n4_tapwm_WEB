import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);
    try {
      await login(email, senha);
      navigate('/dashboard');
    } catch (err) {
      setErro(err.response?.data?.erro || err.message || 'Falha ao autenticar.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.badge}>PAINEL ADMINISTRATIVO</div>
        <h1 style={styles.title}>Doceria Hub Flow</h1>
        <p style={styles.subtitle}>Entre com suas credenciais de gestão para acompanhar pedidos e catálogo.</p>

        {erro && <div style={styles.errorBox}>{erro}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>E-mail corporativo</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <button type="submit" disabled={carregando} style={styles.button}>
            {carregando ? 'Entrando...' : 'Acessar Painel'}
          </button>
        </form>

      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    backgroundColor: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '36px',
    boxShadow: 'var(--shadow-md)',
  },
  badge: {
    display: 'inline-block',
    backgroundColor: 'var(--primary-soft)',
    color: 'var(--primary)',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.06em',
    padding: '4px 10px',
    borderRadius: '999px',
    marginBottom: '14px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: '6px',
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    marginBottom: '24px',
  },
  errorBox: {
    backgroundColor: 'var(--danger-bg)',
    color: 'var(--danger)',
    fontSize: '13px',
    padding: '10px 14px',
    borderRadius: 'var(--radius-md)',
    marginBottom: '16px',
    border: '1px solid #FECACA',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  input: {
    padding: '11px 14px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border)',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: '#FFFFFF',
  },
  button: {
    marginTop: '6px',
    backgroundColor: 'var(--primary)',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    padding: '12px',
    fontSize: '14px',
    fontWeight: 600,
  },
  hintBox: {
    marginTop: '20px',
    paddingTop: '16px',
    borderTop: '1px solid var(--border)',
    fontSize: '12px',
    color: 'var(--text-secondary)',
    textAlign: 'center',
  },
};
