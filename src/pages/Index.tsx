import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import CaseCard from '@/components/CaseCard';
import CaseOpening from '@/components/CaseOpening';
import UserProfile from '@/components/UserProfile';
import Leaderboard from '@/components/Leaderboard';
import DepositModal from '@/components/DepositModal';
import WithdrawModal from '@/components/WithdrawModal';
import { useToast } from '@/hooks/use-toast';

export interface CaseData {
  id: number;
  name: string;
  price: number;
  items: { name: string; value: number; rarity: 'common' | 'rare' | 'epic' | 'legendary' }[];
  image: string;
}

const cases: CaseData[] = [
  {
    id: 1,
    name: 'Базовый',
    price: 500,
    items: [
      { name: '300₽', value: 300, rarity: 'common' },
      { name: '500₽', value: 500, rarity: 'common' },
      { name: '750₽', value: 750, rarity: 'rare' },
      { name: '1200₽', value: 1200, rarity: 'epic' },
      { name: '2500₽', value: 2500, rarity: 'legendary' },
    ],
    image: '📦',
  },
  {
    id: 2,
    name: 'Стандарт',
    price: 1000,
    items: [
      { name: '600₽', value: 600, rarity: 'common' },
      { name: '1000₽', value: 1000, rarity: 'common' },
      { name: '1800₽', value: 1800, rarity: 'rare' },
      { name: '3500₽', value: 3500, rarity: 'epic' },
      { name: '6000₽', value: 6000, rarity: 'legendary' },
    ],
    image: '🎁',
  },
  {
    id: 3,
    name: 'Элитный',
    price: 2500,
    items: [
      { name: '1500₽', value: 1500, rarity: 'common' },
      { name: '2500₽', value: 2500, rarity: 'common' },
      { name: '4500₽', value: 4500, rarity: 'rare' },
      { name: '8000₽', value: 8000, rarity: 'epic' },
      { name: '15000₽', value: 15000, rarity: 'legendary' },
    ],
    image: '💎',
  },
  {
    id: 4,
    name: 'Премиум',
    price: 5000,
    items: [
      { name: '3000₽', value: 3000, rarity: 'common' },
      { name: '5000₽', value: 5000, rarity: 'common' },
      { name: '9000₽', value: 9000, rarity: 'rare' },
      { name: '16000₽', value: 16000, rarity: 'epic' },
      { name: '30000₽', value: 30000, rarity: 'legendary' },
    ],
    image: '👑',
  },
  {
    id: 5,
    name: 'Золотой',
    price: 10000,
    items: [
      { name: '6000₽', value: 6000, rarity: 'common' },
      { name: '10000₽', value: 10000, rarity: 'common' },
      { name: '18000₽', value: 18000, rarity: 'rare' },
      { name: '35000₽', value: 35000, rarity: 'epic' },
      { name: '60000₽', value: 60000, rarity: 'legendary' },
    ],
    image: '🏆',
  },
  {
    id: 6,
    name: 'Платиновый',
    price: 15000,
    items: [
      { name: '9000₽', value: 9000, rarity: 'common' },
      { name: '15000₽', value: 15000, rarity: 'common' },
      { name: '27000₽', value: 27000, rarity: 'rare' },
      { name: '50000₽', value: 50000, rarity: 'epic' },
      { name: '90000₽', value: 90000, rarity: 'legendary' },
    ],
    image: '🌟',
  },
  {
    id: 7,
    name: 'Мега',
    price: 25000,
    items: [
      { name: '15000₽', value: 15000, rarity: 'common' },
      { name: '25000₽', value: 25000, rarity: 'common' },
      { name: '45000₽', value: 45000, rarity: 'rare' },
      { name: '80000₽', value: 80000, rarity: 'epic' },
      { name: '150000₽', value: 150000, rarity: 'legendary' },
    ],
    image: '⚡',
  },
  {
    id: 8,
    name: 'Ультра',
    price: 35000,
    items: [
      { name: '21000₽', value: 21000, rarity: 'common' },
      { name: '35000₽', value: 35000, rarity: 'common' },
      { name: '63000₽', value: 63000, rarity: 'rare' },
      { name: '110000₽', value: 110000, rarity: 'epic' },
      { name: '200000₽', value: 200000, rarity: 'legendary' },
    ],
    image: '💫',
  },
  {
    id: 9,
    name: 'Легендарный',
    price: 50000,
    items: [
      { name: '30000₽', value: 30000, rarity: 'common' },
      { name: '50000₽', value: 50000, rarity: 'common' },
      { name: '90000₽', value: 90000, rarity: 'rare' },
      { name: '160000₽', value: 160000, rarity: 'epic' },
      { name: '300000₽', value: 300000, rarity: 'legendary' },
    ],
    image: '🎯',
  },
  {
    id: 10,
    name: 'Ва-банк',
    price: 100000,
    items: [
      { name: '60000₽', value: 60000, rarity: 'common' },
      { name: '100000₽', value: 100000, rarity: 'common' },
      { name: '180000₽', value: 180000, rarity: 'rare' },
      { name: '350000₽', value: 350000, rarity: 'epic' },
      { name: '600000₽', value: 600000, rarity: 'legendary' },
    ],
    image: '🔥',
  },
];

const freeCase: CaseData = {
  id: 0,
  name: 'Ежедневный бесплатный',
  price: 0,
  items: [
    { name: '1₽', value: 1, rarity: 'common' },
    { name: '2₽', value: 2, rarity: 'common' },
    { name: '3₽', value: 3, rarity: 'rare' },
    { name: '5₽', value: 5, rarity: 'epic' },
  ],
  image: '🎉',
};

