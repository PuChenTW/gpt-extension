module.exports = {
  content: ["./scripts/**/*.{html,js}"],
  theme: {
    extend: {
      spacing: {
        '2x': '2px',
        '4x': '4px',
        '8x': '8px',
      },
      fontSize: {
        '12x': '12px',
        '14x': '14px',
        '16x': '16px',
        '18x': '18px'
      }
    },
  },
  plugins: [],
  prefix: 'cs-',
}