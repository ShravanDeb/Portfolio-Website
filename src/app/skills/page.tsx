import type { Metadata } from "next";
import NoiseOverlay from "@/components/noise-overlay";
import ScrollProgress from "@/components/scroll-progress";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Skills",
  description: "Technical skills and capabilities.",
};

const skillCategories = [
  {
    category: "Languages",
    skills: "Python, TypeScript, C/C++, Java, SQL, Solidity, HTML/CSS",
  },
  {
    category: "ML / AI",
    skills:
      "PyTorch, TensorFlow, scikit-learn, NumPy, Pandas, Hugging Face, LangChain, OpenAI API",
  },
  {
    category: "Infrastructure",
    skills:
      "Docker, Kubernetes, AWS, GCP, Terraform, CI/CD, GitHub Actions",
  },
  {
    category: "Databases",
    skills: "PostgreSQL, MongoDB, Redis, Pinecone, Weaviate, ChromaDB",
  },
  {
    category: "Frameworks",
    skills: "Next.js, React, Node.js, FastAPI, Flask, Express, Tailwind CSS",
  },
  {
    category: "Tools",
    skills: "Git, VS Code, Figma, Notion, Linear, Grafana, Datadog",
  },
  {
    category: "Specialties",
    skills:
      "RAG Pipelines, LLM Fine-tuning, Real-time Systems, Distributed Computing, API Design",
  },
];

export default function SkillsPage() {
  return (
    <>
      <NoiseOverlay />
      <ScrollProgress />
      <Nav />

      <main className="pt-32 pb-48">
        <div className="mx-auto max-w-[1100px] px-6">
          <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-text-4 block mb-6">
            Skills
          </span>
          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.0] tracking-[-0.03em] text-text-1 mb-16">
            Capabilities
          </h1>

          <div className="space-y-0">
            {skillCategories.map((cat) => (
              <div
                key={cat.category}
                className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8 py-6 border-b border-border"
              >
                <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-text-4">
                  {cat.category}
                </span>
                <span className="text-text-2 text-sm leading-relaxed">
                  {cat.skills}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
