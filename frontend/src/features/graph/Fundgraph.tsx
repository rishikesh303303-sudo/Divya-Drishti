import { useState, useEffect, useMemo } from 'react';
import backgroundImage from "../../assets/background.png";
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  Building2,
  ChevronDown,
  ChevronUp,
  CircleDollarSign,
  CircleHelp,
  Eye,
  ExternalLink,
  FileText,
  Filter,
  GripVertical,
  Layers3,
  Pause,
  Play,
  Search,
  ShieldAlert,
  SlidersHorizontal,
  Sparkles,
  StepBack,
  StepForward,
  UserRound,
  WalletCards,
  X,
} from 'lucide-react';

const styles = `
:root { font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #eadfc8; background: #160d07; font-synthesis: none; }
* { box-sizing: border-box; }
body { margin: 0; min-width: 1180px; background: #160d07; }
button, input { font: inherit; }
button { cursor: pointer; }
.desk-shell { min-height: 100vh; position: relative; overflow: hidden; padding: 18px 2.1vw 20px;
  background: url(${backgroundImage}) center center / cover no-repeat, radial-gradient(ellipse at 12% 0%, rgba(212,157,49,.24), transparent 27%), radial-gradient(ellipse at 93% 80%, rgba(92,43,13,.35), transparent 35%), #181009;
}
.desk-shell:after { content:""; position:absolute; inset:0; pointer-events:none; opacity:.32; background: linear-gradient(90deg, rgba(0,0,0,.55) 0 3%, rgba(0,0,0,.35) 50%, rgba(0,0,0,.55) 100%); mix-blend-mode:multiply; }
.lamp-glow { position:absolute; width:750px; height:520px; left:-180px; top:-180px; background:radial-gradient(ellipse, rgba(255,209,106,.18), transparent 67%); filter:blur(3px); pointer-events:none; }
.desk-grain { position:absolute; inset:0; opacity:.08; pointer-events:none; z-index:1; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E"); mix-blend-mode:soft-light; }
.topbar, .workspace, .replay-bar { position:relative; z-index:2; }
.topbar { height: 72px; display:flex; align-items:center; gap:18px; border-bottom:1px solid rgba(197,151,60,.45); margin-bottom:13px; }
.brand-lockup { display:flex; align-items:center; gap:10px; width:213px; border-right:1px solid rgba(209,171,93,.42); height:50px; padding-right:18px; }
.brand-mark { position:relative; color:#efd27b; width:34px; height:25px; display:flex; align-items:center; justify-content:center; }
.brand-mark span { position:absolute; width:8px; height:8px; border:2px solid #efd27b; border-radius:50%; }
.brand-name { font-family: Georgia, serif; color:#f2e3c1; font-size:20px; white-space:nowrap; }
.title-block { min-width:350px; flex:1; }
.title-block h1 { margin:0; color:#efe0c0; font-family:Georgia, serif; font-size:25px; font-weight:500; letter-spacing:-.02em; text-shadow:0 2px 12px rgba(236,177,57,.15); }
.title-block p { margin:3px 0 0; color:#a9997d; font-size:11px; letter-spacing:.01em; }
.top-actions { display:flex; align-items:center; gap:8px; }
.search-slot, .case-chip, .view-switch { height:38px; border:1px solid rgba(214,169,76,.4); border-radius:9px; background:rgba(8,7,5,.74); box-shadow:inset 0 1px rgba(255,255,255,.07), 0 5px 16px rgba(0,0,0,.3); }
.search-slot { width:298px; display:flex; align-items:center; gap:9px; padding:0 12px; color:#d6b96e; transition:border-color .2s, box-shadow .2s; }
.search-slot input { background:none; border:0; outline:0; color:#eee0c5; width:100%; font-size:11px; }
.search-slot input::placeholder { color:#827763; }
.case-chip { color:#dacaa7; padding:0 13px; font-size:11px; display:flex; align-items:center; gap:8px; white-space:nowrap; transition:border-color .2s; }
.case-chip:hover { border-color:#bc8e36; }
.view-switch { display:flex; padding:3px; gap:2px; }
.view-switch button { border:0; color:#9f937d; background:transparent; font-size:11px; padding:0 12px; display:flex; gap:7px; align-items:center; border-radius:6px; }
.view-switch button.active { color:#191108; background:linear-gradient(#f1cf78,#c58e2e); box-shadow:0 1px 6px rgba(224,173,55,.45), inset 0 1px rgba(255,255,255,.45); font-weight:700; }
.workspace { height:calc(100vh - 174px); min-height:560px; display:grid; grid-template-columns:225px minmax(620px,1fr) 270px; gap:10px; }
.panel, .graph-wrap, .replay-bar { border:1px solid rgba(210,162,62,.6); background:linear-gradient(145deg, rgba(27,19,12,.9), rgba(8,8,6,.92)); box-shadow:inset 1px 1px rgba(255,236,184,.11), inset -1px -1px rgba(0,0,0,.7), 0 8px 20px rgba(0,0,0,.36); border-radius:11px; }
.panel { overflow:hidden; }
.panel-heading { height:42px; display:flex; align-items:center; justify-content:space-between; padding:0 13px; border-bottom:1px solid rgba(210,162,62,.35); color:#eadcbf; font-family:Georgia, serif; font-size:15px; }
.panel-heading span { display:flex; align-items:center; gap:8px; }
.panel-heading svg { color:#e4bf5d; }
.icon-button { color:#c7aa6d; background:none; border:0; padding:3px; transition:color .2s; }
.icon-button:hover { color:#f0d282; }
.filter-content, .inspector-content { padding:12px 13px; }
.field-group { padding-bottom:11px; margin-bottom:10px; border-bottom:1px solid rgba(224,193,125,.13); }
.field-label { display:flex; justify-content:space-between; font-size:10px; color:#c7baa0; margin-bottom:7px; }
.field-label strong { color:#f0cc70; font-weight:500; }
.range { appearance:none; width:100%; height:6px; border-radius:8px; background:linear-gradient(90deg,#c79739 0 43%,#454442 43%); outline:0; }
.range::-webkit-slider-thumb { appearance:none; width:12px; height:12px; background:#e7bc5f; border:1px solid #8d681e; border-radius:50%; box-shadow:0 0 0 3px rgba(224,178,59,.14), 0 0 9px rgba(225,188,85,.55); }
.range-labels { display:flex; justify-content:space-between; font-size:9px; color:#b0a187; margin-top:5px; }
.inset-input, .chain-select { border:1px solid rgba(183,151,86,.46); border-radius:7px; background:rgba(4,5,4,.8); box-shadow:inset 0 2px 5px rgba(0,0,0,.65); color:#d9c7a5; }
.inset-input { height:28px; display:flex; align-items:center; padding:0 8px; transition:border-color .2s; }
.inset-input:focus-within { border-color:#e0b65b; }
.inset-input input { color:#e9dec6; background:none; border:0; outline:0; font-size:11px; width:100%; }
.inset-input span { color:#bb9d55; font-size:12px; }
.date-inputs { display:flex; gap:4px; align-items:center; }
.date-inputs input { flex:1; height:28px; border:1px solid rgba(183,151,86,.46); border-radius:7px; background:rgba(4,5,4,.8); box-shadow:inset 0 2px 5px rgba(0,0,0,.65); color:#d9c7a5; font-size:9px; padding:0 6px; outline:0; color-scheme:dark; min-width:0; transition:border-color .2s; }
.date-inputs input:focus { border-color:#e0b65b; }
.date-inputs span { color:#a9997d; font-size:10px; flex:none; }
.chain-select { padding:7px 6px 5px; display:grid; grid-template-columns:1fr 1fr; gap:7px 5px; font-size:9px; }
.chain-pill { display:flex; align-items:center; gap:5px; white-space:nowrap; cursor:pointer; transition:opacity .2s; user-select:none; }
.chain-pill i, .legend-dot { display:inline-block; width:13px; height:13px; border-radius:50%; border:1px solid rgba(255,255,255,.4); }
.chain-pill i:after { content:'✓'; font-style:normal; color:#08100b; font-size:9px; display:flex; justify-content:center; }
.chain-pill.unchecked { opacity:.4; }
.chain-pill.unchecked i { background:transparent; }
.chain-pill.unchecked i:after { content:''; }
.tron i { background:#ca3b2b; }.eth i { background:#4d83de; }.bsc i { background:#e5ab36; }.poly i { background:#8754d7; }.sol i { background:#14f195; }
.more-chain { grid-column:1/-1; color:#d3ad55; border:0; background:none; border-top:1px solid rgba(220,187,101,.16); padding-top:5px; font-size:9px; cursor:pointer; }
.more-chain:hover { color:#f0d282; }
.toggle-list { margin-bottom:9px; }
.toggle-row { width:100%; display:flex; justify-content:space-between; align-items:center; background:none; border:0; color:#c9bda7; font-size:10px; padding:5px 0; text-align:left; transition:color .2s; }
.toggle-row:hover { color:#e6ddc8; }
.toggle { width:25px; height:14px; border-radius:10px; background:#4e4b42; border:1px solid #746b5a; padding:1px; transition:.2s; }.toggle i { display:block; width:10px; height:10px; background:#e9d1a0; border-radius:50%; transition:.2s; }.toggle.on { background:#a87927; box-shadow:0 0 8px rgba(219,178,77,.38); }.toggle.on i { transform:translateX(10px); background:#ffe09a; }
.layout-group { margin-bottom:8px; }.segmented { display:flex; gap:4px; }.segmented button { flex:1; height:26px; border:1px solid rgba(181,145,71,.45); border-radius:7px; color:#a89c85; background:rgba(8,8,7,.58); font-size:9px; display:flex; align-items:center; justify-content:center; gap:4px; transition:.2s; }.segmented button.selected { color:#1f1509; background:linear-gradient(#edc871,#b9842a); font-weight:700; }
.legend-group { padding-top:2px; }.legend-heading { width:100%; border:0; background:none; color:#d8cbb0; display:flex; justify-content:space-between; font-size:10px; padding:0 0 8px; }.legend-list { display:grid; gap:7px; }.legend-item { display:flex; align-items:center; gap:8px; color:#aa9f8a; font-size:10px; }.legend-dot { width:11px; height:11px; }.legend-dot.blue { background:#238fd5; }.legend-dot.red { background:#e44e34; }.legend-dot.gray { background:#777b7a; }.legend-dot.dashed { border-style:dashed; background:transparent; }.legend-dot.teal { background:#19b996; }.legend-dot.green { background:#65d957; }.legend-dot.purple { background:#be6fff; }.legend-dot.cyan { background:#22c4e5; }.legend-dot.orange { background:#f29b30; }.legend-dot.sanctioned { background:#201313; border:2px solid #f34338; }.show-more { border:0; background:none; color:#c59b44; text-align:left; font-size:9px; padding:2px 0; display:flex; align-items:center; gap:3px; }.show-more:hover { color:#f0d282; }
.graph-wrap { min-width:0; padding:9px; display:flex; flex-direction:column; }.graph-toolbar { display:flex; justify-content:space-between; align-items:center; height:31px; color:#ad9b7b; font-size:10px; padding:0 7px; }.graph-toolbar > span:first-child { display:flex; align-items:center; gap:6px; border:1px solid rgba(193,146,52,.5); border-radius:6px; padding:5px 8px; color:#d1be96; }.graph-toolbar svg { color:#e1b850; }.graph-meta { color:#7caa7d; font-size:9px; display:flex; align-items:center; gap:5px; }.live-dot { width:5px; height:5px; background:#70c981; border-radius:50%; box-shadow:0 0 7px #70c981; }.graph-node-count { color:#c7baa0; }
.graph-canvas { position:relative; flex:1; overflow:hidden; border:1px solid rgba(197,160,88,.43); border-radius:7px; background:rgba(8,8,7,.77); box-shadow:inset 0 0 25px rgba(0,0,0,.8), inset 0 1px rgba(255,255,255,.06); }.grid-lines { position:absolute; inset:0; opacity:.22; background-image:linear-gradient(rgba(202,183,143,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(202,183,143,.15) 1px, transparent 1px); background-size:43px 43px; }
.edge-layer { position:absolute; inset:0; width:100%; height:100%; overflow:visible; }.edge { stroke-dasharray:1.5 1.2; opacity:.56; fill:none; transition:opacity .3s; }.edge.eth { stroke:#6e81ca; }.edge.tron { stroke:#db8b30; stroke-dasharray:2.5 1.2; }.edge.bsc { stroke:#e3b646; }.edge.polygon { stroke:#9d62d0; }.edge.sol { stroke:#14f195; }.edge.active { stroke:#e8d158; opacity:1; stroke-dasharray:none; filter:drop-shadow(0 0 2px rgba(241,219,92,.8)); }
.graph-node { position:absolute; z-index:2; transform:translate(-50%,-50%); display:flex; align-items:center; gap:5px; transition:filter .2s, opacity .3s, left .4s, top .4s; cursor:pointer; }.graph-node:hover { z-index:4; filter:brightness(1.25) drop-shadow(0 0 8px currentColor); }.graph-node.dimmed { opacity:.55; }.graph-node.search-dim { opacity:.2; }.graph-node.search-match .node-orb { box-shadow:0 0 14px #f5d974, 0 0 26px rgba(245,217,116,.4); }.node-orb { width:31px; height:31px; flex:none; display:grid; place-items:center; border-radius:50%; background:rgba(23,24,21,.93); border:1.4px solid currentColor; color:#bdc0b7; box-shadow:0 0 8px currentColor; transition:transform .15s; }.graph-node:hover .node-orb { transform:scale(1.12); }.graph-node.small .node-orb { width:25px; height:25px; }.graph-node.large .node-orb { width:48px; height:48px; }.graph-node.large .node-orb svg { width:25px; height:25px; }.graph-node.victim { color:#279be6; }.graph-node.victim .node-orb { background:rgba(13,102,171,.6); }.graph-node.suspect { color:#f15b41; }.graph-node.suspect .node-orb { background:rgba(132,33,24,.62); }.graph-node.wallet { color:#969893; }.graph-node.wallet .node-orb { box-shadow:none; }.graph-node.vasp { color:#62e168; }.graph-node.vasp .node-orb { background:rgba(15,113,51,.6); box-shadow:0 0 8px #62e168, 0 0 16px rgba(98,225,104,.45); }.graph-node.mixer { color:#be6fff; }.graph-node.mixer .node-orb { background:rgba(73,17,111,.64); }.graph-node.bridge { color:#22c4e5; }.graph-node.bridge .node-orb { background:rgba(14,92,111,.55); }.graph-node.dex { color:#f29b30; }.graph-node.dex .node-orb { background:rgba(119,60,12,.6); }.graph-node.sanctioned { color:#fd4b3f; }.graph-node.sanctioned .node-orb { border:2px solid #f34338; background:#201313; }.graph-node.selected .node-orb { outline:2px solid #f5d974; outline-offset:3px; box-shadow:0 0 12px #f5d974, 0 0 24px rgba(245,217,116,.4); }.node-caption { white-space:nowrap; display:flex; flex-direction:column; font-size:9px; text-shadow:0 1px 2px #000; color:#e6ddc8; }.node-caption strong { font-weight:500; }.node-caption small { color:#9d9688; font-size:8px; font-family:monospace; margin-top:1px; }.graph-node.wallet .node-caption { position:absolute; left:28px; padding:5px 8px; border:1px solid rgba(154,148,127,.35); background:rgba(15,15,13,.78); border-radius:12px; }.graph-node.small .node-caption { font-size:8px; }.graph-node.large .node-caption { font-size:11px; }.graph-node.large .node-caption small { font-size:9px; }
.sankey-message { position:absolute; inset:0; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:10px; color:#c6b896; }.sankey-message svg { color:#ca9e45; }.sankey-message strong { font-family:Georgia,serif; font-size:20px; color:#ecd9b0; }.sankey-message span { font-size:12px; color:#b19c76; }.sankey-message small { color:#81765f; font-size:10px; }
.inspector-panel { display:flex; flex-direction:column; overflow:hidden; }.inspector-content { display:flex; flex-direction:column; flex:1; min-height:0; overflow-y:auto; height:auto; padding:12px 13px; }.inspector-content::-webkit-scrollbar { width:5px; }.inspector-content::-webkit-scrollbar-track { background:rgba(0,0,0,.3); border-radius:3px; }.inspector-content::-webkit-scrollbar-thumb { background:#8b6426; border-radius:4px; }.inspector-content::-webkit-scrollbar-thumb:hover { background:#a67d2e; }.inspector-hero { display:flex; align-items:center; gap:10px; padding:7px 0 9px; position:relative; }.inspector-node { color:#9bffa0; width:43px; height:43px; border-radius:50%; display:grid; place-items:center; background:rgba(18,116,52,.55); border:1px solid #6bde76; box-shadow:0 0 10px #3bca5a, 0 0 22px rgba(65,227,91,.35); flex:none; }.inspector-node svg { width:24px; height:24px; }.inspector-node[data-kind="victim"] { color:#7abaf5; background:rgba(13,102,171,.55); border-color:#279be6; box-shadow:0 0 10px rgba(39,155,230,.35); }.inspector-node[data-kind="suspect"] { color:#f78a78; background:rgba(132,33,24,.55); border-color:#f15b41; box-shadow:0 0 10px rgba(241,91,65,.35); }.inspector-node[data-kind="wallet"] { color:#b8bab5; background:rgba(60,62,58,.55); border-color:#969893; box-shadow:none; }.inspector-node[data-kind="mixer"] { color:#d0a0ff; background:rgba(73,17,111,.55); border-color:#be6fff; box-shadow:0 0 10px rgba(190,111,255,.35); }.inspector-node[data-kind="bridge"] { color:#5ae0f5; background:rgba(14,92,111,.55); border-color:#22c4e5; box-shadow:0 0 10px rgba(34,196,229,.35); }.inspector-node[data-kind="dex"] { color:#ffb55a; background:rgba(119,60,12,.55); border-color:#f29b30; box-shadow:0 0 10px rgba(242,155,48,.35); }.inspector-node[data-kind="sanctioned"] { color:#fd6b5f; background:rgba(40,15,15,.7); border-color:#f34338; box-shadow:0 0 10px rgba(253,75,63,.35); }.inspector-title { display:flex; align-items:center; gap:7px; color:#eee2c5; font-family:Georgia,serif; font-size:16px; }.copy-icon { color:#a89e8b; }.address-chip { margin-top:5px; border:1px solid rgba(179,163,131,.4); border-radius:8px; padding:4px 6px; font-family:monospace; font-size:8px; color:#c8bea8; display:flex; gap:7px; align-items:center; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }.inspector-external { position:absolute; right:0; top:5px; color:#c6b07a; transition:color .2s; }.inspector-external:hover { color:#f0d282; }.status-row { display:flex; gap:6px; margin-bottom:10px; flex-wrap:wrap; }.status-badge { border-radius:9px; padding:4px 7px; font-size:9px; display:flex; align-items:center; gap:4px; }.status-badge.green { color:#baf5ac; background:rgba(30,115,51,.4); border:1px solid #337a3d; }.status-badge.red { color:#ffd0c2; background:rgba(130,39,27,.5); border:1px solid #8d3a2f; }.status-badge.blue { color:#b0d8f5; background:rgba(26,80,140,.4); border:1px solid #2a5a8a; }.status-badge.purple { color:#e0c0f5; background:rgba(80,30,130,.4); border:1px solid #6a2a8a; }.status-badge.orange { color:#f5d8b0; background:rgba(140,80,15,.4); border:1px solid #8a6a2a; }.status-badge.gray { color:#c0c0c0; background:rgba(60,60,60,.4); border:1px solid #6a6a6a; }.detail-list, .counterparties, .confidence, .labels { border-top:1px solid rgba(221,189,115,.17); padding-top:10px; margin-top:2px; }.detail-list { display:grid; gap:10px; }.detail-row { display:flex; flex-direction:column; gap:3px; font-size:9px; }.detail-row span, .counterparties h3, .labels h3 { color:#aaa18e; font-size:10px; font-weight:400; margin:0; }.detail-row strong { color:#d9cfb8; font-size:9px; font-weight:400; white-space:nowrap; }.detail-row strong.amount { color:#e7d8b4; font-size:13px; }.counterparties h3, .labels h3 { margin-bottom:9px; }.counterparty { display:flex; justify-content:space-between; padding:5px 0; font-size:9px; color:#c8c0ae; transition:color .2s; }.counterparty.clickable { cursor:pointer; }.counterparty.clickable:hover { color:#f0d282; }.counterparty span { display:flex; gap:7px; align-items:center; }.counterparty strong { color:#dbd0b7; font-weight:400; }.counter-dot { width:13px; height:13px; border-radius:50%; border:1px solid #72d86d; background:rgba(35,126,55,.7); }.counter-dot.teal { border-color:#3fc9dc; background:rgba(25,98,111,.75); }.counter-dot.red { border-color:#e44e34; background:rgba(150,50,35,.7); }.counter-dot.gray { border-color:#969893; background:rgba(80,82,78,.7); }.counter-dot.purple { border-color:#be6fff; background:rgba(73,17,111,.7); }.counter-dot.orange { border-color:#f29b30; background:rgba(119,60,12,.7); }.more-link { border:0; background:none; padding:4px 0 0; color:#31c1cf; font-size:9px; cursor:pointer; }.more-link:hover { color:#5aebbe; }.confidence { margin-top:8px; }.section-label { display:flex; justify-content:space-between; color:#bdb19b; font-size:10px; margin-bottom:7px; }.section-label strong { color:#e4d29a; font-weight:400; }.confidence-track { height:8px; border-radius:8px; background:#3c3426; box-shadow:inset 0 2px 4px #0b0905; }.confidence-track span { display:block; height:100%; border-radius:8px; background:linear-gradient(90deg,#b8832b,#ebc95b); box-shadow:0 0 8px rgba(232,193,73,.5); transition:width .3s; }.labels { margin-top:12px; }.labels > div { display:flex; gap:4px; flex-wrap:wrap; }.labels span { padding:5px 7px; border:1px solid rgba(183,162,119,.45); border-radius:12px; color:#d4c7a9; font-size:8px; }.labels span:last-child { border-color:#a67d2e; color:#e0be62; }.inspector-actions { display:flex; gap:6px; margin-top:15px; padding-bottom:4px; }.gold-button, .dark-button { flex:1; height:36px; border-radius:7px; font-size:10px; display:flex; justify-content:center; align-items:center; gap:6px; transition:filter .2s, border-color .2s; }.gold-button { border:1px solid #a57420; color:#1d1308; background:linear-gradient(#f1ce7b,#bb842b); box-shadow:0 0 12px rgba(229,185,73,.22); }.gold-button:hover { filter:brightness(1.1); }.dark-button { color:#e2c98d; background:#211910; border:1px solid #9c7428; }.dark-button:hover { border-color:#bc8e36; }.dark-button.watched { color:#f0d282; border-color:#bc8e36; background:rgba(190,142,54,.25); }
.replay-bar { margin:13px 10px 0; height:72px; display:flex; align-items:center; gap:18px; padding:10px 13px; }.transport { display:flex; gap:4px; padding-right:13px; border-right:1px solid rgba(215,170,75,.2); }.transport button, .speed-control button { height:32px; border:1px solid rgba(175,140,77,.32); border-radius:6px; background:rgba(21,16,10,.8); color:#a99e88; font-size:9px; padding:0 10px; display:flex; align-items:center; gap:5px; white-space:nowrap; transition:.2s; }.transport button:hover, .speed-control button:hover { color:#f0d282; border-color:#bc8e36; }.transport .transport-primary { color:#1d1408; background:linear-gradient(#f1d07b,#ba8328); border-color:#b8862b; font-weight:700; box-shadow:0 0 10px rgba(234,183,69,.3); }.speed-control { display:flex; align-items:center; gap:3px; border-right:1px solid rgba(215,170,75,.2); padding-right:14px; }.speed-control > span { color:#c5b79e; font-size:9px; margin-right:4px; }.speed-control button { height:27px; padding:0 8px; border-radius:13px; }.speed-control button.active { color:#271a09; background:#e7bb59; border-color:#e7bb59; }.timeline { flex:1; min-width:220px; padding:0 4px; }.timeline-track { position:relative; height:4px; border-radius:5px; background:#5d4a27; cursor:pointer; }.track-progress { display:block; height:100%; border-radius:5px; background:linear-gradient(90deg,#5d90cb,#e6b958); box-shadow:0 0 5px #d5a942; transition:width .1s; }.event, .playhead { position:absolute; top:50%; transform:translateY(-50%); display:block; border-radius:50%; }.event { width:6px; height:6px; }.event.blue { left:14%; background:#36a9e1; }.event.red { left:30%; background:#eb664c; }.event.purple { left:59%; background:#bd6ee7; }.event.teal { left:72%; background:#2bbcc4; }.playhead { width:15px; height:15px; background:#e8bb55; border:2px solid #8c651e; box-shadow:0 0 10px rgba(237,192,82,.7); z-index:3; transform:translate(-50%,-50%); }.time-labels { display:flex; justify-content:space-between; color:#9d8d70; font:9px monospace; margin-top:10px; }.replay-time { font:10px monospace; color:#e0b65b; min-width:42px; text-align:center; }.live-status { display:flex; align-items:center; gap:6px; border:1px solid rgba(71,144,76,.6); color:#a8dfab; border-radius:14px; padding:6px 9px; font-size:9px; cursor:pointer; transition:border-color .2s; }.live-status.off { border-color:rgba(120,110,90,.5); color:#8a8070; }.live-status.off span { background:#6a6258; box-shadow:none; }.live-status span { width:7px; height:7px; border-radius:50%; background:#6ddb7c; box-shadow:0 0 8px #6ddb7c; }
.desk-evidence { position:absolute; z-index:1; bottom:7px; left:-7px; transform:rotate(15deg); color:#4f2416; font:bold 17px Georgia,serif; letter-spacing:.07em; background:#a66d35; border:3px solid #5b321e; padding:7px 12px; box-shadow:10px 7px 0 rgba(30,14,5,.6); }.desk-pen { position:absolute; z-index:1; right:38px; bottom:2px; width:154px; height:7px; transform:rotate(-24deg); border-radius:8px; background:linear-gradient(90deg,#15110e,#695037 52%,#0e0c0a); box-shadow:0 2px 4px #000; }.desk-pen:after { content:""; position:absolute; right:-14px; top:-2px; border-left:20px solid #8f7655; border-top:5px solid transparent; border-bottom:5px solid transparent; }.desk-seal { position:absolute; z-index:1; right:-8px; bottom:20px; width:59px; height:59px; border-radius:50%; border:3px solid #8b6426; outline:1px solid #4b3212; color:#cf9d40; display:grid; place-items:center; background:rgba(42,24,9,.8); box-shadow:0 0 13px rgba(205,145,44,.2); transform:rotate(-10deg); }
.filters-panel { display:flex; flex-direction:column; overflow:hidden; }.filter-content { padding:12px 13px; flex:1; min-height:0; overflow-y:auto; }.filter-content::-webkit-scrollbar { width:4px; }.filter-content::-webkit-scrollbar-track { background:rgba(0,0,0,.2); border-radius:3px; }.filter-content::-webkit-scrollbar-thumb { background:#8b6426; border-radius:3px; }.filters-panel .panel-heading { cursor:pointer; user-select:none; }
.case-wrapper { position:relative; }
.case-menu { position:absolute; top:44px; right:0; min-width:210px; border:1px solid rgba(210,162,62,.6); border-radius:9px; background:linear-gradient(145deg, rgba(27,19,12,.98), rgba(8,8,6,.98)); box-shadow:0 8px 24px rgba(0,0,0,.6); z-index:50; padding:4px; }.case-menu button { width:100%; text-align:left; border:0; background:none; color:#dacaa7; font-size:11px; padding:8px 10px; border-radius:6px; display:flex; align-items:center; gap:8px; }.case-menu button:hover { background:rgba(210,162,62,.15); color:#f0d282; }.case-menu button.active { background:rgba(210,162,62,.2); color:#f0d282; }
.inspector-empty { display:flex; flex-direction:column; align-items:center; justify-content:center; flex:1; gap:12px; color:#6a6050; text-align:center; padding:30px 20px; }.inspector-empty svg { color:#4a4234; }
.toast { position:fixed; bottom:110px; left:50%; transform:translateX(-50%); z-index:100; padding:11px 18px; border:1px solid #a57420; border-radius:9px; background:linear-gradient(145deg, rgba(27,19,12,.97), rgba(8,8,6,.97)); color:#f0d282; font-size:12px; box-shadow:0 8px 20px rgba(0,0,0,.5); display:flex; align-items:center; gap:8px; animation:toastIn .3s; }@keyframes toastIn { from { opacity:0; transform:translateX(-50%) translateY(10px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }
@media (max-width:1350px) { .top-actions { gap:5px; }.search-slot { width:245px; }.workspace { grid-template-columns:210px minmax(560px,1fr) 250px; }.transport button { padding:0 7px; }.brand-lockup { width:200px; } }
`;

