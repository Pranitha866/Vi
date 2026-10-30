import { useState } from "react";
import { D, ALIAS } from "./data.js";
import Diagram from "./diagram.jsx";
import Quiz from "./quiz.jsx";
import { generateTopic } from "./ai.js";

const TERM_HINT = "Tap a term to see its meaning.";

// Load AI-generated topics saved in the browser.
function loadSaved() {
  try {
    return JSON.parse(localStorage.getItem("vv-topics")) || {};
  } catch {
    return {};
  }
}

function errorText(e) {
  const m = e.message;

  if (m === "NO_KEY")
    return "AI key not found. Add VITE_GEMINI_API_KEY to .env.local and restart the server.";

  if (m === "HTTP_400" || m === "HTTP_403")
    return "The AI key may be invalid or not permitted. Check .env.local.";

  if (m === "HTTP_429")
    return "Too many requests. Please wait a minute and try again.";

  if (m === "HTTP_404")
    return "The AI model is unavailable. Check the model names in ai.js.";

  if (m === "BAD_FORMAT" || e.name === "SyntaxError")
    return "The AI returned an unreadable lesson. Please try again.";

  return "Could not reach the AI (" + m + "). Check your internet and try again.";
}

// Normalize text for comparisons.
function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Calculate spelling distance.
function editDistance(a, b) {
  const dp = Array.from(
    { length: a.length + 1 },
    () => Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }

  return dp[a.length][b.length];
}

// Find the closest existing topic or alias (only for small spelling mistakes).
function findSimilarTopic(query, topics) {
  const input = normalizeText(query);

  // Short words must match exactly.
  if (input.length < 6) return null;

  let bestMatch = null;
  let bestDistance = Infinity;

  for (const topic of topics) {
    const name = normalizeText(topic);

    if (name.length < 6) continue;
    if (input[0] !== name[0]) continue; // same first letter
    if (Math.abs(input.length - name.length) > 2) continue; // similar length

    const distance = editDistance(input, name);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestMatch = topic;
    }
  }

  // Allow 1 wrong letter for shorter names, 2 for longer ones.
  const allowed = input.length <= 9 ? 1 : 2;
  return bestDistance <= allowed ? bestMatch : null;
}

// Resolve a topic or alias to an existing topic name.
function resolveExistingTopic(query, all) {
  const normalized = normalizeText(query);
  const topics = Object.keys(all);

  const exactTopic = topics.find(
    (name) => normalizeText(name) === normalized
  );

  if (exactTopic) return exactTopic;

  const aliasKey = Object.keys(ALIAS).find(
    (name) => normalizeText(name) === normalized
  );

  if (aliasKey && all[ALIAS[aliasKey]]) {
    return ALIAS[aliasKey];
  }

  const similar = findSimilarTopic(query, [
    ...topics,
    ...Object.keys(ALIAS),
  ]);

  if (!similar) return null;

  const similarKey = normalizeText(similar);

  const matchedTopic = topics.find(
    (name) => normalizeText(name) === similarKey
  );

  if (matchedTopic) return matchedTopic;

  const matchedAlias = Object.keys(ALIAS).find(
    (name) => normalizeText(name) === similarKey
  );

  if (matchedAlias && all[ALIAS[matchedAlias]]) {
    return ALIAS[matchedAlias];
  }

  return null;
}

