/* eslint-disable react-hooks/rules-of-hooks */
import { cls } from 'libs/utils'
import { useEffect, useState } from 'react'
import { HiChevronUp } from 'react-icons/hi'

export default function MoveToTop() {
  const [showTopBtn, setShowTopBtn] = useState(false)
  const moveToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  useEffect(() => {
    const showBtnClick = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true)
      } else {
        setShowTopBtn(false)
      }
    }
    window.addEventListener('scroll', showBtnClick)
    return () => {
      window.removeEventListener('scroll', showBtnClick)
    }
  }, [])
  return (
    <div
      onClick={moveToTop}
      className={cls(showTopBtn ? 'show-btn' : 'hidden-btn', 'moveToTop-box')}
    >
      <HiChevronUp />
    </div>
  )
}