type NodeKind = 'victim' | 'suspect' | 'wallet' | 'vasp' | 'mixer' | 'bridge' | 'dex' | 'sanctioned';
type Risk = 'high' | 'medium' | 'low' | null;
type Counterparty = { address: string; value: string; color: string };

type GraphNode = {
  id: string;
  label: string;
  address: string;
  kind: NodeKind;
  x: number;
  y: number;
  size?: 'small' | 'medium' | 'large';
  path?: boolean;
  icon?: 'user' | 'building' | 'mixer' | 'bridge' | 'swap' | 'alert' | 'wallet';
  balance: string;
  firstSeen: string;
  lastSeen: string;
  confidence: number;
  labels: string[];
  risk: Risk;
  counterparties: Counterparty[];
  volume: number;
};

type Edge = { from: string; to: string; chain: string; path: boolean; amount: number };

const walletCp: Counterparty[] = [
  { address: '0x3A...9F2', value: '72.1%', color: 'red' },
  { address: '0x6C...7D3', value: '18.3%', color: 'green' },
  { address: '0x98...4E1', value: '9.6%', color: 'gray' },
];

function w(id: string, label: string, x: number, y: number, opts: Partial<GraphNode> = {}): GraphNode {
  return {
    id, label, address: '', kind: 'wallet', x, y, icon: 'wallet',
    balance: '$ 12,840.00', firstSeen: '2025-04-12 14:02:11 (UTC)', lastSeen: '2025-04-13 08:17:44 (UTC)',
    confidence: 40, labels: ['Wallet', 'Intermediary'], risk: null, counterparties: walletCp, volume: 12840,
    ...opts,
  };
}

