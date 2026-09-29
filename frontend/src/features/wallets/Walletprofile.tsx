import { useMemo, useState } from 'react';
import backgroundImage from "../../assets/background.png";
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  BarChart3,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  Copy,
  Eye,
  ExternalLink,
  FileText,
  Flag,
  Layers3,
  Network,
  Play,
  RefreshCw,
  Search,
  ShieldAlert,
  Sparkles,
  WalletCards,
  X,
  Zap,
} from 'lucide-react';

const styles = `
:root{font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#eadfc8;background:#160d07;font-synthesis:none}*{box-sizing:border-box}body{margin:0;min-width:1180px;background:#160d07}button,input{font:inherit}button{cursor:pointer}.desk-shell{min-height:100vh;position:relative;overflow-x:hidden;padding:18px 2.1vw 24px;background:url(${backgroundImage}) center center/cover fixed no-repeat,#1b1008}.desk-shell:after{content:"";position:fixed;inset:0;pointer-events:none;z-index:0;background:linear-gradient(90deg,rgba(0,0,0,.48),rgba(0,0,0,.13) 48%,rgba(0,0,0,.48));mix-blend-mode:multiply}.desk-grain{position:fixed;inset:0;pointer-events:none;z-index:1;opacity:.08;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");mix-blend-mode:soft-light}.topbar,.profile-card,.content-grid,.transactions{position:relative;z-index:2}.topbar{height:72px;display:flex;align-items:center;gap:18px;border-bottom:1px solid rgba(197,151,60,.45);margin-bottom:13px}.brand-lockup{display:flex;align-items:center;gap:10px;width:213px;border-right:1px solid rgba(209,171,93,.42);height:50px;padding-right:18px}.brand-mark{position:relative;color:#efd27b;width:34px;height:25px;display:flex;align-items:center;justify-content:center}.brand-mark span{position:absolute;width:8px;height:8px;border:2px solid #efd27b;border-radius:50%}.brand-name{font-family:Georgia,serif;color:#f2e3c1;font-size:20px;white-space:nowrap}.title-block{min-width:350px;flex:1}.title-block h1{margin:0;color:#efe0c0;font-family:Georgia,serif;font-size:25px;font-weight:500;letter-spacing:-.02em;text-shadow:0 2px 12px rgba(236,177,57,.15)}.title-block p{margin:3px 0 0;color:#a9997d;font-size:11px}.top-actions{display:flex;align-items:center;gap:8px}.search-slot,.case-chip,.view-switch{height:38px;border:1px solid rgba(214,169,76,.4);border-radius:9px;background:rgba(8,7,5,.8);box-shadow:inset 0 1px rgba(255,255,255,.07),0 5px 16px rgba(0,0,0,.3)}.search-slot{width:298px;display:flex;align-items:center;gap:9px;padding:0 12px;color:#d6b96e}.search-slot input{background:none;border:0;outline:0;color:#eee0c5;width:100%;font-size:11px}.search-slot input::placeholder{color:#827763}.case-chip{color:#dacaa7;padding:0 12px;font-size:11px;display:flex;align-items:center;gap:7px;white-space:nowrap}.case-chip:hover,.outline-btn:hover{border-color:#f0c65d;color:#f0d282}.view-switch{display:flex;padding:3px;gap:2px}.view-switch button{border:0;color:#9f937d;background:transparent;font-size:11px;padding:0 12px;display:flex;gap:7px;align-items:center;border-radius:6px}.view-switch button.active{color:#191108;background:linear-gradient(#f1cf78,#c58e2e);box-shadow:0 1px 6px rgba(224,173,55,.45),inset 0 1px rgba(255,255,255,.45);font-weight:700}.panel,.profile-card,.transactions{border:1px solid rgba(210,162,62,.65);background:linear-gradient(145deg,rgba(27,19,12,.94),rgba(5,7,6,.94));box-shadow:inset 1px 1px rgba(255,236,184,.11),inset -1px -1px rgba(0,0,0,.7),0 8px 20px rgba(0,0,0,.42);border-radius:11px}.profile-card{padding:15px 20px 12px;margin-bottom:10px}.identity-row{display:flex;align-items:flex-start;gap:14px;min-height:66px}.wallet-orb{width:48px;height:48px;border-radius:50%;display:grid;place-items:center;flex:none;color:#a7ffac;background:rgba(14,108,48,.58);border:1px solid #68e978;box-shadow:0 0 12px #3bca5a,0 0 25px rgba(65,227,91,.35)}.identity-main{min-width:420px;flex:1}.identity-title{display:flex;align-items:center;gap:8px;color:#eee2c5;font-family:Georgia,serif;font-size:20px}.identity-title button{color:#c6b07a;background:none;border:0;padding:0}.address-line{display:flex;align-items:center;gap:8px;margin-top:7px}.address-chip{display:flex;align-items:center;gap:7px;padding:5px 9px;border:1px solid rgba(179,163,131,.4);border-radius:8px;background:rgba(4,5,4,.68);font:10px monospace;color:#d3c3a5}.chain-badge,.tag{display:inline-flex;align-items:center;gap:5px;padding:5px 8px;border-radius:12px;font-size:9px;white-space:nowrap}.chain-badge{color:#29200d;background:#e5ad3c;border:1px solid #f5d476}.chain-dot{width:10px;height:10px;border-radius:50%;background:#f6d375;border:1px solid #493713;display:inline-block}.status-row{display:flex;align-items:center;gap:6px;margin-top:10px}.tag{border:1px solid rgba(183,162,119,.45);color:#d4c7a9;background:rgba(15,14,10,.45)}.tag.green{color:#c2f7b4;border-color:#367f42;background:rgba(30,115,51,.34);box-shadow:0 0 8px rgba(98,225,104,.2)}.tag.red{color:#ffd0c2;border-color:#8d3a2f;background:rgba(130,39,27,.47)}.tag.blue{color:#b0d8f5;border-color:#2a5a8a;background:rgba(26,80,140,.35)}.tag.purple{color:#e3c1fa;border-color:#714090;background:rgba(83,29,125,.35)}.tag.amber{color:#f5ddb0;border-color:#92702b;background:rgba(140,80,15,.35)}.quick-actions{display:flex;gap:8px;align-items:center;padding-top:4px}.outline-btn{height:34px;display:flex;align-items:center;gap:7px;padding:0 13px;border:1px solid #96712d;border-radius:7px;background:rgba(15,12,8,.78);color:#e0c68b;font-size:10px;transition:.2s}.outline-btn.primary{color:#211605;background:linear-gradient(#f1ce7b,#bb842b);border-color:#b8862b}.outline-btn.primary:hover{filter:brightness(1.1)}.metadata-row{display:grid;grid-template-columns:1.55fr 1.05fr 1.1fr 1.1fr .55fr;border-top:1px solid rgba(221,189,115,.24);margin-top:10px;padding-top:10px}.meta-cell{min-height:52px;padding:0 18px;border-right:1px solid rgba(221,189,115,.19)}.meta-cell:first-child{padding-left:0}.meta-cell:last-child{border:0}.meta-label{display:flex;align-items:center;gap:6px;color:#aaa18e;font-size:10px;margin-bottom:7px}.meta-value{color:#d9cfb8;font-size:11px}.meta-value.amount{color:#f0d69a;font-size:17px}.meta-help{color:#827763;font-size:9px;margin-top:4px}.label-row{display:flex;gap:5px;flex-wrap:wrap}.label-row .tag{padding:4px 7px}.source-line{color:#887c68;font-size:9px;margin-top:6px}.source-line b{font-weight:400;color:#c6b18a}.content-grid{display:grid;grid-template-columns:270px minmax(570px,1fr) 360px;gap:10px;align-items:start}.left-stack,.center-stack,.right-stack{display:grid;gap:10px}.card{padding:12px 14px}.card-heading{height:25px;display:flex;justify-content:space-between;align-items:center;color:#eadcbf;font-family:Georgia,serif;font-size:14px;margin-bottom:9px}.card-heading span{display:flex;align-items:center;gap:7px}.card-heading svg{color:#e4bf5d}.heading-action{color:#d0aa51;background:none;border:0;font-size:9px;padding:0}.heading-action:hover{color:#f2d37c}.scan-card{min-height:152px}.scan-card p{color:#b5a78f;font-size:10px;line-height:1.55;margin:4px 0 12px}.scan-card .scan-btn{width:100%;justify-content:center}.scan-btn{height:32px;display:flex;align-items:center;gap:7px;border:1px solid #c28c29;border-radius:7px;background:linear-gradient(#f0c767,#b77c20);color:#231507;font-size:10px;font-weight:700;box-shadow:0 0 10px rgba(229,185,73,.22)}.scan-btn:hover{filter:brightness(1.1)}.verdict-card{min-height:105px}.verdict-body{display:flex;align-items:center;gap:10px}.verdict-icon{width:37px;height:37px;display:grid;place-items:center;border:1px solid #607a8e;border-radius:50%;color:#b0cee0;background:rgba(34,69,90,.45)}.verdict-main{color:#e2e0d7;font-family:Georgia,serif;font-size:16px}.verdict-sub{color:#8b8274;font-size:9px;margin-top:3px}.unknown-pill{margin-left:auto;color:#aaa18e;border:1px solid #5b554b;border-radius:10px;padding:4px 7px;font-size:8px}.risk-card{min-height:205px}.risk-list{display:grid;gap:10px}.risk-line{display:grid;grid-template-columns:12px 1fr auto;gap:7px;align-items:center;color:#cabfae;font-size:10px}.risk-dot{width:10px;height:10px;border-radius:50%;border:1px solid currentColor}.risk-dot.red{color:#ed5b40}.risk-dot.orange{color:#ee9636}.risk-dot.teal{color:#20c3c4}.risk-dot.purple{color:#bd6ff0}.risk-dot.gray{color:#9a8e82}.risk-line strong{color:#e2d4bb;font-weight:500}.risk-link{color:#c9a45a;background:none;border:0;font-size:9px;padding:12px 0 0}.risk-link:hover{color:#f0d282}.chart-card{height:286px}.chart-legend{display:flex;align-items:center;gap:14px;font:9px Inter;color:#b5a990}.legend-dot{width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:4px}.legend-dot.in{background:#39d76b;box-shadow:0 0 6px #39d76b}.legend-dot.out{background:#268fe5;box-shadow:0 0 5px #268fe5}.chart-wrap{height:218px;display:grid;grid-template-columns:34px 1fr;gap:7px}.y-axis{display:flex;flex-direction:column;justify-content:space-between;color:#9d917b;font:9px monospace;padding:6px 0 24px;text-align:right}.chart-area{position:relative;padding:7px 2px 25px;border-bottom:1px solid rgba(208,187,139,.42);background:repeating-linear-gradient(to bottom,rgba(202,183,143,.12) 0,rgba(202,183,143,.12) 1px,transparent 1px,transparent 39px)}.bar-grid{height:100%;display:flex;justify-content:space-around;align-items:end;gap:12px}.bar-day{height:100%;display:flex;align-items:end;justify-content:center;gap:5px;position:relative;flex:1}.bar{width:16px;border-radius:2px 2px 0 0;min-height:8px;transition:filter .2s,transform .2s}.bar:hover{filter:brightness(1.25);transform:scaleY(1.04);transform-origin:bottom}.bar.inflow{background:linear-gradient(#47e879,#159644);box-shadow:0 0 8px rgba(57,215,107,.42)}.bar.outflow{background:linear-gradient(#42aaf2,#175895);box-shadow:0 0 6px rgba(38,143,229,.25)}.x-labels{position:absolute;bottom:-21px;left:0;right:0;display:flex;justify-content:space-around;color:#9d917b;font:9px monospace}.table-card{padding-bottom:8px}.data-table{width:100%;border-collapse:collapse;font-size:10px}.data-table th{text-align:left;color:#988b75;font-weight:400;font-size:9px;padding:7px 6px;border-bottom:1px solid rgba(221,189,115,.25);white-space:nowrap}.data-table td{padding:7px 6px;color:#cfc3ad;border-bottom:1px solid rgba(221,189,115,.1);white-space:nowrap}.data-table tr:last-child td{border-bottom:0}.data-table tbody tr{transition:background .2s}.data-table tbody tr:hover{background:rgba(205,157,54,.08)}.rank{color:#897b65!important}.address-cell{display:flex;align-items:center;gap:7px;color:#e3d7bf!important}.node-mini{width:14px;height:14px;border-radius:50%;display:grid;place-items:center;background:rgba(30,115,51,.55);border:1px solid #61d66a;color:#b5f7b8}.chain-small{font-size:8px;padding:3px 6px}.volume{text-align:right;color:#e7d8b4!important}.percent{color:#e1c475!important;text-align:right}.complaints-card{padding-bottom:9px}.complaint-row{display:grid;grid-template-columns:1fr 1fr 76px;gap:7px;align-items:center;padding:8px 0;border-bottom:1px solid rgba(221,189,115,.12);font-size:9px}.complaint-row:last-child{border-bottom:0}.complaint-id{color:#d9c277}.complaint-type{color:#c8bfac}.complaint-date{color:#8f8472;font-size:8px}.status-pill{justify-self:end;padding:4px 7px;border-radius:9px;font-size:8px}.status-pill.active{color:#ffd0c2;border:1px solid #8d3a2f;background:rgba(130,39,27,.5)}.status-pill.review{color:#f4ddb0;border:1px solid #8b6c2d;background:rgba(133,91,20,.42)}.status-pill.resolved{color:#baf5ac;border:1px solid #337a3d;background:rgba(30,115,51,.4)}.cluster-card p{color:#b9ad99;line-height:1.45;font-size:9px;margin:10px 0 2px}.cluster-head{display:flex;align-items:center;justify-content:space-between}.donut-card{min-height:211px}.donut-content{display:flex;align-items:center;gap:15px}.donut{width:124px;height:124px;border-radius:50%;display:grid;place-items:center;position:relative;background:conic-gradient(#e95036 0 35%,#ef9631 35% 63%,#1dbbc5 63% 81%,#965ed2 81% 93%,#84756c 93% 100%);box-shadow:0 0 12px rgba(229,80,54,.17)}.donut:after{content:"";position:absolute;inset:19px;border-radius:50%;background:#11120f;border:1px solid rgba(226,190,107,.2)}.donut-center{position:relative;z-index:1;text-align:center;color:#bdb29e;font-size:9px;line-height:1.35}.donut-center strong{display:block;color:#f0d282;font-size:15px}.donut-legend{display:grid;gap:8px;flex:1}.donut-key{display:grid;grid-template-columns:9px 1fr auto;gap:6px;align-items:center;color:#c5baa6;font-size:9px}.donut-key i{width:8px;height:8px;border-radius:50%}.donut-key strong{color:#ded0b5;font-weight:400}.transactions{margin-top:10px;padding:12px 15px 9px}.transaction-table th{font-size:8px}.transaction-table td{font-size:9px;padding:7px 6px}.hash{color:#d6bd76!important;font-family:monospace}.confirmed{display:inline-flex;align-items:center;gap:4px;color:#baf5ac;border:1px solid #337a3d;background:rgba(30,115,51,.4);border-radius:10px;padding:3px 7px;font-size:8px}.pagination-row{display:flex;justify-content:space-between;align-items:center;padding-top:8px;color:#9c8f79;font-size:9px}.pagination{display:flex;align-items:center;gap:4px}.page-btn{min-width:22px;height:22px;border:1px solid rgba(161,126,52,.35);border-radius:5px;background:rgba(18,14,9,.7);color:#b6a686;font-size:9px}.page-btn:hover,.page-btn.selected{color:#231707;background:linear-gradient(#efc96f,#b88128);border-color:#bf8c2f;font-weight:700}.page-btn.arrow{border:0;background:none;color:#d0aa51}.toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:20;padding:10px 16px;display:flex;align-items:center;gap:7px;border:1px solid #a57420;border-radius:8px;background:rgba(18,12,7,.96);color:#f0d282;font-size:11px;box-shadow:0 8px 24px #0008}@media(max-width:1350px){.search-slot{width:240px}.content-grid{grid-template-columns:245px minmax(500px,1fr) 320px}.quick-actions{gap:4px}.outline-btn{padding:0 8px}.metadata-row{grid-template-columns:1.4fr 1fr 1fr 1fr .5fr}}
`;

