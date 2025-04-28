import { Box } from "@mui/material"
import { EditTeams } from "./EditTeams"

export const Admin = () => {

    return (
        <Box marginX={'auto'} width={'80%'} color={'white'} bgcolor={'#111827'} borderRadius={2}>
            <EditTeams/>
        </Box>
    )
}