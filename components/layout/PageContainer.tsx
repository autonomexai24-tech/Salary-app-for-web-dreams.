interface PageContainerProps {
  children: React.ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <main
      className="ml-60 min-h-screen p-6 animate-fade-in"
      style={{ backgroundColor: "var(--surface-bg)" }}
    >
      <div
        className="max-w-5xl mx-auto rounded-xl shadow-[var(--shadow-sm)] border border-[var(--color-neutral-200)] p-6"
        style={{ backgroundColor: "var(--surface-card)" }}
      >
        {children}
      </div>
    </main>
  );
}

