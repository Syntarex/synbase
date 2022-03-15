import { ApiResource, IGetMyPoints, IPoints } from "@synbase/shared";
import { SynbaseQuery } from "../../model/client/synbase.query";

export const getAllMyPoints: SynbaseQuery<IPoints[], IGetMyPoints> = (synbase, query) => ({
    queryKey: [ApiResource.Points, "my", query],
    queryFn: () => synbase.points.getAllMy(query),
});
