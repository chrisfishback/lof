import { Box, Stack, Typography } from "@mui/material"

export const Admin = () => {

    return (
        <Box marginX={'auto'} width={'80%'} color={'white'} bgcolor={'#111827'} borderRadius={2}>
            <Stack direction={'column'} padding={2}>
                <Typography>Team 1</Typography>
                <Typography>Team 2</Typography>
                <Typography>Team 3</Typography>
            </Stack>
        </Box>
    )
}