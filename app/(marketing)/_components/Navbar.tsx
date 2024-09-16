'use client'

import { useScrollTop } from "@/hooks/use-scroll-top"
import { cn } from "@/lib/utils"
import { Logo } from "./Logo"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/spinner"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"

export function Navbar () {
  const {isAuthenticated,isLoading} = useAuth()
  const scrolled = useScrollTop()

return (
    <div className={cn(`z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6`,scrolled && 'border-b shadow-sm')}>
      <Logo/>
      <div className="md:ml-auto md:justify-end flex gap-x-2 justify-between items-center w-full">
        {isLoading && (
          <Spinner/>
        )}
        {/*!isAuthenticated &&*/ !isLoading && (
          <>
            <Button variant='ghost' size='sm'>
              <Link href='/register'>
                Sign up
              </Link>
            </Button>
            <Button  size='sm'>
              <Link href='/login'>
                Get Jotion free
              </Link>
            </Button>
          </>
        )}
        {/* {isAuthenticated && !isLoading && (
          <>
            <Button variant='ghost' size='sm' asChild>
              <Link href='/login'>
                Enter Jotion
              </Link>
            </Button>
          </>
        )} */}
        <ModeToggle/>
      </div>
    </div>
)
}