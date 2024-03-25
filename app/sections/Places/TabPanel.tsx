import { Box } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
}

function TabPanel(props: Readonly<TabPanelProps>) {
  const { children, value, index } = props;
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      sx={{
        height: "100%",
        overflowY: "auto",
        paddingBottom: "4rem",
      }}
    >
      {value === index && (
        <Box
          sx={{
            p: 2,
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  );
}

export { TabPanel };
