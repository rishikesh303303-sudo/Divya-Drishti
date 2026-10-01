import { useState } from "react";
import type { FormEvent } from "react";
import background2Image from "../../assets/background.png";
import lampImage from "../../assets/lamp.png";
import woodenFrameImage from "../../assets/wooden-frame.png";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  Building2,
  Check,
  Eye,
  EyeOff,
  KeyRound,
  Landmark,
  LockKeyhole,
  MapPin,
  Send,
  Shield,
  UserRound,
} from "lucide-react";

type Role = "lea" | "bank" | "admin";

const roles = [
  { id: "lea" as Role, label: "LEA Officer", icon: Shield },
  { id: "bank" as Role, label: "Bank-FI", icon: Landmark },
  { id: "admin" as Role, label: "I4C Admin", icon: UserRound },
];

const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Playfair+Display:wght@500;600;700&family=Space+Grotesk:wght@400;500;600&display=swap');

:root { font-family: 'Space Grotesk', sans-serif; color: #f8eddf; background: #090b17; font-synthesis: none; }
* { box-sizing: border-box; }
body { margin: 0; min-width: 320px; }
button, input, select { font: inherit; }
button { cursor: pointer; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }

.login-room { min-height: 100vh; position: relative; overflow: hidden; isolation: isolate; background: #111326; color: #f6ebde; transition: background 1.5s ease; }
.room-bg { position: absolute; inset: 0; z-index: -5; width: 100%; height: 100%; object-fit: cover; opacity: .35; transition: opacity 1.5s ease, filter 1.5s ease; filter: brightness(.4) saturate(.7); }
.lamp-on .room-bg { opacity: 1; filter: brightness(1) saturate(1); }
.ambient-shadow { position: absolute; inset: 0; z-index: -2; background: linear-gradient(90deg, rgba(2,3,12,.6), transparent 50%, rgba(0,0,0,.25)); transition: opacity 1.4s; }
.lamp-on .ambient-shadow { opacity: .3; }
.lamp-glow {
  position: absolute;
  z-index: -1;
  left: -25%;
  top: -30%;
  width: 125%;
  height: 150%;
  opacity: 0;
  background: radial-gradient(
    ellipse at 18% 12%,
    rgba(255, 192, 112, .95) 0%,
    rgba(237, 146, 83, .55) 22%,
    rgba(255, 170, 90, .25) 42%,
    rgba(121, 74, 70, .12) 58%,
    transparent 78%
  );
  filter: blur(24px);
  transition: opacity 1.7s ease;
  pointer-events: none;
}

.lamp-on .lamp-glow {
  opacity: 1;
}
.lamp-on .lamp-glow { opacity: 1; }

.lamp-control {
  position: absolute;
  z-index: 5;
  left: 3.2vw;
  top: 0;
  width: 350px;
  height: 280px;
}
.lamp-img {
  position: absolute;
  top: 10px;
  left: -20px;
  width: 480px;
  height: auto;
  opacity: 1;
  transition: filter 1.2s ease, transform .25s ease;
}

.lamp-on .lamp-img {
  filter: drop-shadow(0 0 25px rgba(255,185,99,.65));
}

.pull-rope { position: absolute; left: 61px; top: 95px; height: 57px; width: 12px; border-left: 1px solid #b78452; transition: transform .25s cubic-bezier(.2,.9,.3,1.4); z-index: 6; }
.pull-rope::after { content: ''; position: absolute; top: 0; left: -1px; height: 100%; border-left: 1px dashed rgba(255,220,163,.42); }
.pulling .pull-rope { transform: translateY(13px); }
.rope-knob { position: absolute; bottom: -5px; left: -5px; width: 10px; height: 14px; border-radius: 50%; background: #bd7e42; box-shadow: 0 3px 5px #05060d; }
.rope-hint {
  position: absolute;
  top: 240px;
  left: -20px;
  width: 250px;
  color: rgba(242,204,158,.58);
  font: 600 13px 'DM Mono', monospace;
  letter-spacing: .02em;
}
.lamp-on .rope-hint { color: rgba(255,215,167,.8); }

.brand-panel { position: absolute; left: 25%; top: 28%; width: 330px; color: #6a6aad; transition: color 1.2s; }
.lamp-on .brand-panel {
  color: #f6dfb5;
  text-shadow:
    0 2px 0 #6b3f20,
    0 4px 12px rgba(0, 0, 0, 0.75);
}
    .brand-logo {
  width: 150px;
  height: auto;
  display: block;
  object-fit: contain;
  margin-bottom: 18px;
  transition: filter 1.2s ease, transform .3s ease;
}

.lamp-on .brand-logo {
  filter: drop-shadow(0 5px 12px rgba(0, 0, 0, .55));
}

.eye-iris { position: absolute; z-index: 1; left: 44px; top: 11px; width: 22px; height: 22px; border-radius: 50%; background: currentColor; box-shadow: 0 0 0 5px rgba(112,102,223,.35), 0 0 15px rgba(133,117,249,.6); }
.brand-panel h1 {
  margin: 0;
  font: 700 56px/.82 'Playfair Display', serif;
  letter-spacing: -0.065em;
  color: #f8e4c2;

  text-shadow:
    2px 3px 0 #5b351e,
    0 5px 14px rgba(0, 0, 0, 0.85),
    0 0 20px rgba(248, 228, 194, 0.12);
}
.brand-panel h1 span { letter-spacing: -.09em; }
.brand-rule { width: 30px; margin: 22px 0 15px; border-top: 1px solid currentColor; opacity: .75; }
.brand-panel p { margin: 0; font-size: 12px; line-height: 1.5; color: rgba(214, 232, 239, 0.56); transition: color 1s; }
.lamp-on .brand-panel p {
  display: inline-block;
  padding: 8px 12px;
  border-radius: 6px;

  color: #fff0d5;
  font-weight: 500;

  background: rgba(20, 10, 8, 0.42);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.9);
}

.status-pill { position: absolute; left: 15%; bottom: 8.5%; padding: 9px 14px; border: 1px solid rgba(214,189,226,.13); border-radius: 99px; background: rgba(19,18,42,.42); color: rgba(234,221,226,.58); font: 10px 'DM Mono', monospace; box-shadow: 0 8px 25px rgba(0,0,0,.12); transition: color 1s, background 1s; }
.lamp-on .status-pill { background: rgba(232, 25, 25, 0.22); color: rgba(252, 27, 27, 0.76); border-color: rgba(86,59,62,.2); }
.live-dot, .switch-dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; margin-right: 8px; background: #50d87b; box-shadow: 0 0 8px #50d87b; }
.status-pill b { padding: 0 5px; font-weight: 400; color: #ca9eaa; }

.login-frame {
  position: absolute;
  z-index: 2;
  top: 52%;
  right: 5%;
  width: min(40vw, 580px);
  aspect-ratio: 1;
  transform: translateY(-50%);
  border-radius: 50%;
  filter: drop-shadow(20px 26px 20px rgba(0,0,0,.48));
}
.wood-img {
  position: absolute;
  inset: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  filter: brightness(.55);
  mix-blend-mode: multiply;
  pointer-events: none;
  transition: filter 1.2s, box-shadow 1.2s;
}

.lamp-on .wood-img {
  filter: brightness(1.1)
    drop-shadow(0 0 30px rgba(255,173,104,.45));
  mix-blend-mode: normal;
}
.lamp-on .wood-img { filter: brightness(1.1) drop-shadow(0 0 30px rgba(255,173,104,.18)); }
.frame-inner {
  position: absolute;
  inset: 32px; /* Wooden frame ke andar ka area */
  z-index: 1;
  border-radius: 50%;
  overflow: hidden;
  background: transparent;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 22px;
}

.lamp-on .frame-inner {
  background: radial-gradient(
    circle at 50% 30%,
    #f5ddc6 0%,
    #eac7af 62%,
    #d39b86 100%
  );
}
.lamp-on .frame-inner { background: radial-gradient(circle at 50% 30%, #f5ddc6 0%, #eac7af 62%, #d39b86 100%); }
.login-form {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  opacity: .47;
  transform: translateY(12px);
  transition: opacity 1.1s, transform 1.1s;
}
.lamp-on .login-form { opacity: 1; transform: translateY(0); }
.form-heading { text-align: center; margin-bottom: 15px; }
.micro-label { color: #b28aa0; font: 8px 'DM Mono', monospace; letter-spacing: .16em; }
.lamp-on .micro-label { color: #946372; }
.form-heading h2, .success-state h2 { margin: 5px 0 0; color: #e1d0d6; font: 600 clamp(22px, 2.5vw, 31px) 'Playfair Display', serif; letter-spacing: -.04em; }
.lamp-on .form-heading h2, .lamp-on .success-state h2 { color: #2e1738; }
.form-heading p { margin: 0; color: #bba7bb; font-size: 9px; }
.lamp-on .form-heading p { color: #704d5b; }
.role-tabs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px; margin-bottom: 9px; padding: 3px; border-radius: 12px; background: rgba(4,5,19,.18); }
.role-tabs button { display: flex; align-items: center; justify-content: center; gap: 4px; min-width: 0; padding: 7px 2px; border: 0; border-radius: 9px; color: #9a8b9f; background: transparent; font-size: 11px; white-space: nowrap; }
.role-tabs button.active { color: #fff2e9; background: #4b286e; box-shadow: 0 4px 8px rgba(50,27,76,.2); }
.field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
.field {
  display: flex;
  align-items: center;
  position: relative;
  gap: 10px;

  height: 44px;
  margin-bottom: 10px;
  padding: 0 14px;

  border: 1px solid rgba(105, 64, 88, .28);
  border-radius: 10px;

  color: #69455f;
  background: rgba(255, 247, 241, .72);

  box-shadow:
    inset 0 1px 2px rgba(70, 35, 55, .08),
    0 2px 5px rgba(70, 35, 55, .06);

  transition:
    border-color .2s,
    box-shadow .2s,
    background .7s,
    transform .2s;
}
.lamp-on .field { color: #69455f; border-color: rgba(105,64,88,.22); background: rgba(255,247,241,.5); }
.field:focus-within {
  border-color: #6c3d91;

  background: #fffaf6;

  box-shadow:
    0 0 0 3px rgba(114, 90, 243, .16),
    0 5px 16px rgba(76, 40, 110, .12);

  transform: translateY(-1px);
}
.field input,
.field select {
  min-width: 0;
  width: 100%;
  height: 100%;

  border: 0;
  outline: 0;

  color: #3c2944;
  background: transparent;

  font-size: 11px;
  font-weight: 500;
}
.lamp-on .field input, .lamp-on .field select { color: #3c2944; }
.field input::placeholder { color: #998ba6; }
.lamp-on .field input::placeholder { color: #835f76; }
.field select { appearance: none; cursor: pointer; }
.field select option { color: #2b2031; }
.field-action { display: flex; border: 0; padding: 0; color: inherit; background: transparent; }
.form-error { margin: -1px 0 7px; color: #e88f8b; font-size: 12px; line-height: 1.3; text-align: center; }
.submit-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  width: 100%;
  height: 42px;

  border: 1px solid #3e1f65;
  border-radius: 12px;

  color: #fff5f4;
  background: linear-gradient(
    180deg,
    #7950a2 0%,
    #4b286e 100%
  );

  box-shadow:
    0 5px 0 #2b1747,
    0 9px 16px rgba(45, 19, 71, .24),
    inset 0 1px 0 rgba(255, 255, 255, .18);

  font-size: 11px;
  font-weight: 600;

  transition:
    transform .15s ease,
    box-shadow .15s ease;
}
.submit-button:hover {
  transform: translateY(-2px);

  box-shadow:
    0 7px 0 #2b1747,
    0 12px 20px rgba(45, 19, 71, .32),
    inset 0 1px 0 rgba(255, 255, 255, .18);
}
.submit-button:active {
  transform: translateY(4px);

  box-shadow:
    0 1px 0 #2b1747,
    0 3px 8px rgba(45, 19, 71, .2);
}
.submit-button:disabled { opacity: .8; cursor: wait; }
.spinner { width: 11px; height: 11px; border: 1px solid rgba(255,255,255,.35); border-top-color: #fff; border-radius: 50%; animation: spin .8s linear infinite; }
.form-note { display: flex; justify-content: center; align-items: center; gap: 4px; margin: 10px 0 0; color: #93849d; font-size: 7px; }
.lamp-on .form-note { color: #79596d; }
.success-state { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center; animation: rise .8s ease both; }
.success-check { display: grid; place-items: center; width: 65px; height: 65px; margin-bottom: 19px; border: 1px solid #7957df; border-radius: 50%; color: #fff; background: #5a3c96; box-shadow: 0 0 0 9px rgba(91,60,150,.12), 0 0 30px rgba(125,92,255,.6); }
.success-state h2 { font-size: 25px; margin-top: 9px; }
.success-state p { margin: 7px 0 0; color: #735464; font-size: 10px; }
.success-line { width: 48px; margin-top: 20px; border-top: 1px solid #a77b88; }

.corner-note,
.light-switch {
  position: absolute;
  bottom: 25px;
  color: rgba(248, 228, 194, 0.85);
  font: 10px 'DM Mono', monospace;
  letter-spacing: 0.08em;
  text-shadow:
    0 2px 6px rgba(0, 0, 0, 0.8);
}

.lamp-on .corner-note,
.lamp-on .light-switch {
  color: rgba(248, 228, 194, 0.9);
}
.corner-note { left: 4%; }
.corner-note span { margin: 0 8px; color: #b07972; }
.light-switch { display: flex; align-items: center; right: 4%; transition: color 1s; }
.lamp-on .light-switch { color: rgba(53,46,58,.58); }

@keyframes spin { to { transform: rotate(360deg); } }
@keyframes rise { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition-duration: .01ms !important; animation-duration: .01ms !important; } }
@media (max-width: 900px) { .brand-panel { left: 8%; } .status-pill { left: 8%; } .login-frame { right: 4%; width: min(48vw, 500px); } }
@media (max-width: 680px) {
  .login-room { min-height: calc(490px + min(100vw, 460px) + 60px); }

  .lamp-control { left: 0; transform: scale(.6); transform-origin: top left; }
  .lamp-glow { left: -40%; top: -10%; width: 160%; height: 70%; }

  .brand-panel { top: 190px; left: 50%; transform: translateX(-50%); width: 280px; text-align: center; }
  .brand-logo { width: 100px; margin: 0 auto 12px; }
  .brand-panel h1 { font-size: 40px; }
  .brand-rule { margin: 16px auto 12px; }

  .login-frame {
    top: 490px; right: auto; left: 50%; bottom: auto;
    width: min(100vw, 460px);
    transform: translateX(-50%);
  }
  .frame-inner { inset: 6%; padding: 0; }

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

  .status-pill { left: 50%; bottom: 14px; transform: translateX(-50%); width: max-content; font-size: 8px; }
  .corner-note, .light-switch { display: none; }
}

@media (max-width: 390px) {
  .brand-panel { width: 250px; }
  .brand-panel h1 { font-size: 36px; }
  .login-form { width: 82%; }
}
`;

function Login() {
  const navigate = useNavigate();
  const [isLampOn, setIsLampOn] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<Role>("lea");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess] = useState(false);
  const [error, setError] = useState("");

  const pullCord = () => {
  setIsPulling(true);

  window.setTimeout(() => {
    setIsLampOn((current) => !current);
    setError(""); // message remove
    setIsPulling(false);
  }, 260);
};

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!isLampOn) {
      setError("Please pull the cord to illuminate your workspace.");
      pullCord();
      return;
    }

    const form = new FormData(event.currentTarget);
    const loginId = String(form.get("loginId") || "").trim();
    const password = String(form.get("password") || "").trim();
    if (!loginId || !password) {
      setError("Enter your Login ID and password to continue.");
      return;
    }

    setIsSubmitting(true);

window.setTimeout(() => {
  setIsSubmitting(false);
  navigate("/dashboard");
}, 1100);
};
 
return (
    <>
      <style>{styles}</style>
      <main className={`login-room ${isLampOn ? "lamp-on" : ""}`}>
        <img
          className="room-bg"
          src={background2Image}
          alt=""
          aria-hidden="true"
        />
        <div className="ambient-shadow" />
        <div className="lamp-glow" />

        <button
          className={`lamp-control ${isPulling ? "pulling" : ""}`}
          onClick={pullCord}
          aria-label={isLampOn ? "Turn lamp off" : "Turn lamp on"}
        >
          <img className="lamp-img" src={lampImage} alt="Lamp" />

          <span className="rope-hint">
            {isLampOn ? "Pull to dim" : "Pull the cord to illuminate"}
          </span>
        </button>

       <section className="brand-panel" aria-label="Divya Drishti branding">
  <img
    src={logo}
    alt="Divya Drishti"
    className="brand-logo"
  />

  <h1>
    DIVYA
    <br />
    <span>DRISHTI</span>
          </h1>
          <div className="brand-rule" />
          <p>
            Predictive intelligence for
            <br />
            cybercrime cash-out prevention
          </p>
        </section>

       

        <section className="login-frame" aria-label="Sign in">
          <img
            className="wood-img"
            src={woodenFrameImage}
            alt=""
            aria-hidden="true"
          />
          <div className="frame-inner">
            {!isSuccess ? (
              <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-heading">
                  <span className="micro-label">SECURE ACCESS / 04</span>
                  <h2>Sign In</h2>
                  <p>Create your account</p>
                </div>
                <div
                  className="role-tabs"
                  role="tablist"
                  aria-label="Account type"
                >
                  {roles.map(({ id, label, icon: Icon }) => (
                    <button
                      type="button"
                      role="tab"
                      aria-selected={role === id}
                      className={role === id ? "active" : ""}
                      key={id}
                      onClick={() => setRole(id)}
                    >
                      <Icon size={13} />
                      {label}
                    </button>
                  ))}
                </div>
                <div className="field-row">
                  <label className="field">
                    <MapPin size={14} />
                    <span className="sr-only">State</span>
                    <select name="state" defaultValue="">
                      <option value="" disabled>
                        Select State
                      </option>
                      <option>Maharashtra</option>
                      <option>Delhi</option>
                      <option>Karnataka</option>
                    </select>
                  </label>
                  <label className="field">
                    <Building2 size={14} />
                    <span className="sr-only">District</span>
                    <select name="district" defaultValue="">
                      <option value="" disabled>
                        Select District
                      </option>
                      <option>Mumbai</option>
                      <option>New Delhi</option>
                      <option>Bengaluru</option>
                    </select>
                  </label>
                </div>
                <label className="field">
                  <UserRound size={14} />
                  <span className="sr-only">Login ID</span>
                  <input
                    name="loginId"
                    placeholder="Login ID"
                    autoComplete="username"
                  />
                </label>
                <label className="field">
                  <LockKeyhole size={14} />
                  <span className="sr-only">Password</span>
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password (DEMO- 1234)"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="field-action"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </label>
                {error && (
                  <p className="form-error" role="alert">
                    {error}
                  </p>
                )}
                <button
                  className="submit-button"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      Submit <Send size={14} />
                    </>
                  )}
                </button>
                <p className="form-note">
                  <KeyRound size={11} /> All data is tokenized and access is
                  audit-logged
                </p>
              </form>
            ) : (
              <div className="success-state">
                <div className="success-check">
                  <Check size={30} />
                </div>
                <span className="micro-label">IDENTITY VERIFIED</span>
                <h2>Login Successful</h2>
                <p>Redirecting to dashboard...</p>
                <div className="success-line" />
              </div>
            )}
          </div>
        </section>

        <div className="corner-note">
          DIVYA DRISHTI <span>·</span> INTELLIGENCE OPERATIONS
        </div>
        <div className="light-switch">
          <span className="switch-dot" />
          SYSTEM ONLINE <ArrowUpRight size={12} />
        </div>
      </main>
    </>
  );
}


export default Login;
