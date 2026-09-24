"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  ChefHat,
  LayoutDashboard,
  Package,
  Plus,
  RefreshCw,
  ShoppingCart,
  Sparkles,
  Trash2,
  TrendingUp,
  X,
} from "lucide-react";
import {
  DEMO_RESTAURANT_ID,
  getSupabaseClient,
  InventoryItem,
  WasteLog,
} from "@/lib/supabase/client";

const currency = new Intl.NumberFormat("en-OM", {
  style: "currency",
  currency: "OMR",
  minimumFractionDigits: 3,
});

export default function RestoIQDashboard() {
  const supabase = useMemo(() => getSupabaseClient(), []);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [waste, setWaste] = useState<WasteLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [showAddItem, setShowAddItem] = useState(false);
  const [showWaste, setShowWaste] = useState(false);

  async function loadData() {
    setLoading(true);
    const [inventoryResult, wasteResult] = await Promise.all([
      supabase
        .from("inventory")
        .select("id, ingredient_name, quantity, unit, category, low_stock_threshold, cost_per_unit, supplier")
        .eq("restaurant_id", DEMO_RESTAURANT_ID)
        .order("ingredient_name"),
      supabase
        .from("waste_logs")
        .select("id, ingredient_name, quantity_wasted, unit, reason, cost_estimate, date_logged")
        .eq("restaurant_id", DEMO_RESTAURANT_ID)
        .order("created_at", { ascending: false })
        .limit(20),
    ]);
    if (inventoryResult.error || wasteResult.error) {
      setMessage(inventoryResult.error?.message || wasteResult.error?.message || "Could not load demo data.");
    } else {
      setInventory((inventoryResult.data || []) as InventoryItem[]);
      setWaste((wasteResult.data || []) as WasteLog[]);
      setMessage("");
    }
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function addInventoryItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    const form = new FormData(event.currentTarget);
    const { error } = await supabase.from("inventory").insert({
      restaurant_id: DEMO_RESTAURANT_ID,
      ingredient_name: form.get("name"),
      category: form.get("category"),
      unit: form.get("unit"),
      quantity: Number(form.get("quantity")),
      low_stock_threshold: Number(form.get("threshold")),
      cost_per_unit: Number(form.get("cost")),
      supplier: form.get("supplier"),
    });
    setSaving(false);
    if (error) setMessage(error.message);
    else {
      setMessage("Inventory item added.");
      setShowAddItem(false);
      event.currentTarget.reset();
      loadData();
    }
  }

  async function addWasteLog(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    const form = new FormData(event.currentTarget);
    const item = inventory.find((row) => row.id === form.get("item"));
    const quantity = Number(form.get("quantity"));
    const { error } = await supabase.from("waste_logs").insert({
      restaurant_id: DEMO_RESTAURANT_ID,
      ingredient_id: item?.id || null,
      ingredient_name: item?.ingredient_name || "Other",
      quantity_wasted: quantity,
      unit: item?.unit || "unit",
      reason: form.get("reason"),
      cost_estimate: item ? quantity * Number(item.cost_per_unit) : Number(form.get("cost")),
      date_logged: new Date().toISOString().slice(0, 10),
      logged_by: "Demo manager",
    });
    setSaving(false);
    if (error) setMessage(error.message);
    else {
      setMessage("Waste log saved.");
      setShowWaste(false);
      event.currentTarget.reset();
      loadData();
    }
  }

  const lowStock = inventory.filter((item) => Number(item.quantity) <= Number(item.low_stock_threshold));
  const inventoryValue = inventory.reduce((sum, item) => sum + Number(item.quantity) * Number(item.cost_per_unit), 0);
  const wasteCost = waste.reduce((sum, item) => sum + Number(item.cost_estimate), 0);

  return (
    <div className="flex min-h-screen bg-[#0d0d0e] text-neutral-100 antialiased font-sans">
      <aside className="hidden md:flex w-64 border-r border-neutral-800/80 bg-[#121214] flex-col justify-between shrink-0 p-4">
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="h-9 w-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400"><ChefHat className="h-5 w-5" /></div>
            <div><div className="font-bold tracking-wide text-neutral-100 text-sm">Resto<span className="text-amber-400">IQ</span></div><p className="text-[11px] text-neutral-500 font-medium">Restaurant profit control</p></div>
          </div>
          <nav className="space-y-1">
            <NavItem icon={<LayoutDashboard className="h-4 w-4" />} label="Dashboard" active />
            <NavItem icon={<Package className="h-4 w-4" />} label="Inventory" badge={String(inventory.length)} />
            <NavItem icon={<ShoppingCart className="h-4 w-4" />} label="Purchase Orders" />
            <NavItem icon={<Trash2 className="h-4 w-4" />} label="Waste Logs" />
            <NavItem icon={<ChefHat className="h-4 w-4" />} label="Recipes" />
            <NavItem icon={<BarChart3 className="h-4 w-4" />} label="Analytics" />
            <NavItem icon={<Sparkles className="h-4 w-4 text-amber-400" />} label="AI Forecast" highlight />
          </nav>
        </div>
        <div className="border-t border-neutral-800/80 pt-4 text-[11px] text-neutral-500">Demo workspace · Muscat, Oman</div>
      </aside>

      <main className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div><div className="flex items-center gap-2 text-xs text-amber-400/80 font-mono mb-1"><LayoutDashboard className="h-3.5 w-3.5" /> LIVE DEMO</div><h1 className="text-2xl font-bold tracking-tight">Muscat Garden Restaurant</h1><p className="text-xs text-neutral-400">Live inventory and waste control · OMR</p></div>
          <div className="flex items-center gap-2"><button onClick={loadData} className="p-2 rounded-lg border border-neutral-800 text-neutral-400 hover:text-white" title="Refresh"><RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /></button><button onClick={() => setShowWaste(true)} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-amber-500/40 text-amber-300 text-xs font-semibold hover:bg-amber-500/10"><Trash2 className="h-4 w-4" /> Log waste</button><button onClick={() => setShowAddItem(true)} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-semibold"><Plus className="h-4 w-4" /> Add item</button></div>
        </div>

        {message && <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs text-amber-200">{message}</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="INVENTORY VALUE" value={currency.format(inventoryValue)} icon={<Package className="h-5 w-5 text-amber-400" />} />
          <MetricCard title="LOW STOCK ALERTS" value={String(lowStock.length)} isAlert={lowStock.length > 0} icon={<AlertTriangle className="h-5 w-5 text-amber-400" />} />
          <MetricCard title="ITEMS TRACKED" value={String(inventory.length)} icon={<ShoppingCart className="h-5 w-5 text-amber-400" />} />
          <MetricCard title="WASTE LOGGED" value={currency.format(wasteCost)} icon={<Trash2 className="h-5 w-5 text-amber-400" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="bg-[#121214] border border-neutral-800/80 rounded-xl p-5 space-y-4"><div className="flex items-center justify-between"><div className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-amber-400" /><h2 className="text-sm font-semibold">Low Stock Alerts</h2></div><span className="text-[10px] text-neutral-500">Update your count after delivery</span></div>{loading ? <Skeleton /> : lowStock.length === 0 ? <Empty text="All stock levels are healthy." /> : <div className="space-y-2">{lowStock.map((item) => <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-neutral-900/60 border border-neutral-800/60 text-xs"><div><p className="font-semibold">{item.ingredient_name}</p><span className="text-[10px] text-neutral-500">{item.category} · {item.unit}</span></div><div className="text-right font-mono"><span className="text-amber-400 font-bold">{item.quantity}</span><span className="text-neutral-500"> / {item.low_stock_threshold}</span></div></div>)}</div>}</section>
          <section className="bg-[#121214] border border-neutral-800/80 rounded-xl p-5 space-y-4"><div className="flex items-center justify-between"><div className="flex items-center gap-2"><Trash2 className="h-4 w-4 text-amber-400" /><h2 className="text-sm font-semibold">Recent Waste</h2></div><span className="text-xs text-amber-400">{currency.format(wasteCost)} total</span></div>{loading ? <Skeleton /> : waste.length === 0 ? <Empty text="No waste logs yet. Add your first one." /> : <div className="space-y-2">{waste.slice(0, 4).map((item) => <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-neutral-900/60 border border-neutral-800/60 text-xs"><div><p className="font-semibold">{item.ingredient_name}</p><span className="text-[10px] text-neutral-500">{item.reason} · {item.quantity_wasted} {item.unit}</span></div><span className="font-mono text-red-300">{currency.format(Number(item.cost_estimate))}</span></div>)}</div>}</section>
        </div>

        <section className="bg-[#121214] border border-neutral-800/80 rounded-xl p-5 space-y-4"><div className="flex items-center justify-between"><div><div className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-amber-400" /><h2 className="text-sm font-semibold">Inventory Control</h2></div><p className="text-xs text-neutral-500 mt-1">Your live stock list from Supabase</p></div><span className="text-[10px] uppercase tracking-wider text-emerald-400">Connected</span></div><div className="overflow-x-auto"><table className="w-full text-xs"><thead className="text-[10px] uppercase tracking-wider text-neutral-500"><tr className="border-b border-neutral-800"><th className="text-left py-3">Item</th><th className="text-left py-3">Category</th><th className="text-right py-3">Current</th><th className="text-right py-3">Unit cost</th><th className="text-right py-3">Value</th></tr></thead><tbody>{inventory.map((item) => <tr key={item.id} className="border-b border-neutral-900"><td className="py-3 font-semibold">{item.ingredient_name}</td><td className="py-3 text-neutral-500">{item.category}</td><td className={`py-3 text-right font-mono ${Number(item.quantity) <= Number(item.low_stock_threshold) ? "text-amber-400" : "text-neutral-200"}`}>{item.quantity} {item.unit}</td><td className="py-3 text-right font-mono text-neutral-400">{currency.format(Number(item.cost_per_unit))}</td><td className="py-3 text-right font-mono">{currency.format(Number(item.quantity) * Number(item.cost_per_unit))}</td></tr>)}</tbody></table></div></section>
      </main>

      {showAddItem && <Modal title="Add inventory item" onClose={() => setShowAddItem(false)}><form onSubmit={addInventoryItem} className="space-y-3"><Field name="name" label="Item name" placeholder="e.g. Basmati Rice" /><div className="grid grid-cols-2 gap-3"><Field name="category" label="Category" placeholder="Dry goods" /><Field name="unit" label="Unit" placeholder="kg" /></div><div className="grid grid-cols-3 gap-3"><Field name="quantity" label="Quantity" type="number" step="0.01" placeholder="0" /><Field name="threshold" label="Low-stock at" type="number" step="0.01" placeholder="0" /><Field name="cost" label="Cost / unit (OMR)" type="number" step="0.001" placeholder="0" /></div><Field name="supplier" label="Supplier" placeholder="Supplier name" /><SubmitButton saving={saving} label="Save item" /></form></Modal>}
      {showWaste && <Modal title="Log waste" onClose={() => setShowWaste(false)}><form onSubmit={addWasteLog} className="space-y-3"><label className="block text-xs text-neutral-400">Inventory item<select name="item" required className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-700 px-3 py-2 text-sm text-white"><option value="">Select item</option>{inventory.map((item) => <option key={item.id} value={item.id}>{item.ingredient_name} ({item.unit})</option>)}</select></label><Field name="quantity" label="Quantity wasted" type="number" step="0.01" placeholder="0" /><Field name="reason" label="Reason" placeholder="Expired, spoiled, damaged..." /><SubmitButton saving={saving} label="Save waste log" /></form></Modal>}
    </div>
  );
}

function NavItem({ icon, label, active = false, badge, highlight = false }: { icon: React.ReactNode; label: string; active?: boolean; badge?: string; highlight?: boolean }) { return <button className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium ${active ? "bg-amber-500/10 text-amber-400 border border-amber-500/30" : highlight ? "bg-neutral-900/90 text-amber-300 border border-amber-500/20" : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50"}`}><div className="flex items-center gap-2.5">{icon}<span>{label}</span></div>{badge && <span className="px-1.5 rounded-full text-[10px] font-mono bg-amber-500/20 text-amber-400">{badge}</span>}</button>; }
function MetricCard({ title, value, icon, isAlert = false }: { title: string; value: string; icon: React.ReactNode; isAlert?: boolean }) { return <div className="bg-[#121214] border border-neutral-800/80 rounded-xl p-5 flex flex-col justify-between space-y-3"><div className="flex justify-between items-start"><span className="text-[10px] font-semibold tracking-wider font-mono uppercase text-neutral-500">{title}</span><div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800/80">{icon}</div></div><div className={`text-2xl font-bold font-mono tracking-tight ${isAlert ? "text-amber-400" : "text-neutral-100"}`}>{value}</div></div>; }
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) { return <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/70 p-4"><div className="w-full max-w-md rounded-xl border border-neutral-700 bg-[#151517] p-5 shadow-2xl"><div className="flex items-center justify-between mb-5"><h2 className="font-semibold">{title}</h2><button onClick={onClose} className="text-neutral-400 hover:text-white"><X className="h-5 w-5" /></button></div>{children}</div></div>; }
function Field({ name, label, type = "text", step, placeholder }: { name: string; label: string; type?: string; step?: string; placeholder?: string }) { return <label className="block text-xs text-neutral-400">{label}<input required name={name} type={type} step={step} placeholder={placeholder} className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-700 px-3 py-2 text-sm text-white outline-none focus:border-amber-500" /></label>; }
function SubmitButton({ saving, label }: { saving: boolean; label: string }) { return <button disabled={saving} className="w-full rounded-lg bg-amber-500 py-2.5 text-sm font-semibold text-neutral-950 hover:bg-amber-400 disabled:opacity-50">{saving ? "Saving..." : label}</button>; }
function Skeleton() { return <div className="h-20 animate-pulse rounded-lg bg-neutral-900" />; }
function Empty({ text }: { text: string }) { return <div className="rounded-lg border border-dashed border-neutral-800 p-6 text-center text-xs text-neutral-500">{text}</div>; }
