import { SxProps, Theme } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { IBlogItem, IUpdateBlogItem } from "@synbase/shared";
import React from "react";
import TabPage from "../../common/tab-page/tab-page.component";

interface IBlogItemEditorProps {
    sx?: SxProps<Theme>;
    disabled?: boolean;
    value: IBlogItem;
    onChange: (id: string, blogItem: IUpdateBlogItem) => void;
}

const BlogItemEditor = (props: IBlogItemEditorProps) => {
    const { sx, value, onChange } = props;

    const [body, setBody] = React.useState<IBlogItem>(value);

    React.useEffect(() => setBody(value), [value]);

    /* TODO: Formik */
    /* TODO: OnSubmit -> Nur die Felder an onChange() die sich tatsächlich geändert haben */

    const [index, setIndex] = React.useState(0);
    const onTabChange = React.useCallback((event: React.SyntheticEvent, index: number) => setIndex(index), []);

    return (
        <Stack sx={sx} spacing={2}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={index} onChange={onTabChange}>
                    <Tab label={"Meta"} />
                    <Tab label={"Inhalt"} />
                    <Tab label={"Vorschau"} />
                </Tabs>
            </Box>

            <TabPage value={index} index={0}>
                <Typography>Meta</Typography>
            </TabPage>

            <TabPage value={index} index={1}>
                <Typography>Inhalt</Typography>
            </TabPage>

            <TabPage value={index} index={2}>
                <Typography>Vorschau</Typography>
            </TabPage>
        </Stack>
    );
};

export default BlogItemEditor;
