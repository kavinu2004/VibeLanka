#!/usr/bin/env node
// Generates codebase-snapshot.md at repo root for the Build Lead chat.
// Concatenates source files into one markdown doc; lists image asset filenames.
// Run with `npm run snapshot`. Output is gitignored — never commit it.

const { readdirSync, readFileSync, writeFileSync, statSync } = require("node:fs");
const { join, extname } = require("node:path");

const ROOT = process.cwd();
const OUT = join(ROOT, "codebase-snapshot.md");

const SOURCE_DIRS = ["app", "components", "lib"];
const IMAGE_DIR = "public/images";
const ROOT_CONFIGS = ["package.json", "jsconfig.json", "next.config.mjs"];
const SOURCE_EXTS = new Set([".js", ".jsx", ".css"]);
const LANG = {
  ".js": "js",
  ".jsx": "jsx",
  ".css": "css",
  ".mjs": "js",
  ".json": "json",
};

function walk(dir, out = []) {
  for (const entry of readdirSync(join(ROOT, dir), { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const rel = join(dir, entry.name);
    if (entry.isDirectory()) walk(rel, out);
    else out.push(rel);
  }
  return out;
}

function exists(p) {
  try { statSync(join(ROOT, p)); return true; } catch { return false; }
}

const sourceFiles = SOURCE_DIRS
  .flatMap((d) => (exists(d) ? walk(d) : []))
  .filter((f) => SOURCE_EXTS.has(extname(f)))
  .sort();

const configFiles = ROOT_CONFIGS.filter(exists);
const imageFiles = exists(IMAGE_DIR) ? walk(IMAGE_DIR).sort() : [];
const textFiles = [...configFiles, ...sourceFiles];

let totalLines = 0;
const sections = textFiles.map((f) => {
  const content = readFileSync(join(ROOT, f), "utf8");
  totalLines += content.split("\n").length;
  const lang = LANG[extname(f)] || "";
  return `## ${f}\n\n\`\`\`${lang}\n${content}\n\`\`\``;
});

const imageSection = imageFiles.length
  ? `## ${IMAGE_DIR} — asset filenames (binary, contents omitted)\n\n` +
    imageFiles.map((f) => `- \`${f}\``).join("\n")
  : "";

const header = `# Vibe Lanka — codebase snapshot

Generated: ${new Date().toISOString()}
Text files included: ${textFiles.length}
Image filenames listed: ${imageFiles.length}
Total lines (text files): ${totalLines}

---`;

const footer = `---

Generated snapshot, never committed. Regenerate with \`npm run snapshot\`.`;

const output = [header, sections.join("\n\n"), imageSection, footer]
  .filter(Boolean)
  .join("\n\n") + "\n";

writeFileSync(OUT, output);
console.log(
  `Wrote ${OUT}: ${textFiles.length} text files + ${imageFiles.length} image filenames, ${totalLines} lines.`,
);
