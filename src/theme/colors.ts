/**
 * Korapp color tokens.
 *
 * Keep these values in sync with `web/src/app/globals.css`. Components should
 * consume semantic names from this object instead of declaring hex values.
 */
export const colors = {
  brand: {
    primary: '#355872',
    secondary: '#7AAACE',
    accent: '#9CD5FF',
    subtle: '#EBF4FF',
  },
  text: {
    primary: '#1E3444',
    secondary: '#4A7298',
    muted: '#7A9AB4',
    inverse: '#F7FFFF',
  },
  background: {
    default: '#FFFFFF',
    soft: '#F7FFFF',
    muted: '#EBF4FF',
    sidebar: '#355872',
  },
  border: {
    default: '#BAD4E8',
    soft: '#D5E8F5',
  },
  status: {
    success: '#4A9E7A',
    warning: '#E8A020',
    error: '#D95C5C',
    info: '#7AAACE',
  },
  statusSurface: {
    success: {
      background: '#DCFCE7',
      border: '#BBF7D0',
      text: '#15803D',
    },
    warning: {
      background: '#FEF3C7',
      border: '#FDE68A',
      text: '#B45309',
    },
    error: {
      background: '#FEE2E2',
      border: '#FECACA',
      text: '#B91C1C',
    },
    info: {
      background: '#E0F2FE',
      border: '#BAE6FD',
      text: '#0369A1',
    },
  },
} as const;
