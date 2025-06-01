import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Container,
  ThemeProvider,
  createTheme
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

interface MatchProps {
  team1: string;
  team2: string;
  winner?: string;
  position: 'top' | 'bottom';
}

const Match: React.FC<MatchProps> = ({ team1, team2, winner, position }) => {
  return (
    <Paper 
      elevation={2} 
      sx={{ 
        width: 180, 
        border: '2px solid #ddd',
        backgroundColor: 'white'
      }}
    >
      <Box 
        sx={{ 
          borderBottom: '1px solid #ddd', 
          padding: '8px 12px',
          backgroundColor: team1 === winner ? '#e3f2fd' : 'transparent',
          fontWeight: team1 === winner ? 'bold' : 'normal'
        }}
      >
        <Typography variant="body2" sx={{ fontSize: '14px' }}>
          {team1}
        </Typography>
      </Box>
      <Box 
        sx={{ 
          padding: '8px 12px',
          backgroundColor: team2 === winner ? '#e3f2fd' : 'transparent',
          fontWeight: team2 === winner ? 'bold' : 'normal'
        }}
      >
        <Typography variant="body2" sx={{ fontSize: '14px' }}>
          {team2}
        </Typography>
      </Box>
    </Paper>
  );
};

const ChampionshipMatch: React.FC<{ team1: string; team2: string; winner?: string }> = ({ team1, team2, winner }) => {
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        width: 180, 
        border: '3px solid #1976d2',
        backgroundColor: 'white'
      }}
    >
      <Box sx={{ padding: '4px 12px', backgroundColor: '#1976d2', color: 'white' }}>
        <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 'bold', textAlign: 'center' }}>
          CHAMPIONSHIP
        </Typography>
      </Box>
      <Box 
        sx={{ 
          borderBottom: '1px solid #ddd', 
          padding: '8px 12px',
          backgroundColor: team1 === winner ? '#e3f2fd' : 'transparent',
          fontWeight: team1 === winner ? 'bold' : 'normal'
        }}
      >
        <Typography variant="body2" sx={{ fontSize: '14px' }}>
          {team1}
        </Typography>
      </Box>
      <Box 
        sx={{ 
          padding: '8px 12px',
          backgroundColor: team2 === winner ? '#e3f2fd' : 'transparent',
          fontWeight: team2 === winner ? 'bold' : 'normal'
        }}
      >
        <Typography variant="body2" sx={{ fontSize: '14px' }}>
          {team2}
        </Typography>
      </Box>
    </Paper>
  );
};

const BracketLine: React.FC<{ 
  startX: number; 
  startY: number; 
  endX: number; 
  endY: number; 
}> = ({ startX, startY, endX, endY }) => {
  const midX = startX + (endX - startX) / 2;
  
  return (
    <svg
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
    >
      <path
        d={`M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`}
        stroke="#666"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
};

const TournamentBracket: React.FC = () => {
  const teams = ['TBD', 'TBD', 'TBD', 'TBD'];
  const semifinalWinners = ['TBD', 'TBD']; // Winners of semifinals
  const champion = ''; // Tournament champion

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" color='white' sx={{ mb: 4 }}>
          Tournament Bracket
        </Typography>
        
        <Box 
          sx={{ 
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px',
            backgroundColor: 'background.default',
            borderRadius: 2,
            p: 4
          }}
        >
          {/* Semifinal 1 */}
          <Box sx={{ position: 'absolute', left: '50px', top: '50px', zIndex: 2 }}>
            <Match 
              team1={teams[0]} 
              team2={teams[1]} 
              winner={semifinalWinners[0]}
              position="top"
            />
          </Box>
          
          {/* Semifinal 2 */}
          <Box sx={{ position: 'absolute', left: '50px', top: '200px', zIndex: 2 }}>
            <Match 
              team1={teams[2]} 
              team2={teams[3]} 
              winner={semifinalWinners[1]}
              position="bottom"
            />
          </Box>
          
          {/* Championship */}
          <Box sx={{ position: 'absolute', left: '400px', top: '100px', zIndex: 2 }}>
            <ChampionshipMatch 
              team1={semifinalWinners[0]} 
              team2={semifinalWinners[1]} 
              winner={champion}
            />
          </Box>
          
          {/* Bracket Lines */}
          <BracketLine startX={230} startY={84} endX={400} endY={150} />
          <BracketLine startX={230} startY={234} endX={400} endY={175} />
          
          {/* Champion Label */}
          {/* <Box sx={{ position: 'absolute', left: '620px', top: '140px', zIndex: 2 }}>
            <Paper elevation={2} sx={{ p: 2, backgroundColor: '#4caf50', color: 'white' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                🏆 CHAMPION
              </Typography>
              <Typography variant="body1" sx={{ textAlign: 'center', mt: 1 }}>
                {champion}
              </Typography>
            </Paper>
          </Box> */}
          
          {/* Round Labels */}
          <Box sx={{ position: 'absolute', left: '120px', top: '10px', zIndex: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#666' }}>
              Semifinals
            </Typography>
          </Box>
          <Box sx={{ position: 'absolute', left: '450px', top: '10px', zIndex: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#666' }}>
              Championship
            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default TournamentBracket;