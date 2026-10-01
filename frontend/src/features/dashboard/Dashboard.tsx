import { useMemo, useState, type ReactNode } from "react";
import backgroundImage from "../../assets/background.png";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";


import {
  Activity,
  AlertTriangle,
  Bell,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  Crosshair,
  FileText,
  Grid2X2,
  Landmark,
  LockKeyhole,
  MapPin,
  Menu,
  Network,
  Search,
  Settings,
  ShieldAlert,
  Snowflake,
  Target,
  WalletCards,
  X,
  Zap,
} from "lucide-react";

const css = `:root{
  --walnut-deep:#17100B;
  --walnut-plank:#2B1D13;
  --walnut-grain:#4A3323;
  --walnut-seam:#0E0906;
  --brass:#CFA144;
  --brass-hi:#F0CD7A;
  --brass-lo:#7A5A1C;
  --parchment:#F1E7D3;
  --muted:#B9A98D;
  --faint:#8A7B63;
  --green:#4FB39A;
  --red:#E4553F;
  --blue:#7FA0E8;
  --plum:#A57BD1;
  color:var(--parchment);
  font-family:'Instrument Sans',sans-serif;
}

*{
  box-sizing:border-box;
}

html,
body,
#root{
  min-height:100%;
}

body{
  margin:0;
  background:transparent;
}

button,
input,
select{
  font:inherit;
}

button{
  cursor:pointer;
}

/* =========================================================
   ONLY BACKGROUND IMAGE
   No gradient / texture / wood background here
   ========================================================= */

.app-shell {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: transparent;
}

.wood-board {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;

  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.lamp-glow,
.grain {
  display: none !important;
}

.main-content {
  position: relative;
  z-index: 3;
  margin-left: 264px;
  padding-right: 24px;
}


/* =========================================================
   NAVIGATION
   ========================================================= */

.nav-rail{
display: flex;
  flex-direction: column;
  overflow: hidden;
  position:fixed;
  z-index:6;
  left:24px;
  top:55px;
  bottom:55px;
  width:224px;
  padding:28px 12px 18px;
  border:1px solid rgba(207,161,68,.54);
  border-radius:22px;
  background:linear-gradient(
    145deg,
    rgba(36,24,16,.9),
    rgba(17,11,8,.92)
  );
  box-shadow:
    inset -1px 0 rgba(240,205,122,.18),
    14px 18px 40px rgba(0,0,0,.34);
  transition:width .3s ease;
}

.nav-rail.collapsed{
  width:76px;
}

.brand{
  display:flex;
  align-items:center;
  gap:10px;
  padding:0 10px 28px;
  white-space:nowrap;
}

.brand-mark{
  width:48px;
  height:48px;
  min-width:48px;
  min-height:48px;

  display:flex;
  align-items:center;
  justify-content:center;

  flex-shrink:0;
  position:relative;
  overflow:visible;
}

.brand-mark img{
  width:100px;
  height:100px;

  min-width:100px;
  min-height:100px;

  max-width:none;
  max-height:none;

  object-fit:contain;
  display:block;
}


.brand-name{
  font:650 19px/1 'Anybody';
  letter-spacing:-.04em;
}
  .collapse-button{
  margin-left:auto;
  width:30px;
  height:30px;
  display:grid;
  place-items:center;
  flex-shrink:0;
  border:1px solid rgba(207,161,68,.25);
  border-radius:8px;
  background:rgba(36,24,16,.55);
  color:var(--muted);
  transition:.2s ease;
}

.collapse-button:hover{
  color:var(--brass-hi);
  border-color:rgba(207,161,68,.55);
  background:rgba(207,161,68,.12);
}

.collapsed .collapse-button{
  margin-left:0;
}

.nav-item{
  width:100%;
  min-height:44px;
  display:flex;
  align-items:center;
  gap:13px;
  padding:0 13px;
  margin:4px 0;
  border:0;
  border-radius:10px;
  color:var(--muted);
  background:transparent;
  text-align:left;
  position:relative;
  transition:.2s ease;
}

.nav-item:hover,
.nav-item.active{
  color:var(--parchment);
  background:linear-gradient(
    90deg,
    rgba(207,161,68,.25),
    rgba(207,161,68,.06)
  );
  box-shadow:inset 0 0 0 1px rgba(207,161,68,.3);
}

.nav-item.active{
  font-weight:650;
}

.nav-item.active svg{
  color:var(--brass-hi);
}

.nav-item i{
  position:absolute;
  right:6px;
  width:3px;
  height:24px;
  border-radius:4px;
  background:var(--brass-hi);
  box-shadow:0 0 10px var(--brass);
}

.collapsed .brand-name,
.collapsed .nav-item span,
.collapsed .rail-bottom{
  display:none;
}

.collapsed .nav-item{
  justify-content:center;
  padding:0;
}

.collapsed .brand{
  padding:0 12px 28px;
}

.rail-bottom{ 
  position:relative;
  left:auto;
  right:auto;
  bottom:auto;
  margin-top:auto;
  flex-shrink:0;
}

.system-status{
  display:flex;
  gap:9px;
  align-items:flex-start;
  padding:13px 10px;
  border:1px solid rgba(241,231,211,.11);
  border-radius:10px;
  background:rgba(14,9,6,.42);
  font-size:11px;
}

.online-dot,
.live-indicator span{
  width:7px;
  height:7px;
  border-radius:50%;
  background:var(--green);
  box-shadow:0 0 9px var(--green);
  margin-top:3px;
}

.system-status strong,
.system-status small{
  display:block;
}

.system-status small{
  color:var(--faint);
  margin-top:6px;
}

.effects-control{
  display:flex;
  align-items:center;
  gap:7px;
  margin-top:12px;
  color:var(--muted);
  font-size:11px;
}

.effects-control select{
  margin-left:auto;
  background:transparent;
  border:0;
  color:var(--brass-hi);
  font-size:11px;
  outline:none;
}

.effects-control option{
  background:var(--walnut-deep);
}

.mobile-close,
.menu-button{
  display:none;
}


/* =========================================================
   TOP BAR
   ========================================================= */

.topbar{
  height:72px;
  display:flex;
  align-items:center;
  justify-content:flex-end;
  gap:12px;
  border-bottom:1px solid rgba(207,161,68,.22);
}

.topbar-search{
  width:min(370px,45vw);
  height:44px;
  display:flex;
  align-items:center;
  gap:10px;
  padding:0 14px;
  border:1px solid rgba(241,231,211,.14);
  border-radius:10px;
  background:linear-gradient(
    180deg,
    rgba(8,5,3,.92),
    rgba(20,14,9,.78)
  );
  box-shadow:
    inset 0 3px 8px rgba(0,0,0,.85),
    inset 0 1px 2px rgba(0,0,0,.7),
    inset 0 -1px 0 rgba(240,205,122,.08),
    0 1px 0 rgba(240,205,122,.06);
  transition:border-color .2s ease,box-shadow .2s ease;
}

.topbar-search:hover{
  border-color:rgba(207,161,68,.3);
}

.topbar-search:focus-within{
  border-color:rgba(207,161,68,.6);
  box-shadow:
    inset 0 3px 8px rgba(0,0,0,.85),
    inset 0 1px 2px rgba(0,0,0,.7),
    0 0 0 2px rgba(207,161,68,.35),
    0 0 14px rgba(240,205,122,.2);
}

.topbar-search svg{
  color:var(--brass-hi);
}

.topbar-search input{
  min-width:0;
  flex:1;
  color:var(--parchment);
  background:transparent;
  border:0;
  outline:0;
  font-size:11px;
}

.topbar-search input::placeholder{
  color:var(--faint);
}

kbd{
  padding:2px 6px;
  border:1px solid rgba(241,231,211,.24);
  border-radius:4px;
  color:var(--muted);
  font:11px 'JetBrains Mono';
}

.icon-button,
.profile{
  height:40px;
  border:1px solid rgba(241,231,211,.15);
  background:rgba(36,24,16,.7);
  color:var(--muted);
  border-radius:10px;
}

.icon-button{
  width:40px;
  position:relative;
}

.icon-button b{
  position:absolute;
  right:9px;
  top:8px;
  width:5px;
  height:5px;
  border-radius:50%;
  background:var(--red);
}

.profile{
  display:flex;
  align-items:center;
  gap:9px;
  padding:0 11px 0 6px;
  font-size:11px;
}

.profile span{
  display:grid;
  place-items:center;
  width:27px;
  height:27px;
  border-radius:50%;
  background:var(--brass);
  color:var(--walnut-deep);
  font-weight:700;
}

.profile strong{
  font-weight:500;
}


/* =========================================================
   PAGE HEADING
   ========================================================= */

.page-heading{
  display:flex;
  align-items:end;
  justify-content:space-between;
  padding:26px 2px 22px;
}

.page-heading h1{
  font:660 32px/1 'Anybody';
  letter-spacing:-.055em;
  margin:0;
}

.page-heading p{
  margin:8px 0 0;
  color:var(--muted);
  font-size:13px;
}

.page-heading p span{
  color:var(--brass);
}

.live-indicator{
  font:11px 'JetBrains Mono';
  color:var(--green);
  display:flex;
  gap:7px;
  align-items:center;
}


/* =========================================================
   KPI
   ========================================================= */

.kpi-grid{
  display:grid;
  grid-template-columns:repeat(5,1fr);
  gap:14px;
}

.kpi-card,
.panel{
  border:1px solid rgba(207,161,68,.58);
  background:linear-gradient(
    145deg,
    rgba(36,24,16,.87),
    rgba(14,10,7,.9)
  );
  box-shadow:
    inset 0 1px rgba(240,205,122,.12),
    0 10px 28px rgba(0,0,0,.28);
  border-radius:13px;
}

.kpi-card{
  height:90px;
  padding:14px;
  display:flex;
  gap:11px;
  position:relative;
  overflow:hidden;
}

.kpi-icon{
  width:35px;
  height:35px;
  display:grid;
  place-items:center;
  border:1px solid var(--brass-lo);
  border-radius:50%;
  color:var(--brass-hi);
  background:rgba(122,90,28,.22);
  flex:0 0 auto;
}

.kpi-copy>span{
  display:block;
  color:var(--muted);
  font-size:10px;
  white-space:nowrap;
}

.kpi-copy>div{
  display:flex;
  align-items:baseline;
  gap:8px;
  margin-top:7px;
}

.kpi-copy strong{
  font:620 19px/1 'Anybody';
  letter-spacing:-.04em;
  white-space:nowrap;
}

.delta{
  font:600 10px 'JetBrains Mono';
  color:var(--green);
  font-style:normal;
}

.rupee{
  font:600 23px 'Anybody';
}

.sparkline{
  position:absolute;
  right:8px;
  bottom:8px;
  width:72px;
  height:24px;
  opacity:.7;
}

.sparkline path{
  fill:none;
  stroke-width:1.7;
}

.sparkline.green path{
  stroke:var(--green);
}

.sparkline.cyan path{
  stroke:#44a8a5;
}

.sparkline.brass path{
  stroke:var(--brass);
}


/* =========================================================
   MAIN GRID
   ========================================================= */

.main-grid{
  display:grid;
  grid-template-columns:minmax(0,2.2fr) minmax(300px,1fr);
  gap:14px;
  margin-top:15px;
}

.queue-panel,
.alerts-panel{
  height:400px;
}

.panel-header{
  height:57px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:0 17px;
  border-bottom:1px solid rgba(241,231,211,.1);
}

.panel-header.compact{
  height:48px;
}

.panel-title{
  display:flex;
  align-items:center;
  gap:10px;
}

.panel-title>span{
  display:grid;
  place-items:center;
  color:var(--brass-hi);
}

.panel-title h2{
  font-size:15px;
  line-height:1.1;
  margin:0;
  font-weight:650;
}

.panel-title p{
  font-size:10px;
  color:var(--muted);
  margin:4px 0 0;
}


/* =========================================================
   BUTTONS
   ========================================================= */

.key-button{
  min-height:30px;
  display:inline-flex;
  align-items:center;
  gap:5px;
  border:0;
  border-radius:8px;
  padding:0 12px;
  position:relative;
  background:linear-gradient(
    180deg,
    #EBC978 0%,
    #CFA144 55%,
    #B8892F 100%
  );
  box-shadow:
    inset 0 1px 0 rgba(255,240,200,.5),
    inset 0 -1px 0 rgba(92,66,19,.4),
    0 3px 0 #5C4213,
    0 4px 6px rgba(0,0,0,.4);
  color:#17100B;
  font-size:10px;
  font-weight:600;
  letter-spacing:.01em;
  transition:transform .12s ease,box-shadow .12s ease;
}

.key-button.secondary{
  background:linear-gradient(
    180deg,
    #5A4028 0%,
    #3A281A 100%
  );
  box-shadow:
    inset 0 1px 0 rgba(240,205,122,.15),
    inset 0 -1px 0 rgba(14,9,6,.5),
    0 3px 0 #1E130B,
    0 4px 6px rgba(0,0,0,.4);
  color:var(--parchment);
}

.key-button:hover{
  transform:translateY(-1px);
  box-shadow:
    inset 0 1px 0 rgba(255,240,200,.55),
    inset 0 -1px 0 rgba(92,66,19,.4),
    0 4px 0 #5C4213,
    0 6px 10px rgba(0,0,0,.45),
    0 0 12px rgba(240,205,122,.25);
}

.key-button.secondary:hover{
  box-shadow:
    inset 0 1px 0 rgba(240,205,122,.2),
    inset 0 -1px 0 rgba(14,9,6,.5),
    0 4px 0 #1E130B,
    0 6px 10px rgba(0,0,0,.45),
    0 0 10px rgba(207,161,68,.2);
  color:var(--brass-hi);
}

.key-button:active{
  transform:translateY(3px);
  box-shadow:
    inset 0 1px 0 rgba(255,240,200,.4),
    0 0 0 #5C4213,
    0 1px 2px rgba(0,0,0,.4);
}

.key-button.secondary:active{
  box-shadow:
    inset 0 1px 0 rgba(240,205,122,.12),
    0 0 0 #1E130B,
    0 1px 2px rgba(0,0,0,.4);
}

.key-button:focus-visible{
  outline:2px solid var(--walnut-deep);
  outline-offset:1px;
  box-shadow:
    inset 0 1px 0 rgba(255,240,200,.5),
    0 3px 0 #5C4213,
    0 0 0 3px var(--brass-hi),
    0 4px 6px rgba(0,0,0,.4);
}

.key-button.secondary:focus-visible{
  box-shadow:
    inset 0 1px 0 rgba(240,205,122,.15),
    0 3px 0 #1E130B,
    0 0 0 3px var(--brass-hi),
    0 4px 6px rgba(0,0,0,.4);
}


/* =========================================================
   TABLE
   ========================================================= */

.table-wrap{
  height:calc(100% - 57px);
  overflow:auto;
}

.table-head,
.table-row{
  display:grid;
  grid-template-columns:
    1.1fr
    .76fr
    1fr
    1.18fr
    1.62fr
    .9fr
    .62fr;
  align-items:center;
  min-width:800px;
  padding:0 16px;
  column-gap:11px;
}

.table-head{
  position:sticky;
  top:0;
  z-index:2;
  height:31px;
  background:rgba(23,16,11,.96);
  color:var(--muted);
  font-size:9px;
}

.table-row{
  height:44px;
  border-bottom:1px solid rgba(241,231,211,.08);
  font-size:10px;
  position:relative;
  transition:background .18s ease;
}

.table-row:hover,
.table-row.selected{
  background:rgba(207,161,68,.09);
}

.table-row:hover:before,
.table-row.selected:before{
  content:'';
  position:absolute;
  left:0;
  top:0;
  bottom:0;
  width:2px;
  background:var(--brass-hi);
}

.mono{
  font:10px 'JetBrains Mono';
  font-variant-numeric:tabular-nums;
}


/* =========================================================
   BADGES
   ========================================================= */

.badge{
  display:inline-flex;
  align-items:center;
  gap:4px;
  padding:4px 7px;
  border-radius:12px;
  font-size:9px;
  line-height:1;
  color:var(--parchment);
  white-space:nowrap;
  border:1px solid rgba(241,231,211,.17);
}

.risk-critical,
.severity-critical{
  background:rgba(185,58,40,.62);
  border-color:var(--red);
}

.risk-high,
.severity-high{
  background:rgba(185,58,40,.43);
  border-color:#d36b39;
}

.risk-medium,
.severity-medium{
  background:rgba(122,90,28,.65);
  border-color:var(--brass);
}

.risk-low,
.severity-low{
  background:rgba(25,100,76,.7);
  border-color:var(--green);
}

.freeze-open{
  background:rgba(16,91,63,.65);
  border-color:#217e5e;
}

.freeze-closing{
  background:rgba(122,90,28,.65);
  border-color:var(--brass-hi);
  box-shadow:0 0 8px rgba(240,205,122,.25);
}

.freeze-likely_closed{
  background:rgba(56,70,76,.7);
  border-color:#667983;
  text-decoration:line-through;
  text-decoration-color:rgba(241,231,211,.4);
}

.severity-info{
  background:rgba(39,89,129,.78);
  border-color:var(--blue);
}

.severity-mark{
  width:5px;
  height:5px;
  border-radius:50%;
  background:currentColor;
}

.amount{
  color:var(--parchment);
}

.vasp{
  display:flex;
  gap:7px;
  align-items:center;
}

.vasp>span{
  display:flex;
  flex-direction:column;
  gap:2px;
}

.vasp strong{
  font-size:10px;
  font-weight:500;
}

.vasp em{
  font-style:normal;
  color:var(--muted);
  font-size:9px;
}

.vasp small{
  color:var(--faint);
  font-size:9px;
}

.exchange{
  display:grid;
  place-items:center;
  width:19px;
  height:19px;
  border-radius:50%;
  font-size:10px;
  font-weight:700;
  font-style:normal;
  color:var(--walnut-deep);
  background:var(--brass);
}

.movement{
  color:var(--muted);
}

.small{
  height:25px;
  min-height:25px;
  justify-content:center;
  padding:0 11px;
}


/* =========================================================
   ALERTS
   ========================================================= */

.alerts-list{
  height:calc(100% - 48px);
  overflow:auto;
}

.alert-item{
  min-height:58px;
  padding:9px 14px 9px 17px;
  border-bottom:1px solid rgba(241,231,211,.09);
  position:relative;
}

.alert-item:before{
  content:'';
  position:absolute;
  left:8px;
  top:13px;
  width:3px;
  height:28px;
  border-radius:4px;
  background:var(--brass);
}

.alert-item.severity-critical:before{
  background:var(--red);
}

.alert-top{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:5px;
}

.alert-top time{
  color:var(--faint);
  font:9px 'JetBrains Mono';
}

.alert-item>strong{
  display:block;
  font-size:10px;
  font-weight:600;
  padding-right:75px;
}

.alert-item>small{
  display:block;
  color:var(--muted);
  font-size:9px;
  margin-top:4px;
}

.ack-button{
  position:absolute;
  right:14px;
  bottom:8px;
  min-height:22px;
  padding:0 8px;
  border:0;
  border-radius:6px;
  color:var(--muted);
  background:linear-gradient(
    180deg,
    #5A4028,
    #3A281A
  );
  box-shadow:
    inset 0 1px 0 rgba(240,205,122,.12),
    0 2px 0 #1E130B,
    0 3px 5px rgba(0,0,0,.4);
  font-size:9px;
  transition:transform .12s ease,box-shadow .12s ease;
}

.ack-button:hover{
  transform:translateY(-1px);
  box-shadow:
    inset 0 1px 0 rgba(240,205,122,.18),
    0 3px 0 #1E130B,
    0 4px 7px rgba(0,0,0,.45);
  color:var(--brass-hi);
}

.ack-button:active{
  transform:translateY(2px);
  box-shadow:
    inset 0 1px 0 rgba(240,205,122,.1),
    0 0 0 #1E130B,
    0 1px 2px rgba(0,0,0,.4);
}

.ack-button:focus-visible{
  outline:2px solid var(--walnut-deep);
  outline-offset:1px;
  box-shadow:
    inset 0 1px 0 rgba(240,205,122,.12),
    0 2px 0 #1E130B,
    0 0 0 3px var(--brass-hi);
}

.ack-button:disabled{
  color:var(--green);
  border-color:rgba(79,179,154,.38);
}

.alert-item.acknowledged{
  opacity:.55;
}


/* =========================================================
   ANALYTICS
   ========================================================= */

.analytics-grid{
  display:grid;
  grid-template-columns:1.18fr 1.06fr 1fr;
  gap:14px;
  margin-top:14px;
}

.analytics-panel{
  height:212px;
}

.map-content{
  height:164px;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:20px;
}

.india-map{
  width:190px;
  height:160px;
  position:relative;
}

.india-map svg{
  width:150px;
  height:165px;
  margin-left:16px;
}

.map-shadow{
  fill:rgba(14,9,6,.75);
  stroke:var(--walnut-seam);
  stroke-width:5;
  stroke-linejoin:round;
}

.map-fill{
  stroke:rgba(23,16,11,.8);
  stroke-width:1.2;
  stroke-linejoin:round;
}

.map-1{
  fill:#bb8d36;
}

.map-2{
  fill:#9a7128;
}

.map-3{
  fill:#d1a245;
}

.map-4{
  fill:#805c25;
}

.map-5{
  fill:#c15b2f;
}

.map-pin{
  position:absolute;
  width:6px;
  height:6px;
  background:var(--red);
  border:2px solid var(--parchment);
  border-radius:50%;
  box-shadow:0 0 10px var(--red);
}

.pin-one{
  top:76px;
  left:99px;
}

.pin-two{
  top:112px;
  left:76px;
}

.state-legend{
  width:135px;
}

.state-legend>div{
  display:flex;
  align-items:center;
  gap:7px;
  height:16px;
  font-size:9px;
}

.state-legend>div span{
  flex:1;
  color:var(--muted);
}

.state-legend b{
  font:9px 'JetBrains Mono';
  font-weight:400;
}

.state-dot{
  width:5px;
  height:5px;
  border-radius:50%;
  background:var(--brass);
}

.level-1{
  background:#805c25;
}

.level-2{
  background:#9a7128;
}

.level-3{
  background:#bb8d36;
}

.level-4{
  background:#d1a245;
}

.level-5{
  background:var(--red);
}

.scale{
  margin-top:8px!important;
  gap:6px!important;
  color:var(--faint);
  font-size:8px!important;
}

.scale i{
  height:5px;
  flex:1;
  background:linear-gradient(
    90deg,
    #805c25,
    #d1a245,
    var(--red)
  );
  border-radius:3px;
}


/* =========================================================
   DONUT
   ========================================================= */

.donut-content{
  height:164px;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:22px;
}

.donut{
  width:124px;
  height:124px;
  border-radius:50%;
  display:grid;
  place-items:center;
  background:conic-gradient(
    #f28031 0 34%,
    #3e88d8 34% 56%,
    #8d48bb 56% 71%,
    #329866 71% 83%,
    #1a9cb2 83% 92%,
    #69747a 92%
  );
  position:relative;
}

.donut:after{
  content:'';
  position:absolute;
  inset:22px;
  border-radius:50%;
  background:#1d130d;
  box-shadow:inset 0 0 12px #080503;
}

.donut>div{
  position:relative;
  z-index:1;
  text-align:center;
  display:flex;
  flex-direction:column;
  gap:2px;
}

.donut span{
  font-size:9px;
  color:var(--muted);
}

.donut strong{
  font:600 17px 'Anybody';
}

.donut-legend{
  width:142px;
}

.donut-legend div{
  display:flex;
  align-items:center;
  gap:7px;
  height:20px;
  font-size:9px;
}

.donut-legend span{
  flex:1;
  color:var(--muted);
}

.donut-legend b{
  font:9px 'JetBrains Mono';
  font-weight:400;
}

.legend-dot{
  width:10px;
  height:10px;
  border-radius:3px;
  background:#f28031;
}

.legend-dot.blue{
  background:#3e88d8;
}

.legend-dot.plum{
  background:#8d48bb;
}

.legend-dot.green{
  background:#329866;
}

.legend-dot.cyan{
  background:#1a9cb2;
}

.legend-dot.muted{
  background:#69747a;
}


/* =========================================================
   CHAIN BARS
   ========================================================= */

.chain-bars{
  padding:13px 16px 3px;
}

.chain-bar{
  margin-bottom:12px;
}

.chain-bar>div{
  display:flex;
  justify-content:space-between;
  font-size:9px;
  margin-bottom:5px;
}

.chain-bar b{
  font:9px 'JetBrains Mono';
  font-weight:400;
  color:var(--muted);
}

.chain-bar>i{
  display:block;
  height:10px;
  border-radius:5px;
  background:rgba(241,231,211,.14);
  box-shadow:inset 0 2px 5px rgba(0,0,0,.5);
  overflow:hidden;
}

.chain-bar em{
  display:block;
  height:100%;
  border-radius:5px;
  background:var(--brass);
}

.chain-bar em.cyan{
  background:#36aeb0;
}

.chain-bar em.plum{
  background:var(--plum);
}

.chain-bar em.green{
  background:var(--green);
}

.chain-footer{
  display:flex;
  gap:7px;
  align-items:center;
  color:var(--faint);
  font-size:9px;
  padding:0 16px;
}


/* =========================================================
   FOOTER
   ========================================================= */

.desk-footer{
  display:flex;
  justify-content:space-between;
  color:var(--faint);
  font:9px 'JetBrains Mono';
  padding:16px 4px 0;
}

.desk-footer span{
  display:flex;
  align-items:center;
  gap:6px;
}

.desk-footer svg{
  color:var(--brass);
}


/* =========================================================
   FOCUS
   ========================================================= */

:focus-visible{
  outline:2px solid var(--brass-hi);
  outline-offset:2px;
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media(max-width:1200px){

  .main-content{
    padding-right:24px;
    margin-left:224px;
  }

  .nav-rail{
    left:14px;
  }

  .kpi-grid{
    grid-template-columns:repeat(3,1fr);
  }

  .analytics-grid{
    grid-template-columns:1fr 1fr;
  }

  .chain-panel{
    grid-column:span 2;
  }

}


@media(max-width:820px){

  .nav-rail{
    transform:translateX(-110%);
    left:10px;
    top:10px;
    bottom:10px;
    transition:transform .3s ease;
  }

  .nav-rail.mobile-open{
    transform:translateX(0);
  }

  .mobile-close{
    display:block;
    margin-left:auto;
    border:0;
    background:transparent;
    color:var(--muted);
  }

  .main-content{
    margin-left:0;
    padding:0 14px 22px;
  }

  .topbar{
    height:64px;
  }

  .menu-button{
    display:grid;
    place-items:center;
    width:40px;
    height:40px;
    margin-right:auto;
    border:1px solid rgba(241,231,211,.15);
    border-radius:9px;
    background:rgba(36,24,16,.65);
    color:var(--parchment);
  }

  .kpi-grid{
    grid-template-columns:repeat(2,1fr);
  }

  .main-grid{
    grid-template-columns:1fr;
  }

  .alerts-panel{
    height:auto;
  }

  .alerts-list{
    height:auto;
  }

  .analytics-grid{
    grid-template-columns:1fr;
  }

  .chain-panel{
    grid-column:auto;
  }

}


@media(max-width:520px){

  .topbar-search{
    width:40px;
    padding:0 11px;
  }

  .topbar-search input,
  .topbar-search kbd{
    display:none;
  }

  .profile strong,
  .profile svg{
    display:none;
  }

  .profile{
    padding-right:6px;
  }

  .page-heading{
    align-items:flex-start;
    flex-direction:column;
    gap:13px;
  }

  .page-heading h1{
    font-size:28px;
  }

  .kpi-grid{
    grid-template-columns:1fr;
  }

  .queue-panel{
    height:430px;
  }

  .analytics-panel{
    height:230px;
  }

  .map-content{
    gap:4px;
  }

  .india-map{
    transform:scale(.86);
    transform-origin:left center;
  }

  .state-legend{
    width:125px;
  }

  .donut-content{
    gap:10px;
  }

  .donut{
    width:112px;
    height:112px;
  }

  .donut-legend{
    width:130px;
  }

  .desk-footer{
    gap:10px;
    flex-direction:column;
  }

}
  .sidebar-nav {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 8px;
}
  .sidebar-nav::-webkit-scrollbar {
  width: 3px;
}

.sidebar-nav::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background: rgba(222, 180, 75, 0.35);
  border-radius: 10px;
}

@media (max-width: 680px) {
  /* Page height = top area (lamp + brand) + circular frame + bottom spacing */
  .login-room { min-height: calc(490px + min(100vw, 460px) + 60px); }

  /* Lamp: keep it top-left, just smaller */
  .lamp-control { left: 0; transform: scale(.6); transform-origin: top left; }
  .lamp-glow { left: -40%; top: -10%; width: 160%; height: 70%; }

  /* Brand block: centered below the lamp */
  .brand-panel { top: 190px; left: 50%; transform: translateX(-50%); width: 280px; text-align: center; }
  .brand-logo { width: 100px; margin: 0 auto 12px; }
  .brand-panel h1 { font-size: 40px; }
  .brand-rule { margin: 16px auto 12px; }

  /* Wooden circular frame: placed below the brand, almost full width */
  .login-frame {
    top: 490px; right: auto; left: 50%; bottom: auto;
    width: min(100vw, 460px);
    transform: translateX(-50%);
  }
  .frame-inner { inset: 6%; padding: 0; }

  /* Compact form so it fits inside the circle */
  .login-form { max-width: none; width: 80%; }
  .form-heading { margin-bottom: 8px; }
  .form-heading p, .form-note { display: none; }
  .form-heading h2 { font-size: 22px; }
  .role-tabs { margin-bottom: 6px; }
  .role-tabs button { font-size: 10px; padding: 6px 2px; }
  .role-tabs button svg { display: none; }
  .field { height: 36px; margin-bottom: 7px; padding: 0 10px; gap: 6px; }
  .field-row .field svg { display: none; }
  .submit-button { height: 38px; }

  /* Status pill centered at the bottom; hide desktop-only corner items */
  .status-pill { left: 50%; bottom: 14px; transform: translateX(-50%); width: max-content; font-size: 8px; }
  .corner-note, .light-switch { display: none; }
}

@media (max-width: 390px) {
  /* Extra small phones */
  .brand-panel { width: 250px; }
  .brand-panel h1 { font-size: 36px; }
  .login-form { width: 82%; }
}
@media(prefers-reduced-motion:reduce){

  *{
    transition:none!important;
    animation:none!important;
  }  


}
`;

