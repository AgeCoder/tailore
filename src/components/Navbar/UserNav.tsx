import { signOut } from '@/auth'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { User } from 'lucide-react'


export interface userProps {
  email: string,
  name: string,
  Userimage: string | undefined,
}

const UserNav = ({ email, Userimage, name, }: userProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='rounded-full h-11 w-11 p-1 border-black'>
            <User size={40} strokeWidth={0.75} absoluteStrokeWidth />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel>
          <div className='flex flex-col '>
            <span className='text-sm font-semibold'>{name}</span>
            <span className='text-[12px] text-slate-500 '>{email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />


        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <form
            action={async () => {
              "use server"
              await signOut()
            }}
            className='w-full'
          >
            <Button type="submit" variant="secondary" className='w-full'>Sign Out</Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserNav
