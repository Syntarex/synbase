import { ReactNode } from "react";

/**
 * Die Properties eines Next-layout.
 */
export interface LayoutProps {
    children: ReactNode;
}

/**
 * Die Properties einer Next-page.
 */
export interface PageProps<Params = unknown, SearchParams = unknown> {
    params: Params;
    searchParams: SearchParams;
}
