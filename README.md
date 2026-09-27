# AI Decision Companion

An AI-powered decision-support web application that helps users compare two options based on what matters most to them. The application uses a Google Gemini language model to generate a structured analysis containing a recommendation, strengths, weaknesses, trade-offs, risks, considerations, and a suggested next step.

## Live Application

**Production URL:**  
https://ai-decision-companion.vercel.app/

## GitHub Repository 

**Repository:**  

https://github.com/ushna-k/AI-Decision-Companion.git
---

## Project Brief

AI Decision Companion is a small AI-enhanced frontend application designed to help users think through difficult choices in a structured way. Users describe a decision, provide two options, and select their main priority. The application sends this information to an AI model and presents the response in a structured format covering the recommendation, strengths, weaknesses, trade-offs, risks, and next steps. I chose this idea because decision-making is a common real-world problem and it provides a meaningful use case for AI beyond a traditional chatbot.

---

## Features

- Describe a decision in your own words
- Compare two different options
- Select the priority that matters most
- Generate an AI-powered decision analysis
- Receive a structured recommendation
- View strengths and weaknesses for both options
- Understand important trade-offs
- Identify potential risks
- Review factors that should be considered
- Get a suggested next step
- Validation for incomplete form submissions
- User-friendly error states when the AI service is unavailable
- Responsive interface for different screen sizes
- Accessible form controls and semantic structure
- Structured AI output using a schema
- Automated tests for important user flows

---

## How It Works

The application follows this flow:

1. The user opens the Decision Companion.
2. The user describes the decision they are trying to make.
3. The user enters Option A and Option B.
4. The user selects the most important priority.
5. The frontend validates the submitted information.
6. The frontend sends the decision data to the application's API route.
7. The API route sends the request to the Google Gemini model.
8. Gemini generates a structured decision analysis.
9. The application displays the analysis to the user.
10. If the AI service is temporarily unavailable, the application displays an appropriate error message instead of silently failing.

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- HTML semantic elements

### AI

- Google Gemini API
- Vercel AI SDK
- Structured AI output
- Schema-based response validation

### Testing

- Vitest
- React Testing Library
- jsdom
- `@testing-library/jest-dom`

### Development & Deployment

- Git
- GitHub
- Vercel
- Lighthouse

---

## Project Structure