if (
  typeof document !== "undefined" &&
  !document.getElementById("chainnetra-style")
) {
  const el = document.createElement("style");
  el.id = "chainnetra-style";
  el.textContent = css;
  document.head.appendChild(el);
}

type Risk = "Critical" | "High" | "Medium" | "Low";
type Severity = Risk | "Info";
type CaseRow = {
  id: string;
  risk: Risk;
  amount: string;
  freeze: "OPEN" | "CLOSING" | "LIKELY_CLOSED";
  vasp: string;
  confidence: string;
  wallets: string;
  movement: string;
};
type AlertRow = {
  severity: Severity;
  title: string;
  details: string;
  time: string;
};

const cases: CaseRow[] = [
  {
    id: "CN-2025-0147",
    risk: "Critical",
    amount: "₹ 48,70,000",
    freeze: "OPEN",
    vasp: "Binance",
    confidence: "92%",
    wallets: "6 wallets",
    movement: "12m ago",
  },
  {
    id: "CN-2025-0138",
    risk: "High",
    amount: "₹ 32,40,000",
    freeze: "CLOSING",
    vasp: "WazirX",
    confidence: "78%",
    wallets: "4 wallets",
    movement: "28m ago",
  },
  {
    id: "CN-2025-0129",
    risk: "High",
    amount: "₹ 18,25,000",
    freeze: "OPEN",
    vasp: "CoinDCX",
    confidence: "81%",
    wallets: "3 wallets",
    movement: "1h ago",
  },
  {
    id: "CN-2025-0116",
    risk: "Medium",
    amount: "₹ 9,80,000",
    freeze: "LIKELY_CLOSED",
    vasp: "Bybit",
    confidence: "64%",
    wallets: "2 wallets",
    movement: "3h ago",
  },
  {
    id: "CN-2025-0108",
    risk: "Medium",
    amount: "₹ 7,15,000",
    freeze: "OPEN",
    vasp: "KuCoin",
    confidence: "72%",
    wallets: "5 wallets",
    movement: "5h ago",
  },
  {
    id: "CN-2025-0097",
    risk: "Low",
    amount: "₹ 3,40,000",
    freeze: "LIKELY_CLOSED",
    vasp: "Gate.io",
    confidence: "58%",
    wallets: "1 wallet",
    movement: "7h ago",
  },
  {
    id: "CN-2025-0089",
    risk: "Low",
    amount: "₹ 2,10,000",
    freeze: "OPEN",
    vasp: "MEXC",
    confidence: "61%",
    wallets: "2 wallets",
    movement: "9h ago",
  },
  {
    id: "CN-2025-0074",
    risk: "Medium",
    amount: "₹ 1,75,000",
    freeze: "OPEN",
    vasp: "Bitget",
    confidence: "67%",
    wallets: "3 wallets",
    movement: "11h ago",
  },
];
const alerts: AlertRow[] = [
  {
    severity: "Critical",
    title: "Large outbound transaction detected",
    details: "₹ 48,70,000 · Case CN-2025-0147",
    time: "8m ago",
  },
  {
    severity: "High",
    title: "New wallet cluster matched",
    details: "Case CN-2025-0138 · 4 addresses",
    time: "21m ago",
  },
  {
    severity: "Medium",
    title: "VASP compliance notice received",
    details: "KuCoin · Case CN-2025-0108",
    time: "47m ago",
  },
  {
    severity: "Info",
    title: "Trace job completed",
    details: "Case CN-2025-0129 · 87% confidence",
    time: "1h ago",
  },
  {
    severity: "High",
    title: "Rapid fund movement detected",
    details: "Case CN-2025-0116 · 3 hops",
    time: "2h ago",
  },
  {
    severity: "Low",
    title: "New case filed",
    details: "Case CN-2025-0152",
    time: "3h ago",
  },
];
const navItems = [
  ["Command Center", Grid2X2, "/"],
  ["Complaints", FileText, "/complaint"],
  ["Cases", ShieldAlert, "/caseworkspace"],
  ["Clusters", Network, "/crosschain"],
  ["Watchlist & Alerts", Bell, "/watchlist"],
  ["Freeze & Notices", Snowflake, "/notices"],
  ["Reports & Evidence", WalletCards, "/reports"],
  ["VASP Registry", Landmark, "/vasps"],
  ["Analytics", Activity, "/analytics"],
  ["Admin", Settings, "/admin"],
] as const;
const states = [
  ["Maharashtra", 482],
  ["Karnataka", 361],
  ["Delhi", 298],
  ["Uttar Pradesh", 254],
  ["Tamil Nadu", 212],
  ["Gujarat", 176],
  ["West Bengal", 142],
  ["Others", 368],
];
const typology = [
  ["Investment Scam", 34, "orange"],
  ["Trading Fraud", 22, "blue"],
  ["Romance Scam", 15, "plum"],
  ["Impersonation", 12, "green"],
  ["Phishing", 9, "cyan"],
  ["Others", 8, "muted"],
];
const chains: [string, number, string][] = [
  ["CEX (Centralized Exchanges)", 54, "brass"],
  ["DEX (Decentralized Exchanges)", 18, "cyan"],
  ["Wallets / DeFi", 12, "plum"],
  ["P2P / Others", 16, "green"],
];

