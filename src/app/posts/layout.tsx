export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <h1>Layout</h1>
      {children}
    </section>
  );
}
