import Header from "@/components/header";
import Browser from "@/components/browser";
import { createClient } from "@/lib/supabase/server";
import type { Card } from "@/lib/types";

export default async function CollectionPage() {
  const s = await createClient();
  const { data } = await s.from("cards").select("*").order("created_at", { ascending: false });
  const cards = (data ?? []) as Card[];
  return <><Header/><main className="section page">
    <p className="eye">EXPLORE THE ARCHIVE</p><h1>THE COLLECTION</h1>
    <p className="intro">Browse every card stored in the Gems of Cards vault.</p>
    <Browser cards={cards}/>
  </main></>;
}