const nodes: GraphNode[] = [
  { id: 'victim', label: 'Victim A', address: '0x7F...21C', kind: 'victim', x: 7, y: 51, size: 'large', path: true, icon: 'user',
    balance: '$ 1,250.00', firstSeen: '2025-04-12 09:15:00 (UTC)', lastSeen: '2025-04-12 13:20:00 (UTC)',
    confidence: 100, labels: ['Victim', 'Reported', 'Complainant'], risk: null,
    counterparties: [{ address: '0x3A...9F2', value: '95.0%', color: 'red' }, { address: '0x98...4E1', value: '5.0%', color: 'gray' }],
    volume: 482000 },
  { id: 'suspect', label: 'Suspect', address: '0x3A...9F2', kind: 'suspect', x: 20, y: 51, size: 'large', path: true, icon: 'user',
    balance: '$ 458,920.00', firstSeen: '2025-04-12 13:24:17 (UTC)', lastSeen: '2025-04-14 10:42:33 (UTC)',
    confidence: 87, labels: ['Suspect', 'Flagged', 'High Volume'], risk: 'high',
    counterparties: [{ address: '0x6C...7D3', value: '38.4%', color: 'green' }, { address: '0xD3...5B0', value: '22.7%', color: 'gray' }, { address: '0x4A...6C7', value: '11.9%', color: 'gray' }],
    volume: 482000 },
  w('w1', '0x98...4E1', 28, 33, { path: false, volume: 150000, balance: '$ 150,000.00', confidence: 52, labels: ['Wallet', 'Intermediary'] }),
  w('w2', '0x6C...7D3', 35, 43, { path: true, volume: 332000, balance: '$ 332,000.00', confidence: 68, labels: ['Wallet', 'Intermediary', 'High Volume'] }),
  w('w3', '0xD3...5B0', 30, 69, { volume: 80000, balance: '$ 80,000.00', confidence: 45 }),
  w('w4', '0x4A...6C7', 21, 77, { volume: 50000, balance: '$ 50,000.00', confidence: 38 }),
  w('w5', '0x86...2D4', 39, 82, { size: 'small', volume: 2000, balance: '$ 2,000.00', confidence: 20, labels: ['Wallet', 'Dust'] }),
  { id: 'mixer', label: 'Tornado Cash', address: '0xA1...3F6', kind: 'mixer', x: 39, y: 15, icon: 'mixer',
    balance: '$ 2,140,500.00', firstSeen: '2025-04-12 15:30:00 (UTC)', lastSeen: '2025-04-14 09:12:00 (UTC)',
    confidence: 78, labels: ['Mixer', 'Sanctioned', 'High Volume'], risk: 'high',
    counterparties: [{ address: '0x82...601', value: '45.0%', color: 'teal' }, { address: '0x98...4E1', value: '30.0%', color: 'gray' }, { address: '0x3A...9F2', value: '25.0%', color: 'red' }],
    volume: 145000 },
  { id: 'bridge', label: 'Bridge', address: '0x82...601', kind: 'bridge', x: 50, y: 15, icon: 'bridge',
    balance: '$ 890,200.00', firstSeen: '2025-04-12 16:00:00 (UTC)', lastSeen: '2025-04-13 22:45:00 (UTC)',
    confidence: 65, labels: ['Bridge', 'Cross-chain'], risk: 'medium',
    counterparties: [{ address: '0xE4...9C3', value: '52.0%', color: 'orange' }, { address: '0xA1...3F6', value: '28.0%', color: 'purple' }, { address: '0x77...1A8', value: '20.0%', color: 'gray' }],
    volume: 140000 },
  { id: 'uni', label: 'Uniswap', address: '0xE4...9C3', kind: 'dex', x: 64, y: 15, icon: 'swap',
    balance: '$ 1,675,300.00', firstSeen: '2025-04-12 17:10:00 (UTC)', lastSeen: '2025-04-14 08:30:00 (UTC)',
    confidence: 60, labels: ['DEX', 'Swap', 'High Volume'], risk: 'medium',
    counterparties: [{ address: '0x77...1A8', value: '65.0%', color: 'gray' }, { address: '0x82...601', value: '35.0%', color: 'teal' }],
    volume: 135000 },
  w('w6', '0x77...1A8', 80, 18, { size: 'small', volume: 5000, balance: '$ 5,000.00', confidence: 25 }),
  { id: 'binance', label: 'Binance', address: '0x28...B7A', kind: 'vasp', x: 55, y: 51, size: 'large', path: true, icon: 'building',
    balance: '$ 4,82,760.32', firstSeen: '2025-04-12 13:24:17 (UTC)', lastSeen: '2025-04-14 10:42:33 (UTC)',
    confidence: 92, labels: ['Exchange', 'KYC Possible', 'High Volume'], risk: 'high',
    counterparties: [{ address: '0x4F...2C9', value: '38.4%', color: 'green' }, { address: '0x12...8E7', value: '22.7%', color: 'green' }, { address: '0x66...3D7', value: '11.9%', color: 'teal' }],
    volume: 330000 },
  { id: 'deposit1', label: '0x4F...2C9', address: '0x4F...2C9', kind: 'vasp', x: 72, y: 51, size: 'medium', path: true, icon: 'building',
    balance: '$ 185,400.00', firstSeen: '2025-04-13 02:15:00 (UTC)', lastSeen: '2025-04-14 06:20:00 (UTC)',
    confidence: 85, labels: ['VASP Deposit', 'KYC Linked'], risk: 'medium',
    counterparties: [{ address: '0x12...8E7', value: '55.0%', color: 'green' }, { address: '0x28...B7A', value: '45.0%', color: 'green' }],
    volume: 280000 },
  { id: 'deposit2', label: '0x12...8E7', address: '0x12...8E7', kind: 'vasp', x: 88, y: 51, size: 'medium', path: true, icon: 'building',
    balance: '$ 102,100.00', firstSeen: '2025-04-13 14:00:00 (UTC)', lastSeen: '2025-04-14 09:30:00 (UTC)',
    confidence: 80, labels: ['VASP Deposit', 'Withdrawal'], risk: 'low',
    counterparties: [{ address: '0x4F...2C9', value: '70.0%', color: 'green' }, { address: '0x28...B7A', value: '30.0%', color: 'green' }],
    volume: 250000 },
  { id: 'mixer2', label: 'Mixer', address: '0xF9...2E6', kind: 'mixer', x: 41, y: 72, icon: 'mixer',
    balance: '$ 340,800.00', firstSeen: '2025-04-12 18:20:00 (UTC)', lastSeen: '2025-04-13 12:00:00 (UTC)',
    confidence: 72, labels: ['Mixer', 'Privacy Tool'], risk: 'high',
    counterparties: [{ address: '0xC8...4D2', value: '50.0%', color: 'teal' }, { address: '0xD3...5B0', value: '50.0%', color: 'gray' }],
    volume: 78000 },
  { id: 'stargate', label: 'Stargate', address: '0xC8...4D2', kind: 'bridge', x: 57, y: 72, icon: 'bridge',
    balance: '$ 215,600.00', firstSeen: '2025-04-12 19:00:00 (UTC)', lastSeen: '2025-04-13 15:30:00 (UTC)',
    confidence: 58, labels: ['Bridge', 'Cross-chain'], risk: 'medium',
    counterparties: [{ address: '0x5E...7F1', value: '60.0%', color: 'orange' }, { address: '0xF9...2E6', value: '40.0%', color: 'purple' }],
    volume: 75000 },
  { id: 'pancake', label: 'PancakeSwap', address: '0x5E...7F1', kind: 'dex', x: 72, y: 72, icon: 'swap',
    balance: '$ 198,400.00', firstSeen: '2025-04-12 20:10:00 (UTC)', lastSeen: '2025-04-13 18:00:00 (UTC)',
    confidence: 55, labels: ['DEX', 'Swap'], risk: 'medium',
    counterparties: [{ address: '0x66...3D7', value: '68.0%', color: 'gray' }, { address: '0xC8...4D2', value: '32.0%', color: 'teal' }],
    volume: 72000 },
  { id: 'curve', label: 'Curve', address: '0x3C...8E9', kind: 'dex', x: 50, y: 86, icon: 'swap',
    balance: '$ 4,200.00', firstSeen: '2025-04-13 01:00:00 (UTC)', lastSeen: '2025-04-13 07:00:00 (UTC)',
    confidence: 35, labels: ['DEX', 'Low Volume'], risk: 'low',
    counterparties: [{ address: '0x86...2D4', value: '60.0%', color: 'gray' }, { address: '0x5D...9F4', value: '40.0%', color: 'purple' }],
    volume: 1800 },
  { id: 'aave', label: 'Aave', address: '0x5D...9F4', kind: 'mixer', x: 65, y: 90, icon: 'mixer',
    balance: '$ 3,100.00', firstSeen: '2025-04-13 03:00:00 (UTC)', lastSeen: '2025-04-13 09:00:00 (UTC)',
    confidence: 30, labels: ['Lending', 'Low Volume'], risk: 'low',
    counterparties: [{ address: '0xAD...5F7', value: '75.0%', color: 'gray' }, { address: '0x3C...8E9', value: '25.0%', color: 'orange' }],
    volume: 1500 },
  { id: 'thor', label: 'THORChain', address: '0xDE...1B2', kind: 'bridge', x: 35, y: 90, icon: 'bridge',
    balance: '$ 87,300.00', firstSeen: '2025-04-12 22:00:00 (UTC)', lastSeen: '2025-04-13 14:00:00 (UTC)',
    confidence: 50, labels: ['Bridge', 'Cross-chain'], risk: 'medium',
    counterparties: [{ address: '0x91...0F3', value: '85.0%', color: 'red' }, { address: '0x4A...6C7', value: '15.0%', color: 'gray' }],
    volume: 45000 },
  { id: 'sanctioned', label: 'Sanctioned', address: '0x91...0F3', kind: 'sanctioned', x: 24, y: 87, icon: 'alert',
    balance: '$ 3,200,000.00', firstSeen: '2025-04-11 08:00:00 (UTC)', lastSeen: '2025-04-14 11:00:00 (UTC)',
    confidence: 100, labels: ['Sanctioned', 'OFAC', 'High Risk'], risk: 'high',
    counterparties: [{ address: '0xDE...1B2', value: '48.0%', color: 'teal' }, { address: '0x4A...6C7', value: '32.0%', color: 'gray' }, { address: '0x3A...9F2', value: '20.0%', color: 'red' }],
    volume: 48000 },
  w('w7', '0x66...3D7', 86, 73, { size: 'small', volume: 70000, balance: '$ 70,000.00', confidence: 42 }),
  w('w8', '0xAD...5F7', 78, 91, { size: 'small', volume: 1200, balance: '$ 1,200.00', confidence: 18, labels: ['Wallet', 'Dust'] }),
  w('w9', '0xE1...2B8', 93, 88, { size: 'small', volume: 1000, balance: '$ 1,000.00', confidence: 15, labels: ['Wallet', 'Dust'] }),
];

