import type { TextStyle } from './types.ts';

// Pre-computed exact glyph advance metrics extracted directly from
// public/fonts/GoogleSans-Regular-Variable.ttf (hmtx table)
const GOOGLE_SANS_REGULAR_METRICS: Record<string, number> = {
  " ": 0.232, "!": 0.236, "\"": 0.32, "#": 0.64, "$": 0.54, "%": 0.828, "&": 0.623, "'": 0.177,
  "(": 0.321, ")": 0.321, "*": 0.425, "+": 0.556, ",": 0.236, "-": 0.439, ".": 0.236, "/": 0.3,
  "0": 0.643, "1": 0.43, "2": 0.524, "3": 0.533, "4": 0.591, "5": 0.559, "6": 0.555, "7": 0.527,
  "8": 0.55, "9": 0.555, ":": 0.236, ";": 0.236, "<": 0.495, "=": 0.566, ">": 0.495, "?": 0.487,
  "@": 0.882, "A": 0.67, "B": 0.6, "C": 0.736, "D": 0.701, "E": 0.544, "F": 0.529, "G": 0.806,
  "H": 0.696, "I": 0.243, "J": 0.53, "K": 0.627, "L": 0.505, "M": 0.864, "N": 0.706, "O": 0.822,
  "P": 0.574, "Q": 0.822, "R": 0.591, "S": 0.555, "T": 0.53, "U": 0.667, "V": 0.633, "W": 0.944,
  "X": 0.619, "Y": 0.585, "Z": 0.57, "[": 0.316, "\\": 0.3, "]": 0.316, "^": 0.463, "_": 0.476,
  "`": 0.397, "a": 0.531, "b": 0.6, "c": 0.54, "d": 0.6, "e": 0.561, "f": 0.362, "g": 0.595,
  "h": 0.562, "i": 0.209, "j": 0.209, "k": 0.504, "l": 0.209, "m": 0.873, "n": 0.559, "o": 0.594,
  "p": 0.6, "q": 0.6, "r": 0.37, "s": 0.471, "t": 0.364, "u": 0.559, "v": 0.508, "w": 0.775,
  "x": 0.473, "y": 0.508, "z": 0.486, "{": 0.311, "|": 0.235, "}": 0.311, "~": 0.534
};

// Pre-computed exact glyph advance metrics extracted directly from
// public/fonts/GoogleSans-Italic-Variable.ttf (hmtx table)
const GOOGLE_SANS_ITALIC_METRICS: Record<string, number> = {
  " ": 0.224, "!": 0.236, "\"": 0.321, "#": 0.624, "$": 0.533, "%": 0.809, "&": 0.617, "'": 0.178,
  "(": 0.321, ")": 0.322, "*": 0.425, "+": 0.554, ",": 0.236, "-": 0.424, ".": 0.236, "/": 0.3,
  "0": 0.643, "1": 0.43, "2": 0.523, "3": 0.534, "4": 0.59, "5": 0.559, "6": 0.555, "7": 0.527,
  "8": 0.55, "9": 0.555, ":": 0.236, ";": 0.236, "<": 0.493, "=": 0.564, ">": 0.493, "?": 0.502,
  "@": 0.88, "A": 0.668, "B": 0.603, "C": 0.734, "D": 0.702, "E": 0.544, "F": 0.528, "G": 0.812,
  "H": 0.695, "I": 0.241, "J": 0.529, "K": 0.626, "L": 0.505, "M": 0.863, "N": 0.705, "O": 0.823,
  "P": 0.574, "Q": 0.823, "R": 0.586, "S": 0.56, "T": 0.531, "U": 0.669, "V": 0.632, "W": 0.943,
  "X": 0.621, "Y": 0.588, "Z": 0.57, "[": 0.316, "\\": 0.298, "]": 0.316, "^": 0.46, "_": 0.476,
  "`": 0.397, "a": 0.533, "b": 0.601, "c": 0.544, "d": 0.605, "e": 0.563, "f": 0.364, "g": 0.599,
  "h": 0.559, "i": 0.211, "j": 0.211, "k": 0.5, "l": 0.21, "m": 0.873, "n": 0.559, "o": 0.593,
  "p": 0.605, "q": 0.604, "r": 0.373, "s": 0.469, "t": 0.364, "u": 0.559, "v": 0.51, "w": 0.774,
  "x": 0.472, "y": 0.512, "z": 0.483, "{": 0.312, "|": 0.233, "}": 0.312, "~": 0.532
};

// In-memory measurement cache
const textMeasurementCache = new Map<string, number>();

// Dynamic custom TTF font cache
const customFontMetricsCache = new Map<string, Record<string, number>>();

/**
 * Parses TTF array buffer and extracts horizontal advance ratio per character
 */
