"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Building2,
  Trash2,
  ChefHat,
  BarChart3,
  Sparkles,
  FileText,
  TrendingUp,
  ScanLine,
  Users,
  Award,
  MapPin,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
  AlertTriangle,
  ArrowUpRight,
  Plus
} from "lucide-react";
import Link from "next/link";

interface DashboardMetrics {
  totalInventoryCount: number;
  inventoryMoMChange: number;
  lowStockAlertCount: number;
  activePurchaseOrders: number;
  purchaseOrdersMoMChange: number;
  totalWasteCost: number;
  reorderBudget: number;
  highRiskWasteItems: number;
  targetFoodCostPercent: number;
  actualFoodCostPercent: number;
}

export default function RestoIQDashboard() {
  const [metrics] = useState<DashboardMetrics>({
    totalInventoryCount: 142,
    inventoryMoMChange: 12,
    lowStockAlertCount: 4,
    activePurchaseOrders: 2,
    purchaseOrdersMoMChange: 8,
    totalWasteCost: 245.5,
    reorderBudget: 1280.0,
    highRiskWasteItems: 3,
    targetFoodCostPercent: 28.0,
    actualFoodCostPercent: 31.4,
  });

  return (
    <div className="flex min-h-screen bg-[#0d0d0e] text-neutral-100 antialiased font-sans">
      <aside className="w-64 border-r border-neutral-800/80 bg-[#121214] flex flex-col justify-between shrink-0 p-4">
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="h-9 w-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ChefHat className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold tracking-wide text-neutral-100 text-sm flex items-center gap-1.5">
                Resto<span className="text-amber-400">IQ</span>
              </div>
              <p className="text-[11px] text-neutral-500 font-medium">Premium Restaurant OS</p>
            </div>
          </div>

          <nav className="space-y-1">
            <NavItem icon={<LayoutDashboard className="h-4 w-4" />} label="Dashboard" active />
            <NavItem icon={<Package className="h-4 w-4" />} label="Inventory" />
            <NavItem icon={<ShoppingCart className="h-4 w-4" />} label="Purchase Orders" badge="2" />
            <NavItem icon={<Building2 className="h-4 w-4" />} label="Suppliers" />
            <NavItem icon={<Trash2 className="h-4 w-4" />} label="Waste Logs" />
            <NavItem icon={<ChefHat className="h-4 w-4" />} label="Recipes" />
            <NavItem icon={<BarChart3 className="h-4 w-4" />} label="Analytics" />
            <NavItem icon={<Sparkles className="h-4 w-4 text-amber-400" />} label="AI Forecast" />
            <NavItem icon={<FileText className="h-4 w-4" />} label="Reports" />
            <NavItem icon={<TrendingUp className="h-4 w-4" />} label="Market Intel" />
            <NavItem icon={<ScanLine className="h-4 w-4 text-amber-400" />} label="Invoice Scanner" highlight />
          </nav>

          <div className="space-y-3 pt-2">
            <div className="text-[10px] font-semibold tracking-wider text-neutral-500 uppercase px-2">Team</div>
            <nav className="space-y-1">
              <NavItem icon={<Users className="h-4 w-4" />} label="Staff Management" />
              <NavItem icon={<Award className="h-4 w-4" />} label="Staff Performance" />
            </nav>
          </div>

          <div className="space-y-3 pt-2">
            <div className="text-[10px] font-semibold tracking-wider text-neutral-500 uppercase px-2">Locations</div>
            <nav className="space-y-1">
              <NavItem icon={<MapPin className="h-4 w-4" />} label="Multi-Location" />
            </nav>
          </div>
        </div>

        <div className="space-y-2 pt-4 border-t border-neutral-800/80">
          <NavItem icon={<CreditCard className="h-4 w-4" />} label="Billing" />
          <NavItem icon={<Settings className="h-4 w-4" />} label="Settings" />
          <NavItem icon={<HelpCircle className="h-4 w-4" />} label="Help" />

          <div className="pt-2">
            <div className="flex items-center gap-3 p-2 rounded-lg bg-neutral-900/60 border border-neutral-800/60">
              <div className="h-8 w-8 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center border border-amber-500/30">
                AF
              </div>
              <div className="overflow-hidden leading-tight flex-1">
                <p className="text-xs font-semibold text-neutral-200 truncate">Abdirahman Fuad</p>
                <p className="text-[10px] text-neutral-500 truncate">admin@resto.iq</p>
              </div>
            </div>
            <button className="w-full mt-2 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-medium text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40 border border-neutral-800/60 transition-colors">
              <LogOut className="h-3 w-3" /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400/80 font-mono mb-1">
              <LayoutDashboard className="h-3.5 w-3.5" />
              <span>DASHBOARD</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-100">Overview</h1>
            <p className="text-xs text-neutral-400">Live health and cost leak telemetry for your operations.</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/inventory/scan"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-xs transition-colors shadow-lg shadow-amber-500/10"
            >
              <ScanLine className="h-4 w-4" /> Scan Invoice
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="TOTAL INVENTORY"
            value={metrics.totalInventoryCount.toString()}
            trend={metrics.totalInventoryCount > 0 ? `+${metrics.inventoryMoMChange}% vs last month` : undefined}
            icon={<Package className="h-5 w-5 text-amber-400" />}
          />
          <MetricCard
            title="LOW STOCK ALERTS"
            value={metrics.lowStockAlertCount.toString()}
            isAlert={metrics.lowStockAlertCount > 0}
            icon={<AlertTriangle className="h-5 w-5 text-amber-400" />}
          />
          <MetricCard
            title="PURCHASE ORDERS"
            value={metrics.activePurchaseOrders.toString()}
            trend={metrics.activePurchaseOrders > 0 ? `+${metrics.purchaseOrdersMoMChange}% vs last month` : undefined}
            icon={<ShoppingCart className="h-5 w-5 text-amber-400" />}
          />
          <MetricCard
            title="TOTAL WASTE COST"
            value={`$${metrics.totalWasteCost.toFixed(2)}`}
            icon={<Trash2 className="h-5 w-5 text-amber-400" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#121214] border border-neutral-800/80 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <h2 className="text-sm font-semibold text-neutral-200">Low Stock Alerts</h2>
              </div>
              <Link href="/inventory" className="text-xs text-amber-400 hover:underline">View All</Link>
            </div>
            <div className="space-y-2">
              <StockAlertItem name="Ketel One Vodka 750ml" inStock="1.2 btl" par="4.0 btl" category="Liquor" />
              <StockAlertItem name="Prime Ribeye Steaks" inStock="3.5 kg" par="10.0 kg" category="Meat" />
              <StockAlertItem name="Whole Milk (Gallon)" inStock="1 unit" par="6 units" category="Dairy" />
            </div>
          </div>

          <div className="bg-[#121214] border border-neutral-800/80 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4 text-amber-400" />
                <h2 className="text-sm font-semibold text-neutral-200">Recent Purchase Orders</h2>
              </div>
              <button className="flex items-center gap-1 text-xs text-amber-400 hover:underline">
                <Plus className="h-3 w-3" /> New Order
              </button>
            </div>
            <div className="space-y-2">
              <POItem id="PO-9402" vendor="Sysco Food Services" total="$840.50" status="Awaiting Delivery" />
              <POItem id="PO-9401" vendor="Southern Glazer's Wine & Spirits" total="$1,240.00" status="Received" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#121214] border border-neutral-800/80 rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Trash2 className="h-4 w-4 text-amber-400" />
              <h2 className="text-sm font-semibold text-neutral-200">Waste Overview</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-lg p-3.5">
                <div className="text-[10px] uppercase font-mono tracking-wider text-neutral-500">Today</div>
                <div className="text-xl font-bold font-mono text-neutral-100 mt-1">2</div>
                <div className="text-xs text-red-400 font-mono mt-0.5">$38.50</div>
              </div>
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-lg p-3.5">
                <div className="text-[10px] uppercase font-mono tracking-wider text-neutral-500">This Week</div>
                <div className="text-xl font-bold font-mono text-neutral-100 mt-1">9</div>
                <div className="text-xs text-red-400 font-mono mt-0.5">$245.50</div>
              </div>
            </div>
          </div>

          <div className="bg-[#121214] border border-neutral-800/80 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <h2 className="text-sm font-semibold text-neutral-200">AI Consumption Forecast</h2>
              </div>
              <Link href="/forecast" className="text-xs text-amber-400 hover:underline flex items-center gap-1">
                Full Analysis <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-lg p-3.5">
                <div className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 flex items-center gap-1">
                  <ShoppingCart className="h-3 w-3" /> Reorder Budget
                </div>
                <div className="text-xl font-bold font-mono text-amber-400 mt-1">
                  ${metrics.reorderBudget.toLocaleString()}
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">5 items recommended</div>
              </div>

              <div className="bg-neutral-900/80 border border-neutral-800 rounded-lg p-3.5">
                <div className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3 text-amber-400" /> Waste Risks
                </div>
                <div className="text-xl font-bold font-mono text-neutral-100 mt-1">
                  {metrics.highRiskWasteItems}
                </div>
                <div className="text-xs text-amber-400/90 mt-0.5">High spoilage probability</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({
  icon,
  label,
  active = false,
  badge,
  highlight = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string;
  highlight?: boolean;
}) {
  return (
    <button
      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
        active
          ? "bg-amber-500/10 text-amber-400 border border-amber-500/30 font-semibold"
          : highlight
          ? "bg-neutral-900/90 text-amber-300 hover:bg-neutral-800/80 border border-amber-500/20"
          : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50"
      }`}
    >
      <div className="flex items-center gap-2.5">
        {icon}
        <span>{label}</span>
      </div>
      {badge && (
        <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-amber-500/20 text-amber-400 border border-amber-500/30">
          {badge}
        </span>
      )}
    </button>
  );
}

function MetricCard({
  title,
  value,
  trend,
  icon,
  isAlert = false,
}: {
  title: string;
  value: string;
  trend?: string;
  icon: React.ReactNode;
  isAlert?: boolean;
}) {
  return (
    <div className="bg-[#121214] border border-neutral-800/80 rounded-xl p-5 flex flex-col justify-between space-y-3">
      <div className="flex justify-between items-start">
        <span className="text-[10px] font-semibold tracking-wider font-mono uppercase text-neutral-500">
          {title}
        </span>
        <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800/80">{icon}</div>
      </div>
      <div>
        <div className={`text-2xl font-bold font-mono tracking-tight ${isAlert ? "text-amber-400" : "text-neutral-100"}`}>
          {value}
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 mt-1">
            <TrendingUp className="h-3 w-3" />
            <span>{trend}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function StockAlertItem({ name, inStock, par, category }: { name: string; inStock: string; par: string; category: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-900/60 border border-neutral-800/60 text-xs">
      <div>
        <p className="font-semibold text-neutral-200">{name}</p>
        <span className="text-[10px] text-neutral-500 font-mono">{category}</span>
      </div>
      <div className="text-right font-mono">
        <span className="text-amber-400 font-bold">{inStock}</span>
        <span className="text-neutral-500"> / {par}</span>
      </div>
    </div>
  );
}

function POItem({ id, vendor, total, status }: { id: string; vendor: string; total: string; status: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-900/60 border border-neutral-800/60 text-xs">
      <div>
        <p className="font-semibold text-neutral-200">{vendor}</p>
        <span className="text-[10px] text-neutral-500 font-mono">{id}</span>
      </div>
      <div className="text-right">
        <div className="font-mono font-bold text-neutral-100">{total}</div>
        <span className="text-[10px] text-amber-400 font-medium">{status}</span>
      </div>
    </div>
  );
}
