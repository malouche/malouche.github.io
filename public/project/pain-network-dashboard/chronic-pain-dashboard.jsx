import React, { useState, useCallback, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter, ErrorBar, ReferenceLine, Cell, PieChart, Pie,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend,
  ComposedChart, Line, Area
} from 'recharts';
import { 
  Activity, Brain, Users, TrendingUp, Filter, Play, Info, 
  ChevronRight, AlertCircle, Heart, Zap, Target, ArrowRight,
  User, Calendar, MapPin
} from 'lucide-react';

// ============ DATA DEFINITIONS ============

const painPrevalence = [
  { name: 'Back', prevalence: 34.8, yes: 836, no: 1564, color: '#3B82F6' },
  { name: 'Neck', prevalence: 34.3, yes: 824, no: 1576, color: '#6366F1' },
  { name: 'Headache', prevalence: 31.1, yes: 747, no: 1653, color: '#8B5CF6' },
  { name: 'Knee', prevalence: 24.9, yes: 597, no: 1803, color: '#EC4899' },
  { name: 'Stomach', prevalence: 21.8, yes: 523, no: 1877, color: '#F59E0B' },
  { name: 'Foot', prevalence: 12.5, yes: 301, no: 2099, color: '#10B981' },
  { name: 'Hand', prevalence: 8.9, yes: 214, no: 2186, color: '#EF4444' },
  { name: 'Hip', prevalence: 6.7, yes: 160, no: 2240, color: '#14B8A6' },
  { name: 'All Body', prevalence: 6.1, yes: 146, no: 2254, color: '#F97316' },
  { name: 'Face', prevalence: 2.9, yes: 69, no: 2331, color: '#84CC16' },
];

const genderPainData = [
  { pain: 'Hand', female: 70.1, male: 29.9 },
  { pain: 'All Body', female: 71.9, male: 28.1 },
  { pain: 'Knee', female: 62.8, male: 37.2 },
  { pain: 'Foot', female: 63.1, male: 36.9 },
  { pain: 'Hip', female: 57.5, male: 42.5 },
  { pain: 'Stomach', female: 58.5, male: 41.5 },
  { pain: 'Back', female: 59.1, male: 40.9 },
  { pain: 'Neck', female: 60.7, male: 39.3 },
  { pain: 'Headache', female: 60.8, male: 39.2 },
  { pain: 'Face', female: 60.9, male: 39.1 },
  { pain: 'None', female: 35.5, male: 64.5 },
];

const agePainData = [
  { pain: 'Headache', young: 51.8, middle: 45.1, senior: 3.1 },
  { pain: 'Stomach', young: 50.5, middle: 44.4, senior: 5.2 },
  { pain: 'Face', young: 56.5, middle: 40.6, senior: 2.9 },
  { pain: 'All Body', young: 39.0, middle: 54.1, senior: 6.8 },
  { pain: 'Back', young: 41.5, middle: 50.2, senior: 8.2 },
  { pain: 'Neck', young: 36.2, middle: 55.8, senior: 8.0 },
  { pain: 'Hip', young: 33.8, middle: 53.1, senior: 13.1 },
  { pain: 'Hand', young: 28.5, middle: 60.8, senior: 10.8 },
  { pain: 'Foot', young: 31.2, middle: 57.4, senior: 11.0 },
  { pain: 'Knee', young: 29.3, middle: 56.8, senior: 13.9 },
];

const demographicDistribution = [
  { name: 'Young (18-35)', value: 40.9, count: 981, color: '#3B82F6' },
  { name: 'Middle (36-60)', value: 50.6, count: 1215, color: '#8B5CF6' },
  { name: 'Senior (61+)', value: 8.5, count: 204, color: '#EC4899' },
];

const oddsRatioData = [
  { relationship: 'Headache → Face', or: 11.30, lower: 6.024, upper: 21.186, category: 'inter-pain' },
  { relationship: 'Hip → Hand', or: 8.69, lower: 6.074, upper: 12.434, category: 'inter-pain' },
  { relationship: 'Hand → Face', or: 8.41, lower: 5.096, upper: 13.880, category: 'inter-pain' },
  { relationship: 'Hand → Foot', or: 8.25, lower: 6.082, upper: 11.199, category: 'inter-pain' },
  { relationship: 'Hand → All Body', or: 7.68, lower: 5.293, upper: 11.149, category: 'inter-pain' },
  { relationship: 'Foot → Knee', or: 4.76, lower: 3.704, upper: 6.114, category: 'inter-pain' },
  { relationship: 'Hand → Neck', or: 4.45, lower: 3.302, upper: 6.000, category: 'inter-pain' },
  { relationship: 'Back → All Body', or: 4.34, lower: 3.030, upper: 6.203, category: 'inter-pain' },
  { relationship: 'Neck → Back', or: 4.28, lower: 3.572, upper: 5.125, category: 'inter-pain' },
  { relationship: 'Neck → Foot', or: 4.09, lower: 3.175, upper: 5.265, category: 'inter-pain' },
  { relationship: 'Hand → Back', or: 4.05, lower: 3.013, upper: 5.444, category: 'inter-pain' },
  { relationship: 'Back → Knee', or: 3.39, lower: 2.796, upper: 4.104, category: 'inter-pain' },
  { relationship: 'Neck → Stomach', or: 3.03, lower: 2.486, upper: 3.704, category: 'inter-pain' },
  { relationship: 'Headache → Stomach', or: 2.97, lower: 2.433, upper: 3.632, category: 'inter-pain' },
  { relationship: 'Headache → Neck', or: 2.87, lower: 2.395, upper: 3.433, category: 'inter-pain' },
  { relationship: 'Back → Stomach', or: 2.74, lower: 2.245, upper: 3.338, category: 'inter-pain' },
  { relationship: 'Headache → Back', or: 2.58, lower: 2.161, upper: 3.092, category: 'inter-pain' },
  { relationship: 'Gender:Female → Hand', or: 2.54, lower: 1.870, upper: 3.438, category: 'demographic' },
  { relationship: 'Age:Senior → Knee', or: 2.24, lower: 1.669, upper: 3.019, category: 'demographic' },
  { relationship: 'Headache → Hip', or: 2.23, lower: 1.617, upper: 3.085, category: 'inter-pain' },
  { relationship: 'Age:Young → Headache', or: 1.92, lower: 1.609, upper: 2.284, category: 'demographic' },
  { relationship: 'Gender:Female → Neck', or: 1.93, lower: 1.627, upper: 2.293, category: 'demographic' },
  { relationship: 'Gender:Female → Headache', or: 1.88, lower: 1.580, upper: 2.246, category: 'demographic' },
  { relationship: 'Age:Middle → Knee', or: 1.39, lower: 1.154, upper: 1.675, category: 'demographic' },
  { relationship: 'Age:Middle → Headache', or: 0.73, lower: 0.610, upper: 0.863, category: 'demographic' },
  { relationship: 'Age:Young → Knee', or: 0.51, lower: 0.420, upper: 0.626, category: 'demographic' },
  { relationship: 'Age:Senior → Headache', or: 0.26, lower: 0.166, upper: 0.402, category: 'demographic' },
];

const conditionalProbabilities = [
  { from: 'Headache', to: 'Neck', probYes: 51.14, probNo: 26.74 },
  { from: 'Headache', to: 'Back', probYes: 50.07, probNo: 27.95 },
  { from: 'Headache', to: 'Stomach', probYes: 35.48, probNo: 15.61 },
  { from: 'Headache', to: 'Hip', probYes: 10.44, probNo: 4.96 },
  { from: 'Headache', to: 'Face', probYes: 7.63, probNo: 0.73 },
  { from: 'Hip', to: 'Hand', probYes: 38.75, probNo: 6.79 },
  { from: 'Hand', to: 'Neck', probYes: 66.82, probNo: 31.15 },
  { from: 'Hand', to: 'Back', probYes: 65.42, probNo: 31.84 },
  { from: 'Hand', to: 'Foot', probYes: 45.79, probNo: 9.29 },
  { from: 'Hand', to: 'All Body', probYes: 25.23, probNo: 4.21 },
  { from: 'Hand', to: 'Face', probYes: 13.55, probNo: 1.83 },
  { from: 'Neck', to: 'Back', probYes: 56.68, probNo: 23.41 },
  { from: 'Neck', to: 'Foot', probYes: 23.30, probNo: 6.92 },
  { from: 'Neck', to: 'Stomach', probYes: 34.83, probNo: 14.98 },
  { from: 'Back', to: 'Stomach', probYes: 33.49, probNo: 15.54 },
  { from: 'Back', to: 'Knee', probYes: 40.31, probNo: 16.62 },
  { from: 'Back', to: 'All Body', probYes: 11.84, probNo: 3.01 },
  { from: 'Foot', to: 'Knee', probYes: 55.15, probNo: 20.53 },
];

// Network node positions for visualization
const networkNodes = [
  { id: 'Age', x: 100, y: 50, type: 'demographic', label: 'Age' },
  { id: 'Gender', x: 500, y: 50, type: 'demographic', label: 'Gender' },
  { id: 'Headache', x: 200, y: 150, type: 'pain', label: 'Headache' },
  { id: 'Hip', x: 300, y: 200, type: 'pain', label: 'Hip' },
  { id: 'Hand', x: 300, y: 300, type: 'hub', label: 'Hand' },
  { id: 'Face', x: 150, y: 350, type: 'pain', label: 'Face' },
  { id: 'Neck', x: 450, y: 300, type: 'pain', label: 'Neck' },
  { id: 'Back', x: 300, y: 400, type: 'pain', label: 'Back' },
  { id: 'Foot', x: 500, y: 350, type: 'pain', label: 'Foot' },
  { id: 'Knee', x: 200, y: 480, type: 'pain', label: 'Knee' },
  { id: 'All Body', x: 150, y: 420, type: 'pain', label: 'All Body' },
  { id: 'Stomach', x: 450, y: 450, type: 'pain', label: 'Stomach' },
];

const networkEdges = [
  { from: 'Age', to: 'Headache', or: 1.92, significant: true },
  { from: 'Age', to: 'Knee', or: 2.24, significant: true },
  { from: 'Age', to: 'Hip', or: 1.5, significant: true },
  { from: 'Gender', to: 'Headache', or: 1.88, significant: true },
  { from: 'Gender', to: 'Hand', or: 2.54, significant: true },
  { from: 'Gender', to: 'Neck', or: 1.93, significant: true },
  { from: 'Headache', to: 'Neck', or: 2.87, significant: true },
  { from: 'Headache', to: 'Hip', or: 2.23, significant: true },
  { from: 'Headache', to: 'Stomach', or: 2.97, significant: true },
  { from: 'Headache', to: 'Face', or: 11.30, significant: true },
  { from: 'Headache', to: 'Back', or: 2.58, significant: true },
  { from: 'Hip', to: 'Hand', or: 8.69, significant: true },
  { from: 'Hand', to: 'Face', or: 8.41, significant: true },
  { from: 'Hand', to: 'Neck', or: 4.45, significant: true },
  { from: 'Hand', to: 'Back', or: 4.05, significant: true },
  { from: 'Hand', to: 'Foot', or: 8.25, significant: true },
  { from: 'Hand', to: 'All Body', or: 7.68, significant: true },
  { from: 'Neck', to: 'Back', or: 4.28, significant: true },
  { from: 'Neck', to: 'Foot', or: 4.09, significant: true },
  { from: 'Neck', to: 'Stomach', or: 3.03, significant: true },
  { from: 'Back', to: 'Knee', or: 3.39, significant: true },
  { from: 'Back', to: 'Stomach', or: 2.74, significant: true },
  { from: 'Back', to: 'All Body', or: 4.34, significant: true },
  { from: 'Foot', to: 'Knee', or: 4.76, significant: true },
  { from: 'Foot', to: 'Stomach', or: 2.5, significant: true },
];

const simulationScenarios = [
  {
    id: 'female-middle-hand',
    name: 'Female, Middle-aged with Hand Pain',
    description: 'Simulates pain propagation for a middle-aged female presenting with hand pain',
    conditions: { gender: 'Female', age: 'Middle', hand: true },
    results: {
      neck: 66.8, back: 65.4, foot: 45.8, allBody: 25.2, face: 13.5, knee: 40.3
    }
  },
  {
    id: 'male-senior-back',
    name: 'Male, Senior with Back Pain',
    description: 'Simulates pain propagation for a senior male with back pain',
    conditions: { gender: 'Male', age: 'Senior', back: true },
    results: {
      knee: 40.3, stomach: 33.5, allBody: 11.8, neck: 56.7
    }
  },
  {
    id: 'female-young-headache',
    name: 'Female, Young with Headache',
    description: 'Simulates downstream effects for a young female with headaches',
    conditions: { gender: 'Female', age: 'Young', headache: true },
    results: {
      neck: 51.1, back: 50.1, stomach: 35.5, hip: 10.4, face: 7.6
    }
  },
  {
    id: 'combined-hand-back',
    name: 'Combined Hand and Back Pain',
    description: 'Shows elevated risk of generalized pain when both hand and back pain are present',
    conditions: { hand: true, back: true },
    results: {
      allBody: 37.9, neck: 70.2, knee: 45.5, stomach: 40.2, foot: 48.3
    }
  },
];