const edges: Edge[] = [
  { from: 'victim', to: 'suspect', chain: 'eth', path: true, amount: 482000 },
  { from: 'suspect', to: 'w1', chain: 'eth', path: false, amount: 150000 },
  { from: 'w1', to: 'mixer', chain: 'eth', path: false, amount: 145000 },
  { from: 'mixer', to: 'bridge', chain: 'eth', path: false, amount: 140000 },
  { from: 'bridge', to: 'uni', chain: 'tron', path: false, amount: 135000 },
  { from: 'uni', to: 'w6', chain: 'bsc', path: false, amount: 130000 },
  { from: 'suspect', to: 'w2', chain: 'eth', path: true, amount: 332000 },
  { from: 'w2', to: 'binance', chain: 'eth', path: true, amount: 330000 },
  { from: 'binance', to: 'deposit1', chain: 'eth', path: true, amount: 280000 },
  { from: 'deposit1', to: 'deposit2', chain: 'eth', path: true, amount: 250000 },
  { from: 'suspect', to: 'w3', chain: 'bsc', path: false, amount: 80000 },
  { from: 'w3', to: 'mixer2', chain: 'bsc', path: false, amount: 78000 },
  { from: 'mixer2', to: 'stargate', chain: 'tron', path: false, amount: 75000 },
  { from: 'stargate', to: 'pancake', chain: 'tron', path: false, amount: 72000 },
  { from: 'pancake', to: 'w7', chain: 'bsc', path: false, amount: 70000 },
  { from: 'suspect', to: 'w4', chain: 'tron', path: false, amount: 50000 },
  { from: 'w4', to: 'sanctioned', chain: 'tron', path: false, amount: 48000 },
  { from: 'sanctioned', to: 'thor', chain: 'tron', path: false, amount: 45000 },
  { from: 'w3', to: 'w5', chain: 'bsc', path: false, amount: 2000 },
  { from: 'w5', to: 'curve', chain: 'bsc', path: false, amount: 1800 },
  { from: 'curve', to: 'aave', chain: 'polygon', path: false, amount: 1500 },
  { from: 'aave', to: 'w8', chain: 'polygon', path: false, amount: 1200 },
  { from: 'w8', to: 'w9', chain: 'polygon', path: false, amount: 1000 },
  { from: 'stargate', to: 'w8', chain: 'tron', path: false, amount: 5000 },
];

