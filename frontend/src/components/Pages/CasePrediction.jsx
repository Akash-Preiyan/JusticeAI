import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {
  Activity,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText,
  Gavel,
  PlusIcon,
  Scale,
  Shield,
  Trash2,
  Upload,
  Users,
  X,
  Zap,
} from "lucide-react";

const API_BASE = "https://justiceai-backend.onrender.com/api";

const EMPTY_DOCUMENT = {
  category: "",
  type: "",
  name: "",
  date: "",
  originalOrCopy: "",
  issuedBy: "",
  isRegistered: "",
  isNotarized: "",
  isDisputed: "",
  description: "",
  file: null,
};

const EMPTY_WITNESS = {
  name: "",
  type: "",
  relationship: "",
  statement: "",
  isIndependent: "",
  availableForCourt: "",
  credibility: "",
};

const EMPTY_DIGITAL_EVIDENCE = {
  type: "",
  platform: "",
  dateTime: "",
  originalDeviceAvailable: "",
  screenshotAvailable: "",
  metadataAvailable: "",
  certificate65B: "",
  tamperingAlleged: "",
  description: "",
  file: null,
};

const EMPTY_PARTY = {
  name: "",
  type: "",
  claim: "",
  facts: "",
  evidence: "",
};

const EMPTY_FORM = {
  caseType: "",
  courtLevel: "",
  jurisdiction: "",
  caseStage: "",
  filingYear: "",
  urgencyLevel: "",
  reliefRequested: "",

  petitioner: { ...EMPTY_PARTY },
  respondent: { ...EMPTY_PARTY },

  mainLegalIssue: "",
  subIssues: "",
  applicableLaws: "",

  backgroundFacts: "",
  timeline: "",
  causeOfActionDate: "",
  noticeSentDate: "",
  complaintDate: "",

  documents: [{ ...EMPTY_DOCUMENT }],
  witnesses: [{ ...EMPTY_WITNESS }],
  digitalEvidence: [{ ...EMPTY_DIGITAL_EVIDENCE }],

  previousCourtDecision: "",
  interimOrders: "",
  appealStatus: "",
  bailStatus: "",
  injunctionStatus: "",
  stayOrderStatus: "",
  delayInFiling: "",
  limitationIssue: "",
  settlementAttempted: "",
  mediationDone: "",

  strongestPoint: "",
  weakestPoint: "",
  oppositeStrongestPoint: "",
  missingEvidence: "",
  contradictions: "",
  riskFactors: "",
  additionalContext: "",
};

const STEPS = [
  { id: 1, label: "Case Details", icon: Scale },
  { id: 2, label: "Parties", icon: Users },
  { id: 3, label: "Facts", icon: FileText },
  { id: 4, label: "Legal Issues", icon: Gavel },
  { id: 5, label: "Documents", icon: FileText },
  { id: 6, label: "Witnesses", icon: Users },
  { id: 7, label: "Procedure", icon: Shield },
  { id: 8, label: "Review", icon: Eye },
];

const GlassCard = ({ children, className = "" }) => {
  return (
    <div
      className={`rounded-2xl border border-[#e8ddd2] bg-white/75 backdrop-blur-md shadow-sm p-6 ${className}`}
    >
      {children}
    </div>
  );
};

const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-extrabold text-[#1f0d04]">{title}</h2>
      {subtitle && <p className="text-sm text-[#7a6355] mt-1">{subtitle}</p>}
    </div>
  );
};

const Label = ({ children }) => {
  return (
    <label className="block mb-2 text-sm font-semibold text-[#1f0d04]">
      {children}
    </label>
  );
};

const Input = (props) => {
  return (
    <input
      {...props}
      className="w-full rounded-xl border border-[#e8ddd2] bg-white px-4 py-3 text-sm outline-none transition-all placeholder:text-[#b7a395] focus:border-[#c4965a] focus:ring-4 focus:ring-[#c4965a]/10"
    />
  );
};

const TextArea = (props) => {
  return (
    <textarea
      {...props}
      className="w-full rounded-xl border border-[#e8ddd2] bg-white px-4 py-3 text-sm outline-none resize-none transition-all placeholder:text-[#b7a395] focus:border-[#c4965a] focus:ring-4 focus:ring-[#c4965a]/10"
    />
  );
};

const Select = ({ children, ...props }) => {
  return (
    <select
      {...props}
      className="w-full rounded-xl border border-[#e8ddd2] bg-white px-4 py-3 text-sm outline-none transition-all focus:border-[#c4965a] focus:ring-4 focus:ring-[#c4965a]/10"
    >
      {children}
    </select>
  );
};

const FileInput = ({ onChange, file, accept }) => {
  return (
    <div>
      <label className="flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-[#c4965a]/60 bg-[#fffaf3] px-4 py-6 cursor-pointer hover:bg-[#c4965a]/10 transition-all">
        <Upload size={24} className="text-[#c4965a]" />

        <div className="text-center">
          <p className="text-sm font-bold text-[#2b1408]">
            Click to upload file
          </p>
          <p className="text-xs text-[#7a6355] mt-1">
            PDF, DOC, DOCX, JPG, PNG, MP4, MP3, TXT
          </p>
        </div>

        <input
          type="file"
          accept={accept}
          onChange={onChange}
          className="hidden"
        />
      </label>

      {file && (
        <p className="mt-2 text-xs text-[#7a6355]">
          Selected file:{" "}
          <span className="font-semibold text-[#2b1408]">{file.name}</span>
        </p>
      )}
    </div>
  );
};

