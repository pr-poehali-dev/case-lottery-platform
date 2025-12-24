import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const mockLeaderboard = [
  { id: 1, username: 'Игрок#1337', totalWon: 125000, casesOpened: 450, biggestWin: 10000 },
  { id: 2, username: 'Игрок#4242', totalWon: 98000, casesOpened: 380, biggestWin: 5000 },
  { id: 3, username: 'Игрок#7890', totalWon: 87500, casesOpened: 320, biggestWin: 8000 },
  { id: 4, username: 'Игрок#5555', totalWon: 72000, casesOpened: 290, biggestWin: 2500 },
  { id: 5, username: 'Игрок#9999', totalWon: 65000, casesOpened: 250, biggestWin: 5000 },
  { id: 6, username: 'Игрок#3333', totalWon: 58000, casesOpened: 220, biggestWin: 4000 },
  { id: 7, username: 'Игрок#6666', totalWon: 52000, casesOpened: 200, biggestWin: 3000 },
  { id: 8, username: 'Игрок#1111', totalWon: 47000, casesOpened: 180, biggestWin: 2500 },
  { id: 9, username: 'Игрок#8888', totalWon: 43000, casesOpened: 160, biggestWin: 2000 },
  { id: 10, username: 'Игрок#2222', totalWon: 38000, casesOpened: 140, biggestWin: 1500 },
];

const getTrophyIcon = (position: number) => {
  if (position === 1) return <span className="text-2xl">🥇</span>;
  if (position === 2) return <span className="text-2xl">🥈</span>;
  if (position === 3) return <span className="text-2xl">🥉</span>;
  return <span className="text-lg font-bold text-muted-foreground">#{position}</span>;
};

const Leaderboard = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Icon name="Trophy" size={32} className="text-yellow-500" />
          Рейтинг игроков
        </h2>
        <p className="text-muted-foreground">Топ игроков по общему выигрышу</p>
      </div>

      <div className="space-y-3">
        {mockLeaderboard.map((player, index) => (
          <Card
            key={player.id}
            className={`p-6 border-2 ${
              index < 3 ? 'border-primary bg-primary/5' : 'border-border'
            } hover:scale-[1.02] transition-transform`}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center justify-center w-12">
                  {getTrophyIcon(index + 1)}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-lg">{player.username}</p>
                    {index === 0 && (
                      <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600">
                        👑 Лидер
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="Package" size={14} />
                      {player.casesOpened} кейсов
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="TrendingUp" size={14} />
                      Лучший: {player.biggestWin.toLocaleString('ru-RU')}₽
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-green-500">
                  {player.totalWon.toLocaleString('ru-RU')}₽
                </p>
                <p className="text-xs text-muted-foreground">Общий выигрыш</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
