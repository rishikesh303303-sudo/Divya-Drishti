import {
  Bell, ChevronDown, ChevronLeft, ChevronRight, CircleAlert, Clock3, Copy,
  DatabaseZap, Eye, FileUp, Link2, ListFilter, LoaderCircle, MapPin, MoreVertical,
  Plus, RefreshCw, Search, ShieldCheck, Sparkles, TriangleAlert, X,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import backgroundImage from "../../assets/background.png";
import logo from "../../assets/logo.png";



type Row = {
  id: string; fraud: string; state: string; loss: string; wallet: string;
  chains: string[]; status: string; linked: number; risk: number;
};

const rows: [Row, ...Row[]] = [
  { id: "CN-2025-0147", fraud: "Investment Scam", state: "Maharashtra", loss: "₹48,70,000", wallet: "0x7a3e...9f2c", chains: ["ETH", "BSC", "+1"], status: "Open", linked: 46, risk: 82 },
  { id: "CN-2025-0138", fraud: "Romance Scam", state: "Delhi", loss: "₹32,40,000", wallet: "1f6d3...4c9e", chains: ["TRON", "POLY", "+1"], status: "In Progress", linked: 12, risk: 67 },
  { id: "CN-2025-0129", fraud: "Job Fraud", state: "Uttar Pradesh", loss: "₹18,25,000", wallet: "3f87f2...e11a", chains: ["ETH", "BTC", "+1"], status: "New", linked: 8, risk: 54 },
  { id: "CN-2025-0116", fraud: "KYC Fraud", state: "Bihar", loss: "₹9,80,000", wallet: "4a9c6...2d7f", chains: ["BSC", "POLY"], status: "Open", linked: 3, risk: 41 },
  { id: "CN-2025-0108", fraud: "Trading Fraud", state: "Gujarat", loss: "₹7,15,000", wallet: "7e2b1...9f6d", chains: ["ETH", "SOL"], status: "Closed", linked: 7, risk: 28 },
  { id: "CN-2025-0097", fraud: "Wallet Drain", state: "Tamil Nadu", loss: "₹3,40,000", wallet: "5c8d4...1a9e", chains: ["TRON", "BSC"], status: "In Progress", linked: 15, risk: 73 },
  { id: "CN-2025-0089", fraud: "Ponzi Scheme", state: "Gujarat", loss: "₹2,10,000", wallet: "9f3a2...6b7c", chains: ["ETH", "POLY"], status: "New", linked: 5, risk: 36 },
];

const fraudOptions = ["All", "Investment Scam", "Romance Scam", "Job Fraud", "KYC Fraud", "Trading Fraud", "Wallet Drain", "Ponzi Scheme"];
const chainOptions = ["All", "Ethereum", "BSC", "Polygon", "TRON", "BTC", "SOL"];
const stateOptions = ["All", "Maharashtra", "Delhi", "Uttar Pradesh", "Bihar", "Gujarat", "Tamil Nadu"];

const chainnetraCss = String.raw`
:root {
  --background: oklch(0.12 0.025 62); --foreground: oklch(0.92 0.03 85);
  --card: oklch(0.14 0.022 60 / .9); --card-foreground: oklch(0.92 0.03 85);
  --primary: oklch(0.78 0.12 82); --primary-foreground: oklch(0.18 0.03 60);
  --secondary: oklch(0.28 0.045 58); --secondary-foreground: oklch(0.88 0.035 82);
  --muted: oklch(0.2 0.028 60); --muted-foreground: oklch(0.7 0.03 76);
  --accent: oklch(0.68 0.12 78); --accent-foreground: oklch(0.12 0.02 55);
  --destructive: oklch(0.58 0.2 32); --destructive-foreground: oklch(0.96 0.02 80);
  --border: oklch(0.61 0.1 76 / .65); --input: oklch(0.17 0.025 58); --ring: oklch(0.8 0.13 82);
  --brass: oklch(0.77 0.12 82); --brass-bright: oklch(0.89 0.11 88); --brass-dark: oklch(0.53 0.09 71);
  --glass: oklch(0.09 0.018 55 / .82); --glass-soft: oklch(0.11 0.02 60 / .7);
  --verdigris: oklch(0.7 0.15 169); --vermilion: oklch(0.63 0.22 31); --plum: oklch(0.57 0.13 315); --cyan: oklch(0.72 0.13 222);
}

.chainnetra {min-width: 1180px; height: 100vh; min-height: 720px; overflow: hidden; padding: 28px 16px 12px; position: relative; background-image: linear-gradient(110deg, oklch(0.17 0.055 68 / .22), oklch(0.05 0.012 55 / .55) 58%), var(--desk-image); background-size: cover; background-position: center; }
.chainnetra::after { content:""; pointer-events:none; position:absolute; inset:0; opacity:.15; background-image: repeating-linear-gradient(0deg, transparent 0 2px, oklch(0.93 0.08 86 / .035) 3px, transparent 4px); mix-blend-mode: overlay; }
.topbar { height: 90px; display:flex; align-items:flex-start; justify-content:space-between; position:relative; z-index:2; }
.brand-block { padding: 1px 8px; text-shadow: 0 2px 8px oklch(0.04 0.01 50); }
.brand { display:flex; gap:8px; align-items:center; color:var(--brass-bright); font-family:serif; font-size:18px; font-weight:700; }
.brand svg { filter: drop-shadow(0 0 6px oklch(0.75 0.15 80 / .5)); }
.brand-block h1 { margin:2px 0 1px; font-family:var(--font-display); font-size:32px; line-height:1; letter-spacing:0; font-weight:700; }
.brand-block p { margin:8px 0 0; color:var(--muted-foreground); font-size:12px; }.brand-block p i{color:var(--brass);padding:0 8px;font-style:normal}
.top-actions { display:flex; gap:10px; align-items:center; }
.slot { min-height:38px; display:flex; align-items:center; gap:9px; border:1px solid oklch(0.57 0.09 74 / .65); border-radius:8px; padding:0 12px; background:oklch(0.075 0.015 55 / .9); box-shadow: inset 4px 4px 12px oklch(0.025 0.005 50 / .95), inset -1px -1px 0 oklch(0.77 0.11 82 / .28), 0 1px 0 oklch(0.77 0.11 82 / .12); }
.slot input { width:100%; border:0; outline:0; color:var(--foreground); background:transparent; font-size:12px; }.slot input::placeholder{color:oklch(0.65 0.025 75)}
.global-search{width:390px}.global-search kbd{color:var(--muted-foreground);border-left:1px solid var(--border);padding-left:10px}
.icon-key,.profile,.row-actions button,.drawer-head button { border:1px solid oklch(0.56 0.08 72 / .55); background:linear-gradient(145deg,oklch(0.18 0.025 60),oklch(0.09 0.018 55)); box-shadow:inset 0 1px 0 oklch(0.8 0.12 84 / .2),0 3px 6px oklch(0.05 0.015 55 / .6); cursor:pointer; }
.icon-key{width:40px;height:40px;border-radius:8px;display:grid;place-items:center;position:relative}.icon-key span{position:absolute;right:6px;top:6px;width:6px;height:6px;border-radius:50%;background:var(--vermilion)}
.profile{height:40px;border-radius:8px;display:flex;align-items:center;gap:9px;padding:0 10px}.profile b{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:oklch(0.9 0.07 88);color:oklch(0.2 0.03 60)}.profile span{font-weight:600;font-size:12px}
.workspace { height:calc(100vh - 118px); min-height:584px; display:grid; grid-template-columns:minmax(0,1fr) clamp(390px,26vw,490px); gap:14px; position:relative; z-index:1; }
.left-workspace { min-width:0; display:grid; grid-template-rows:72px 98px minmax(0,1fr) 48px; gap:10px; }
.glass { border:1px solid oklch(0.64 0.1 76 / .58); background:linear-gradient(135deg,oklch(0.15 0.022 60 / .87),oklch(0.07 0.012 52 / .91)); box-shadow:inset 0 1px 0 oklch(0.9 0.12 88 / .11), 7px 8px 17px oklch(0.04 0.012 50 / .68); backdrop-filter:blur(8px); }
.connector-strip{justify-self:end;width:56%;min-width:590px;border-radius:8px;display:flex;align-items:center;padding:10px 12px;gap:26px}.connector{display:flex;align-items:center;gap:13px;min-width:170px}.connector strong{display:block;font-size:12px}.connector em{font-style:normal;color:var(--verdigris);font-weight:500;font-size:11px;margin-left:7px}.connector small{display:block;color:var(--muted-foreground);font-size:10px;margin-top:5px}.status-lamp{width:12px;height:12px;border-radius:50%;background:var(--verdigris);box-shadow:0 0 12px var(--verdigris);animation:pulse 2.2s ease-in-out infinite}.divider{height:30px;width:1px;background:oklch(0.7 0.05 80 / .5)}.connector-strip .key{margin-left:auto}
.key{height:36px;display:inline-flex;align-items:center;justify-content:center;gap:7px;white-space:nowrap;border-radius:6px;padding:0 13px;font-size:11px;font-weight:600;cursor:pointer;border:1px solid oklch(0.59 0.09 76 / .55);transition:transform .15s,filter .15s;box-shadow:inset 0 1px 0 oklch(0.9 0.1 88 / .15),0 4px 0 oklch(0.11 0.025 55),0 7px 9px oklch(0.04 0.01 50 / .65)}.key:hover{filter:brightness(1.14);transform:translateY(-1px)}.key:active{transform:translateY(2px);box-shadow:inset 0 1px 0 oklch(0.9 0.1 88 / .1),0 2px 0 oklch(0.11 0.025 55)}
.key-walnut{background:linear-gradient(145deg,oklch(0.24 0.045 61),oklch(0.12 0.027 55));color:var(--foreground)}.key-brass{background:linear-gradient(155deg,var(--brass-bright),var(--brass) 48%,var(--brass-dark));color:oklch(0.17 0.035 60);border-color:oklch(0.91 0.1 89);box-shadow:inset 0 2px 1px oklch(0.97 0.06 92 / .7),0 4px 0 oklch(0.42 0.08 68),0 8px 12px oklch(0.06 0.02 50 / .8)}.key-danger{color:oklch(0.73 0.2 30);border-color:oklch(0.54 0.2 30);background:linear-gradient(145deg,oklch(0.19 0.05 32),oklch(0.1 0.025 45))}
.toolbar{border-radius:8px;padding:11px;display:grid;grid-template-columns:minmax(220px,1.7fr) repeat(5,minmax(82px,.55fr)) 108px 132px;gap:8px;align-items:start}.complaint-search{height:44px}.select-slot{position:relative;height:44px;border:1px solid oklch(0.57 0.09 74 / .65);border-radius:7px;background:oklch(0.075 0.015 55 / .88);box-shadow:inset 3px 4px 9px oklch(0.025 0.005 50 / .9),inset -1px -1px 0 oklch(0.77 0.11 82 / .25);padding:5px 22px 3px 10px;display:flex;flex-direction:column}.select-slot span{font-size:9px;color:var(--muted-foreground)}.select-slot select{appearance:none;width:100%;border:0;outline:0;background:transparent;color:var(--foreground);font-size:11px;padding:2px 0}.select-slot svg{position:absolute;right:6px;bottom:7px;color:var(--brass)}.select-slot option{background:oklch(0.13 0.025 58)}.toolbar>.key{height:44px}.toolbar-ctas{display:flex;flex-direction:column;gap:7px}.toolbar-ctas .key{height:35px;padding:0 9px}
.table-panel{border-radius:8px;min-height:0;display:flex;flex-direction:column;overflow:hidden}.table-scroll{min-height:0;flex:1;overflow:auto}.table-panel table{width:100%;border-collapse:collapse;table-layout:auto}.table-panel thead{position:sticky;top:0;z-index:2;background:oklch(0.085 0.018 56 / .98)}.table-panel th{height:41px;text-align:left;padding:0 8px;color:oklch(0.78 0.025 78);font-size:10px;font-weight:600;white-space:nowrap;border-bottom:1px solid oklch(0.53 0.08 72 / .35)}.table-panel td{height:47px;padding:0 8px;font-size:10px;white-space:nowrap;border-bottom:1px solid oklch(0.42 0.05 65 / .24)}.table-panel tbody tr{transition:background .15s,box-shadow .15s;cursor:pointer}.table-panel tbody tr:hover{background:oklch(0.52 0.09 76 / .09);box-shadow:inset 3px 0 var(--brass)}.table-panel tbody tr.active-row{background:linear-gradient(90deg,oklch(0.55 0.11 78 / .17),transparent 72%);box-shadow:inset 3px 0 var(--brass)}
input[type="checkbox"]{appearance:none;width:16px;height:16px;border:1px solid var(--brass);border-radius:3px;background:oklch(0.08 0.015 55);display:inline-grid;place-content:center;box-shadow:inset 2px 2px 4px oklch(0.02 0 0)}input[type="checkbox"]:checked::after{content:"✓";font-size:12px;font-weight:800;color:oklch(0.16 0.03 60)}input[type="checkbox"]:checked{background:linear-gradient(var(--brass-bright),var(--brass))}
.mono{font-family:var(--font-mono);font-size:.94em}.strong{font-weight:600;color:oklch(0.91 0.025 84)}.fraud,.status,.chain,.multi{display:inline-flex;align-items:center;gap:4px;border:1px solid;border-radius:999px;padding:4px 7px;font-size:9px}.fraud{border-color:oklch(0.61 0.17 34 / .8);background:oklch(0.35 0.12 32 / .55);color:oklch(0.91 0.06 53)}.fraud-kyc,.fraud-wallet{border-color:oklch(0.66 0.13 76);background:oklch(0.34 0.09 73 / .55)}.fraud-trading{border-color:oklch(0.56 0.14 165);background:oklch(0.3 0.1 166 / .55)}
.address{display:inline-flex;align-items:center;gap:5px;color:oklch(0.74 0.06 221)}.chain-list{display:flex;gap:3px}.chain{padding:3px 6px;border-color:oklch(0.5 0.06 72 / .55);background:oklch(0.18 0.03 62);font-family:var(--font-mono)}.chain-eth{color:oklch(0.83 0.12 237);background:oklch(0.27 0.12 246 / .55)}.chain-bsc,.chain-btc{color:oklch(0.86 0.14 79);background:oklch(0.28 0.09 76 / .65)}.chain-poly{color:oklch(0.82 0.15 310);background:oklch(0.27 0.11 310 / .55)}.chain-tron{color:oklch(0.86 0.14 33);background:oklch(0.3 0.13 30 / .55)}.chain-sol{color:var(--verdigris)}
.status{border-color:oklch(0.6 0.08 75 / .6);background:oklch(0.25 0.04 65 / .5)}.status-open{color:oklch(0.9 0.13 85);background:oklch(0.42 0.12 76 / .6)}.status-in-progress{color:oklch(0.8 0.1 225);background:oklch(0.28 0.08 228 / .6)}.status-closed{color:oklch(0.76 0.03 78);background:oklch(0.25 0.02 70 / .7)}.linked{border:0;background:transparent;color:var(--cyan);font-weight:700;font-size:10px;cursor:pointer}
.risk-gauge{--gauge:var(--verdigris);width:40px;height:32px;position:relative;display:grid;place-items:center;border-radius:50%;background:conic-gradient(from 225deg,var(--gauge) 0deg,min(var(--risk),270deg),oklch(0.3 0.03 65) min(var(--risk),270deg) 270deg,transparent 270deg);clip-path:polygon(0 0,100% 0,100% 83%,0 83%)}.risk-gauge::before{content:"";position:absolute;inset:4px;background:oklch(0.095 0.018 56);border-radius:50%}.risk-gauge div{position:relative;text-align:center;line-height:1}.risk-gauge strong{font-family:var(--font-mono);font-size:11px}.risk-high{--gauge:oklch(0.77 0.17 67)}.risk-critical{--gauge:var(--vermilion)}.risk-low{--gauge:var(--verdigris)}
.row-actions{display:flex;gap:3px}.row-actions button,.drawer-head button{width:25px;height:25px;border:0;background:transparent;box-shadow:none;display:grid;place-items:center;border-radius:4px}.row-actions button:hover{color:var(--brass)}
.table-footer{height:39px;display:flex;align-items:center;justify-content:space-between;padding:0 13px;font-size:10px;color:var(--muted-foreground);background:oklch(0.08 0.015 55 / .9);border-top:1px solid oklch(0.52 0.08 70 / .38)}.pagination{display:flex;align-items:center;gap:5px}.pagination button{width:27px;height:27px;border:1px solid transparent;border-radius:5px;background:transparent;color:var(--foreground);font-size:10px}.pagination button.current{color:var(--brass-bright);border-color:var(--brass-dark);background:oklch(0.34 0.08 71 / .55);box-shadow:inset 0 1px oklch(0.9 0.12 85 / .2)}.empty{height:120px;display:grid;place-content:center;justify-items:center;gap:8px;color:var(--muted-foreground);font-size:12px}
.bulk-bar{border-radius:7px;display:flex;align-items:center;gap:12px;padding:5px 12px}.bulk-bar>span{display:flex;align-items:center;gap:9px;margin-right:10px;font-size:11px}.bulk-bar .key{height:32px}.bulk-bar .key-danger{margin-left:8px}
.drawer{border-radius:10px;display:flex;flex-direction:column;min-height:0;overflow:hidden;border-color:oklch(0.46 0.07 69 / .65);box-shadow:inset 0 1px 0 oklch(0.9 0.12 88 / .12),-10px 8px 24px oklch(0.03 0.01 50 / .75)}.drawer-head{height:53px;display:flex;align-items:center;justify-content:space-between;padding:0 16px;border-bottom:1px solid oklch(0.46 0.07 69 / .35)}.drawer-head h2{font-size:16px;margin:0}.case-head{min-height:136px;padding:13px 16px;display:flex;justify-content:space-between;gap:8px}.case-id{display:flex;align-items:center;gap:10px}.case-id strong{font-family:var(--font-mono);font-size:13px}.case-id span{font-size:9px;color:oklch(0.9 0.08 45);background:oklch(0.33 0.13 31 / .7);padding:4px 7px;border-radius:99px}.case-head h3{margin:8px 0;font-size:14px}.case-head p{display:flex;align-items:center;gap:5px;margin:0;color:var(--muted-foreground);font-size:9px}.case-head p i{font-style:normal;color:var(--brass-dark);padding:0 2px}.quick{display:flex;gap:8px;margin-top:12px}.quick .key{height:29px;border-radius:99px}.dot{width:7px;height:7px;border-radius:50%;background:var(--brass)}
.risk-large{width:66px;height:61px;margin-top:25px}.risk-large::before{inset:6px}.risk-large strong{font-size:20px;color:var(--vermilion)}.risk-large small{display:block;font-size:8px;color:var(--muted-foreground);margin-top:4px}.tabs{height:39px;display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px solid oklch(0.46 0.07 69 / .4)}.tabs button{position:relative;border:0;background:transparent;color:var(--muted-foreground);font-size:10px;cursor:pointer}.tabs button.active{color:var(--brass-bright);font-weight:700}.tabs button.active::after{content:"";height:2px;background:var(--brass);position:absolute;bottom:0;left:10px;right:10px;box-shadow:0 0 6px oklch(0.8 0.12 84 / .6)}
.drawer-content{flex:1;min-height:0;overflow:auto;padding:10px 12px;display:flex;flex-direction:column;gap:9px}.detail-card{padding:11px;border:1px solid oklch(0.58 0.09 75 / .55);border-radius:7px;background:oklch(0.12 0.02 58 / .77);box-shadow:inset 0 1px 0 oklch(0.88 0.1 87 / .09)}.detail-card h4{display:flex;align-items:center;gap:6px;margin:0 0 7px;color:oklch(0.9 0.045 83);font-size:11px}.detail-card h4 svg{color:var(--brass)}.detail-card>p{font-size:10px;line-height:1.55;color:oklch(0.75 0.03 78);margin:0}.rule{height:1px;background:oklch(0.43 0.06 68 / .4);margin:9px -11px}.detail-card label{display:block;color:var(--muted-foreground);font-size:9px;margin:8px 0 5px}.wallet-line{display:flex;align-items:center;gap:6px}.wallet-line .address{font-size:9px}.wallet-line .multi{font-size:8px;color:oklch(0.78 0.06 218);border-color:oklch(0.43 0.08 220)}.wallet-line .key{margin-left:auto;height:27px;font-size:9px;padding:0 8px}.detected{display:flex;gap:6px}.detected .chain{font-size:9px;padding:4px 7px}
.card-title{display:flex;justify-content:space-between;align-items:center}.card-title button,.cluster button{border:0;background:transparent;color:var(--brass);font-size:9px;display:flex;align-items:center}.probe h5{margin:7px 0 5px;font-size:10px}.probe table{width:100%;border-collapse:collapse}.probe th,.probe td{font-size:8px;text-align:right;padding:4px 2px;border-bottom:1px solid oklch(0.42 0.05 65 / .28)}.probe th:first-child,.probe td:first-child{text-align:left}.probe tbody tr:last-child td{border:0}.cluster{min-height:47px;border:1px solid oklch(0.61 0.12 76 / .55);border-radius:7px;background:oklch(0.25 0.07 73 / .35);display:flex;align-items:center;gap:9px;padding:7px 10px}.cluster svg{color:var(--brass)}.cluster div{display:flex;flex-direction:column;gap:3px}.cluster strong{font-size:10px;color:var(--brass-bright)}.cluster span{font-size:8px;color:var(--muted-foreground)}.cluster button{margin-left:auto}.trace-wrap{padding:10px 12px 13px;border-top:1px solid oklch(0.46 0.07 69 / .35)}.trace{width:100%;height:45px!important;font-size:13px}.progress{height:3px;background:oklch(0.25 0.04 65);margin-top:7px;overflow:hidden}.progress i{display:block;height:100%;width:55%;background:var(--brass);animation:progress 2.2s ease-out}.tab-placeholder{flex:1;display:grid;place-content:center;justify-items:center;gap:8px;color:var(--muted-foreground);font-size:11px}.tab-placeholder strong{color:var(--brass);font-size:14px}
.modal-backdrop{position:fixed;inset:0;z-index:20;display:grid;place-items:center;background:oklch(0.03 0.01 50 / .76);backdrop-filter:blur(5px)}.modal{position:relative;width:430px;padding:28px;border-radius:9px;text-align:center;animation:modalIn .25s ease-out}.modal-close{position:absolute;right:12px;top:12px;border:0;background:transparent;color:var(--muted-foreground)}.modal-icon{width:46px;height:46px;margin:auto;display:grid;place-items:center;border:1px solid var(--brass);color:var(--brass);border-radius:50%;background:oklch(0.3 0.08 72 / .4)}.modal h2{font-family:var(--font-display);margin:12px 0 4px}.modal p{color:var(--muted-foreground);font-size:12px;margin:0 0 18px}.modal>.slot{margin-bottom:16px}.drop-zone{height:150px;border:1px dashed var(--brass-dark);border-radius:7px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px;color:var(--brass);background:oklch(0.08 0.018 55 / .6);box-shadow:inset 5px 5px 15px oklch(0.03 0.01 50)}.drop-zone span{font-size:10px;color:var(--muted-foreground)}.drop-zone input{position:absolute;opacity:0;pointer-events:none}
.spin{animation:spin 1s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{50%{opacity:.55;box-shadow:0 0 4px var(--verdigris)}}@keyframes progress{from{width:0}to{width:100%}}@keyframes modalIn{from{opacity:0;transform:translateY(18px) scale(.97)}to{opacity:1;transform:none}}
@media (max-height:820px){.topbar{height:93px}.workspace{height:calc(100vh - 119px)}.brand-block h1{font-size:27px}.brand-block p{margin-top:5px}.left-workspace{grid-template-rows:62px 90px minmax(0,1fr) 43px}.connector-strip{padding:6px 10px}.toolbar{padding:8px}.table-panel td{height:42px}.case-head{min-height:120px;padding:9px 14px}.drawer-content{padding:7px 10px;gap:6px}.detail-card{padding:8px}.rule{margin:6px -8px}.detail-card label{margin:5px 0 3px}.trace-wrap{padding:7px 10px 10px}.trace{height:39px!important}}
`;

function KeyButton({ children, tone = "walnut", className = "", onClick }: { children: ReactNode; tone?: "brass" | "walnut" | "danger"; className?: string; onClick?: () => void }) {
  return <button type="button" className={`key key-${tone} ${className}`} onClick={onClick}>{children}</button>;
}

function SelectSlot({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return <label className="select-slot"><span>{label}</span><select value={value} onChange={(e) => onChange(e.target.value)}>{options.map((o) => <option key={o}>{o}</option>)}</select><ChevronDown size={14} /></label>;
}

function ChainChip({ chain }: { chain: string }) {
  const mark: Record<string, string> = { ETH: "◆", BSC: "⬡", POLY: "⬢", TRON: "▽", BTC: "₿", SOL: "≋" };
  return <span className={`chain chain-${chain.replace("+", "more").toLowerCase()}`}><b>{mark[chain] ?? ""}</b>{chain}</span>;
}

function RiskGauge({ value, large = false }: { value: number; large?: boolean }) {
  const tone = value >= 75 ? "critical" : value >= 50 ? "high" : "low";
  return <div className={`risk-gauge risk-${tone} ${large ? "risk-large" : ""}`} style={{ "--risk": `${value * 3.6}deg` } as React.CSSProperties}><div><strong>{value}</strong>{large && <small>Risk</small>}</div></div>;
}

export default function Complaint() {
  const [selected, setSelected] = useState<string[]>(["CN-2025-0147", "CN-2025-0129", "CN-2025-0116", "CN-2025-0097"]);
  const [active, setActive] = useState(rows[0]);
  const [query, setQuery] = useState("");
  const [fraud, setFraud] = useState("All");
  const [chain, setChain] = useState("All");
  const [state, setState] = useState("All");
  const [status, setStatus] = useState("All");
  const [risk, setRisk] = useState("All");
  const [tab, setTab] = useState("Overview");
  const [syncing, setSyncing] = useState(false);
  const [modal, setModal] = useState<"add" | "upload" | null>(null);
  const [tracing, setTracing] = useState(false);

  const filtered = useMemo(() => rows.filter((r) => {
    const q = query.toLowerCase();
    const riskMatch = risk === "All" || (risk === "Critical" && r.risk >= 80) || (risk === "High" && r.risk >= 65 && r.risk < 80) || (risk === "Medium" && r.risk >= 40 && r.risk < 65) || (risk === "Low" && r.risk < 40);
    return (!q || Object.values(r).join(" ").toLowerCase().includes(q)) && (fraud === "All" || r.fraud === fraud) && (state === "All" || r.state === state) && (status === "All" || r.status === status) && (chain === "All" || r.chains.some((c) => c === chain.slice(0, 4).toUpperCase())) && riskMatch;
  }), [query, fraud, chain, state, status, risk]);

  const toggle = (id: string) => setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
  const doSync = () => { setSyncing(true); window.setTimeout(() => setSyncing(false), 1200); };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: chainnetraCss }} />
      <main className="chainnetra" style={{ "--desk-image": `url(${backgroundImage})` } as React.CSSProperties}>
      <header className="topbar">
        <div className="brand-block">
          <div className="brand">
  <div className="brand-mark">
    <img src={logo} alt="Divya Drishti Logo" />
  </div>

  <span className="brand-name">DIVYA DRISHTI</span>
  </div>
          <h1>Complaint Inbox</h1>
          <p>Intake from NCRP/SAHYOG <i>•</i> Kick off tracing and investigation</p>
        </div>
        <div className="top-actions">
          <label className="slot global-search"><Search size={17} /><input aria-label="Global search" placeholder="Search case ID, wallet, address, or keyword..." /><kbd>/</kbd></label>
          <button className="icon-key" aria-label="Notifications"><Bell size={18} /><span /></button>
          <button className="profile"><b>R</b><span>Investigator</span><ChevronDown size={14} /></button>
        </div>
      </header>

      <div className="workspace">
        <section className="left-workspace">
          <div className="glass connector-strip">
            <div className="connector"><span className="status-lamp"/><div><strong>NCRP <em>● Connected</em></strong><small>Last sync: 2 min ago</small></div></div>
            <div className="divider" />
            <div className="connector"><span className="status-lamp"/><div><strong>SAHYOG <em>● Connected</em></strong><small>Last sync: 4 min ago</small></div></div>
            <KeyButton onClick={doSync}>{syncing ? <LoaderCircle className="spin" size={16}/> : <RefreshCw size={16}/>} {syncing ? "Syncing" : "Sync now"}</KeyButton>
          </div>

          <section className="toolbar glass">
            <label className="slot complaint-search"><Search size={17}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by ack no., wallet, address, or keyword..." /></label>
            <SelectSlot label="Fraud type" options={fraudOptions} value={fraud} onChange={setFraud}/>
            <SelectSlot label="Chain" options={chainOptions} value={chain} onChange={setChain}/>
            <SelectSlot label="State" options={stateOptions} value={state} onChange={setState}/>
            <SelectSlot label="Status" options={["All", "New", "Open", "In Progress", "Closed"]} value={status} onChange={setStatus}/>
            <SelectSlot label="Risk" options={["All", "Critical", "High", "Medium", "Low"]} value={risk} onChange={setRisk}/>
            <KeyButton><Clock3 size={15}/> Last 30 days</KeyButton>
            <div className="toolbar-ctas">
              <KeyButton tone="brass" onClick={() => setModal("add")}><Plus size={16}/> Add complaint</KeyButton>
              <KeyButton onClick={() => setModal("upload")}><FileUp size={16}/> Bulk upload CSV</KeyButton>
            </div>
          </section>

          <section className="table-panel glass">
            <div className="table-scroll">
              <table>
                <thead><tr><th><input type="checkbox" aria-label="Select all" checked={selected.length === rows.length} onChange={() => setSelected(selected.length === rows.length ? [] : rows.map((r) => r.id))}/></th><th>Ack. No.</th><th>Fraud type</th><th>State</th><th>Loss (₹)</th><th>Wallet</th><th>Detected chain(s)</th><th>Status</th><th>Linked complaints</th><th>Risk</th><th>Actions</th></tr></thead>
                <tbody>{filtered.map((r) => <tr key={r.id} className={active.id === r.id ? "active-row" : ""} onClick={() => setActive(r)}>
                  <td><input type="checkbox" aria-label={`Select ${r.id}`} checked={selected.includes(r.id)} onClick={(e) => e.stopPropagation()} onChange={() => toggle(r.id)}/></td>
                  <td className="mono strong">{r.id}</td><td><span className={`fraud fraud-${(r.fraud.split(" ")[0] ?? "other").toLowerCase()}`}><CircleAlert size={11}/>{r.fraud}</span></td>
                  <td>{r.state}</td><td className="mono strong">{r.loss}</td>
                  <td><span className="address"><span className="mono">{r.wallet}</span><Copy size={13}/></span></td>
                  <td><div className="chain-list">{r.chains.map((c) => <ChainChip chain={c} key={c}/>)}</div></td>
                  <td><span className={`status status-${r.status.toLowerCase().replace(" ", "-")}`}><span>◉</span>{r.status}</span></td>
                  <td><button className="linked">+{r.linked} linked</button></td><td><RiskGauge value={r.risk}/></td>
                  <td><div className="row-actions"><button aria-label="View"><Eye size={16}/></button><button aria-label="Trace"><RefreshCw size={16}/></button><button aria-label="More"><MoreVertical size={16}/></button></div></td>
                </tr>)}</tbody>
              </table>
              {filtered.length === 0 && <div className="empty"><ListFilter size={22}/><span>No complaints match these filters.</span></div>}
            </div>
            <footer className="table-footer"><span>Showing 1–{filtered.length} of 248 complaints</span><div className="pagination"><button><ChevronLeft size={14}/></button>{[1,2,3,4,5].map((n) => <button className={n === 1 ? "current" : ""} key={n}>{n}</button>)}<span>…</span><button>36</button><button><ChevronRight size={14}/></button></div></footer>
          </section>

          {selected.length > 0 && <div className="bulk-bar glass"><span><input type="checkbox" checked readOnly/> <b>{selected.length} selected</b></span><KeyButton><ShieldCheck size={15}/> Mark as reviewed</KeyButton><KeyButton><Sparkles size={15}/> Change status</KeyButton><KeyButton><Link2 size={15}/> Add to case</KeyButton><KeyButton tone="danger" onClick={() => setSelected([])}><X size={15}/> Delete</KeyButton></div>}
        </section>

        <aside className="drawer glass">
          <div className="drawer-head"><h2>Complaint Details</h2><button aria-label="Close details"><X size={20}/></button></div>
          <div className="case-head"><div><div className="case-id"><strong>{active.id}</strong><span>▲ High Risk</span></div><h3>{active.fraud}</h3><p><MapPin size={13}/>{active.state}<i>•</i><span className="mono">{active.loss}</span><i>•</i><Clock3 size={13}/>2 Apr 2025, 14:32</p><div className="quick"><KeyButton><span className="dot"/> {active.status}</KeyButton><KeyButton><Link2 size={14}/> +{active.linked} linked</KeyButton></div></div><RiskGauge value={active.risk} large/></div>
          <nav className="tabs">{["Overview", "Probe Result", "Related", "History"].map((t) => <button className={tab === t ? "active" : ""} onClick={() => setTab(t)} key={t}>{t}</button>)}</nav>
          <div className="drawer-content">
            {tab === "Overview" ? <>
              <section className="detail-card"><h4><ShieldCheck size={15}/> Complaint Summary</h4><p>Victim reported being lured into an investment scheme with high returns. Funds transferred to multiple wallets across different chains.</p><div className="rule"/><label>Wallet Address</label><div className="wallet-line"><span className="address mono">{active.wallet} <Copy size={13}/></span><span className="multi">♧ Multi-chain</span><KeyButton>View on Explorer</KeyButton></div><label>Detected Chains</label><div className="detected"><ChainChip chain="ETH"/><ChainChip chain="BSC"/><ChainChip chain="POLY"/><ChainChip chain="+1"/></div></section>
              <section className="detail-card probe"><div className="card-title"><h4><DatabaseZap size={15}/> Probe Result</h4><button>View full report <ChevronRight size={13}/></button></div><h5>Per-chain Activity</h5><table><thead><tr><th>Chain</th><th>Txn Count</th><th>Total In (₹)</th><th>Total Out (₹)</th><th>Last Activity</th></tr></thead><tbody>{[["Ethereum","12","28,40,000","26,20,000","2h ago"],["BSC","8","12,10,000","11,80,000","4h ago"],["Polygon","5","6,90,000","6,50,000","6h ago"],["Tron","3","3,20,000","2,10,000","8h ago"]].map((line) => <tr key={line.join("-")}>{line.map((v, i) => <td key={`${i}-${v}`} className={i > 0 ? "mono" : ""}>{v}</td>)}</tr>)}</tbody></table></section>
              <div className="cluster"><TriangleAlert size={22}/><div><strong>Duplicate / Cluster hint</strong><span>Found 4 similar complaints across 3 states</span></div><button>View cluster</button></div>
            </> : <div className="tab-placeholder"><DatabaseZap size={30}/><strong>{tab}</strong><span>Investigation evidence for {active.id}</span></div>}
          </div>
          <div className="trace-wrap"><KeyButton tone="brass" className="trace" onClick={() => { setTracing(true); window.setTimeout(() => setTracing(false), 2200); }}>{tracing ? <><LoaderCircle className="spin" size={18}/> Tracing wallets…</> : <>▷ Trace now</>}</KeyButton>{tracing && <div className="progress"><i/></div>}</div>
        </aside>
      </div>

      {modal && <div className="modal-backdrop" onMouseDown={() => setModal(null)}><section className="modal glass" onMouseDown={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setModal(null)}><X/></button>{modal === "add" ? <><div className="modal-icon"><Plus/></div><h2>Add complaint</h2><p>Enter a complaint acknowledgement number to begin intake.</p><label className="slot"><input autoFocus placeholder="NCRP / SAHYOG acknowledgement no."/></label><KeyButton tone="brass" onClick={() => setModal(null)}>Continue intake <ChevronRight size={16}/></KeyButton></> : <><div className="modal-icon"><FileUp/></div><h2>Bulk upload CSV</h2><p>Drop a validated NCRP or SAHYOG export into the carved intake slot.</p><label className="drop-zone"><FileUp size={30}/><strong>Drop CSV here</strong><span>or click to choose a file</span><input type="file" accept=".csv"/></label></>}</section></div>}
      </main>
    </>
  );
  
}
