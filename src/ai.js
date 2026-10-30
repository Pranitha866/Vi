// ai.js - asks the Gemini AI to create a lesson for ANY topic (fast + with a diagram layout)
 
const API_KEY = import.meta.env?.VITE_GEMINI_API_KEY;
 
// Fast model first. If one is not available, the next one is tried automatically.
const MODELS = ["gemini-3.5-flash-lite", "gemini-3.1-flash-lite", "gemini-3.6-flash", "gemini-3.8-flash"];
 
function buildPrompt(topic) {
  return `Make a short lesson about "${topic}" for students.
Return ONLY JSON in this shape:
{"title":"1-3 words","layout":"cycle|flow|tree|layers",
"def":["school definition","college definition"],
"nodes":[{"l":"1-2 word label","i":"one emoji","t":"step title","s":["school, 1 sentence","college, 1 sentence"]}],
"terms":[["term","school meaning","college meaning"]],
"real":["school example","college example"],
"quiz":[["question?",["A","B","C","D"],0,"why"]]}
Rules: exactly 4 nodes in order, 3 terms, 3 quiz questions (correct index 0-3, vary it).
layout: cycle = something that repeats in a loop; flow = a process from start to end; tree = one main thing splitting into 3 parts or types; layers = stacked levels.
School = ages 10-14 simple words. College = technical. Keep every sentence short.`;
}
 
// Where the 4 nodes sit for each diagram layout. pts = path the moving dot follows.
function layoutFor(name) {
  if (name === "cycle") {
    const pts = [];
    for (let k = 0; k < 24; k++) {
      const a = ((-90 + k * 15) * Math.PI) / 180;
      pts.push([Math.round(200 + 80 * Math.cos(a)), Math.round(125 + 80 * Math.sin(a))]);
    }
    const p = [0, 6, 12, 18];
    return { open: false, pts, p, pos: p.map((k) => pts[k]) };
  }
  if (name === "tree") {
    return {
      open: true,
      pts: [[200, 50], [70, 190], [200, 50], [200, 190], [200, 50], [330, 190]],
      p: [0, 1, 3, 5],
      pos: [[200, 50], [70, 190], [200, 190], [330, 190]],
    };
  }
  if (name === "layers") {
    return {
      open: true,
      pts: [[335, 45], [335, 100], [335, 155], [335, 210]],
      p: [0, 1, 2, 3],
      pos: [[200, 45], [200, 100], [200, 155], [200, 210]],
      box: [330, 48],
    };
  }
  // flow (default)
  return {
    open: true,
    pts: [[55, 120], [152, 120], [248, 120], [345, 120]],
    p: [0, 1, 2, 3],
    pos: [[55, 120], [152, 120], [248, 120], [345, 120]],
  };
}
 
const two = (a) => (Array.isArray(a) && a.length >= 2 ? [String(a[0]), String(a[1])] : null);
 
// Checks the AI answer has the shape the app needs
export function normalize(j) {
  const bad = () => { throw new Error("BAD_FORMAT"); };
  const def = two(j.def);
  const real = two(j.real);
  if (!def || !real) bad();
  if (!Array.isArray(j.nodes) || j.nodes.length < 4) bad();
  if (!Array.isArray(j.terms) || !j.terms.length) bad();
  if (!Array.isArray(j.quiz) || !j.quiz.length) bad();
 
  const layoutName = ["cycle", "flow", "tree", "layers"].includes(j.layout) ? j.layout : "flow";
  const lay = layoutFor(layoutName);
 
  const nodes = j.nodes.slice(0, 4).map((n, i) => {
    const s = two(n.s);
    if (!s) bad();
    const node = {
      l: String(n.l), t: String(n.t), icon: String(n.i || "•"),
      x: lay.pos[i][0], y: lay.pos[i][1], p: lay.p[i], s,
    };
    if (lay.box) { node.bw = lay.box[0]; node.bh = lay.box[1]; }
    return node;
  });
  const terms = j.terms.slice(0, 4).map((x) => {
    if (!Array.isArray(x) || x.length < 3) bad();
    return [String(x[0]), String(x[1]), String(x[2])];
  });
  const quiz = j.quiz.slice(0, 3).map((q) => {
    if (!Array.isArray(q) || !Array.isArray(q[1]) || q[1].length < 2 || typeof q[2] !== "number") bad();
    return [String(q[0]), q[1].slice(0, 4).map(String), q[2], String(q[3] || "")];
  });
  return {
    title: String(j.title || "").trim(),
    layout: layoutName, open: lay.open, pts: lay.pts,
    def, nodes, terms, real, quiz,
  };
}
 
export async function generateTopic(topic) {
  if (!API_KEY) throw new Error("NO_KEY");
 
  let lastErr = new Error("HTTP_404");
  for (const model of MODELS) {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": API_KEY },
        body: JSON.stringify({
          contents: [{ parts: [{ text: buildPrompt(topic.slice(0, 80)) }] }],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.4,
            maxOutputTokens: 2500,
          },
        }),
      }
    );
    if (res.status === 404 || res.status === 503 || res.status === 429) { lastErr = new Error("HTTP_" + res.status); continue; }
    if (!res.ok) throw new Error("HTTP_" + res.status);
 
    const data = await res.json();
    const text = (data.candidates?.[0]?.content?.parts || []).map((p) => p.text || "").join("");
    const json = JSON.parse(text.replace(/```json|```/g, "").trim());
    return normalize(json);
  }
  throw lastErr;
}
 