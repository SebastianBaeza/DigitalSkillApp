import { Box, Tabs, Tab } from "@mui/material";

export function PptToolbar () {

    return (
        <>
        <Box sx={{borderBottom: 1, borderColor: "divider"}}>
            <Tabs className="ppt-toolbar-options">
                <Tab label="Item One"/>
                <Tab label="Item Two"/>
                <Tab label="Item Three"/>
            </Tabs>
        </Box>
        </>
    )
}