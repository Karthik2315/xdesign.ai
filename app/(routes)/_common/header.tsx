import Logo from '@/components/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { LoginLink, LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { LogOutIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes'
import Link from 'next/link';
import React from 'react'

const Header = () => {
  const {theme,setTheme} = useTheme();
  const isDark = theme === "dark";
  const {user} = useKindeBrowserClient();
  return (  
    <div className='sticky top-0 right-0 left-0 z-30'>
      <header className='h-16 border-b bg-background'>
        <div className='w-full max-w-6xl mx-auto flex items-center justify-between h-full'>
          <Logo />
          <div className='flex flex-1 items-center justify-end gap-3'>
            <Button variant="outline" size="icon" className='relative rounded-full size-8 cursor-pointer flex items-center' onClick={() => setTheme(isDark ? "light" : "dark")}>
              <SunIcon  className={cn("absolute size-5 transition",isDark ? "scale-100" : "scale-0")}/>
              <MoonIcon  className={cn("absolute size-5 transition",!isDark ? "scale-100" : "scale-0")}/>
            </Button>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="h-8 w-8 shrink-0 rounded-full">
                    <AvatarImage
                      src={user?.picture || ""}
                      alt={user?.given_name || ""}
                    />
                    <AvatarFallback className="rounded-lg">
                      {user?.given_name?.charAt(0)}
                      {user?.family_name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='mt-2.5'>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogoutLink className='w-full flex items-center gap-2'>
                      <LogOutIcon className='size-4' />
                      Logout
                    </LogoutLink>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
                ) : (
                  <LoginLink className='bg-primary px-2 rounded-md text-foreground py-1'>Sign In</LoginLink>
            )}
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header
