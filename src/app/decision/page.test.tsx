import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";
import DecisionPage from "./page";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("AI Decision Companion", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("renders the decision form correctly", () => {
    render(<DecisionPage />);

    expect(
      screen.getByRole("heading", {
        name: "AI Decision Companion",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("What decision are you making?")
    ).toBeInTheDocument();

    expect(screen.getByLabelText("Option A")).toBeInTheDocument();

    expect(screen.getByLabelText("Option B")).toBeInTheDocument();

    expect(
      screen.getByLabelText("What matters most to you?")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Analyze My Decision",
      })
    ).toBeInTheDocument();
  });

  it("shows validation errors when the form is submitted empty", async () => {
    const user = userEvent.setup();

    render(<DecisionPage />);

    await user.click(
      screen.getByRole("button", {
        name: "Analyze My Decision",
      })
    );

    expect(
      screen.getByText("Please describe the decision you are making.")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Please enter Option A.")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Please enter Option B.")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Please select what matters most to you.")
    ).toBeInTheDocument();
  });

  it("submits a valid decision and displays the AI analysis", async () => {
    const user = userEvent.setup();

    const mockAnalysis = {
      summary:
        "The user is comparing two internship options based on career growth.",

      recommendation:
        "Both options can support career growth. Compare mentorship, project quality, and learning opportunities.",

      optionA: {
        strengths: [
          "Flexible schedule and no commute.",
          "Develops remote collaboration skills.",
        ],
        weaknesses: [
          "Fewer spontaneous networking opportunities.",
        ],
      },

      optionB: {
        strengths: [
          "More direct mentorship and networking.",
          "Greater exposure to workplace culture.",
        ],
        weaknesses: [
          "Requires commuting and has less flexibility.",
        ],
      },

      tradeoffs: [
        "Flexibility versus direct workplace interaction.",
      ],

      risks: [
        "The remote option may provide less informal mentorship.",
      ],

      considerations: [
        "Compare the actual mentorship structure of both internships.",
      ],

      nextStep:
        "Ask both teams about mentorship, project scope, and feedback frequency.",
    };

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        headers: {
          get: (name: string) =>
            name.toLowerCase() === "content-type"
              ? "application/json"
              : null,
        },
        json: async () => mockAnalysis,
      })
    );

    render(<DecisionPage />);

    await user.type(
      screen.getByLabelText("What decision are you making?"),
      "Should I choose a remote or on-site internship?"
    );

    await user.type(
      screen.getByLabelText("Option A"),
      "Remote internship"
    );

    await user.type(
      screen.getByLabelText("Option B"),
      "On-site internship"
    );

    await user.selectOptions(
      screen.getByLabelText("What matters most to you?"),
      "Career growth"
    );

    await user.click(
      screen.getByRole("button", {
        name: "Analyze My Decision",
      })
    );

    expect(fetch).toHaveBeenCalledWith(
      "/api/analyze",
      expect.objectContaining({
        method: "POST",
      })
    );

    expect(
      await screen.findByText("AI Decision Analysis")
    ).toBeInTheDocument();

    expect(
      screen.getByText(mockAnalysis.recommendation)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "Remote internship",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "On-site internship",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(mockAnalysis.nextStep)
    ).toBeInTheDocument();
  });
});