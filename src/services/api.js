/**
 * API Service Layer for ralph.world dashboard
 *
 * Central abstraction for all external data sources.
 * Each service returns static fallback data when API keys are missing,
 * making development seamless without credentials.
 *
 * To enable live data, set keys in .env.local:
 *   VITE_APIFY_TOKEN=...
 *   VITE_ELEVENLABS_KEY=...
 *   VITE_OPENAI_KEY=...
 */

const APIFY_TOKEN = import.meta.env.VITE_APIFY_TOKEN;
const ELEVENLABS_KEY = import.meta.env.VITE_ELEVENLABS_KEY;
const OPENAI_KEY = import.meta.env.VITE_OPENAI_KEY;

// Simple in-memory cache with TTL
const cache = new Map();

function cached(key, ttlMs, fetcher) {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.ts < ttlMs) {
    return Promise.resolve(entry.data);
  }
  return fetcher().then((data) => {
    cache.set(key, { data, ts: Date.now() });
    return data;
  });
}

// ─── APIFY: Trending Data ───────────────────────────────────────────

/**
 * Fetch trending topics from Apify scrapers.
 * Falls back to static content.js data when no token is set.
 *
 * Expected Apify actor output shape:
 *   [{ platform, icon, color, metric, topic, detail }]
 *
 * Replace ACTOR_ID with your actual Apify actor task ID.
 */
export async function fetchTrending() {
  if (!APIFY_TOKEN) return null; // signals caller to use static data

  const ACTOR_ID = "your-apify-actor-id";
  const url = `https://api.apify.com/v2/actor-tasks/${ACTOR_ID}/run-sync-get-dataset-items?token=${APIFY_TOKEN}`;

  return cached("trending", 60 * 60 * 1000, async () => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Apify: ${res.status}`);
    return res.json();
  });
}

// ─── TICKER: Live News Feed ─────────────────────────────────────────

/**
 * Fetch live ticker items from a CMS or API.
 * Replace with your actual endpoint.
 */
export async function fetchTicker() {
  // TODO: Replace with CMS endpoint
  // const res = await fetch("https://api.ralph.world/ticker");
  // return res.json();
  return null; // use static
}

// ─── LAUNCHES: Project Data ─────────────────────────────────────────

/**
 * Fetch latest launches from CMS/backend.
 */
export async function fetchLaunches() {
  // TODO: Replace with CMS endpoint
  // const res = await fetch("https://api.ralph.world/launches");
  // return res.json();
  return null; // use static
}

// ─── INDUSTRY: Market Data ──────────────────────────────────────────

/**
 * Fetch industry pulse data.
 * Could connect to financial APIs, internal dashboards, etc.
 */
export async function fetchIndustryData() {
  // TODO: Connect to data source
  return null; // use static
}

// ─── ELEVENLABS: Voice Generation ───────────────────────────────────

/**
 * Generate audio digest using ElevenLabs TTS.
 * Returns an audio Blob URL for playback.
 *
 * @param {string} script - The text to speak
 * @param {string} voiceId - ElevenLabs voice ID
 * @returns {Promise<string|null>} blob URL or null
 */
export async function generateVoice(script, voiceId = "21m00Tcm4TlvDq8ikWAM") {
  if (!ELEVENLABS_KEY) return null;

  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": ELEVENLABS_KEY,
      },
      body: JSON.stringify({
        text: script,
        model_id: "eleven_multilingual_v2",
        voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      }),
    }
  );

  if (!res.ok) throw new Error(`ElevenLabs: ${res.status}`);
  const blob = await res.blob();
  return URL.createObjectURL(blob);
}

// ─── OPENAI: Script Generation ──────────────────────────────────────

/**
 * Generate a podcast-style script summarizing the dashboard content.
 *
 * @param {object} context - Current dashboard data
 * @returns {Promise<string|null>} Generated script or null
 */
export async function generateScript(context) {
  if (!OPENAI_KEY) return null;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a witty, concise podcast host summarizing the ralph.world dashboard. Keep it under 300 words, conversational tone.",
        },
        {
          role: "user",
          content: `Summarize today's dashboard:\n${JSON.stringify(context, null, 2)}`,
        },
      ],
      max_tokens: 500,
    }),
  });

  if (!res.ok) throw new Error(`OpenAI: ${res.status}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content || null;
}

// ─── MAGAZINE: Daily Quote ──────────────────────────────────────────

/**
 * Fetch daily quote from magazine PDF chatbot.
 * Replace with actual chatbot API endpoint.
 */
export async function fetchDailyQuote() {
  // TODO: Replace with ralph magazine chatbot endpoint
  // const res = await fetch("https://api.ralph.world/magazine/daily-quote");
  // return res.json();
  return null; // use static
}

// ─── ARCHIVE: Past Content ──────────────────────────────────────────

/**
 * Fetch archive items from CMS.
 */
export async function fetchArchive() {
  // TODO: Replace with CMS endpoint
  return null; // use static
}
