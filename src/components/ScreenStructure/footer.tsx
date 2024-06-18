import Link from 'next/link'
import { BsGithub } from 'react-icons/bs'

export default function Footer() {
  return (
    <footer className="absolute bottom-0 flex flex-col items-center gap-2 w-full py-4 border-t border-stone-300 dark:border-stone-700">
      <div className="lg:max-w-3x flex gap-5">
        <p className="text-xs">
          Copyright © Minsun Park 2023. All rights reserved.
        </p>
        <div>
          <Link href="https://github.com/pminsun" target="_blank">
            <BsGithub className="dark:text-slate-400" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
