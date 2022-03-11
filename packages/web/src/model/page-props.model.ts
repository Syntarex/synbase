import { DehydratedState } from "react-query";

export interface IPageProps<T> {
    props: Partial<T>;
}

export interface IWithDehydratedState {
    dehydratedState: DehydratedState;
}
