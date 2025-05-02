import { Stack } from "@mui/material"
import { EditTeams } from "./EditTeams"
import { AddGamesAndWeeks } from "./AddGamesAndWeeks"

export const Admin = () => {

    return (
        <Stack marginX={'auto'} width={'80%'} color={'white'} bgcolor={'#111827'} borderRadius={2} gap={3}>
            <AddGamesAndWeeks/>
            <EditTeams/>
        </Stack>
    )
}