'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { navigation } from './navigation'

export default function DesktopNavigation() {
  const pathname = usePathname()
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  return (
    <div className='hidden md:flex items-center gap-1'>
      {navigation.map((item) => (
        <div
          key={item.name}
          className='relative'
          onMouseEnter={() => setActiveDropdown(item.name)}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          {item.dropdown ? (
            <>
              <button
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${pathname.startsWith(item.href)
                  ? 'text-[#2563eb] bg-[#2563eb]/10'
                  : 'text-[#f1f5f9]/80 hover:text-[#2563eb] hover:bg-[#2563eb]/5'
                  }`}
              >
                <span>{item.name}</span>
                <ChevronDown
                  className={`h-3 w-3 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''
                    }`}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className='absolute top-full left-0 mt-1 w-48 bg-[#0a1929] border border-[#2563eb]/20 rounded-lg shadow-xl overflow-hidden'
                  >
                    <div className='py-1'>
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`block px-3 py-2 text-xs transition-all duration-200 ${pathname === subItem.href
                            ? 'bg-[#2563eb]/10 text-[#2563eb]'
                            : 'text-[#f1f5f9]/70 hover:bg-[#2563eb]/5 hover:text-[#2563eb]'
                            }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <Link
              href={item.href}
              className={`inline-block px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${pathname === item.href
                ? 'text-[#2563eb] bg-[#2563eb]/10'
                : 'text-[#f1f5f9]/80 hover:text-[#2563eb] hover:bg-[#2563eb]/5'
                }`}
            >
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </div>
  )
}
