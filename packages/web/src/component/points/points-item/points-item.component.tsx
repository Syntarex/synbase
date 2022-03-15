import { SxProps } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { IPoints } from "@synbase/shared";
import dayjs from "dayjs";
import _ from "lodash";
import React from "react";
import { pointsLoc } from "../../../localization/points.localization";

interface IPointsItemProps {
    sx?: SxProps;
    points: IPoints;
}

const PointsItem = (props: IPointsItemProps) => {
    const { sx, points } = props;

    const { source, amount, notes, updated } = points;

    const isPositive = React.useMemo(() => amount >= 0, []);

    return (
        <Paper
            sx={{
                padding: (theme) => theme.spacing(2),
                ...sx,
            }}
        >
            <Grid container spacing={1}>
                <Grid item xs={true}>
                    <Typography
                        sx={{
                            fontWeight: 600,
                        }}
                    >
                        {pointsLoc[source]}
                    </Typography>
                </Grid>

                <Grid item xs={4} sm={2} justifyContent={"right"}>
                    <Typography
                        sx={{
                            textAlign: "right",
                            fontWeight: 600,
                            color: (theme) => (isPositive ? theme.palette.success.dark : theme.palette.error.dark),
                        }}
                    >
                        {isPositive ? "+" : "-"}
                        {amount}
                    </Typography>
                </Grid>

                {_.isNull(notes) ? null : (
                    <Grid item xs={12}>
                        <Typography variant={"body2"} fontStyle={"italic"}>
                            {notes}
                        </Typography>
                    </Grid>
                )}

                <Grid item xs={12}>
                    <Typography variant={"caption"}>{dayjs(updated).format("DD. MMMM YYYY")}</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default PointsItem;
