import Header from "@/components/header";
import Tile from "@/components/tile";
import { createClient } from "@/lib/supabase/server";
import type { Card } from "@/lib/types";

export default async function FeaturedPage() {
  const s = await createClient();
  const { data } = await s.from("cards").select("*").eq("featured", true).order("created_at", { ascending: false });
  const cards = (data ?? []) as Card[];
  return <><Header/><main className="section page">
    <p className="eye">THE VAULT'S FINEST</p><h1>FEATURED GEMS ◆</h1>
    <div className="grid">{cards.length ? cards.map((c) => <Tile key={c.id} c={c}/>) : <div className="empty">NO FEATURED GEMS YET.</div>}</div>
  </main></>;
}