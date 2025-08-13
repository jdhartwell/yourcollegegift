// components/GiftIdeas.js
export default function GiftIdeas({ ideas }) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold tracking-tight">Gift Ideas</h2>
      <p className="text-black/70 mt-2">Curated suggestions to help you find the perfect college gift.</p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {ideas.map((idea) => (
          <div key={idea.title} className="card p-6">
            <div className="badge">Idea</div>
            <h3 className="text-lg font-semibold mt-3">{idea.title}</h3>
            <p className="text-sm text-black/70 mt-2">{idea.subtitle}</p>
            <ul className="mt-4 list-disc pl-5 text-sm space-y-1">
              {idea.examples.map((ex) => <li key={ex}>{ex}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}