"use client";
import { useState } from "react";

/* ─── Channel logos (inline SVGs for brand fidelity) ─── */
const SlackLogo = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/>
    <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/>
    <path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.27 0a2.528 2.528 0 0 1-2.522 2.521 2.528 2.528 0 0 1-2.52-2.521V2.522A2.528 2.528 0 0 1 15.165 0a2.528 2.528 0 0 1 2.521 2.522v6.312z" fill="#2EB67D"/>
    <path d="M15.165 18.956a2.528 2.528 0 0 1 2.521 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.27a2.527 2.527 0 0 1-2.52-2.522 2.527 2.527 0 0 1 2.52-2.52h6.313A2.528 2.528 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.521h-6.313z" fill="#ECB22E"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B7F5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 6L2 7"/>
  </svg>
);

const MicIcon = ({ active }: { active: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#D52B1E" : "#9CA3AF"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="1" width="6" height="12" rx="3"/><path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"/>
  </svg>
);

const UploadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
  </svg>
);

/* ─── Step types ─── */
type Step = "describe" | "preview" | "schedule" | "distribute" | "done";

/* ─── Suggested prompts ─── */
const SUGGESTIONS = [
  "Weekly L2C funnel report showing conversion rates by channel, grouped by week",
  "Monthly P&L summary with project margins and campaign ROI breakdown",
  "Pipeline health scorecard with deal velocity and at-risk deals",
  "Customer engagement report with LTV trends and churn risk flags",
];

/* ─── Mock generated report data ─── */
const MOCK_METRICS = [
  { label: "Campaign Revenue", value: "$142.6K", trend: "+18%" },
  { label: "Pipeline Value", value: "$187K", trend: "+12%" },
  { label: "E2E Conversion", value: "3.6%", trend: "+0.4pp" },
  { label: "Cash Collected", value: "$48K", trend: "+8%" },
  { label: "DSO", value: "27 days", trend: "-3 days" },
  { label: "Avg Margin", value: "18%", trend: "+2pp" },
];