type ToastSetter = (message: string) => void;

type Counterparty = { address: string; label: string; chain: string; volume: string; percent: string; color: string };

const counterparties: Counterparty[] = [
  { address: '0x4F...2C9', label: 'Binance Deposit', chain: 'BSC', volume: '$1,86,420.32', percent: '38.4%', color: 'green' },
  { address: '0x12...8E7', label: 'KuCoin', chain: 'BSC', volume: '$1,09,320.17', percent: '22.7%', color: 'green' },
  { address: '0x66...3D7', label: 'Unknown Wallet', chain: 'Ethereum', volume: '$57,210.45', percent: '11.9%', color: 'blue' },
  { address: '0x78...6A9', label: 'Mixer', chain: 'Tornado Cash', volume: '$42,780.23', percent: '8.8%', color: 'purple' },
  { address: '0xAD...5F7', label: 'DEX', chain: 'PancakeSwap', volume: '$32,640.12', percent: '6.7%', color: 'gray' },
];

const transactions = [
  ['0x8a3f...2e1', '0x4F...2C9', '0x28F4...7D9E', '$125,600.32', 'BSC', 'Transfer', '2025-04-14 10:32'],
  ['0x6c7d...9f3', '0x12...8E7', '0x28F4...7D9E', '$78,420.17', 'BSC', 'Transfer', '2025-04-14 09:18'],
  ['0x9e4b...c2a', '0x66...3D7', '0x28F4...7D9E', '$42,780.45', 'Ethereum', 'Swap', '2025-04-13 22:41'],
  ['0x1f20...8e7', '0x78...6A9', '0x28F4...7D9E', '$18,230.12', 'BSC', 'Transfer', '2025-04-13 16:27'],
  ['0x5a9c...3f1', '0xAD...5F7', '0x28F4...7D9E', '$12,640.88', 'Polygon', 'Transfer', '2025-04-12 14:03'],
];

