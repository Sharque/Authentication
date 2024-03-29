export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="h-screen grid place-items-center">{children}</div>
    </>
  );
}
