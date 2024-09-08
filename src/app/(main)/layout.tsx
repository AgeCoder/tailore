import Navbar from "@/components/Navbar/Navbar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className=" flex ">
      <Navbar />
      {children}
    </main>

  );
}