function Dashboard() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("CN-2025-0147");
  const [done, setDone] = useState<string[]>([]);
  const [effects, setEffects] = useState("Balanced");
  const filtered = useMemo(
    () =>
      cases.filter((row) =>
        `${row.id} ${row.vasp}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );
  const acknowledge = (title: string) =>
    setDone((items) => (items.includes(title) ? items : [...items, title]));

  return (
    <div className={`app-shell effects-${effects.toLowerCase()}`}>
      <div
  className="wood-board"
  style={{ backgroundImage: `url(${backgroundImage})` }}
/>
      <div className="lamp-glow" />
      <div className="grain" />
      <aside
        className={`nav-rail ${collapsed ? "collapsed" : ""} ${mobileNav ? "mobile-open" : ""}`}
      >
       <div className="brand">
  <div className="brand-mark">
    <img src={logo} alt="Divya Drishti Logo" />
  </div>

  <span className="brand-name">DIVYA DRISHTI</span>

  <button
    className="collapse-button"
    onClick={() => setCollapsed((prev) => !prev)}
    aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
    title={collapsed ? "Expand navigation" : "Collapse navigation"}
  >
    <ChevronRight
      size={17}
      style={{
        transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform .3s ease",
      }}
    />
  </button>

  <button
    className="mobile-close"
    onClick={() => setMobileNav(false)}
    aria-label="Close navigation"
  >
    <X size={18} />
  </button>
</div>
        <nav className="sidebar-nav" aria-label="Primary navigation">
  {navItems.map(([label, Icon, route], index) => (
    <button
      key={label}
      className={`nav-item ${index === 0 ? "active" : ""}`}
      title={collapsed ? label : undefined}
      onClick={() => navigate(route)}
    >
      <Icon size={19} />
      <span>{label}</span>
      {index === 0 && <i />}
    </button>
  ))}
</nav>
        <div className="rail-bottom">
          <div className="system-status">
            <span className="online-dot" />
            <div>
              <strong>System Online</strong>
              <small>Last sync 2 min ago</small>
            </div>
          </div>
          <div className="effects-control">
            <Zap size={14} />
            <label htmlFor="effects">Effects</label>
            <select
              id="effects"
              value={effects}
              onChange={(event) => setEffects(event.target.value)}
            >
              <option>Full</option>
              <option>Balanced</option>
              <option>Minimal</option>
            </select>
          </div>
        </div>
      </aside>
      <main className="main-content">
        <header className="topbar">
          <button
            className="menu-button"
            onClick={() => setMobileNav(true)}
            aria-label="Open navigation"
          >
            <Menu size={21} />
          </button>
          <div className="topbar-search">
            <Search size={17} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search case ID, VASP, wallet, tx hash..."
              aria-label="Search cases"
            />
            <kbd>/</kbd>
          </div>
          <button className="icon-button" aria-label="Notifications">
            <Bell size={18} />
            <b />
          </button>
          <button className="profile">
            <span>RS</span>
            <strong>Investigator</strong>
            <ChevronDown size={15} />
          </button>
        </header>
        <div className="page-heading">
          <div>
            <h1>Command Center</h1>
            <p>
              Situational awareness <span>•</span> What should I do first?
            </p>
          </div>
          <div className="live-indicator">
            <span /> Live monitoring
          </div>
        </div>
        <section className="kpi-grid" aria-label="Key metrics">
          <Kpi
            icon={<FileText />}
            label="New cases today"
            value="24"
            delta="↑ 12%"
            color="green"
          />
          <Kpi
            icon={<Clock3 />}
            label="Avg time-to-attribution"
            value="2h 36m"
            delta="↓ 41%"
            color="cyan"
          />
          <Kpi
            icon={<span className="rupee">₹</span>}
            label="Amount tracked (₹)"
            value="₹ 12.4 Cr"
            delta="↑ 28%"
            color="brass"
          />
          <Kpi
            icon={<Snowflake />}
            label="Freeze requests sent"
            value="18"
            delta="↑ 50%"
            color="green"
          />
          <Kpi
            icon={<LockKeyhole />}
            label="Funds frozen (₹)"
            value="₹ 4.8 Cr"
            delta="↑ 76%"
            color="green"
          />
        </section>
        <section className="main-grid">
          <div className="panel queue-panel">
            <PanelHeader
              icon={<Crosshair />}
              title="Freeze-Window Priority Queue"
              subtitle="Cases sorted by freeze_window.priority_score (highest first)"
              action="View All Cases"
            />
            <div
              className="table-wrap"
              role="table"
              aria-label="Freeze-window priority queue"
            >
              <div className="table-head" role="row">
                <span>Case ID</span>
                <span>Risk</span>
                <span>Amount (₹)</span>
                <span>Freeze Window</span>
                <span>Nearest VASP + Confidence</span>
                <span>Last Movement</span>
                <span>Action</span>
              </div>
              {filtered.map((row) => (
                <div
                  role="row"
                  className={`table-row ${selected === row.id ? "selected" : ""}`}
                  key={row.id}
                  onClick={() => setSelected(row.id)}
                >
                  <span className="mono">{row.id}</span>
                  <span>
                    <Badge
                      text={row.risk}
                      kind={`risk-${row.risk.toLowerCase()}`}
                    />
                  </span>
                  <span className="amount mono">{row.amount}</span>
                  <span>
                    <Badge
                      text={row.freeze}
                      kind={`freeze-${row.freeze.toLowerCase()}`}
                    />
                  </span>
                  <span className="vasp">
                    <i className="exchange">{row.vasp[0]}</i>
                    <span>
                      <strong>
                        {row.vasp} <em>({row.confidence})</em>
                      </strong>
                      <small>{row.wallets}</small>
                    </span>
                  </span>
                  <span className="movement">{row.movement}</span>
                  <button
                    className="key-button small"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelected(row.id);
                    }}
                  >
                    Open
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="panel alerts-panel">
            <PanelHeader
              icon={<Bell />}
              title="Live Alerts"
              action="View All"
              compact
            />
            <div className="alerts-list" aria-live="polite">
              {alerts.map((alert) => {
                const isDone = done.includes(alert.title);
                return (
                  <div
                    className={`alert-item severity-${alert.severity.toLowerCase()} ${isDone ? "acknowledged" : ""}`}
                    key={alert.title}
                  >
                    <div className="alert-top">
                      <Badge
                        text={alert.severity}
                        kind={`severity-${alert.severity.toLowerCase()}`}
                      />
                      <time>{alert.time}</time>
                    </div>
                    <strong>{alert.title}</strong>
                    <small>{alert.details}</small>
                    <button
                      className="ack-button"
                      disabled={isDone}
                      onClick={() => acknowledge(alert.title)}
                    >
                      {isDone ? "Acknowledged" : "Acknowledge"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section className="analytics-grid">
          <div className="panel analytics-panel map-panel">
            <PanelHeader
              icon={<MapPin />}
              title="Complaints by State"
              compact
            />
            <div className="map-content">
              <IndiaMap />
              <div className="state-legend">
                {states.map(([name, value], index) => (
                  <div key={name}>
                    <i
                      className={`state-dot level-${Math.min(5, Math.ceil((index + 1) / 2))}`}
                    />
                    <span>{name}</span>
                    <b>{value}</b>
                  </div>
                ))}
                <div className="scale">
                  <span>Low</span>
                  <i />
                  <span>High</span>
                </div>
              </div>
            </div>
          </div>
          <div className="panel analytics-panel">
            <PanelHeader icon={<Target />} title="Typology" compact />
            <div className="donut-content">
              <div className="donut">
                <div>
                  <span>Total</span>
                  <strong>1,842</strong>
                  <span>cases</span>
                </div>
              </div>
              <div className="donut-legend">
                {typology.map(([label, value, color]) => (
                  <div key={label}>
                    <i className={`legend-dot ${color}`} />
                    <span>{label}</span>
                    <b>{value}%</b>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="panel analytics-panel chain-panel">
            <PanelHeader icon={<Network />} title="Chain Split" compact />
            <div className="chain-bars">
              {chains.map(([label, value, color]) => (
                <div className="chain-bar" key={label}>
                  <div>
                    <span>{label}</span>
                    <b>{value}%</b>
                  </div>
                  <i>
                    <em className={color} style={{ width: `${value}%` }} />
                  </i>
                </div>
              ))}
            </div>
            <div className="chain-footer">
              <ShieldAlert size={14} /> Flow distribution across traced cases
            </div>
          </div>
        </section>
        <footer className="desk-footer">
          <span>
            <Zap size={13} /> Evidence desk / India operations
          </span>
          <span>Secure workspace · v2.5.7</span>
        </footer>
      </main>
    </div>
  );
}

function Kpi({
  icon,
  label,
  value,
  delta,
  color,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  delta: string;
  color: string;
}) {
  return (
    <article className="kpi-card">
      <div className="kpi-icon">{icon}</div>
      <div className="kpi-copy">
        <span>{label}</span>
        <div>
          <strong>{value}</strong>
          <em className="delta">{delta}</em>
        </div>
      </div>
      <svg
        className={`sparkline ${color}`}
        viewBox="0 0 100 30"
        preserveAspectRatio="none"
      >
        <path d="M0 27 C12 24 16 25 24 22 S37 24 45 17 S56 20 64 13 S73 19 82 10 S92 11 100 2" />
      </svg>
    </article>
  );
}
function PanelHeader({
  icon,
  title,
  subtitle,
  action,
  compact = false,
}: {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  action?: string;
  compact?: boolean;
}) {
  return (
    <div className={`panel-header ${compact ? "compact" : ""}`}>
      <div className="panel-title">
        <span>{icon}</span>
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>
      {action && (
        <button className="key-button secondary">
          {action} <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}
function Badge({ text, kind }: { text: string; kind: string }) {
  return (
    <span className={`badge ${kind}`}>
      {kind.includes("risk") && <AlertTriangle size={11} />}
      {kind.includes("freeze") && <CircleHelp size={11} />}
      {kind.includes("severity") && <span className="severity-mark" />}
      {text}
    </span>
  );
}
function IndiaMap() {
  return (
    <div className="india-map" role="img" aria-label="India complaint heatmap">
      <svg viewBox="0 0 210 260" aria-hidden="true">
        <path
          className="map-shadow"
          d="M74 10 108 18 128 37 151 48 160 72 185 86 163 108 166 132 151 148 148 179 130 206 118 248 98 221 86 187 67 171 71 145 52 126 55 104 35 89 52 72 67 52 62 29Z"
        />
        <path
          className="map-fill map-1"
          d="M74 10 108 18 128 37 108 55 84 47 62 29Z"
        />
        <path className="map-fill map-2" d="m128 37 23 11 9 24-21 14-31-31Z" />
        <path className="map-fill map-3" d="m108 55 31 31-13 29-31-13-11-28Z" />
        <path
          className="map-fill map-4"
          d="m84 47 11 28-11 28-29 1-20-15 17-17 15-20Z"
        />
        <path
          className="map-fill map-5"
          d="m95 102 31 13 24 10-3 32-17 16-19-20-30-12-15-16 18-14Z"
        />
        <path
          className="map-fill map-3"
          d="m111 153 19 20-12 75-20-27-12-34 10-30Z"
        />
        <path className="map-fill map-2" d="m151 72 34 14-22 22-17-6Z" />
      </svg>
      <span className="map-pin pin-one" />
      <span className="map-pin pin-two" />
    </div>
  );
}

export default Dashboard;
