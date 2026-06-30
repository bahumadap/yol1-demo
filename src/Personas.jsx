import React, { useState } from 'react'
import yol1Mark from './assets/yol1-mark.svg'
import './personas.css'
import {
  ArrowDownLeft, ArrowRight, ArrowUpRight, Bell, Check, ChevronRight,
  Copy, CreditCard, Eye, EyeOff, Gamepad2, Globe2, GraduationCap,
  Home, Plus, QrCode, Repeat2, Send, Settings, Shield, ShoppingBag,
  Smartphone, Star, TrendingUp, User, Wallet, X, Zap,
  ArrowLeftRight, Coffee, ChevronDown
} from 'lucide-react'

/* ── Data ───────────────────────────────────────────────────────────────── */
const fmtCLP = v => `$${Number(v).toLocaleString('es-CL')}`

const CARDS = [
  {
    id: 'classic', name: 'Yol1 Classic', last4: '4182',
    type: 'Débito · CLP', balance: 182400, currency: 'CLP',
    theme: 'c-classic', source: 'Cuenta personal', Icon: Wallet,
  },
  {
    id: 'uni', name: 'USACH Card', last4: '9023',
    type: 'Tarjeta universitaria', balance: 45000, currency: 'CLP',
    theme: 'c-uni', source: 'Beca · Alimentación', Icon: GraduationCap,
  },
  {
    id: 'casino', name: 'BetArena Card', last4: '3671',
    type: 'Tarjeta gaming', balance: 28900, currency: 'CLP',
    theme: 'c-casino', source: 'BetArena Gaming', Icon: Gamepad2,
  },
  {
    id: 'usd', name: 'Yol1 USD', last4: '7840',
    type: 'Prepago · USD', balance: 284.50, currency: 'USD',
    theme: 'c-usd', source: 'Cuenta empresa', Icon: Globe2,
  },
]

const TXS = [
  { id: 1, date: 'Hoy · 14:22',    desc: 'Café do Brasil',          amount: -3200,   card: '4182', Icon: Coffee },
  { id: 2, date: 'Hoy · 11:08',    desc: 'Remesa a Perú',           amount: -120000, card: '4182', Icon: Globe2 },
  { id: 3, date: 'Hoy · 09:30',    desc: 'Abono beca USACH',        amount: 45000,   card: '9023', Icon: GraduationCap },
  { id: 4, date: 'Ayer · 20:14',   desc: 'BetArena recarga',        amount: 28900,   card: '3671', Icon: Gamepad2 },
  { id: 5, date: 'Ayer · 18:45',   desc: 'Líder Express',           amount: -18400,  card: '4182', Icon: ShoppingBag },
  { id: 6, date: 'Ayer · 12:00',   desc: 'Netflix',                 amount: -6990,   card: '4182', Icon: Smartphone },
  { id: 7, date: 'Lun · 19:30',    desc: 'Recibido · María López',  amount: 50000,   card: '4182', Icon: ArrowDownLeft },
  { id: 8, date: 'Lun · 10:00',    desc: 'Starbucks',               amount: -4200,   card: '4182', Icon: Coffee },
  { id: 9, date: 'Dom · 15:00',    desc: 'Uber',                    amount: -7800,   card: '4182', Icon: ArrowRight },
  { id: 10, date: 'Dom · 13:20',   desc: 'Rappi',                   amount: -12300,  card: '4182', Icon: ShoppingBag },
]

const COUNTRIES = [
  { code: 'PE', name: 'Perú',      currency: 'PEN', flag: '🇵🇪', rate: 0.00403 },
  { code: 'CO', name: 'Colombia',  currency: 'COP', flag: '🇨🇴', rate: 3.12   },
  { code: 'US', name: 'EE.UU.',    currency: 'USD', flag: '🇺🇸', rate: 0.00105 },
  { code: 'MX', name: 'México',    currency: 'MXN', flag: '🇲🇽', rate: 0.0182  },
  { code: 'AR', name: 'Argentina', currency: 'ARS', flag: '🇦🇷', rate: 1.08   },
  { code: 'BR', name: 'Brasil',    currency: 'BRL', flag: '🇧🇷', rate: 0.00598 },
]