const forcePos: Record<string, { x: number; y: number }> = {
  victim: { x: 16, y: 46 }, suspect: { x: 32, y: 28 }, w1: { x: 50, y: 14 }, w2: { x: 42, y: 54 },
  w3: { x: 55, y: 70 }, w4: { x: 24, y: 66 }, w5: { x: 66, y: 84 }, mixer: { x: 62, y: 18 },
  bridge: { x: 74, y: 30 }, uni: { x: 84, y: 46 }, w6: { x: 92, y: 20 }, binance: { x: 50, y: 44 },
  deposit1: { x: 68, y: 54 }, deposit2: { x: 86, y: 64 }, mixer2: { x: 42, y: 82 }, stargate: { x: 58, y: 60 },
  pancake: { x: 76, y: 76 }, curve: { x: 34, y: 88 }, aave: { x: 56, y: 92 }, thor: { x: 16, y: 84 },
  sanctioned: { x: 10, y: 72 }, w7: { x: 94, y: 40 }, w8: { x: 82, y: 90 }, w9: { x: 96, y: 72 },
};

const iconFor = (node: GraphNode) => {
  const p = { size: 18, strokeWidth: 1.7 };
  switch (node.icon) {
    case 'user': return <UserRound {...p} />;
    case 'building': return <Building2 {...p} />;
    case 'mixer': return <Sparkles {...p} />;
    case 'bridge': return <Layers3 {...p} />;
    case 'swap': return <ArrowDown {...p} />;
    case 'alert': return <AlertTriangle {...p} />;
    default: return <WalletCards {...p} />;
  }
};

