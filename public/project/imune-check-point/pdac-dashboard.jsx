import React, { useState, useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, Cell, ReferenceLine, Legend, ComposedChart, Area } from 'recharts';

// ============================================
// DATA DEFINITIONS
// ============================================

const paperMetadata = {
  title: "Immune Checkpoint Inhibitors in Pancreatic Adenocarcinoma",
  subtitle: "A Systematic Review and Meta-Analysis of Clinical Outcomes",
  authors: "Al-Khinji A, Al-Korbi N, Al-Kuwari S, Al-Hor A, Malouche D",
  journal: "Frontiers in Oncology",
  year: 2025,
  doi: "10.3389/fonc.2025.1569884",
  totalStudies: 54,
  totalParticipants: 2364
};

const prismaData = {
  identification: {
    pubmed: 331,
    cochrane: 42,
    cinahl: 35,
    googleScholar: 137,
    total: 545
  },
  removed: {
    duplicates: 95,
    automation: 1,
    other: 0
  },
  screened: 449,
  excluded: 318,
  soughtRetrieval: 129,
  notRetrieved: 2,
  assessed: 127,
  excludedReasons: {
    deviatingOutcomes: 15,
    investigatingExpression: 27,
    combinedCancers: 14,
    murineModels: 17
  },
  included: 54
};

const orrData = [
  { study: "Renouf et al., 2022", logOR: 0.94, se: 0.1378, or: 2.56, ci_low: 2.03, ci_high: 3.49, weight: 14.7, type: "ICI+Chemo" },
  { study: "O'Hara et al., 2021", logOR: 0.58, se: 0.0852, or: 1.79, ci_low: 1.48, ci_high: 2.07, weight: 17.6, type: "ICI+Chemo" },
  { study: "Tsujikawa et al., 2020", logOR: 0.86, se: 0.2015, or: 2.36, ci_low: 1.73, ci_high: 3.82, weight: 11.2, type: "ICI+Chemo" },
  { study: "Enzler et al., 2024", logOR: 0.22, se: 0.0673, or: 1.25, ci_low: 1.12, ci_high: 1.46, weight: 18.5, type: "ICI+Chemo" },
  { study: "Zhou et al., 2024", logOR: 0.48, se: 0.0607, or: 1.62, ci_low: 1.44, ci_high: 1.83, weight: 18.8, type: "ICI+Chemo" },
  { study: "Liu et al., 2021", logOR: 0.55, se: 0.048, or: 1.73, ci_low: 1.57, ci_high: 1.90, weight: 19.3, type: "ICI+Chemo" }
];

const osChemoData = [
  { study: "Kamath et al., 2019", hr: 0.80, ci_low: 0.65, ci_high: 0.98, weight: 7.1 },
  { study: "Bockorny et al., 2021", hr: 0.90, ci_low: 0.75, ci_high: 1.08, weight: 9.0 },
  { study: "Zhu et al., 2022", hr: 0.75, ci_low: 0.60, ci_high: 0.90, weight: 7.3 },
  { study: "Ko et al., 2023", hr: 0.88, ci_low: 0.68, ci_high: 1.15, weight: 4.3 },
  { study: "Wang-Gillam et al., 2022", hr: 0.70, ci_low: 0.55, ci_high: 0.88, weight: 5.4 },
  { study: "Renouf et al., 2022", hr: 0.92, ci_low: 0.75, ci_high: 1.12, weight: 7.4 },
  { study: "Zhu et al., 2021", hr: 0.78, ci_low: 0.62, ci_high: 0.96, weight: 6.3 },
  { study: "O'Hara et al., 2021", hr: 0.85, ci_low: 0.70, ci_high: 1.03, weight: 8.0 },
  { study: "Wainberg et al., 2020", hr: 0.83, ci_low: 0.67, ci_high: 1.03, weight: 6.5 },
  { study: "Tsujikawa et al., 2020", hr: 0.71, ci_low: 0.58, ci_high: 0.88, weight: 6.9 },
  { study: "Enzler et al., 2024", hr: 0.88, ci_low: 0.70, ci_high: 1.12, weight: 5.4 },
  { study: "Weiss et al., 2023", hr: 0.86, ci_low: 0.68, ci_high: 1.05, weight: 6.3 },
  { study: "Zhou et al., 2024", hr: 0.72, ci_low: 0.55, ci_high: 0.92, weight: 4.5 },
  { study: "Sun et al., 2021", hr: 0.80, ci_low: 0.65, ci_high: 1.00, weight: 6.5 },
  { study: "Liu et al., 2021", hr: 0.90, ci_low: 0.75, ci_high: 1.08, weight: 9.0 }
];

const osMonotherapyData = [
  { study: "Reiss et al., 2022", hr: 0.82, ci_low: 0.70, ci_high: 0.95, weight: 21.9 },
  { study: "Ott et al., 2019", hr: 0.75, ci_low: 0.60, ci_high: 0.90, weight: 12.4 },
  { study: "Chen et al., 2023", hr: 0.90, ci_low: 0.75, ci_high: 1.10, weight: 13.9 },
  { study: "O'Neil et al.", hr: 0.85, ci_low: 0.70, ci_high: 1.05, weight: 12.4 },
  { study: "Zibelman et al., 2023", hr: 0.78, ci_low: 0.62, ci_high: 0.89, weight: 15.6 },
  { study: "Melisi et al., 2021", hr: 0.88, ci_low: 0.70, ci_high: 1.05, weight: 12.4 },
  { study: "Overman et al., 2020", hr: 0.76, ci_low: 0.60, ci_high: 0.92, weight: 11.2 }
];

const osRadiotherapyData = [
  { study: "Mortensen et al., 2023", hr: 1.30, ci_low: 1.05, ci_high: 1.60, weight: 16.6 },
  { study: "Xie et al., 2020", hr: 0.80, ci_low: 0.60, ci_high: 1.10, weight: 11.1 },
  { study: "Chen et al., 2022", hr: 1.25, ci_low: 1.05, ci_high: 1.50, weight: 19.1 },
  { study: "Du et al., 2023", hr: 1.15, ci_low: 0.90, ci_high: 1.35, weight: 17.2 },
  { study: "Christensen et al., 2024", hr: 1.40, ci_low: 1.15, ci_high: 1.65, weight: 18.9 },
  { study: "Chen et al.", hr: 1.10, ci_low: 0.90, ci_high: 1.35, weight: 17.2 }
];

