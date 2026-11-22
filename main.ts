// TikTok ad entry for the make.fun "bring-the-humans-03" bounty.
//
// What this program does: it takes the VIDEO.json that ships with this
// entry (it names the TikTok video that was posted for the bounty) and
// copies it into the harness output directory, then checks the copy is
// a well-formed JSON object carrying a usable video URL.
//
// The bot directory comes from MAKEFUN_BOT_DIR (default "/bot") and the
// output directory from MAKEFUN_OUTPUT_DIR (default "/output").
//
// The program fails loudly (non-zero exit) when the copy fails, when the
// copied file is not valid JSON, or when the parsed value has no
// non-empty string "url" field — so a broken entry can never pass
// silently as a valid submission.

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const sourcePath = join(botDir, "VIDEO.json");
const targetPath = join(outDir, "VIDEO.json");

try {
  mkdirSync(outDir, { recursive: true });
  copyFileSync(sourcePath, targetPath);
} catch (err) {
  console.error(
    `Could not copy VIDEO.json from ${sourcePath} to ${targetPath}: ${(err as Error).message}`,
  );
  process.exit(1);
}

let parsed: unknown;
try {
  parsed = JSON.parse(readFileSync(targetPath, "utf8"));
} catch (err) {
  console.error(`Copied VIDEO.json is not valid JSON: ${(err as Error).message}`);
  process.exit(1);
}

const record = parsed as Record<string, unknown>;
if (
  typeof parsed !== "object" ||
  parsed === null ||
  typeof record.url !== "string" ||
  record.url.trim() === ""
) {
  console.error('VIDEO.json must be a JSON object with a non-empty string "url" field.');
  process.exit(1);
}

// The bounty is a TikTok ad, so the named video has to be a TikTok
// watch URL — anything else (a wrong platform, a typo, a bare id)
// is rejected instead of being passed on as a valid entry.
if (!record.url.startsWith("https://www.tiktok.com/")) {
  console.error(
    `VIDEO.json "url" must start with https://www.tiktok.com/ — got: ${record.url}`,
  );
  process.exit(1);
}

console.log(`Entry OK — posted video: ${record.url}`);
