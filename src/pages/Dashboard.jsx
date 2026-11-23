import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/api';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard() {
  const [aba, setAba] = useState('pedidos');
  const [pedidos, setPedidos] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const [nomeProd, setNomeProd] = useState('');
  const [descProd, setDescProd] = useState('');
  const [catProd, setCatProd] = useState('Bolos');
  const [precoProd, setPrecoProd] = useState('');

  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const carregarDados = async () => {
    setCarregando(true);
    try {
      const [resPedidos, resProdutos] = await Promise.all([
        api.get('/pedidos'),
        api.get('/produtos'),
      ]);
      setPedidos(resPedidos.data);
      setProdutos(resProdutos.data);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        logout();
        navigate('/');
      }
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const alterarStatus = async (pedidoId, novoStatus) => {
    try {
      await api.patch(`/pedidos/${pedidoId}/status`, { status: novoStatus });
      setPedidos((prev) =>
        prev.map((p) => (p.id === pedidoId ? { ...p, status: novoStatus } : p))
      );
    } catch (err) {
      alert('Erro ao atualizar status do pedido.');
    }
  };

  const adicionarProduto = async (e) => {
    e.preventDefault();
    try {
      await api.post('/produtos', {
        nome: nomeProd,
        descricao: descProd,
        categoria: catProd,
        preco: parseFloat(precoProd),
      });
      setNomeProd('');
      setDescProd('');
      setPrecoProd('');
      carregarDados();
    } catch (err) {
      alert('Erro ao cadastrar produto.');
    }
  };

  const totalFaturamento = pedidos.reduce((acc, p) => acc + p.valor_total, 0);
  const totalPendentes = pedidos.filter((p) => p.status === 'Pendente').length;

  const formatarMoeda = (valor) =>
    valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const formatarData = (iso) => {
    const d = new Date(iso);
    return d.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusStyle = (status) => {
    if (status === 'Concluído') return { bg: 'var(--success-bg)', color: 'var(--success)' };
    if (status === 'Em Preparo') return { bg: 'var(--info-bg)', color: 'var(--info)' };
    return { bg: 'var(--warning-bg)', color: 'var(--warning)' };
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.brandGroup}>
            <div style={styles.logoDot} />
            <span style={styles.brandTitle}>Doceria Hub Flow</span>
            <span style={styles.adminTag}>Admin</span>
          </div>

          <div style={styles.headerActions}>
            <span style={styles.userGreeting}>Olá, {usuario?.nome}</span>
            <button onClick={carregarDados} style={styles.refreshBtn}>
              Atualizar
            </button>
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              style={styles.logoutBtn}
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main style={styles.container}>
        <section style={styles.kpiGrid}>
          <div style={styles.kpiCard}>
            <span style={styles.kpiLabel}>Total de Pedidos</span>
            <strong style={styles.kpiValue}>{pedidos.length}</strong>
          </div>
          <div style={styles.kpiCard}>
            <span style={styles.kpiLabel}>Aguardando Preparo</span>
            <strong style={{ ...styles.kpiValue, color: 'var(--warning)' }}>
              {totalPendentes}
            </strong>
          </div>
          <div style={styles.kpiCard}>
            <span style={styles.kpiLabel}>Faturamento Acumulado</span>
            <strong style={{ ...styles.kpiValue, color: 'var(--success)' }}>
              {formatarMoeda(totalFaturamento)}
            </strong>
          </div>
        </section>

        <div style={styles.tabs}>
          <button
            onClick={() => setAba('pedidos')}
            style={aba === 'pedidos' ? styles.tabActive : styles.tab}
          >
            Pedidos Recebidos ({pedidos.length})
          </button>
          <button
            onClick={() => setAba('produtos')}
            style={aba === 'produtos' ? styles.tabActive : styles.tab}
          >
            Catálogo de Produtos ({produtos.length})
          </button>
        </div>

        {carregando ? (
          <p style={styles.emptyText}>Carregando informações...</p>
        ) : aba === 'pedidos' ? (
          <section style={styles.ordersGrid}>
            {pedidos.length === 0 ? (
              <div style={styles.emptyCard}>Nenhum pedido realizado ainda.</div>
            ) : (
              pedidos.map((pedido) => {
                const badge = getStatusStyle(pedido.status);
                return (
                  <article key={pedido.id} style={styles.orderCard}>
                    <div style={styles.orderHeader}>
                      <div>
                        <div style={styles.orderIdRow}>
                          <span style={styles.orderId}>Pedido #{pedido.id}</span>
                          <span style={styles.orderDate}>{formatarData(pedido.criado_em)}</span>
                        </div>
                        <h3 style={styles.clientName}>{pedido.cliente.nome}</h3>
                        <p style={styles.clientEmail}>{pedido.cliente.email}</p>
                      </div>

                      <div style={styles.statusControl}>
                        <span
                          style={{
                            ...styles.statusBadge,
                            backgroundColor: badge.bg,
                            color: badge.color,
                          }}
                        >
                          {pedido.status}
                        </span>
                        <select
                          value={pedido.status}
                          onChange={(e) => alterarStatus(pedido.id, e.target.value)}
                          style={styles.statusSelect}
                        >
                          <option value="Pendente">Pendente</option>
                          <option value="Em Preparo">Em Preparo</option>
                          <option value="Concluído">Concluído</option>
                        </select>
                      </div>
                    </div>

                    <div style={styles.itemsBox}>
                      <span style={styles.itemsTitle}>Itens do Pedido</span>
                      {pedido.itens.map((item, idx) => (
                        <div key={idx} style={styles.itemRow}>
                          <span>
                            <strong>{item.quantidade}x</strong> {item.produto_nome}
                          </span>
                          <span style={styles.itemPrice}>
                            {formatarMoeda(item.subtotal)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {pedido.observacao && (
                      <div style={styles.obsBox}>
                        <strong>Obs.:</strong> {pedido.observacao}
                      </div>
                    )}

                    <div style={styles.orderFooter}>
                      <span style={styles.totalLabel}>Total do Pedido</span>
                      <strong style={styles.totalValue}>
                        {formatarMoeda(pedido.valor_total)}
                      </strong>
                    </div>
                  </article>
                );
              })
            )}
          </section>
        ) : (
          <section style={styles.catalogLayout}>
            <form onSubmit={adicionarProduto} style={styles.productForm}>
              <h3 style={styles.sectionHeading}>Novo Produto</h3>
              <input
                type="text"
                placeholder="Nome do produto (ex: Torta de Limão)"
                value={nomeProd}
                onChange={(e) => setNomeProd(e.target.value)}
                required
                style={styles.input}
              />
              <input
                type="text"
                placeholder="Descrição breve"
                value={descProd}
                onChange={(e) => setDescProd(e.target.value)}
                style={styles.input}
              />
              <div style={styles.formRow}>
                <select
                  value={catProd}
                  onChange={(e) => setCatProd(e.target.value)}
                  style={styles.input}
                >
                  <option value="Bolos">Bolos</option>
                  <option value="Tortas">Tortas</option>
                  <option value="Doces">Doces</option>
                  <option value="Sobremesas">Sobremesas</option>
                  <option value="Bebidas">Bebidas</option>
                </select>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Preço (R$)"
                  value={precoProd}
                  onChange={(e) => setPrecoProd(e.target.value)}
                  required
                  style={styles.input}
                />
              </div>
              <button type="submit" style={styles.primaryBtn}>
                Cadastrar no Catálogo
              </button>
            </form>

            <div style={styles.productList}>
              {produtos.map((prod) => (
                <div key={prod.id} style={styles.productRow}>
                  <div>
                    <span style={styles.catBadge}>{prod.categoria}</span>
                    <h4 style={styles.prodName}>{prod.nome}</h4>
                    {prod.descricao && <p style={styles.prodDesc}>{prod.descricao}</p>}
                  </div>
                  <strong style={styles.prodPrice}>{formatarMoeda(prod.preco)}</strong>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: 'var(--bg-page)',
  },
  header: {
    backgroundColor: 'var(--bg-surface)',
    borderBottom: '1px solid var(--border)',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  headerInner: {
    maxWidth: '1120px',
    margin: '0 auto',
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
  },
  brandGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoDot: {
    width: '12px',
    height: '12px',
    borderRadius: '4px',
    backgroundColor: 'var(--primary)',
  },
  brandTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: 'var(--text-primary)',
  },
  adminTag: {
    fontSize: '11px',
    fontWeight: 600,
    backgroundColor: 'var(--primary-soft)',
    color: 'var(--primary)',
    padding: '2px 8px',
    borderRadius: '999px',
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  userGreeting: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
  },
  refreshBtn: {
    padding: '7px 14px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    backgroundColor: '#FFFFFF',
    color: 'var(--text-primary)',
    fontSize: '13px',
    fontWeight: 500,
  },
  logoutBtn: {
    padding: '7px 14px',
    borderRadius: '8px',
    border: '1px solid #FECACA',
    backgroundColor: 'var(--danger-bg)',
    color: 'var(--danger)',
    fontSize: '13px',
    fontWeight: 600,
  },
  container: {
    maxWidth: '1120px',
    margin: '0 auto',
    padding: '28px 24px 60px',
  },
  kpiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '16px',
    marginBottom: '28px',
  },
  kpiCard: {
    backgroundColor: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '20px',
    boxShadow: 'var(--shadow-sm)',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  kpiLabel: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    fontWeight: 500,
  },
  kpiValue: {
    fontSize: '26px',
    fontWeight: 700,
    color: 'var(--text-primary)',
  },
  tabs: {
    display: 'flex',
    gap: '8px',
    marginBottom: '24px',
    borderBottom: '1px solid var(--border)',
    paddingBottom: '12px',
  },
  tab: {
    padding: '8px 16px',
    borderRadius: '8px',
    border: '1px solid transparent',
    backgroundColor: 'transparent',
    color: 'var(--text-secondary)',
    fontSize: '14px',
    fontWeight: 500,
  },
  tabActive: {
    padding: '8px 16px',
    borderRadius: '8px',
    border: '1px solid var(--primary)',
    backgroundColor: 'var(--primary-soft)',
    color: 'var(--primary)',
    fontSize: '14px',
    fontWeight: 600,
  },
  ordersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: '20px',
  },
  orderCard: {
    backgroundColor: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '22px',
    boxShadow: 'var(--shadow-sm)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '16px',
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '12px',
  },
  orderIdRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '4px',
  },
  orderId: {
    fontSize: '12px',
    fontWeight: 700,
    color: 'var(--primary)',
  },
  orderDate: {
    fontSize: '12px',
    color: 'var(--text-muted)',
  },
  clientName: {
    fontSize: '16px',
    fontWeight: 700,
    color: 'var(--text-primary)',
  },
  clientEmail: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
  },
  statusControl: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '6px',
  },
  statusBadge: {
    fontSize: '11px',
    fontWeight: 700,
    padding: '3px 10px',
    borderRadius: '999px',
  },
  statusSelect: {
    fontSize: '12px',
    padding: '4px 8px',
    borderRadius: '6px',
    border: '1px solid var(--border)',
    backgroundColor: '#FFFFFF',
    color: 'var(--text-primary)',
  },
  itemsBox: {
    backgroundColor: 'var(--bg-page)',
    borderRadius: 'var(--radius-md)',
    padding: '14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  itemsTitle: {
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--text-muted)',
  },
  itemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    color: 'var(--text-primary)',
  },
  itemPrice: {
    color: 'var(--text-secondary)',
    fontWeight: 500,
  },
  obsBox: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    backgroundColor: '#FFFBEB',
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid #FDE68A',
  },
  orderFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '12px',
    borderTop: '1px solid var(--border)',
  },
  totalLabel: {
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--text-secondary)',
  },
  totalValue: {
    fontSize: '18px',
    fontWeight: 700,
    color: 'var(--success)',
  },
  catalogLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '24px',
    alignItems: 'start',
  },
  productForm: {
    backgroundColor: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '22px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  sectionHeading: {
    fontSize: '16px',
    fontWeight: 700,
    marginBottom: '4px',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    fontSize: '13px',
    backgroundColor: '#FFFFFF',
  },
  primaryBtn: {
    backgroundColor: 'var(--primary)',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '8px',
    padding: '11px',
    fontSize: '13px',
    fontWeight: 600,
  },
  productList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  productRow: {
    backgroundColor: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    padding: '16px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
  },
  catBadge: {
    fontSize: '11px',
    fontWeight: 600,
    color: 'var(--primary)',
    backgroundColor: 'var(--primary-soft)',
    padding: '2px 8px',
    borderRadius: '999px',
  },
  prodName: {
    fontSize: '15px',
    fontWeight: 600,
    marginTop: '6px',
  },
  prodDesc: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    marginTop: '2px',
  },
  prodPrice: {
    fontSize: '15px',
    fontWeight: 700,
    color: 'var(--text-primary)',
    whiteSpace: 'nowrap',
  },
  emptyCard: {
    backgroundColor: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '40px',
    textAlign: 'center',
    color: 'var(--text-secondary)',
  },
  emptyText: {
    color: 'var(--text-secondary)',
    fontSize: '14px',
  },
};