function parseTTFAdvances(arrayBuffer: ArrayBuffer): Record<string, number> {
  const data = new DataView(arrayBuffer);
  const numTables = data.getUint16(4);
  let hmtxOffset = 0, cmapOffset = 0, headOffset = 0;

  for (let i = 0; i < numTables; i++) {
    const o = 12 + i * 16;
    const tag = String.fromCharCode(
      data.getUint8(o),
      data.getUint8(o + 1),
      data.getUint8(o + 2),
      data.getUint8(o + 3)
    );
    const offset = data.getUint32(o + 8);
    if (tag === 'hmtx') hmtxOffset = offset;
    if (tag === 'cmap') cmapOffset = offset;
    if (tag === 'head') headOffset = offset;
  }

  const unitsPerEm = data.getUint16(headOffset + 18);
  const numSubtables = data.getUint16(cmapOffset + 2);
  let subtableOffset = 0;

  for (let i = 0; i < numSubtables; i++) {
    const offset = data.getUint32(cmapOffset + 4 + i * 8 + 4);
    if (data.getUint16(cmapOffset + offset) === 4) {
      subtableOffset = cmapOffset + offset;
      break;
    }
  }

  function getAdvance(charCode: number): number {
    if (!subtableOffset) return 0.5;
    const segCount = data.getUint16(subtableOffset + 6) / 2;
    const endCountOffset = subtableOffset + 14;
    const startCountOffset = endCountOffset + segCount * 2 + 2;
    const idDeltaOffset = startCountOffset + segCount * 2;
    const idRangeOffsetOffset = idDeltaOffset + segCount * 2;
    let gid = 0;

    for (let i = 0; i < segCount; i++) {
      const end = data.getUint16(endCountOffset + i * 2);
      if (charCode <= end) {
        const start = data.getUint16(startCountOffset + i * 2);
        if (charCode >= start) {
          const delta = data.getInt16(idDeltaOffset + i * 2);
          const ro = data.getUint16(idRangeOffsetOffset + i * 2);
          if (ro === 0) {
            gid = (charCode + delta) & 0xffff;
          } else {
            const glyphOffset = idRangeOffsetOffset + i * 2 + ro + (charCode - start) * 2;
            gid = data.getUint16(glyphOffset);
            if (gid !== 0) gid = (gid + delta) & 0xffff;
          }
        }
        break;
      }
    }
    return data.getUint16(hmtxOffset + gid * 4) / unitsPerEm;
  }

  const map: Record<string, number> = {};
  for (let c = 32; c <= 126; c++) {
    map[String.fromCharCode(c)] = Math.round(getAdvance(c) * 10000) / 10000;
  }
  return map;
}

/**
 * Preloads and registers custom TTF font metrics if available
 */
export function preloadFontMetrics(fontUrl: string): void {
  if (typeof window === 'undefined' || !fontUrl || customFontMetricsCache.has(fontUrl)) return;
  fetch(fontUrl)
    .then((res) => res.arrayBuffer())
    .then((buf) => {
      const metrics = parseTTFAdvances(buf);
      customFontMetricsCache.set(fontUrl, metrics);
      textMeasurementCache.clear();
    })
    .catch(() => {
      // Ignore if fetch fails
    });
}

/**
 * Measure the exact width of a given text string in 3D world units.
 * Directly aligns with Troika's OpenType horizontal advance metrics to prevent gaps.
 */
export function measureTextWidth(
  text: string,
  style: Pick<TextStyle, 'fontSize' | 'fontWeight' | 'fontStyle' | 'font' | 'letterSpacing'>
): number {
  if (!text || text.length === 0) return 0;

  const fontSize = style.fontSize ?? 0.2;
  const letterSpacing = style.letterSpacing ?? 0;
  const font = style.font ?? '';
  const isItalic = style.fontStyle === 'italic' || font.toLowerCase().includes('italic');
  const isMonospace = Boolean(font && (font.includes('mono') || font.includes('Courier')));

  const cacheKey = `${text}|${fontSize}|${style.fontWeight}|${style.fontStyle}|${font}|${letterSpacing}`;
  const cached = textMeasurementCache.get(cacheKey);
  if (cached !== undefined) {
    return cached;
  }

  // Check if custom TTF metrics exist
  let metricTable = customFontMetricsCache.get(font);

  // If not in custom cache, select exact GoogleSans / default metrics
  if (!metricTable) {
    metricTable = isItalic ? GOOGLE_SANS_ITALIC_METRICS : GOOGLE_SANS_REGULAR_METRICS;
    if (font && (font.startsWith('/') || font.startsWith('http')) && typeof window !== 'undefined') {
      preloadFontMetrics(font);
    }
  }

  let totalAdvance = 0;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (isMonospace) {
      totalAdvance += fontSize * 0.6;
    } else {
      const charRatio = metricTable[ch];
      if (charRatio !== undefined) {
        totalAdvance += charRatio * fontSize;
      } else {
        // Fallback for non-ASCII or unmapped characters
        if (ch === ' ') {
          totalAdvance += fontSize * 0.232;
        } else if ('ilI1|!.,:;\'"'.includes(ch)) {
          totalAdvance += fontSize * 0.236;
        } else if ('mwMW_@#%&'.includes(ch)) {
          totalAdvance += fontSize * 0.86;
        } else if (ch >= 'A' && ch <= 'Z') {
          totalAdvance += fontSize * 0.64;
        } else {
          totalAdvance += fontSize * 0.52;
        }
      }
    }
  }

  if (text.length > 1 && letterSpacing) {
    totalAdvance += (text.length - 1) * letterSpacing;
  }

  textMeasurementCache.set(cacheKey, totalAdvance);
  return totalAdvance;
}

/**
 * Clears the measurement cache
 */
export function clearMeasurementCache(): void {
  textMeasurementCache.clear();
}
