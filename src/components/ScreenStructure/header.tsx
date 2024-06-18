import Link from 'next/link'
import DarkModeToggleBtn from '../ScreenElement/darkModeToggleBtn'
import { useRouter } from 'next/router'
import { cls } from 'libs/utils'
import DEFINE from '@/constant/Global'

export default function Header() {
  const router = useRouter()
  return (
    <header className="fixed top-0 z-50 w-full backdrop-blur-md bg-[#fbfbfa]/30 dark:bg-slate-900/30">
      <div className="laptop-max-width flex items-center justify-between py-2 px-4 lg:px-0">
        <nav className="flex gap-2 items-start header-style">
          <Link
            href="/"
            className={cls(router.pathname === '/' ? 'text-point-color' : '')}
          >
            {DEFINE.PAGES.HOME.ENG}
          </Link>
          <Link
            href="/blog"
            className={cls(
              router.pathname.startsWith('/blog') ? 'text-point-color' : '',
            )}
          >
            {DEFINE.PAGES.BLOG.ENG}
          </Link>
          <Link
            href="/project"
            className={cls(
              router.pathname.startsWith('/project') ? 'text-point-color' : '',
            )}
          >
            {DEFINE.PAGES.PROJECTS.ENG}
          </Link>
          <Link
            href="/resume"
            className={cls(
              router.pathname.startsWith('/resume') ? 'text-point-color' : '',
            )}
          >
            {DEFINE.PAGES.RESUME.ENG}
          </Link>
        </nav>
        <DarkModeToggleBtn />
      </div>
    </header>
  )
}
