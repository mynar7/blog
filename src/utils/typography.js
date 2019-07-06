import Typography from 'typography'

const typography = new Typography({
  baseFontSize: '20px',
  baseLineHeight: 1.5,
  headerFontFamily: ['Titillium Web', 'sans-serif'],
  headerWeight: '900',
  bodyFontFamily: ['Titillium Web', 'sans-serif'],
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