/* ── Shared components ──────────────────────────────────────────────────── */
function CardVisual({ card, mini = false }) {
  const [hidden, setHidden] = useState(false)
  const bal = card.currency === 'CLP'
    ? fmtCLP(card.balance)
    : `USD ${card.balance.toFixed(2)}`

  return (
    <div className={`card-visual ${card.theme} ${mini ? 'mini' : ''}`}>
      <div className="cv-top">
        <div className="cv-logo"><img src={yol1Mark} alt="" /><span>Yol1</span></div>
        {!mini && (
          <button className="cv-eye" onClick={e => { e.stopPropagation(); setHidden(h => !h) }}>
            {hidden ? <Eye size={15} /> : <EyeOff size={15} />}
          </button>
        )}
      </div>
      <div className="cv-balance">{hidden ? '•••••' : bal}</div>
      <div className="cv-bottom">
        <span className="cv-name">{card.name}</span>
        <span className="cv-num">•••• {card.last4}</span>
      </div>
    </div>
  )
}

function TxRow({ tx }) {
  const { Icon } = tx
  const pos = tx.amount > 0
  return (
    <div className="tx-row">
      <div className="tx-icon-wrap"><Icon size={15} /></div>
      <div className="tx-info">
        <b>{tx.desc}</b>
        <small>{tx.date} · ···· {tx.card}</small>
      </div>
      <span className={`tx-amt ${pos ? 'pos' : 'neg'}`}>
        {pos ? '+' : ''}{pos ? fmtCLP(tx.amount) : fmtCLP(Math.abs(tx.amount))}
      </span>
    </div>
  )
}

