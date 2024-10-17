import Navbar from "./_components/navbar"

interface DashboardLayout{
    children: React.ReactNode
}

const DashboradLayout = ({children}: DashboardLayout) => {
  return (
    <main className="h-full">
        <div className="h-full flex flex-col ">
          {children}
        </div>
    </main>
  )
}

export default DashboradLayout