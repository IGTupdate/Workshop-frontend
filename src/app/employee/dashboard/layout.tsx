
import EmployeeDashBoardLayOut from "./__components/EmployeeDashBoardLayOut";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div>
      <EmployeeDashBoardLayOut>{children}</EmployeeDashBoardLayOut>
    </div>
  );
}
