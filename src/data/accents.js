/**
 * Full-site theme catalog for SkillBridge.
 *
 * Unlike the old accent system — which only remapped brand chrome (buttons,
 * links, tabs) and therefore left the page looking almost identical — each theme
 * here owns the complete palette: page surfaces, ink, borders, gradients, the
 * footer and the neutral tone triplets, in BOTH light and dark. The values live
 * in `styles/themes.css` under `[data-skin='<id>']`; this file is only the
 * catalog the settings picker renders.
 *
 * `swatch` / `darkSwatch` mirror the `--accent-base` values from that file so the
 * picker always previews the exact brand colour that will be applied.
 */
export const THEMES = [
  {
    id: 'slate',
    label: 'Slate',
    note: 'Cool blue-grey · professional',
    swatch: '#334155',
    darkSwatch: '#94a3b8'
  },
  {
    id: 'ocean',
    label: 'Ocean',
    note: 'Teal & cyan · calm',
    swatch: '#0e7490',
    darkSwatch: '#67e8f9'
  },
  {
    id: 'forest',
    label: 'Forest',
    note: 'Deep green · natural',
    swatch: '#166534',
    darkSwatch: '#86efac'
  },
  {
    id: 'blossom',
    label: 'Blossom',
    note: 'Rose & pink · warm',
    swatch: '#be185d',
    darkSwatch: '#f9a8d4'
  },
  {
    id: 'ember',
    label: 'Ember',
    note: 'Amber & orange · energetic',
    swatch: '#c2410c',
    darkSwatch: '#fdba74'
  }
];

export const DEFAULT_THEME = 'slate';

export const isValidTheme = (id) => THEMES.some((theme) => theme.id === id);

export const getTheme = (id) => THEMES.find((theme) => theme.id === id) || THEMES[0];

