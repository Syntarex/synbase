import Stack from "@mui/material/Stack";
import MarkdownEditor from "../component/common/markdown-editor/markdown-editor.component";
import MarkdownViewer from "../component/common/markdown-viewer/markdown-viewer.component";
import { URLS } from "../constants/constants.client";
import { useBreadcrumb } from "../hook/layout/use-breadcrumb.hook";

const IndexPage = () => {
    useBreadcrumb([URLS.HOME]);

    const [markdown, setMarkdown] = React.useState("");

    return (
        <Stack spacing={4}>
            <MarkdownEditor value={markdown} onChange={setMarkdown} />

            <MarkdownViewer>{markdown}</MarkdownViewer>
        </Stack>
    );
};

export default IndexPage;
