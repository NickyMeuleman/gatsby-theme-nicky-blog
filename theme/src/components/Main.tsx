/** @jsx jsx */
import { jsx, Box } from "theme-ui";

const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box
    as="main"
    sx={{
      flex: `1 1 auto`,
      variant: `styles.Main`,
    }}
  >
    {children}
  </Box>
);

export { Main };
