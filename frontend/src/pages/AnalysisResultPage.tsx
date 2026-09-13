import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Building2, 
  Share2, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  Download, 
  FileText, 
  HelpCircle, 
  ChevronRight,
  Send,
  Lock,
  Search
} from 'lucide-react';
import { PageRoute } from '../types';
import threatQuarantineImg from '../assets/images/threat_quarantine_1789272103710.jpg';

interface AnalysisResultPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenVerifyCompany: () => void;
  onOpenShareWarning: () => void;
  onOpenEvidence: () => void;
  onOpenReportModal: () => void;
}

export const AnalysisResultPage: React.FC<AnalysisResultPageProps> = ({
  onNavigate,
  onOpenVerifyCompany,
  onOpenShareWarning,
  onOpenEvidence,
  onOpenReportModal,
}) => {
  return (
    <div className="w-full min-h-screen bg-[#f1fbff] py-10 px-4 sm:px-6 lg:px-8">
      {/* Top Header & Breadcrumb */}
      <div className="max-w-5xl mx-auto mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => onNavigate('check-offer')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm transition-colors self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Analyze Another Recruitment Message</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
            CASE: #SH-92841
          </span>
          <button
            onClick={onOpenEvidence}
            className="text-xs font-bold text-sky-700 hover:text-sky-900 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-200 transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Forensic Evidence</span>
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Main Verdict Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-sky-900/5 border border-red-200 overflow-hidden">
          {/* Verdict Banner */}
          <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 px-6 sm:px-8 py-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0">
                <ShieldAlert className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-white text-red-700 text-[10px] font-black uppercase tracking-wider font-mono">
                    THREAT VERDICT
                  </span>
                  <span className="text-xs text-red-100 font-mono">CONFIDENCE: 98.2%</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold font-headline text-white mt-1">
                  High Risk — Severe Job Fraud Pattern Detected
                </h1>
                <p className="text-xs text-red-100 mt-1 max-w-xl">
                  Do not make any payment or transmit identity credentials. This offer letter matches established fee extraction syndicates.
                </p>
              </div>
            </div>

            {/* Risk Gauge Metric */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center shrink-0 min-w-[140px]">
              <div className="text-[10px] uppercase tracking-wider text-red-100 font-mono font-medium">
                RISK SCORE
              </div>
              <div className="text-4xl font-bold text-white font-headline my-0.5">
                82<span className="text-xl font-medium text-red-200">/100</span>
              </div>
              <div className="text-[10px] font-semibold text-red-100 bg-red-800/60 px-2 py-0.5 rounded-full">
                CRITICAL THREAT
              </div>
            </div>
          </div>

          {/* Intercepted Pattern Summary Box */}
          <div className="p-6 sm:p-8 bg-slate-50 border-b border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono mb-4">
              Intercepted Entity & Offer Profile
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-3.5 bg-white rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 block font-mono">CLAIMED COMPANY</span>
                <span className="text-xs font-bold text-slate-900 font-headline mt-0.5 block">
                  Apex Retail Solutions Ltd
                </span>
                <span className="text-[10px] text-red-600 font-medium">Unverified CIN in MCA</span>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 block font-mono">OFFERED POSITION</span>
                <span className="text-xs font-bold text-slate-900 font-headline mt-0.5 block">
                  Assistant Project Coordinator
                </span>
                <span className="text-[10px] text-slate-500">Work from Home</span>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 block font-mono">PROMISED SALARY</span>
                <span className="text-xs font-bold text-emerald-700 font-headline mt-0.5 block">
                  ₹75,000 / month
                </span>
                <span className="text-[10px] text-amber-600 font-medium">Unrealistic entry compensation</span>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-red-200 bg-red-50/40">
                <span className="text-[10px] font-bold text-red-600 block font-mono">FEE OBLIGATION</span>
                <span className="text-xs font-bold text-red-700 font-headline mt-0.5 block">
                  ₹1,999 Refundable Deposit
                </span>
                <span className="text-[10px] text-red-600 font-semibold">Flagrant Violation</span>
              </div>
            </div>

            {/* Action buttons inside card */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenVerifyCompany}
                className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-800 rounded-xl text-xs font-semibold border border-slate-200 shadow-sm transition-all flex items-center gap-2"
              >
                <Building2 className="w-4 h-4 text-sky-600" />
                <span>Verify Company Name via MCA & LinkedIn Registries</span>
              </button>

              <button
                onClick={onOpenShareWarning}
                className="px-4 py-2.5 bg-sky-50 hover:bg-sky-100 text-sky-800 rounded-xl text-xs font-semibold border border-sky-200 transition-all flex items-center gap-2"
              >
                <Share2 className="w-4 h-4 text-sky-600" />
                <span>Share This Warning with Friends & Family</span>
              </button>

              <button
                onClick={onOpenReportModal}
                className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-800 rounded-xl text-xs font-semibold border border-red-200 transition-all flex items-center gap-2 ml-auto"
              >
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span>Submit Flag to Community Radar</span>
              </button>
            </div>
          </div>

          {/* Forensic Cyber Threat Quarantine Showcase Banner */}
          <div className="p-6 sm:p-8 bg-slate-950 border-b border-slate-800 text-white relative overflow-hidden">
            {/* Ambient Lighting */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
              {/* Left Column Text & Telemetry */}
              <div className="lg:col-span-6 space-y-3">
                <div className="inline-flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-400 bg-red-950/80 px-2.5 py-1 rounded border border-red-800/80 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    AUTONOMOUS QUARANTINE SHIELD
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    ISOLATION_ZONE #84
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-headline leading-tight text-white">
                  Extraction Trap Neutralized
                </h3>

                <p className="text-xs text-slate-300 font-body-md leading-relaxed">
                  ScamShield's neural classifier detected and isolated the extortion pattern before payment execution. The syndicate's UPI collection handles and Telegram recruitment channel have been queued for national radar propagation.
                </p>

                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  <div className="p-2.5 rounded-xl bg-slate-900/90 border border-red-500/30">
                    <span className="text-[9.5px] font-mono uppercase text-red-400 block font-bold">INTERCEPTED ACTION</span>
                    <span className="text-xs font-bold text-slate-100 font-headline">₹1,999 UPI Request Blocked</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/90 border border-sky-500/30">
                    <span className="text-[9.5px] font-mono uppercase text-sky-400 block font-bold">LEGAL EVIDENCE TAG</span>
                    <span className="text-xs font-bold text-slate-100 font-headline">SHA-256 Forensics Sealed</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Animated Cyber Threat Visual */}
              <div className="lg:col-span-6 flex justify-center">
                <motion.div 
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative w-full max-w-[460px] rounded-2xl overflow-hidden border border-red-500/50 shadow-2xl shadow-red-950/70 bg-slate-900 group"
                >
                  {/* Laser Scanning Line Animation */}
                  <motion.div 
                    animate={{ y: [-140, 240, -140] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute left-0 right-0 h-[2px] bg-red-400 shadow-[0_0_12px_#f43f5e] pointer-events-none z-30"
                  />

                  {/* Top HUD Bar */}
                  <div className="absolute top-0 left-0 right-0 z-20 px-3 py-1.5 bg-gradient-to-b from-slate-950/90 to-transparent flex items-center justify-between text-[9.5px] font-mono">
                    <span className="text-red-400 font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                      THREAT VECTOR ISOLATED
                    </span>
                    <span className="text-slate-400 bg-black/60 px-2 py-0.5 rounded border border-slate-700">
                      SECURE_ENCLAVE
                    </span>
                  </div>

                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={threatQuarantineImg}
                      alt="Cyber Defense Threat Intercept"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none" />
                  </div>

                  {/* Bottom Warning Badge */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between p-2 rounded-xl bg-slate-950/90 border border-red-500/50 backdrop-blur-md text-[10px] font-mono">
                    <span className="text-red-300 font-bold">
                      DO NOT PAY OR TRANSMIT AADHAAR / PAN
                    </span>
                    <span className="text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                      SAFEGUARDED
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Detailed Section: Why We Flagged This */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-headline flex items-center gap-2">
                <span>Why We Flagged This Offer</span>
                <span className="text-xs font-mono font-normal text-slate-500">(3 Primary Deception Vectors)</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                The message was matched against our catalog of over 40,000 intercepted fraudulent recruitment campaigns.
              </p>
            </div>

            <div className="space-y-4">
              {/* Vector 1 */}
              <div className="p-5 rounded-2xl border border-red-200 bg-red-50/50 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs">
                      1
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 font-headline">
                      Monetary Demand Before Joining (Registration / Security Deposit)
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-red-100 text-red-800 px-2.5 py-1 rounded-md border border-red-200">
                    SEVERITY: CRITICAL (98%)
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-body-md">
                  The message demands a "refundable security deposit of ₹1,999 within 2 hours". Under standard labor regulations (including International Labor Organization Convention C181, Article 7), legitimate corporate employers never charge prospective job candidates any fee for training kits, application processing, or laptop allocation.
                </p>
                <div className="p-2.5 bg-white rounded-xl border border-red-200/80 text-[11px] font-mono text-red-900">
                  ⚠️ Intercepted Clause: "To confirm your seat, pay a refundable security deposit of ₹1,999 within 2 hours."
                </div>
              </div>

              {/* Vector 2 */}
              <div className="p-5 rounded-2xl border border-amber-200 bg-amber-50/50 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs">
                      2
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 font-headline">
                      Recruitment Channel Redirection to Telegram
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-md border border-amber-200">
                    SEVERITY: HIGH (88%)
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-body-md">
                  Recruiters urging candidates off legitimate email or professional portals into private Telegram handles (e.g. <code>@hr_apex_jobs</code>) do so to evade platform moderation and enable auto-deleting message histories once funds are transferred.
                </p>
              </div>

              {/* Vector 3 */}
              <div className="p-5 rounded-2xl border border-rose-200 bg-rose-50/50 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-xs">
                      3
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 font-headline">
                      High-Salary to Low-Skill Ratio with Zero Formal Interview
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-rose-100 text-rose-800 px-2.5 py-1 rounded-md border border-rose-200">
                    SEVERITY: HIGH (84%)
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-body-md">
                  Promising ₹75,000 per month for work-from-home coordination without conducting technical screenings, video interviews, or background credential checks is a hallmark phishing bait mechanism.
                </p>
              </div>
            </div>
          </div>

          {/* Actionable Playbook: What To Do Next */}
          <div className="p-6 sm:p-8 bg-slate-900 text-white space-y-6">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800">
                DEFENSIVE PLAYBOOK
              </span>
              <h3 className="text-xl font-bold font-headline text-white mt-2">
                What To Do Next (3 Immediate Protective Steps)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-red-400 font-bold text-xs font-headline">
                  <XCircle className="w-4 h-4 text-red-400" />
                  <span>1. DO NOT PAY ANY MONEY</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Never transfer funds via UPI, Google Pay, PhonePe, or payment links. Any demand for "refunds later" is a proven psychological trap.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs font-headline">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  <span>2. BLOCK & REPORT SENDER</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Block the phone number and Telegram handle. Report as spam inside the app so their accounts get flagged across telecom registers.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs font-headline">
                  <Search className="w-4 h-4 text-emerald-400" />
                  <span>3. VERIFY ON OFFICIAL SITE</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Check the company's verified LinkedIn page or corporate careers portal. Genuine jobs are always publicly indexed there.
                </p>
              </div>
            </div>

            {/* Bottom Playbook Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
              <span className="text-xs text-slate-400">
                Need to protect others? Your anonymized flag helps 42,000+ candidates across India.
              </span>
              <button
                onClick={() => onNavigate('scam-radar')}
                className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold transition-all shadow-md flex items-center gap-2 shrink-0"
              >
                <span>View Threat on Live Radar</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