function TabBar({ active, set }) {
  const tabs = [
    [Home,           'Inicio',    'inicio'  ],
    [CreditCard,     'Tarjetas',  'tarjetas'],
    [ArrowLeftRight, 'Mover',     'mover'   ],
    [Globe2,         'Remesas',   'remesas' ],
    [User,           'Perfil',    'perfil'  ],
  ]
  return (
    <nav className="p-tabbar">
      {tabs.map(([Icon, label, key]) => (
        <button key={key} className={active === key ? 'on' : ''} onClick={() => set(key)}>
          <Icon size={21} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}

/* ── Views ──────────────────────────────────────────────────────────────── */
function ViewInicio({ nav }) {
  const [cardIdx, setCardIdx] = useState(0)
  const totalCLP = CARDS.filter(c => c.currency === 'CLP').reduce((s, c) => s + c.balance, 0)

  return (
    <div className="p-view">
      {/* Header */}
      <div className="inicio-bar">
        <div>
          <p className="greeting">Buenos días</p>
          <h2 className="username">Valentina 👋</h2>
        </div>
        <button className="notif-btn"><Bell size={20} /><i /></button>
      </div>

      {/* Balance */}
      <div className="balance-block">
        <span>Balance total</span>
        <h1>{fmtCLP(totalCLP)}</h1>
        <small>{CARDS.length} tarjetas activas · CLP</small>
      </div>

      {/* Quick actions */}
      <div className="quick-row">
        {[
          [Send,          'Enviar',   () => nav('mover')   ],
          [ArrowDownLeft, 'Recibir',  () => nav('mover')   ],
          [Globe2,        'Remesa',   () => nav('remesas') ],
          [QrCode,        'QR',       () => {}             ],
          [Plus,          'Recargar', () => nav('tarjetas')],
        ].map(([Icon, label, fn]) => (
          <button key={label} className="quick-btn" onClick={fn}>
            <div className="quick-icon"><Icon size={19} /></div>
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Cards mini carousel */}
      <div className="cards-carousel">
        <div className="carousel-track">
          {CARDS.map((card, i) => (
            <div
              key={card.id}
              className={`carousel-item ${i === cardIdx ? 'sel' : ''}`}
              onClick={() => setCardIdx(i)}
            >
              <CardVisual card={card} mini />
            </div>
          ))}
        </div>
        <div className="carousel-dots">
          {CARDS.map((_, i) => <span key={i} className={i === cardIdx ? 'on' : ''} />)}
        </div>
      </div>

      {/* Insight strip */}
      <div className="insight-strip">
        <TrendingUp size={14} />
        <span>Gastaste <b>$31.790</b> esta semana — 14% menos que la anterior</span>
      </div>

      {/* Transactions */}
      <div className="list-head">
        <b>Últimos movimientos</b>
        <button onClick={() => nav('historial')}>Ver todos <ChevronRight size={13} /></button>
      </div>
      <div className="tx-list">
        {TXS.slice(0, 5).map(tx => <TxRow key={tx.id} tx={tx} />)}
      </div>
    </div>
  )
}

function ViewTarjetas() {
  const [open, setOpen] = useState(null)
  const card = open !== null ? CARDS[open] : null

  return (
    <div className="p-view">
      <div className="view-bar">
        <h2>Mis tarjetas</h2>
        <button className="icon-action"><Plus size={18} /></button>
      </div>

      <div className="card-stack">
        {CARDS.map((c, i) => {
          const { Icon } = c
          return (
            <div key={c.id} className="card-entry" onClick={() => setOpen(i)}>
              <CardVisual card={c} />
              <div className="ce-meta">
                <div className="ce-source"><Icon size={12} /> {c.source}</div>
                <div className="ce-actions">
                  <button><Shield size={13} /> Congelar</button>
                  <button><Settings size={13} /> Límites</button>
                  <button><Copy size={13} /> Datos</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {card && (
        <div className="drawer-overlay" onClick={() => setOpen(null)}>
          <div className="drawer" onClick={e => e.stopPropagation()}>
            <div className="drawer-handle" />
            <div className="drawer-head">
              <b>Detalle tarjeta</b>
              <button onClick={() => setOpen(null)}><X size={18} /></button>
            </div>
            <CardVisual card={card} />
            <div className="drawer-grid">
              {[['Tipo', card.type], ['Origen', card.source], ['Estado', 'Activa'],
                ['Saldo', card.currency === 'CLP' ? fmtCLP(card.balance) : `USD ${card.balance.toFixed(2)}`]
              ].map(([k, v]) => (
                <div key={k} className="drawer-field"><small>{k}</small><b>{v}</b></div>
              ))}
            </div>
            <div className="list-head"><b>Movimientos recientes</b></div>
            <div className="tx-list">
              {TXS.filter(t => t.card === card.last4).slice(0, 3).map(tx => <TxRow key={tx.id} tx={tx} />)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ViewMover() {
  const [tab, setTab] = useState('enviar')
  const [sent, setSent] = useState(false)

  if (sent) return (
    <div className="p-view center-view">
      <div className="success-wrap">
        <div className="success-circle"><Check size={32} /></div>
        <h2>¡Enviado!</h2>
        <p>Transferencia a <b>María López</b></p>
        <div className="success-amount">{fmtCLP(50000)}</div>
        <small>Hoy · 14:38 · Banco Santander</small>
        <button className="btn-primary" onClick={() => setSent(false)}>Volver</button>
      </div>
    </div>
  )

  return (
    <div className="p-view">
      <div className="view-bar"><h2>Transferir</h2></div>
      <div className="pill-tabs">
        {['enviar', 'recibir', 'cobrar'].map(t => (
          <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>
            {t === 'enviar' ? 'Enviar' : t === 'recibir' ? 'Recibir' : 'Cobrar QR'}
          </button>
        ))}
      </div>

      {tab === 'enviar' && (
        <div className="form-section">
          <div className="recents-block">
            <span className="block-label">Recientes</span>
            <div className="recents-row">
              {['María L.', 'Carlos R.', 'Papá', 'Sofía M.'].map(n => (
                <div key={n} className="rc"><div className="rc-av">{n[0]}</div><span>{n.split(' ')[0]}</span></div>
              ))}
              <div className="rc"><div className="rc-av new"><Plus size={14} /></div><span>Nuevo</span></div>
            </div>
          </div>
          <label className="f-label">Destinatario<input placeholder="RUT, email o alias" /></label>
          <label className="f-label">
            Monto
            <div className="amount-row"><span>$</span><input type="number" placeholder="0" /></div>
          </label>
          <label className="f-label">
            Desde
            <select>
              {CARDS.filter(c => c.currency === 'CLP').map(c => (
                <option key={c.id}>···· {c.last4} · {c.name} · {fmtCLP(c.balance)}</option>
              ))}
            </select>
          </label>
          <label className="f-label">Mensaje<input placeholder="Para..." /></label>
          <button className="btn-primary" onClick={() => setSent(true)}>Enviar transferencia</button>
        </div>
      )}

      {tab === 'recibir' && (
        <div className="recibir-block">
          <div className="qr-box"><QrCode size={88} /><span>valentina.yol1</span></div>
          <div className="account-grid">
            {[['Banco', 'Yol1 Personas'], ['Tipo', 'Cuenta vista'], ['RUT', '18.921.344-6'], ['N° cuenta', '000-182-0021']].map(([k, v]) => (
              <div key={k} className="acc-field"><small>{k}</small><b>{v}</b></div>
            ))}
          </div>
          <button className="btn-secondary"><Copy size={14} /> Copiar datos</button>
        </div>
      )}

      {tab === 'cobrar' && (
        <div className="recibir-block">
          <label className="f-label">
            Monto a cobrar
            <div className="amount-row"><span>$</span><input type="number" placeholder="0" /></div>
          </label>
          <div className="qr-box large"><QrCode size={110} /><span>Mostrar para que te paguen</span></div>
        </div>
      )}
    </div>
  )
}

function ViewRemesas() {
  const [dest, setDest] = useState(COUNTRIES[0])
  const [amount, setAmount] = useState('120000')
  const [sent, setSent] = useState(false)
  const received = amount
    ? (Number(amount) * dest.rate).toLocaleString('en-US', { maximumFractionDigits: 2 })
    : '0'

  if (sent) return (
    <div className="p-view center-view">
      <div className="success-wrap">
        <div className="success-circle globe"><Globe2 size={30} /></div>
        <h2>¡Remesa enviada!</h2>
        <p>Tu envío a <b>{dest.name}</b> está en camino</p>
        <div className="success-amount">{dest.flag} {dest.currency} {received}</div>
        <small>Llegada estimada: hoy en 1–2 horas</small>
        <div className="track-row">
          {['Enviado', 'Procesando', 'En camino', 'Entregado'].map((s, i) => (
            <div key={s} className={`track-step ${i < 2 ? 'done' : i === 2 ? 'cur' : ''}`}>
              <div className="ts-dot">{i < 2 ? <Check size={10} /> : null}</div>
              <small>{s}</small>
            </div>
          ))}
        </div>
        <button className="btn-primary" onClick={() => setSent(false)}>Nueva remesa</button>
      </div>
    </div>
  )

  return (
    <div className="p-view">
      <div className="view-bar">
        <h2>Remesas</h2>
        <span className="view-tag">Internacional</span>
      </div>

      <div className="country-pills">
        {COUNTRIES.map(c => (
          <button
            key={c.code}
            className={`cpill ${dest.code === c.code ? 'on' : ''}`}
            onClick={() => setDest(c)}
          >
            {c.flag} {c.name}
          </button>
        ))}
      </div>

      <div className="calc-card">
        <div className="calc-row">
          <label>Envías desde Chile</label>
          <div className="calc-input">
            <span>🇨🇱 CLP</span>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
          </div>
        </div>
        <div className="calc-divider">
          <Repeat2 size={15} />
          <span>1 CLP = {dest.currency} {dest.rate.toFixed(5)}</span>
          <span className="rate-tag">Mejor que el banco</span>
        </div>
        <div className="calc-row">
          <label>Reciben en {dest.name}</label>
          <div className="calc-input ro">
            <span>{dest.flag} {dest.currency}</span>
            <input type="text" value={received} readOnly />
          </div>
        </div>
      </div>

      <div className="costs-list">
        <div><span>Comisión Yol1</span><b className="green-txt">$0</b></div>
        <div><span>Tipo de cambio</span><b>Interbancario +1,2%</b></div>
        <div><span>Llegada estimada</span><b>Hoy, 1–2 horas</b></div>
      </div>

      <div className="recipient-block">
        <span className="block-label">Destinatario</span>
        <div className="recipient-row">
          <div className="rc-av flag">{dest.flag}</div>
          <div className="ri"><b>Carlos Mendoza</b><small>BCP · ···· 4108 · {dest.name}</small></div>
          <ChevronRight size={15} />
        </div>
      </div>

      <button className="btn-primary" onClick={() => setSent(true)}>
        Enviar {dest.currency} {received}
      </button>

      <div className="list-head" style={{ marginTop: 28 }}><b>Remesas recientes</b></div>
      <div className="tx-list">
        <div className="tx-row">
          <div className="tx-icon-wrap"><Globe2 size={15} /></div>
          <div className="tx-info"><b>Perú · Carlos Mendoza</b><small>Hoy · 11:08 · PEN 484,03</small></div>
          <span className="tx-amt neg">-$120.000</span>
        </div>
        <div className="tx-row">
          <div className="tx-icon-wrap"><Globe2 size={15} /></div>
          <div className="tx-info"><b>Colombia · Familia</b><small>Lun · COP 374.400</small></div>
          <span className="tx-amt neg">-$95.000</span>
        </div>
      </div>
    </div>
  )
}

function ViewPerfil({ onBack }) {
  const menu = [
    [Shield,      'Seguridad y acceso'],
    [Bell,        'Notificaciones'],
    [Globe2,      'Idioma y región'],
    [CreditCard,  'Mis tarjetas'],
    [Star,        'Beneficios Yol1'],
    [Settings,    'Configuración'],
  ]
  return (
    <div className="p-view">
      <div className="perfil-hero">
        <div className="p-avatar">V</div>
        <h2>Valentina Rojas</h2>
        <small>18.921.344-6 · Cliente desde 2024</small>
        <div className="p-level"><Zap size={12} /> Nivel Gold · 1.240 pts</div>
      </div>
      <div className="perfil-stats">
        <div><b>{fmtCLP(256300)}</b><span>Balance total</span></div>
        <div><b>4</b><span>Tarjetas</span></div>
        <div><b>12</b><span>Remesas</span></div>
      </div>
      <div className="perfil-menu">
        {menu.map(([Icon, label]) => (
          <button key={label} className="pm-item">
            <span className="pm-icon"><Icon size={16} /></span>
            <span>{label}</span>
            <ChevronRight size={15} />
          </button>
        ))}
      </div>
      <button className="btn-ghost back-btn" onClick={onBack}>← Volver al landing</button>
    </div>
  )
}

/* ── Root ───────────────────────────────────────────────────────────────── */
export default function Personas({ onBack }) {
  const [tab, setTab] = useState('inicio')

  const views = {
    inicio:   <ViewInicio  nav={setTab} />,
    tarjetas: <ViewTarjetas />,
    mover:    <ViewMover />,
    remesas:  <ViewRemesas />,
    perfil:   <ViewPerfil onBack={onBack} />,
  }

  return (
    <div className="personas-shell">
      <div className="personas-phone">
        <div className="personas-topbar">
          <div className="pt-brand">
            <img src={yol1Mark} alt=""/>
            <span>Yol1 <b>Personas</b></span>
            <span className="pt-tag">Demo</span>
          </div>
          <button className="pt-back" onClick={onBack}>✕ Salir</button>
        </div>
        <div className="phone-scroll">{views[tab]}</div>
        <TabBar active={tab} set={setTab} />
      </div>
    </div>
  )
}
