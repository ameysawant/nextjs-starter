/**
 * Grid System Configuration
 * Use this file to maintain all grid-related variables in one place.
 */

export const GRID_CONFIG = {
  columns: 12,
  defaultGutter: 4, // 1rem (4 * 0.25rem)
  
  // Container max-widths for each breakpoint
  containerWidths: {
    sm: "544px",
    md: "736px",
    lg: "960px",
    xl: "1168px",
    xxl: "1368px",
    xxxl: "1504px",
  },

  // Breakpoints (Matching global.css)
  breakpoints: {
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
    xxl: "1400px",
    xxxl: "1536px",
  },
};
