import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import NavaSearch from "@/components/Navbar/NavaSearch"
import Orders from "@/components/Orders/Orders"
import { Suspense } from "react"

async function fetchWeeklyRevenue() {
  // Simulating an API call
  await new Promise(resolve => setTimeout(resolve, 500))
  return 1329
}

async function fetchMonthlyRevenue() {
  // Simulating an API call
  await new Promise(resolve => setTimeout(resolve, 500))
  return 5329
}

function WeeklyRevenueCard({ revenue }: { revenue: number }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>This Week</CardDescription>
        <CardTitle className="text-4xl">₹{revenue.toLocaleString()}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">
          +25% from last week
        </div>
      </CardContent>
      <CardFooter>
        <Progress value={25} aria-label="25% increase" />
      </CardFooter>
    </Card>
  )
}

function MonthlyRevenueCard({ revenue }: { revenue: number }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>This Month</CardDescription>
        <CardTitle className="text-4xl">₹{revenue.toLocaleString()}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">
          +10% from last month
        </div>
      </CardContent>
      <CardFooter>
        <Progress value={12} aria-label="12% increase" />
      </CardFooter>
    </Card>
  )
}

export default async function Dashboard() {
  const weeklyRevenue = await fetchWeeklyRevenue()
  const monthlyRevenue = await fetchMonthlyRevenue()

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <NavaSearch />
        <main className="flex flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card className="sm:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle>Your Orders</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Introducing Our Dynamic Orders Dashboard for Seamless
                    Management and Insightful Analysis.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link href='/newclient'>
                    <Button>Create New Customer</Button>
                  </Link>
                </CardFooter>
              </Card>
              <Suspense fallback={<div>Loading weekly revenue...</div>}>
                <WeeklyRevenueCard revenue={weeklyRevenue} />
              </Suspense>
              <Suspense fallback={<div>Loading monthly revenue...</div>}>
                <MonthlyRevenueCard revenue={monthlyRevenue} />
              </Suspense>
            </div>
            <Suspense fallback={<div>Loading orders...</div>}>
              <Orders />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  )
}