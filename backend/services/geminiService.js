import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// gemini-2.5-flash: best balance of speed, accuracy, and cost
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

// ─────────────────────────────────────────────────────────────────────────────
// Shared formatting rule injected into every prompt to strip unwanted symbols
// ─────────────────────────────────────────────────────────────────────────────
const FORMATTING_RULES = `
STRICT FORMATTING RULES — you MUST follow these without exception:
- Do NOT use any special symbols or decorative characters such as: *, #, @, $, %, ^, &, ~, |, \\, /, <, >, =, +, -, _, backticks, bullet dashes, or emojis.
- Do NOT use markdown syntax of any kind (no bold, no italic, no headers, no lists with dashes or asterisks, no code blocks).
- Write all text in plain, clean, natural English sentences and paragraphs only.
- Do NOT add any filler phrases like "Certainly!", "Of course!", "Sure!", "Great question!", or "I hope this helps!".
- Be direct, factual, and professional at all times.
`;

// ─────────────────────────────────────────────────────────────────────────────
// Helper: strip any leftover markdown/symbols from AI text responses
// ─────────────────────────────────────────────────────────────────────────────
const cleanText = (text) => {
  return text
    .replace(/```[\s\S]*?```/g, '')   // Remove code blocks
    .replace(/`/g, '')                // Remove backticks
    .replace(/\*\*/g, '')             // Remove bold markdown
    .replace(/\*/g, '')               // Remove asterisks
    .replace(/^#{1,6}\s+/gm, '')      // Remove markdown headers
    .replace(/^[-_]{3,}$/gm, '')      // Remove horizontal rules
    .replace(/^\s*[-*+]\s+/gm, '')    // Remove bullet dashes
    .replace(/^>\s+/gm, '')           // Remove blockquotes
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove markdown links, keep text
    .replace(/\n{3,}/g, '\n\n')       // Collapse excessive blank lines
    .trim();
};

// ─────────────────────────────────────────────────────────────────────────────
/**
 * Analyze a meeting transcript using Gemini AI.
 * Returns: { summary, keyPoints, actionItems, sentiment, participants }
 */
// ─────────────────────────────────────────────────────────────────────────────
export const analyzeMeetingTranscript = async (transcript, title = 'Meeting') => {
  const prompt = `
You are a highly skilled professional meeting analyst with deep expertise in business communication, project management, and organizational behavior. Your job is to extract the most accurate and meaningful insights from meeting transcripts.

You will now analyze the meeting transcript provided below.

Meeting Title: ${title}

Transcript:
${transcript}

Your task is to produce a thorough and accurate analysis. Think carefully before writing each section. Read the entire transcript before forming any conclusions.

Return ONLY a single valid JSON object. Do not include any text before or after the JSON. Do not include markdown. Do not include code fences.

Use this exact JSON structure:
{
  "summary": "Write 3 to 5 complete sentences that capture what the meeting was about, the main topics discussed, the decisions made, and any important outcomes. Be specific and factual. Do not use vague language.",
  "keyPoints": [
    "Each item is a complete sentence describing one important point, decision, or topic that was discussed. Be specific. Write between 4 and 8 items depending on the content.",
    "Capture disagreements, agreements, questions raised, and conclusions reached.",
    "Include any numbers, dates, names, or figures that were mentioned in the discussion."
  ],
  "actionItems": [
    {
      "task": "A clear, specific description of the action item written as a task. Start with a verb. Example: Review the Q3 budget report and prepare a summary.",
      "assignee": "Full name of the person responsible. Leave as empty string if not mentioned.",
      "dueDate": "The deadline exactly as mentioned in the meeting. Leave as empty string if not mentioned."
    }
  ],
  "sentiment": "Choose exactly one of these three values based on the overall tone and mood of the meeting: positive, neutral, or negative. positive means the meeting was constructive, productive, and forward-moving. neutral means it was informational or mixed. negative means there was tension, conflict, or unresolved frustration.",
  "participants": ["List the full name of every person who spoke or was clearly mentioned in the transcript. Leave as empty array if no names are found."]
}

Additional analysis rules:
- Only extract action items that have a clear, concrete next step. Do not include vague intentions.
- If the transcript is too short or unclear to determine something, write an empty string or empty array for that field. Never guess or fabricate information.
- The summary and key points must reflect what was actually said, not what you assume was meant.
- Do not include any formatting symbols, markdown, or decorative characters inside any string values.

${FORMATTING_RULES}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  // Strip any markdown code fences if the model added them despite instructions
  const cleaned = text
    .replace(/```json\n?/gi, '')
    .replace(/```\n?/g, '')
    .trim();

  const parsed = JSON.parse(cleaned);

  // Clean all string fields to remove any stray symbols
  parsed.summary = cleanText(parsed.summary || '');
  parsed.keyPoints = (parsed.keyPoints || []).map((p) => cleanText(p));
  parsed.actionItems = (parsed.actionItems || []).map((item) => ({
    ...item,
    task: cleanText(item.task || ''),
    assignee: cleanText(item.assignee || ''),
    dueDate: cleanText(item.dueDate || ''),
  }));
  parsed.participants = (parsed.participants || []).map((p) => cleanText(p));

  return parsed;
};

// ─────────────────────────────────────────────────────────────────────────────
/**
 * Generate a professional follow-up email based on meeting summary.
 */
// ─────────────────────────────────────────────────────────────────────────────
export const generateFollowUpEmail = async (meeting) => {
  const { title, summary, actionItems, participants } = meeting;

  const actionItemsText = actionItems
    .map(
      (item, i) =>
        `${i + 1}. ${item.task}${item.assignee ? ` (Owner: ${item.assignee})` : ''}${item.dueDate ? `. Due by ${item.dueDate}` : ''}.`
    )
    .join('\n');

  const prompt = `
You are a senior executive assistant who writes clear, professional, and concise business emails. Your emails are always polished, free of filler language, and immediately useful to the reader.

Write a follow-up email for the meeting described below.

Meeting Title: ${title}
Attendees: ${participants.join(', ') || 'the team'}

Meeting Summary:
${summary}

Action Items:
${actionItemsText || 'No specific action items were identified.'}

Email writing rules:
- Begin with a subject line in the format: Subject: Follow-Up on [Meeting Title]
- Open with a brief, professional sentence thanking attendees or referencing the meeting.
- Write a short recap paragraph summarizing what was discussed and decided.
- List each action item clearly in plain prose. Do not use dashes, bullets, or numbered lists with symbols. Instead, write each action item as a sentence within a paragraph or as a clearly separated line starting with the owner name or task description.
- Close with a professional sign-off such as "Please reach out if you have any questions."
- End with: Best regards, [Your Name]
- The entire email must be written in plain text with no markdown, no symbols, no bold, no bullet points, and no decorative characters.
- Keep the tone warm but professional.

${FORMATTING_RULES}
`;

  const result = await model.generateContent(prompt);
  return cleanText(result.response.text());
};

// ─────────────────────────────────────────────────────────────────────────────
/**
 * Answer a question about a specific meeting using its transcript.
 */
// ─────────────────────────────────────────────────────────────────────────────
export const askAboutMeeting = async (transcript, question, title = 'Meeting') => {
  const prompt = `
You are a knowledgeable and precise AI assistant. A user is asking a question about a specific business meeting. Your job is to provide an accurate, well-reasoned answer based strictly on the content of the meeting transcript provided.

Meeting Title: ${title}

Meeting Transcript:
${transcript}

User Question: ${question}

Instructions for your answer:
- Read the entire transcript carefully before forming your answer.
- Answer the question directly and specifically using only information found in the transcript.
- If the answer is clearly stated in the transcript, quote or paraphrase it accurately.
- If the answer requires combining information from multiple parts of the transcript, do so thoughtfully.
- If the information needed to answer the question is not present in the transcript, respond with this exact phrase: "The transcript does not contain enough information to answer that question." Then explain briefly what information would be needed.
- Never guess, infer beyond what is stated, or fabricate details.
- Write your answer in clear, complete sentences.
- Keep your answer focused and as concise as the question allows, but do not omit important context.

${FORMATTING_RULES}
`;

  const result = await model.generateContent(prompt);
  return cleanText(result.response.text());
};
