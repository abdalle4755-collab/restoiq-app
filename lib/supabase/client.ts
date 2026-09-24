import { createClient } from "@supabase/supabase-js";

export function getSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}

export const DEMO_RESTAURANT_ID = "11111111-1111-1111-1111-111111111111";

export type InventoryItem = {
  id: string;
  ingredient_name: string;
  quantity: number;
  unit: string;
  category: string;
  low_stock_threshold: number;
  cost_per_unit: number;
  supplier: string | null;
};

export type WasteLog = {
  id: string;
  ingredient_name: string | null;
  quantity_wasted: number;
  unit: string | null;
  reason: string;
  cost_estimate: number;
  date_logged: string | null;
};
