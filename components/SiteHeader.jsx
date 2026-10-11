import Link from 'next/link';
export default function SiteHeader({ practice = false }) {
 return <header><Link className="brand" href="/"><span className="logo">言</span> kotoba<span className="brand-sub">/ góc học tiếng Nhật</span></Link><nav className="main-nav"><Link href="/" aria-current={!practice ? 'page' : undefined}>Bảng động từ</Link><Link href="/practice" aria-current={practice ? 'page' : undefined}>Luyện tập →</Link></nav></header>;
}