const Index = () => {
  const { toast } = useToast();
  const [balance, setBalance] = useState(10000);
  const [depositBalance, setDepositBalance] = useState(0);
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);
  const [activeTab, setActiveTab] = useState<'cases' | 'profile' | 'leaderboard'>('cases');
  const [freeCaseAvailable, setFreeCaseAvailable] = useState(true);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const handleOpenCase = (caseData: CaseData) => {
    if (caseData.price === 0 && !freeCaseAvailable) {
      toast({
        title: "Бесплатный кейс недоступен",
        description: "Вернитесь завтра за новым бесплатным кейсом!",
        variant: "destructive",
      });
      return;
    }
    
    if (caseData.price > balance) {
      toast({
        title: "Недостаточно средств",
        description: "Пополните баланс для открытия этого кейса",
        variant: "destructive",
      });
      return;
    }

    setSelectedCase(caseData);
  };

  const handleCaseOpened = (prize: number) => {
    if (selectedCase) {
      const newBalance = balance - selectedCase.price + prize;
      setBalance(newBalance);
      
      if (selectedCase.price === 0) {
        setFreeCaseAvailable(false);
      }

      toast({
        title: prize > selectedCase.price ? "🎉 Поздравляем!" : prize === selectedCase.price ? "Возврат ставки" : "Попробуйте ещё",
        description: `Вы выиграли ${prize.toLocaleString('ru-RU')}₽`,
        variant: prize >= selectedCase.price ? "default" : "destructive",
      });
    }
    setSelectedCase(null);
  };

  const handleDeposit = (amount: number) => {
    setBalance(balance + amount);
    setDepositBalance(depositBalance + amount);
    setShowDepositModal(false);
    toast({
      title: "✅ Баланс пополнен",
      description: `Зачислено ${amount.toLocaleString('ru-RU')}₽`,
    });
  };

  const handleWithdraw = (amount: number, cardNumber: string) => {
    setBalance(balance - amount);
    setDepositBalance(Math.max(0, depositBalance - amount));
    setShowWithdrawModal(false);
    toast({
      title: "✅ Заявка на вывод создана",
      description: `${amount.toLocaleString('ru-RU')}₽ поступят на карту ${cardNumber.slice(-4)} в течение 24 часов`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-3xl">🎰</span>
              <span>CaseHub</span>
            </h1>
            
            <div className="flex items-center gap-4">
              <Card className="px-4 py-2 bg-card border-border">
                <div className="flex items-center gap-2">
                  <Icon name="Wallet" size={20} />
                  <span className="font-semibold text-lg">{balance.toLocaleString('ru-RU')}₽</span>
                </div>
              </Card>
              
              <Button onClick={() => setShowDepositModal(true)} className="gap-2">
                <Icon name="Plus" size={18} />
                Пополнить
              </Button>

              <Button onClick={() => setShowWithdrawModal(true)} variant="outline" className="gap-2">
                <Icon name="ArrowDownToLine" size={18} />
                Вывести
              </Button>
            </div>
          </div>
          
          <div className="flex gap-1 mt-4 border-t border-border pt-2">
            <Button
              variant={activeTab === 'cases' ? 'default' : 'ghost'}
              className="rounded-none"
              onClick={() => setActiveTab('cases')}
            >
              <Icon name="Package" size={18} className="mr-2" />
              Кейсы
            </Button>
            <Button
              variant={activeTab === 'profile' ? 'default' : 'ghost'}
              className="rounded-none"
              onClick={() => setActiveTab('profile')}
            >
              <Icon name="User" size={18} className="mr-2" />
              Профиль
            </Button>
            <Button
              variant={activeTab === 'leaderboard' ? 'default' : 'ghost'}
              className="rounded-none"
              onClick={() => setActiveTab('leaderboard')}
            >
              <Icon name="Trophy" size={18} className="mr-2" />
              Рейтинг
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'cases' && (
          <div className="space-y-8 animate-fade-in">
            {freeCaseAvailable && (
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">🎉 Бесплатный кейс</h2>
                  <Badge variant="secondary" className="text-sm">
                    Доступен сегодня
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  <CaseCard
                    caseData={freeCase}
                    onOpen={() => handleOpenCase(freeCase)}
                    disabled={!freeCaseAvailable}
                  />
                </div>
              </section>
            )}

            <section>
              <h2 className="text-2xl font-bold mb-4">Все кейсы</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {cases.map((caseData) => (
                  <CaseCard
                    key={caseData.id}
                    caseData={caseData}
                    onOpen={() => handleOpenCase(caseData)}
                    disabled={balance < caseData.price}
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="animate-fade-in">
            <UserProfile balance={balance} depositBalance={depositBalance} />
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="animate-fade-in">
            <Leaderboard />
          </div>
        )}
      </main>

      {selectedCase && (
        <CaseOpening
          caseData={selectedCase}
          onClose={() => setSelectedCase(null)}
          onComplete={handleCaseOpened}
        />
      )}

      {showDepositModal && (
        <DepositModal
          onClose={() => setShowDepositModal(false)}
          onDeposit={handleDeposit}
        />
      )}

      {showWithdrawModal && (
        <WithdrawModal
          onClose={() => setShowWithdrawModal(false)}
          onWithdraw={handleWithdraw}
          availableBalance={depositBalance}
        />
      )}
    </div>
  );
};

export default Index;