const pfsData = [
  { study: "Kamath et al., 2019", hr: 2.12, ci_low: 1.82, ci_high: 2.56, weight: 6.5, type: "ICI+Chemo" },
  { study: "Bockorny et al., 2021", hr: 2.34, ci_low: 2.01, ci_high: 2.80, weight: 6.9, type: "ICI+Chemo" },
  { study: "Zhu et al., 2022", hr: 1.92, ci_low: 1.65, ci_high: 2.34, weight: 6.2, type: "ICI+Chemo" },
  { study: "Ko et al., 2023", hr: 2.41, ci_low: 1.97, ci_high: 3.13, weight: 3.7, type: "ICI+Chemo" },
  { study: "Wang-Gillam et al., 2022", hr: 2.05, ci_low: 1.79, ci_high: 2.48, weight: 6.9, type: "ICI+Chemo" },
  { study: "Renouf et al., 2022", hr: 2.56, ci_low: 2.18, ci_high: 3.10, weight: 6.2, type: "ICI+Chemo" },
  { study: "Zhu et al., 2021", hr: 2.20, ci_low: 1.93, ci_high: 2.61, weight: 8.1, type: "ICI+Chemo" },
  { study: "O'Hara et al., 2021", hr: 2.48, ci_low: 2.20, ci_high: 2.86, weight: 10.4, type: "ICI+Chemo" },
  { study: "Wainberg et al., 2020", hr: 2.29, ci_low: 1.97, ci_high: 2.75, weight: 6.9, type: "ICI+Chemo" },
  { study: "Tsujikawa et al., 2020", hr: 1.99, ci_low: 1.72, ci_high: 2.41, weight: 6.5, type: "ICI+Chemo" },
  { study: "Enzler et al., 2024", hr: 2.23, ci_low: 1.92, ci_high: 2.66, weight: 6.9, type: "ICI+Chemo" },
  { study: "Weiss et al., 2023", hr: 2.39, ci_low: 2.03, ci_high: 2.92, weight: 5.8, type: "ICI+Chemo" },
  { study: "Zhou et al., 2024", hr: 2.10, ci_low: 1.84, ci_high: 2.46, weight: 8.6, type: "ICI+Chemo" },
  { study: "Sun et al., 2021", hr: 2.51, ci_low: 2.12, ci_high: 3.13, weight: 5.0, type: "ICI+Chemo" },
  { study: "Liu et al., 2021", hr: 2.44, ci_low: 2.05, ci_high: 2.97, weight: 5.6, type: "ICI+Chemo" }
];

const treatmentOutcomes = [
  { treatment: "Motixafortide + Pembrolizumab + Chemo", orr: 21.1, medianOS: 6.6, medianPFS: 3.8, type: "Triple Combo" },
  { treatment: "Nivolumab + Chemotherapy", orr: 50, medianOS: 16.7, medianPFS: null, type: "ICI+Chemo" },
  { treatment: "Sotigalimab + Chemotherapy", orr: 33, medianOS: 11.4, medianPFS: null, type: "ICI+Chemo" },
  { treatment: "Gem + Nab-pac + APX005M (B1)", orr: 67, medianOS: 12.7, medianPFS: 12.5, type: "Triple Combo" },
  { treatment: "Gem + Nab-pac + APX005M (B2)", orr: 33, medianOS: 15.9, medianPFS: 10.4, type: "Triple Combo" },
  { treatment: "Pembrolizumab + ChemoRT", orr: null, medianOS: 27.8, medianPFS: null, type: "ICI+ChemoRT" },
  { treatment: "Nivolumab Monotherapy", orr: 0, medianOS: 18.0, medianPFS: 6.8, type: "Monotherapy" },
  { treatment: "Ipilimumab Monotherapy", orr: 0, medianOS: 3.6, medianPFS: null, type: "Monotherapy" },
  { treatment: "Ipilimumab + GVAX", orr: null, medianOS: 5.7, medianPFS: null, type: "ICI+Vaccine" },
  { treatment: "Atezolizumab + PEGPH20", orr: 6.1, medianOS: null, medianPFS: 1.5, type: "ICI+Targeted" },
  { treatment: "Gemcitabine + Nab-paclitaxel + Pembrolizumab", orr: null, medianOS: 15.0, medianPFS: 9.1, type: "ICI+Chemo" }
];

const robRCTData = [
  { study: "Callahan et al., 2024", D1: "low", D2: "low", D3: "low", D4: "low", D5: "low", overall: "low" },
  { study: "Chen et al., 2023", D1: "low", D2: "low", D3: "low", D4: "concerns", D5: "low", overall: "low" },
  { study: "Ko et al., 2023", D1: "low", D2: "low", D3: "low", D4: "low", D5: "low", overall: "low" },
  { study: "Le et al., 2013", D1: "low", D2: "low", D3: "low", D4: "low", D5: "low", overall: "low" },
  { study: "Mahalingam et al., 2018", D1: "low", D2: "low", D3: "low", D4: "low", D5: "concerns", overall: "low" },
  { study: "Overman et al., 2020", D1: "low", D2: "low", D3: "low", D4: "low", D5: "low", overall: "low" },
  { study: "Padrón et al., 2022", D1: "low", D2: "low", D3: "concerns", D4: "low", D5: "low", overall: "low" },
  { study: "Reddy et al., 2022", D1: "low", D2: "low", D3: "low", D4: "low", D5: "low", overall: "low" },
  { study: "Reiss et al., 2022", D1: "low", D2: "low", D3: "low", D4: "low", D5: "low", overall: "low" },
  { study: "Renouf et al., 2022", D1: "low", D2: "low", D3: "low", D4: "low", D5: "low", overall: "low" },
  { study: "Song et al., 2022", D1: "low", D2: "low", D3: "low", D4: "low", D5: "low", overall: "low" },
  { study: "Tsujikawa et al., 2020", D1: "low", D2: "concerns", D3: "low", D4: "low", D5: "low", overall: "low" },
  { study: "Zhou et al., 2024", D1: "concerns", D2: "concerns", D3: "low", D4: "low", D5: "low", overall: "low" }
];

const bayesianNodes = [
  { id: "treatment", label: "Treatment Type", x: 100, y: 200, type: "intervention" },
  { id: "biomarker", label: "Biomarker Status", x: 100, y: 350, type: "biomarker" },
  { id: "tme", label: "Tumor Microenvironment", x: 300, y: 275, type: "mediator" },
  { id: "immune", label: "Immune Response", x: 500, y: 200, type: "mediator" },
  { id: "orr", label: "ORR", x: 700, y: 150, type: "outcome" },
  { id: "pfs", label: "PFS", x: 700, y: 275, type: "outcome" },
  { id: "os", label: "OS", x: 700, y: 400, type: "outcome" }
];