export function AIReportBuilder() {
  const [step, setStep] = useState<Step>("describe");
  const [prompt, setPrompt] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [cadence, setCadence] = useState("weekly");
  const [day, setDay] = useState("monday");
  const [time, setTime] = useState("09:00");
  const [channels, setChannels] = useState({ email: true, slack: false });
  const [emailRecipients, setEmailRecipients] = useState("maria.santos@santosdb.com, jesse.santos@santosdb.com");
  const [slackChannel, setSlackChannel] = useState("#l2c-reports");
  const [generating, setGenerating] = useState(false);
  const [brandName] = useState("Santos Design & Build");

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setStep("preview");
    }, 2000);
  };

  const handleSchedule = () => setStep("schedule");
  const handleDistribute = () => setStep("distribute");
  const handleFinish = () => setStep("done");
  const handleReset = () => { setStep("describe"); setPrompt(""); setUploadedFile(null); };

  return (
    <div className="qbo-card overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg ii-gradient flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-[#22262A]">AI Report Builder</h3>
            <p className="text-[11px] text-[#9CA3AF]">Describe your report in plain English — Intuit Intelligence builds, brands, and delivers it</p>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mt-4">
          {(["describe", "preview", "schedule", "distribute"] as Step[]).map((s, i) => {
            const labels = ["Describe", "Preview", "Schedule", "Distribute"];
            const isActive = s === step;
            const isDone = (["describe", "preview", "schedule", "distribute"] as Step[]).indexOf(step) > i || step === "done";
            return (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
                  isDone ? "bg-[#108000]/10 text-[#108000]" :
                  isActive ? "bg-[#0B7F5C]/10 text-[#0B7F5C]" :
                  "bg-[#F3F4F6] text-[#9CA3AF]"
                }`}>
                  {isDone ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#108000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  ) : (
                    <span className="w-4 h-4 rounded-full border-2 flex items-center justify-center text-[8px]" style={{ borderColor: isActive ? "#0B7F5C" : "#D1D5DB" }}>{i + 1}</span>
                  )}
                  {labels[i]}
                </div>
                {i < 3 && <div className={`flex-1 h-px ${isDone ? "bg-[#108000]/30" : "bg-[#E5E7EB]"}`} />}
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══ Step 1: Describe ═══ */}
      {step === "describe" && (
        <div className="p-5 space-y-4">
          {/* Natural language input */}
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the report you want to build…&#10;&#10;e.g. &quot;Weekly L2C funnel report showing conversion rates by channel, grouped by week, with campaign ROI and top 5 leads at risk&quot;"
              className="w-full h-[100px] px-4 py-3 pr-24 border border-[#E5E7EB] rounded-lg text-[13px] text-[#22262A] placeholder:text-[#D1D5DB] resize-none focus:outline-none focus:border-[#0B7F5C] focus:ring-1 focus:ring-[#0B7F5C]/20"
            />
            <div className="absolute right-3 bottom-3 flex items-center gap-2">
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`p-1.5 rounded-md transition-colors ${isRecording ? "bg-[#D52B1E]/10" : "hover:bg-[#F3F4F6]"}`}
                title="Voice input"
              >
                <MicIcon active={isRecording} />
              </button>
              <label className="p-1.5 rounded-md hover:bg-[#F3F4F6] cursor-pointer" title="Upload sample report">
                <UploadIcon />
                <input type="file" className="hidden" accept=".pdf,.xlsx,.csv,.png,.jpg" onChange={(e) => setUploadedFile(e.target.files?.[0]?.name || null)} />
              </label>
            </div>
          </div>

          {isRecording && (
            <div className="flex items-center gap-2 px-3 py-2 bg-[#FEF2F2] rounded-lg">
              <div className="w-2 h-2 rounded-full bg-[#D52B1E] animate-pulse" />
              <span className="text-[11px] text-[#D52B1E] font-medium">Recording… speak your report requirements</span>
              <button onClick={() => setIsRecording(false)} className="ml-auto text-[11px] text-[#D52B1E] font-medium underline">Stop</button>
            </div>
          )}

          {uploadedFile && (
            <div className="flex items-center gap-2 px-3 py-2 bg-[#E6F5F0] rounded-lg">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0B7F5C" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>
              <span className="text-[11px] text-[#0B7F5C] font-medium">{uploadedFile}</span>
              <span className="text-[10px] text-[#9CA3AF]">— will match branding and layout</span>
              <button onClick={() => setUploadedFile(null)} className="ml-auto text-[#9CA3AF] hover:text-[#D52B1E]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
          )}

          {/* Suggestion chips */}
          <div>
            <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">Suggested reports</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => setPrompt(s)} className="text-[11px] text-[#0B7F5C] px-3 py-1.5 rounded-full border border-[#0B7F5C]/15 bg-[#E6F5F0]/40 hover:bg-[#E6F5F0] hover:border-[#0B7F5C]/30 transition-all text-left leading-snug">
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || generating}
            className="w-full py-2.5 rounded-lg ii-gradient text-white text-[13px] font-semibold disabled:opacity-40 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            {generating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating report…
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" /></svg>
                Generate Report
              </>
            )}
          </button>
        </div>
      )}

      {/* ═══ Step 2: Preview ═══ */}
      {step === "preview" && (
        <div className="p-5 space-y-4">
          {/* Branded report preview */}
          <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
            {/* Report header */}
            <div className="bg-[#22262A] px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-[16px] font-bold text-white">{brandName}</p>
                <p className="text-[11px] text-white/60">Weekly L2C Performance Report</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-white/50">Report Period</p>
                <p className="text-[12px] text-white font-medium">Mar 17 – Mar 23, 2026</p>
              </div>
            </div>

            {/* Metrics grid */}
            <div className="p-4 grid grid-cols-3 gap-3">
              {MOCK_METRICS.map((m) => (
                <div key={m.label} className="p-3 bg-[#F3F4F6] rounded-lg">
                  <p className="text-[10px] text-[#9CA3AF] uppercase">{m.label}</p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-[18px] font-bold text-[#22262A]">{m.value}</span>
                    <span className={`text-[11px] font-medium ${m.trend.startsWith("+") || m.trend.startsWith("-3") ? "text-[#108000]" : "text-[#D52B1E]"}`}>
                      {m.trend.startsWith("+") || m.trend.startsWith("-3") ? "▲" : "▼"} {m.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Mini chart placeholder */}
            <div className="px-4 pb-4">
              <div className="h-[80px] bg-gradient-to-r from-[#0B7F5C]/5 via-[#0B7F5C]/10 to-[#0B7F5C]/5 rounded-lg flex items-center justify-center">
                <div className="flex items-end gap-1 h-[50px]">
                  {[35, 42, 38, 55, 48, 62, 58].map((h, i) => (
                    <div key={i} className="w-6 rounded-t-sm" style={{ height: `${h}%`, backgroundColor: i === 6 ? "#0B7F5C" : "#0B7F5C" + "60" }} />
                  ))}
                </div>
              </div>
              <p className="text-[9px] text-[#9CA3AF] text-center mt-1">Weekly conversion trend — 7 weeks</p>
            </div>

            {/* AI insight */}
            <div className="mx-4 mb-4 p-3 bg-[#E6F5F0] rounded-lg flex items-start gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#0B7F5C" className="shrink-0 mt-0.5"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" /></svg>
              <p className="text-[11px] text-[#22262A] leading-relaxed">
                <strong>Intuit Intelligence:</strong> Revenue is up 18% but cash collection lags at 25.7%. Recommend accelerating AR follow-ups for Morrison ($6.2K) and switching check payers to ACH.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button onClick={() => setStep("describe")} className="text-[12px] text-[#6B7280] hover:text-[#22262A]">← Edit prompt</button>
            <div className="flex gap-2">
              <button className="text-[12px] px-3 py-1.5 border border-[#D1D5DB] rounded-md text-[#22262A] font-medium hover:bg-[#F3F4F6]">Download PDF</button>
              <button onClick={handleSchedule} className="text-[12px] px-4 py-1.5 bg-[#0B7F5C] text-white rounded-md font-medium hover:bg-[#096B4D]">
                Schedule & Distribute →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ Step 3: Schedule ═══ */}
      {step === "schedule" && (
        <div className="p-5 space-y-4">
          <h4 className="text-[13px] font-semibold text-[#22262A]">Set Delivery Schedule</h4>

          <div className="grid grid-cols-3 gap-3">
            {/* Cadence */}
            <div>
              <label className="text-[10px] font-semibold text-[#9CA3AF] uppercase">Frequency</label>
              <div className="flex gap-1 mt-1.5">
                {["weekly", "biweekly", "monthly"].map((c) => (
                  <button key={c} onClick={() => setCadence(c)} className={`text-[11px] px-3 py-1.5 rounded-md font-medium capitalize ${cadence === c ? "bg-[#0B7F5C] text-white" : "bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]"}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Day */}
            <div>
              <label className="text-[10px] font-semibold text-[#9CA3AF] uppercase">Day</label>
              <select value={day} onChange={(e) => setDay(e.target.value)} className="mt-1.5 w-full text-[12px] border border-[#E5E7EB] rounded-md px-3 py-1.5 text-[#22262A] bg-white">
                {["monday", "tuesday", "wednesday", "thursday", "friday"].map((d) => (
                  <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
                ))}
              </select>
            </div>

            {/* Time */}
            <div>
              <label className="text-[10px] font-semibold text-[#9CA3AF] uppercase">Time</label>
              <select value={time} onChange={(e) => setTime(e.target.value)} className="mt-1.5 w-full text-[12px] border border-[#E5E7EB] rounded-md px-3 py-1.5 text-[#22262A] bg-white">
                {["07:00", "08:00", "09:00", "10:00", "12:00"].map((t) => (
                  <option key={t} value={t}>{t} AM</option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-3 bg-[#F3F4F6] rounded-lg">
            <p className="text-[11px] text-[#6B7280]">
              📅 Next report: <strong className="text-[#22262A]">{day.charAt(0).toUpperCase() + day.slice(1)}, Mar 30, 2026 at {time} AM</strong>
            </p>
          </div>

          <div className="flex justify-between">
            <button onClick={() => setStep("preview")} className="text-[12px] text-[#6B7280] hover:text-[#22262A]">← Back</button>
            <button onClick={handleDistribute} className="text-[12px] px-4 py-1.5 bg-[#0B7F5C] text-white rounded-md font-medium hover:bg-[#096B4D]">
              Set Distribution →
            </button>
          </div>
        </div>
      )}

      {/* ═══ Step 4: Distribute ═══ */}
      {step === "distribute" && (
        <div className="p-5 space-y-4">
          <h4 className="text-[13px] font-semibold text-[#22262A]">Choose Distribution Channels</h4>

          {/* Channel toggles */}
          <div className="space-y-3">
            {/* Email */}
            <div className={`p-4 rounded-lg border transition-colors ${channels.email ? "border-[#0B7F5C]/20 bg-[#E6F5F0]/30" : "border-[#E5E7EB]"}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <EmailIcon />
                  <span className="text-[12px] font-semibold text-[#22262A]">Email</span>
                </div>
                <button onClick={() => setChannels(p => ({ ...p, email: !p.email }))} className={`w-9 h-5 rounded-full transition-colors ${channels.email ? "bg-[#0B7F5C]" : "bg-[#E5E7EB]"}`}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${channels.email ? "translate-x-4" : "translate-x-0.5"}`} />
                </button>
              </div>
              {channels.email && (
                <div>
                  <label className="text-[10px] text-[#9CA3AF] uppercase font-semibold">Recipients</label>
                  <input
                    value={emailRecipients}
                    onChange={(e) => setEmailRecipients(e.target.value)}
                    placeholder="name@company.com, name2@company.com"
                    className="w-full mt-1 text-[12px] border border-[#E5E7EB] rounded-md px-3 py-2 text-[#22262A] placeholder:text-[#D1D5DB] focus:outline-none focus:border-[#0B7F5C]"
                  />
                  <p className="text-[10px] text-[#9CA3AF] mt-1">Separate multiple addresses with commas</p>
                </div>
              )}
            </div>

            {/* Slack */}
            <div className={`p-4 rounded-lg border transition-colors ${channels.slack ? "border-[#0B7F5C]/20 bg-[#E6F5F0]/30" : "border-[#E5E7EB]"}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <SlackLogo />
                  <span className="text-[12px] font-semibold text-[#22262A]">Slack</span>
                </div>
                <button onClick={() => setChannels(p => ({ ...p, slack: !p.slack }))} className={`w-9 h-5 rounded-full transition-colors ${channels.slack ? "bg-[#0B7F5C]" : "bg-[#E5E7EB]"}`}>
                  <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${channels.slack ? "translate-x-4" : "translate-x-0.5"}`} />
                </button>
              </div>
              {channels.slack && (
                <div>
                  <label className="text-[10px] text-[#9CA3AF] uppercase font-semibold">Channel or DM</label>
                  <input
                    value={slackChannel}
                    onChange={(e) => setSlackChannel(e.target.value)}
                    placeholder="#channel-name or @person"
                    className="w-full mt-1 text-[12px] border border-[#E5E7EB] rounded-md px-3 py-2 text-[#22262A] placeholder:text-[#D1D5DB] focus:outline-none focus:border-[#0B7F5C]"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="p-3 bg-[#F3F4F6] rounded-lg space-y-1">
            <p className="text-[11px] font-semibold text-[#22262A]">Report Summary</p>
            <p className="text-[11px] text-[#6B7280]">📋 Weekly L2C Performance Report</p>
            <p className="text-[11px] text-[#6B7280]">📅 Every {day}, {time} AM</p>
            {channels.email && <p className="text-[11px] text-[#6B7280]">📧 Email → {emailRecipients.split(",").length} recipient{emailRecipients.split(",").length > 1 ? "s" : ""}</p>}
            {channels.slack && <p className="text-[11px] text-[#6B7280]">💬 Slack → {slackChannel}</p>}
          </div>

          <div className="flex justify-between">
            <button onClick={() => setStep("schedule")} className="text-[12px] text-[#6B7280] hover:text-[#22262A]">← Back</button>
            <button onClick={handleFinish} className="text-[12px] px-4 py-2 ii-gradient text-white rounded-md font-semibold hover:opacity-90 flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" /></svg>
              Activate Report
            </button>
          </div>
        </div>
      )}

      {/* ═══ Step 5: Done ═══ */}
      {step === "done" && (
        <div className="p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#108000]/10 flex items-center justify-center mx-auto">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#108000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
          <h4 className="text-[16px] font-semibold text-[#22262A]">Report Scheduled!</h4>
          <p className="text-[12px] text-[#6B7280] max-w-md mx-auto">
            Your Weekly L2C Performance Report is active. Intuit Intelligence will generate and deliver it every <strong>{day}</strong> at <strong>{time} AM</strong>.
          </p>
          <div className="flex justify-center gap-2 pt-2">
            <button onClick={handleReset} className="text-[12px] px-4 py-1.5 border border-[#D1D5DB] rounded-md text-[#22262A] font-medium hover:bg-[#F3F4F6]">Build Another Report</button>
            <button className="text-[12px] px-4 py-1.5 bg-[#0B7F5C] text-white rounded-md font-medium hover:bg-[#096B4D]">View All Reports</button>
          </div>
        </div>
      )}
    </div>
  );
}
