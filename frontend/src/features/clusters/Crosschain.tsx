"use client";

import { useEffect, useMemo, useState } from "react";
import backgroundImage from "../../assets/background.png";
import logo from "../../assets/logo.png";
import {
  AlertTriangle,
  Bell,
  ChevronDown,
  ChevronUp,
  CircleHelp,
  Copy,
  Eye,
  Filter,
  GitBranch,
  Link2,
  Maximize2,
  Network,
  Pause,
  Play,
  RotateCcw,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

const patterns = [
  [
    "Peel Chain",
    "Funds moved through a series of small wallets (peel chain).",
    "88%",
    "Apr 2 · 13:12 – 14:05",
    "♙",
  ],
  [
    "Fan-Out",
    "Funds split across multiple intermediary wallets before converging again.",
    "94%",
    "Apr 2 · 14:32 – 15:08",
    "⌘",
  ],
  [
    "Round-Trip",
    "Funds moved out and back to the original wallet (circular flow).",
    "81%",
    "Apr 2 · 10:21 – 12:17",
    "↻",
  ],
  [
    "Mixer Touch",
    "Funds passed through a mixer service (privacy service).",
    "76%",
    "Apr 2 · 16:03 – 17:42",
    "◉",
  ],
  [
    "Cross-Chain Hop",
    "Funds crossed multiple blockchains using bridges and DEXs.",
    "92%",
    "Apr 2 · 11:28 – 13:56",
    "↗",
  ],
];

const hops = [
  [
    "ETH",
    "THORChain",
    "BSC",
    "0x8a3f...2e1",
    "$12,480 in → $12,110 out",
    "Δ 3m 42s",
    "91%",
  ],
  [
    "BSC",
    "PancakeSwap",
    "POLY",
    "0x6c7d...9f3",
    "$8,420 in → $8,210 out",
    "Δ 5m 17s",
    "87%",
  ],
  [
    "POLY",
    "Stargate",
    "ETH",
    "0x9e4b...c2a",
    "$6,100 in → $5,980 out",
    "Δ 7m 32s",
    "82%",
  ],
  [
    "ETH",
    "Uniswap",
    "BSC",
    "0x1f20...8e7",
    "$4,320 in → $4,210 out",
    "Δ 4m 11s",
    "76%",
  ],
  [
    "BSC",
    "Bridge",
    "TRON",
    "0x5a9c...3f1",
    "$2,180 in → $2,040 out",
    "Δ 6m 03s",
    "68%",
  ],
];

function Button({
  children,
  className = "",
  onClick,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  title?: string;
}) {
  return (
    <button title={title} onClick={onClick} className={`raised ${className}`}>
      {children}
    </button>
  );
}

function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <section className={`panel ${className}`}>{children}</section>;
}

function GraphNode({
  type,
  title,
  sub,
  amount,
  className = "",
}: {
  type: string;
  title: string;
  sub: string;
  amount: string;
  className?: string;
}) {
  return (
    <div className={`node ${type} ${className}`}>
      <div className="node-orb">
        {type === "victim"
          ? "♙"
          : type === "suspect"
            ? "♟"
            : type === "vasp"
              ? "◉"
              : type === "mixer"
                ? "✣"
                : type === "dex"
                  ? "♣"
                  : type === "bridge"
                    ? "↯"
                    : "◌"}
      </div>
      <div>
        <strong>{title}</strong>
        <span>{sub}</span>
        <small>{amount}</small>
      </div>
    </div>
  );
}