const bayesianEdges = [
  { from: "treatment", to: "tme", strength: "strong" },
  { from: "treatment", to: "immune", strength: "strong" },
  { from: "biomarker", to: "tme", strength: "moderate" },
  { from: "biomarker", to: "immune", strength: "strong" },
  { from: "tme", to: "immune", strength: "moderate" },
  { from: "tme", to: "orr", strength: "weak" },
  { from: "immune", to: "orr", strength: "strong" },
  { from: "immune", to: "pfs", strength: "strong" },
  { from: "orr", to: "pfs", strength: "moderate" },
  { from: "pfs", to: "os", strength: "strong" },
  { from: "treatment", to: "os", strength: "moderate" }
];

// ============================================
// CUSTOM TOOLTIP COMPONENTS
// ============================================

const ForestPlotTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-4 shadow-xl backdrop-blur-sm">
        <p className="font-semibold text-cyan-400 mb-2">{data.study}</p>
        <div className="space-y-1 text-sm">
          <p className="text-slate-300">
            <span className="text-slate-500">HR/OR:</span> {data.hr?.toFixed(2) || data.or?.toFixed(2)}
          </p>
          <p className="text-slate-300">
            <span className="text-slate-500">95% CI:</span> [{data.ci_low?.toFixed(2)}, {data.ci_high?.toFixed(2)}]
          </p>
          <p className="text-slate-300">
            <span className="text-slate-500">Weight:</span> {data.weight?.toFixed(1)}%
          </p>
        </div>
      </div>
    );
  }
  return null;
};

// ============================================
// MAIN DASHBOARD COMPONENT
// ============================================

