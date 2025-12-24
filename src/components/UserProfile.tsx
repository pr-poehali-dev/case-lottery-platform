import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface UserProfileProps {
  balance: number;
  depositBalance: number;
}

const mockHistory = [
  { id: 1, caseName: 'VIP кейс', prize: 800, profit: 700, time: '2 минуты назад' },
  { id: 2, caseName: 'Средний кейс', prize: 30, profit: -20, time: '15 минут назад' },
  { id: 3, caseName: 'Стартовый кейс', prize: 100, profit: 80, time: '1 час назад' },
  { id: 4, caseName: 'Премиум кейс', prize: 300, profit: 50, time: '3 часа назад' },
  { id: 5, caseName: 'Стартовый кейс', prize: 20, profit: 0, time: '5 часов назад' },
];

const UserProfile = ({ balance, depositBalance }: UserProfileProps) => {
  const totalOpened = mockHistory.length;
  const totalProfit = mockHistory.reduce((sum, item) => sum + item.profit, 0);
  const winRate = (mockHistory.filter(item => item.profit > 0).length / totalOpened * 100).toFixed(0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 border-2 border-border">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-primary/10">
              <Icon name="Wallet" size={24} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Баланс</p>
              <p className="text-2xl font-bold">{balance.toLocaleString('ru-RU')}₽</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-2 border-border bg-green-500/5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-green-500/10">
              <Icon name="Banknote" size={24} className="text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Доступно к выводу</p>
              <p className="text-2xl font-bold text-green-500">{depositBalance.toLocaleString('ru-RU')}₽</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-2 border-border">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-blue-500/10">
              <Icon name="Package" size={24} className="text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Открыто кейсов</p>
              <p className="text-2xl font-bold">{totalOpened}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-2 border-border">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-full ${totalProfit >= 0 ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
              <Icon name="TrendingUp" size={24} className={totalProfit >= 0 ? 'text-green-500' : 'text-red-500'} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Общая прибыль</p>
              <p className={`text-2xl font-bold ${totalProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {totalProfit > 0 && '+'}{totalProfit.toLocaleString('ru-RU')}₽
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 border-2 border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">История открытий</h3>
          <Badge variant="secondary">
            Винрейт: {winRate}%
          </Badge>
        </div>

        <div className="space-y-3">
          {mockHistory.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              <div className="flex items-center gap-4">
                <Icon name="Package" size={20} className="text-muted-foreground" />
                <div>
                  <p className="font-semibold">{item.caseName}</p>
                  <p className="text-sm text-muted-foreground">{item.time}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-bold">{item.prize}₽</p>
                <p className={`text-sm ${
                  item.profit > 0 ? 'text-green-500' : 
                  item.profit < 0 ? 'text-red-500' : 
                  'text-yellow-500'
                }`}>
                  {item.profit > 0 && '+'}{item.profit}₽
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default UserProfile;