export default function App() {
  const [topic, setTopic] = useState("Electric circuit");
  const [L, setL] = useState(0);
  const [query, setQuery] = useState("");
  const [msg, setMsg] = useState("");
  const [act, setAct] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [tdef, setTdef] = useState(TERM_HINT);
  const [extra, setExtra] = useState(loadSaved);
  const [loading, setLoading] = useState(false);

  const all = { ...D, ...extra };
  const d = all[topic];

  if (!d) {
    return (
      <main>
        <h1>VisualVerse</h1>
        <p>Unable to load this topic. Please choose another topic.</p>
        <button onClick={() => setTopic("Electric circuit")}>
          Return to Electric circuit
        </button>
      </main>
    );
  }

  const node = d.nodes[act] || d.nodes[0];

  function load(name) {
    setTopic(name);
    setAct(0);
    setPlaying(false);
    setMsg("");
    setTdef(TERM_HINT);
  }

  async function search() {
    const raw = query.trim();

    if (!raw || loading) return;

    // First try existing topics, including small spelling corrections.
    const existing = resolveExistingTopic(raw, all);

    if (existing) {
      setQuery("");
      load(existing);
      return;
    }

    // For new topics, Gemini can interpret the user's input.
    setLoading(true);
    setMsg(`Understanding "${raw}" and preparing your lesson...`);

    try {
      const { title, ...data } = await generateTopic(raw);
      const name = String(title || raw).trim();

      if (!name) {
        throw new Error("BAD_FORMAT");
      }

      // Reuse an existing topic if Gemini returns its name.
      const existingResult = Object.keys(all).find(
        (key) => normalizeText(key) === normalizeText(name)
      );

      if (existingResult) {
        setQuery("");
        load(existingResult);
        return;
      }

      // Save newly generated topics.
      const next = {
        ...extra,
        [name]: { ...data, center: name },
      };

      setExtra(next);

      try {
        localStorage.setItem("vv-topics", JSON.stringify(next));
      } catch {
        // The lesson can still be displayed if storage is unavailable.
      }

      setQuery("");
      load(name);
    } catch (e) {
      setMsg(errorText(e));
    } finally {
      setLoading(false);
    }
  }

  function clearSaved() {
    try {
      localStorage.removeItem("vv-topics");
    } catch {
      // Ignore storage errors.
    }

    setExtra({});

    if (!D[topic]) {
      load("Electric circuit");
    }
  }

  function changeLevel(level) {
    setL(level);
    setTdef(TERM_HINT);
  }

  return (
    <main>
      <h1>VisualVerse</h1>

      <div className="sub">
        Search any topic. Watch it move, then check what you learned.{" "}
        <small>React + AI</small>
      </div>

      <div className="row">
        <div className="seg">
          <button
            className={L === 0 ? "on" : ""}
            onClick={() => changeLevel(0)}
          >
            School
          </button>

          <button
            className={L === 1 ? "on" : ""}
            onClick={() => changeLevel(1)}
          >
            College
          </button>
        </div>
      </div>

      <div className="row">
        <input
          type="text"
          placeholder='Type any topic, e.g. "black hole"'
          aria-label="Topic"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") search();
          }}
        />
      </div>

      <div className="row">
        <button className="go" onClick={search} disabled={loading}>
          {loading ? "Loading..." : "Show me"}
        </button>
      </div>

      <div className="row">
        {Object.keys(all).map((name) => (
          <button
            key={name}
            className={"chip" + (name === topic ? " on" : "")}
            onClick={() => load(name)}
          >
            {name}
          </button>
        ))}
      </div>

      {Object.keys(extra).length > 0 && (
        <div className="row">
          <button onClick={clearSaved}>Clear AI topics</button>
        </div>
      )}

      {msg && <div className="hint">{msg}</div>}

      <section>
        <h2>1. Definition</h2>
        <h3>{topic}</h3>
        <p>{d.def?.[L] || "No definition available."}</p>
      </section>

      <Diagram
        key={topic}
        d={d}
        L={L}
        act={act}
        setAct={setAct}
        playing={playing}
        setPlaying={setPlaying}
      />

      <section>
        <h2>3. How it works</h2>

        <div className="step">
          Step {act + 1} of {d.nodes.length}: {node.t}
        </div>

        <p>{node.s?.[L] || "No explanation available."}</p>
      </section>

      <section>
        <h2>4. Key terms</h2>

        <div className="row">
          {(d.terms || []).map((term) => (
            <button
              key={term[0]}
              className="chip"
              onClick={() => setTdef(term[1 + L])}
            >
              {term[0]}
            </button>
          ))}
        </div>

        <p className="hint" style={{ marginTop: 0 }}>
          {tdef}
        </p>

        <hr />

        <h2>In real life</h2>
        <p>{d.real?.[L] || "No example available."}</p>
      </section>

      <section>
        <h2>5. Quiz</h2>
        <Quiz key={topic} quiz={d.quiz || []} />
      </section>
    </main>
  );
}