function getReachable(maxHops: number, edgeList: Edge[]): Set<string> {
  const reach = new Set<string>(['victim']);
  let frontier = ['victim'];
  for (let i = 0; i < maxHops; i++) {
    const next: string[] = [];
    for (const id of frontier) {
      for (const e of edgeList) {
        if (e.from === id && !reach.has(e.to)) { reach.add(e.to); next.push(e.to); }
      }
    }
    frontier = next;
  }
  return reach;
}

const cases = [
  'CN-2025-0147', 'CN-2025-0132', 'CN-2025-0118', 'CN-2025-0094', 'CN-2024-0371',
];

function Fundgraph() {
  const [view, setView] = useState<'Graph' | 'Sankey'>('Graph');
  const [hops, setHops] = useState(4);
  const [minAmount, setMinAmount] = useState('0');
  const [dateFrom, setDateFrom] = useState('2025-04-10');
  const [dateTo, setDateTo] = useState('2025-04-14');
  const [chains, setChains] = useState<Record<string, boolean>>({ tron: true, eth: true, bsc: true, poly: true, sol: false });
  const [showExtraChain, setShowExtraChain] = useState(false);
  const [toggles, setToggles] = useState({ dust: false, suspicious: true, vasp: true });
  const [layout, setLayout] = useState<'Left-to-right' | 'Force'>('Left-to-right');
  const [showLegend, setShowLegend] = useState(true);
  const [showAllLegend, setShowAllLegend] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('binance');
  const [watched, setWatched] = useState(false);
  const [showAllCp, setShowAllCp] = useState(false);
  const [caseId, setCaseId] = useState('CN-2025-0147');
  const [caseMenuOpen, setCaseMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playhead, setPlayhead] = useState(39);
  const [speed, setSpeed] = useState(1);
  const [isLive, setIsLive] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const showToast = (msg: string) => { setToast(msg); window.setTimeout(() => setToast(null), 3000); };
  const toggle = (key: keyof typeof toggles) => setToggles((c) => ({ ...c, [key]: !c[key] }));
  const toggleChain = (key: string) => setChains((c) => ({ ...c, [key]: !c[key] }));

  useEffect(() => {
    if (!isPlaying) return;
    const interval = window.setInterval(() => {
      setPlayhead((p) => { const n = p + speed * 0.3; return n >= 100 ? 0 : n; });
    }, 50);
    return () => window.clearInterval(interval);
  }, [isPlaying, speed]);

  const { visNodes, visEdges } = useMemo(() => {
    let fEdges = edges.filter((e) => chains[e.chain]);
    const minAmt = Number(minAmount) || 0;
    fEdges = fEdges.filter((e) => e.amount >= minAmt);
    const reach = getReachable(hops, fEdges);
    let fNodes = nodes.filter((n) => reach.has(n.id));
    const ids = new Set(fNodes.map((n) => n.id));
    fEdges = fEdges.filter((e) => ids.has(e.from) && ids.has(e.to));
    if (toggles.dust) fNodes = fNodes.filter((n) => n.size !== 'small');
    if (toggles.suspicious) {
      const sk = ['suspect', 'sanctioned', 'mixer', 'vasp'];
      fNodes = fNodes.filter((n) => sk.includes(n.kind) || n.path);
    }
    const visIds = new Set(fNodes.map((n) => n.id));
    fEdges = fEdges.filter((e) => visIds.has(e.from) && visIds.has(e.to));
    return { visNodes: fNodes, visEdges: fEdges };
  }, [chains, minAmount, hops, toggles]);

  const searchLower = search.toLowerCase().trim();
  const isMatch = (n: GraphNode) => !searchLower || n.label.toLowerCase().includes(searchLower) || n.address.toLowerCase().includes(searchLower);

  const selectedNode = selectedNodeId ? nodes.find((n) => n.id === selectedNodeId) ?? null : null;

  const getPos = (id: string) => {
    const n = nodes.find((x) => x.id === id)!;
    return layout === 'Force' ? (forcePos[id] ?? { x: n.x, y: n.y }) : { x: n.x, y: n.y };
  };

  const stepForward = () => setPlayhead((p) => Math.min(100, p + 5));
  const stepBack = () => setPlayhead((p) => Math.max(0, p - 5));

  const handleTimelineClick = (e: { currentTarget: HTMLDivElement; clientX: number }) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPlayhead(Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)));
  };

  const totalMin = 120;
  const curMin = Math.floor((playhead / 100) * totalMin);
  const curHour = 12 + Math.floor(curMin / 60);
  const curMinRem = curMin % 60;
  const timeStr = `${String(curHour).padStart(2, '0')}:${String(curMinRem).padStart(2, '0')}`;

  const edgeWidth = (e: Edge) => {
    const base = Math.max(0.15, Math.min(1.2, e.amount / 400000));
    return e.path && toggles.vasp ? Math.max(base, 0.6) : base;
  };

  const handleNodeClick = (node: GraphNode) => { setSelectedNodeId(node.id); setWatched(false); setShowAllCp(false); };
  const handleNodeDoubleClick = (node: GraphNode) => {
    setSelectedNodeId(node.id);
    setExpandedNodes((prev) => { const n = new Set(prev); n.add(node.id); return n; });
    showToast(`Graph expanded from ${node.label} — new nodes loaded`);
  };

  const selectByAddress = (addr: string) => {
    const n = nodes.find((x) => x.label === addr || x.address === addr);
    if (n) { setSelectedNodeId(n.id); setWatched(false); setShowAllCp(false); }
  };

  const extraLegend = [
    { color: 'purple', label: 'Mixer' },
    { color: 'cyan', label: 'Bridge' },
    { color: 'orange', label: 'DEX' },
    { color: 'sanctioned', label: 'Sanctioned' },
  ];

  return (
    <>
      <style>{styles}</style>
      <main className="desk-shell">
        <div className="lamp-glow" />
        <div className="desk-grain" />
        <header className="topbar">
          <div className="brand-lockup">
            <div className="brand-mark"><Eye size={22} strokeWidth={2.2} /><span /></div>
            <span className="brand-name">ChainNetra</span>
          </div>
          <div className="title-block">
            <h1>Fund-Flow Graph Explorer</h1>
            <p>Trace money movement across wallets, intermediaries and VASPs</p>
          </div>
          <div className="top-actions">
            <label className="search-slot"><Search size={16} /><input aria-label="Search" placeholder="Search wallet, tx hash, address, label..." value={search} onChange={(e) => setSearch(e.target.value)} /></label>
            <div className="case-wrapper">
              <button className="case-chip" onClick={() => setCaseMenuOpen(!caseMenuOpen)}><FileText size={15} />{caseId}<ChevronDown size={12} /></button>
              {caseMenuOpen && <div className="case-menu">
                {cases.map((c) => <button key={c} className={c === caseId ? 'active' : ''} onClick={() => { setCaseId(c); setCaseMenuOpen(false); showToast(`Switched to case ${c}`); }}><FileText size={13} />{c}</button>)}
              </div>}
            </div>
            <div className="view-switch" role="tablist" aria-label="Graph view">
              <button className={view === 'Graph' ? 'active' : ''} onClick={() => setView('Graph')}><CircleDollarSign size={14} />Graph</button>
              <button className={view === 'Sankey' ? 'active' : ''} onClick={() => setView('Sankey')}><SlidersHorizontal size={14} />Sankey</button>
            </div>
          </div>
        </header>

        <section className="workspace">
          <aside className="panel filters-panel">
            <div className="panel-heading" onClick={() => setFiltersOpen(!filtersOpen)}><span><Filter size={17} />Filters</span>{filtersOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}</div>
            {filtersOpen && <div className="filter-content">
              <div className="field-group">
                <div className="field-label"><span>Hops</span><strong>{hops}</strong></div>
                <input className="range" type="range" min="1" max="8" value={hops} onChange={(e) => setHops(Number(e.target.value))} />
                <div className="range-labels"><span>1</span><span>8</span></div>
              </div>
              <div className="field-group"><div className="field-label"><span>Min amount (USD)</span></div><div className="inset-input"><input value={minAmount} onChange={(e) => setMinAmount(e.target.value.replace(/[^0-9]/g, ''))} aria-label="Minimum amount" /><span>$</span></div></div>
              <div className="field-group"><div className="field-label"><span>Date range</span></div><div className="date-inputs"><input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} /><span>—</span><input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} /></div></div>
              <div className="field-group"><div className="field-label"><span>Chain</span></div><div className="chain-select">
                {(['tron', 'eth', 'bsc', 'poly'] as const).map((c) => (
                  <span key={c} className={`chain-pill ${c} ${chains[c] ? '' : 'unchecked'}`} onClick={() => toggleChain(c)}><i />{c === 'eth' ? 'Ethereum' : c === 'bsc' ? 'BSC' : c === 'poly' ? 'Polygon' : 'TRON'}</span>
                ))}
                {showExtraChain && <span className={`chain-pill sol ${chains.sol ? '' : 'unchecked'}`} onClick={() => toggleChain('sol')}><i />Solana</span>}
                <button className="more-chain" onClick={() => setShowExtraChain(!showExtraChain)}>{showExtraChain ? '⌄ Less' : '+1 more⌄'}</button>
              </div></div>
              <div className="toggle-list">
                <ToggleRow label="Hide dust" value={toggles.dust} onClick={() => toggle('dust')} />
                <ToggleRow label="Show only suspicious" value={toggles.suspicious} onClick={() => toggle('suspicious')} />
                <ToggleRow label="Path to VASP" value={toggles.vasp} onClick={() => toggle('vasp')} />
              </div>
              <div className="field-group layout-group"><div className="field-label"><span>Layout</span></div><div className="segmented"><button className={layout === 'Left-to-right' ? 'selected' : ''} onClick={() => setLayout('Left-to-right')}><ArrowRight size={12} />Left-to-right</button><button className={layout === 'Force' ? 'selected' : ''} onClick={() => setLayout('Force')}><GripVertical size={12} />Force</button></div></div>
              <div className="legend-group"><button className="legend-heading" onClick={() => setShowLegend(!showLegend)}><span>Node classes (legend)</span>{showLegend ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</button>{showLegend && <div className="legend-list">
                <LegendDot color="blue" label="Victim" /><LegendDot color="red" label="Suspect" /><LegendDot color="gray" label="Intermediary" /><LegendDot color="dashed" label="Burner" /><LegendDot color="teal" label="VASP (Hot)" /><LegendDot color="green" label="VASP (Deposit)" />
                {showAllLegend && extraLegend.map((l) => <LegendDot key={l.label} color={l.color} label={l.label} />)}
                <button className="show-more" onClick={() => setShowAllLegend(!showAllLegend)}>{showAllLegend ? <><ChevronUp size={10} /> Show less</> : <><ChevronDown size={10} /> Show more</>}</button>
              </div>}</div>
            </div>}
          </aside>

          <section className="graph-wrap">
            <div className="graph-toolbar"><span><CircleHelp size={14} />Showing top {Math.min(visNodes.length * 20, 500)} by value — refine filters</span><span className="graph-meta"><span className="graph-node-count">{visNodes.length} nodes · {visEdges.length} edges</span><span className="live-dot" />{layout} layout</span></div>
            <div className={`graph-canvas ${view === 'Sankey' ? 'sankey-preview' : ''}`} aria-label="Fund-flow transaction graph">
              <div className="grid-lines" />
              {view === 'Sankey' ? <SankeyPreview /> : <>
                <svg className="edge-layer" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <defs><marker id="arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="#a89a82" /></marker><marker id="arrowGold" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" fill="#e9c55e" /></marker></defs>
                  {visEdges.map((e) => { const a = getPos(e.from); const b = getPos(e.to); const active = e.path && toggles.vasp; return <line key={`${e.from}-${e.to}`} x1={`${a.x + 2.5}%`} y1={`${a.y}%`} x2={`${b.x - 2.5}%`} y2={`${b.y}%`} className={`edge ${e.chain} ${active ? 'active' : ''}`} markerEnd={`url(#${active ? 'arrowGold' : 'arrow'})`} strokeWidth={edgeWidth(e)} />; })}
                </svg>
                {visNodes.map((node) => {
                  const pos = getPos(node.id);
                  const dimmed = (toggles.suspicious && node.kind === 'wallet' && !node.path) || (toggles.dust && node.size === 'small');
                  const searchClass = searchLower ? (isMatch(node) ? 'search-match' : 'search-dim') : '';
                  return <GraphNode key={node.id} node={node} x={pos.x} y={pos.y} dimmed={dimmed} selected={node.id === selectedNodeId} searchClass={searchClass} expanded={expandedNodes.has(node.id)} onClick={() => handleNodeClick(node)} onDoubleClick={() => handleNodeDoubleClick(node)} />;
                })}
              </>}
            </div>
          </section>

          <aside className="panel inspector-panel">
            <div className="panel-heading"><span>G2 Node Inspector</span>{selectedNode && <button className="icon-button" onClick={() => setSelectedNodeId(null)}><X size={14} /></button>}</div>
            <div className="inspector-content">
              {selectedNode ? (
                <>
                  <div className="inspector-hero"><div className="inspector-node" data-kind={selectedNode.kind}>{iconFor(selectedNode)}</div><div><div className="inspector-title">{selectedNode.label} <CopyIcon /></div><div className="address-chip">{selectedNode.address || selectedNode.label} <ExternalLink size={12} /></div></div><ExternalLink className="inspector-external" size={14} /></div>
                  <div className="status-row">
                    <NodeBadges node={selectedNode} />
                  </div>
                  <div className="detail-list"><Detail label="Balance (USD)" value={selectedNode.balance} strong /><Detail label="First seen" value={selectedNode.firstSeen} /><Detail label="Last seen" value={selectedNode.lastSeen} /></div>
                  <div className="counterparties"><h3>Top counterparties</h3>
                    {(showAllCp ? selectedNode.counterparties : selectedNode.counterparties.slice(0, 3)).map((cp) => <Counterparty key={cp.address} address={cp.address} value={cp.value} color={cp.color} onClick={() => selectByAddress(cp.address)} />)}
                    {selectedNode.counterparties.length > 3 && <button className="more-link" onClick={() => setShowAllCp(!showAllCp)}>{showAllCp ? 'Show less' : `+${selectedNode.counterparties.length - 3} more`}</button>}
                  </div>
                  <div className="confidence"><div className="section-label"><span>Confidence score</span><strong>{selectedNode.confidence}%</strong></div><div className="confidence-track"><span style={{ width: `${selectedNode.confidence}%` }} /></div></div>
                  <div className="labels"><h3>Labels</h3><div>{selectedNode.labels.map((l) => <span key={l}>{l}</span>)}</div></div>
                  <div className="inspector-actions"><button className="gold-button" onClick={() => showToast(`Opening profile for ${selectedNode.label}...`)}><UserRound size={14} />Open profile</button><button className={`dark-button ${watched ? 'watched' : ''}`} onClick={() => { setWatched(!watched); showToast(watched ? 'Removed from watchlist' : 'Added to watchlist'); }}><Eye size={14} />{watched ? 'Watching' : 'Watch'}</button></div>
                </>
              ) : (
                <div className="inspector-empty"><Eye size={40} /><p>Select a node in the graph to inspect its details</p></div>
              )}
            </div>
          </aside>
        </section>

        <div className="replay-bar">
          <div className="transport">
            <button className="transport-primary" onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? <Pause size={13} /> : <Play size={13} />}{isPlaying ? 'Pause' : 'Play'}</button>
            <button onClick={stepBack}><StepBack size={13} />Step Back</button>
            <button onClick={stepForward}><StepForward size={13} />Step Forward</button>
          </div>
          <div className="speed-control"><span>Speed</span><button className={speed === 1 ? 'active' : ''} onClick={() => setSpeed(1)}>1×</button><button className={speed === 5 ? 'active' : ''} onClick={() => setSpeed(5)}>5×</button><button className={speed === 20 ? 'active' : ''} onClick={() => setSpeed(20)}>20×</button></div>
          <div className="timeline"><div className="timeline-track" onClick={handleTimelineClick}><span className="track-progress" style={{ width: `${playhead}%` }} /><i className="event blue" /><i className="event red" /><i className="event purple" /><i className="event teal" /><i className="playhead" style={{ left: `${playhead}%` }} /></div><div className="time-labels"><span>12:00</span><span>12:30</span><span>13:00</span><span>13:30</span><span>14:00</span></div></div>
          <span className="replay-time">{timeStr}</span>
          <div className={`live-status ${isLive ? '' : 'off'}`} onClick={() => setIsLive(!isLive)}><span />{isLive ? 'Live' : 'Paused'}</div>
        </div>
        {toast && <div className="toast"><Sparkles size={14} />{toast}</div>}
        <div className="desk-evidence">EVIDENCE</div><div className="desk-pen" /><div className="desk-seal"><Eye size={28} /></div>
      </main>
    </>
  );
}