export default function Page() {
  const [selected, setSelected] = useState("Fan-Out");
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("Patterns");
  const [playing, setPlaying] = useState(false);
  const [replayProgress, setReplayProgress] = useState(0);
  const [replaySpeed, setReplaySpeed] = useState(1);
  const [live, setLive] = useState(true);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setReplayProgress((value) => {
        if (value >= 100) {
          setPlaying(false);
          return 100;
        }
        return Math.min(100, value + replaySpeed * 2);
      });
    }, 500);
    return () => window.clearInterval(timer);
  }, [playing, replaySpeed]);
  const [menu, setMenu] = useState(true);
  const [empty, setEmpty] = useState(false);
  const filtered = useMemo(
    () =>
      patterns.filter((p) => p[0].toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  return (
    <main className="desk-shell">
      <div className="lamp">
        <span />
      </div>
      <div className="grain" />
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">
            <img src={logo} alt="Divya Drishti Logo" />
          </div>
          <span className="brand-name">DIVYA DRISHTI</span>
        </div>
        <div className="heading">
          <h1>Laundering &amp; Cross-Chain Analysis</h1>
          <p>
            Explain how funds were laundered across chains, bridges, mixers and
            exchanges
          </p>
        </div>
        <div className="header-actions">
          <label className="recessed global-search">
            <Search size={15} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search case ID, wallet, address, label..."
            />
            <kbd>⌘</kbd>
            <kbd>K</kbd>
          </label>
          <Button title="Notifications">
            <Bell size={17} />
          </Button>
          <Button className="investigator">
            <span className="avatar">R</span> Investigator{" "}
            <ChevronDown size={15} />
          </Button>
        </div>
      </header>

      <div className="case-strip">
        <span>
          Case <code>CN-2025-0147</code>
        </span>
        <b>•</b>
        <span>Investment Scam</span>
        <b>•</b>
        <span className="mono">₹ 48,70,000 loss</span>
        <b>•</b>
        <span>2 Apr 2025</span>
        <div className="tabs">
          {["Patterns", "Cross-chain", "Graph"].map((item) => (
            <Button
              key={item}
              className={tab === item ? "active" : ""}
              onClick={() => setTab(item)}
            >
              <Network size={15} />
              {item}
            </Button>
          ))}
        </div>
      </div>

      <div className="workspace">
        <Panel className="left-panel">
          <PanelTitle
            icon={<GitBranch size={16} />}
            title="Laundering Patterns"
            onClick={() => setEmpty(!empty)}
          />
          <label className="recessed pattern-search">
            <Search size={15} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pattern..."
            />
          </label>
          {empty ? (
            <div className="empty">
              No laundering patterns detected
              <br />
              <small>Clear the state to continue investigating.</small>
            </div>
          ) : (
            <div className="pattern-list">
              {filtered.map((p) => (
                <button
                  key={p[0]}
                  onClick={() => setSelected(p[0])}
                  className={`pattern-card ${selected === p[0] ? "selected" : ""}`}
                >
                  <span className="pattern-icon">{p[4]}</span>
                  <span className="pattern-copy">
                    <strong>{p[0]}</strong>
                    <small>{p[1]}</small>
                    <em>
                      Confidence {p[2]} <i>{p[3]}</i>
                    </em>
                  </span>
                </button>
              ))}
            </div>
          )}
        </Panel>

        <div className="center-column">
          <div className="graph-toolbar">
            <div className="seg">
              <Button className="active">
                <Network size={15} /> Graph
              </Button>
              <Button>
                <GitBranch size={15} /> Flow
              </Button>
            </div>
            <Button className="toggle" onClick={() => setLive(!live)}>
              ◈ Path to VASP <span className={live ? "switch on" : "switch"} />
            </Button>
            <Button>
              Dagre <ChevronDown size={14} />
            </Button>
            <div className="icon-actions">
              <Button title="Zoom in">
                <ZoomIn size={15} />
              </Button>
              <Button title="Zoom out">
                <ZoomOut size={15} />
              </Button>
              <Button title="Fit graph">
                <Maximize2 size={15} />
              </Button>
              <Button title="Reset">
                <RotateCcw size={15} />
              </Button>
              <Button title="Filters">
                <Filter size={15} />
              </Button>
            </div>
          </div>
          <Panel className="graph-panel">
            <div className="graph-note">
              <CircleHelp size={15} /> Showing top 500 by value — refine filters
            </div>
            <div className="graph-grid">
              <svg
                className="connections"
                viewBox="0 0 900 430"
                aria-hidden="true"
              >
                <defs>
                  <marker
                    id="arrow"
                    markerWidth="8"
                    markerHeight="8"
                    refX="6"
                    refY="3"
                    orient="auto"
                  >
                    <path d="M0,0 L0,6 L7,3 z" fill="#cfa144" />
                  </marker>
                </defs>
                <path
                  d="M100 220 L220 220 L340 115 L455 220 L615 220 L785 220"
                  className="route"
                  markerEnd="url(#arrow)"
                />
                <path
                  d="M220 220 L350 300 L455 220 M220 220 L350 60 L455 220 M350 60 L520 40 M350 300 L520 360"
                  className="secondary"
                />
                <path d="M455 220 L610 95" className="orange" />
                <path d="M455 220 L610 350" className="cyan" />
              </svg>
              <GraphNode
                type="victim"
                title="Victim"
                sub="0x7a3e...9f2c"
                amount="₹ 48,70,000"
                className="victim-pos"
              />
              <GraphNode
                type="suspect"
                title="Suspect"
                sub="0x61d...3e7f"
                amount="₹ 15,60,000"
                className="suspect-pos"
              />
              <GraphNode
                type="intermediary"
                title="Intermediary"
                sub="0x9c3e...6d2a"
                amount="₹ 8,20,000"
                className="int-one"
              />
              <GraphNode
                type="intermediary"
                title="Intermediary"
                sub="0x4db2...1a7e"
                amount="₹ 6,10,000"
                className="int-two"
              />
              <GraphNode
                type="intermediary"
                title="Intermediary"
                sub="0x2f1a...8b7c"
                amount="₹ 4,20,000"
                className="int-three"
              />
              <GraphNode
                type="vasp"
                title="VASP (Hot Wallet)"
                sub="Binance · 0x7a3e...9f2c"
                amount="₹ 34,80,000"
                className="vasp-pos"
              />
              <GraphNode
                type="vasp"
                title="VASP Deposit"
                sub="0x8c6...2e91"
                amount="₹ 12,40,000"
                className="deposit-pos"
              />
              <GraphNode
                type="mixer"
                title="Mixer"
                sub="Tornado Cash"
                amount="₹ 8,80,000"
                className="mixer-pos"
              />
              <GraphNode
                type="dex"
                title="DEX"
                sub="Uniswap"
                amount="₹ 4,20,000"
                className="dex-pos"
              />
              <GraphNode
                type="bridge"
                title="Bridge"
                sub="Wormhole"
                amount="₹ 5,20,000"
                className="bridge-pos"
              />
              {menu && (
                <div className="context-menu">
                  <button onClick={() => setMenu(false)}>
                    <Eye size={14} /> Open wallet profile
                  </button>
                  <button onClick={() => setMenu(false)}>
                    <Target size={14} /> Add to watchlist
                  </button>
                  <button onClick={() => setMenu(false)}>
                    <Copy size={14} /> Copy address
                  </button>
                  <button onClick={() => setMenu(false)}>◉ Hide node</button>
                  <button onClick={() => setMenu(false)}>
                    ◎ Mark as VASP (label)...
                  </button>
                </div>
              )}
              <div className="edge-label e1">ETH · ₹ 12.8L</div>
              <div className="edge-label e2">BSC · ₹ 3.9L</div>
              <div className="edge-label e3">POLY · ₹ 2.7L</div>
            </div>
          </Panel>
          <Panel className="hops">
            <PanelTitle icon={<Link2 size={16} />} title="Cross-Chain Hops" />
            {hops.map((h, i) => (
              <div className="hop" key={h[3]}>
                <b className="hop-no">{i + 1}</b>
                <span className="chain">
                  {h[0]} <i>→</i> via <strong>{h[1]}</strong> <i>→</i> {h[2]}
                </span>
                <code>{h[3]}</code>
                <span className="amount">
                  {h[4]}
                  <small>{h[6]} confidence · amount + timing correlation</small>
                </span>
                <span className="delta">{h[5]}</span>
                <span className="matched">♧ Matched</span>
              </div>
            ))}
          </Panel>
        </div>

        <aside className="right-column">
          <Panel className="details">
            <PanelTitle icon={<Sparkles size={16} />} title="Pattern Details" />
            <div className="selected-heading">
              <div className="fan-icon">⌘</div>
              <div>
                <h2>{selected} Pattern</h2>
                <span className="confidence">94% confidence</span>
              </div>
            </div>
            <div className="progress">
              <span />
            </div>
            <p className="description">
              Funds were split across 4 intermediary wallets, then partially
              reconverged at a VASP deposit wallet.
            </p>
            <div className="metrics">
              <div>
                Involved wallets<strong>4</strong>
              </div>
              <div>
                Total amount<strong>₹ 48,70,000</strong>
              </div>
            </div>
            <h3>Chains involved</h3>
            <div className="chain-badges">
              <span>◈ ETH</span>
              <span>✥ BSC</span>
              <span>◉ POLY</span>
              <span>♦ TRON</span>
            </div>
            <h3>Why this pattern?</h3>
            <ul className="checks">
              <li>Multiple split transactions detected</li>
              <li>Amounts show strong correlation</li>
              <li>Re-convergence at VASP deposit</li>
              <li>Time window overlap (&lt; 10 min)</li>
            </ul>
            <div className="detail-actions">
              <Button className="gold" onClick={() => setMenu(true)}>
                Open in Graph Explorer
              </Button>
              <Button
                onClick={() =>
                  alert("Evidence bundle opened for case CN-2025-0147")
                }
              >
                View evidence
              </Button>
            </div>
          </Panel>
          <Panel className="probabilistic">
            <div className="warning-title">
              <AlertTriangle size={18} />
              <strong>Attribution beyond this point is probabilistic</strong>
            </div>
            <p>
              A privacy service / mixer was detected. Downstream attribution
              cannot be treated as certain.
            </p>
            <h3>Candidate downstream matches</h3>
            {[
              ["A", "0x6f3a...9c2d", "Amount + time match", "2h 14m", "78%"],
              ["B", "0x9e1b...7a4f", "Possible amount match", "3h 02m", "64%"],
              ["C", "0x2c7d...5e8a", "Time window match", "5h 47m", "51%"],
            ].map((c) => (
              <div className="candidate" key={c[0]}>
                <b>{c[0]}</b>
                <code>{c[1]}</code>
                <span>
                  {c[2]} · {c[3]}
                </span>
                <strong>{c[4]}</strong>
              </div>
            ))}
            <Button onClick={() => alert("Candidate review opened")}>
              View candidates
            </Button>
          </Panel>
        </aside>
      </div>

      <footer className="replay">
        <span className="replay-label">Replay</span>
        <Button
          className="play"
          onClick={() => {
            if (replayProgress >= 100) setReplayProgress(0);
            setPlaying(!playing);
          }}
        >
          {playing ? <Pause size={20} /> : <Play size={20} />}
        </Button>
        <Button
          onClick={() =>
            setReplaySpeed((speed) => (speed === 1 ? 2 : speed === 2 ? 4 : 1))
          }
        >
          {replaySpeed}× <ChevronDown size={14} />
        </Button>
        <div className="timeline">
          <b>28 Sept 2026, 14:32 · {Math.round(replayProgress)}%</b>
          <button
            className="track"
            aria-label="Replay progress"
            onClick={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              setReplayProgress(
                Math.round(((event.clientX - rect.left) / rect.width) * 100),
              );
            }}
          >
            <span
              className="track-progress"
              style={{ width: `${replayProgress}%` }}
            />
            <i />
            <i />
            <i />
            <i />
          </button>
          <div className="events">
            <span>◉ Case created</span>
            <span>● Funds moved</span>
            <span>● VASP detected</span>
            <span>● Tracing in progress</span>
          </div>
        </div>
        <Button
          className={live ? "live active" : "live"}
          onClick={() => setLive(!live)}
        >
          ● Live mode
        </Button>
        <div className="counts">
          <span>
            Events<strong>248</strong>
          </span>
          <span>
            Nodes<strong>312</strong>
          </span>
        </div>
      </footer>
      <div className="evidence">EVIDENCE</div>
      <div className="pen" />
      <div className="seal">◉</div>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
    </main>
  );
}

