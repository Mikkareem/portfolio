import type {
  MarkdownStyles,
  ResolvedMarkdownStyles,
  TextStyle,
  TextStyleFlags,
} from './types.ts';

/**
 * Default base styles (defaults to GoogleSans available locally in the project)
 */
export const DEFAULT_BASE_STYLE: ResolvedMarkdownStyles['base'] = {
  font: '/fonts/GoogleSans-Regular-Variable.ttf',
  fontSize: 0.2,
  color: '#ffffff',
  lineHeight: 1.4,
  letterSpacing: 0,
  fontWeight: 'normal',
  fontStyle: 'normal',
  fillOpacity: 1,
};

/**
 * Default resolved markdown styles
 */
export const DEFAULT_MARKDOWN_STYLES: ResolvedMarkdownStyles = {
  base: DEFAULT_BASE_STYLE,

  bold: {
    fontWeight: 'bold',
    font: '/fonts/GoogleSans-Regular-Variable.ttf',
    strokeWidth: '1.5%',
    strokeColor: '#ffffff',
  },

  italic: {
    fontStyle: 'italic',
    font: '/fonts/GoogleSans-Italic-Variable.ttf',
  },

  underline: {
    underlineChar: '_',
    scale: 1,
  },

  code: {
    color: '#e5c07b',
    letterSpacing: 0.02,
    outlineWidth: 0.005,
    outlineColor: '#282c34',
  },

  bullet: {
    char: '•',
    indent: 0.35,
    gap: 0.12,
    spacing: 0.08,
  },

  paragraph: {
    spacing: 0.15,
  },

  headings: {
    h1: {
      fontSize: 0.4,
      fontWeight: 'bold',
      lineHeight: 1.25,
      spacingTop: 0.2,
      spacingBottom: 0.12,
    },
    h2: {
      fontSize: 0.32,
      fontWeight: 'bold',
      lineHeight: 1.3,
      spacingTop: 0.16,
      spacingBottom: 0.1,
    },
    h3: {
      fontSize: 0.26,
      fontWeight: 'bold',
      lineHeight: 1.35,
      spacingTop: 0.14,
      spacingBottom: 0.08,
    },
    h4: {
      fontSize: 0.22,
      fontWeight: 'bold',
      lineHeight: 1.4,
      spacingTop: 0.12,
      spacingBottom: 0.06,
    },
    h5: {
      fontSize: 0.2,
      fontWeight: 'bold',
      lineHeight: 1.4,
      spacingTop: 0.1,
      spacingBottom: 0.06,
    },
    h6: {
      fontSize: 0.18,
      fontWeight: 'bold',
      lineHeight: 1.4,
      spacingTop: 0.1,
      spacingBottom: 0.04,
    },
  },

  strikethrough: {
    strikeChar: '─',
  },

  blockquote: {
    prefix: '▌',
    indent: 0.25,
    spacing: 0.12,
    color: '#abb2bf',
    fontStyle: 'italic',
  },
};

/**
 * Merge user overrides into the default styles
 */
export function resolveStyles(userStyles?: MarkdownStyles): ResolvedMarkdownStyles {
  if (!userStyles) {
    return DEFAULT_MARKDOWN_STYLES;
  }

  const base: ResolvedMarkdownStyles['base'] = {
    ...DEFAULT_MARKDOWN_STYLES.base,
    ...(userStyles.base || {}),
  };

  const bold: ResolvedMarkdownStyles['bold'] = {
    ...DEFAULT_MARKDOWN_STYLES.bold,
    ...(userStyles.bold || {}),
  };

  // If user changed base font, but didn't explicitly set bold font, inherit base font
  if (userStyles.base?.font && !userStyles.bold?.font) {
    bold.font = userStyles.base.font;
  }

  const italic: ResolvedMarkdownStyles['italic'] = {
    ...DEFAULT_MARKDOWN_STYLES.italic,
    ...(userStyles.italic || {}),
  };

  const underline = {
    ...DEFAULT_MARKDOWN_STYLES.underline,
    ...(userStyles.underline || {}),
  };

  const code = {
    ...DEFAULT_MARKDOWN_STYLES.code,
    ...(userStyles.code || {}),
  };

  const bullet = {
    ...DEFAULT_MARKDOWN_STYLES.bullet,
    ...(userStyles.bullet || {}),
  };

  const paragraph = {
    ...DEFAULT_MARKDOWN_STYLES.paragraph,
    ...(userStyles.paragraph || {}),
  };

  const headings = {
    h1: { ...DEFAULT_MARKDOWN_STYLES.headings.h1, ...(userStyles.headings?.h1 || {}) },
    h2: { ...DEFAULT_MARKDOWN_STYLES.headings.h2, ...(userStyles.headings?.h2 || {}) },
    h3: { ...DEFAULT_MARKDOWN_STYLES.headings.h3, ...(userStyles.headings?.h3 || {}) },
    h4: { ...DEFAULT_MARKDOWN_STYLES.headings.h4, ...(userStyles.headings?.h4 || {}) },
    h5: { ...DEFAULT_MARKDOWN_STYLES.headings.h5, ...(userStyles.headings?.h5 || {}) },
    h6: { ...DEFAULT_MARKDOWN_STYLES.headings.h6, ...(userStyles.headings?.h6 || {}) },
  };

  const strikethrough = {
    ...DEFAULT_MARKDOWN_STYLES.strikethrough,
    ...(userStyles.strikethrough || {}),
  };

  const blockquote = {
    ...DEFAULT_MARKDOWN_STYLES.blockquote,
    ...(userStyles.blockquote || {}),
  };

  return {
    base,
    bold,
    italic,
    underline,
    code,
    bullet,
    paragraph,
    headings,
    strikethrough,
    blockquote,
  };
}

/**
 * Computes the effective text style for an inline span based on its active flags
 */
export function getComputedSpanStyle(
  flags: TextStyleFlags,
  styles: ResolvedMarkdownStyles,
  blockOverride?: TextStyle
): Required<Omit<TextStyle, 'font' | 'outlineWidth' | 'outlineColor' | 'strokeWidth' | 'strokeColor'>> & {
  font?: string;
  outlineWidth?: number | string;
  outlineColor?: any;
  strokeWidth?: number | string;
  strokeColor?: any;
} {
  const result = {
    ...styles.base,
    ...(blockOverride || {}),
  };

  // If code: apply code style
  if (flags.code) {
    Object.assign(result, styles.code);
  }

  // If bold: apply bold style
  if (flags.bold) {
    Object.assign(result, styles.bold);
  }

  // If italic: apply italic style
  if (flags.italic) {
    Object.assign(result, styles.italic);
  }

  // If underline: apply underline font/color overrides if specified
  if (flags.underline) {
    if (styles.underline.color !== undefined) result.color = styles.underline.color;
    if (styles.underline.font !== undefined) result.font = styles.underline.font;
    if (styles.underline.fontSize !== undefined) result.fontSize = styles.underline.fontSize;
  }

  // If strikethrough: apply strikethrough overrides
  if (flags.strikethrough) {
    if (styles.strikethrough.color !== undefined) result.color = styles.strikethrough.color;
  }

  return result;
}