function GraphNode({ node, x, y, dimmed, selected, searchClass, expanded, onClick, onDoubleClick }: {
  node: GraphNode; x: number; y: number; dimmed: boolean; selected: boolean; searchClass: string; expanded: boolean; onClick: () => void; onDoubleClick: () => void;
}) {
  return <div className={`graph-node ${node.kind} ${node.size ?? 'medium'} ${node.path ? 'on-path' : ''} ${dimmed ? 'dimmed' : ''} ${selected ? 'selected' : ''} ${searchClass}`} style={{ left: `${x}%`, top: `${y}%`, filter: expanded ? 'brightness(1.15)' : undefined }} onClick={onClick} onDoubleClick={onDoubleClick} title="Click to inspect · Double-click to expand"><div className="node-orb">{iconFor(node)}</div><div className="node-caption"><strong>{node.label}</strong>{node.address && <small>{node.address}</small>}</div></div>;
}

function ToggleRow({ label, value, onClick }: { label: string; value: boolean; onClick: () => void }) { return <button className="toggle-row" onClick={onClick}><span>{label}</span><span className={`toggle ${value ? 'on' : ''}`}><i /></span></button>; }
function LegendDot({ color, label }: { color: string; label: string }) { return <div className="legend-item"><i className={`legend-dot ${color}`} />{label}</div>; }
function Detail({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) { return <div className="detail-row"><span>{label}</span><strong className={strong ? 'amount' : ''}>{value}</strong></div>; }
function Counterparty({ address, value, color, onClick }: { address: string; value: string; color: string; onClick?: () => void }) { return <div className={`counterparty ${onClick ? 'clickable' : ''}`} onClick={onClick}><span><i className={`counter-dot ${color}`} />{address}</span><strong>{value}</strong></div>; }
function CopyIcon() { return <span className="copy-icon"><FileText size={11} /></span>; }
function SankeyPreview() { return <div className="sankey-message"><Layers3 size={38} /><strong>Sankey view</strong><span>Victim → suspect cluster → intermediaries → VASPs / mixers</span><small>Switch back to Graph to inspect individual transactions.</small></div>; }

function NodeBadges({ node }: { node: GraphNode }) {
  const badges: Array<{ text: string; cls: string; icon: React.ReactNode }> = [];
  const kindMap: Record<NodeKind, { text: string; cls: string }> = {
    vasp: { text: 'VASP_HOT', cls: 'green' }, victim: { text: 'Victim', cls: 'blue' },
    suspect: { text: 'Suspect', cls: 'red' }, sanctioned: { text: 'Sanctioned', cls: 'red' },
    mixer: { text: 'Mixer', cls: 'purple' }, bridge: { text: 'Bridge', cls: 'green' },
    dex: { text: 'DEX', cls: 'orange' }, wallet: { text: 'Wallet', cls: 'gray' },
  };
  const k = kindMap[node.kind];
  badges.push({ text: k.text, cls: k.cls, icon: <Sparkles size={12} /> });
  if (node.risk === 'high') badges.push({ text: 'High Risk', cls: 'red', icon: <ShieldAlert size={12} /> });
  if (node.risk === 'medium') badges.push({ text: 'Medium Risk', cls: 'orange', icon: <ShieldAlert size={12} /> });
  return <>{badges.map((b) => <span key={b.text} className={`status-badge ${b.cls}`}>{b.icon} {b.text}</span>)}</>;
}

export default Fundgraph;
