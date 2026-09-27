"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

type FormErrors = {
  decision?: string;
  optionA?: string;
  optionB?: string;
  priority?: string;
};

type DecisionResult = {
  summary: string;
  optionAName: string;
  optionBName: string;
  recommendation: string;
  optionA: {
    strengths: string[];
    weaknesses: string[];
  };
  optionB: {
    strengths: string[];
    weaknesses: string[];
  };
  tradeoffs: string[];
  risks: string[];
  considerations: string[];
  nextStep: string;
};

export default function DecisionPage() {
  const [decision, setDecision] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [priority, setPriority] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [result, setResult] = useState<DecisionResult | null>(null);

  function validateForm() {
    const newErrors: FormErrors = {};

    if (!decision.trim()) {
      newErrors.decision = "Please describe the decision you are making.";
    } else if (decision.trim().length < 10) {
      newErrors.decision =
        "Please provide a little more detail about your decision.";
    }

    if (!optionA.trim()) {
      newErrors.optionA = "Please enter Option A.";
    }

    if (!optionB.trim()) {
      newErrors.optionB = "Please enter Option B.";
    }

    if (
      optionA.trim() &&
      optionB.trim() &&
      optionA.trim().toLowerCase() === optionB.trim().toLowerCase()
    ) {
      newErrors.optionB = "Option A and Option B should be different.";
    }

    if (!priority) {
      newErrors.priority = "Please select what matters most to you.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setApiError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          decision: decision.trim(),
          optionA: optionA.trim(),
          optionB: optionB.trim(),
          priority,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "We couldn't analyze your decision right now. Please try again."
        );
      }

      setResult({
        ...data,
        optionAName: optionA.trim(),
        optionBName: optionB.trim(),
      });
    } catch (error) {
      console.error("Decision analysis error:", error);

      setApiError(
        error instanceof Error
          ? error.message
          : "We couldn't analyze your decision right now. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  function startNewDecision() {
    setDecision("");
    setOptionA("");
    setOptionB("");
    setPriority("");
    setErrors({});
    setApiError("");
    setResult(null);
  }

  return (
    <main className="min-h-screen bg-[#07111f] px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <header className="mb-10">
          <Link
            href="/"
            className="mb-6 inline-flex items-center text-sm text-slate-400 transition hover:text-[#5eead4] focus:outline-none focus:ring-2 focus:ring-[#5eead4] focus:ring-offset-2 focus:ring-offset-[#07111f]"
          >
            ← Back to home
          </Link>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            AI Decision Companion
          </h1>

          <p className="mt-3 max-w-2xl text-slate-400">
            Describe your decision, compare two options, and get a structured
            analysis based on what matters most to you.
          </p>
        </header>

        {/* Decision Form */}
        {!result && (
          <section className="rounded-2xl border border-slate-700 bg-[#0d1b2a] p-6 shadow-xl sm:p-8">
            <form onSubmit={handleSubmit} noValidate>
              {/* Decision */}
              <div className="mb-6">
                <label
                  htmlFor="decision"
                  className="mb-2 block text-sm font-semibold text-slate-200"
                >
                  What decision are you making?
                </label>

                <textarea
                  id="decision"
                  value={decision}
                  onChange={(e) => setDecision(e.target.value)}
                  placeholder="For example: Should I choose a remote or on-site internship?"
                  rows={4}
                  aria-invalid={Boolean(errors.decision)}
                  aria-describedby={
                    errors.decision ? "decision-error" : undefined
                  }
                  className="w-full rounded-xl border border-slate-600 bg-[#07111f] px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-[#5eead4] focus:ring-2 focus:ring-[#5eead4]/30"
                />

                {errors.decision && (
                  <p
                    id="decision-error"
                    role="alert"
                    className="mt-2 text-sm text-red-400"
                  >
                    {errors.decision}
                  </p>
                )}
              </div>

              {/* Options */}
              <div className="mb-6 grid gap-6 md:grid-cols-2">
                {/* Option A */}
                <div>
                  <label
                    htmlFor="optionA"
                    className="mb-2 block text-sm font-semibold text-slate-200"
                  >
                    Option A
                  </label>

                  <input
                    id="optionA"
                    type="text"
                    value={optionA}
                    onChange={(e) => setOptionA(e.target.value)}
                    placeholder="e.g. Remote internship"
                    aria-invalid={Boolean(errors.optionA)}
                    aria-describedby={
                      errors.optionA ? "optionA-error" : undefined
                    }
                    className="w-full rounded-xl border border-slate-600 bg-[#07111f] px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-[#5eead4] focus:ring-2 focus:ring-[#5eead4]/30"
                  />

                  {errors.optionA && (
                    <p
                      id="optionA-error"
                      role="alert"
                      className="mt-2 text-sm text-red-400"
                    >
                      {errors.optionA}
                    </p>
                  )}
                </div>

                {/* Option B */}
                <div>
                  <label
                    htmlFor="optionB"
                    className="mb-2 block text-sm font-semibold text-slate-200"
                  >
                    Option B
                  </label>

                  <input
                    id="optionB"
                    type="text"
                    value={optionB}
                    onChange={(e) => setOptionB(e.target.value)}
                    placeholder="e.g. On-site internship"
                    aria-invalid={Boolean(errors.optionB)}
                    aria-describedby={
                      errors.optionB ? "optionB-error" : undefined
                    }
                    className="w-full rounded-xl border border-slate-600 bg-[#07111f] px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-[#5eead4] focus:ring-2 focus:ring-[#5eead4]/30"
                  />

                  {errors.optionB && (
                    <p
                      id="optionB-error"
                      role="alert"
                      className="mt-2 text-sm text-red-400"
                    >
                      {errors.optionB}
                    </p>
                  )}
                </div>
              </div>

              {/* Priority */}
              <div className="mb-8">
                <label
                  htmlFor="priority"
                  className="mb-2 block text-sm font-semibold text-slate-200"
                >
                  What matters most to you?
                </label>

                <select
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  aria-invalid={Boolean(errors.priority)}
                  aria-describedby={
                    errors.priority ? "priority-error" : undefined
                  }
                  className="w-full rounded-xl border border-slate-600 bg-[#07111f] px-4 py-3 text-slate-100 outline-none transition focus:border-[#5eead4] focus:ring-2 focus:ring-[#5eead4]/30"
                >
                  <option value="">Select a priority</option>
                  <option value="Cost">Cost</option>
                  <option value="Time">Time</option>
                  <option value="Quality">Quality</option>
                  <option value="Risk">Risk</option>
                  <option value="Career growth">Career growth</option>
                  <option value="Flexibility">Flexibility</option>
                  <option value="Work-life balance">
                    Work-life balance
                  </option>
                  <option value="Other">Other</option>
                </select>

                {errors.priority && (
                  <p
                    id="priority-error"
                    role="alert"
                    className="mt-2 text-sm text-red-400"
                  >
                    {errors.priority}
                  </p>
                )}
              </div>

              {/* API Error */}
              {apiError && (
                <div
                  role="alert"
                  className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300"
                >
                  {apiError}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-[#14b8a6] px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-[#5eead4] focus:outline-none focus:ring-2 focus:ring-[#5eead4] focus:ring-offset-2 focus:ring-offset-[#0d1b2a] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading
                  ? "Analyzing your decision..."
                  : "Analyze My Decision"}
              </button>

              {/* Loading message */}
              {isLoading && (
                <p
                  className="mt-4 text-center text-sm text-slate-400"
                  aria-live="polite"
                >
                  AI is comparing your options based on your priority. This
                  may take a few seconds.
                </p>
              )}
            </form>
          </section>
        )}

        {/* Results */}
        {result && (
          <section
            aria-live="polite"
            className="space-y-6"
          >
            {/* Result Header */}
            <div className="rounded-2xl border border-slate-700 bg-[#0d1b2a] p-6 shadow-xl sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-[#5eead4]">
                AI Decision Analysis
              </p>

              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                Your decision breakdown
              </h2>

              <p className="mt-4 leading-7 text-slate-300">
                {result.summary}
              </p>
            </div>

            {/* Recommendation */}
            <div className="rounded-2xl border border-[#14b8a6]/30 bg-[#0d1b2a] p-6 shadow-xl sm:p-8">
              <h2 className="text-xl font-bold text-[#5eead4]">
                Recommendation
              </h2>

              <p className="mt-4 leading-7 text-slate-300">
                {result.recommendation}
              </p>

              <p className="mt-4 rounded-xl bg-[#07111f] p-4 text-sm leading-6 text-slate-400">
                This analysis is intended to support your thinking. The final
                decision is yours.
              </p>
            </div>

            {/* Options */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Option A */}
              <div className="rounded-2xl border border-slate-700 bg-[#0d1b2a] p-6 shadow-xl">
                <h2 className="text-xl font-bold text-[#5eead4]">
                  {result.optionAName}
                </h2>

                <div className="mt-6">
                  <h3 className="font-semibold text-slate-200">
                    Strengths
                  </h3>

                  <ul className="mt-3 space-y-3">
                    {result.optionA.strengths.map((strength, index) => (
                      <li
                        key={index}
                        className="flex gap-3 text-sm leading-6 text-slate-300"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1 text-[#5eead4]"
                        >
                          +
                        </span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold text-slate-200">
                    Weaknesses
                  </h3>

                  <ul className="mt-3 space-y-3">
                    {result.optionA.weaknesses.map((weakness, index) => (
                      <li
                        key={index}
                        className="flex gap-3 text-sm leading-6 text-slate-300"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1 text-slate-500"
                        >
                          −
                        </span>
                        <span>{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Option B */}
              <div className="rounded-2xl border border-slate-700 bg-[#0d1b2a] p-6 shadow-xl">
                <h2 className="text-xl font-bold text-[#5eead4]">
                  {result.optionBName}
                </h2>

                <div className="mt-6">
                  <h3 className="font-semibold text-slate-200">
                    Strengths
                  </h3>

                  <ul className="mt-3 space-y-3">
                    {result.optionB.strengths.map((strength, index) => (
                      <li
                        key={index}
                        className="flex gap-3 text-sm leading-6 text-slate-300"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1 text-[#5eead4]"
                        >
                          +
                        </span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold text-slate-200">
                    Weaknesses
                  </h3>

                  <ul className="mt-3 space-y-3">
                    {result.optionB.weaknesses.map((weakness, index) => (
                      <li
                        key={index}
                        className="flex gap-3 text-sm leading-6 text-slate-300"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1 text-slate-500"
                        >
                          −
                        </span>
                        <span>{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Trade-offs */}
            <div className="rounded-2xl border border-slate-700 bg-[#0d1b2a] p-6 shadow-xl sm:p-8">
              <h2 className="text-xl font-bold">Important trade-offs</h2>

              <ul className="mt-5 space-y-3">
                {result.tradeoffs.map((tradeoff, index) => (
                  <li
                    key={index}
                    className="flex gap-3 text-slate-300"
                  >
                    <span
                      aria-hidden="true"
                      className="text-[#5eead4]"
                    >
                      •
                    </span>
                    <span>{tradeoff}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Risks */}
            <div className="rounded-2xl border border-slate-700 bg-[#0d1b2a] p-6 shadow-xl sm:p-8">
              <h2 className="text-xl font-bold">Potential risks</h2>

              <ul className="mt-5 space-y-3">
                {result.risks.map((risk, index) => (
                  <li
                    key={index}
                    className="flex gap-3 text-slate-300"
                  >
                    <span
                      aria-hidden="true"
                      className="text-[#5eead4]"
                    >
                      •
                    </span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Considerations */}
            <div className="rounded-2xl border border-slate-700 bg-[#0d1b2a] p-6 shadow-xl sm:p-8">
              <h2 className="text-xl font-bold">Things to consider</h2>

              <ul className="mt-5 space-y-3">
                {result.considerations.map((consideration, index) => (
                  <li
                    key={index}
                    className="flex gap-3 text-slate-300"
                  >
                    <span
                      aria-hidden="true"
                      className="text-[#5eead4]"
                    >
                      •
                    </span>
                    <span>{consideration}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Next Step */}
            <div className="rounded-2xl border border-[#14b8a6]/30 bg-[#0d1b2a] p-6 shadow-xl sm:p-8">
              <h2 className="text-xl font-bold text-[#5eead4]">
                Suggested next step
              </h2>

              <p className="mt-4 leading-7 text-slate-300">
                {result.nextStep}
              </p>
            </div>

            {/* New Decision */}
            <button
              type="button"
              onClick={startNewDecision}
              className="w-full rounded-xl border border-slate-600 bg-transparent px-6 py-3.5 font-semibold text-slate-200 transition hover:border-[#5eead4] hover:text-[#5eead4] focus:outline-none focus:ring-2 focus:ring-[#5eead4] focus:ring-offset-2 focus:ring-offset-[#07111f]"
            >
              Start a New Decision
            </button>

            {/* Disclaimer */}
            <p className="pb-6 text-center text-xs leading-5 text-slate-500">
              AI-generated analysis may contain errors or assumptions. Use it
              as decision-support rather than professional advice.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}