const risks = [
  ['High value inflow', '35%', 'red'], ['Exchange interaction', '28%', 'orange'], ['Multiple counterparties', '18%', 'teal'], ['Mixing service', '12%', 'purple'], ['Sanctioned entity link', '7%', 'gray'],
] as const;

function WalletProfile() {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'Graph' | 'Sankey'>('Graph');
  const [watched, setWatched] = useState(false);
  const [caseOpen, setCaseOpen] = useState(false);
  const [caseId, setCaseId] = useState('CN-2025-0147');
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState('');
  const [scanState, setScanState] = useState<'idle' | 'running' | 'done'>('idle');
  const [selectedCounterparty, setSelectedCounterparty] = useState<string | null>(null);

  const notify: ToastSetter = (message) => { setToast(message); window.setTimeout(() => setToast(''), 2600); };
  const filteredCounterparties = useMemo(() => {
    const query = search.trim().toLowerCase();
    return query ? counterparties.filter((item) => Object.values(item).some((value) => value.toLowerCase().includes(query))) : counterparties;
  }, [search]);

  const runScan = () => {
    setScanState('running');
    window.setTimeout(() => { setScanState('done'); notify('Quick scan complete — profile data is current'); }, 1100);
  };

  const openProfileAction = (message: string) => notify(message);

  return <>
    <style>{styles}</style>
    <main className="desk-shell">
      <div className="desk-grain" />
      <header className="topbar">
        <div className="brand-lockup"><div className="brand-mark"><Eye size={22} strokeWidth={2.2} /><span /></div><span className="brand-name">ChainNetra</span></div>
        <div className="title-block"><h1>Wallet Profile</h1><p>Deep dive into wallet activity, counterparties and risk signals</p></div>
        <div className="top-actions">
          <label className="search-slot"><Search size={16} /><input aria-label="Search wallet, tx hash, address, label" placeholder="Search wallet, tx hash, address, label..." value={search} onChange={(event) => setSearch(event.target.value)} /></label>
          <div style={{ position: 'relative' }}><button className="case-chip" onClick={() => setCaseOpen(!caseOpen)}><FileText size={14} />Case {caseId}<ChevronDown size={12} /></button>{caseOpen && <div className="case-menu"><button onClick={() => { setCaseId('CN-2025-0147'); setCaseOpen(false); notify('Case CN-2025-0147 selected'); }}>CN-2025-0147</button><button onClick={() => { setCaseId('CN-2025-0138'); setCaseOpen(false); notify('Case CN-2025-0138 selected'); }}>CN-2025-0138</button></div>}</div>
          <div className="view-switch"><button className={view === 'Graph' ? 'active' : ''} onClick={() => { setView('Graph'); notify('Graph view selected'); }}><Network size={13} />Graph</button><button className={view === 'Sankey' ? 'active' : ''} onClick={() => { setView('Sankey'); notify('Sankey view selected'); }}><BarChart3 size={13} />Sankey</button></div>
        </div>
      </header>

      <section className="profile-card">
        <div className="identity-row">
          <div className="wallet-orb"><BuildingIcon /></div>
          <div className="identity-main">
            <div className="identity-title">Binance Hot Wallet <button onClick={() => openProfileAction('Opening address in explorer')}><ExternalLink size={13} /></button></div>
            <div className="address-line"><button className="address-chip" onClick={() => { navigator.clipboard?.writeText('0x28F4A1B3...7D9E68A7'); notify('Wallet address copied'); }}>0x28F4A1B3...7D9E68A7 <Copy size={11} /></button><span className="chain-badge"><i className="chain-dot" />BSC</span></div>
            <div className="status-row"><span className="tag green"><Sparkles size={11} />VASP_HOT</span><span className="tag red"><ShieldAlert size={11} />High Risk</span></div>
          </div>
          <div className="quick-actions"><button className={`outline-btn ${watched ? 'primary' : ''}`} onClick={() => { setWatched(!watched); notify(watched ? 'Removed from watchlist' : 'Wallet added to watchlist'); }}><Bell size={13} />{watched ? 'Watching' : 'Watch'}</button><button className="outline-btn" onClick={() => openProfileAction('Trace started from Binance Hot Wallet')}><Play size={12} />Start trace</button><button className="outline-btn" onClick={() => openProfileAction('Opening wallet in graph explorer')}><Network size={13} />Open in graph</button></div>
        </div>
        <div className="metadata-row">
          <div className="meta-cell"><div className="meta-label">Labels</div><div className="label-row"><span className="tag blue">Exchange</span><span className="tag">KYC Possible</span><span className="tag amber">High Volume</span></div><div className="source-line">Source: <b>Graph Analysis</b> &nbsp;|&nbsp; Confidence: <b>92%</b></div></div>
          <div className="meta-cell"><div className="meta-label"><CircleDollarSign size={12} />Balance (USD)</div><div className="meta-value amount">$ 4,82,760.32</div><div className="meta-help">Total balance across chains</div></div>
          <div className="meta-cell"><div className="meta-label"><CalendarDays size={12} />First seen</div><div className="meta-value">2025-04-12 13:24:17 (UTC)</div></div>
          <div className="meta-cell"><div className="meta-label"><CalendarDays size={12} />Last seen</div><div className="meta-value">2025-04-14 10:42:33 (UTC)</div></div>
          <div className="meta-cell"><div className="meta-label">Chain</div><div className="meta-value"><span className="chain-badge chain-small"><i className="chain-dot" />BSC</span></div></div>
        </div>
      </section>

      {view === 'Sankey' && <div className="panel card" style={{ position: 'relative', zIndex: 2, marginBottom: 10, color: '#c7b995', textAlign: 'center' }}><Layers3 size={20} color="#d0a64d" /> Sankey preview is ready — switch back to Graph for wallet relationships.</div>}
      <section className="content-grid">
        <div className="left-stack">
          <article className="panel card scan-card"><div className="card-heading"><span><AlertTriangle size={14} />Not previously seen</span><CircleHelpIcon /></div><p>This address is not in our database. Run a quick scan for initial risk assessment.</p><button className="scan-btn" onClick={runScan}>{scanState === 'running' ? <RefreshCw size={13} className="spin" /> : <Zap size={13} />}{scanState === 'running' ? 'Scanning...' : scanState === 'done' ? 'Scan complete' : 'Run quick scan'}</button></article>
          <article className="panel card verdict-card"><div className="card-heading"><span><RefreshCw size={13} />Quick verdict</span><button className="heading-action" onClick={runScan}><RefreshCw size={12} /></button></div><div className="verdict-body"><div className="verdict-icon"><ShieldAlert size={18} /></div><div><div className="verdict-main">Unknown</div><div className="verdict-sub">No prior data found</div></div><span className="unknown-pill">--</span></div></article>
          <article className="panel card risk-card"><div className="card-heading"><span><Flag size={14} />Risk factors</span></div><div className="risk-list">{risks.map(([label, value, color]) => <div className="risk-line" key={label}><i className={`risk-dot ${color}`} /><span>{label}</span><strong>{value}</strong></div>)}</div><button className="risk-link" onClick={() => notify('Detailed risk breakdown opened')}>View detailed breakdown <ArrowRight size={10} /></button></article>
        </div>

        <div className="center-stack">
          <ActivityChart />
          <article className="panel card table-card"><div className="card-heading"><span><Network size={14} />Top Counterparties</span><button className="heading-action" onClick={() => notify('Showing all counterparties')}>View all <ArrowRight size={10} /></button></div><table className="data-table"><thead><tr><th>#</th><th>Address</th><th>Label</th><th>Chain</th><th>Total Volume (USD)</th><th>%</th></tr></thead><tbody>{filteredCounterparties.map((item, index) => <tr key={item.address} onClick={() => { setSelectedCounterparty(item.address); notify(`${item.address} selected`); }}><td className="rank">{index + 1}</td><td className="address-cell"><span className={`node-mini ${item.color}`}><WalletCards size={8} /></span>{item.address}</td><td>{item.label}</td><td><span className={`tag chain-small ${item.color}`}>{item.chain}</span></td><td className="volume">{item.volume}</td><td className="percent">{item.percent}</td></tr>)}</tbody></table>{selectedCounterparty && <div className="source-line">Selected: <b>{selectedCounterparty}</b><button className="heading-action" onClick={() => setSelectedCounterparty(null)}><X size={11} /></button></div>}</article>
        </div>

        <div className="right-stack">
          <article className="panel card cluster-card"><div className="card-heading"><span><Network size={14} />Cluster Membership</span><button className="heading-action" onClick={() => notify('Opening cluster C-1047')}>View cluster <ArrowRight size={10} /></button></div><div className="cluster-head"><span className="tag purple"><Layers3 size={11} />Cluster #C-1047</span></div><p>Part of a larger exchange cluster with 12 wallets and 3 linked VASPs.</p></article>
          <article className="panel card complaints-card"><div className="card-heading"><span><ClipboardList size={14} />Linked Complaints</span><button className="heading-action" onClick={() => notify('All linked complaints opened')}>View all <ArrowRight size={10} /></button></div><Complaint id="CN-2025-0147" type="Crypto Scam" date="2025-04-12" status="Active" tone="active" /><Complaint id="CN-2025-0138" type="Fraud" date="2025-04-08" status="Under Review" tone="review" /><Complaint id="CN-2025-0129" type="Hacking" date="2025-03-27" status="Resolved" tone="resolved" /></article>
          <RiskDonut onClick={() => notify('Risk factors breakdown refreshed')} />
        </div>
      </section>

      <section className="transactions">
        <div className="card-heading"><span><FileText size={14} />Recent Transactions</span><button className="heading-action" onClick={() => notify('Transaction export queued')}><ArrowDown size={12} /> Export</button></div>
        <table className="data-table transaction-table"><thead><tr><th>#</th><th>Hash</th><th>From</th><th>To</th><th>Amount (USD)</th><th>Chain</th><th>Type</th><th>Time</th><th>Status</th></tr></thead><tbody>{transactions.map((tx, index) => <tr key={tx[0]}><td className="rank">{index + 1}</td><td className="hash">{tx[0]}</td><td>{tx[1]}</td><td>{tx[2]}</td><td className="volume">{tx[3]}</td><td><span className={`tag chain-small ${tx[4] === 'Ethereum' ? 'blue' : tx[4] === 'Polygon' ? 'purple' : 'amber'}`}>{tx[4]}</span></td><td>{tx[5]}</td><td>{tx[6]}</td><td><span className="confirmed"><CheckCircle2 size={10} />Confirmed</span></td></tr>)}</tbody></table>
        <div className="pagination-row"><span>Showing 5 of 124 transactions</span><div className="pagination"><button className="page-btn arrow" onClick={() => setPage(Math.max(1, page - 1))}><ChevronLeft size={13} /></button>{[1, 2, 3, 4, 5].map((number) => <button key={number} className={`page-btn ${page === number ? 'selected' : ''}`} onClick={() => { setPage(number); notify(`Page ${number} selected`); }}>{number}</button>)}<span>...</span><button className={`page-btn ${page === 25 ? 'selected' : ''}`} onClick={() => setPage(25)}>25</button><button className="page-btn arrow" onClick={() => setPage(Math.min(25, page + 1))}><ChevronRight size={13} /></button></div></div>
      </section>
      {toast && <div className="toast"><Sparkles size={13} />{toast}</div>}
    </main>
  </>;
}

