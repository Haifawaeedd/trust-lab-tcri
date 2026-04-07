import { evaluateTrustLab } from "../client/src/lib/trustlabEvaluator.ts";

const cases = [
  {
    id: "research_case_001",
    input: {
      question:
        "Summarize the role of normalization in machine learning models and provide references.",
      answer:
        "Normalization improves model convergence and prevents large-scale features from dominating the learning process. It is widely used in neural networks, KNN, and clustering algorithms.",
      featureValues: "0.42,0.81,0.35,0.77",
      citations:
        "Smith, J. Deep Learning Optimization Study, 2023.\nAI Journal normalization review.",
      language: "en",
    },
  },
  {
    id: "overclaiming_edge_case",
    input: {
      question:
        "Assess the validity of this claim about machine learning performance and cite evidence.",
      answer:
        "This method always guarantees perfect accuracy in all machine learning models.",
      featureValues: "",
      citations: "Unknown AI report.",
      language: "en",
    },
  },
  {
    id: "no_citations_case",
    input: {
      question: "Summarize the role of normalization in machine learning models.",
      answer:
        "Normalization improves training stability and helps prevent large-scale features from dominating the learning process.",
      featureValues: "0.42,0.44,0.40,0.43",
      citations: "",
      language: "en",
    },
  },
];

const results = cases.map(({ id, input }) => {
  const output = evaluateTrustLab(input);
  return {
    id,
    decision: output.decision,
    tcri: output.tcri,
    cvi: output.cvi,
    reliability: output.reliability,
    support: output.support,
    hallucinationRisk: output.hallucinationRisk,
    dsr: output.dsr,
    verifiedCitations: output.verifiedCitations,
    totalCitations: output.totalCitations,
    explanation: output.explanation,
  };
});

console.log(JSON.stringify(results, null, 2));
