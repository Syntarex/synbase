import _ from "lodash";
import { useRecoilState } from "recoil";
import { errorsAtom } from "../../data/error/error.atoms";

export const useErrors = (): [Error[], (error: Error) => void, (error: Error) => void] => {
    const [errors, setErrors] = useRecoilState(errorsAtom);

    const remove = React.useCallback(
        (error: Error) => {
            setErrors(_.without(errors, error));
        },
        [errors, setErrors],
    );

    const add = React.useCallback((error: Error) => setErrors(_.uniq([...errors, error])), [errors, setErrors]);

    return [errors, add, remove];
};
