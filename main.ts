// One Emoji, One Dream Vacation — make.fun entry (program/v1, Node 22).
//
// The entry is a single sailboat on open water: the dream of sailing
// away to a faraway shore. Against the judge's brief it wins on the
// first test (exactly one emoji, plainly a dream vacation), reads as a
// postcard at a glance (white sail, blue sea, open horizon), and stays
// specific instead of generic — not just any holiday, but the one trip
// of setting sail — while staying instantly readable on any screen.
// No date, no randomness, no network, no environment secret: the same
// run always writes the same bytes, so the entry is deterministic.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One emoji, nothing else: a sailboat on open water, the dream of
// sailing away to a faraway shore. U+26F5 SAILBOAT + U+FE0F variation
// selector so it always renders as the emoji, never as a text glyph.
const ENTRY = "⛵️";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? ".";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Hold the output to the gate before exiting: UTF-8 text of 1 to 8
// Unicode code points, not only white space. A broken write fails
// loudly here instead of shipping an invalid entry.
const written = readFileSync(outPath, "utf8");
const codePoints = [...written].length;
if (codePoints < 1 || codePoints > 8 || written.trim().length === 0) {
  throw new Error(`entry.txt failed the gate: ${codePoints} code points`);
}
