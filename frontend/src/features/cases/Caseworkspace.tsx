import { useState } from "react";
import backgroundImage from "../../assets/background.png";
import logo from "../../assets/logo.png";
import {
  Activity,
  AlertTriangle,
  Archive,
  ArrowDownRight,
  Bell,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  Copy,
  Database,
  FileCheck2,
  FileText,
  Filter,
  Gem,
  Globe2,
  History,
  Link2,
  MessageSquareText,
  Network,
  Paperclip,
  Pause,
  Plus,
  RefreshCcw,
  Search,
  Send,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Star,
  Tag,
  Target,
  TimerReset,
  TriangleAlert,
  UserRound,
  WalletCards,
  X,
  Zap,
} from "lucide-react";

type IconType = typeof Search;

type EvidenceRow = {
  icon: IconType;
  title: string;
  description: string;
  value: number;
  color: string;
};

const evidenceRows: EvidenceRow[] = [
  {
    icon: Network,
    title: "Cluster match",
    description: "Matches known VASP-X deposit cluster",
    value: 96,
    color: "#75dca1",
  },
  {
    icon: Link2,
    title: "Address reuse",
    description: "Reused deposit address in 12 other cases",
    value: 88,
    color: "#f0cd7a",
  },
  {
    icon: TimerReset,
    title: "Temporal pattern",
    description: "Rapid deposits after user withdrawal",
    value: 76,
    color: "#a8de8a",
  },
  {
    icon: Link2,
    title: "Graph link",
    description: "Connected to high-risk mixer (2 hops)",
    value: 68,
    color: "#f0c466",
  },
  {
    icon: Tag,
    title: "Label match",
    description: "Tagged in threat intel (investment scam)",
    value: 62,
    color: "#ed9f39",
  },
];

const transactions = [
  [
    "2026-09-28 11:32",
    "ETH",
    "0x7a3e...9f2c",
    "0x8d6a...e1a7",
    "USDT",
    "20,000",
    "$24,160",
    "0xa1c3...9f6e",
    "92%",
    "High risk",
  ],
  [
    "2026-09-27 12:17",
    "BSC",
    "0x8d6a...a1a7",
    "0x9e2f...3a6b",
    "USDT",
    "15,000",
    "$18,120",
    "0x3f7a...2c8e",
    "87%",
    "Mixer",
  ],
  [
    "2026-09-26 16:03",
    "TRON",
    "0x9c2f...3a6b",
    "0x5e1d...7f9f",
    "TRX",
    "50,000",
    "$6,420",
    "0x7c9e...5142",
    "64%",
    "Hops",
  ],
  [
    "2026-09-26 10:21",
    "ETH",
    "0x5e1d...7f9f",
    "0xa8b0...2ee7",
    "USDT",
    "8,000",
    "$9,660",
    "0x12e4...8d7c",
    "43%",
    "Normal",
  ],
];

const timeline = [
  {
    date: "2026-09-28 09:14",
    title: "User complaint filed",
    status: "Created",
    icon: FileText,
  },
  {
    date: "2026-09-27 11:32",
    title: "Funds moved to VASP-X",
    status: "Attribution",
    icon: WalletCards,
  },
  {
    date: "2026-09-26 16:47",
    title: "Downstream hops detected",
    status: "Tracing",
    icon: Network,
  },
  {
    date: "2026-09-28 14:22",
    title: "Trace complete",
    status: "Completed",
    icon: CheckCircle2,
  },
];

const evidenceCards = [
  {
    title: "Blockchain Snapshot",
    desc: "On-chain data (tx, balances)",
    hash: "6f3a...9e2d",
    icon: Database,
  },
  {
    title: "Label Sources",
    desc: "Threat intel & exchange labels",
    hash: "2fc8...77aa",
    icon: Tag,
  },
  {
    title: "Chain Screenshot",
    desc: "Fraud graph (png)",
    hash: "8d7e...1ab9",
    icon: Paperclip,
  },
  {
    title: "Chain of Custody Log",
    desc: "Evidence handling log",
    hash: "92ef...6c3e",
    icon: Archive,
  },
];