```text
ai-decision-companion/
│
├── public/
│
├── src/
│   └── app/
│       ├── api/
│       │   └── analyze/
│       │       └── route.ts
│       │
│       └── decision/
│           ├── page.tsx
│           └── page.test.tsx
│
├── .env.local
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
├── next.config.ts
├── tsconfig.json
└── ...

Main Parts
src/app/decision/page.tsx

Contains the main Decision Companion interface.

It handles:

Decision input
Option inputs
Priority selection
Form validation
Submitting the decision
Loading state
Error state
Displaying the AI-generated analysis
src/app/api/analyze/route.ts

Server-side API route responsible for AI analysis.

It:

Receives the submitted decision
Validates the request
Sends the information to Gemini
Requests structured output
Handles AI/API errors
Returns the analysis to the frontend
src/app/decision/page.test.tsx

Contains automated tests for the Decision Companion interface and important user interactions.

AI Integration

The main AI capability of this project is the structured decision analysis.

Instead of using AI as a general-purpose chatbot, the application gives the model a specific decision-support task.

The user provides:

The decision they are making
Option A
Option B
Their most important priority

The AI uses this information to produce a structured analysis.

AI Output

The generated response contains:

Decision breakdown
Recommendation
Strengths of Option A
Weaknesses of Option A
Strengths of Option B
Weaknesses of Option B
Important trade-offs
Potential risks
Things to consider
Suggested next step

This makes the AI capability directly connected to the purpose of the application rather than simply adding a chatbot to the interface.

Model

The application uses Google Gemini through the Google Generative AI integration.

The model is configured in the server-side API route.

The API key is stored as an environment variable and is not exposed to the frontend.

GOOGLE_GENERATIVE_AI_API_KEY
Security

The API key is stored in .env.local during local development and should be configured as an environment variable in the deployment platform.

The API key should never be committed to GitHub.

Structured AI Output

The application uses structured output rather than relying on an unrestricted block of generated text.

The expected response follows a defined schema so that the frontend knows which sections of the analysis it should display.

This provides more predictable output and makes the AI response easier to render and maintain.

The structured response includes fields for the recommendation, strengths, weaknesses, trade-offs, risks, considerations, and suggested next step.

Error Handling & Resilience

AI services can fail because of temporary service availability, API limits, network problems, or other external issues.

The application therefore includes error handling around the AI request.

For example, when the Gemini service is temporarily unavailable, the application displays a user-friendly message such as:

The AI service is temporarily busy. Please wait a moment and try again.

Instead of exposing technical API errors to the user, the frontend presents a simpler error state.

The application also handles invalid form submissions before sending unnecessary requests to the AI service.

Examples of handled situations
Empty decision
Missing Option A
Missing Option B
Missing priority
AI service temporarily unavailable
Failed analysis request
Accessibility

Accessibility was considered during the development of the application.

The interface uses:

Semantic HTML elements
Labels associated with form controls
Keyboard-accessible form controls
Clear form structure
Visible focus states
Accessible buttons
Readable text
Responsive layout
Clear error messaging

The application was checked using Lighthouse accessibility auditing.

Lighthouse Accessibility Score

100 / 100

No accessibility issues were reported by the Lighthouse audit used during development.

Performance

The application was tested using Chrome Lighthouse.

The latest local Lighthouse audit produced the following results:

Category	Score
Performance	96
Accessibility	100
Best Practices	100
SEO	100

The performance score improved during development after reviewing Lighthouse diagnostics and optimizing the application.

Performance considerations

The application keeps the interface relatively small and focused. It avoids unnecessary visual complexity and uses the Next.js application structure to handle rendering and routing.

The Lighthouse audit also showed that development-mode tooling can contribute to JavaScript processing time. Therefore, performance measurements should be considered most representative when testing the production build rather than the Next.js development server.

Testing

Automated tests were added using Vitest and React Testing Library.

The tests focus on important user-facing behavior rather than implementation details.

Current Test Results
Test Files  1 passed (1)
Tests       3 passed (3)

The test suite currently covers:

1. Form validation

Checks that validation errors appear when the user submits the form without providing the required information.

2. Valid submission

Checks that a valid decision can be submitted successfully.

3. AI analysis display

Checks that the AI Decision Analysis result is displayed after a successful analysis request.

Running Tests

Install dependencies:

npm install

Run the test suite:

npm test

To run Vitest directly:

npx vitest
Local Development
Prerequisites

Make sure you have:

Node.js installed
npm installed
A Google Gemini API key
Installation

Clone the repository:

git clone [PASTE YOUR GITHUB REPOSITORY URL HERE]

Move into the project directory:

cd ai-decision-companion

Install dependencies:

npm install
Environment Variables

Create a file named:

.env.local

Add your Gemini API key:

GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here

Do not commit .env.local to GitHub.

Start the Development Server

Run:

npm run dev

Then open:

http://localhost:3000

The Decision Companion is available at:

http://localhost:3000/decision
Production Build

To create a production build:

npm run build

To start the production server:

npm run start
Deployment

The application is designed for deployment using Vercel.

Deployment Steps
Push the project to GitHub.
Import the repository into Vercel.
Configure the required environment variable:
GOOGLE_GENERATIVE_AI_API_KEY
Deploy the application.
Open the production URL.
Test the Decision Companion.
Verify that AI analysis works in production.
Deployment Checklist
Application
 Application builds successfully
 Main decision flow works
 AI analysis is integrated
 Form validation is implemented
 Error handling is implemented
 Responsive layout is implemented
AI
 Gemini API integration implemented
 API key stored using environment variables
 Structured AI output implemented
 AI failure state implemented
Testing
 Vitest configured
 React Testing Library configured
 Automated tests added
 Tests passing
Accessibility
 Lighthouse accessibility audit completed
 Accessibility score: 100
 Form controls have labels
 Keyboard interaction considered
Performance
 Lighthouse audit completed
 Performance score: 96
 Best Practices score: 100
 SEO score: 100
Deployment
 Production URL verified
 Production AI request tested
 Production environment variable verified
 Final deployment checked
Safe Failure & Recovery

The application does not assume that the AI service will always be available.

If an AI request fails, the application displays an error state instead of presenting an incomplete or misleading analysis.

A temporary AI service problem can therefore be communicated clearly to the user.

Rollback Plan

If a production deployment introduces a problem:

Identify the problematic deployment in Vercel.
Revert to the previous working deployment or redeploy the last known working commit from GitHub.
Verify the production URL.
Test the decision analysis flow again.

For code changes, Git provides the project history needed to return to a known working version.

Known Limitations
The quality of the analysis depends on the information provided by the user and the AI model's response.
AI-generated recommendations should not be treated as guaranteed or professional advice.
Gemini availability can temporarily affect the ability to generate an analysis.
AI API usage may be subject to provider limits or quotas.
The application does not make decisions on behalf of the user; it provides structured decision support.
The application currently compares two options rather than supporting an unlimited number of alternatives.
Lighthouse development-mode results can be affected by development tooling and should be validated again against the production build.
Future Improvements

Possible future improvements include:

Allowing users to compare more than two options
Adding decision history
Allowing users to save and revisit previous analyses
Adding weighted criteria for more personalized comparisons
Adding authentication for saved decisions
Improving AI fallback behavior
Adding more automated end-to-end tests
Adding monitoring and analytics for production errors
Further optimizing the production JavaScript bundle
Adding export functionality for decision reports
Design Decisions

The application intentionally focuses on one clear task instead of trying to become a general AI assistant.

The goal is to make the AI capability useful while keeping the interface simple.

The decision form collects only the information needed for the analysis:

What decision are you making?
What are the two options?
What matters most to you?

This keeps the user flow short and reduces unnecessary interaction.

The result is then organized into sections so users can scan the analysis instead of reading one large block of AI-generated text.

Reflection

Building AI Decision Companion helped me understand that integrating an AI model into an application involves more than simply sending a prompt and displaying the response.

One of the more challenging parts was making the AI response predictable enough for a real interface. A free-form AI response can change its structure, so using structured output made it easier to design a reliable result interface.

Another challenge was handling failures from an external AI service. The model may be temporarily unavailable or experience high demand, so the application needs to communicate those failures clearly instead of leaving the user wondering whether their request worked.

Testing also changed how I approached the application. Rather than only checking the application manually, I added automated tests for validation and the main analysis flow. This provided more confidence that important user interactions continued to work after changes.

The Lighthouse audit was another useful part of the process. It showed that a small application can achieve strong accessibility and performance scores while still having areas that can be improved. The final local audit achieved 96 Performance, 100 Accessibility, 100 Best Practices, and 100 SEO.

The biggest lesson from this project was that a production-ready application is not just about getting the main feature to work. It also requires validation, error handling, testing, accessibility, performance checks, documentation, and a plan for what happens when something goes wrong.

Disclaimer

AI Decision Companion is a decision-support tool.

AI-generated analysis may contain errors, assumptions, or incomplete information. Users should consider the analysis as one input into their decision-making process and remain responsible for their final decisions.

Author

Ushna Kamran

Computer Science Student

LinkedIn: www.linkedin.com/in/ushna-kamran