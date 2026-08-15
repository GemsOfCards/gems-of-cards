import Link from "next/link";

export default function Header(){
  return <header>
    <Link href="/" className="brand" aria-label="Gems of Cards home">
      <img className="brandLogo" src="/gems-of-cards-logo.png" alt="Gems of Cards logo" />
      <span className="brandWords"><strong>GEMS</strong><small>OF</small><strong>CARDS</strong></span>
    </Link>
    <nav>
      <Link href="/">HOME</Link>
      <Link href="/collection">COLLECTIONS</Link>
      <Link href="/featured">FEATURED GEMS</Link>
      <Link className="goldlink" href="/admin">COLLECTION MANAGER</Link>
    </nav>
  </header>
}
