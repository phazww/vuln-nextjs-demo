/**
 * INTENTIONALLY VULNERABLE demo app for phaz-lite.
 * DO NOT copy any pattern from this file. All "secrets" are fake.
 */
export default function Home() {
  return (
    <main style={{ fontFamily: "sans-serif", padding: 40 }}>
      <h1>Acme AI Dashboard — Demo</h1>
      <p>Internal analytics console. Employees only.</p>
      {/* fake credentials on purpose */}
      <script
        dangerouslySetInnerHTML={{
          __html: `window.CONFIG={apiKey:"sk-proj-4f8a2b91c7d3e60518fa29bc47d10e83",region:"us-east-1"};`,
        }}
      />
    </main>
  );
}
