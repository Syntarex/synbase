import { ApiResource, IDiscordVerification, IGetDiscordVerifications } from "@synbase/shared";
import _ from "lodash";
import { v4 as uuid } from "uuid";
import { SynbaseQuery } from "../../model/client/synbase.query";

export const getAllDiscordVerifications: SynbaseQuery<IDiscordVerification[], IGetDiscordVerifications> = (
    synbase,
    query,
) => ({
    queryKey: [ApiResource.DiscordVerification],
    queryFn: () => synbase.discordVerifications.getAll(query),
});

export const getDiscordVerification: SynbaseQuery<IDiscordVerification | null, string> = (synbase, id) => ({
    queryKey: [ApiResource.DiscordVerification, id],
    queryFn: () => synbase.discordVerifications.get(id),
});

export const ensureMyDiscordVerification: SynbaseQuery<IDiscordVerification> = (synbase) => ({
    queryKey: [ApiResource.DiscordVerification, "my"],
    queryFn: async () => {
        let result = await synbase.discordVerifications.getMy();

        if (_.isNull(result)) {
            result = await synbase.discordVerifications.createMy({
                discordUserId: null,
                verificationCode: uuid(),
            });
        }

        return result;
    },
});
