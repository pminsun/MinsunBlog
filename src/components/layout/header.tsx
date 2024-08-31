import Link from 'next/link'
import DarkModeToggleBtn from './darkModeToggleBtn'
import { useRouter } from 'next/router'
import { cls } from 'libs/utils'
import DEFINE from '@/constant/Global'

export default function Header() {
  const router = useRouter()

  return (
    <header>
      <div className="laptop-max-width">
        <nav className="header-style">
          <Link href="/" className={cls(router.pathname === '/' ? 'text-point-color' : '')}>
            {DEFINE.PAGES.HOME.ENG}
          </Link>
          <Link
            href="/blog"
            className={cls(router.pathname.startsWith('/blog') ? 'text-point-color' : '')}
          >
            {DEFINE.PAGES.BLOG.ENG}
          </Link>
          {/* <Link
            href="/project"
            className={cls(router.pathname.startsWith('/project') ? 'text-point-color' : '')}
          >
            {DEFINE.PAGES.PROJECTS.ENG}
          </Link> */}
        </nav>
        <DarkModeToggleBtn />
      </div>
    </header>
  )
}