function BuildingIcon() { return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 21h18M5 21V5l7-3 7 3v16M8 8h1M8 12h1M8 16h1M15 8h1M15 12h1M15 16h1M11 21v-4h2v4" /><path d="M2 5h20" /></svg>; }
function CircleHelpIcon() { return <span style={{ color: '#b9aa8d', display: 'grid', placeItems: 'center' }}>?</span>; }
function ActivityChart() { const inflow = [52, 47, 43, 64, 84]; const outflow = [51, 32, 39, 29, 44]; return <article className="panel card chart-card"><div className="card-heading"><span><BarChart3 size={14} />Balance &amp; Activity</span><div className="chart-legend"><span><i className="legend-dot in" />Inflow</span><span><i className="legend-dot out" />Outflow</span></div></div><div className="chart-wrap"><div className="y-axis"><span>$2.0M</span><span>$1.5M</span><span>$1.0M</span><span>$0.5M</span><span>$0</span></div><div className="chart-area"><div className="bar-grid">{inflow.map((height, index) => <div className="bar-day" key={index}><i className="bar inflow" style={{ height: `${height}%` }} /><i className="bar outflow" style={{ height: `${outflow[index]}%` }} /></div>)}</div><div className="x-labels"><span>Apr 10</span><span>Apr 11</span><span>Apr 12</span><span>Apr 13</span><span>Apr 14</span></div></div></div></article>; }
function Complaint({ id, type, date, status, tone }: { id: string; type: string; date: string; status: string; tone: string }) { return <div className="complaint-row"><span className="complaint-id">{id}</span><span className="complaint-type">{type}<small className="complaint-date">{date}</small></span><span className={`status-pill ${tone}`}>{status}</span></div>; }
function RiskDonut({ onClick }: { onClick: () => void }) { const legend = [['High value inflow', '35%', '#e95036'], ['Exchange interaction', '28%', '#268fe5'], ['Multiple counterparties', '18%', '#1dbbc5'], ['Mixing service', '12%', '#965ed2'], ['Sanctioned entity link', '7%', '#84756c']]; return <article className="panel card donut-card"><div className="card-heading"><span><ShieldAlert size={14} />Risk Factors Breakdown</span><button className="heading-action" onClick={onClick}><RefreshCw size={12} /></button></div><div className="donut-content"><div className="donut"><div className="donut-center">Total<br />Risk<strong>92%</strong></div></div><div className="donut-legend">{legend.map(([label, value, color]) => <div className="donut-key" key={label}><i style={{ background: color }} /><span>{label}</span><strong>{value}</strong></div>)}</div></div></article>; }

export default WalletProfile;
