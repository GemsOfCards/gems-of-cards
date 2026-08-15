import Link from "next/link";
import Header from "@/components/header";
import Tile from "@/components/tile";
import { createClient } from "@/lib/supabase/server";
import type { Card } from "@/lib/types";

export default async function Home() {
  const s = await createClient();
  const { data } = await s.from("cards").select("*").order("created_at", { ascending: false });
  const cards = (data ?? []) as Card[];
  const featured = cards.filter((x) => x.featured).slice(0, 4);
  const newest = cards.slice(0, 4);

  return <><Header/><main>
    <section className="hero"><div>
      <p className="eye">A PERSONAL TRADING CARD VAULT</p>
      <h1>EVERY CARD HAS A STORY.<br/><em>SOME BECOME GEMS.</em></h1>
      <p className="intro">A curated archive of treasured trading cards from sports, anime, manga, gaming and beyond.</p>
      <Link className="btn" href="/collection">EXPLORE COLLECTION</Link>
    </div><div className="vault"><div className="crest"><img src="/gems-of-cards-logo.png" alt="Gems of Cards emblem"/></div><p>GEMS OF CARDS</p><span>THE COLLECTOR'S ROYAL VAULT</span></div></section>
    <section className="stats">
      <div><strong>{cards.length}</strong>CARDS IN THE VAULT</div>
      <div><strong>{new Set(cards.map((x) => x.category)).size}</strong>COLLECTIONS</div>
      <div><strong>{cards.filter((x) => x.featured).length}</strong>FEATURED GEMS</div>
    </section>
    <section className="section"><div className="title"><div><p className="eye">THE VAULT'S FINEST</p><h2>FEATURED GEMS ◆</h2></div><Link href="/featured">VIEW ALL →</Link></div>
      <div className="grid">{featured.length ? featured.map((c) => <Tile key={c.id} c={c}/>) : <div className="empty">YOUR FIRST FEATURED GEM WILL APPEAR HERE.</div>}</div>
    </section>
    <section className="section"><div className="title"><div><p className="eye">FRESH FROM THE COLLECTION</p><h2>NEWEST ADDITIONS</h2></div><Link href="/collection">VIEW COLLECTION →</Link></div>
      <div className="grid">{newest.length ? newest.map((c) => <Tile key={c.id} c={c}/>) : <div className="empty">NEW CARDS WILL AUTOMATICALLY APPEAR HERE.</div>}</div>
    </section>
  </main></>;
}
