export const correctionOfHTMLPrompt = (errors: string): string => `
  I validated your previous HTML response, and it contained the following errors:
  ${errors}

  Please provide a corrected version of the HTML content.

  IMPORTANT INSTRUCTIONS:
  1.  Respond with ONLY the raw HTML5 fragment.
  2.  The fragment should be suitable for direct placement within the <body> tags of an HTML document.
  3.  Do NOT include any introductory or concluding text, explanations, or conversational phrases (e.g., "Certainly! Here is the corrected HTML...", or "Please ensure...").
  4.  Do NOT wrap the HTML content in Markdown code fences (e.g., \`\`\`html ... \`\`\`).
  5.  Ensure all HTML tags are correctly opened, closed, and nested.
  6.  The content should start directly with the first HTML tag of the fragment (e.g., <section>, <h2>, <p>).
`;
