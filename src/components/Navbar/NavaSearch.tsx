import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Package, Package2, PanelLeft, ShoppingCart, Users2 } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../ModeToggle/ModeToggle";
import UserNav from "./UserNav";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SearchBar from "./Search";


export default async function NavaSearch() {
  const session = await auth();
  const user = session?.user
  if (!user) {
    redirect('/login')
  }
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span>
            </Link>

            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-foreground"
            >
              <ShoppingCart className="h-5 w-5" />
              Orders
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Package className="h-5 w-5" />
              Products
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Users2 className="h-5 w-5" />
              Customers
            </Link>

            <ModeToggle />

          </nav>
        </SheetContent>
      </Sheet>
      <SearchBar />

      {user &&
        <UserNav
          Userimage={user.image ?? `https://avatar.vercel.sh/${user.name}`}
          email={user.email as string}
          name={user.name as string}
        />
      }
    </header>
  )
}
