"use client";

import { useState } from "react";
import { 
  Eye, 
  Download, 
  GitFork, 
  Activity, 
  CreditCard, 
  Database, 
  Shield, 
  Zap, 
  Server, 
  User, 
  Network,
  ArrowRight,
  Check,
  Clock
} from "lucide-react";

export default function ArchitecturePage() {
  const [activeTab, setActiveTab] = useState("containers");

  return (
    <div id="content" className="flex flex-col flex-1 md:overflow-hidden md:h-full gap-3 p-4 lg:p-6 max-w-[1200px] mx-auto w-full">
      
      {/* BANNER */}
      <div id="banner" className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-card border border-accent-green-dim bg-surface">
        <div>
          <div className="text-[10px] text-status-success tracking-[0.04em] uppercase mb-1">Architecture Briefing · Wed, Jun 17</div>
          <h1 className="text-[28px] sm:text-[36px] font-medium text-text-primary leading-[1.1] mb-1">Architecture plan generated.<br/>2 decisions require your review.</h1>
          <p className="text-[14px] text-text-secondary leading-relaxed max-w-[340px]">DevPilot has drafted a microservices architecture prioritising high relational integrity and real-time observability.</p>
          <div className="flex gap-2 mt-2 flex-wrap items-center">
            <button className="inline-flex items-center gap-1.5 bg-[#1d1d1f] text-white text-[11.5px] font-medium py-2 px-3 rounded-lg transition-transform hover:-translate-y-0.5 shadow-md">
              <Eye className="w-3.5 h-3.5" />
              Review Architecture Plan
            </button>
            <button className="inline-flex items-center gap-1.5 bg-surface text-text-primary text-[11.5px] font-medium py-2 px-3 rounded-lg border border-border transition-colors hover:border-status-success hover:-translate-y-0.5 shadow-sm">
              <Download className="w-3.5 h-3.5" />
              Export to Draw.io
            </button>
          </div>
        </div>
        <div className="flex gap-2 shrink-0 flex-wrap sm:flex-nowrap">
          <div className="bg-surface border border-accent-green-dim rounded-card p-2.5 text-center min-w-[60px] flex-1 sm:flex-initial transition-all hover:-translate-y-1 hover:shadow-lg hover:border-status-success">
            <div className="text-xl font-semibold text-text-primary">7</div><div className="text-[10px] text-text-secondary mt-0.5">Total Components</div>
          </div>
          <div className="flex flex-col gap-1.5 flex-1 sm:flex-initial">
            <div className="bg-surface border border-status-success/30 rounded-card px-3 py-1.5 text-center transition-all hover:-translate-y-1 hover:shadow-lg flex flex-col items-center justify-center">
              <div className="text-[15px] font-semibold text-status-success">5</div>
              <div className="text-[10px] text-text-secondary mt-0.5 flex items-center gap-1">
                <Check className="w-3 h-3 text-status-success" />
                AI Verified
              </div>
            </div>
            <div className="bg-surface border border-status-warning/30 rounded-card px-3 py-1.5 text-center transition-all hover:-translate-y-1 hover:shadow-lg flex flex-col items-center justify-center">
              <div className="text-[15px] font-semibold text-status-warning">2</div>
              <div className="text-[10px] text-text-secondary mt-0.5 flex items-center gap-1">
                <Clock className="w-3 h-3 text-status-warning" />
                Awaiting Review
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 2: LEFT PANEL + CENTER TABS */}
      <div id="row2" className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-3 flex-1 md:overflow-hidden min-h-0">
        
        {/* LEFT PANEL */}
        <div id="left-panel" className="order-3 md:order-1 w-full flex flex-col gap-3 md:overflow-hidden">
          {/* Action Required */}
          <div className="flex flex-col bg-surface border border-border rounded-card overflow-hidden flex-1 min-h-[180px] md:min-h-0">
            <div className="flex items-center justify-between p-3 pb-1 shrink-0">
              <span className="text-[10px] text-text-secondary tracking-[0.04em] uppercase">Action Required</span>
              <a href="#" className="text-[11px] text-[#007aff] hover:underline transition-colors">All →</a>
            </div>
            <div className="overflow-y-auto flex-1 custom-scrollbar">
              <div className="flex items-center gap-2.5 p-2 px-3 border-b border-border cursor-pointer hover:bg-canvas hover:pl-4 transition-all">
                <div className="w-7 h-7 rounded-control bg-canvas hover:bg-accent-green-light flex items-center justify-center shrink-0 text-text-secondary transition-colors">
                  <GitFork className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-text-primary leading-tight">Message Queue</div>
                  <div className="text-[11px] text-text-secondary mt-0.5">RabbitMQ vs Kafka</div>
                </div>
                <span className="bg-status-warning/10 text-status-warning-on-tint text-[10px] px-2 py-0.5 rounded-md whitespace-nowrap ml-1">Review</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 px-3 border-b border-border cursor-pointer hover:bg-canvas hover:pl-4 transition-all">
                <div className="w-7 h-7 rounded-control bg-canvas hover:bg-accent-green-light flex items-center justify-center shrink-0 text-text-secondary transition-colors">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-text-primary leading-tight">Caching Layer</div>
                  <div className="text-[11px] text-text-secondary mt-0.5">Redis config pending</div>
                </div>
                <span className="bg-status-danger/10 text-status-danger-on-tint text-[10px] px-2 py-0.5 rounded-md whitespace-nowrap ml-1">Blocked</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 px-3 cursor-pointer hover:bg-canvas hover:pl-4 transition-all">
                <div className="w-7 h-7 rounded-control bg-canvas hover:bg-accent-green-light flex items-center justify-center shrink-0 text-text-secondary transition-colors">
                  <CreditCard className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-text-primary leading-tight">Payment Layer</div>
                  <div className="text-[11px] text-text-secondary mt-0.5">Unify 3 Stripe points</div>
                </div>
                <span className="bg-[#007aff]/10 text-[#007aff] text-[10px] px-2 py-0.5 rounded-md whitespace-nowrap ml-1">Review</span>
              </div>
            </div>
          </div>

          {/* Decision Memory */}
          <div className="flex flex-col bg-surface border border-border rounded-card overflow-hidden flex-1 min-h-[180px] md:min-h-0">
            <div className="flex items-center justify-between p-3 pb-1 shrink-0">
              <span className="text-[10px] text-text-secondary tracking-[0.04em] uppercase">Decision Memory</span>
              <a href="#" className="text-[11px] text-[#007aff] hover:underline transition-colors">All →</a>
            </div>
            <div className="overflow-y-auto flex-1 custom-scrollbar">
              <div className="flex items-start gap-2.5 p-2 px-3 border-b border-border cursor-pointer hover:bg-canvas hover:pl-4 transition-all group">
                <div className="w-1.5 h-1.5 rounded-full bg-status-success shrink-0 mt-1.5 transition-transform group-hover:scale-150"></div>
                <div>
                  <div className="text-[13px] font-medium text-text-primary leading-tight">PostgreSQL over MongoDB</div>
                  <div className="text-[11px] text-text-secondary mt-0.5">Jun 16 · Relational integrity.</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-2 px-3 border-b border-border cursor-pointer hover:bg-canvas hover:pl-4 transition-all group">
                <div className="w-1.5 h-1.5 rounded-full bg-status-success shrink-0 mt-1.5 transition-transform group-hover:scale-150"></div>
                <div>
                  <div className="text-[13px] font-medium text-text-primary leading-tight">Hub-and-Spoke Topology</div>
                  <div className="text-[11px] text-text-secondary mt-0.5">Jun 14 · Sprint 45 scalability.</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-2 px-3 cursor-pointer hover:bg-canvas hover:pl-4 transition-all group">
                <div className="w-1.5 h-1.5 rounded-full bg-status-success shrink-0 mt-1.5 transition-transform group-hover:scale-150"></div>
                <div>
                  <div className="text-[13px] font-medium text-text-primary leading-tight">HTTPS / JSON REST</div>
                  <div className="text-[11px] text-text-secondary mt-0.5">Jun 12 · Third-party simplicity.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER TABS & VISUALIZATION */}
        <div className="order-1 md:order-2 lg:order-2 flex-1 min-w-0 flex flex-col md:overflow-hidden h-[450px] md:h-auto">
          <div className="flex flex-col h-full bg-surface border border-border rounded-card hover:shadow-md transition-shadow">
            <div className="flex border-b border-border px-3 overflow-x-auto whitespace-nowrap scrollbar-hide">
              {['containers', 'system', 'components', 'dataflow'].map((tab, idx) => (
                <button
                  key={tab}
                  className={`text-[12.5px] px-3 py-2 border-b-2 transition-colors -mb-[1px] shrink-0 ${activeTab === tab ? 'text-text-primary font-medium border-status-success' : 'text-text-secondary font-normal border-transparent hover:text-text-primary'}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {["Containers", "System Context", "Components", "Data Flow"][idx]}
                </button>
              ))}
            </div>

            {/* TAB CONTENTS */}
            <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
              
              {/* TAB 1: CONTAINERS */}
              {activeTab === 'containers' && (
                <div className="animate-[fadeIn_0.22s_ease]">
                  <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-2 scrollbar-hide mb-4">
                    <div className="border border-border rounded-card p-2.5 min-w-[95px] text-center bg-surface cursor-pointer hover:-translate-y-1 hover:scale-[1.01] hover:border-status-success hover:shadow-[0_8px_22px_rgba(52,199,89,.15)] transition-all animate-[nodePop_0.4s_both_0.06s] group shrink-0">
                      <div className="w-8 h-8 rounded-control bg-canvas group-hover:bg-accent-green-light flex items-center justify-center mx-auto mb-2 text-status-success group-hover:scale-110 group-hover:-rotate-3 transition-all">
                        <Network className="w-[18px] h-[18px]" />
                      </div>
                      <div className="text-[9px] text-text-secondary tracking-[0.04em] uppercase mb-0.5">Entry Point</div>
                      <div className="text-[12px] font-medium text-text-primary mb-1.5">API Gateway</div>
                      <span className="bg-status-success/10 text-status-success text-[10px] px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" />
                        AI Verified
                      </span>
                    </div>

                    <div className="px-1.5 text-text-muted shrink-0">
                      <ArrowRight className="w-4 h-4" />
                    </div>

                    <div className="border border-border rounded-card p-2.5 min-w-[95px] text-center bg-surface cursor-pointer hover:-translate-y-1 hover:scale-[1.01] hover:border-status-success hover:shadow-[0_8px_22px_rgba(52,199,89,.15)] transition-all animate-[nodePop_0.4s_both_0.14s] group shrink-0">
                      <div className="w-8 h-8 rounded-control bg-canvas group-hover:bg-accent-green-light flex items-center justify-center mx-auto mb-2 text-status-success group-hover:scale-110 group-hover:-rotate-3 transition-all">
                        <Shield className="w-[18px] h-[18px]" />
                      </div>
                      <div className="text-[9px] text-text-secondary tracking-[0.04em] uppercase mb-0.5">Microservice</div>
                      <div className="text-[12px] font-medium text-text-primary mb-1.5">Auth Service</div>
                      <span className="bg-status-success/10 text-status-success text-[10px] px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" />
                        AI Verified
                      </span>
                    </div>

                    <div className="px-1.5 text-text-muted shrink-0">
                      <ArrowRight className="w-4 h-4" />
                    </div>

                    <div className="border border-border rounded-card p-2.5 min-w-[95px] text-center bg-surface cursor-pointer hover:-translate-y-1 hover:scale-[1.01] hover:border-status-success hover:shadow-[0_8px_22px_rgba(52,199,89,.15)] transition-all animate-[nodePop_0.4s_both_0.22s] group shrink-0">
                      <div className="w-8 h-8 rounded-control bg-canvas group-hover:bg-accent-green-light flex items-center justify-center mx-auto mb-2 text-status-success group-hover:scale-110 group-hover:-rotate-3 transition-all">
                        <GitFork className="w-[18px] h-[18px]" />
                      </div>
                      <div className="text-[9px] text-text-secondary tracking-[0.04em] uppercase mb-0.5">Event Bus</div>
                      <div className="text-[12px] font-medium text-text-primary mb-1.5">Message Queue</div>
                      <span className="bg-status-warning/10 text-status-warning-on-tint text-[10px] px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        Needs Review
                      </span>
                    </div>

                    <div className="px-1.5 text-text-muted shrink-0">
                      <ArrowRight className="w-4 h-4" />
                    </div>

                    <div className="border border-border rounded-card p-2.5 min-w-[95px] text-center bg-surface cursor-pointer hover:-translate-y-1 hover:scale-[1.01] hover:border-status-success hover:shadow-[0_8px_22px_rgba(52,199,89,.15)] transition-all animate-[nodePop_0.4s_both_0.30s] group shrink-0">
                      <div className="w-8 h-8 rounded-control bg-canvas group-hover:bg-accent-green-light flex items-center justify-center mx-auto mb-2 text-status-success group-hover:scale-110 group-hover:-rotate-3 transition-all">
                        <Database className="w-[18px] h-[18px]" />
                      </div>
                      <div className="text-[9px] text-text-secondary tracking-[0.04em] uppercase mb-0.5">Persistence</div>
                      <div className="text-[12px] font-medium text-text-primary mb-1.5">Primary Database</div>
                      <span className="bg-status-success/10 text-status-success text-[10px] px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" />
                        AI Verified
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    <div className="border border-border rounded-control p-2 px-3 cursor-pointer hover:border-accent-green-dim hover:bg-accent-green-light hover:-translate-y-[1px] transition-all">
                      <div className="text-[10px] text-text-secondary tracking-[0.04em] uppercase mb-0.5">Primary Protocol</div>
                      <div className="text-[12px] font-medium text-text-primary">HTTPS / JSON REST</div>
                    </div>
                    <div className="border border-border rounded-control p-2 px-3 cursor-pointer hover:border-accent-green-dim hover:bg-accent-green-light hover:-translate-y-[1px] transition-all">
                      <div className="text-[10px] text-text-secondary tracking-[0.04em] uppercase mb-0.5">Auth Mechanism</div>
                      <div className="text-[12px] font-medium text-text-primary">JWT / OAuth 2.0</div>
                    </div>
                    <div className="border border-border rounded-control p-2 px-3 cursor-pointer hover:border-accent-green-dim hover:bg-accent-green-light hover:-translate-y-[1px] transition-all">
                      <div className="text-[10px] text-text-secondary tracking-[0.04em] uppercase mb-0.5">Backup Strategy</div>
                      <div className="text-[12px] font-medium text-text-primary">Daily Snapshots (S3)</div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: SYSTEM CONTEXT */}
              {activeTab === 'system' && (
                <div className="animate-[fadeIn_0.22s_ease]">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                    <div className="border border-border rounded-card p-3.5 text-center cursor-pointer hover:border-status-success hover:shadow-[0_6px_20px_rgba(52,199,89,.12)] hover:-translate-y-1 transition-all group">
                      <div className="w-9 h-9 rounded-control bg-canvas group-hover:bg-accent-green-light flex items-center justify-center mx-auto mb-2 transition-colors">
                        <User className="w-[18px] h-[18px] text-status-success" />
                      </div>
                      <div className="text-[9px] text-text-secondary tracking-[0.04em] uppercase mb-0.5">Actor</div>
                      <div className="text-[12px] font-medium text-text-primary">End User</div>
                    </div>
                    <div className="border border-status-success/30 bg-accent-green-light rounded-card p-3.5 text-center cursor-pointer hover:border-status-success hover:shadow-[0_6px_20px_rgba(52,199,89,.12)] hover:-translate-y-1 transition-all">
                      <div className="w-9 h-9 rounded-control bg-status-success flex items-center justify-center mx-auto mb-2 transition-colors">
                        <span className="text-[11px] font-bold text-white">DP</span>
                      </div>
                      <div className="text-[9px] text-status-success tracking-[0.04em] uppercase mb-0.5">Platform</div>
                      <div className="text-[12px] font-medium text-text-primary">DevPilot</div>
                    </div>
                    <div className="border border-border rounded-card p-3.5 text-center cursor-pointer hover:border-status-success hover:shadow-[0_6px_20px_rgba(52,199,89,.12)] hover:-translate-y-1 transition-all group">
                      <div className="w-9 h-9 rounded-control bg-canvas group-hover:bg-accent-green-light flex items-center justify-center mx-auto mb-2 transition-colors">
                        <CreditCard className="w-[18px] h-[18px] text-text-secondary" />
                      </div>
                      <div className="text-[9px] text-text-secondary tracking-[0.04em] uppercase mb-0.5">Payment</div>
                      <div className="text-[12px] font-medium text-text-primary">Stripe API</div>
                    </div>
                    <div className="border border-border rounded-card p-3.5 text-center cursor-pointer hover:border-status-success hover:shadow-[0_6px_20px_rgba(52,199,89,.12)] hover:-translate-y-1 transition-all group">
                      <div className="w-9 h-9 rounded-control bg-canvas group-hover:bg-accent-green-light flex items-center justify-center mx-auto mb-2 transition-colors">
                        <Activity className="w-[18px] h-[18px] text-text-secondary" />
                      </div>
                      <div className="text-[9px] text-text-secondary tracking-[0.04em] uppercase mb-0.5">Monitoring</div>
                      <div className="text-[12px] font-medium text-text-primary">CloudWatch</div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="text-[10px] text-text-secondary tracking-[0.04em] uppercase mb-2 px-1">Integration Details</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="border border-border rounded-control p-2 px-3 cursor-pointer hover:border-accent-green-dim hover:bg-accent-green-light hover:-translate-y-[1px] transition-all">
                        <div className="text-[10px] text-text-secondary tracking-[0.04em] uppercase mb-0.5">User Access</div>
                        <div className="text-[12px] font-medium text-text-primary">Web + Mobile SPA</div>
                      </div>
                      <div className="border border-border rounded-control p-2 px-3 cursor-pointer hover:border-accent-green-dim hover:bg-accent-green-light hover:-translate-y-[1px] transition-all">
                        <div className="text-[10px] text-text-secondary tracking-[0.04em] uppercase mb-0.5">Payment Flow</div>
                        <div className="text-[12px] font-medium text-text-primary">Stripe Checkout v3</div>
                      </div>
                      <div className="border border-border rounded-control p-2 px-3 cursor-pointer hover:border-accent-green-dim hover:bg-accent-green-light hover:-translate-y-[1px] transition-all">
                        <div className="text-[10px] text-text-secondary tracking-[0.04em] uppercase mb-0.5">Observability</div>
                        <div className="text-[12px] font-medium text-text-primary">Metrics + Alarms</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: COMPONENTS */}
              {activeTab === 'components' && (
                <div className="animate-[fadeIn_0.22s_ease]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2.5 p-2 px-2.5 border border-border rounded-card cursor-pointer hover:border-accent-green-dim hover:bg-accent-green-light hover:translate-x-0.5 transition-all group">
                      <div className="w-7 h-7 rounded-control bg-canvas group-hover:bg-accent-green-light flex items-center justify-center shrink-0 transition-colors">
                        <Network className="w-3.5 h-3.5 text-status-success" />
                      </div>
                      <div>
                        <div className="text-[13px] font-medium text-text-primary">API Gateway</div>
                        <div className="text-[11px] text-text-secondary">Route & rate limit · Nginx</div>
                      </div>
                      <span className="bg-status-success/10 text-status-success text-[10px] px-2 py-0.5 rounded-md ml-auto">Verified</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-2 px-2.5 border border-border rounded-card cursor-pointer hover:border-accent-green-dim hover:bg-accent-green-light hover:translate-x-0.5 transition-all group">
                      <div className="w-7 h-7 rounded-control bg-canvas group-hover:bg-accent-green-light flex items-center justify-center shrink-0 transition-colors">
                        <Shield className="w-3.5 h-3.5 text-status-success" />
                      </div>
                      <div>
                        <div className="text-[13px] font-medium text-text-primary">Auth Service</div>
                        <div className="text-[11px] text-text-secondary">JWT + OAuth 2.0 · Node.js</div>
                      </div>
                      <span className="bg-status-success/10 text-status-success text-[10px] px-2 py-0.5 rounded-md ml-auto">Verified</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-2 px-2.5 border border-border rounded-card cursor-pointer hover:border-accent-green-dim hover:bg-accent-green-light hover:translate-x-0.5 transition-all group">
                      <div className="w-7 h-7 rounded-control bg-canvas group-hover:bg-accent-green-light flex items-center justify-center shrink-0 transition-colors">
                        <GitFork className="w-3.5 h-3.5 text-status-warning" />
                      </div>
                      <div>
                        <div className="text-[13px] font-medium text-text-primary">Message Queue</div>
                        <div className="text-[11px] text-text-secondary">RabbitMQ vs Kafka · TBD</div>
                      </div>
                      <span className="bg-status-warning/10 text-status-warning-on-tint text-[10px] px-2 py-0.5 rounded-md ml-auto">Review</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-2 px-2.5 border border-border rounded-card cursor-pointer hover:border-accent-green-dim hover:bg-accent-green-light hover:translate-x-0.5 transition-all group">
                      <div className="w-7 h-7 rounded-control bg-canvas group-hover:bg-accent-green-light flex items-center justify-center shrink-0 transition-colors">
                        <Database className="w-3.5 h-3.5 text-status-success" />
                      </div>
                      <div>
                        <div className="text-[13px] font-medium text-text-primary">PostgreSQL</div>
                        <div className="text-[11px] text-text-secondary">Primary relational store</div>
                      </div>
                      <span className="bg-status-success/10 text-status-success text-[10px] px-2 py-0.5 rounded-md ml-auto">Verified</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-2 px-2.5 border border-border rounded-card cursor-pointer hover:border-accent-green-dim hover:bg-accent-green-light hover:translate-x-0.5 transition-all group">
                      <div className="w-7 h-7 rounded-control bg-canvas group-hover:bg-accent-green-light flex items-center justify-center shrink-0 transition-colors">
                        <Zap className="w-3.5 h-3.5 text-status-danger" />
                      </div>
                      <div>
                        <div className="text-[13px] font-medium text-text-primary">Caching Layer</div>
                        <div className="text-[11px] text-text-secondary">Redis · Config pending</div>
                      </div>
                      <span className="bg-status-danger/10 text-status-danger-on-tint text-[10px] px-2 py-0.5 rounded-md ml-auto">Blocked</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-2 px-2.5 border border-border rounded-card cursor-pointer hover:border-accent-green-dim hover:bg-accent-green-light hover:translate-x-0.5 transition-all group">
                      <div className="w-7 h-7 rounded-control bg-canvas group-hover:bg-accent-green-light flex items-center justify-center shrink-0 transition-colors">
                        <Server className="w-3.5 h-3.5 text-status-success" />
                      </div>
                      <div>
                        <div className="text-[13px] font-medium text-text-primary">CDN / Static Assets</div>
                        <div className="text-[11px] text-text-secondary">CloudFront distribution</div>
                      </div>
                      <span className="bg-status-success/10 text-status-success text-[10px] px-2 py-0.5 rounded-md ml-auto">Verified</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: DATA FLOW */}
              {activeTab === 'dataflow' && (
                <div className="animate-[fadeIn_0.22s_ease]">
                  <div className="text-[10px] text-text-secondary tracking-[0.04em] uppercase mb-2 px-0.5">Request Lifecycle</div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2.5 p-2 px-2.5 border border-border rounded-card cursor-pointer hover:border-accent-green-dim hover:bg-accent-green-light hover:translate-x-0.5 transition-all">
                      <div className="w-7 h-7 rounded-control bg-status-success text-white font-medium text-[11px] flex items-center justify-center shrink-0">1</div>
                      <div>
                        <div className="text-[13px] font-medium text-text-primary">Client → API Gateway</div>
                        <div className="text-[11px] text-text-secondary">HTTPS with Bearer token · Rate limited</div>
                      </div>
                      <span className="bg-status-success/10 text-status-success text-[10px] px-2 py-0.5 rounded-md ml-auto">HTTPS</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-2 px-2.5 border border-border rounded-card cursor-pointer hover:border-accent-green-dim hover:bg-accent-green-light hover:translate-x-0.5 transition-all">
                      <div className="w-7 h-7 rounded-control bg-status-success text-white font-medium text-[11px] flex items-center justify-center shrink-0">2</div>
                      <div>
                        <div className="text-[13px] font-medium text-text-primary">Gateway → Auth Service</div>
                        <div className="text-[11px] text-text-secondary">Token validation via REST · &lt;60ms avg</div>
                      </div>
                      <span className="bg-status-success/10 text-status-success text-[10px] px-2 py-0.5 rounded-md ml-auto">JWT</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-2 px-2.5 border border-border rounded-card cursor-pointer hover:border-accent-green-dim hover:bg-accent-green-light hover:translate-x-0.5 transition-all">
                      <div className="w-7 h-7 rounded-control bg-status-warning text-white font-medium text-[11px] flex items-center justify-center shrink-0">3</div>
                      <div>
                        <div className="text-[13px] font-medium text-text-primary">Auth → Message Queue</div>
                        <div className="text-[11px] text-text-secondary">Publish auth events · Async processing</div>
                      </div>
                      <span className="bg-status-warning/10 text-status-warning-on-tint text-[10px] px-2 py-0.5 rounded-md ml-auto">Pending</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-2 px-2.5 border border-border rounded-card cursor-pointer hover:border-accent-green-dim hover:bg-accent-green-light hover:translate-x-0.5 transition-all">
                      <div className="w-7 h-7 rounded-control bg-status-success text-white font-medium text-[11px] flex items-center justify-center shrink-0">4</div>
                      <div>
                        <div className="text-[13px] font-medium text-text-primary">Service → Database</div>
                        <div className="text-[11px] text-text-secondary">SQL over connection pool · Max 50 conn</div>
                      </div>
                      <span className="bg-status-success/10 text-status-success text-[10px] px-2 py-0.5 rounded-md ml-auto">SQL</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-2 px-2.5 border border-border rounded-card cursor-pointer hover:border-accent-green-dim hover:bg-accent-green-light hover:translate-x-0.5 transition-all">
                      <div className="w-7 h-7 rounded-control bg-status-success text-white font-medium text-[11px] flex items-center justify-center shrink-0">5</div>
                      <div>
                        <div className="text-[13px] font-medium text-text-primary">Cache Check → Redis</div>
                        <div className="text-[11px] text-text-secondary">L2 cache lookup before DB · TTL 300s</div>
                      </div>
                      <span className="bg-status-success/10 text-status-success text-[10px] px-2 py-0.5 rounded-md ml-auto">Redis</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
