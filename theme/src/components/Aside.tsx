/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
//@ts-ignore
import { alpha } from "@theme-ui/color";

const Aside: React.FC = ({ children }) => (
  <aside
    sx={{
      borderLeft: `3px solid`,
      borderLeftColor: `primary`,
      backgroundColor: alpha(`primary`, 0.07),
      borderTopRightRadius: `default`,
      borderBottomRightRadius: `default`,
      fontStyle: `italic`,
      mt: 3,
      px: 3,
      py: 3,
      "em, strong": {
        color: `inherit`,
      },
      p: {
        m: 0,
      },
      variant: `styles.Aside`,
    }}
  >
    {children}
  </aside>
);

export { Aside };
