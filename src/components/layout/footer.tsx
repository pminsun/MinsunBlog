import Link from 'next/link'
import { BsGithub } from 'react-icons/bs'

export default function Footer() {
  return (
    <footer>
      <div className="lg:max-w-3x">
        <p className="copyright">
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
