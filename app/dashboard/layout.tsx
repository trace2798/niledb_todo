export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  return (
    <>
      <div className="mx-[5vw] md:mx-[10vw]">{children}</div>
    </>
  );
}
