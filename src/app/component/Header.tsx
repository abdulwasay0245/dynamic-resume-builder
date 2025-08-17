import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f5] px-10 py-3">
    {/* Logo and Title */}
    <div className="flex items-center gap-4 text-[#111418]">
      <div className="size-4">
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_6_535)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_6_535">
              <rect width="48" height="48" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <h2 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em]">ResumeCraft</h2>
    </div>

    {/* Nav Links & Profile */}
    <div className="flex flex-1 justify-end gap-8">
      <div className="flex items-center gap-9">
        <a className="text-[#111418] text-sm font-medium leading-normal" href="#">Templates</a>
        <a className="text-[#111418] text-sm font-medium leading-normal" href="#">Examples</a>
        <a className="text-[#111418] text-sm font-medium leading-normal" href="#">Pricing</a>
        </div>
        <Link href={"/buildResume"}>
      <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#3680f6] text-white text-sm font-bold leading-normal tracking-[0.015em]">
        <span className="truncate">New Resume</span>
      </button>
        </Link>
      <div
        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
        style={{
          backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBpCyS-YAO7objFyXi9iKYFtmFBUa2Y4TjeNiv5AEpnDf-_zBIvfAQkQ-yf1JZSegpXJEOR7ZbwwDy4Of292oYWHmgfyMvPsdJLkwYJjWzUoL0YBmeIdCDlJJLvSVObik68iCKgetTKedOpcZl_imGuwAYhUGt7DMBC4nEFguMAsBUWD2zpXwaW_tuayDE3Ewcjq0E5W1d_acjGwE-Z3SBpkwsPfJLCPEcc36qVEefTaWY1cDoRwCbavzII0AhOWLMI_pjMRSVBrbbA')"
        }}
      ></div>
    </div>
  </header>
  )
}

export default Header