const StepBar = ({ step }) => {
  return (
    <div className="mb-10 overflow-x-auto pb-3">
      <div className="min-w-[850px] flex items-center">
        {STEPS.map((s, index) => {
          const Icon = s.icon;
          const active = step === s.id;
          const completed = step > s.id;

          return (
            <React.Fragment key={s.id}>
              <div className="flex flex-col items-center shrink-0">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center border-2 transition-all duration-300 ${
                    completed
                      ? "bg-green-700 border-green-700 text-white"
                      : active
                      ? "bg-[#2b1408] border-[#2b1408] text-white shadow-lg shadow-[#2b1408]/20 scale-105"
                      : "bg-[#f5efe6] border-[#e8ddd2] text-[#b0967e]"
                  }`}
                >
                  <Icon size={18} />
                </div>

                <span
                  className={`mt-2 text-xs font-bold ${
                    active
                      ? "text-[#2b1408]"
                      : completed
                      ? "text-green-700"
                      : "text-[#b0967e]"
                  }`}
                >
                  {s.label}
                </span>
              </div>

              {index < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-[2px] mx-3 mb-6 ${
                    completed ? "bg-green-700" : "bg-[#e8ddd2]"
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

const ReviewRow = ({ label, value }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-5 border-b border-[#e8ddd2] py-3 last:border-b-0">
      <p className="text-sm text-[#7a6355]">{label}</p>
      <p className="text-sm font-semibold text-[#1f0d04] whitespace-pre-wrap">
        {value || "Not provided"}
      </p>
    </div>
  );
};

const ReviewBlock = ({ title, children }) => {
  return (
    <GlassCard>
      <p className="text-xs tracking-[0.2em] text-[#c4965a] font-bold mb-4 uppercase">
        {title}
      </p>
      {children}
    </GlassCard>
  );
};

const MetricCard = ({ title, value, text, color }) => {
  return (
    <GlassCard>
      <h3 className="text-sm font-bold mb-4">{title}</h3>

      <div className="h-3 bg-[#f5efe6] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>

      <p className="mt-3 text-sm text-[#7a6355]">
        {value}% — {text}
      </p>
    </GlassCard>
  );
};

export default function CasePrediction() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [step, setStep] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const token = sessionStorage.getItem("token");

  const authHeader = useCallback(() => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }, [token]);

  useEffect(() => {
    if (!token) return;

    axios
      .get(`${API_BASE}/Case_prediction/get_Case_Predictions`, authHeader())
      .then(({ data }) => setPredictions(data))
      .catch((err) => console.log(err));
  }, [token, authHeader]);

  const updateParty = (party, key, value) => {
    setForm((prev) => ({
      ...prev,
      [party]: {
        ...prev[party],
        [key]: value,
      },
    }));
  };

  const updateDocument = (index, key, value) => {
    setForm((prev) => {
      const updated = [...prev.documents];
      updated[index] = { ...updated[index], [key]: value };
      return { ...prev, documents: updated };
    });
  };

  const addDocument = () => {
    setForm((prev) => ({
      ...prev,
      documents: [...prev.documents, { ...EMPTY_DOCUMENT }],
    }));
  };

  const removeDocument = (index) => {
    setForm((prev) => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }));
  };

  const updateWitness = (index, key, value) => {
    setForm((prev) => {
      const updated = [...prev.witnesses];
      updated[index] = { ...updated[index], [key]: value };
      return { ...prev, witnesses: updated };
    });
  };

  const addWitness = () => {
    setForm((prev) => ({
      ...prev,
      witnesses: [...prev.witnesses, { ...EMPTY_WITNESS }],
    }));
  };

  const removeWitness = (index) => {
    setForm((prev) => ({
      ...prev,
      witnesses: prev.witnesses.filter((_, i) => i !== index),
    }));
  };

  const updateDigitalEvidence = (index, key, value) => {
    setForm((prev) => {
      const updated = [...prev.digitalEvidence];
      updated[index] = { ...updated[index], [key]: value };
      return { ...prev, digitalEvidence: updated };
    });
  };

  const addDigitalEvidence = () => {
    setForm((prev) => ({
      ...prev,
      digitalEvidence: [
        ...prev.digitalEvidence,
        { ...EMPTY_DIGITAL_EVIDENCE },
      ],
    }));
  };

  const removeDigitalEvidence = (index) => {
    setForm((prev) => ({
      ...prev,
      digitalEvidence: prev.digitalEvidence.filter((_, i) => i !== index),
    }));
  };

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 8));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewPrediction = () => {
    setForm({
      ...EMPTY_FORM,
      petitioner: { ...EMPTY_PARTY },
      respondent: { ...EMPTY_PARTY },
      documents: [{ ...EMPTY_DOCUMENT }],
      witnesses: [{ ...EMPTY_WITNESS }],
      digitalEvidence: [{ ...EMPTY_DIGITAL_EVIDENCE }],
    });

    setStep(1);
    setSelected(null);
    setShowResult(false);
    setError("");
    setSidebarOpen(false);
  };

  const handleGeneratePrediction = async () => {
  try {
    setError("");
    setIsLoading(true);

    const cleanForm = {
      ...form,

      documents: form.documents.map((doc) => {
        const { file, ...rest } = doc;

        return {
          ...rest,
          originalFileName: file?.name || null,
        };
      }),

      digitalEvidence: form.digitalEvidence.map((ev) => {
        const { file, ...rest } = ev;

        return {
          ...rest,
          originalFileName: file?.name || null,
        };
      }),
    };

    const { data } = await axios.post(
      `${API_BASE}/Case_prediction/generate_prediction`,
      {
        caseData: cleanForm,
      },
      authHeader()
    );

    setSelected(data);

    setPredictions((prev) => [data, ...prev]);

    setShowResult(true);

  } catch (err) {
    console.log(err);

    setError("Prediction failed. Please try again.");

  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="h-screen flex overflow-hidden bg-[#f5ede0] text-[#1f0d04]">
      <aside
        className={`fixed z-30 top-0 left-0 h-full bg-[#190c03] text-white transition-all duration-300 overflow-hidden ${
          sidebarOpen ? "w-[280px]" : "w-0"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#c4965a]/20 flex items-center justify-center">
              <Gavel size={17} className="text-[#c4965a]" />
            </div>
            <span className="font-bold text-sm">Case Prediction</span>
          </div>

          <button onClick={() => setSidebarOpen(false)}>
            <X size={18} className="text-white/60" />
          </button>
        </div>

        <div className="p-4">
          <button
            onClick={handleNewPrediction}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#c4965a] hover:bg-[#d8ab70] transition-all text-[#1f0d04] py-3 font-semibold text-sm"
          >
            <PlusIcon size={16} />
            New Prediction
          </button>
        </div>

        <div className="px-3 pb-24 overflow-y-auto h-full">
          <p className="text-[10px] tracking-[0.15em] text-white/30 font-bold px-2 mb-4">
            HISTORY
          </p>

          <div className="space-y-2">
            {predictions.map((prediction, index) => (
              <div
                key={prediction._id || index}
                onClick={() => {
                  setSelected(prediction);
                  setShowResult(true);
                  setSidebarOpen(false);
                }}
                className="group flex items-center justify-between rounded-xl px-3 py-3 hover:bg-white/5 transition-all cursor-pointer"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-white/80 truncate">
                    {prediction.title ||
                      prediction.caseType ||
                      "Untitled Prediction"}
                  </p>

                  {prediction.createdAt && (
                    <p className="text-xs text-white/30 mt-1">
                      {new Date(prediction.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </div>

                <button>
                  <Trash2
                    size={14}
                    className="text-white/30 hover:text-red-500 transition-all"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-[#e8ddd2] bg-[#f5ede0]/90 backdrop-blur-md flex items-center px-6 gap-4 shrink-0">
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-[#e8ddd2] transition-all"
            >
              <ChevronRight size={18} />
            </button>
          )}

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2b1408]/10 flex items-center justify-center">
              <Gavel size={18} className="text-[#c4965a]" />
            </div>

            <div>
              <h1 className="font-bold text-sm">Case Prediction Engine</h1>
              <p className="text-xs text-[#7a6355]">
                AI-powered legal analytics
              </p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-5 md:px-8 py-10">
            {!showResult && (
              <>
                <div className="text-center mb-12">
                  <div className="w-16 h-16 rounded-2xl bg-[#2b1408] flex items-center justify-center mx-auto mb-5 shadow-lg">
                    <Gavel size={28} className="text-[#c4965a]" />
                  </div>

                  <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-[#2b1408]">
                    Case Prediction Engine
                  </h1>

                  <p className="max-w-2xl mx-auto text-[#7a6355] leading-7">
                    AI-powered outcome forecasting using case facts, uploaded
                    documents, witnesses, legal issues, and procedural history.
                  </p>
                </div>

                <StepBar step={step} />

                <GlassCard>
                  {step === 1 && (
                    <div className="space-y-6">
                      <SectionTitle
                        title="Case Details"
                        subtitle="Basic information about the case"
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <Label>Case Type</Label>
                          <Select
                            value={form.caseType}
                            onChange={(e) =>
                              setForm((prev) => ({
                                ...prev,
                                caseType: e.target.value,
                              }))
                            }
                          >
                            <option value="">Select case type</option>
                            <option>Property Dispute</option>
                            <option>Criminal Matter</option>
                            <option>Contract Dispute</option>
                            <option>Family Law</option>
                            <option>Consumer Complaint</option>
                            <option>Medical Negligence</option>
                            <option>Cyber Crime</option>
                            <option>Constitutional Matter</option>
                            <option>Employment Dispute</option>
                            <option>Tax Matter</option>
                          </Select>
                        </div>

                        <div>
                          <Label>Court Level</Label>
                          <Select
                            value={form.courtLevel}
                            onChange={(e) =>
                              setForm((prev) => ({
                                ...prev,
                                courtLevel: e.target.value,
                              }))
                            }
                          >
                            <option value="">Select court level</option>
                            <option>District Court</option>
                            <option>Sessions Court</option>
                            <option>Consumer Court</option>
                            <option>Family Court</option>
                            <option>Commercial Court</option>
                            <option>High Court</option>
                            <option>Supreme Court of India</option>
                            <option>Tribunal</option>
                          </Select>
                        </div>

                        <div>
                          <Label>Jurisdiction / State</Label>
                          <Input
                            value={form.jurisdiction}
                            onChange={(e) =>
                              setForm((prev) => ({
                                ...prev,
                                jurisdiction: e.target.value,
                              }))
                            }
                            placeholder="Example: Tamil Nadu"
                          />
                        </div>

                        <div>
                          <Label>Case Stage</Label>
                          <Select
                            value={form.caseStage}
                            onChange={(e) =>
                              setForm((prev) => ({
                                ...prev,
                                caseStage: e.target.value,
                              }))
                            }
                          >
                            <option value="">Select case stage</option>
                            <option>Pre-litigation</option>
                            <option>Filed</option>
                            <option>Notice Stage</option>
                            <option>Trial</option>
                            <option>Evidence Stage</option>
                            <option>Arguments</option>
                            <option>Judgment Reserved</option>
                            <option>Appeal</option>
                            <option>Revision</option>
                          </Select>
                        </div>

                        <div>
                          <Label>Filing Year</Label>
                          <Input
                            value={form.filingYear}
                            onChange={(e) =>
                              setForm((prev) => ({
                                ...prev,
                                filingYear: e.target.value,
                              }))
                            }
                            placeholder="Example: 2024"
                          />
                        </div>

                        <div>
                          <Label>Urgency Level</Label>
                          <Select
                            value={form.urgencyLevel}
                            onChange={(e) =>
                              setForm((prev) => ({
                                ...prev,
                                urgencyLevel: e.target.value,
                              }))
                            }
                          >
                            <option value="">Select urgency</option>
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                            <option>Emergency</option>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label>Relief Requested</Label>
                        <TextArea
                          rows={4}
                          value={form.reliefRequested}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              reliefRequested: e.target.value,
                            }))
                          }
                          placeholder="Example: Injunction, compensation, bail, custody, declaration of ownership"
                        />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-8">
                      <SectionTitle
                        title="Parties"
                        subtitle="Details of petitioner and respondent"
                      />

                      <GlassCard>
                        <p className="text-xs tracking-[0.2em] text-[#c4965a] font-bold mb-4">
                          PETITIONER / PLAINTIFF
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <Label>Name</Label>
                            <Input
                              value={form.petitioner.name}
                              onChange={(e) =>
                                updateParty(
                                  "petitioner",
                                  "name",
                                  e.target.value
                                )
                              }
                              placeholder="Example: Ravi Kumar"
                            />
                          </div>

                          <div>
                            <Label>Party Type</Label>
                            <Select
                              value={form.petitioner.type}
                              onChange={(e) =>
                                updateParty(
                                  "petitioner",
                                  "type",
                                  e.target.value
                                )
                              }
                            >
                              <option value="">Select type</option>
                              <option>Individual</option>
                              <option>Company</option>
                              <option>Government</option>
                              <option>Bank</option>
                              <option>Hospital</option>
                              <option>Organization</option>
                            </Select>
                          </div>
                        </div>

                        <div className="mt-5">
                          <Label>Claim Made</Label>
                          <TextArea
                            rows={4}
                            value={form.petitioner.claim}
                            onChange={(e) =>
                              updateParty(
                                "petitioner",
                                "claim",
                                e.target.value
                              )
                            }
                            placeholder="What is the petitioner claiming?"
                          />
                        </div>

                        <div className="mt-5">
                          <Label>Facts Supporting Claim</Label>
                          <TextArea
                            rows={4}
                            value={form.petitioner.facts}
                            onChange={(e) =>
                              updateParty(
                                "petitioner",
                                "facts",
                                e.target.value
                              )
                            }
                            placeholder="Important facts supporting petitioner"
                          />
                        </div>

                        <div className="mt-5">
                          <Label>Petitioner Evidence Summary</Label>
                          <TextArea
                            rows={4}
                            value={form.petitioner.evidence}
                            onChange={(e) =>
                              updateParty(
                                "petitioner",
                                "evidence",
                                e.target.value
                              )
                            }
                            placeholder="Documents, witnesses, digital evidence, expert reports"
                          />
                        </div>
                      </GlassCard>

                      <GlassCard>
                        <p className="text-xs tracking-[0.2em] text-[#c4965a] font-bold mb-4">
                          RESPONDENT / DEFENDANT
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <Label>Name</Label>
                            <Input
                              value={form.respondent.name}
                              onChange={(e) =>
                                updateParty(
                                  "respondent",
                                  "name",
                                  e.target.value
                                )
                              }
                              placeholder="Example: Suresh Kumar"
                            />
                          </div>

                          <div>
                            <Label>Party Type</Label>
                            <Select
                              value={form.respondent.type}
                              onChange={(e) =>
                                updateParty(
                                  "respondent",
                                  "type",
                                  e.target.value
                                )
                              }
                            >
                              <option value="">Select type</option>
                              <option>Individual</option>
                              <option>Company</option>
                              <option>Government</option>
                              <option>Bank</option>
                              <option>Hospital</option>
                              <option>Organization</option>
                            </Select>
                          </div>
                        </div>

                        <div className="mt-5">
                          <Label>Defense / Counter Claim</Label>
                          <TextArea
                            rows={4}
                            value={form.respondent.claim}
                            onChange={(e) =>
                              updateParty(
                                "respondent",
                                "claim",
                                e.target.value
                              )
                            }
                            placeholder="What is the respondent's defense?"
                          />
                        </div>

                        <div className="mt-5">
                          <Label>Facts Supporting Defense</Label>
                          <TextArea
                            rows={4}
                            value={form.respondent.facts}
                            onChange={(e) =>
                              updateParty(
                                "respondent",
                                "facts",
                                e.target.value
                              )
                            }
                            placeholder="Important facts supporting respondent"
                          />
                        </div>

                        <div className="mt-5">
                          <Label>Respondent Evidence Summary</Label>
                          <TextArea
                            rows={4}
                            value={form.respondent.evidence}
                            onChange={(e) =>
                              updateParty(
                                "respondent",
                                "evidence",
                                e.target.value
                              )
                            }
                            placeholder="Documents, witnesses, digital evidence, expert reports"
                          />
                        </div>
                      </GlassCard>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <SectionTitle
                        title="Facts & Timeline"
                        subtitle="Chronology and background of the dispute"
                      />

                      <div>
                        <Label>Background Facts</Label>
                        <TextArea
                          rows={5}
                          value={form.backgroundFacts}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              backgroundFacts: e.target.value,
                            }))
                          }
                          placeholder="Describe the complete background of the dispute"
                        />
                      </div>

                      <div>
                        <Label>Timeline of Events</Label>
                        <TextArea
                          rows={6}
                          value={form.timeline}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              timeline: e.target.value,
                            }))
                          }
                          placeholder={`Example:
2015 - Agreement signed
2020 - Dispute started
2021 - Legal notice sent
2022 - Case filed`}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div>
                          <Label>Cause of Action Date</Label>
                          <Input
                            type="date"
                            value={form.causeOfActionDate}
                            onChange={(e) =>
                              setForm((prev) => ({
                                ...prev,
                                causeOfActionDate: e.target.value,
                              }))
                            }
                          />
                        </div>

                        <div>
                          <Label>Notice Sent Date</Label>
                          <Input
                            type="date"
                            value={form.noticeSentDate}
                            onChange={(e) =>
                              setForm((prev) => ({
                                ...prev,
                                noticeSentDate: e.target.value,
                              }))
                            }
                          />
                        </div>

                        <div>
                          <Label>Complaint / FIR Date</Label>
                          <Input
                            type="date"
                            value={form.complaintDate}
                            onChange={(e) =>
                              setForm((prev) => ({
                                ...prev,
                                complaintDate: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-6">
                      <SectionTitle
                        title="Legal Issues"
                        subtitle="Core legal questions and applicable laws"
                      />

                      <div>
                        <Label>Main Legal Issue</Label>
                        <TextArea
                          rows={4}
                          value={form.mainLegalIssue}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              mainLegalIssue: e.target.value,
                            }))
                          }
                          placeholder="Example: Whether the respondent acquired valid title through a family settlement deed"
                        />
                      </div>

                      <div>
                        <Label>Sub Issues</Label>
                        <TextArea
                          rows={4}
                          value={form.subIssues}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              subIssues: e.target.value,
                            }))
                          }
                          placeholder="Example: forgery, possession, limitation, validity of document"
                        />
                      </div>

                      <div>
                        <Label>Applicable Laws / Sections</Label>
                        <TextArea
                          rows={4}
                          value={form.applicableLaws}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              applicableLaws: e.target.value,
                            }))
                          }
                          placeholder="Example: Transfer of Property Act, Evidence Act, IPC/BNS sections, Contract Act"
                        />
                      </div>
                    </div>
                  )}

                  {step === 5 && (
                    <div className="space-y-8">
                      <SectionTitle
                        title="Documents & Evidence"
                        subtitle="Add documentary evidence and upload actual files"
                      />

                      {form.documents.map((doc, index) => (
                        <GlassCard key={index}>
                          <div className="flex justify-between items-center mb-5">
                            <p className="text-xs tracking-[0.2em] text-[#c4965a] font-bold">
                              DOCUMENT #{index + 1}
                            </p>

                            {form.documents.length > 1 && (
                              <button
                                onClick={() => removeDocument(index)}
                                className="text-red-600 text-sm font-semibold"
                              >
                                Remove
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                              <Label>Evidence Category</Label>
                              <Select
                                value={doc.category}
                                onChange={(e) =>
                                  updateDocument(
                                    index,
                                    "category",
                                    e.target.value
                                  )
                                }
                              >
                                <option value="">Select category</option>
                                <option>General Court Document</option>
                                <option>Property Document</option>
                                <option>Contract Document</option>
                                <option>Criminal Case Document</option>
                                <option>Family Case Document</option>
                                <option>Medical Document</option>
                                <option>Consumer Document</option>
                                <option>Cyber Evidence</option>
                              </Select>
                            </div>

                            <div>
                              <Label>Document Type</Label>
                              <Input
                                value={doc.type}
                                onChange={(e) =>
                                  updateDocument(
                                    index,
                                    "type",
                                    e.target.value
                                  )
                                }
                                placeholder="Example: FIR, Sale Deed, Contract, Medical Report"
                              />
                            </div>

                            <div>
                              <Label>Document Name</Label>
                              <Input
                                value={doc.name}
                                onChange={(e) =>
                                  updateDocument(
                                    index,
                                    "name",
                                    e.target.value
                                  )
                                }
                                placeholder="Example: FIR Copy"
                              />
                            </div>

                            <div>
                              <Label>Document Date</Label>
                              <Input
                                type="date"
                                value={doc.date}
                                onChange={(e) =>
                                  updateDocument(
                                    index,
                                    "date",
                                    e.target.value
                                  )
                                }
                              />
                            </div>

                            <div>
                              <Label>Original / Copy</Label>
                              <Select
                                value={doc.originalOrCopy}
                                onChange={(e) =>
                                  updateDocument(
                                    index,
                                    "originalOrCopy",
                                    e.target.value
                                  )
                                }
                              >
                                <option value="">Select</option>
                                <option>Original</option>
                                <option>Certified Copy</option>
                                <option>Photocopy</option>
                                <option>Digital Copy</option>
                              </Select>
                            </div>

                            <div>
                              <Label>Issued By</Label>
                              <Input
                                value={doc.issuedBy}
                                onChange={(e) =>
                                  updateDocument(
                                    index,
                                    "issuedBy",
                                    e.target.value
                                  )
                                }
                                placeholder="Example: Police Station / Sub-Registrar Office"
                              />
                            </div>

                            <div>
                              <Label>Is Registered?</Label>
                              <Select
                                value={doc.isRegistered}
                                onChange={(e) =>
                                  updateDocument(
                                    index,
                                    "isRegistered",
                                    e.target.value
                                  )
                                }
                              >
                                <option value="">Select</option>
                                <option>Yes</option>
                                <option>No</option>
                                <option>Not Applicable</option>
                              </Select>
                            </div>

                            <div>
                              <Label>Is Notarized?</Label>
                              <Select
                                value={doc.isNotarized}
                                onChange={(e) =>
                                  updateDocument(
                                    index,
                                    "isNotarized",
                                    e.target.value
                                  )
                                }
                              >
                                <option value="">Select</option>
                                <option>Yes</option>
                                <option>No</option>
                                <option>Not Applicable</option>
                              </Select>
                            </div>

                            <div>
                              <Label>Is Disputed?</Label>
                              <Select
                                value={doc.isDisputed}
                                onChange={(e) =>
                                  updateDocument(
                                    index,
                                    "isDisputed",
                                    e.target.value
                                  )
                                }
                              >
                                <option value="">Select</option>
                                <option>No</option>
                                <option>Yes - Authenticity Disputed</option>
                                <option>Yes - Signature Disputed</option>
                                <option>Yes - Contents Disputed</option>
                              </Select>
                            </div>
                          </div>

                          <div className="mt-5">
                            <Label>Description</Label>
                            <TextArea
                              rows={3}
                              value={doc.description}
                              onChange={(e) =>
                                updateDocument(
                                  index,
                                  "description",
                                  e.target.value
                                )
                              }
                              placeholder="Explain how this document supports the case"
                            />
                          </div>

                          <div className="mt-5">
                            <Label>Upload Document File</Label>
                            <FileInput
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              file={doc.file}
                              onChange={(e) =>
                                updateDocument(
                                  index,
                                  "file",
                                  e.target.files[0]
                                )
                              }
                            />
                          </div>
                        </GlassCard>
                      ))}

                      <button
                        onClick={addDocument}
                        className="w-full rounded-xl border border-dashed border-[#c4965a] text-[#2b1408] py-3 font-bold hover:bg-[#c4965a]/10 transition-all"
                      >
                        + Add Another Document
                      </button>

                      <div className="space-y-5">
                        <SectionTitle
                          title="Digital / Electronic Evidence"
                          subtitle="Chats, emails, CCTV, UPI, screenshots, call records"
                        />

                        {form.digitalEvidence.map((ev, index) => (
                          <GlassCard key={index}>
                            <div className="flex justify-between items-center mb-5">
                              <p className="text-xs tracking-[0.2em] text-[#c4965a] font-bold">
                                DIGITAL EVIDENCE #{index + 1}
                              </p>

                              {form.digitalEvidence.length > 1 && (
                                <button
                                  onClick={() => removeDigitalEvidence(index)}
                                  className="text-red-600 text-sm font-semibold"
                                >
                                  Remove
                                </button>
                              )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                              <div>
                                <Label>Evidence Type</Label>
                                <Input
                                  value={ev.type}
                                  onChange={(e) =>
                                    updateDigitalEvidence(
                                      index,
                                      "type",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Example: WhatsApp Chat, CCTV, Email, UPI Transaction"
                                />
                              </div>

                              <div>
                                <Label>Platform / Source</Label>
                                <Input
                                  value={ev.platform}
                                  onChange={(e) =>
                                    updateDigitalEvidence(
                                      index,
                                      "platform",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Example: WhatsApp, Gmail, Bank App"
                                />
                              </div>

                              <div>
                                <Label>Date & Time</Label>
                                <Input
                                  type="datetime-local"
                                  value={ev.dateTime}
                                  onChange={(e) =>
                                    updateDigitalEvidence(
                                      index,
                                      "dateTime",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>

                              <div>
                                <Label>65B Certificate Available?</Label>
                                <Select
                                  value={ev.certificate65B}
                                  onChange={(e) =>
                                    updateDigitalEvidence(
                                      index,
                                      "certificate65B",
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="">Select</option>
                                  <option>Yes</option>
                                  <option>No</option>
                                  <option>Not Sure</option>
                                </Select>
                              </div>

                              <div>
                                <Label>Original Device Available?</Label>
                                <Select
                                  value={ev.originalDeviceAvailable}
                                  onChange={(e) =>
                                    updateDigitalEvidence(
                                      index,
                                      "originalDeviceAvailable",
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="">Select</option>
                                  <option>Yes</option>
                                  <option>No</option>
                                </Select>
                              </div>

                              <div>
                                <Label>Screenshot Available?</Label>
                                <Select
                                  value={ev.screenshotAvailable}
                                  onChange={(e) =>
                                    updateDigitalEvidence(
                                      index,
                                      "screenshotAvailable",
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="">Select</option>
                                  <option>Yes</option>
                                  <option>No</option>
                                </Select>
                              </div>

                              <div>
                                <Label>Metadata Available?</Label>
                                <Select
                                  value={ev.metadataAvailable}
                                  onChange={(e) =>
                                    updateDigitalEvidence(
                                      index,
                                      "metadataAvailable",
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="">Select</option>
                                  <option>Yes</option>
                                  <option>No</option>
                                  <option>Not Sure</option>
                                </Select>
                              </div>

                              <div>
                                <Label>Tampering Alleged?</Label>
                                <Select
                                  value={ev.tamperingAlleged}
                                  onChange={(e) =>
                                    updateDigitalEvidence(
                                      index,
                                      "tamperingAlleged",
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="">Select</option>
                                  <option>No</option>
                                  <option>Yes</option>
                                  <option>Not Sure</option>
                                </Select>
                              </div>
                            </div>

                            <div className="mt-5">
                              <Label>Description</Label>
                              <TextArea
                                rows={3}
                                value={ev.description}
                                onChange={(e) =>
                                  updateDigitalEvidence(
                                    index,
                                    "description",
                                    e.target.value
                                  )
                                }
                                placeholder="Explain how this digital evidence supports the case"
                              />
                            </div>

                            <div className="mt-5">
                              <Label>Upload Digital Evidence File</Label>
                              <FileInput
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4,.mp3,.wav,.txt"
                                file={ev.file}
                                onChange={(e) =>
                                  updateDigitalEvidence(
                                    index,
                                    "file",
                                    e.target.files[0]
                                  )
                                }
                              />
                            </div>
                          </GlassCard>
                        ))}

                        <button
                          onClick={addDigitalEvidence}
                          className="w-full rounded-xl border border-dashed border-[#c4965a] text-[#2b1408] py-3 font-bold hover:bg-[#c4965a]/10 transition-all"
                        >
                          + Add Digital Evidence
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 6 && (
                    <div className="space-y-6">
                      <SectionTitle
                        title="Witnesses"
                        subtitle="Add oral evidence and witness details"
                      />

                      {form.witnesses.map((witness, index) => (
                        <GlassCard key={index}>
                          <div className="flex justify-between items-center mb-5">
                            <p className="text-xs tracking-[0.2em] text-[#c4965a] font-bold">
                              WITNESS #{index + 1}
                            </p>

                            {form.witnesses.length > 1 && (
                              <button
                                onClick={() => removeWitness(index)}
                                className="text-red-600 text-sm font-semibold"
                              >
                                Remove
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                              <Label>Witness Name</Label>
                              <Input
                                value={witness.name}
                                onChange={(e) =>
                                  updateWitness(
                                    index,
                                    "name",
                                    e.target.value
                                  )
                                }
                                placeholder="Example: Rajesh Kumar"
                              />
                            </div>

                            <div>
                              <Label>Witness Type</Label>
                              <Select
                                value={witness.type}
                                onChange={(e) =>
                                  updateWitness(
                                    index,
                                    "type",
                                    e.target.value
                                  )
                                }
                              >
                                <option value="">Select type</option>
                                <option>Eyewitness</option>
                                <option>Expert Witness</option>
                                <option>Official Witness</option>
                                <option>Police Officer</option>
                                <option>Medical Expert</option>
                                <option>Forensic Expert</option>
                                <option>Bank Officer</option>
                                <option>Registrar Office Staff</option>
                                <option>Character Witness</option>
                              </Select>
                            </div>

                            <div>
                              <Label>Relationship to Party</Label>
                              <Input
                                value={witness.relationship}
                                onChange={(e) =>
                                  updateWitness(
                                    index,
                                    "relationship",
                                    e.target.value
                                  )
                                }
                                placeholder="Example: Neighbor, employee, independent witness"
                              />
                            </div>

                            <div>
                              <Label>Credibility Level</Label>
                              <Select
                                value={witness.credibility}
                                onChange={(e) =>
                                  updateWitness(
                                    index,
                                    "credibility",
                                    e.target.value
                                  )
                                }
                              >
                                <option value="">Select</option>
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                                <option>Unknown</option>
                              </Select>
                            </div>

                            <div>
                              <Label>Independent Witness?</Label>
                              <Select
                                value={witness.isIndependent}
                                onChange={(e) =>
                                  updateWitness(
                                    index,
                                    "isIndependent",
                                    e.target.value
                                  )
                                }
                              >
                                <option value="">Select</option>
                                <option>Yes</option>
                                <option>No</option>
                                <option>Not Sure</option>
                              </Select>
                            </div>

                            <div>
                              <Label>Available for Court?</Label>
                              <Select
                                value={witness.availableForCourt}
                                onChange={(e) =>
                                  updateWitness(
                                    index,
                                    "availableForCourt",
                                    e.target.value
                                  )
                                }
                              >
                                <option value="">Select</option>
                                <option>Yes</option>
                                <option>No</option>
                                <option>Not Sure</option>
                              </Select>
                            </div>
                          </div>

                          <div className="mt-5">
                            <Label>Witness Statement Summary</Label>
                            <TextArea
                              rows={4}
                              value={witness.statement}
                              onChange={(e) =>
                                updateWitness(
                                  index,
                                  "statement",
                                  e.target.value
                                )
                              }
                              placeholder="What does this witness know or prove?"
                            />
                          </div>
                        </GlassCard>
                      ))}

                      <button
                        onClick={addWitness}
                        className="w-full rounded-xl border border-dashed border-[#c4965a] text-[#2b1408] py-3 font-bold hover:bg-[#c4965a]/10 transition-all"
                      >
                        + Add Another Witness
                      </button>
                    </div>
                  )}

                  {step === 7 && (
                    <div className="space-y-6">
                      <SectionTitle
                        title="Procedural History & Risk Factors"
                        subtitle="Previous court orders, appeal status, settlement, and risks"
                      />

                      <div>
                        <Label>Previous Court Decision</Label>
                        <TextArea
                          rows={4}
                          value={form.previousCourtDecision}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              previousCourtDecision: e.target.value,
                            }))
                          }
                          placeholder="Example: District court rejected interim injunction"
                        />
                      </div>

                      <div>
                        <Label>Interim Orders</Label>
                        <TextArea
                          rows={3}
                          value={form.interimOrders}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              interimOrders: e.target.value,
                            }))
                          }
                          placeholder="Example: stay order, injunction, bail order"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <Label>Appeal Status</Label>
                          <Select
                            value={form.appealStatus}
                            onChange={(e) =>
                              setForm((prev) => ({
                                ...prev,
                                appealStatus: e.target.value,
                              }))
                            }
                          >
                            <option value="">Select</option>
                            <option>No Appeal</option>
                            <option>Appeal Pending</option>
                            <option>Appeal Allowed</option>
                            <option>Appeal Dismissed</option>
                          </Select>
                        </div>

                        <div>
                          <Label>Settlement Attempted?</Label>
                          <Select
                            value={form.settlementAttempted}
                            onChange={(e) =>
                              setForm((prev) => ({
                                ...prev,
                                settlementAttempted: e.target.value,
                              }))
                            }
                          >
                            <option value="">Select</option>
                            <option>Yes</option>
                            <option>No</option>
                            <option>Failed</option>
                            <option>Ongoing</option>
                          </Select>
                        </div>

                        <div>
                          <Label>Mediation Done?</Label>
                          <Select
                            value={form.mediationDone}
                            onChange={(e) =>
                              setForm((prev) => ({
                                ...prev,
                                mediationDone: e.target.value,
                              }))
                            }
                          >
                            <option value="">Select</option>
                            <option>Yes</option>
                            <option>No</option>
                            <option>Failed</option>
                            <option>Ongoing</option>
                          </Select>
                        </div>

                        <div>
                          <Label>Delay in Filing?</Label>
                          <Select
                            value={form.delayInFiling}
                            onChange={(e) =>
                              setForm((prev) => ({
                                ...prev,
                                delayInFiling: e.target.value,
                              }))
                            }
                          >
                            <option value="">Select</option>
                            <option>No Delay</option>
                            <option>Minor Delay</option>
                            <option>Major Delay</option>
                            <option>Delay Explained</option>
                          </Select>
                        </div>

                        <div>
                          <Label>Limitation Issue?</Label>
                          <Select
                            value={form.limitationIssue}
                            onChange={(e) =>
                              setForm((prev) => ({
                                ...prev,
                                limitationIssue: e.target.value,
                              }))
                            }
                          >
                            <option value="">Select</option>
                            <option>No</option>
                            <option>Yes</option>
                            <option>Not Sure</option>
                          </Select>
                        </div>

                        <div>
                          <Label>Bail Status</Label>
                          <Select
                            value={form.bailStatus}
                            onChange={(e) =>
                              setForm((prev) => ({
                                ...prev,
                                bailStatus: e.target.value,
                              }))
                            }
                          >
                            <option value="">Select</option>
                            <option>Not Applicable</option>
                            <option>Granted</option>
                            <option>Rejected</option>
                            <option>Pending</option>
                          </Select>
                        </div>

                        <div>
                          <Label>Injunction Status</Label>
                          <Select
                            value={form.injunctionStatus}
                            onChange={(e) =>
                              setForm((prev) => ({
                                ...prev,
                                injunctionStatus: e.target.value,
                              }))
                            }
                          >
                            <option value="">Select</option>
                            <option>Not Applicable</option>
                            <option>Granted</option>
                            <option>Rejected</option>
                            <option>Pending</option>
                          </Select>
                        </div>

                        <div>
                          <Label>Stay Order Status</Label>
                          <Select
                            value={form.stayOrderStatus}
                            onChange={(e) =>
                              setForm((prev) => ({
                                ...prev,
                                stayOrderStatus: e.target.value,
                              }))
                            }
                          >
                            <option value="">Select</option>
                            <option>Not Applicable</option>
                            <option>Granted</option>
                            <option>Rejected</option>
                            <option>Pending</option>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label>Strongest Point in Your Favor</Label>
                        <TextArea
                          rows={3}
                          value={form.strongestPoint}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              strongestPoint: e.target.value,
                            }))
                          }
                        />
                      </div>

                      <div>
                        <Label>Weakest Point / Risk in Your Case</Label>
                        <TextArea
                          rows={3}
                          value={form.weakestPoint}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              weakestPoint: e.target.value,
                            }))
                          }
                        />
                      </div>

                      <div>
                        <Label>Strongest Point of Opposite Party</Label>
                        <TextArea
                          rows={3}
                          value={form.oppositeStrongestPoint}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              oppositeStrongestPoint: e.target.value,
                            }))
                          }
                        />
                      </div>

                      <div>
                        <Label>Missing Evidence</Label>
                        <TextArea
                          rows={3}
                          value={form.missingEvidence}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              missingEvidence: e.target.value,
                            }))
                          }
                        />
                      </div>

                      <div>
                        <Label>Contradictions</Label>
                        <TextArea
                          rows={3}
                          value={form.contradictions}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              contradictions: e.target.value,
                            }))
                          }
                        />
                      </div>

                      <div>
                        <Label>Risk Factors</Label>
                        <TextArea
                          rows={3}
                          value={form.riskFactors}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              riskFactors: e.target.value,
                            }))
                          }
                        />
                      </div>

                      <div>
                        <Label>Additional Context</Label>
                        <TextArea
                          rows={4}
                          value={form.additionalContext}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              additionalContext: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                  )}

                  {step === 8 && (
                    <div className="space-y-6">
                      <SectionTitle
                        title="Review & Predict"
                        subtitle="Verify all case details before generating AI prediction"
                      />

                      <ReviewBlock title="Case Details">
                        <ReviewRow label="Case Type" value={form.caseType} />
                        <ReviewRow
                          label="Court Level"
                          value={form.courtLevel}
                        />
                        <ReviewRow
                          label="Jurisdiction"
                          value={form.jurisdiction}
                        />
                        <ReviewRow label="Case Stage" value={form.caseStage} />
                        <ReviewRow
                          label="Filing Year"
                          value={form.filingYear}
                        />
                        <ReviewRow
                          label="Urgency Level"
                          value={form.urgencyLevel}
                        />
                        <ReviewRow
                          label="Relief Requested"
                          value={form.reliefRequested}
                        />
                      </ReviewBlock>

                      <ReviewBlock title="Documents">
                        {form.documents.map((doc, index) => (
                          <div
                            key={index}
                            className="mb-5 rounded-xl bg-[#f8f1e8] p-4 last:mb-0"
                          >
                            <p className="font-bold text-sm mb-2">
                              Document #{index + 1}
                            </p>
                            <ReviewRow label="Category" value={doc.category} />
                            <ReviewRow label="Type" value={doc.type} />
                            <ReviewRow label="Name" value={doc.name} />
                            <ReviewRow label="Date" value={doc.date} />
                            <ReviewRow
                              label="Original/Copy"
                              value={doc.originalOrCopy}
                            />
                            <ReviewRow label="Issued By" value={doc.issuedBy} />
                            <ReviewRow
                              label="Registered"
                              value={doc.isRegistered}
                            />
                            <ReviewRow
                              label="Notarized"
                              value={doc.isNotarized}
                            />
                            <ReviewRow
                              label="Disputed"
                              value={doc.isDisputed}
                            />
                            <ReviewRow
                              label="Uploaded File"
                              value={doc.file?.name}
                            />
                            <ReviewRow
                              label="Description"
                              value={doc.description}
                            />
                          </div>
                        ))}
                      </ReviewBlock>

                      <ReviewBlock title="Digital Evidence">
                        {form.digitalEvidence.map((ev, index) => (
                          <div
                            key={index}
                            className="mb-5 rounded-xl bg-[#f8f1e8] p-4 last:mb-0"
                          >
                            <p className="font-bold text-sm mb-2">
                              Digital Evidence #{index + 1}
                            </p>
                            <ReviewRow label="Type" value={ev.type} />
                            <ReviewRow label="Platform" value={ev.platform} />
                            <ReviewRow label="Date Time" value={ev.dateTime} />
                            <ReviewRow
                              label="65B Certificate"
                              value={ev.certificate65B}
                            />
                            <ReviewRow
                              label="Original Device"
                              value={ev.originalDeviceAvailable}
                            />
                            <ReviewRow
                              label="Screenshot"
                              value={ev.screenshotAvailable}
                            />
                            <ReviewRow
                              label="Metadata"
                              value={ev.metadataAvailable}
                            />
                            <ReviewRow
                              label="Tampering"
                              value={ev.tamperingAlleged}
                            />
                            <ReviewRow
                              label="Uploaded File"
                              value={ev.file?.name}
                            />
                            <ReviewRow
                              label="Description"
                              value={ev.description}
                            />
                          </div>
                        ))}
                      </ReviewBlock>

                      <ReviewBlock title="Witnesses">
                        {form.witnesses.map((witness, index) => (
                          <div
                            key={index}
                            className="mb-5 rounded-xl bg-[#f8f1e8] p-4 last:mb-0"
                          >
                            <p className="font-bold text-sm mb-2">
                              Witness #{index + 1}
                            </p>
                            <ReviewRow label="Name" value={witness.name} />
                            <ReviewRow label="Type" value={witness.type} />
                            <ReviewRow
                              label="Relationship"
                              value={witness.relationship}
                            />
                            <ReviewRow
                              label="Independent"
                              value={witness.isIndependent}
                            />
                            <ReviewRow
                              label="Available"
                              value={witness.availableForCourt}
                            />
                            <ReviewRow
                              label="Credibility"
                              value={witness.credibility}
                            />
                            <ReviewRow
                              label="Statement"
                              value={witness.statement}
                            />
                          </div>
                        ))}
                      </ReviewBlock>

                      <ReviewBlock title="Other Case Details">
                        <ReviewRow
                          label="Petitioner Claim"
                          value={form.petitioner.claim}
                        />
                        <ReviewRow
                          label="Respondent Defense"
                          value={form.respondent.claim}
                        />
                        <ReviewRow
                          label="Main Legal Issue"
                          value={form.mainLegalIssue}
                        />
                        <ReviewRow
                          label="Applicable Laws"
                          value={form.applicableLaws}
                        />
                        <ReviewRow
                          label="Background Facts"
                          value={form.backgroundFacts}
                        />
                        <ReviewRow label="Timeline" value={form.timeline} />
                        <ReviewRow
                          label="Previous Decision"
                          value={form.previousCourtDecision}
                        />
                        <ReviewRow
                          label="Risk Factors"
                          value={form.riskFactors}
                        />
                      </ReviewBlock>
                    </div>
                  )}
                </GlassCard>

                {error && (
                  <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <div className="flex gap-4 mt-6">
                  {step > 1 && (
                    <button
                      onClick={prevStep}
                      className="px-6 py-3 rounded-xl border border-[#e8ddd2] bg-white hover:border-[#c4965a] transition-all flex items-center gap-2 font-semibold"
                    >
                      <ChevronLeft size={16} />
                      Back
                    </button>
                  )}

                  {step < 8 ? (
                    <button
                      onClick={nextStep}
                      className="flex-1 bg-[#2b1408] hover:bg-[#3b1c0c] transition-all text-white rounded-xl py-3 font-bold flex items-center justify-center gap-2"
                    >
                      Continue
                      <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={handleGeneratePrediction}
                      disabled={isLoading}
                      className="flex-1 bg-[#2b1408] hover:bg-[#3b1c0c] transition-all text-white rounded-xl py-3 font-bold flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {isLoading ? (
                        "Generating Prediction..."
                      ) : (
                        <>
                          <Zap size={16} />
                          Generate AI Prediction
                        </>
                      )}
                    </button>
                  )}
                </div>
              </>
            )}

            {showResult && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <GlassCard className="bg-gradient-to-br from-[#1a0a03] via-[#2b1408] to-[#3d1e0a] text-white border-none">
                  <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                    <div>
                      <p className="text-[#c4965a] text-xs tracking-[0.2em] font-bold mb-3">
                        PREDICTION RESULT
                      </p>

                      <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
                        {selected?.predictedOutcome ||
                          "Likely outcome favors the Petitioner"}
                      </h2>

                      <p className="text-[#d8c7b5] max-w-2xl leading-7">
                        {selected?.summary ||
                          "Based on evidence strength, applicable precedents, legal positioning, uploaded documents, witnesses, and procedural history, the AI predicts a stronger probability of success for the petitioner."}
                      </p>
                    </div>

                    <div className="bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-sm font-semibold flex items-center gap-2 shrink-0">
                      <Activity size={14} />
                      Confidence {selected?.confidenceScore || 87}%
                    </div>
                  </div>
                </GlassCard>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <MetricCard
                    title="Evidence Strength"
                    value={selected?.evidenceStrength || 72}
                    text="Strong evidence profile"
                    color="bg-green-700"
                  />

                  <MetricCard
                    title="Legal Risk"
                    value={selected?.legalRisk || 38}
                    text="Moderate procedural risk"
                    color="bg-red-600"
                  />

                  <MetricCard
                    title="Settlement Probability"
                    value={selected?.settlementProbability || 55}
                    text="Moderate settlement possibility"
                    color="bg-[#c4965a]"
                  />
                </div>

                <GlassCard>
                  <h3 className="font-bold text-lg mb-4">
                    AI Legal Reasoning
                  </h3>

                  <p className="text-sm text-[#7a6355] leading-7 whitespace-pre-wrap">
                    {selected?.reasoning ||
                      "The petitioner appears to have stronger documentary support, while the respondent's defense depends heavily on proving the validity of their documents. The outcome may depend on document authenticity, witness credibility, procedural history, and whether disputed evidence can be proved before court."}
                  </p>
                </GlassCard>
                {/* Strengths */}
                {selected?.strengths?.length > 0 && (
                  <GlassCard>
                    <h3 className="font-bold text-lg mb-4 text-green-700">
                      ✓ Strengths in Your Case
                    </h3>
                    <div className="space-y-3">
                      {selected.strengths.map((point, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-green-50 border border-green-100">
                          <div className="w-6 h-6 rounded-full bg-green-700 text-white text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </div>
                          <p className="text-sm text-green-900 leading-6">{point}</p>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                )}

                {/* Weaknesses */}
                {selected?.weaknesses?.length > 0 && (
                  <GlassCard>
                    <h3 className="font-bold text-lg mb-4 text-red-700">
                      ✗ Weaknesses in Your Case
                    </h3>
                    <div className="space-y-3">
                      {selected.weaknesses.map((point, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-red-50 border border-red-100">
                          <div className="w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </div>
                          <p className="text-sm text-red-900 leading-6">{point}</p>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                )}

                {/* Risks */}
                {selected?.risks?.length > 0 && (
                  <GlassCard>
                    <h3 className="font-bold text-lg mb-4 text-[#c4965a]">
                      ⚠ Risk Factors
                    </h3>
                    <div className="space-y-3">
                      {selected.risks.map((point, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[#fffaf3] border border-[#e8ddd2]">
                          <div className="w-6 h-6 rounded-full bg-[#c4965a] text-white text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </div>
                          <p className="text-sm text-[#2b1408] leading-6">{point}</p>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                )}

                {/* Missing Evidence — branded as Evidence Gap Analysis */}
                {selected?.missingEvidence?.length > 0 && (
                  <GlassCard>
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="font-bold text-lg text-[#1f0d04]">
                        Evidence Gap Analysis
                      </h3>
                      <span className="text-xs bg-red-100 text-red-700 font-semibold px-3 py-1 rounded-full">
                        Action Required
                      </span>
                    </div>
                    <p className="text-sm text-[#7a6355] mb-4">
                      The following evidence is missing or weak. Collecting these can significantly improve your case outcome.
                    </p>
                    <div className="space-y-3">
                      {selected.missingEvidence.map((point, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-red-50 border border-red-200">
                          <div className="w-6 h-6 rounded-full bg-red-100 border border-red-300 text-red-700 text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                            !
                          </div>
                          <p className="text-sm text-red-900 leading-6">{point}</p>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                )}

                {/* Recommended Next Steps */}
                {selected?.recommendedNextSteps?.length > 0 && (
                  <GlassCard>
                    <h3 className="font-bold text-lg mb-4 text-[#1f0d04]">
                      Recommended Next Steps
                    </h3>
                    <div className="space-y-3">
                      {selected.recommendedNextSteps.map((point, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-7 h-7 rounded-xl bg-[#2b1408] text-[#c4965a] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </div>
                          <div className="flex-1 p-3 rounded-xl border border-[#e8ddd2] bg-white">
                            <p className="text-sm text-[#1f0d04] leading-6">{point}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                )}
                <button
                  onClick={handleNewPrediction}
                  className="w-full bg-[#2b1408] hover:bg-[#3b1c0c] transition-all text-white rounded-xl py-3 font-bold"
                >
                  Start New Prediction
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}