function PanelTitle({
  icon,
  title,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
}) {
  return (
    <div className="panel-title">
      <span>
        {icon}
        <strong>{title}</strong>
      </span>
      <button onClick={onClick} aria-label={`Collapse ${title}`}>
        <ChevronUp size={15} />
      </button>
    </div>
  );
}

const styles = `
:root{--font-display:'Anybody',Arial Narrow,sans-serif;--font-ui:'Instrument Sans',system-ui,sans-serif;--font-data:'JetBrains Mono',ui-monospace,monospace}
:root{--walnut:#17100b;--panel:rgba(12,10,8,.86);--brass:#cfa144;--gold:#f0cd7a;--cream:#f1e7d3;--muted:#b9a98d;--faint:#8a7b63;--green:#4fb39a;--red:#e4553f;--blue:#55c9f0;--purple:#a57bd1;--orange:#f2a03d}*{box-sizing:border-box}body{margin:0;background:#17100b;color:var(--cream);font-family:'Instrument Sans',system-ui,sans-serif}
.desk-shell{min-height:100vh;overflow:hidden;position:relative;padding:52px 34px 92px;background-image:linear-gradient(rgba(10,6,3,.22),rgba(10,6,3,.34)),url('${backgroundImage}');background-size:cover;background-position:center;background-attachment:fixed;background-color:#17100b}.lamp,.evidence,.pen,.seal{display:none}.grain{position:absolute;inset:0;opacity:.24;pointer-events:none;background-image:repeating-linear-gradient(95deg,transparent 0 31px,rgba(255,185,73,.09) 32px,transparent 35px),repeating-linear-gradient(4deg,transparent 0 90px,rgba(0,0,0,.35) 91px 94px)}.lamp{position:absolute;left:-22px;top:-38px;width:160px;height:85px;border-radius:50%;transform:rotate(-24deg);background:radial-gradient(ellipse,#f8d677 0 10%,#a7701c 30%,#211307 65%);box-shadow:0 10px 70px 28px rgba(240,178,48,.34);z-index:0}.lamp span{position:absolute;right:18px;top:32px;width:110px;height:3px;background:#e0a941}.topbar,.case-strip,.workspace,.replay{position:relative;z-index:1}.topbar{display:flex;align-items:center;gap:22px;border-bottom:1px solid #66501f;padding:6px 0 12px}.brand{display:flex;align-items:center;gap:10px;font-size:18px;white-space:nowrap}.brand i{height:36px;border-left:1px solid #80652a;margin-left:6px}.eye{color:var(--gold);font-size:26px;transform:scaleX(1.6)}.heading{flex:1}.heading h1{font-family:'Anybody',Arial Narrow,sans-serif;font-size:25px;line-height:1;margin:0;font-weight:680;letter-spacing:-.8px}.heading p{color:#9eb5c4;font-size:13px;margin:5px 0 0}.header-actions{display:flex;align-items:center;gap:8px}.raised{position:relative;border:1px solid #80621d;border-radius:9px;color:var(--cream);background:linear-gradient(#292114,#100e0b);box-shadow:inset 0 1px rgba(255,221,142,.25),3px 5px 0 #0b0704,0 6px 12px rgba(0,0,0,.38);padding:9px 13px;display:inline-flex;align-items:center;gap:8px;font:600 12px 'Instrument Sans';cursor:pointer;transition:.16s}.raised:hover{transform:translateY(-1px);filter:brightness(1.18)}.raised:active{transform:translateY(2px);box-shadow:inset 0 1px rgba(255,221,142,.15),1px 2px 0 #0b0704}.raised.active,.gold{background:linear-gradient(#e4b955,#9e6c18);color:#241706;border-color:#f2cd75}.investigator{padding-right:10px}.avatar{display:grid;place-items:center;border-radius:50%;width:28px;height:28px;background:linear-gradient(#ffe39a,#a8751c);color:#201507;font-size:16px}.recessed{display:flex;align-items:center;gap:8px;background:#0b0a08;border:1px solid #6b511b;border-radius:10px;box-shadow:inset 2px 3px 8px #020100,inset -1px -1px 2px rgba(239,181,78,.22);color:var(--muted)}.recessed input{border:0;outline:0;background:transparent;color:var(--cream);font:12px 'Instrument Sans';min-width:0}.global-search{width:365px;padding:7px 9px}.global-search input{flex:1}.global-search kbd{font:11px monospace;border:1px solid #493b20;border-radius:4px;padding:2px 5px;color:#a89778}.case-strip{display:flex;align-items:center;gap:12px;padding:12px 20px;font-size:12px}.case-strip b{color:#796e5e}.mono,code{font-family:'JetBrains Mono',monospace;color:#9dd0e0}.tabs{margin-left:auto;display:flex;gap:10px}.tabs .raised{min-width:108px;justify-content:center}.workspace{display:grid;grid-template-columns:250px minmax(580px,1fr) 290px;gap:10px;align-items:start}.panel{background:linear-gradient(135deg,rgba(30,25,18,.92),rgba(5,7,7,.9));border:1px solid #70571f;border-radius:14px;box-shadow:inset 0 1px rgba(240,205,122,.18),0 9px 20px rgba(4,2,1,.58);overflow:hidden}.panel-title{display:flex;justify-content:space-between;align-items:center;padding:11px 14px;border-bottom:1px solid rgba(207,161,68,.3);font-size:14px}.panel-title span{display:flex;align-items:center;gap:9px}.panel-title svg{color:var(--brass)}.panel-title button{border:0;background:transparent;color:var(--gold);cursor:pointer}.left-panel{min-height:632px;padding-bottom:10px}.pattern-search{margin:12px;padding:8px 10px}.pattern-search input{width:100%}.pattern-list{display:flex;flex-direction:column;gap:8px;padding:0 12px}.pattern-card{display:flex;text-align:left;gap:10px;padding:12px 10px;border:1px solid #493c22;border-radius:11px;background:rgba(14,14,12,.75);color:var(--cream);cursor:pointer;box-shadow:inset 0 1px rgba(255,255,255,.05)}.pattern-card.selected{border-color:#d2a43e;box-shadow:0 0 16px rgba(209,159,44,.18),inset 0 1px rgba(255,230,155,.38)}.pattern-icon{font-size:24px;color:var(--gold);width:26px;text-align:center}.pattern-copy{display:flex;flex-direction:column;gap:4px;flex:1}.pattern-copy strong{font-size:14px}.pattern-copy small{color:#b2ad9d;font-size:11px;line-height:1.25}.pattern-copy em{font-style:normal;font-size:10px;color:#aaa08a;margin-top:7px}.pattern-copy i{float:right;font-style:normal}.empty{text-align:center;color:var(--muted);padding:80px 20px;font-size:15px}.empty small{font-size:11px;color:var(--faint)}.center-column{min-width:0}.graph-toolbar{display:flex;align-items:center;gap:8px;margin-bottom:9px}.seg{display:flex}.seg .raised:first-child{border-radius:8px 0 0 8px}.seg .raised:last-child{border-radius:0 8px 8px 0;margin-left:-1px}
.toggle{
  margin-left:auto;
  width:150px;
  min-width:150px;
  max-width:150px;
  height:38px;
  padding:8px 10px;
  justify-content:center;
  white-space:nowrap;
  flex-shrink:0;
  overflow:hidden;
}

.toggle .switch{
  flex:none;
}
.switch{width:27px;height:15px;border-radius:12px;background:#392d19;display:inline-block;box-shadow:inset 1px 2px 4px #050302}.switch.on{background:#2ba489;position:relative}.switch.on:after{content:'';position:absolute;right:2px;top:2px;width:11px;height:11px;background:#d9fff0;border-radius:50%}.icon-actions{display:flex;gap:4px}.icon-actions .raised{padding:8px}.graph-panel{height:448px;position:relative}.graph-note{position:absolute;top:11px;left:12px;z-index:2;display:flex;align-items:center;gap:8px;border:1px solid #32596a;border-radius:7px;padding:7px 10px;font-size:11px;color:#83c8e0;background:#071215}.graph-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(178,141,61,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(178,141,61,.07) 1px,transparent 1px);background-size:28px 28px}.connections{position:absolute;inset:32px 0 0;width:100%;height:calc(100% - 32px)}.connections path{fill:none;stroke:#e8ca75;stroke-width:2;marker-end:url(#arrow)}.connections .route{stroke:#c9e783;stroke-width:3;filter:drop-shadow(0 0 4px #4fb39a)}.connections .secondary{stroke:#806a43;stroke-dasharray:7 7;stroke-width:1.4}.connections .orange{stroke:#ef9f3b;stroke-dasharray:6 5}.connections .cyan{stroke:#4ed2e4;stroke-dasharray:8 4}.node{position:absolute;display:flex;align-items:center;gap:7px;font-size:11px;filter:drop-shadow(0 5px 5px #050302)}.node-orb{width:43px;height:43px;border-radius:50%;display:grid;place-items:center;font-size:22px;border:2px solid currentColor;background:#101416;box-shadow:0 0 15px currentColor}.node strong,.node span,.node small{display:block}.node strong{font-size:12px}.node span{color:currentColor;font-family:'JetBrains Mono';font-size:9px}.node small{color:#d9c9aa;font-size:10px;margin-top:2px}.victim{color:#31c8ed}.suspect{color:#ff4e45}.intermediary{color:#bdbbb5}.intermediary .node-orb{width:35px;height:35px;font-size:16px}.vasp{color:#68ee72}.mixer{color:#c162ff}.dex{color:#ef9c35}.bridge{color:#36d7e8}.victim-pos{left:4%;top:43%}.suspect-pos{left:21%;top:43%}.int-one{left:38%;top:25%}.int-two{left:39%;top:44%}.int-three{left:40%;top:63%}.vasp-pos{left:66%;top:43%}.deposit-pos{right:3%;top:43%}.mixer-pos{left:48%;top:9%}.dex-pos{left:69%;top:12%}.bridge-pos{left:47%;top:78%}.edge-label{position:absolute;font:10px 'JetBrains Mono';color:#e8d384}.e1{left:24%;top:39%}.e2{left:48%;top:39%}.e3{left:53%;top:57%}.context-menu{position:absolute;right:22%;top:33%;width:170px;padding:8px;background:#17140e;border:1px solid #c29435;border-radius:8px;box-shadow:5px 8px 0 #050301,0 10px 20px #050301}.context-menu button{display:flex;gap:8px;width:100%;border:0;background:transparent;color:#d7c9ac;padding:7px;text-align:left;font-size:10px;cursor:pointer}.context-menu button:hover{color:var(--gold);background:#332713}.hops{margin-top:10px;padding-bottom:4px}.hop{display:grid;grid-template-columns:23px 1.2fr 1fr 1.5fr .7fr 75px;gap:8px;align-items:center;border-bottom:1px solid rgba(207,161,68,.18);padding:7px 14px;font-size:10px}.hop-no{display:grid;place-items:center;border-radius:50%;background:#1d8d6a;color:#dfffe8;width:19px;height:19px}.chain{color:#d9cda9}.chain i{font-style:normal;color:var(--gold);padding:0 4px}.chain strong{color:#84bfd0}.hop code{font-size:9px}.amount small{display:block;color:#807a68;margin-top:2px}.delta{color:#aaa28d}.matched{color:#60daa7;border:1px solid #23865d;border-radius:8px;padding:3px 5px;text-align:center}.right-column{display:flex;flex-direction:column;gap:10px}.details{padding-bottom:14px}.selected-heading{display:flex;gap:10px;padding:13px 14px 8px;align-items:center}.fan-icon{display:grid;place-items:center;width:42px;height:42px;color:#4be1a5;border:2px solid;border-radius:10px;font-size:25px}.selected-heading h2{font-size:14px;margin:0 0 5px}.confidence{font:10px 'JetBrains Mono';color:#53dfb0;border:1px solid #278e6b;border-radius:8px;padding:4px 5px}.progress{height:7px;margin:0 14px 12px;background:#20251f;border-radius:6px;overflow:hidden}.progress span{display:block;width:93%;height:100%;background:#26c992}.description{font-size:11px;line-height:1.45;color:#d0c4aa;padding:0 14px}.metrics{display:grid;grid-template-columns:1fr 1fr;margin:12px 14px;border-top:1px solid #44371f;border-bottom:1px solid #44371f}.metrics div{padding:9px 7px;color:#918a77;font-size:10px}.metrics div+div{border-left:1px solid #44371f}.metrics strong{display:block;color:var(--cream);font:11px 'JetBrains Mono';margin-top:4px}.details h3,.probabilistic h3{font-size:11px;margin:12px 14px 8px;color:#e2d1ac}.chain-badges{display:flex;gap:5px;padding:0 14px}.chain-badges span{font-size:10px;padding:5px 6px;border-radius:8px;background:#1e2836;color:#8dcff1}.chain-badges span:nth-child(2){background:#3a321b;color:#f3c85e}.chain-badges span:nth-child(3){background:#332543;color:#c693f5}.chain-badges span:nth-child(4){background:#3b2024;color:#ff7771}.checks{list-style:none;padding:0 14px;margin:0;display:flex;flex-direction:column;gap:6px;font-size:10px;color:#b7b29f}.checks li:before{content:'✓';color:#42d394;border:1px solid #2b976b;border-radius:50%;margin-right:6px;padding:0 2px}.detail-actions{display:flex;gap:7px;padding:10px 14px 0}.detail-actions .raised{font-size:10px;padding:8px}.probabilistic{padding:12px 14px}.warning-title{display:flex;gap:8px;color:#f3c25a;font-size:12px;line-height:1.3}.warning-title svg{flex:none}.probabilistic p{color:#b4aa94;font-size:10px;line-height:1.45}.candidate{display:grid;grid-template-columns:22px 1fr 35px;gap:5px;align-items:center;border-top:1px solid #493c23;padding:8px 0;font-size:9px}.candidate>b{display:grid;place-items:center;border-radius:50%;background:#8b681f;color:#f8e7b2;width:19px;height:19px}.candidate code{font-size:9px}.candidate span{grid-column:2;color:#9b927f}.candidate>strong{grid-column:3;grid-row:1/3;color:#82c5d6}.probabilistic>.raised{width:100%;justify-content:center;margin-top:8px}
.replay{position:fixed;bottom:15px;left:16%;right:7%;height:74px;display:flex;align-items:center;gap:13px;padding:10px 16px;background:linear-gradient(90deg,#111310,#19180f);border:1px solid #7b5b1b;border-radius:14px;box-shadow:0 8px 0 #070402,0 14px 24px #050301;z-index:5}.replay-label{font-size:12px}.play{border-radius:50%;width:47px;height:47px;justify-content:center;background:linear-gradient(#ffd86c,#a16e17);color:#2c1b07;border:2px solid #f4c95d}.timeline{flex:1;min-width:250px}.timeline b{font:10px 'JetBrains Mono';color:#a69a83}.track{height:6px;background:#382f21;position:relative;margin:6px 0 5px;border-radius:8px}.track-progress{position:absolute;left:0;top:0;bottom:0;width:57%;background:linear-gradient(90deg,#2caeda,#28b885);border-radius:8px}.track i{position:relative;display:inline-block;width:9px;height:9px;border:2px solid #e9bd4b;background:#151812;border-radius:50%;margin: -2px 0 0 18%;z-index:1}.events{display:flex;justify-content:space-between;color:#8b9588;font-size:9px}.events span:nth-child(2){color:#dfb946}.events span:nth-child(3){color:#44d2a5}.live{color:#58dda4}.counts{display:flex;gap:18px;border-left:1px solid #493b20;padding-left:14px}.counts span{font-size:9px;color:#7f7867}.counts strong{display:block;color:#d5c8ad;font:13px 'JetBrains Mono';margin-top:3px}.evidence{position:fixed;bottom:20px;left:-12px;transform:rotate(16deg);background:#9b7951;color:#382112;padding:11px 25px;font:bold 17px Georgia;box-shadow:4px 5px 0 #4d321e;z-index:2}.pen{position:fixed;right:-22px;bottom:18px;width:215px;height:9px;transform:rotate(-23deg);background:linear-gradient(#161616,#746854,#080808);border-radius:8px;box-shadow:0 4px 4px #050302}.seal{position:fixed;right:27px;bottom:31px;width:52px;height:52px;border-radius:50%;display:grid;place-items:center;color:#d5a841;font-size:29px;border:2px solid #9b762b;background:#17100b;box-shadow:0 0 0 5px #271b0c,0 8px 8px #050302;z-index:2}@media(max-width:1100px){.desk-shell{padding-left:16px;padding-right:16px}.workspace{grid-template-columns:210px minmax(480px,1fr)}.right-column{grid-column:1/-1;display:grid;grid-template-columns:1fr 1fr}.heading h1{font-size:20px}.global-search{width:250px}.replay{left:8%;right:4%}}@media(max-width:800px){.topbar{flex-wrap:wrap}.heading{order:3;flex-basis:100%}.header-actions{margin-left:auto}.workspace{display:flex;flex-direction:column}.left-panel,.center-column,.right-column{width:100%}.right-column{display:flex}.graph-panel{height:500px}.hop{grid-template-columns:23px 1fr 1fr}.hop .amount,.hop .delta{display:none}.tabs{display:none}.replay{left:10px;right:10px}.events{display:none}.counts{display:none}}
.track{border:0;padding:0;cursor:pointer;background:transparent;position:relative;width:100%;height:28px;text-align:left}.track:focus-visible{outline:2px solid var(--gold);outline-offset:4px}.track-progress{transition:width .25s ease;background:linear-gradient(90deg,var(--blue),var(--green),var(--gold))}.track-progress:after{content:'';position:absolute;right:0;top:50%;width:12px;height:12px;border-radius:50%;background:var(--gold);box-shadow:0 0 14px var(--gold);transform:translate(50%,-50%)}.timeline b{font-variant-numeric:tabular-nums}.mono,code{font-family:'JetBrains Mono',ui-monospace,monospace;font-variant-numeric:tabular-nums}.heading h1,.details h2{font-variation-settings:'wdth' 86,'wght' 680}@media (prefers-reduced-motion:reduce){.track-progress{transition:none!important}}`;