export default function PDACDashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedOutcome, setSelectedOutcome] = useState('all');
  const [selectedTreatment, setSelectedTreatment] = useState('all');
  const [detailLevel, setDetailLevel] = useState('summary');
  const [hoveredNode, setHoveredNode] = useState(null);

  const sections = [
    { id: 'overview', label: 'Overview', icon: '◈' },
    { id: 'methodology', label: 'Methodology', icon: '⬡' },
    { id: 'findings', label: 'Key Findings', icon: '◆' },
    { id: 'bayesian', label: 'Causal Network', icon: '⬢' },
    { id: 'forest', label: 'Forest Plots', icon: '▣' },
    { id: 'implications', label: 'Implications', icon: '◇' }
  ];

  // ============================================
  // OVERVIEW SECTION
  // ============================================

  const OverviewSection = () => (
    <div className="space-y-8">
      {/* Hero Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900/30 p-8 border border-cyan-500/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-cyan-400 text-sm font-medium tracking-wider uppercase mb-2">Systematic Review & Meta-Analysis</p>
              <h2 className="text-3xl font-bold text-white mb-4 leading-tight">{paperMetadata.title}</h2>
              <p className="text-slate-400 text-lg mb-6">{paperMetadata.subtitle}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {paperMetadata.totalStudies} Studies
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {paperMetadata.totalParticipants.toLocaleString()} Participants
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {paperMetadata.journal} {paperMetadata.year}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-700/50">
            <p className="text-slate-500 text-sm">{paperMetadata.authors}</p>
            <p className="text-slate-600 text-xs mt-1">DOI: {paperMetadata.doi}</p>
          </div>
        </div>
      </div>

      {/* Key Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "OS Improvement", value: "18%", detail: "HR 0.82 (ICI+Chemo)", color: "emerald" },
          { label: "ORR Pooled", value: "10%", detail: "OR 1.10 (ICB therapy)", color: "cyan" },
          { label: "PFS Hazard Ratio", value: "2.25", detail: "95% CI: 2.15-2.36", color: "amber" },
          { label: "Radiotherapy + ICI", value: "+18%", detail: "Mortality increase", color: "rose" }
        ].map((stat, i) => (
          <div key={i} className={`rounded-xl p-5 bg-slate-800/50 border border-${stat.color}-500/20 hover:border-${stat.color}-500/40 transition-all duration-300`}>
            <p className={`text-${stat.color}-400 text-sm font-medium mb-1`}>{stat.label}</p>
            <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-slate-500 text-xs">{stat.detail}</p>
          </div>
        ))}
      </div>

      {/* Context Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl bg-slate-800/30 p-6 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-cyan-400">◈</span> Background
          </h3>
          <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
            <p>Pancreatic ductal adenocarcinoma (PDAC) remains one of the most lethal malignancies with 5-year survival rates below 2%.</p>
            <p>Key molecular drivers include mutations in <span className="text-amber-400 font-medium">KRAS</span>, <span className="text-amber-400 font-medium">TP53</span>, and <span className="text-amber-400 font-medium">CDKN2A</span>.</p>
            <p>The tumor microenvironment is characterized by dense stroma, immunosuppressive cells, and limited T-cell infiltration—creating a "cold" immune milieu.</p>
          </div>
        </div>

        <div className="rounded-xl bg-slate-800/30 p-6 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-emerald-400">◇</span> Research Objectives
          </h3>
          <div className="space-y-3 text-slate-300 text-sm leading-relaxed">
            <p>Systematically investigate the impact of ICIs on key clinical outcomes in PDAC patients.</p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Progression-free survival (PFS)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Overall survival (OS)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Objective response rate (ORR)
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Treatment Outcomes Summary */}
      <div className="rounded-xl bg-slate-800/30 p-6 border border-slate-700/50">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span className="text-amber-400">▣</span> Treatment Outcomes Overview
        </h3>
        <div className="overflow-x-auto">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={treatmentOutcomes.filter(t => t.medianOS)} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  dataKey="treatment" 
                  tick={{ fill: '#94a3b8', fontSize: 10 }} 
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                  height={80}
                />
                <YAxis tick={{ fill: '#94a3b8' }} label={{ value: 'Months', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #0891b2', borderRadius: '8px' }}
                  labelStyle={{ color: '#22d3ee' }}
                />
                <Bar dataKey="medianOS" fill="#22d3ee" name="Median OS (months)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="medianPFS" fill="#10b981" name="Median PFS (months)" radius={[4, 4, 0, 0]} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  // ============================================
  // METHODOLOGY SECTION
  // ============================================

  const MethodologySection = () => (
    <div className="space-y-8">
      {/* PRISMA Flow Diagram */}
      <div className="rounded-xl bg-slate-800/30 p-6 border border-slate-700/50">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <span className="text-cyan-400">⬡</span> PRISMA Flow Diagram
        </h3>
        
        <div className="relative">
          {/* Identification */}
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 rounded-xl p-6 border border-cyan-500/30 max-w-xl">
              <p className="text-cyan-400 text-xs font-medium uppercase tracking-wider mb-3">Identification</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white font-medium">Records identified from:</p>
                  <ul className="text-slate-400 mt-2 space-y-1">
                    <li>PubMed (n = {prismaData.identification.pubmed})</li>
                    <li>Cochrane (n = {prismaData.identification.cochrane})</li>
                    <li>CINAHL (n = {prismaData.identification.cinahl})</li>
                    <li>Google Scholar (n = {prismaData.identification.googleScholar})</li>
                  </ul>
                  <p className="text-cyan-300 font-semibold mt-2">Total (n = {prismaData.identification.total})</p>
                </div>
                <div>
                  <p className="text-white font-medium">Records removed before screening:</p>
                  <ul className="text-slate-400 mt-2 space-y-1">
                    <li>Duplicates (n = {prismaData.removed.duplicates})</li>
                    <li>Automation tools (n = {prismaData.removed.automation})</li>
                    <li>Other reasons (n = {prismaData.removed.other})</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center mb-4">
            <div className="w-0.5 h-8 bg-gradient-to-b from-cyan-500 to-emerald-500"></div>
          </div>

          {/* Screening */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="bg-gradient-to-r from-emerald-900/50 to-teal-900/50 rounded-xl p-5 border border-emerald-500/30">
              <p className="text-emerald-400 text-xs font-medium uppercase tracking-wider mb-2">Screening</p>
              <p className="text-white font-medium">Records screened</p>
              <p className="text-emerald-300 font-bold text-2xl">{prismaData.screened}</p>
            </div>
            <div className="flex items-center text-slate-500">→</div>
            <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-600/30">
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">Excluded</p>
              <p className="text-white font-medium">Records excluded</p>
              <p className="text-rose-400 font-bold text-2xl">{prismaData.excluded}</p>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center mb-4">
            <div className="w-0.5 h-8 bg-gradient-to-b from-emerald-500 to-amber-500"></div>
          </div>

          {/* Eligibility */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="bg-gradient-to-r from-amber-900/50 to-orange-900/50 rounded-xl p-5 border border-amber-500/30">
              <p className="text-amber-400 text-xs font-medium uppercase tracking-wider mb-2">Eligibility</p>
              <p className="text-white font-medium">Reports assessed</p>
              <p className="text-amber-300 font-bold text-2xl">{prismaData.assessed}</p>
            </div>
            <div className="flex items-center text-slate-500">→</div>
            <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-600/30 max-w-xs">
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">Exclusion Reasons</p>
              <ul className="text-slate-400 text-sm space-y-1">
                <li>Deviating outcomes (n = {prismaData.excludedReasons.deviatingOutcomes})</li>
                <li>Expression studies (n = {prismaData.excludedReasons.investigatingExpression})</li>
                <li>Combined cancers (n = {prismaData.excludedReasons.combinedCancers})</li>
                <li>Murine models (n = {prismaData.excludedReasons.murineModels})</li>
              </ul>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center mb-4">
            <div className="w-0.5 h-8 bg-gradient-to-b from-amber-500 to-violet-500"></div>
          </div>

          {/* Included */}
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-violet-900/50 to-purple-900/50 rounded-xl p-6 border border-violet-500/30">
              <p className="text-violet-400 text-xs font-medium uppercase tracking-wider mb-2">Included</p>
              <p className="text-white font-medium">Studies included in review</p>
              <p className="text-violet-300 font-bold text-4xl">{prismaData.included}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Risk of Bias Assessment */}
      <div className="rounded-xl bg-slate-800/30 p-6 border border-slate-700/50">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <span className="text-emerald-400">◆</span> Risk of Bias Assessment (RCTs)
        </h3>
        
        <div className="mb-4 flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
            <span className="text-slate-400">Low risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-amber-500"></div>
            <span className="text-slate-400">Some concerns</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-2 text-slate-400 font-medium">Study</th>
                <th className="text-center py-3 px-2 text-slate-400 font-medium">D1</th>
                <th className="text-center py-3 px-2 text-slate-400 font-medium">D2</th>
                <th className="text-center py-3 px-2 text-slate-400 font-medium">D3</th>
                <th className="text-center py-3 px-2 text-slate-400 font-medium">D4</th>
                <th className="text-center py-3 px-2 text-slate-400 font-medium">D5</th>
                <th className="text-center py-3 px-2 text-slate-400 font-medium">Overall</th>
              </tr>
            </thead>
            <tbody>
              {robRCTData.slice(0, 8).map((row, i) => (
                <tr key={i} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                  <td className="py-2 px-2 text-slate-300">{row.study}</td>
                  {['D1', 'D2', 'D3', 'D4', 'D5', 'overall'].map(key => (
                    <td key={key} className="text-center py-2 px-2">
                      <div className={`w-6 h-6 rounded-full mx-auto ${row[key] === 'low' ? 'bg-emerald-500' : 'bg-amber-500'} flex items-center justify-center`}>
                        <span className="text-white text-xs">{row[key] === 'low' ? '+' : '-'}</span>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-xs text-slate-500">
          <p>D1: Randomization process | D2: Deviations from interventions | D3: Missing outcome data | D4: Outcome measurement | D5: Selection of reported result</p>
        </div>
      </div>

      {/* Analysis Tools */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { title: "Statistical Analysis", tools: ["RStudio v4.4.2", "meta package", "Random-effects models"], icon: "📊" },
          { title: "Bias Assessment", tools: ["RoB 2.0 (RCTs)", "ROBINS-I (Non-RCTs)", "GRADE framework"], icon: "⚖️" },
          { title: "Heterogeneity", tools: ["Higgins I² statistic", "Leave-one-out sensitivity", "Egger's test"], icon: "📈" }
        ].map((item, i) => (
          <div key={i} className="rounded-xl bg-slate-800/30 p-5 border border-slate-700/50">
            <div className="text-2xl mb-3">{item.icon}</div>
            <h4 className="text-white font-medium mb-3">{item.title}</h4>
            <ul className="space-y-2">
              {item.tools.map((tool, j) => (
                <li key={j} className="text-slate-400 text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  // ============================================
  // KEY FINDINGS SECTION
  // ============================================

  const FindingsSection = () => {
    const [findingTab, setFindingTab] = useState('orr');

    return (
      <div className="space-y-8">
        {/* Tab Navigation */}
        <div className="flex gap-2 p-1 bg-slate-800/50 rounded-xl">
          {[
            { id: 'orr', label: 'Objective Response Rate' },
            { id: 'os', label: 'Overall Survival' },
            { id: 'pfs', label: 'Progression-Free Survival' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFindingTab(tab.id)}
              className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                findingTab === tab.id 
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ORR Content */}
        {findingTab === 'orr' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-xl bg-gradient-to-br from-cyan-900/30 to-cyan-800/10 p-5 border border-cyan-500/20">
                <p className="text-cyan-400 text-sm mb-2">ICI + Chemotherapy</p>
                <p className="text-3xl font-bold text-white">OR 1.78</p>
                <p className="text-slate-400 text-sm">95% CI: 1.46–2.16</p>
                <p className="text-amber-400 text-xs mt-2">I² = 85% (high heterogeneity)</p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-emerald-900/30 to-emerald-800/10 p-5 border border-emerald-500/20">
                <p className="text-emerald-400 text-sm mb-2">ICB Monotherapy</p>
                <p className="text-3xl font-bold text-white">OR 1.10</p>
                <p className="text-slate-400 text-sm">95% CI: 1.02–1.18</p>
                <p className="text-emerald-400 text-xs mt-2">I² = 0% (no heterogeneity)</p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-amber-900/30 to-amber-800/10 p-5 border border-amber-500/20">
                <p className="text-amber-400 text-sm mb-2">ICI + Radiotherapy</p>
                <p className="text-3xl font-bold text-white">OR 1.35</p>
                <p className="text-slate-400 text-sm">95% CI: 0.99–1.83</p>
                <p className="text-rose-400 text-xs mt-2">I² = 96% (very high heterogeneity)</p>
              </div>
            </div>

            <div className="rounded-xl bg-slate-800/30 p-6 border border-slate-700/50">
              <h4 className="text-white font-medium mb-4">ORR by Treatment Combination</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-2 text-slate-400">Treatment</th>
                      <th className="text-right py-3 px-2 text-slate-400">ORR</th>
                      <th className="text-left py-3 px-2 text-slate-400">Reference</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { treatment: "Gem + Nab-pac + APX005M (B1)", orr: "67%", ref: "O'Hara et al.", highlight: true },
                      { treatment: "Chemotherapy + Nivolumab", orr: "50%", ref: "Padron et al." },
                      { treatment: "Anti-PD-1 + Nivo/Ipi + Chemo", orr: "48.4%", ref: "Taieb et al." },
                      { treatment: "Sotigalimab + Chemotherapy", orr: "33%", ref: "Padron et al." },
                      { treatment: "Motixafortide + Pembrolizumab + Chemo", orr: "21.1%", ref: "Bockorny et al." },
                      { treatment: "Gemcitabine + Implicinab", orr: "14%", ref: "Kamath et al." },
                      { treatment: "Nivolumab (monotherapy)", orr: "0%", ref: "Callahan et al.", dim: true }
                    ].map((row, i) => (
                      <tr key={i} className={`border-b border-slate-800 ${row.highlight ? 'bg-emerald-500/10' : row.dim ? 'opacity-50' : ''}`}>
                        <td className="py-3 px-2 text-slate-300">{row.treatment}</td>
                        <td className={`text-right py-3 px-2 font-semibold ${row.highlight ? 'text-emerald-400' : row.dim ? 'text-rose-400' : 'text-white'}`}>
                          {row.orr}
                        </td>
                        <td className="py-3 px-2 text-slate-500">{row.ref}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* OS Content */}
        {findingTab === 'os' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-xl bg-gradient-to-br from-emerald-900/30 to-emerald-800/10 p-5 border border-emerald-500/20">
                <p className="text-emerald-400 text-sm mb-2">ICI + Chemotherapy</p>
                <p className="text-3xl font-bold text-white">HR 0.82</p>
                <p className="text-slate-400 text-sm">95% CI: 0.78–0.87</p>
                <p className="text-emerald-400 text-xs mt-2">18% reduction in death risk</p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-cyan-900/30 to-cyan-800/10 p-5 border border-cyan-500/20">
                <p className="text-cyan-400 text-sm mb-2">ICI Monotherapy</p>
                <p className="text-3xl font-bold text-white">HR 0.82</p>
                <p className="text-slate-400 text-sm">95% CI: 0.76–0.88</p>
                <p className="text-cyan-400 text-xs mt-2">I² = 0%</p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-rose-900/30 to-rose-800/10 p-5 border border-rose-500/20">
                <p className="text-rose-400 text-sm mb-2">ICI + Radiotherapy</p>
                <p className="text-3xl font-bold text-white">HR 1.18</p>
                <p className="text-slate-400 text-sm">95% CI: 1.04–1.34</p>
                <p className="text-rose-400 text-xs mt-2">⚠️ Increased mortality risk</p>
              </div>
            </div>

            <div className="rounded-xl bg-slate-800/30 p-6 border border-slate-700/50">
              <h4 className="text-white font-medium mb-4">Median OS by Treatment</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: "Pembrolizumab + ChemoRT", os: 27.8 },
                    { name: "Nivolumab Monotherapy", os: 18.0 },
                    { name: "Nivolumab + Chemo", os: 16.7 },
                    { name: "NPS + Sintilimab", os: 16.8 },
                    { name: "Gem + Nab-pac + Pembro", os: 15.0 },
                    { name: "Sotigalimab + Chemo", os: 11.4 }
                  ]} layout="vertical" margin={{ top: 5, right: 30, left: 150, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis type="number" tick={{ fill: '#94a3b8' }} label={{ value: 'Median OS (months)', position: 'bottom', fill: '#94a3b8' }} />
                    <YAxis dataKey="name" type="category" tick={{ fill: '#94a3b8', fontSize: 11 }} width={140} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #0891b2', borderRadius: '8px' }} />
                    <Bar dataKey="os" fill="#22d3ee" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* PFS Content */}
        {findingTab === 'pfs' && (
          <div className="space-y-6">
            <div className="rounded-xl bg-gradient-to-br from-violet-900/30 to-violet-800/10 p-5 border border-violet-500/20 max-w-md">
              <p className="text-violet-400 text-sm mb-2">Pooled PFS Hazard Ratio</p>
              <p className="text-3xl font-bold text-white">HR 2.25</p>
              <p className="text-slate-400 text-sm">95% CI: 2.15–2.36</p>
              <p className="text-emerald-400 text-xs mt-2">I² = 7% (low heterogeneity)</p>
            </div>

            <div className="rounded-xl bg-slate-800/30 p-6 border border-slate-700/50">
              <h4 className="text-white font-medium mb-4">PFS Outcomes by Treatment</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: "Gem + Nab-pac + APX005M (B1)", pfs: 12.5 },
                    { name: "Above + Nivolumab (C2)", pfs: 12.4 },
                    { name: "Above + Nivolumab (C1)", pfs: 10.8 },
                    { name: "Gem + Nab-pac + Pembrolizumab", pfs: 9.1 },
                    { name: "Various ICIs + Chemotherapy", pfs: 4.6 },
                    { name: "Motixafortide + Pembro + Chemo", pfs: 3.8 }
                  ]} layout="vertical" margin={{ top: 5, right: 30, left: 180, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis type="number" tick={{ fill: '#94a3b8' }} label={{ value: 'Median PFS (months)', position: 'bottom', fill: '#94a3b8' }} />
                    <YAxis dataKey="name" type="category" tick={{ fill: '#94a3b8', fontSize: 11 }} width={170} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #0891b2', borderRadius: '8px' }} />
                    <Bar dataKey="pfs" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-4">
              <p className="text-amber-400 text-sm font-medium mb-2">💡 Key Insight</p>
              <p className="text-slate-300 text-sm">PFS benefits were predominantly observed in ICI combinations with chemotherapy. Monotherapy regimens did not show consistent PFS improvements and were generally less effective in delaying progression.</p>
            </div>
          </div>
        )}

        {/* Subgroup Findings */}
        <div className="rounded-xl bg-slate-800/30 p-6 border border-slate-700/50">
          <h4 className="text-white font-medium mb-4 flex items-center gap-2">
            <span className="text-amber-400">◆</span> Subgroup Findings: Biomarker-Selected Populations
          </h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <h5 className="text-emerald-400 font-medium mb-3">High TMB Patients</h5>
              <p className="text-slate-300 text-sm mb-2">Patients with high tumor mutational burden showed:</p>
              <ul className="text-slate-400 text-sm space-y-1">
                <li>• Improved PFS with ICI therapy</li>
                <li>• Better response to checkpoint blockade</li>
                <li>• Longer survival compared to low-TMB patients</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
              <h5 className="text-cyan-400 font-medium mb-3">MSI-H / dMMR Patients</h5>
              <p className="text-slate-300 text-sm mb-2">Mismatch repair deficient tumors demonstrated:</p>
              <ul className="text-slate-400 text-sm space-y-1">
                <li>• ORR of 48.4% with ICI combinations</li>
                <li>• Median PFS of 26.7 months</li>
                <li>• Durable responses in select patients</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============================================
  // BAYESIAN NETWORK SECTION
  // ============================================

  const BayesianSection = () => {
    const [selectedNode, setSelectedNode] = useState(null);

    const nodeColors = {
      intervention: { fill: '#0891b2', stroke: '#22d3ee' },
      biomarker: { fill: '#059669', stroke: '#34d399' },
      mediator: { fill: '#7c3aed', stroke: '#a78bfa' },
      outcome: { fill: '#dc2626', stroke: '#f87171' }
    };

    const nodeDescriptions = {
      treatment: {
        title: "Treatment Type",
        description: "ICI monotherapy, ICI + chemotherapy, ICI + radiotherapy, or combination regimens",
        effects: ["Directly modulates tumor microenvironment", "Activates immune response pathways", "Synergistic effects with other modalities"]
      },
      biomarker: {
        title: "Biomarker Status",
        description: "TMB (high/low), MSI status (MSI-H vs MSS), PD-L1 expression, dMMR status",
        effects: ["Predicts ICI responsiveness", "Influences TME composition", "Determines treatment eligibility"]
      },
      tme: {
        title: "Tumor Microenvironment",
        description: "Dense stroma, immunosuppressive cells (Tregs, MDSCs), collagen density",
        effects: ["Mediates treatment efficacy", "Barriers to T-cell infiltration", "Drug delivery limitations"]
      },
      immune: {
        title: "Immune Response",
        description: "T-cell activation, cytokine release, antigen presentation, immune memory",
        effects: ["Direct anti-tumor activity", "Determines response durability", "Correlates with clinical outcomes"]
      },
      orr: {
        title: "Objective Response Rate",
        description: "Measurable tumor shrinkage (CR + PR) by RECIST criteria",
        effects: ["Early efficacy indicator", "Ranges 0-67% in reviewed studies", "Influenced by immune activation"]
      },
      pfs: {
        title: "Progression-Free Survival",
        description: "Time from treatment to disease progression or death",
        effects: ["Median 1.4-12.5 months", "Improved with ICI+chemo", "Biomarker-dependent variation"]
      },
      os: {
        title: "Overall Survival",
        description: "Time from treatment to death from any cause",
        effects: ["Primary clinical endpoint", "HR 0.82 for ICI+chemo", "HR 1.18 for ICI+RT (⚠️)"]
      }
    };

    return (
      <div className="space-y-6">
        <div className="rounded-xl bg-slate-800/30 p-6 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
            <span className="text-violet-400">⬢</span> Causal Bayesian Network
          </h3>
          <p className="text-slate-400 text-sm mb-6">Interactive model showing causal relationships between treatment, biomarkers, and clinical outcomes. Click nodes for details.</p>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mb-6 text-sm">
            {Object.entries(nodeColors).map(([type, colors]) => (
              <div key={type} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.fill }}></div>
                <span className="text-slate-400 capitalize">{type}</span>
              </div>
            ))}
          </div>

          {/* Network Visualization */}
          <div className="relative bg-slate-900/50 rounded-xl p-4 h-96 overflow-hidden border border-slate-700/30">
            <svg width="100%" height="100%" viewBox="0 0 800 500">
              {/* Edges */}
              {bayesianEdges.map((edge, i) => {
                const from = bayesianNodes.find(n => n.id === edge.from);
                const to = bayesianNodes.find(n => n.id === edge.to);
                const strokeWidth = edge.strength === 'strong' ? 3 : edge.strength === 'moderate' ? 2 : 1;
                const opacity = hoveredNode ? (hoveredNode === edge.from || hoveredNode === edge.to ? 1 : 0.2) : 0.6;
                
                return (
                  <g key={i}>
                    <defs>
                      <marker id={`arrow-${i}`} markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" opacity={opacity} />
                      </marker>
                    </defs>
                    <line
                      x1={from.x + 60}
                      y1={from.y}
                      x2={to.x - 60}
                      y2={to.y}
                      stroke="#64748b"
                      strokeWidth={strokeWidth}
                      opacity={opacity}
                      markerEnd={`url(#arrow-${i})`}
                    />
                  </g>
                );
              })}

              {/* Nodes */}
              {bayesianNodes.map((node) => {
                const colors = nodeColors[node.type];
                const isHovered = hoveredNode === node.id;
                const isSelected = selectedNode === node.id;
                const opacity = hoveredNode ? (isHovered ? 1 : 0.3) : 1;

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x - 55}, ${node.y - 25})`}
                    style={{ cursor: 'pointer', opacity }}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                  >
                    <rect
                      width="110"
                      height="50"
                      rx="8"
                      fill={colors.fill}
                      stroke={isSelected ? '#fff' : colors.stroke}
                      strokeWidth={isSelected ? 3 : 2}
                      className="transition-all duration-200"
                    />
                    <text
                      x="55"
                      y="30"
                      textAnchor="middle"
                      fill="white"
                      fontSize="12"
                      fontWeight="500"
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Node Details Panel */}
        {selectedNode && nodeDescriptions[selectedNode] && (
          <div className="rounded-xl bg-slate-800/50 p-6 border border-cyan-500/30 animate-fadeIn">
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-lg font-semibold text-white">{nodeDescriptions[selectedNode].title}</h4>
              <button 
                onClick={() => setSelectedNode(null)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            <p className="text-slate-300 text-sm mb-4">{nodeDescriptions[selectedNode].description}</p>
            <div>
              <p className="text-cyan-400 text-sm font-medium mb-2">Causal Effects:</p>
              <ul className="space-y-2">
                {nodeDescriptions[selectedNode].effects.map((effect, i) => (
                  <li key={i} className="text-slate-400 text-sm flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">→</span>
                    {effect}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Causal Relationships Summary */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-5">
            <h4 className="text-emerald-400 font-medium mb-3">✓ Positive Causal Pathways</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• ICI + Chemo → Enhanced Immune Response → Improved OS (HR 0.82)</li>
              <li>• High TMB → Better Immune Activation → Improved PFS</li>
              <li>• dMMR Status → ICI Responsiveness → Durable Responses</li>
            </ul>
          </div>
          <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 p-5">
            <h4 className="text-rose-400 font-medium mb-3">⚠️ Negative Causal Pathways</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• ICI + Radiotherapy → Inflammation × ICB Interaction → ↑ Mortality</li>
              <li>• Dense Stroma → T-cell Exclusion → Limited ICI Efficacy</li>
              <li>• Low TMB → Poor Antigen Presentation → Minimal Response</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  // ============================================
  // FOREST PLOTS SECTION
  // ============================================

  const ForestPlotsSection = () => {
    const [plotType, setPlotType] = useState('os_chemo');

    const plotConfigs = {
      os_chemo: { data: osChemoData, title: "OS: ICI + Chemotherapy", color: "#22d3ee", pooled: { hr: 0.82, ci: [0.78, 0.87] }, metric: "hr" },
      os_mono: { data: osMonotherapyData, title: "OS: ICI Monotherapy", color: "#10b981", pooled: { hr: 0.82, ci: [0.76, 0.88] }, metric: "hr" },
      os_rt: { data: osRadiotherapyData, title: "OS: ICI + Radiotherapy", color: "#f43f5e", pooled: { hr: 1.18, ci: [1.04, 1.34] }, metric: "hr" },
      pfs: { data: pfsData, title: "PFS: All Combinations", color: "#8b5cf6", pooled: { hr: 2.25, ci: [2.15, 2.36] }, metric: "hr" },
      orr: { data: orrData, title: "ORR: ICI + Chemotherapy", color: "#f59e0b", pooled: { or: 1.78, ci: [1.46, 2.16] }, metric: "or" }
    };

    const currentConfig = plotConfigs[plotType];
    const referenceValue = currentConfig.metric === 'hr' ? 1 : 1;

    return (
      <div className="space-y-6">
        {/* Plot Type Selector */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(plotConfigs).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setPlotType(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                plotType === key
                  ? 'text-white border'
                  : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
              style={plotType === key ? { backgroundColor: `${config.color}20`, borderColor: `${config.color}50`, color: config.color } : {}}
            >
              {config.title.split(':')[0]}
            </button>
          ))}
        </div>

        {/* Forest Plot */}
        <div className="rounded-xl bg-slate-800/30 p-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">{currentConfig.title}</h3>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-slate-400">
                Pooled {currentConfig.metric.toUpperCase()}: 
                <span className="ml-2 font-semibold" style={{ color: currentConfig.color }}>
                  {currentConfig.pooled[currentConfig.metric].toFixed(2)}
                </span>
              </span>
              <span className="text-slate-500">
                95% CI: [{currentConfig.pooled.ci[0].toFixed(2)}, {currentConfig.pooled.ci[1].toFixed(2)}]
              </span>
            </div>
          </div>

          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 80, left: 180, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  type="number" 
                  dataKey={currentConfig.metric}
                  domain={currentConfig.metric === 'hr' ? [0.5, 2.5] : [0.5, 4]}
                  tick={{ fill: '#94a3b8' }}
                  label={{ value: currentConfig.metric === 'hr' ? 'Hazard Ratio' : 'Odds Ratio', position: 'bottom', fill: '#94a3b8' }}
                />
                <YAxis 
                  type="category" 
                  dataKey="study" 
                  tick={{ fill: '#94a3b8', fontSize: 11 }}
                  width={170}
                />
                <Tooltip content={<ForestPlotTooltip />} />
                <ReferenceLine x={referenceValue} stroke="#64748b" strokeDasharray="5 5" />
                
                {/* Confidence Interval Lines */}
                {currentConfig.data.map((d, i) => (
                  <ReferenceLine
                    key={`ci-${i}`}
                    segment={[
                      { x: d.ci_low, y: d.study },
                      { x: d.ci_high, y: d.study }
                    ]}
                    stroke={currentConfig.color}
                    strokeWidth={2}
                    strokeOpacity={0.6}
                  />
                ))}

                <Scatter data={currentConfig.data} fill={currentConfig.color}>
                  {currentConfig.data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={currentConfig.color} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* Pooled Estimate Diamond */}
          <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-slate-700">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rotate-45" style={{ backgroundColor: currentConfig.color }}></div>
              <span className="text-slate-400 text-sm">Random Effects Model</span>
            </div>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400 text-sm">
              I² = {plotType === 'os_chemo' ? '0%' : plotType === 'os_rt' ? '56%' : plotType === 'orr' ? '85%' : '7%'}
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400 text-sm">
              p {plotType === 'os_rt' ? '= 0.05' : '< 0.01'}
            </span>
          </div>
        </div>

        {/* Interpretation */}
        <div className={`rounded-xl p-4 border ${
          plotType === 'os_rt' 
            ? 'bg-rose-500/10 border-rose-500/30' 
            : 'bg-emerald-500/10 border-emerald-500/30'
        }`}>
          <p className={`text-sm font-medium mb-2 ${plotType === 'os_rt' ? 'text-rose-400' : 'text-emerald-400'}`}>
            {plotType === 'os_rt' ? '⚠️ Interpretation Warning' : '✓ Interpretation'}
          </p>
          <p className="text-slate-300 text-sm">
            {plotType === 'os_chemo' && "ICI combined with chemotherapy demonstrates a significant 18% reduction in mortality risk (HR 0.82), with consistent results across studies and no heterogeneity."}
            {plotType === 'os_mono' && "ICI monotherapy shows variable outcomes. While the pooled HR suggests benefit, confidence intervals are wider and patient selection remains crucial."}
            {plotType === 'os_rt' && "ICI combined with radiotherapy is associated with an 18% INCREASE in mortality risk. This adverse outcome may be due to complex interactions between radiation-induced inflammation and immune checkpoint blockade."}
            {plotType === 'pfs' && "Progression-free survival shows consistent improvement with ICI combinations, with a pooled HR of 2.25 and low heterogeneity, suggesting reliable disease control."}
            {plotType === 'orr' && "Objective response rates vary significantly across treatment combinations. High heterogeneity (I² = 85%) indicates considerable variability in tumor response."}
          </p>
        </div>
      </div>
    );
  };

  // ============================================
  // IMPLICATIONS SECTION
  // ============================================

  const ImplicationsSection = () => (
    <div className="space-y-8">
      {/* Key Conclusions */}
      <div className="rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 border border-slate-700/50">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <span className="text-emerald-400">◇</span> Key Conclusions
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-emerald-400">✓</span>
              </div>
              <div>
                <p className="text-white font-medium">ICI + Chemotherapy Shows Promise</p>
                <p className="text-slate-400 text-sm mt-1">18% reduction in mortality risk with consistent results across studies</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-emerald-400">✓</span>
              </div>
              <div>
                <p className="text-white font-medium">Biomarker-Guided Selection Critical</p>
                <p className="text-slate-400 text-sm mt-1">High TMB and dMMR patients show best responses to ICI therapy</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-rose-400">⚠</span>
              </div>
              <div>
                <p className="text-white font-medium">Caution with Radiotherapy Combinations</p>
                <p className="text-slate-400 text-sm mt-1">ICI + RT associated with increased mortality—careful patient selection needed</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-amber-400">!</span>
              </div>
              <div>
                <p className="text-white font-medium">Limited Monotherapy Efficacy</p>
                <p className="text-slate-400 text-sm mt-1">ICI monotherapy shows 0% ORR in most PDAC patients due to immunosuppressive TME</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Limitations */}
      <div className="rounded-xl bg-slate-800/30 p-6 border border-slate-700/50">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span className="text-amber-400">⚡</span> Study Limitations
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: "Small Sample Sizes", desc: "Many included studies had limited participants, affecting precision of estimates" },
            { title: "High Heterogeneity", desc: "Clinical and methodological variability in treatment combinations and outcomes" },
            { title: "Limited RCTs", desc: "Majority were early-phase or retrospective studies, limiting evidence strength" }
          ].map((lim, i) => (
            <div key={i} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/30">
              <p className="text-amber-400 font-medium text-sm mb-2">{lim.title}</p>
              <p className="text-slate-400 text-sm">{lim.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Future Directions */}
      <div className="rounded-xl bg-gradient-to-br from-cyan-900/20 to-violet-900/20 p-6 border border-cyan-500/20">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span className="text-cyan-400">🔬</span> Future Research Directions
        </h3>
        <div className="space-y-4">
          {[
            { area: "Predictive Biomarkers", direction: "Develop and validate biomarkers for optimal ICI patient selection", trials: ["NCT04536077", "NCT04317040"] },
            { area: "Novel Combinations", direction: "Explore ICIs with targeted therapies, cancer vaccines, and immunomodulators", trials: [] },
            { area: "TME Modulation", direction: "Strategies to convert 'cold' tumors to 'hot' phenotypes for improved ICI response", trials: [] },
            { area: "Personalized Approaches", direction: "Integrate multi-omic data for individualized treatment selection", trials: [] }
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-white font-medium">{item.area}</p>
                <p className="text-slate-400 text-sm mt-1">{item.direction}</p>
                {item.trials.length > 0 && (
                  <div className="flex gap-2 mt-2">
                    {item.trials.map((trial, j) => (
                      <span key={j} className="px-2 py-1 text-xs rounded bg-cyan-500/20 text-cyan-300">{trial}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clinical Practice Guidance */}
      <div className="rounded-xl bg-slate-800/30 p-6 border border-slate-700/50">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span className="text-violet-400">📋</span> Clinical Practice Guidance
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-slate-400">Patient Profile</th>
                <th className="text-left py-3 px-4 text-slate-400">Recommended Approach</th>
                <th className="text-left py-3 px-4 text-slate-400">Evidence Level</th>
              </tr>
            </thead>
            <tbody>
              {[
                { profile: "High TMB / MSI-H / dMMR", approach: "ICI combination therapy (preferably with chemotherapy)", evidence: "Moderate-High" },
                { profile: "Low TMB / MSS", approach: "Standard chemotherapy; consider clinical trials", evidence: "Moderate" },
                { profile: "Metastatic, first-line", approach: "ICI + chemotherapy (gemcitabine/nab-paclitaxel base)", evidence: "Moderate" },
                { profile: "Locally advanced", approach: "Neoadjuvant chemoradiotherapy ± ICI (with caution)", evidence: "Low" }
              ].map((row, i) => (
                <tr key={i} className="border-b border-slate-800 hover:bg-slate-800/30">
                  <td className="py-3 px-4 text-cyan-300 font-medium">{row.profile}</td>
                  <td className="py-3 px-4 text-slate-300">{row.approach}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      row.evidence.includes('High') ? 'bg-emerald-500/20 text-emerald-400' :
                      row.evidence === 'Moderate' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-slate-500/20 text-slate-400'
                    }`}>
                      {row.evidence}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // ============================================
  // MAIN RENDER
  // ============================================

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
                <span className="text-lg font-bold">Ω</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white">PDAC Immunotherapy Dashboard</h1>
                <p className="text-xs text-slate-500">Al-Khinji et al. 2025 • Frontiers in Oncology</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDetailLevel(detailLevel === 'summary' ? 'detailed' : 'summary')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  detailLevel === 'detailed' 
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {detailLevel === 'summary' ? 'Show Details' : 'Summary View'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="sticky top-16 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 py-2 overflow-x-auto">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <span>{section.icon}</span>
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 relative">
        {activeSection === 'overview' && <OverviewSection />}
        {activeSection === 'methodology' && <MethodologySection />}
        {activeSection === 'findings' && <FindingsSection />}
        {activeSection === 'bayesian' && <BayesianSection />}
        {activeSection === 'forest' && <ForestPlotsSection />}
        {activeSection === 'implications' && <ImplicationsSection />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            Based on: Al-Khinji A, et al. (2025) Immune checkpoint inhibitors in pancreatic adenocarcinoma. 
            <span className="text-slate-400 ml-1">Front. Oncol. 15:1569884</span>
          </p>
          <p className="text-slate-600 text-xs mt-2">
            Interactive Dashboard • Data visualization for research purposes only
          </p>
        </div>
      </footer>

      {/* Custom Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #0f172a;
        }
        ::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `}</style>
    </div>
  );
}