// ============ COMPONENT DEFINITIONS ============

const TabButton = ({ active, onClick, icon: Icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
      active 
        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30' 
        : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
    }`}
  >
    <Icon size={18} />
    <span className="hidden md:inline">{label}</span>
  </button>
);

const StatCard = ({ icon: Icon, label, value, subtext, color }) => (
  <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-5 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-slate-400 text-sm mb-1">{label}</p>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
        {subtext && <p className="text-slate-500 text-xs mt-1">{subtext}</p>}
      </div>
      <div className={`p-2 rounded-lg ${color.replace('text-', 'bg-').replace('400', '900/30')}`}>
        <Icon className={color} size={20} />
      </div>
    </div>
  </div>
);

const NetworkNode = ({ node, selected, onSelect, showOR }) => {
  const getNodeStyle = () => {
    switch(node.type) {
      case 'demographic':
        return 'bg-gradient-to-br from-amber-500 to-orange-600 border-amber-400';
      case 'hub':
        return 'bg-gradient-to-br from-rose-500 to-pink-600 border-rose-400 animate-pulse';
      default:
        return 'bg-gradient-to-br from-cyan-500 to-blue-600 border-cyan-400';
    }
  };
  
  return (
    <g 
      transform={`translate(${node.x}, ${node.y})`}
      onClick={() => onSelect(node.id)}
      style={{ cursor: 'pointer' }}
    >
      <circle
        r={node.type === 'hub' ? 35 : node.type === 'demographic' ? 32 : 28}
        className={`${selected === node.id ? 'stroke-white stroke-2' : 'stroke-transparent'}`}
        fill={node.type === 'demographic' ? '#F59E0B' : node.type === 'hub' ? '#EC4899' : '#06B6D4'}
        opacity={0.9}
      />
      <text
        textAnchor="middle"
        dy="0.3em"
        className="fill-white text-xs font-semibold pointer-events-none"
      >
        {node.label}
      </text>
    </g>
  );
};

const NetworkEdge = ({ edge, nodes, showOR, highlight }) => {
  const fromNode = nodes.find(n => n.id === edge.from);
  const toNode = nodes.find(n => n.id === edge.to);
  
  if (!fromNode || !toNode) return null;
  
  const dx = toNode.x - fromNode.x;
  const dy = toNode.y - fromNode.y;
  const angle = Math.atan2(dy, dx);
  
  const fromRadius = fromNode.type === 'demographic' ? 32 : fromNode.type === 'hub' ? 35 : 28;
  const toRadius = toNode.type === 'demographic' ? 32 : toNode.type === 'hub' ? 35 : 28;
  
  const startX = fromNode.x + Math.cos(angle) * fromRadius;
  const startY = fromNode.y + Math.sin(angle) * fromRadius;
  const endX = toNode.x - Math.cos(angle) * (toRadius + 8);
  const endY = toNode.y - Math.sin(angle) * (toRadius + 8);
  
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;
  
  const strokeWidth = highlight ? 3 : edge.or > 5 ? 2.5 : edge.or > 2 ? 2 : 1.5;
  const strokeColor = highlight ? '#10B981' : edge.or > 5 ? '#EC4899' : edge.or > 2 ? '#06B6D4' : '#64748B';
  
  return (
    <g>
      <defs>
        <marker
          id={`arrow-${edge.from}-${edge.to}`}
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,6 L9,3 z" fill={strokeColor} />
        </marker>
      </defs>
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        markerEnd={`url(#arrow-${edge.from}-${edge.to})`}
        opacity={highlight ? 1 : 0.7}
      />
      {showOR && (
        <g transform={`translate(${midX}, ${midY})`}>
          <rect
            x="-18"
            y="-10"
            width="36"
            height="20"
            rx="4"
            fill="#1E293B"
            stroke={strokeColor}
            strokeWidth="1"
          />
          <text
            textAnchor="middle"
            dy="0.35em"
            className="text-[10px] font-bold"
            fill={strokeColor}
          >
            {edge.or.toFixed(2)}
          </text>
        </g>
      )}
    </g>
  );
};

const BayesianNetwork = ({ showOR = false, selectedNode = null, onSelectNode = () => {}, highlightPaths = [] }) => {
  return (
    <div className="relative w-full h-[550px] bg-slate-900/50 rounded-xl border border-slate-700/50 overflow-hidden">
      <svg width="100%" height="100%" viewBox="0 0 600 550">
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.5" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {networkEdges.map((edge, idx) => (
          <NetworkEdge
            key={idx}
            edge={edge}
            nodes={networkNodes}
            showOR={showOR}
            highlight={highlightPaths.includes(`${edge.from}-${edge.to}`)}
          />
        ))}
        
        {networkNodes.map((node) => (
          <NetworkNode
            key={node.id}
            node={node}
            selected={selectedNode}
            onSelect={onSelectNode}
            showOR={showOR}
          />
        ))}
      </svg>
      
      <div className="absolute bottom-4 left-4 flex gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-amber-500" />
          <span className="text-slate-400">Demographic</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-cyan-500" />
          <span className="text-slate-400">Pain Location</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-pink-500 animate-pulse" />
          <span className="text-slate-400">Hub Node</span>
        </div>
      </div>
    </div>
  );
};