function Caseworkspace() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [whyOpen, setWhyOpen] = useState(true);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([
    [
      "RS",
      "Rishikesh Singh",
      "2026-09-28 14:30",
      "Attribution confirmed. Proceed with freeze notice.",
    ],
    [
      "AK",
      "Ananya K.",
      "2026-09-28 12:18",
      "Found additional wallet cluster. Adding to watchlist.",
    ],
    [
      "RS",
      "Rohit Sharma",
      "2026-08-25 19:02",
      "Initial analysis complete. Trace looks promising.",
    ],
  ]);
  const [checked, setChecked] = useState<number[]>([0]);
  const [traceState, setTraceState] = useState<
    "complete" | "tracing" | "failed"
  >("complete");

  const toggleCheck = (index: number) => {
    setChecked((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  };

  const addNote = () => {
    if (!note.trim()) return;
    setNotes((current) => [
      ["RS", "Rishikesh", "Just now", note.trim()],
      ...current,
    ]);
    setNote("");
  };

  return (
    <main className="desk-shell">
      <div className="lamp-glow" />
      <div className="wood-grain" />
      <header className="global-header">
        <div className="brand">
          <div className="brand-mark">
            <img src={logo} alt="Divya Drishti Logo" />
          </div>

          <span className="brand-name">DIVYA DRISHTI</span>
        </div>
        <label className="carved-search">
          <Search size={16} />
          <input placeholder="Search case ID, wallet, address, or keyword..." />
          <kbd>⌘ K</kbd>
        </label>
        <div className="header-actions">
          <button
            className={`trace-chip ${traceState === "complete" ? "ok" : ""}`}
            onClick={() => setTraceState("complete")}
          >
            <CheckCircle2 size={14} /> Trace complete
          </button>
          <button
            className={`trace-chip ${traceState === "tracing" ? "active" : ""}`}
            onClick={() => setTraceState("tracing")}
          >
            <Clock3 size={14} /> Still tracing{" "}
            <span className="mini-progress">
              <i />
            </span>
            <em>68%</em>
          </button>
          <button
            className={`trace-chip danger ${traceState === "failed" ? "active" : ""}`}
            onClick={() => setTraceState("failed")}
          >
            <AlertTriangle size={14} /> Trace failed{" "}
            <small onClick={() => setTraceState("tracing")}>
              <RefreshCcw size={10} /> Retry trace
            </small>
          </button>
          <button className="icon-button">
            <Bell size={17} />
            <span className="notification-dot" />
          </button>
          <div className="investigator">
            <span className="avatar cream">R</span>
            <span>
              <strong>Investigator</strong>
              <small>Rishikesh</small>
            </span>
            <ChevronDown size={14} />
          </div>
        </div>
      </header>

      <section className="case-header glass-panel">
        <div className="case-identity">
          <span className="eyebrow">CASE WORKSPACE</span>
          <h1>Investment Scam</h1>
          <div className="case-id mono">
            CN-2025-0147 <Copy size={13} />
          </div>
        </div>
        <div className="header-field">
          <span>Status</span>
          <button className="select-key teal">
            Open <ChevronDown size={14} />
          </button>
        </div>
        <div className="header-field assigned">
          <span>Assigned to</span>
          <div className="assigned-value">
            <span className="avatar small">
              <UserRound size={13} />
            </span>{" "}
            Rishikesh <ChevronDown size={13} />
          </div>
        </div>
        <div className="header-field loss">
          <span>Victim Loss</span>
          <strong>₹48,70,000</strong>
        </div>
        <div className="risk-summary">
          <RiskRing value={82} />
          <span>Risk</span>
        </div>
        <div className="freeze-summary">
          <span>Freeze Window</span>
          <button className="status-pill closing">
            <TimerReset size={14} /> CLOSING
          </button>
        </div>
        <div className="case-actions">
          <button className="key-button brass">
            <Send size={15} />{" "}
            <span>
              Send notice<small>Hold to confirm</small>
            </span>
          </button>
          <button className="key-button">
            <FileCheck2 size={15} /> Generate report
          </button>
          <button className="key-button">
            <Star size={15} /> Add to watchlist
          </button>
          <button
            className="key-button compact"
            onClick={() => setCopilotOpen(true)}
          >
            <Sparkles size={15} /> Open Copilot
          </button>
        </div>
      </section>

      <nav className="tab-bar" aria-label="Case sections">
        {["Overview", "Graph", "Patterns", "Transactions", "Evidence"].map(
          (tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ),
        )}
      </nav>

      {traceState === "failed" && (
        <div className="trace-error glass-panel">
          <TriangleAlert size={19} />
          <div>
            <strong>Trace failed</strong>
            <span>
              The network trace stopped before reaching a destination label.
              Retry the trace to continue attribution.
            </span>
          </div>
          <button
            className="key-button danger-key"
            onClick={() => setTraceState("tracing")}
          >
            <RefreshCcw size={14} /> Retry trace
          </button>
        </div>
      )}
      {traceState === "tracing" && (
        <div className="job-progress glass-panel">
          <div>
            <Activity size={18} />
            <strong>Live trace in progress</strong>
            <span>Following downstream wallet hops and label matches</span>
          </div>
          <div className="job-track">
            <i />
            <span>68%</span>
          </div>
          <button className="icon-button">
            <Pause size={14} />
          </button>
        </div>
      )}

      <section className="overview-grid">
        <div className="left-column">
          <VaspCard whyOpen={whyOpen} onWhy={() => setWhyOpen(!whyOpen)} />
          <div className="lower-split">
            <TimelineCard />
            <NotesCard
              notes={notes}
              note={note}
              setNote={setNote}
              addNote={addNote}
            />
          </div>
        </div>
        <div className="middle-column">
          <RiskCard />
          <Recommendations checked={checked} toggleCheck={toggleCheck} />
        </div>
        <div className="right-column">
          <FreezeCard />
          <TaintCard />
        </div>
      </section>

      <section className="bottom-grid">
        <TransactionsTable />
        <EvidencePanel />
      </section>

      <footer className="desk-footer">
        <span>
          <ShieldCheck size={13} /> Evidence Desk / Case CN-2025-0147
        </span>
        <span>
          Last synced 14:32:08 IST <span className="sync-dot" />
        </span>
        <span>
          Full effects{" "}
          <span className="toggle on">
            <i />
          </span>
        </span>
      </footer>

      {copilotOpen && (
        <aside className="copilot-drawer">
          <div className="drawer-top">
            <div>
              <Sparkles size={16} />
              <strong>ChainNetra Copilot</strong>
              <small>Case-aware investigator assistant</small>
            </div>
            <button
              className="icon-button"
              onClick={() => setCopilotOpen(false)}
            >
              <X size={17} />
            </button>
          </div>
          <div className="copilot-summary">
            <Target size={16} />
            <span>
              Current focus: <b>VASP-X attribution</b>
              <small>3 high-confidence signals found</small>
            </span>
          </div>
          <div className="chat-stream">
            <div className="chat-message bot">
              I found a strong match to VASP-X. The 2-hop path and reused
              deposit address support sending a freeze notice.
              <small>14:31</small>
            </div>
            <div className="chat-message user">
              Summarize the evidence for the case note.<small>14:32</small>
            </div>
            <div className="chat-message bot">
              Attribution is supported by cluster match (96%), address reuse
              (88%), and temporal pattern (76%). Funds remain in the closing
              freeze window.
              <span className="stream-caret" />
              <small>now</small>
            </div>
          </div>
          <div className="copilot-compose">
            <textarea placeholder="Ask about this case..." />
            <div>
              <button className="language-chip">हिन्दी / English</button>
              <button className="send-key">
                <Send size={14} />
              </button>
            </div>
          </div>
        </aside>
      )}
    </main>
  );
}

function VaspCard({ whyOpen, onWhy }: { whyOpen: boolean; onWhy: () => void }) {
  return (
    <section className="glass-panel hero-card">
      <div className="card-header">
        <div className="card-title">
          <span className="icon-orb teal-orb">
            <CheckCircle2 size={17} />
          </span>
          <h2>Nearest VASP</h2>
        </div>
        <span className="verified-stamp">
          <ShieldCheck size={14} /> VERIFIED
        </span>
      </div>
      <div className="vasp-summary">
        <div className="vasp-brand">
          <span className="exchange-logo">
            <Globe2 size={25} />
          </span>
          <div>
            <strong>VASP-X</strong>
            <small>Global Exchange</small>
          </div>
        </div>
        <div className="meter-block">
          <span>Confidence</span>
          <div className="confidence-meter">
            <i />
          </div>
          <b>92%</b>
        </div>
        <DataPair label="Hops" value="2" />
        <DataPair label="Deposit Address" value="0x7a3e...9f2c" mono />
        <ArrowDownRight className="transfer-arrow" size={20} />
        <DataPair label="Hot Wallet" value="0x8d6a...e1a7" mono />
      </div>
      <div className="hero-metrics">
        <DataPair label="Amount Reaching" value="₹38,60,000" />
        <DataPair label="Taint Share" value="78%" />
      </div>
      <button className="accordion-head" onClick={onWhy}>
        <span>
          <CircleHelp size={15} /> Why?
        </span>
        <ChevronDown size={15} className={whyOpen ? "rotate" : ""} />
      </button>
      {whyOpen && (
        <div className="evidence-list">
          <div className="evidence-labels">
            <span>Evidence</span>
            <span>Description</span>
            <span>Weight</span>
          </div>
          {evidenceRows.map((row) => (
            <div className="evidence-row" key={row.title}>
              <span className="evidence-icon">
                <row.icon size={12} />
              </span>
              <strong>{row.title}</strong>
              <span className="evidence-desc">{row.description}</span>
              <span className="evidence-bar">
                <i
                  style={{
                    width: `${row.value}%`,
                    background: `linear-gradient(90deg, #56bda0, ${row.color})`,
                  }}
                />
              </span>
              <b>{row.value}%</b>
            </div>
          ))}
        </div>
      )}
      <div className="alternatives">
        <div className="subhead">
          <span>Alternative VASPs</span>
          <button className="text-button">
            View all <ChevronRight size={13} />
          </button>
        </div>
        {[
          ["CoinSwitch", "41%", Globe2],
          ["WazirX", "28%", Zap],
          ["Binance", "12%", Gem],
        ].map(([name, value, Icon]) => (
          <div className="alternative-row" key={String(name)}>
            <span className="alt-icon">
              <Icon size={13} />
            </span>
            <strong>{String(name)}</strong>
            <span>Confidence {String(value)}</span>
            <div className="alt-meter">
              <i style={{ width: String(value) }} />
            </div>
          </div>
        ))}
        <div className="attribution-actions">
          <button className="key-button ok-key">
            <Check size={14} /> Confirm attribution
          </button>
          <button className="key-button danger-key">
            <X size={14} /> Reject attribution
          </button>
        </div>
        <span className="feedback">
          <RefreshCcw size={11} /> Feedback loop: POST /labels/feedback
        </span>
      </div>
    </section>
  );
}

function DataPair({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="data-pair">
      <span>{label}</span>
      <strong className={mono ? "mono" : ""}>{value}</strong>
    </div>
  );
}

function RiskRing({ value }: { value: number }) {
  return (
    <div
      className="risk-ring"
      style={{ ["--score" as string]: `${value * 3.6}deg` }}
    >
      <strong>{value}</strong>
      <span>Risk Score</span>
    </div>
  );
}

function RiskCard() {
  const factors = [
    ["Multi-chain movement", "28%", 88],
    ["Rapid hops", "22%", 70],
    ["High-risk destination", "18%", 60],
    ["Unusual amount", "14%", 48],
    ["New wallet pattern", "10%", 36],
    ["Others", "8%", 27],
  ];
  return (
    <section className="glass-panel risk-card">
      <div className="card-header">
        <div className="card-title">
          <span className="icon-orb brass-orb">
            <Plus size={17} />
          </span>
          <h2>Risk & Typology</h2>
        </div>
      </div>
      <div className="risk-content">
        <RiskRing value={82} />
        <div className="factor-list">
          <span className="section-label">Risk Factors</span>
          {factors.map(([name, value, width]) => (
            <div className="factor-row" key={String(name)}>
              <span>{String(name)}</span>
              <i>
                <b style={{ width: `${width}%` }} />
              </i>
              <strong>{String(value)}</strong>
            </div>
          ))}
        </div>
      </div>
      <div className="typology">
        <span className="section-label">Typology</span>
        <div className="typology-pill">
          <ShieldAlert size={12} /> Investment Scam
        </div>
        <span className="section-label">Signals</span>
        <div className="signal-list">
          <span>Ponzi scheme</span>
          <span>Mixer usage</span>
          <span>High velocity</span>
          <span>New wallets</span>
        </div>
      </div>
    </section>
  );
}

function Recommendations({
  checked,
  toggleCheck,
}: {
  checked: number[];
  toggleCheck: (index: number) => void;
}) {
  const items = [
    ["Send freeze notice to VASP-X", "82% of funds", "Send notice", Send],
    ["Preserve tx hashes", "", "Copy", Copy],
    ["Add downstream wallet to watchlist", "", "Add", Star],
  ];
  return (
    <section className="glass-panel recommendations">
      <div className="card-header">
        <div className="card-title">
          <span className="icon-orb brass-orb">
            <FolderLock />
          </span>
          <h2>Recommended Actions</h2>
        </div>
      </div>
      {items.map(([title, sub, action, Icon], index) => (
        <div
          className={`recommend-row ${checked.includes(index) ? "done" : ""}`}
          key={String(title)}
        >
          <button
            className={`check-box ${checked.includes(index) ? "checked" : ""}`}
            onClick={() => toggleCheck(index)}
          >
            {checked.includes(index) && <Check size={13} />}
          </button>
          <span className="order">{index + 1}.</span>
          <div>
            <strong>{String(title)}</strong>
            {sub && <small>— {String(sub)}</small>}
          </div>
          <button className="row-action">
            <Icon size={12} /> {String(action)}
          </button>
        </div>
      ))}
    </section>
  );
}

function FreezeCard() {
  return (
    <section className="glass-panel freeze-card critical-panel">
      <div className="card-header">
        <div className="card-title">
          <span className="icon-orb red-orb">
            <FlameIcon />
          </span>
          <h2>Freeze Window</h2>
        </div>
        <span className="status-chip red">
          <TimerReset size={12} /> CLOSING
        </span>
      </div>
      <p>Reason: Funds at high risk of being moved to mixers / exchanges.</p>
      <div className="remaining">
        <span>Remaining funds</span>
        <strong>78%</strong>
      </div>
      <div className="wide-progress">
        <i />
      </div>
      <div className="last-movement">
        <span>Last movement</span>
        <strong>
          <Clock3 size={12} /> 2026-09-28 14:22 (2h ago)
        </strong>
      </div>
    </section>
  );
}

function TaintCard() {
  return (
    <section className="glass-panel taint-card">
      <div className="card-header">
        <div className="card-title">
          <span className="icon-orb brass-orb">
            <Gem size={15} />
          </span>
          <h2>Victim-Fund Taint</h2>
        </div>
        <div className="segmented">
          <button className="active">Haircut</button>
          <button>FIFO</button>
        </div>
      </div>
      <div className="taint-bar">
        <i />
        <i />
        <i />
      </div>
      <div className="taint-legend">
        <span>
          <i className="blue" /> VASPs <b>62%</b>
        </span>
        <span>
          <i className="plum" /> Mixers <b>21%</b>
        </span>
        <span>
          <i className="muted" /> Unresolved <b>17%</b>
        </span>
      </div>
      <span className="section-label breakdown-label">
        Destination breakdown
      </span>
      <div className="breakdown">
        <div className="breakdown-head">
          <span>Destination</span>
          <span>Amount</span>
          <span>% of taint</span>
        </div>
        {[
          ["VASPs", "₹29,98,000", "62%", "blue"],
          ["Mixers", "₹9,66,000", "21%", "plum"],
          ["Unresolved", "₹8,94,000", "17%", "muted"],
        ].map(([name, amount, pct, color]) => (
          <div key={name} className="breakdown-row">
            <span>
              <i className={color} />
              {name}
            </span>
            <strong>{amount}</strong>
            <b>{pct}</b>
          </div>
        ))}
      </div>
    </section>
  );
}

function TimelineCard() {
  return (
    <section className="glass-panel timeline-card">
      <div className="card-header">
        <div className="card-title">
          <span className="icon-orb brass-orb">
            <History size={15} />
          </span>
          <h2>Timeline</h2>
        </div>
        <button className="text-button" aria-label="View all timeline events">
          View all <ChevronRight size={13} />
        </button>
      </div>
      <div className="timeline-list">
        {timeline.map((item, index) => (
          <div className="timeline-row" key={item.date}>
            <span
              className={`timeline-node ${index === timeline.length - 1 ? "complete" : ""}`}
            >
              <item.icon size={12} />
            </span>
            <span className="mono date">{item.date}</span>
            <strong>{item.title}</strong>
            <span className={`status-chip ${item.status.toLowerCase()}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function NotesCard({
  notes,
  note,
  setNote,
  addNote,
}: {
  notes: string[][];
  note: string;
  setNote: (value: string) => void;
  addNote: () => void;
}) {
  return (
    <section className="glass-panel notes-card">
      <div className="card-header">
        <div className="card-title">
          <span className="icon-orb brass-orb">
            <MessageSquareText size={15} />
          </span>
          <h2>Notes</h2>
        </div>
        <button
          className="text-button"
          aria-label="View all investigator notes"
        >
          View all <ChevronRight size={13} />
        </button>
      </div>
      <div className="notes-list">
        {notes.map(([initials, name, time, text]) => (
          <div className="note-row" key={`${name}-${time}`}>
            <span className="avatar note-avatar">{initials}</span>
            <div className="note-body">
              <div>
                <strong>{name}</strong>
                <small>{time}</small>
              </div>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="note-compose">
        <input
          value={note}
          onChange={(event) => setNote(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && addNote()}
          placeholder="Add a note..."
          aria-label="Add a note"
        />
        <button className="key-button brass" onClick={addNote}>
          <Send size={12} /> Add
        </button>
      </div>
    </section>
  );
}

function TransactionsTable() {
  return (
    <section className="glass-panel table-panel">
      <div className="table-toolbar">
        <div className="table-tabs">
          <button className="active">Transactions</button>
          <button>Graph</button>
          <button>Patterns</button>
          <button>Evidence</button>
        </div>
        <button className="filter-button">
          <Filter size={13} /> Filter
        </button>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {[
                "Time",
                "Chain",
                "From",
                "To",
                "Asset",
                "Amount",
                "USD",
                "Tx hash",
                "Taint share",
                "Flags",
              ].map((head) => (
                <th key={head}>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.map((row) => (
              <tr key={row[0]}>
                {row.map((value, index) => (
                  <td
                    key={`${row[0]}-${index}`}
                    className={
                      index === 0 || [2, 3, 7].includes(index) ? "mono" : ""
                    }
                  >
                    {index === 1 ? (
                      <span className={`chain-badge ${value.toLowerCase()}`}>
                        {value === "ETH" ? "◆" : value === "BSC" ? "⬡" : "◉"}{" "}
                        {value}
                      </span>
                    ) : index === 9 ? (
                      <span
                        className={`flag ${value.toLowerCase().replace(" ", "-")}`}
                      >
                        {value}
                      </span>
                    ) : (
                      value
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button>‹</button>
        {["1", "2", "3", "4", "5", "…", "36"].map((page) => (
          <button key={page} className={page === "1" ? "active" : ""}>
            {page}
          </button>
        ))}
        <span>Page 1 of 5</span>
        <button>›</button>
      </div>
    </section>
  );
}

function EvidencePanel() {
  return (
    <section className="glass-panel evidence-panel">
      <div className="card-header">
        <div className="card-title">
          <span className="icon-orb brass-orb">
            <FileCheck2 size={15} />
          </span>
          <h2>Evidence</h2>
        </div>
        <button className="text-button">
          View all <ChevronRight size={13} />
        </button>
      </div>
      <div className="evidence-grid">
        {evidenceCards.map((card) => (
          <div className="evidence-card" key={card.title}>
            <span className="evidence-card-icon">
              <card.icon size={17} />
            </span>
            <div>
              <strong>{card.title}</strong>
              <small>{card.desc}</small>
              <span className="mono hash">Hash: {card.hash}</span>
            </div>
            <span className="verified-mini">
              <Check size={10} /> Verified
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}


function FolderLock() {
  return <Archive size={16} />;
}
function FlameIcon() {
  return <Zap size={15} />;
}

export default Caseworkspace;

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Anybody:wght@400;500;600;700;800&family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
:root{font-family:'Instrument Sans',sans-serif;color:#f1e7d3;background:#17100b;font-synthesis:none;--walnut:#17100b;--plank:#2b1d13;--grain:#4a3323;--seam:#0e0906;--brass:#cfa144;--gold:#f0cd7a;--muted:#b9a98d;--faint:#8a7b63;--teal:#4fb39a;--red:#b93a28;--blue:#7fa0e8;--plum:#a57bd1;--shadow:rgba(8,4,2,.84)}*{box-sizing:border-box}body{margin:0;min-width:1180px;background:#17100b}
.desk-shell{min-height:100vh;position:relative;overflow:hidden;padding:82px 26px 18px;background:linear-gradient(90deg,rgba(8,4,1,.12),rgba(8,4,1,.42)),linear-gradient(120deg,rgba(231,171,73,.1),transparent 33%),url('${backgroundImage}') center top/cover fixed;color:#f1e7d3}.desk-shell:after{content:'';position:fixed;inset:0;pointer-events:none;opacity:.17;background-image:radial-gradient(rgba(255,210,130,.35) .7px,transparent .8px),radial-gradient(rgba(0,0,0,.5) .7px,transparent .8px);background-size:5px 5px,7px 7px;mix-blend-mode:overlay}.lamp-glow{position:fixed;z-index:0;top:-210px;left:-190px;width:760px;height:630px;border-radius:50%;background:radial-gradient(ellipse,rgba(255,214,122,.38),rgba(221,149,50,.12) 42%,transparent 70%);filter:blur(18px);pointer-events:none}.wood-grain{position:fixed;z-index:0;inset:0;pointer-events:none;opacity:.07;background:repeating-linear-gradient(168deg,transparent 0 38px,rgba(105,66,32,.55) 39px,transparent 41px 82px)}.global-header,.case-header,.tab-bar,.overview-grid,.bottom-grid,.desk-footer,.trace-error,.job-progress{position:relative;z-index:1}.global-header{height:58px;display:flex;align-items:center;gap:28px;border-bottom:1px solid rgba(207,161,68,.36)}.brand-lockup{display:flex;align-items:center;gap:9px;min-width:238px;font-family:Anybody;font-size:22px;font-weight:600;letter-spacing:-.6px;text-shadow:0 0 14px rgba(240,205,122,.5)}.brand-mark{color:var(--gold);width:29px;height:24px}.brand-mark svg{width:100%;height:100%}.carved-search{height:34px;max-width:380px;flex:1;display:flex;align-items:center;gap:9px;padding:0 11px;color:var(--gold);background:linear-gradient(#110b07,#21140c);border:1px solid #75531b;box-shadow:inset 0 2px 7px #050302,0 2px 0 #5c4213;border-radius:7px}.carved-search:focus-within{outline:1px solid var(--gold);box-shadow:inset 0 2px 7px #050302,0 0 12px rgba(207,161,68,.25)}.carved-search input{background:none;border:0;outline:0;width:100%;font:12px 'Instrument Sans';color:var(--parchment)}.carved-search input::placeholder{color:#99896f}.carved-search kbd{font:10px 'JetBrains Mono';padding:3px 5px;border:1px solid #71521d;border-radius:3px;color:#b9a98d;white-space:nowrap}.header-actions{margin-left:auto;display:flex;align-items:center;gap:7px}.trace-chip,.icon-button{border:1px solid #5e4518;background:linear-gradient(#26170e,#160c07);color:#d5c4a5;height:31px;border-radius:5px;font:10px 'Instrument Sans';display:flex;align-items:center;gap:6px;padding:0 9px;box-shadow:0 2px 0 #0e0906;white-space:nowrap}.trace-chip svg{color:var(--gold)}.trace-chip.ok{border-color:#147c66;color:#61d2b4;background:linear-gradient(#123a31,#0c211c)}.trace-chip.ok svg{color:#4ff2cb}.trace-chip.active{border-color:var(--gold)}.trace-chip.danger{color:#e27662}.trace-chip.danger svg{color:#f34836}.trace-chip small{color:#e4553f;font-size:9px;display:flex;align-items:center;gap:3px}.trace-chip em{font:9px 'JetBrains Mono';color:#b9a98d}.mini-progress{width:39px;height:4px;background:#302c1e;border-radius:8px}.mini-progress i{display:block;width:68%;height:100%;background:#e3cc71;border-radius:8px}.icon-button{width:34px;justify-content:center;padding:0;position:relative}.notification-dot{position:absolute;top:5px;right:7px;width:5px;height:5px;border-radius:50%;background:#e4553f;box-shadow:0 0 8px #e4553f}.investigator{display:flex;align-items:center;gap:7px;padding-left:6px;font-size:11px}.investigator strong,.investigator small{display:block}.investigator small{color:#a6967d;font-size:9px;margin-top:2px}.avatar{width:31px;height:31px;display:inline-flex;align-items:center;justify-content:center;border-radius:50%;font-family:Anybody;font-weight:700;font-size:13px;color:#1c120a;background:#d7a94c;border:1px solid #f0cd7a;box-shadow:0 0 10px rgba(240,205,122,.18)}.avatar.cream{background:#fae7b0}.avatar.small{width:25px;height:25px;border-color:#a7926f;background:#32261a;color:#f1e7d3}.glass-panel{min-width:0;background:linear-gradient(135deg,rgba(37,26,17,.9),rgba(12,10,8,.84));border:1px solid rgba(181,130,40,.73);box-shadow:inset 0 1px 0 rgba(240,205,122,.3),0 5px 0 rgba(12,7,3,.88),0 9px 22px rgba(8,4,2,.45);border-radius:9px;backdrop-filter:blur(14px)}.case-header{min-height:70px;margin-top:4px;display:flex;align-items:center;padding:8px 13px 8px 20px;gap:23px}.case-identity{flex:0 1 205px;min-width:165px;overflow:hidden;border-right:1px solid rgba(207,161,68,.44);height:50px}.eyebrow,.header-field>span,.freeze-summary>span,.data-pair>span,.section-label,.evidence-labels,.table-panel th{font-size:14px;text-transform:uppercase;color:#aa9675;letter-spacing:.45px}.case-identity h1{font:700 20px Anybody;margin:3px 0 3px;letter-spacing:-.8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.case-id{font-size:11px;color:#efe0be;display:flex;align-items:center;gap:6px}.mono{font-family:'JetBrains Mono',monospace}.header-field{display:flex;flex-direction:column;gap:7px;min-width:80px}.header-field.assigned{min-width:128px}.header-field.loss{min-width:88px}.header-field strong{font:600 13px 'JetBrains Mono';color:#e9ddc3}.select-key,.assigned-value{height:27px;color:#74e0c2;background:linear-gradient(#123a31,#0c211c);border:1px solid #089276;border-radius:6px;padding:0 8px;display:flex;align-items:center;gap:10px;font:11px 'Instrument Sans';box-shadow:0 2px 0 #063f34}.assigned-value{border:0;padding:0;background:none;color:#f0e2c6;box-shadow:none;white-space:nowrap}.risk-summary{display:flex;align-items:center;flex-direction:column;gap:1px;padding-left:4px;font-size:9px;color:#c4b18f}.risk-summary .risk-ring{width:46px;height:46px}.risk-summary .risk-ring strong{font-size:17px}.risk-summary .risk-ring span{display:none}.freeze-summary{display:flex;flex-direction:column;gap:7px;min-width:82px}.status-pill{display:flex;align-items:center;gap:5px;width:max-content;border:1px solid;border-radius:6px;height:27px;padding:0 8px;font:10px 'JetBrains Mono';background:#2c130c}.status-pill.closing{color:#ff765a;border-color:#d4472d;box-shadow:0 0 9px rgba(228,85,63,.4),inset 0 1px rgba(255,181,82,.35)}.case-actions{display:flex;gap:8px;margin-left:auto}.key-button{display:flex;align-items:center;justify-content:center;gap:7px;min-height:34px;border-radius:7px;padding:0 10px;background:linear-gradient(#332719,#1a110b);border:1px solid #76561f;color:#eadbbd;font:10px 'Instrument Sans';box-shadow:0 3px 0 #0d0805,0 5px 9px rgba(8,4,2,.5),inset 0 1px rgba(240,205,122,.16);transition:transform .15s cubic-bezier(.16,1,.3,1),filter .15s}.key-button:hover{transform:translateY(-2px);filter:brightness(1.15)}.key-button:active{transform:translateY(2px);box-shadow:0 1px 0 #0d0805}.key-button.brass{background:linear-gradient(#f0cd7a,#cfa144,#b8892f);border-color:#f4d98d;color:#211609;box-shadow:0 4px 0 #5c4213,0 7px 13px rgba(8,4,2,.53),inset 0 1px rgba(255,245,190,.75)}.key-button.brass small{display:block;font-size:8px;text-align:left;opacity:.7}.key-button.compact{padding:0 9px}.tab-bar{height:38px;display:flex;align-items:end;padding:0 3px;border-bottom:1px solid rgba(207,161,68,.7);margin-bottom:10px}.tab-bar button{height:34px;min-width:120px;border:0;border-right:1px solid rgba(207,161,68,.37);background:rgba(15,9,5,.55);color:#b8aa91;font:11px 'Instrument Sans';cursor:pointer;position:relative}.tab-bar button.active{color:#21150a;background:linear-gradient(#f0cd7a,#bd8d34);border-radius:7px 7px 4px 4px;box-shadow:0 -2px 0 #5c4213,inset 0 1px rgba(255,245,190,.86),0 0 16px rgba(207,161,68,.32);font-weight:700}.overview-grid{display:grid;grid-template-columns:2.06fr 1fr .96fr;gap:9px}.left-column,.middle-column,.right-column{display:flex;flex-direction:column;gap:9px}.card-header{display:flex;align-items:center;justify-content:space-between;min-height:31px}.card-title{display:flex;align-items:center;gap:7px}.card-title h2{font:600 15px Anybody;letter-spacing:.1px;margin:0;white-space:nowrap}.icon-orb{width:22px;height:22px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;border:1px solid}.teal-orb{color:#4ff2cb;border-color:#2cae90;background:rgba(22,139,110,.19);box-shadow:0 0 9px rgba(79,179,154,.28)}.brass-orb{color:#f0cd7a;border-color:#a87924;background:rgba(207,161,68,.16)}.red-orb{color:#f36d54;border-color:#b83a29;background:rgba(185,58,40,.22)}.hero-card{min-height:397px;padding:9px 12px 9px}.verified-stamp{font:10px 'JetBrains Mono';color:#43edbe;border:1px solid #21be97;padding:5px 7px;transform:rotate(-5deg);border-radius:3px;box-shadow:0 0 10px rgba(79,179,154,.2)}.vasp-summary{display:grid;grid-template-columns:minmax(122px,1.15fr) minmax(116px,1.38fr) minmax(24px,.45fr) minmax(108px,1.16fr) 17px minmax(108px,1.2fr);align-items:center;gap:9px;border:1px solid rgba(207,161,68,.28);border-radius:7px;padding:9px 10px;background:linear-gradient(110deg,rgba(57,40,25,.57),rgba(14,11,8,.52));min-height:62px}.vasp-brand{display:flex;align-items:center;gap:9px}.exchange-logo{width:35px;height:35px;display:flex;align-items:center;justify-content:center;border-radius:8px;color:#bfe6ff;background:linear-gradient(145deg,#3c74ef,#1140ae);box-shadow:inset 0 1px rgba(255,255,255,.3),0 3px 8px rgba(0,0,0,.4)}.vasp-brand strong,.vasp-brand small{display:block}.vasp-brand strong{font:600 13px Anybody}.vasp-brand small{font-size:9px;color:#aa9a81;margin-top:3px}.meter-block{display:grid;grid-template-columns:1fr 27px;align-items:center;column-gap:6px}.meter-block>span{grid-column:1/-1;color:#b9a98d;font-size:9px;margin-bottom:5px}.confidence-meter,.alt-meter{height:8px;border-radius:5px;background:#151714;border:1px solid #3c4138;box-shadow:inset 0 2px 4px #090907}.confidence-meter i{display:block;height:100%;width:92%;border-radius:5px;background:linear-gradient(90deg,#4fb39a,#c3ed87,#f0cd7a);box-shadow:0 0 7px #7ce4a5}.meter-block b{font:10px 'JetBrains Mono';color:#d6e8c4}.data-pair{min-width:0}.data-pair>span,.data-pair>strong{display:block}.data-pair>strong{font:14px 'Instrument Sans';
    margin-top:4px;color:#ece0c8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.data-pair>strong.mono{font-size:9px;color:#b3e0e1}.transfer-arrow{color:#d8b762;filter:drop-shadow(0 0 4px rgba(240,205,122,.6))}.hero-metrics{display:grid;grid-template-columns:1fr 1fr;padding:7px 10px;border:1px solid rgba(207,161,68,.25);border-top:0;border-radius:0 0 7px 7px;margin-top:-3px}.hero-metrics .data-pair:first-child{border-right:1px solid rgba(207,161,68,.25)}.hero-metrics .data-pair+ .data-pair{padding-left:13px}.hero-metrics .data-pair>strong{font-family:'JetBrains Mono';font-size:12px}.accordion-head{width:100%;height:29px;margin-top:7px;border:0;border-top:1px solid rgba(207,161,68,.34);border-bottom:1px solid rgba(207,161,68,.27);background:rgba(8,5,3,.4);color:#d8c8a9;display:flex;justify-content:space-between;align-items:center;font:10px 'Instrument Sans';cursor:pointer}.accordion-head span{display:flex;gap:7px;align-items:center}.accordion-head svg.rotate{transform:rotate(180deg)}.evidence-list{padding:0 2px}.evidence-labels,.evidence-row{display:grid;grid-template-columns:1.08fr 2.18fr 1.12fr 36px;align-items:center;column-gap:8px}.evidence-labels{grid-template-columns:1.08fr 2.18fr 1.12fr 36px;padding:6px 5px 4px}.evidence-row{grid-template-columns:16px 1fr 2.2fr 1.1fr 30px;padding:5px 4px;border-bottom:1px solid rgba(207,161,68,.13);font-size:12px}.evidence-row strong{font-weight:500;color:#d9cbb2}.evidence-desc{color:#b2a58c;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.evidence-icon{width:16px;height:16px;display:flex;align-items:center;justify-content:center;color:#55cbbb;border:1px solid #267e72;border-radius:50%}.evidence-bar,.factor-row i{height:8px;background:#242923;border:1px solid #404434;border-radius:4px;overflow:hidden;box-shadow:inset 0 2px 4px #080908}.evidence-bar i,.factor-row i b{display:block;height:100%;border-radius:4px}.evidence-row>b{font:12px 'JetBrains Mono';text-align:right;color:#cabd9e}.alternatives{padding-top:5px}.subhead{display:flex;justify-content:space-between;align-items:center;font:600 10px Anybody;color:#e8d9bb;margin-bottom:4px}.text-button{display:inline-flex;align-items:center;gap:3px;border:0;background:none;color:#ad9b7a;font:9px 'Instrument Sans';cursor:pointer}.alternative-row{height:21px;display:grid;grid-template-columns:20px minmax(58px,1fr) minmax(78px,1fr) minmax(58px,1.15fr);align-items:center;gap:6px;font-size:9px;border-bottom:1px solid rgba(207,161,68,.12);min-width:0}.alternative-row strong,.alternative-row>span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.alt-icon{width:17px;height:17px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#d9bf68;background:#1c3152;border:1px solid #5c8dd5}.alternative-row:nth-child(3) .alt-icon{background:#27355f}.alternative-row:nth-child(4) .alt-icon{background:#453616;color:#f0cd7a}.alternative-row>span{color:#d3c4a9}.alt-meter{height:7px}.alt-meter i{display:block;height:100%;background:linear-gradient(90deg,#6cb5e5,#8c8c84);border-radius:4px}.alternative-row:nth-child(3) .alt-meter i,.alternative-row:nth-child(4) .alt-meter i{background:#d94f51}.attribution-actions{display:flex;gap:8px;margin-top:7px}.ok-key{color:#c1f7d0;border-color:#148f70;background:linear-gradient(#20624e,#123b31);box-shadow:0 3px 0 #07382e}.danger-key{color:#ffd1c6;border-color:#9e2d22;background:linear-gradient(#6f291e,#3a160f);box-shadow:0 3px 0 #210c08}.feedback{display:flex;justify-content:flex-end;align-items:center;gap:4px;color:#a6977e;font:9px 'JetBrains Mono';margin-top:5px}.risk-card{padding:9px 12px;min-height:254px}.risk-content{display:grid;grid-template-columns:98px 1fr;gap:17px;align-items:center;padding-top:4px}.risk-ring{position:relative;width:92px;height:92px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-direction:column;background:radial-gradient(circle at center,#22170d 0 57%,transparent 58%),conic-gradient(from -116deg,#4fb39a 0 31%,#cfa144 31% 63%,#b93a28 63% 82%,#27231b 82% 100%);box-shadow:0 0 12px rgba(207,161,68,.2),inset 0 0 0 2px #1a120b}.risk-ring:after{content:'';position:absolute;inset:7px;border-radius:50%;border:1px solid rgba(240,205,122,.28);transform:rotate(var(--score))}.risk-ring strong{font:700 23px Anybody;z-index:1}.risk-ring span{font-size:9px;color:#c6b38f;z-index:1}.factor-list{display:flex;flex-direction:column;gap:6px}.section-label{display:block;margin-bottom:5px}.factor-row{display:grid;grid-template-columns:1fr 1.25fr 23px;align-items:center;gap:7px;font-size:12px;color:#c9baa0}.factor-row i{height:7px}.factor-row i b{background:linear-gradient(90deg,#4fb39a,#ed554d);box-shadow:0 0 6px rgba(229,85,63,.42)}.factor-row strong{font:9px 'JetBrains Mono';text-align:right}.typology{padding-top:5px}.typology-pill{display:inline-flex;align-items:center;gap:5px;background:#482078;color:#e1c6ff;border:1px solid #9f50d8;border-radius:11px;padding:4px 8px;font-size:9px;margin-bottom:9px}.signal-list{display:flex;gap:5px;flex-wrap:wrap}.signal-list span{font-size:9px;color:#bed0d2;border:1px solid #45636b;border-radius:9px;padding:4px 8px;background:rgba(21,47,51,.4)}.recommendations{padding:9px 12px;min-height:143px}.recommend-row{display:grid;grid-template-columns:17px 12px 1fr auto;align-items:center;gap:6px;min-height:30px;border-top:1px solid rgba(207,161,68,.16);font-size:9px}.recommend-row>div{display:flex;align-items:baseline;gap:4px}.recommend-row strong{font-weight:500}.recommend-row small{color:#8bc4a5}.recommend-row.done strong{text-decoration:line-through;text-decoration-color:#5aca94}.check-box{width:15px;height:15px;display:flex;align-items:center;justify-content:center;padding:0;background:#111614;border:1px solid #869aa0;border-radius:3px;color:#0d271e;cursor:pointer}.check-box.checked{background:#73dda0;border-color:#99f1b5}.order{color:#b9a98d;font:9px 'JetBrains Mono'}.row-action{display:flex;align-items:center;gap:4px;border:1px solid #98702a;background:linear-gradient(#deb85b,#a5741f);color:#261909;border-radius:5px;height:22px;padding:0 7px;font-size:9px}.right-column .glass-panel{padding:9px 12px}.freeze-card{min-height:128px}.critical-panel{border-color:#d25129;box-shadow:inset 0 1px 0 rgba(255,187,95,.4),0 0 13px rgba(185,58,40,.2),0 5px 0 rgba(12,7,3,.88)}.card-header p{margin:0}.status-chip{font-size:9px;padding:3px 6px;border-radius:5px;border:1px solid;color:#d9c9a9}.status-chip.red{color:#ff8c6d;border-color:#a93425}.freeze-card p{font-size:13px;line-height:1.35;color:#d0c1a8;max-width:290px;margin:4px 0 8px}.remaining,.last-movement{display:flex;justify-content:space-between;align-items:center;font-size:12px;color:#c7b89b}.remaining strong{font:10px 'JetBrains Mono'}.wide-progress{height:7px;border:1px solid #6e4f1c;border-radius:5px;background:#241a0f;margin:5px 0 9px;overflow:hidden}.wide-progress i{display:block;width:78%;height:100%;background:linear-gradient(90deg,#cfa144,#f0cd7a,#e4553f);box-shadow:0 0 8px rgba(240,205,122,.4)}.last-movement{border-top:1px solid rgba(207,161,68,.25);padding-top:7px}.last-movement strong{font:9px 'JetBrains Mono';color:#e3d0a4;display:flex;gap:5px}.taint-card{min-height:222px}.segmented{display:flex;border:1px solid #8d6928;border-radius:5px;overflow:hidden}.segmented button{height:22px;min-width:54px;border:0;border-right:1px solid #574316;background:#1c120b;color:#ad9d82;font:9px 'Instrument Sans'}.segmented button:last-child{border:0}.segmented button.active{color:#2b1a09;background:linear-gradient(#f0cd7a,#b58429)}.taint-bar{height:12px;border-radius:7px;overflow:hidden;display:flex;background:#221915;border:1px solid #6f521e;margin:9px 0 6px}.taint-bar i:nth-child(1){width:62%;background:#36bde1}.taint-bar i:nth-child(2){width:21%;background:#8d53d9}.taint-bar i:nth-child(3){width:17%;background:#8a847d}.taint-legend{display:flex;justify-content:space-between;font-size:9px;color:#d5c5a9}.taint-legend span{display:flex;gap:4px;align-items:center}.taint-legend i,.breakdown-row i{width:8px;height:8px;border-radius:2px;display:inline-block}.blue{background:#36bde1}.plum{background:#8d53d9}.muted{background:#8a847d}.taint-legend b{font:9px 'JetBrains Mono';color:#ebe0c7}.breakdown-label{margin-top:12px}.breakdown{border-top:1px solid rgba(207,161,68,.26)}.breakdown-head,.breakdown-row{display:grid;grid-template-columns:1.4fr 1fr .55fr;gap:7px;align-items:center}.breakdown-head{padding:6px 0 4px;color:#8c7d65;font-size:9px}.breakdown-row{height:25px;border-top:1px solid rgba(207,161,68,.12);font-size:9px}.breakdown-row span{display:flex;gap:6px;align-items:center}.breakdown-row strong,.breakdown-row b{font:9px 'JetBrains Mono';color:#e0d3b8}.lower-split{display:grid;grid-template-columns:minmax(0,1.38fr) minmax(0,1fr);gap:9px}.timeline-card,.notes-card{min-height:163px;padding:8px 10px;overflow:hidden}.timeline-list{position:relative;margin-top:3px}.timeline-list:before{content:'';position:absolute;left:13px;top:8px;bottom:7px;width:1px;background:linear-gradient(#f0cd7a,#8d6a29,transparent)}.timeline-row{height:32px;display:grid;grid-template-columns:27px minmax(82px,92px) minmax(0,1fr) auto;gap:6px;align-items:center;font-size:9px;position:relative;min-width:0}.timeline-node{width:17px;height:17px;border-radius:50%;border:1px solid #cfa144;background:#20130b;color:#f0cd7a;display:flex;align-items:center;justify-content:center;z-index:1;box-shadow:0 0 0 3px rgba(23,16,11,.7)}.timeline-node.complete{color:#4ff2cb;border-color:#4ff2cb;box-shadow:0 0 8px rgba(79,179,154,.6),0 0 0 3px rgba(23,16,11,.7)}.timeline-row strong{font-weight:500;color:#ddcfb3;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.date{font-size:8px;color:#ae9d80;white-space:nowrap}.status-chip.created,.status-chip.completed{color:#37d0ac;border-color:#147b68;background:rgba(18,112,91,.22)}.status-chip.attribution{color:#e3a53f;border-color:#9c631b;background:rgba(128,79,13,.25)}.status-chip.tracing{color:#e9c957;border-color:#866a25;background:rgba(112,83,12,.22)}.notes-list{height:102px;overflow:hidden}.note-row{display:flex;gap:8px;padding:5px 0;border-bottom:1px solid rgba(207,161,68,.15);min-width:0}.note-avatar{width:23px;height:23px;min-width:23px;font-size:9px;background:#4f5048;border-color:#7b7d6c;color:#f1e7d3}.note-body{min-width:0;flex:1}.note-row .note-body>div{display:flex;gap:8px;align-items:baseline;min-width:0}.note-row strong{font-size:9px;white-space:nowrap}.note-row small{font:8px 'JetBrains Mono';color:#9b8c73;white-space:nowrap}.note-row p{margin:2px 0 0;color:#bfb19a;font-size:8px;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.note-compose{display:flex;gap:8px;padding-top:7px}.note-compose input{flex:1;min-width:0;background:#120c07;border:1px solid #624719;box-shadow:inset 0 2px 5px #050302,0 2px 0 #4c3512;border-radius:5px;padding:0 8px;color:#e9ddc3;outline:none;font-size:9px}.note-compose input:focus{border-color:#eaca6e}.note-compose .key-button{min-height:24px;padding:0 9px}.bottom-grid{display:grid;grid-template-columns:2.06fr 1fr;gap:9px;margin-top:9px}.table-panel{min-height:184px;overflow:hidden}.table-toolbar{height:31px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(207,161,68,.3);padding:0 8px}.table-tabs{display:flex;height:100%}.table-tabs button{border:0;border-right:1px solid rgba(207,161,68,.26);padding:0 17px;background:rgba(9,7,5,.35);color:#b7a789;font:10px 'Instrument Sans'}.table-tabs button:first-child{border-radius:5px 0 0 0}.table-tabs button.active{color:#1d1309;background:linear-gradient(#e7be67,#b58429);font-weight:600}.filter-button{background:none;border:0;color:#ad9c7f;display:flex;align-items:center;gap:5px;font:9px 'Instrument Sans'}.table-wrap{overflow:hidden}.table-panel table{width:100%;border-collapse:collapse;table-layout:auto}.table-panel th{text-align:left;height:26px;padding:0 8px;white-space:nowrap;font-weight:400}.table-panel td{height:27px;padding:0 8px;white-space:nowrap;border-top:1px solid rgba(207,161,68,.13);font-size:9px;color:#d1c2a7}.table-panel tbody tr:hover{background:rgba(207,161,68,.09);box-shadow:inset 0 0 12px rgba(207,161,68,.07)}.table-panel td.mono{font:8px 'JetBrains Mono';color:#a8d4dc}.chain-badge{display:inline-flex;align-items:center;gap:4px;color:#c4d7df}.chain-badge.eth{color:#8ad4ff}.chain-badge.bsc{color:#f4c65e}.chain-badge.tron{color:#fb6e65}.flag{display:inline-flex;align-items:center;gap:4px}.flag:before{content:'';width:6px;height:6px;border-radius:50%;background:#8b98a0}.flag.high-risk{color:#fa7e6b}.flag.high-risk:before{background:#ee4c58;box-shadow:0 0 6px #ee4c58}.flag.mixer{color:#cc8bde}.flag.mixer:before{background:#a757d0}.flag.hops{color:#e8bf62}.flag.hops:before{background:#e8bf62}.pagination{display:flex;align-items:center;justify-content:flex-end;gap:4px;padding:7px 9px;border-top:1px solid rgba(207,161,68,.23)}.pagination button{width:22px;height:20px;border:1px solid #604619;background:#1d120a;color:#b9a98d;border-radius:3px;font:9px 'JetBrains Mono'}.pagination button.active{color:#24180a;background:#d3a74c;border-color:#f0cd7a}.pagination span{font:9px 'JetBrains Mono';color:#95866e;margin-left:8px}.evidence-panel{min-height:184px;padding:8px 10px}.evidence-grid{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:4px}.evidence-card{min-height:60px;border:1px solid rgba(207,161,68,.3);background:linear-gradient(135deg,rgba(37,31,23,.66),rgba(11,12,10,.72));border-radius:6px;padding:8px;display:grid;grid-template-columns:30px 1fr auto;gap:7px;align-items:start;position:relative}.evidence-card-icon{width:29px;height:29px;display:flex;align-items:center;justify-content:center;color:#8ec6f5;border:1px solid #326b98;background:#152d41;border-radius:6px}.evidence-card strong,.evidence-card small,.evidence-card .hash{display:block}.evidence-card strong{font:600 9px Anybody}.evidence-card small{font-size:8px;color:#a9a18c;margin-top:2px}.hash{font-size:8px;color:#8ea9b0;margin-top:3px}.verified-mini{display:flex;align-items:center;gap:2px;border:1px solid #13836d;color:#4ce2bf;border-radius:4px;padding:3px 4px;font:8px 'JetBrains Mono'}.desk-footer{height:22px;display:flex;justify-content:space-between;align-items:end;color:#84755e;font:9px 'JetBrains Mono';padding:6px 3px 0}.desk-footer span{display:flex;align-items:center;gap:4px}.desk-footer svg{color:#cfa144}.sync-dot{width:6px;height:6px;border-radius:50%;background:#4fb39a;box-shadow:0 0 6px #4fb39a}.toggle{width:22px;height:11px;border-radius:7px;background:#57461e;display:inline-flex;padding:2px}.toggle i{width:7px;height:7px;border-radius:50%;background:#f0cd7a}.toggle.on{background:#267762;justify-content:flex-end}.trace-error,.job-progress{margin:9px 0;padding:10px 13px;display:flex;align-items:center;gap:11px;border-color:#b94531}.trace-error>svg{color:#f1684e}.trace-error>div,.job-progress>div:first-of-type{display:flex;flex-direction:column;gap:2px}.trace-error strong,.job-progress strong{font:600 12px Anybody}.trace-error span,.job-progress span{font-size:10px;color:#b9a98d}.trace-error .key-button{margin-left:auto}.job-progress{border-color:#a8802c}.job-progress>div:first-of-type svg{color:#f0cd7a}.job-track{height:8px;flex:1;border:1px solid #6f501b;border-radius:6px;background:#18100a;overflow:hidden;margin-left:auto;max-width:340px}.job-track i{display:block;width:68%;height:100%;background:linear-gradient(90deg,#4fb39a,#f0cd7a);box-shadow:0 0 8px #f0cd7a}.job-track span{float:right;transform:translateY(-13px);font:9px 'JetBrains Mono';color:#f0cd7a;margin-right:4px}.copilot-drawer{position:fixed;z-index:5;right:0;top:0;width:430px;height:100vh;padding:18px;background:linear-gradient(145deg,rgba(44,31,20,.98),rgba(11,9,8,.98));border-left:1px solid #c18d32;box-shadow:-15px 0 35px rgba(5,2,1,.75),inset 1px 0 rgba(240,205,122,.3);display:flex;flex-direction:column;animation:drawer-in .35s cubic-bezier(.16,1,.3,1)}@keyframes drawer-in{from{transform:translateX(100%)}to{transform:translateX(0)}}.drawer-top{display:flex;align-items:center;justify-content:space-between;padding-bottom:14px;border-bottom:1px solid rgba(207,161,68,.35)}.drawer-top>div{display:grid;grid-template-columns:26px 1fr;column-gap:7px}.drawer-top svg{grid-row:span 2;color:#f0cd7a}.drawer-top strong{font:600 15px Anybody}.drawer-top small{color:#a7977d;font-size:9px}.copilot-summary{display:flex;gap:8px;padding:12px;border:1px solid #675022;background:#21150b;margin:14px 0;color:#f0cd7a;border-radius:7px}.copilot-summary span{font-size:10px;color:#d6c5a4}.copilot-summary b,.copilot-summary small{display:block;color:#f1e7d3}.copilot-summary small{color:#4fcba8;margin-top:4px;font-size:9px}.chat-stream{flex:1;overflow:auto;display:flex;flex-direction:column;gap:12px;padding:4px 2px}.chat-message{max-width:85%;padding:10px 11px;border:1px solid #5b431b;border-radius:8px;font-size:11px;line-height:1.45;color:#dacbb0;position:relative}.chat-message small{display:block;color:#887960;font:8px 'JetBrains Mono';margin-top:6px}.chat-message.bot{background:rgba(37,26,16,.85);align-self:flex-start}.chat-message.user{background:rgba(40,76,63,.58);border-color:#297863;align-self:flex-end}.stream-caret{display:inline-block;width:5px;height:12px;background:#f0cd7a;margin-left:3px;vertical-align:-2px;animation:blink 1s infinite}@keyframes blink{50%{opacity:.3}}.copilot-compose{border:1px solid #73521e;background:#110b07;box-shadow:inset 0 2px 7px #050302,0 2px 0 #4c3512;border-radius:7px;padding:9px;margin-top:12px}.copilot-compose textarea{width:100%;height:44px;resize:none;background:none;border:0;outline:0;color:#ede0c5;font:11px 'Instrument Sans'}.copilot-compose textarea::placeholder{color:#8e7c61}.copilot-compose>div{display:flex;align-items:center;justify-content:space-between}.language-chip{border:0;background:none;color:#b9a98d;font:9px 'Instrument Sans'}.send-key{width:28px;height:24px;display:flex;align-items:center;justify-content:center;border-radius:5px;border:1px solid #f0cd7a;background:linear-gradient(#f0cd7a,#b8892f);color:#1e1308;box-shadow:0 2px 0 #5c4213}@media(max-width:1350px){.desk-shell{padding:0 16px}.global-header{gap:15px}.brand-lockup{min-width:190px}.case-header{gap:13px}.case-actions{gap:5px}.key-button{padding:0 7px}.vasp-summary{grid-template-columns:1fr 1.2fr .4fr 1fr 14px 1.1fr}.table-panel td,.table-panel th{padding:0 5px}}
@media(prefers-reduced-motion:reduce){*,*:before,*:after{animation-duration:.01ms!important;transition-duration:.01ms!important}.key-button:hover{transform:none}}
`;

const styleElement = document.createElement("style");
styleElement.textContent = styles;
if (!document.head.querySelector("style[data-chainnetra]")) {
  styleElement.setAttribute("data-chainnetra", "true");
  document.head.appendChild(styleElement);
}
