// One Emoji, One Dream Vacation (Node 22, standard library only).
// The program writes exactly one emoji for my dream vacation — the one that
// most makes a stranger want to book the flight — to /output/entry.txt (or
// MAKEFUN_OUTPUT_DIR outside the grader's container). It validates the emoji
// first: UTF-8 text, 1 to 8 characters, a single emoji and nothing else.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ENTRY = '🏝️';

const MAX_CHARS = 8;

// Count Unicode code points, not UTF-16 code units, so the emoji counts as
// one character (plus its variation selector).
const entryLength = [...ENTRY].length;

if (entryLength === 0 || entryLength > MAX_CHARS) {
  console.error(`entry is ${entryLength} characters, expected 1..${MAX_CHARS}`);
  process.exit(1);
}
if (!/^\p{Extended_Pictographic}\uFE0F?$/u.test(ENTRY)) {
  console.error('entry must be exactly one emoji');
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, 'entry.txt');
writeFileSync(outPath, ENTRY, 'utf8');
console.log(`wrote entry.txt (${entryLength} characters) to ${outPath}`);