const ORForestPlot = ({ data, filter }) => {
  const filteredData = filter === 'all' 
    ? data 
    : data.filter(d => d.category === filter);
  
  return (
    <div className="w-full h-[600px]">
      <ResponsiveContainer>
        <ComposedChart
          layout="vertical"
          data={filteredData.slice().reverse()}
          margin={{ top: 20, right: 40, left: 180, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
          <XAxis 
            type="number" 
            scale="log" 
            domain={[0.1, 25]}
            tick={{ fill: '#94A3B8', fontSize: 11 }}
            tickFormatter={(val) => val.toFixed(1)}
          />
          <YAxis 
            type="category" 
            dataKey="relationship" 
            tick={{ fill: '#94A3B8', fontSize: 11 }}
            width={170}
          />
          <ReferenceLine x={1} stroke="#EF4444" strokeDasharray="5 5" strokeWidth={2} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1E293B',
              border: '1px solid #475569',
              borderRadius: '8px',
              color: '#E2E8F0'
            }}
            labelStyle={{ color: '#94A3B8' }}
            itemStyle={{ color: '#E2E8F0' }}
            formatter={(value, name) => [value.toFixed(2), name]}
          />
          {filteredData.map((entry, index) => (
            <Scatter
              key={index}
              data={[entry]}
              fill={entry.or > 1 ? '#10B981' : '#EF4444'}
            >
              <ErrorBar
                dataKey="or"
                width={0}
                strokeWidth={2}
                stroke={entry.or > 1 ? '#10B981' : '#EF4444'}
                direction="x"
              />
            </Scatter>
          ))}
          <Scatter dataKey="or" fill="#06B6D4" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

const SimulationPanel = ({ scenario, active, onClick }) => (
  <div
    onClick={onClick}
    className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
      active 
        ? 'bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border-cyan-500/50 shadow-lg shadow-cyan-500/10' 
        : 'bg-slate-800/30 border-slate-700/50 hover:border-slate-600/50'
    }`}
  >
    <div className="flex items-center gap-3 mb-2">
      <Play size={16} className={active ? 'text-cyan-400' : 'text-slate-500'} />
      <h4 className={`font-semibold ${active ? 'text-cyan-400' : 'text-slate-300'}`}>
        {scenario.name}
      </h4>
    </div>
    <p className="text-sm text-slate-400 mb-3">{scenario.description}</p>
    
    <div className="flex flex-wrap gap-2 mb-3">
      {Object.entries(scenario.conditions).map(([key, value]) => (
        <span
          key={key}
          className="px-2 py-1 text-xs rounded-full bg-slate-700/50 text-slate-300"
        >
          {key}: {String(value)}
        </span>
      ))}
    </div>
    
    {active && (
      <div className="mt-4 pt-4 border-t border-slate-700/50">
        <h5 className="text-sm font-medium text-slate-300 mb-3">Predicted Pain Probabilities:</h5>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(scenario.results).map(([pain, prob]) => (
            <div key={pain} className="flex items-center justify-between bg-slate-800/50 rounded px-3 py-2">
              <span className="text-xs text-slate-400 capitalize">{pain}</span>
              <span className={`text-sm font-bold ${prob > 40 ? 'text-rose-400' : prob > 20 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {prob}%
              </span>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

// ============ TAB COMPONENTS ============

const OverviewTab = () => (
  <div className="space-y-6 animate-fadeIn">
    {/* Study Summary */}
    <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl p-6 border border-slate-700/50">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-cyan-500/10 rounded-xl">
          <Brain className="text-cyan-400" size={28} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Qatar Biobank Chronic Pain Study</h2>
          <p className="text-slate-400 leading-relaxed">
            This study applies <span className="text-cyan-400 font-semibold">Bayesian Network modeling</span> to examine 
            interdependencies among chronic pain locations and their relationships with age and gender. Using data from 
            2,400 adult participants, the model identifies direct and indirect associations among pain locations and 
            demographic factors, quantified by odds ratios (ORs).
          </p>
        </div>
      </div>
    </div>

    {/* Key Statistics */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard icon={Users} label="Participants" value="2,400" subtext="50% Female, 50% Male" color="text-cyan-400" />
      <StatCard icon={MapPin} label="Pain Locations" value="10" subtext="Body regions tracked" color="text-violet-400" />
      <StatCard icon={Activity} label="Back Pain" value="34.8%" subtext="Most prevalent" color="text-rose-400" />
      <StatCard icon={TrendingUp} label="Key OR" value="11.30" subtext="Headache → Face" color="text-emerald-400" />
    </div>

    {/* Demographics */}
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-slate-800/40 rounded-xl p-5 border border-slate-700/50">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Calendar size={18} className="text-amber-400" />
          Age Distribution
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={demographicDistribution}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
            >
              {demographicDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #475569', borderRadius: '8px', color: '#E2E8F0' }}
              labelStyle={{ color: '#94A3B8' }}
              itemStyle={{ color: '#E2E8F0' }}
              formatter={(value, name, props) => [`${value}% (n=${props.payload.count})`, props.payload.name]}
            />
            <Legend 
              formatter={(value, entry) => <span className="text-slate-300 text-sm">{entry.payload.name}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-slate-800/40 rounded-xl p-5 border border-slate-700/50">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Activity size={18} className="text-cyan-400" />
          Pain Prevalence by Location
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={painPrevalence} layout="vertical" margin={{ left: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
            <XAxis type="number" tick={{ fill: '#94A3B8', fontSize: 11 }} />
            <YAxis type="category" dataKey="name" tick={{ fill: '#94A3B8', fontSize: 11 }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #475569', borderRadius: '8px', color: '#E2E8F0' }}
              labelStyle={{ color: '#94A3B8' }}
              itemStyle={{ color: '#E2E8F0' }}
              formatter={(value) => [`${value}%`, 'Prevalence']}
            />
            <Bar dataKey="prevalence" radius={[0, 4, 4, 0]}>
              {painPrevalence.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Gender Differences */}
    <div className="bg-slate-800/40 rounded-xl p-5 border border-slate-700/50">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <User size={18} className="text-violet-400" />
        Pain Distribution by Gender
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={genderPainData} layout="vertical" margin={{ left: 80 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis type="number" domain={[0, 100]} tick={{ fill: '#94A3B8', fontSize: 11 }} />
          <YAxis type="category" dataKey="pain" tick={{ fill: '#94A3B8', fontSize: 11 }} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #475569', borderRadius: '8px', color: '#E2E8F0' }}
            labelStyle={{ color: '#94A3B8' }}
            itemStyle={{ color: '#E2E8F0' }}
            formatter={(value) => [`${value}%`]}
          />
          <Legend />
          <Bar dataKey="female" name="Female" fill="#EC4899" stackId="a" />
          <Bar dataKey="male" name="Male" fill="#3B82F6" stackId="a" />
        </BarChart>
      </ResponsiveContainer>
      <p className="text-sm text-slate-400 mt-3">
        <AlertCircle size={14} className="inline mr-1 text-amber-400" />
        Females consistently report higher proportions for most pain locations, notably hand pain (70.1%) and generalized body pain (71.9%).
      </p>
    </div>

    {/* Key Findings */}
    <div className="grid md:grid-cols-3 gap-4">
      {[
        { title: 'Hand Pain Hub', desc: 'Strong predictor with OR 8.69 for hip-hand connection', icon: Zap, color: 'rose' },
        { title: 'Age Transition', desc: 'Systemic → Localized pain shift with aging', icon: TrendingUp, color: 'amber' },
        { title: 'Gender Disparity', desc: 'Females show 1.88x higher headache odds', icon: Heart, color: 'violet' },
      ].map((finding, idx) => (
        <div key={idx} className={`bg-gradient-to-br from-${finding.color}-900/20 to-slate-900/40 rounded-xl p-5 border border-${finding.color}-800/30`}>
          <finding.icon className={`text-${finding.color}-400 mb-3`} size={24} />
          <h4 className="font-semibold text-white mb-2">{finding.title}</h4>
          <p className="text-sm text-slate-400">{finding.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

const NetworkTab = () => {
  const [showOR, setShowOR] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  
  const highlightPaths = useMemo(() => {
    if (!selectedNode) return [];
    return networkEdges
      .filter(e => e.from === selectedNode || e.to === selectedNode)
      .map(e => `${e.from}-${e.to}`);
  }, [selectedNode]);
  
  const nodeInfo = useMemo(() => {
    if (!selectedNode) return null;
    const node = networkNodes.find(n => n.id === selectedNode);
    const incomingEdges = networkEdges.filter(e => e.to === selectedNode);
    const outgoingEdges = networkEdges.filter(e => e.from === selectedNode);
    return { node, incomingEdges, outgoingEdges };
  }, [selectedNode]);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Bayesian Network Explorer</h2>
          <p className="text-slate-400 text-sm">Interactive DAG visualization of pain interdependencies</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowOR(!showOR)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              showOR 
                ? 'bg-cyan-500 text-white' 
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {showOR ? 'Hide ORs' : 'Show ORs'}
          </button>
          <button
            onClick={() => setSelectedNode(null)}
            className="px-4 py-2 rounded-lg font-medium text-sm bg-slate-700 text-slate-300 hover:bg-slate-600 transition-all"
          >
            Clear Selection
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BayesianNetwork
            showOR={showOR}
            selectedNode={selectedNode}
            onSelectNode={setSelectedNode}
            highlightPaths={highlightPaths}
          />
        </div>
        
        <div className="space-y-4">
          <div className="bg-slate-800/40 rounded-xl p-5 border border-slate-700/50">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Info size={16} className="text-cyan-400" />
              Network Structure
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-400">
                <span>Total Nodes</span>
                <span className="text-white font-medium">{networkNodes.length}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Total Edges</span>
                <span className="text-white font-medium">{networkEdges.length}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Structure Learning</span>
                <span className="text-cyan-400 font-medium">Hill-Climbing + BIC</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Parameter Estimation</span>
                <span className="text-cyan-400 font-medium">MLE → CPTs</span>
              </div>
            </div>
          </div>
          
          {nodeInfo && (
            <div className="bg-gradient-to-br from-cyan-900/30 to-slate-900/50 rounded-xl p-5 border border-cyan-700/30">
              <h3 className="font-semibold text-cyan-400 mb-3">{nodeInfo.node.label}</h3>
              <p className="text-xs text-slate-400 mb-3 capitalize">Type: {nodeInfo.node.type}</p>
              
              {nodeInfo.incomingEdges.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs text-slate-500 mb-2">Parents (influences {nodeInfo.node.label}):</p>
                  {nodeInfo.incomingEdges.map((e, i) => (
                    <div key={i} className="flex items-center justify-between bg-slate-800/50 rounded px-2 py-1 mb-1 text-xs">
                      <span className="text-slate-300">{e.from}</span>
                      <span className="text-emerald-400 font-bold">OR: {e.or}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {nodeInfo.outgoingEdges.length > 0 && (
                <div>
                  <p className="text-xs text-slate-500 mb-2">Children (influenced by {nodeInfo.node.label}):</p>
                  {nodeInfo.outgoingEdges.map((e, i) => (
                    <div key={i} className="flex items-center justify-between bg-slate-800/50 rounded px-2 py-1 mb-1 text-xs">
                      <span className="text-slate-300">{e.to}</span>
                      <span className="text-emerald-400 font-bold">OR: {e.or}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          <div className="bg-slate-800/40 rounded-xl p-5 border border-slate-700/50">
            <h3 className="font-semibold text-white mb-3">Key Constraints</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <ChevronRight size={14} className="text-cyan-400 mt-1 flex-shrink-0" />
                <span>Age and Gender only act as parent nodes (no arrows point into them)</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight size={14} className="text-cyan-400 mt-1 flex-shrink-0" />
                <span>No arrows exist between Age and Gender</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight size={14} className="text-cyan-400 mt-1 flex-shrink-0" />
                <span>Hand and Facial pain identified as hub nodes</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Methodology Flow */}
      <div className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/50">
        <h3 className="font-semibold text-white mb-6 text-center">Bayesian Network Analysis Pipeline</h3>
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
          {[
            { label: 'Inputs', sublabel: 'Age, Gender, Pain Data', color: 'amber' },
            { label: 'Structure Learning', sublabel: 'Hill-Climbing + BIC', color: 'cyan' },
            { label: 'Parameter Learning', sublabel: 'MLE → CPTs', color: 'violet' },
            { label: 'OR Computation', sublabel: 'Quantify Relationships', color: 'rose' },
            { label: 'Hub Identification', sublabel: 'Key Intervention Points', color: 'emerald' },
          ].map((step, idx) => (
            <React.Fragment key={idx}>
              <div className={`bg-${step.color}-900/30 border border-${step.color}-700/50 rounded-xl p-4 text-center min-w-[140px]`}>
                <p className={`font-semibold text-${step.color}-400`}>{step.label}</p>
                <p className="text-xs text-slate-400 mt-1">{step.sublabel}</p>
              </div>
              {idx < 4 && <ArrowRight className="text-slate-600 hidden md:block" size={20} />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

const ORAnalysisTab = () => {
  const [filter, setFilter] = useState('all');
  
  const sortedData = useMemo(() => {
    return [...oddsRatioData].sort((a, b) => b.or - a.or);
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Odds Ratio Analysis</h2>
          <p className="text-slate-400 text-sm">Log-scale forest plot with 95% confidence intervals</p>
        </div>
        <div className="flex gap-2">
          {['all', 'inter-pain', 'demographic'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium text-sm capitalize transition-all ${
                filter === f 
                  ? 'bg-cyan-500 text-white' 
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {f === 'all' ? 'All' : f === 'inter-pain' ? 'Pain-Pain' : 'Demographics'}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-800/40 rounded-xl p-5 border border-slate-700/50">
        <div className="flex items-center gap-4 mb-4 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span>OR &gt; 1 (Positive association)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <span>OR &lt; 1 (Inverse association)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-px h-4 bg-rose-500" style={{ borderLeft: '2px dashed #EF4444' }} />
            <span>Reference line (OR = 1)</span>
          </div>
        </div>
        <ORForestPlot data={sortedData} filter={filter} />
      </div>

      {/* Top Associations Table */}
      <div className="bg-slate-800/40 rounded-xl p-5 border border-slate-700/50">
        <h3 className="font-semibold text-white mb-4">Strongest Associations (OR &gt; 4)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Relationship</th>
                <th className="text-center py-3 px-4 text-slate-400 font-medium">Odds Ratio</th>
                <th className="text-center py-3 px-4 text-slate-400 font-medium">95% CI Lower</th>
                <th className="text-center py-3 px-4 text-slate-400 font-medium">95% CI Upper</th>
                <th className="text-center py-3 px-4 text-slate-400 font-medium">Interpretation</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.filter(d => d.or > 4).map((row, idx) => (
                <tr key={idx} className="border-b border-slate-700/50 hover:bg-slate-700/20">
                  <td className="py-3 px-4 text-white font-medium">{row.relationship}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded font-bold">
                      {row.or.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center text-slate-400">{row.lower.toFixed(2)}</td>
                  <td className="py-3 px-4 text-center text-slate-400">{row.upper.toFixed(2)}</td>
                  <td className="py-3 px-4 text-center text-cyan-400">{row.or.toFixed(1)}x more likely</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Conditional Probabilities */}
      <div className="bg-slate-800/40 rounded-xl p-5 border border-slate-700/50">
        <h3 className="font-semibold text-white mb-4">Conditional Probability Differences</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={conditionalProbabilities} margin={{ left: 80, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis 
              dataKey="from" 
              tick={{ fill: '#94A3B8', fontSize: 11 }}
              tickFormatter={(v, i) => `${conditionalProbabilities[i]?.from}→${conditionalProbabilities[i]?.to}`}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} domain={[0, 70]} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #475569', borderRadius: '8px', color: '#E2E8F0' }}
              labelStyle={{ color: '#94A3B8' }}
              itemStyle={{ color: '#E2E8F0' }}
              formatter={(value, name) => [`${value}%`, name === 'probYes' ? 'P(pain | condition present)' : 'P(pain | condition absent)']}
            />
            <Legend />
            <Bar dataKey="probYes" name="With Condition" fill="#10B981" />
            <Bar dataKey="probNo" name="Without Condition" fill="#64748B" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const SimulationTab = () => {
  const [activeScenario, setActiveScenario] = useState('female-middle-hand');
  const [customConditions, setCustomConditions] = useState({
    gender: 'Female',
    age: 'Middle',
    headache: false,
    back: false,
    hand: false,
    neck: false,
    foot: false,
  });

  const currentScenario = simulationScenarios.find(s => s.id === activeScenario);

  const calculateCustomProbabilities = useCallback(() => {
    let results = {};
    
    if (customConditions.hand) {
      results.neck = 66.8;
      results.back = 65.4;
      results.foot = 45.8;
      results.face = 13.5;
      results.allBody = 25.2;
    }
    
    if (customConditions.back) {
      results.knee = Math.max(results.knee || 0, 40.3);
      results.stomach = Math.max(results.stomach || 0, 33.5);
      results.allBody = Math.max(results.allBody || 0, 11.8);
    }
    
    if (customConditions.headache) {
      results.neck = Math.max(results.neck || 0, 51.1);
      results.back = Math.max(results.back || 0, 50.1);
      results.stomach = Math.max(results.stomach || 0, 35.5);
      results.hip = Math.max(results.hip || 0, 10.4);
      results.face = Math.max(results.face || 0, 7.6);
    }
    
    if (customConditions.neck) {
      results.back = Math.max(results.back || 0, 56.7);
      results.foot = Math.max(results.foot || 0, 23.3);
      results.stomach = Math.max(results.stomach || 0, 34.8);
    }
    
    if (customConditions.foot) {
      results.knee = Math.max(results.knee || 0, 55.2);
    }

    // Apply demographic modifiers
    if (customConditions.gender === 'Female') {
      Object.keys(results).forEach(k => {
        results[k] = Math.min(100, results[k] * 1.1);
      });
    }
    
    if (customConditions.age === 'Senior') {
      results.knee = Math.min(100, (results.knee || 20) * 1.3);
    }

    return results;
  }, [customConditions]);

  const customResults = calculateCustomProbabilities();

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-xl font-bold text-white">Pain Propagation Simulations</h2>
        <p className="text-slate-400 text-sm">Explore how pain spreads through the network based on conditions</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pre-built Scenarios */}
        <div className="space-y-4">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <Play size={18} className="text-cyan-400" />
            Pre-built Scenarios
          </h3>
          {simulationScenarios.map((scenario) => (
            <SimulationPanel
              key={scenario.id}
              scenario={scenario}
              active={activeScenario === scenario.id}
              onClick={() => setActiveScenario(scenario.id)}
            />
          ))}
        </div>

        {/* Custom Simulation */}
        <div className="space-y-4">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <Filter size={18} className="text-violet-400" />
            Custom Simulation
          </h3>
          
          <div className="bg-slate-800/40 rounded-xl p-5 border border-slate-700/50 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Gender</label>
                <select
                  value={customConditions.gender}
                  onChange={(e) => setCustomConditions(prev => ({ ...prev, gender: e.target.value }))}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cyan-500"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Age Group</label>
                <select
                  value={customConditions.age}
                  onChange={(e) => setCustomConditions(prev => ({ ...prev, age: e.target.value }))}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cyan-500"
                >
                  <option value="Young">Young (18-35)</option>
                  <option value="Middle">Middle (36-60)</option>
                  <option value="Senior">Senior (61+)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-400 mb-3 block">Select Present Pain Conditions:</label>
              <div className="flex flex-wrap gap-2">
                {['headache', 'back', 'hand', 'neck', 'foot'].map((pain) => (
                  <button
                    key={pain}
                    onClick={() => setCustomConditions(prev => ({ ...prev, [pain]: !prev[pain] }))}
                    className={`px-3 py-2 rounded-lg text-sm capitalize transition-all ${
                      customConditions[pain]
                        ? 'bg-cyan-500 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {pain}
                  </button>
                ))}
              </div>
            </div>

            {Object.keys(customResults).length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-700/50">
                <h4 className="text-sm font-medium text-white mb-3">Predicted Downstream Probabilities:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(customResults).sort((a, b) => b[1] - a[1]).map(([pain, prob]) => (
                    <div key={pain} className="flex items-center justify-between bg-slate-700/50 rounded-lg px-3 py-2">
                      <span className="text-sm text-slate-300 capitalize">{pain.replace(/([A-Z])/g, ' $1')}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-600 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${prob > 40 ? 'bg-rose-500' : prob > 20 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                            style={{ width: `${prob}%` }}
                          />
                        </div>
                        <span className={`text-sm font-bold ${prob > 40 ? 'text-rose-400' : prob > 20 ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {prob.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Network Visualization with Highlights */}
          <div className="bg-slate-800/40 rounded-xl p-5 border border-slate-700/50">
            <h4 className="text-sm font-medium text-white mb-3">Network Impact Preview</h4>
            <div className="relative h-[300px]">
              <BayesianNetwork
                showOR={false}
                selectedNode={Object.entries(customConditions).find(([k, v]) => v === true && !['gender', 'age'].includes(k))?.[0]?.charAt(0).toUpperCase() + Object.entries(customConditions).find(([k, v]) => v === true && !['gender', 'age'].includes(k))?.[0]?.slice(1) || null}
                highlightPaths={[]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Key Insight */}
      <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 rounded-xl p-5 border border-amber-700/30">
        <div className="flex items-start gap-4">
          <AlertCircle className="text-amber-400 flex-shrink-0" size={24} />
          <div>
            <h4 className="font-semibold text-amber-400 mb-2">Key Clinical Insight</h4>
            <p className="text-slate-300 text-sm">
              Combined hand and back pain elevates generalized pain probability to <span className="text-amber-400 font-bold">37.9%</span>, 
              compared to just 6.6% with back pain alone (OR 7.68). This demonstrates how addressing "hub" pain sites 
              early could prevent systemic pain propagation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClinicalTab = () => (
  <div className="space-y-6 animate-fadeIn">
    <div>
      <h2 className="text-xl font-bold text-white">Clinical Implications & Strategies</h2>
      <p className="text-slate-400 text-sm">Evidence-based intervention recommendations from network analysis</p>
    </div>

    {/* Hub Pain Sites */}
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-gradient-to-br from-rose-900/30 to-pink-900/30 rounded-xl p-6 border border-rose-700/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-rose-500/20 rounded-lg">
            <Target className="text-rose-400" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-white">Hand Pain as Hub Node</h3>
            <p className="text-rose-400 text-sm">Critical intervention target</p>
          </div>
        </div>
        <ul className="space-y-3 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <ChevronRight className="text-rose-400 flex-shrink-0 mt-0.5" size={16} />
            <span>OR 8.69 with hip pain suggests shared musculoskeletal pathways</span>
          </li>
          <li className="flex items-start gap-2">
            <ChevronRight className="text-rose-400 flex-shrink-0 mt-0.5" size={16} />
            <span>OR 8.25 with foot pain indicates potential systemic sensitization</span>
          </li>
          <li className="flex items-start gap-2">
            <ChevronRight className="text-rose-400 flex-shrink-0 mt-0.5" size={16} />
            <span>OR 7.68 with generalized pain - early hand rehabilitation may prevent widespread pain</span>
          </li>
        </ul>
        <div className="mt-4 p-3 bg-rose-900/30 rounded-lg">
          <p className="text-xs text-rose-300">
            <strong>Recommendation:</strong> Prioritize early physiotherapy for hand pain to disrupt downstream pain propagation
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-violet-900/30 to-purple-900/30 rounded-xl p-6 border border-violet-700/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-violet-500/20 rounded-lg">
            <Brain className="text-violet-400" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-white">Facial Pain Dependencies</h3>
            <p className="text-violet-400 text-sm">Neurological pathway indicator</p>
          </div>
        </div>
        <ul className="space-y-3 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <ChevronRight className="text-violet-400 flex-shrink-0 mt-0.5" size={16} />
            <span>OR 11.30 with headache reflects shared trigeminal pathways</span>
          </li>
          <li className="flex items-start gap-2">
            <ChevronRight className="text-violet-400 flex-shrink-0 mt-0.5" size={16} />
            <span>OR 8.41 with hand pain suggests central sensitization involvement</span>
          </li>
          <li className="flex items-start gap-2">
            <ChevronRight className="text-violet-400 flex-shrink-0 mt-0.5" size={16} />
            <span>Prevalence increases from 0.7% to 7.6% with headache presence</span>
          </li>
        </ul>
        <div className="mt-4 p-3 bg-violet-900/30 rounded-lg">
          <p className="text-xs text-violet-300">
            <strong>Recommendation:</strong> Multimodal migraine management may reduce facial pain risk in susceptible patients
          </p>
        </div>
      </div>
    </div>

    {/* Gender-Specific Strategies */}
    <div className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/50">
      <h3 className="font-bold text-white mb-4 flex items-center gap-2">
        <User size={20} className="text-pink-400" />
        Gender-Sensitive Intervention Strategies
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-pink-900/20 rounded-lg p-4 border border-pink-700/30">
          <h4 className="font-semibold text-pink-400 mb-3">Female Patients</h4>
          <div className="space-y-2 text-sm text-slate-300">
            <p>• 1.88x higher headache odds - consider hormonal evaluation</p>
            <p>• 2.54x higher hand pain odds - assess for autoimmune markers</p>
            <p>• 1.93x higher neck pain odds - evaluate posture and stress factors</p>
            <p>• 70.1% of hand pain cases are female - prioritize ergonomic intervention</p>
          </div>
          <div className="mt-3 p-2 bg-pink-900/30 rounded">
            <p className="text-xs text-pink-300">
              Screen for central sensitization and chronic overlapping pain conditions (COPCs)
            </p>
          </div>
        </div>
        <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-700/30">
          <h4 className="font-semibold text-blue-400 mb-3">Male Patients</h4>
          <div className="space-y-2 text-sm text-slate-300">
            <p>• 64.5% report no chronic pain - but may underreport due to cultural factors</p>
            <p>• Lower systemic pain prevalence - focus on localized musculoskeletal issues</p>
            <p>• When pain present, investigate occupational and injury-related factors</p>
            <p>• Consider stoicism in pain reporting - use objective assessments</p>
          </div>
          <div className="mt-3 p-2 bg-blue-900/30 rounded">
            <p className="text-xs text-blue-300">
              Implement proactive screening in high-risk occupational settings
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Age-Grouped Strategies */}
    <div className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/50">
      <h3 className="font-bold text-white mb-4 flex items-center gap-2">
        <Calendar size={20} className="text-amber-400" />
        Age-Specific Clinical Pathways
      </h3>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-b from-cyan-900/30 to-slate-900/50 rounded-lg p-4 border border-cyan-700/30">
          <h4 className="font-semibold text-cyan-400 mb-2">Young Adults (18-35)</h4>
          <p className="text-slate-400 text-xs mb-3">OR 1.92 for headaches</p>
          <ul className="space-y-1 text-sm text-slate-300">
            <li>• Systemic pain dominant (headache 51.8%)</li>
            <li>• Address lifestyle stressors</li>
            <li>• Screen time and sleep hygiene</li>
            <li>• IBS and stress-related GI issues</li>
          </ul>
        </div>
        <div className="bg-gradient-to-b from-violet-900/30 to-slate-900/50 rounded-lg p-4 border border-violet-700/30">
          <h4 className="font-semibold text-violet-400 mb-2">Middle-Aged (36-60)</h4>
          <p className="text-slate-400 text-xs mb-3">OR 1.39 for knee pain</p>
          <ul className="space-y-1 text-sm text-slate-300">
            <li>• Transition to localized pain</li>
            <li>• Back pain peaks (50.2%)</li>
            <li>• Occupational strain intervention</li>
            <li>• Early osteoarthritis screening</li>
          </ul>
        </div>
        <div className="bg-gradient-to-b from-rose-900/30 to-slate-900/50 rounded-lg p-4 border border-rose-700/30">
          <h4 className="font-semibold text-rose-400 mb-2">Seniors (61+)</h4>
          <p className="text-slate-400 text-xs mb-3">OR 2.24 for knee pain</p>
          <ul className="space-y-1 text-sm text-slate-300">
            <li>• Musculoskeletal dominant</li>
            <li>• Knee pain reaches 40.7%</li>
            <li>• Joint preservation focus</li>
            <li>• Fall prevention programs</li>
          </ul>
        </div>
      </div>
    </div>

    {/* Decision Support Framework */}
    <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-xl p-6 border border-emerald-700/30">
      <h3 className="font-bold text-white mb-4 flex items-center gap-2">
        <Zap size={20} className="text-emerald-400" />
        Clinical Decision Support Framework
      </h3>
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { step: 1, title: 'Identify Hubs', desc: 'Assess for hand, back, or facial pain as potential network triggers', color: 'cyan' },
          { step: 2, title: 'Evaluate Demographics', desc: 'Apply gender and age-specific risk modifiers to probability estimates', color: 'violet' },
          { step: 3, title: 'Predict Propagation', desc: 'Use conditional probabilities to anticipate downstream pain sites', color: 'amber' },
          { step: 4, title: 'Target Intervention', desc: 'Prioritize treatment at hub sites to disrupt pain network expansion', color: 'emerald' },
        ].map((item) => (
          <div key={item.step} className={`bg-${item.color}-900/20 rounded-lg p-4 border border-${item.color}-700/30`}>
            <div className={`w-8 h-8 rounded-full bg-${item.color}-500/20 flex items-center justify-center text-${item.color}-400 font-bold mb-3`}>
              {item.step}
            </div>
            <h4 className={`font-semibold text-${item.color}-400 mb-2`}>{item.title}</h4>
            <p className="text-xs text-slate-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Study Limitations */}
    <div className="bg-slate-800/40 rounded-xl p-5 border border-slate-700/50">
      <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
        <AlertCircle size={18} className="text-amber-400" />
        Limitations & Future Directions
      </h3>
      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div>
          <h4 className="text-amber-400 font-medium mb-2">Current Limitations</h4>
          <ul className="space-y-1 text-slate-400">
            <li>• Seniors defined as ≥61 years (differs from standard ≥65)</li>
            <li>• Self-reported pain without clinical validation</li>
            <li>• Cross-sectional design cannot establish causality</li>
            <li>• Qatari cohort - requires replication in diverse populations</li>
          </ul>
        </div>
        <div>
          <h4 className="text-cyan-400 font-medium mb-2">Future Research</h4>
          <ul className="space-y-1 text-slate-400">
            <li>• Integrate biomarker and imaging data</li>
            <li>• Longitudinal validation of network predictions</li>
            <li>• Quantitative sensory testing refinement</li>
            <li>• Treatment outcome prediction models</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// ============ MAIN DASHBOARD COMPONENT ============

export default function ChronicPainDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', icon: Activity, label: 'Overview' },
    { id: 'network', icon: Brain, label: 'Network Explorer' },
    { id: 'odds', icon: TrendingUp, label: 'OR Analysis' },
    { id: 'simulation', icon: Play, label: 'Simulations' },
    { id: 'clinical', icon: Heart, label: 'Clinical Insights' },
  ];

  const renderTab = () => {
    switch(activeTab) {
      case 'overview': return <OverviewTab />;
      case 'network': return <NetworkTab />;
      case 'odds': return <ORAnalysisTab />;
      case 'simulation': return <SimulationTab />;
      case 'clinical': return <ClinicalTab />;
      default: return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-slate-800/50 backdrop-blur-sm bg-slate-900/50 sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl">
                  <Brain className="text-white" size={28} />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Chronic Pain Bayesian Network
                  </h1>
                  <p className="text-slate-400 text-sm">Qatar Biobank Study · Al-Khinji & Malouche (2025)</p>
                </div>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                {tabs.map(tab => (
                  <TabButton
                    key={tab.id}
                    active={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    icon={tab.icon}
                    label={tab.label}
                  />
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-6">
          {renderTab()}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800/50 mt-12">
          <div className="max-w-7xl mx-auto px-4 py-6 text-center text-slate-500 text-sm">
            <p>Based on: Al-Khinji AAMA and Malouche D (2025). Front. Pain Res. 6:1573465. doi: 10.3389/fpain.2025.1573465</p>
            <p className="mt-1">Interactive Dashboard · n=2,400 · Qatar Biobank Data</p>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
