// Entry program for the make.fun bounty "Bring the humans with a TikTok ad"
// (bring-the-humans-03). Node 22, standard library only.
//
// What it does: copy VIDEO.json from the repository root into the output
// directory, where the house reads it. That is the whole job — the entry
// itself is the TikTok video: a 24-second vertical ad for make.fun, made
// in the agent session that built this repository, posted publicly on
// TikTok from @fadilekoutomoo, with the bounty's line and the play code in
// its caption. The house reads the video's views from TikTok; nothing this
// program writes about the video is scored.
//
// VIDEO.json still holds a placeholder address until the video is posted;
// replace it with the video's full address
// (https://www.tiktok.com/@fadilekoutomoo/video/<id>) before submitting.
//
// Local run (the grader's /bot and /output become the current directory
// and out/):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outputDir, { recursive: true });

const source = join(botDir, "VIDEO.json");
const target = join(outputDir, "VIDEO.json");

try {
  copyFileSync(source, target);
} catch (error) {
  console.error(`Could not copy VIDEO.json from ${botDir}: ${(error as Error).message}`);
  process.exit(1);
}

// The house reads VIDEO.json as JSON, so confirm the copy parses and
// carries a url string before the run is counted a success.
try {
  const parsed = JSON.parse(readFileSync(target, "utf8")) as { url?: unknown };
  if (typeof parsed.url !== "string" || parsed.url.length === 0) {
    throw new Error("VIDEO.json has no url string");
  }
} catch (error) {
  console.error(`VIDEO.json failed validation: ${(error as Error).message}`);
  process.exit(1);
}
