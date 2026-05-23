import React, { useEffect, useRef, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Bell,
  Brain,
  CheckCircle,
  Clock,
  FileSearch,
  FileText,
  Gavel,
  LayoutDashboard,
  Scale,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import axios from "axios"

const GlassCard = ({ children, className = "" }) => {
  return (
    <div
      className={`rounded-3xl border border-[#e8ddd2] bg-white/80 backdrop-blur-md shadow-sm ${className}`}
    >
      {children}
    </div>
  );
};

const SectionTitle = ({
  icon: Icon,
  children,
  action,
}) => {
  return (
    <div className="flex items-center gap-2 mb-5">
      {Icon && (
        <Icon
          size={18}
          className="text-[#2b1408]"
        />
      )}

      <h2 className="text-lg font-bold text-[#1f0d04]">
        {children}
      </h2>

      {action && (
        <div className="ml-auto">
          {action}
        </div>
      )}
    </div>
  );
};

const TrendPill = ({ label }) => {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-[#c4965a]/20 bg-[#c4965a]/10 px-3 py-1 text-[10px] font-bold text-[#8a5e22] mt-3">
      <TrendingUp size={10} />
      {label}
    </div>
  );
};

const StatusBadge = ({
  label,
  color,
  bg,
}) => {
  return (
    <span
      className="px-3 py-1 rounded-full text-[10px] font-bold whitespace-nowrap"
      style={{
        color,
        background: bg,
      }}
    >
      {label}
    </span>
  );
};

const ConfidenceGauge = ({
  label,
  value = 0,
  color = "#c4965a",
  sublabel,
}) => {
  const pathRef = useRef(null);

  const ARC = 141.4;

  useEffect(() => {
    const el = pathRef.current;

    if (!el) return;

    el.style.strokeDashoffset = ARC;

    el.style.transition =
      "stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)";

    const timer = setTimeout(() => {
      el.style.strokeDashoffset =
        ARC * (1 - value / 100);
    }, 120);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <GlassCard className="p-5 text-center">
      <p className="text-[11px] font-bold tracking-wide uppercase text-[#7a6355] mb-4">
        {label}
      </p>

      <div className="flex justify-center">
        <svg
          width="110"
          height="68"
          viewBox="0 0 110 68"
        >
          <path
            d="M10,60 A45,45 0 0,1 100,60"
            fill="none"
            stroke="#e8ddd2"
            strokeWidth="10"
            strokeLinecap="round"
          />

          <path
            ref={pathRef}
            d="M10,60 A45,45 0 0,1 100,60"
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={ARC}
            strokeDashoffset={ARC}
          />

          <text
            x="55"
            y="56"
            textAnchor="middle"
            fontSize="17"
            fontWeight="800"
            fill="#1f0d04"
          >
            {value}%
          </text>
        </svg>
      </div>

      <p className="text-[11px] text-[#a28b7d] mt-2">
        {sublabel}
      </p>
    </GlassCard>
  );
};

const MetricCard = ({
  title,
  value,
  subtitle,
  trend,
  icon,
}) => {
  return (
    <GlassCard className="p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="w-11 h-11 rounded-2xl bg-[#2b1408] flex items-center justify-center mb-4">
        {icon}
      </div>

      <h2 className="text-3xl font-extrabold text-[#1f0d04]">
        {value}
      </h2>

      <p className="text-[11px] uppercase tracking-wide font-bold text-[#7a6355] mt-2">
        {title}
      </p>

      <p className="text-xs text-[#a28b7d] leading-6 mt-2">
        {subtitle}
      </p>

      {trend && (
        <TrendPill label={trend} />
      )}
    </GlassCard>
  );
};

const WorkspaceCard = ({
  title,
  subtitle,
  button,
  icon,
  onClick,
}) => {
  return (
    <GlassCard className="p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-[#e8ddd2] hover:border-[#c4965a]">
      <div className="w-14 h-14 rounded-2xl bg-[#2b1408] flex items-center justify-center mb-5">
        {icon}
      </div>

      <h3 className="text-xl font-bold text-[#1f0d04]">
        {title}
      </h3>

      <p className="text-sm text-[#7a6355] leading-7 mt-3">
        {subtitle}
      </p>

      <button
        onClick={onClick}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#2b1408] hover:bg-[#3a1b0b] transition-all text-white px-5 py-3 text-sm font-semibold"
      >
        {button}
        <ArrowRight size={15} />
      </button>
    </GlassCard>
  );
};

const TimelineItem = ({
  title,
  subtitle,
  date,
  status,
  isLast,
}) => {
  const statusStyles = {
    Active: {
      dot: "#c4965a",
      bg: "rgba(196,150,90,0.15)",
      text: "#8a5e22",
    },

    Upcoming: {
      dot: "#2b1408",
      bg: "rgba(43,20,8,0.1)",
      text: "#2b1408",
    },

    Won: {
      dot: "#639922",
      bg: "rgba(99,153,34,0.12)",
      text: "#3b6d11",
    },

    Lost: {
      dot: "#a32d2d",
      bg: "rgba(163,45,45,0.12)",
      text: "#a32d2d",
    },
  };

  const style =
    statusStyles[status] ||
    statusStyles.Active;

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className="w-3 h-3 rounded-full mt-1"
          style={{
            background: style.dot,
          }}
        />

        {!isLast && (
          <div className="w-[2px] flex-1 bg-[#e8ddd2] mt-2" />
        )}
      </div>

      <div className="flex-1 pb-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="text-sm font-bold text-[#1f0d04]">
              {title}
            </h4>

            <p className="text-xs text-[#7a6355] mt-1">
              {subtitle}
            </p>

            <p className="text-[11px] text-[#a28b7d] mt-2">
              {date}
            </p>
          </div>

          <StatusBadge
            label={status}
            color={style.text}
            bg={style.bg}
          />
        </div>
      </div>
    </div>
  );
};

const AlertItem = ({
  title,
  message,
  time,
  unread,
  type = "info",
}) => {
  const styles = {
    warning: {
      bg: "bg-[#fff6ea]",
      icon: Clock,
      color: "text-[#8a5e22]",
    },

    danger: {
      bg: "bg-red-50",
      icon: AlertTriangle,
      color: "text-red-700",
    },

    success: {
      bg: "bg-green-50",
      icon: CheckCircle,
      color: "text-green-700",
    },

    info: {
      bg: "bg-[#f8f3ed]",
      icon: FileText,
      color: "text-[#2b1408]",
    },
  };

  const current =
    styles[type] || styles.info;

  const Icon = current.icon;

  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl border border-[#e8ddd2] bg-[#fffaf5] hover:bg-white transition-all">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${current.bg}`}
      >
        <Icon
          size={16}
          className={current.color}
        />
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-sm font-bold text-[#1f0d04]">
            {title}
          </h4>

          {unread && (
            <div className="w-2 h-2 rounded-full bg-[#c4965a]" />
          )}
        </div>

        <p className="text-xs text-[#7a6355] leading-6 mt-1">
          {message}
        </p>

        <p className="text-[11px] text-[#a28b7d] mt-2">
          {time}
        </p>
      </div>
    </div>
  );
};

const EmptyState = ({
  title,
  subtitle,
  buttonText,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14">
      <div className="w-16 h-16 rounded-2xl bg-[#2b1408] flex items-center justify-center mb-5">
        <Sparkles
          size={24}
          className="text-[#c4965a]"
        />
      </div>

      <h3 className="text-xl font-bold text-[#1f0d04]">
        {title}
      </h3>

      <p className="text-sm text-[#7a6355] max-w-md mt-3 leading-7">
        {subtitle}
      </p>

      <button className="mt-6 rounded-xl bg-[#2b1408] hover:bg-[#3a1b0b] transition-all text-white px-5 py-3 text-sm font-semibold inline-flex items-center gap-2">
        {buttonText}
        <ArrowRight size={15} />
      </button>
    </div>
  );
};

export default function MiniDashboard({
  onOpenResearch,
  onOpenPrediction,
}) {

  const [dashboardData, setDashboardData] = useState(null);

  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem("token");

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        setLoading(true);

        const { data } = await axios.get(
          "http://localhost:5000/api/Dashboard/getDashboardData",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDashboardData(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchDashboard();

  }, [token]);

  const predictionHistory =
    dashboardData?.predictionHistory || [];

  const decisionHistory =
    dashboardData?.decisionHistory || [];

  const chatHistory =
    dashboardData?.chatHistory || [];

  const caseTimeline =
    dashboardData?.caseTimeline || [];

  const alerts =
    dashboardData?.alerts || [];

  const confidenceScores =
    dashboardData?.confidenceScores || {};

  const totalPredictions =
    predictionHistory.length;

  const totalDecisionAnalyses =
    decisionHistory.length;

  const totalChats =
    chatHistory.length;

  const totalCases =
    totalPredictions +
    totalDecisionAnalyses;

  const averageConfidence =
    predictionHistory.length > 0
      ? Math.round(
          predictionHistory.reduce(
            (a, i) =>
              a +
              (i.confidenceScore || 0),
            0
          ) / predictionHistory.length
        )
      : 0;

  const averageAlignment =
    decisionHistory.length > 0
      ? Math.round(
          decisionHistory.reduce(
            (a, i) =>
              a +
              (i.alignmentScore || 0),
            0
          ) / decisionHistory.length
        )
      : 0;

  const appealViability =
    confidenceScores.appeal || 0;

  const unreadCount =
    alerts.filter(
      (a) => a.unread
    ).length;

  if (loading) {

    return (
      <div className="min-h-screen bg-[#f5ede0] flex items-center justify-center">

        <div className="text-center">

          <div className="w-14 h-14 border-4 border-[#c4965a]/20 border-t-[#c4965a] rounded-full animate-spin mx-auto" />

          <p className="mt-5 text-[#7a6355] font-medium">
            Loading dashboard...
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5ede0] text-[#1f0d04]">

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#1a0a03] via-[#2b1408] to-[#47210d] p-8 md:p-12 text-white shadow-2xl">

          <div className="absolute top-0 right-0 w-[320px] h-[320px] bg-[#c4965a]/10 blur-3xl rounded-full" />

          <div className="relative flex flex-col xl:flex-row xl:items-start justify-between gap-10">

            <div className="max-w-2xl">

              <div className="inline-flex items-center gap-2 rounded-full border border-[#c4965a]/30 bg-[#c4965a]/10 px-4 py-2 text-sm font-semibold text-[#e8c9a2] mb-6">
                <Sparkles size={15} />
                AI Legal Intelligence Workspace
              </div>

              <h1 className="text-5xl font-extrabold leading-tight">
                Justice
                <span className="text-[#c4965a]">
                 AI
                </span>
              </h1>

              <p className="mt-6 text-[#d7c7b8] leading-8 text-lg max-w-xl">
                Your centralized legal command
                center for AI predictions,
                judicial comparison analysis,
                legal research, timelines, and
                litigation intelligence.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">

                <button
                  onClick={onOpenResearch}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#c4965a] hover:bg-[#d2a56b] transition-all text-[#1f0d04] px-5 py-3 text-sm font-bold"
                >
                  <FileSearch size={15} />
                  New Research
                </button>

                <button
                  onClick={onOpenPrediction}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#c4965a]/20 bg-white/10 hover:bg-white/15 transition-all text-[#f3e4d3] px-5 py-3 text-sm font-semibold"
                >
                  <Brain size={15} />
                  Predict Case
                </button>

                <button className="relative w-12 h-12 rounded-xl border border-[#c4965a]/20 bg-white/10 hover:bg-white/15 transition-all flex items-center justify-center">

                  <Bell size={17} />

                  {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-[#c4965a] text-[#1f0d04] text-[10px] font-extrabold flex items-center justify-center px-1">
                      {unreadCount}
                    </div>
                  )}

                </button>

              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-md">

              <GlassCard className="p-5 bg-white/10 border-white/10">
                <p className="text-xs text-[#cdb9aa] uppercase tracking-wide">
                  Total Cases
                </p>

                <h2 className="text-3xl font-extrabold text-white mt-2">
                  {totalCases}
                </h2>
              </GlassCard>

              <GlassCard className="p-5 bg-white/10 border-white/10">
                <p className="text-xs text-[#cdb9aa] uppercase tracking-wide">
                  Research Chats
                </p>

                <h2 className="text-3xl font-extrabold text-white mt-2">
                  {totalChats}
                </h2>
              </GlassCard>

              <GlassCard className="p-5 bg-white/10 border-white/10">
                <p className="text-xs text-[#cdb9aa] uppercase tracking-wide">
                  Avg Confidence
                </p>

                <h2 className="text-3xl font-extrabold text-white mt-2">
                  {averageConfidence}%
                </h2>
              </GlassCard>

              <GlassCard className="p-5 bg-white/10 border-white/10">
                <p className="text-xs text-[#cdb9aa] uppercase tracking-wide">
                  AI Alignment
                </p>

                <h2 className="text-3xl font-extrabold text-white mt-2">
                  {averageAlignment}%
                </h2>
              </GlassCard>

            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">

          <MetricCard
            title="Case Predictions"
            value={totalPredictions}
            subtitle="AI-generated outcome analyses"
            trend={
              totalPredictions > 0
                ? `${totalPredictions} generated`
                : null
            }
            icon={
              <Brain
                size={20}
                className="text-[#c4965a]"
              />
            }
          />

          <MetricCard
            title="Decision Support"
            value={totalDecisionAnalyses}
            subtitle="Judicial comparison analyses"
            trend={
              totalDecisionAnalyses > 0
                ? `${totalDecisionAnalyses} analyzed`
                : null
            }
            icon={
              <Scale
                size={20}
                className="text-[#c4965a]"
              />
            }
          />

          <MetricCard
            title="Legal Research"
            value={totalChats}
            subtitle="AI research conversations"
            trend={
              totalChats > 0
                ? `${totalChats} conversations`
                : null
            }
            icon={
              <FileSearch
                size={20}
                className="text-[#c4965a]"
              />
            }
          />

          <MetricCard
            title="Appeal Reviews"
            value={
              decisionHistory.filter(
                (i) => i.appealAnalysis
              ).length
            }
            subtitle="Cases with appeal intelligence"
            icon={
              <ShieldCheck
                size={20}
                className="text-[#c4965a]"
              />
            }
          />

        </div>

        <div className="mt-10">

          <SectionTitle icon={Activity}>
            AI Confidence Scores
          </SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <ConfidenceGauge
              label="Verdict Prediction"
              value={averageConfidence}
              sublabel="Prediction confidence"
            />

            <ConfidenceGauge
              label="Judicial Alignment"
              value={averageAlignment}
              color="#2b1408"
              sublabel="AI vs judicial reasoning"
            />

            <ConfidenceGauge
              label="Appeal Viability"
              value={appealViability}
              color="#8a5e22"
              sublabel="Appeal success potential"
            />

          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-10">

          <GlassCard className="p-6">

            <SectionTitle icon={TrendingUp}>
              Case Timeline
            </SectionTitle>

            {caseTimeline.length > 0 ? (

              caseTimeline.map((item, index) => (

                <TimelineItem
                  key={index}
                  title={item.title}
                  subtitle={item.subtitle}
                  date={
                    new Date(item.date)
                      .toLocaleString()
                  }
                  status={item.status}
                  isLast={
                    index ===
                    caseTimeline.length - 1
                  }
                />

              ))

            ) : (

              <EmptyState
                title="No Cases Yet"
                subtitle="Add cases to track hearings, litigation progress, and AI legal intelligence."
                buttonText="Add First Case"
              />

            )}

          </GlassCard>

          <GlassCard className="p-6">

            <SectionTitle
              icon={Bell}
              action={
                unreadCount > 0 && (
                  <div className="rounded-full bg-[#c4965a] text-[#1f0d04] px-3 py-1 text-[10px] font-extrabold">
                    {unreadCount} NEW
                  </div>
                )
              }
            >
              Alerts
            </SectionTitle>

            {alerts.length > 0 ? (

              <div className="space-y-4">

                {alerts.map((alert, index) => (

                  <AlertItem
                    key={index}
                    title={alert.title}
                    message={alert.message}
                    time={
                      new Date(alert.time)
                        .toLocaleString()
                    }
                    unread={alert.unread}
                    type={alert.type}
                  />

                ))}

              </div>

            ) : (

              <EmptyState
                title="No Alerts"
                subtitle="Case updates, AI confidence changes, hearing reminders, and legal notifications will appear here."
                buttonText="View Cases"
              />

            )}

          </GlassCard>

        </div>
      </div>
    </div>
  );
}