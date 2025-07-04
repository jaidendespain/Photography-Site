export default function NightLightsPage() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--night-bg)', color: 'var(--night-text)' }}>
      <div className="prose prose-lg max-w-none text-center">
        <h1 className="mb-2" style={{ color: 'var(--night-text)' }}>Night Lights</h1>
        <p>
          Photos in the dark.<br />
          Coming soon.
        </p>
      </div>
    </section>
  );
} 