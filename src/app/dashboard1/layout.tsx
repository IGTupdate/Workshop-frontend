import CustomerDashBoardLayout from "./__components/CustomerDashboardLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <CustomerDashBoardLayout>{children}</CustomerDashBoardLayout>
    </div>
  );
}
