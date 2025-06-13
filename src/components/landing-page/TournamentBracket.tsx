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
  date?: string;
}

const Match: React.FC<MatchProps> = ({ team1, team2, winner, date }) => {
  return (
    <Paper 
      elevation={2} 
      sx={{ 
        width: 270, 
        border: '2px solid #ddd',
        backgroundColor: 'white'
      }}
    >
      {date && (
        <Box sx={{ 
          padding: '4px 12px', 
          backgroundColor: '#f0f0f0', 
          borderBottom: '1px solid #ddd',
          textAlign: 'center'
        }}>
          <Typography variant="caption" sx={{ fontSize: '11px', fontWeight: 'bold', color: '#666' }}>
            {date}
          </Typography>
        </Box>
      )}
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

const ChampionshipMatch: React.FC<{ 
  team1: string; 
  team2: string; 
  winner?: string; 
  date?: string;
}> = ({ team1, team2, winner, date }) => {
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        width: 200, 
        border: '3px solid #1976d2',
        backgroundColor: 'white'
      }}
    >
      <Box sx={{ padding: '4px 12px', backgroundColor: '#1976d2', color: 'white' }}>
        <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 'bold', textAlign: 'center' }}>
          CHAMPIONSHIP
        </Typography>
      </Box>
      {date && (
        <Box sx={{ 
          padding: '4px 12px', 
          backgroundColor: '#e3f2fd', 
          borderBottom: '1px solid #ddd',
          textAlign: 'center'
        }}>
          <Typography variant="caption" sx={{ fontSize: '11px', fontWeight: 'bold', color: '#1976d2' }}>
            {date}
          </Typography>
        </Box>
      )}
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
  // Tournament structure with clean team names and separate dates
  const tournament = {
    semifinals: [
      {
        team1: 'Feet Finders',
        team2: 'Face My Zipper',
        date: 'June 16th',
        winner: undefined // Set winner when known
      },
      {
        team1: 'Tanner Time',
        team2: 'Fizz on your Jayce',
        date: 'June 11th',
        winner: 'Fizz on your Jayce' // Set winner when known
      }
    ],
    championship: {
      date: 'June 18th',
      winner: undefined // Set winner when known
    },
    playIn: {
      team: 'Cucks/Facecheck',
      date: 'June 9th'
    }
  };

  const semifinalWinners = [
    tournament.semifinals[0].winner || 'TBD',
    tournament.semifinals[1].winner || 'TBD'
  ];

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" color='white' sx={{ mb: 4 }}>
          Tournament Bracket
        </Typography>
        
        {/* Play-in Notice */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Paper elevation={1} sx={{ display: 'inline-block', p: 2, backgroundColor: '#fff3cd', border: '1px solid #ffeaa7' }}>
            <Typography variant="body2" sx={{ color: '#856404', fontWeight: 'bold' }}>
              📋 Play-in: {tournament.playIn.team} ({tournament.playIn.date})
            </Typography>
          </Paper>
        </Box>
        
        <Box 
          sx={{ 
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '450px',
            backgroundColor: 'background.default',
            borderRadius: 2,
            p: 4
          }}
        >
          {/* Semifinal 1 */}
          <Box sx={{ position: 'absolute', left: '50px', top: '50px', zIndex: 2 }}>
            <Match 
              team1={tournament.semifinals[0].team1}
              team2={tournament.semifinals[0].team2}
              winner={tournament.semifinals[0].winner}
              date={tournament.semifinals[0].date}
              position="top"
            />
          </Box>
          
          {/* Semifinal 2 */}
          <Box sx={{ position: 'absolute', left: '50px', top: '230px', zIndex: 2 }}>
            <Match 
              team1={tournament.semifinals[1].team1}
              team2={tournament.semifinals[1].team2}
              winner={tournament.semifinals[1].winner}
              date={tournament.semifinals[1].date}
              position="bottom"
            />
          </Box>
          
          {/* Championship */}
          <Box sx={{ position: 'absolute', left: '420px', top: '120px', zIndex: 2 }}>
            <ChampionshipMatch 
              team1={semifinalWinners[0]}
              team2={semifinalWinners[1]}
              winner={tournament.championship.winner}
              date={tournament.championship.date}
            />
          </Box>
          
          {/* Bracket Lines */}
          <BracketLine startX={320} startY={105} endX={420} endY={165} />
          <BracketLine startX={320} startY={285} endX={420} endY={190} />
          
          {/* Round Labels */}
          <Box sx={{ position: 'absolute', left: '140px', top: '10px', zIndex: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#666' }}>
              Semifinals
            </Typography>
          </Box>
          <Box sx={{ position: 'absolute', left: '480px', top: '10px', zIndex: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#666' }}>
              Championship
            </Typography>
          </Box>
        </Box>
        
        {/* Tournament Schedule Summary */}
        {/* <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Paper elevation={1} sx={{ display: 'inline-block', p: 3, backgroundColor: 'white' }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#1976d2', fontWeight: 'bold' }}>
              📅 Tournament Schedule
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Play-in:</strong> {tournament.playIn.date}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Semifinal 1:</strong> {tournament.semifinals[1].date}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Semifinal 2:</strong> {tournament.semifinals[0].date}
            </Typography>
            <Typography variant="body2">
              <strong>Championship:</strong> {tournament.championship.date}
            </Typography>
          </Paper>
        </Box> */}
      </Container>
    </ThemeProvider>
  );
};

export default TournamentBracket;