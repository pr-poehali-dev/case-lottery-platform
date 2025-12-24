import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import CaseCard from '@/components/CaseCard';
import CaseOpening from '@/components/CaseOpening';
import UserProfile from '@/components/UserProfile';
import Leaderboard from '@/components/Leaderboard';

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
    name: 'Стартовый кейс',
    price: 20,
    items: [
      { name: '10₽', value: 10, rarity: 'common' },
      { name: '20₽', value: 20, rarity: 'common' },
      { name: '30₽', value: 30, rarity: 'rare' },
      { name: '50₽', value: 50, rarity: 'rare' },
      { name: '100₽', value: 100, rarity: 'epic' },
      { name: '200₽', value: 200, rarity: 'legendary' },
    ],
    image: '📦',
  },
  {
    id: 2,
    name: 'Средний кейс',
    price: 50,
    items: [
      { name: '30₽', value: 30, rarity: 'common' },
      { name: '50₽', value: 50, rarity: 'common' },
      { name: '80₽', value: 80, rarity: 'rare' },
      { name: '150₽', value: 150, rarity: 'epic' },
      { name: '300₽', value: 300, rarity: 'epic' },
      { name: '500₽', value: 500, rarity: 'legendary' },
    ],
    image: '🎁',
  },
  {
    id: 3,
    name: 'VIP кейс',
    price: 100,
    items: [
      { name: '50₽', value: 50, rarity: 'common' },
      { name: '100₽', value: 100, rarity: 'common' },
      { name: '200₽', value: 200, rarity: 'rare' },
      { name: '400₽', value: 400, rarity: 'epic' },
      { name: '800₽', value: 800, rarity: 'epic' },
      { name: '1500₽', value: 1500, rarity: 'legendary' },
    ],
    image: '💎',
  },
  {
    id: 4,
    name: 'Премиум кейс',
    price: 250,
    items: [
      { name: '150₽', value: 150, rarity: 'common' },
      { name: '300₽', value: 300, rarity: 'rare' },
      { name: '500₽', value: 500, rarity: 'rare' },
      { name: '1000₽', value: 1000, rarity: 'epic' },
      { name: '2000₽', value: 2000, rarity: 'epic' },
      { name: '5000₽', value: 5000, rarity: 'legendary' },
    ],
    image: '👑',
  },
  {
    id: 5,
    name: 'Ва-банк',
    price: 500,
    items: [
      { name: '200₽', value: 200, rarity: 'common' },
      { name: '500₽', value: 500, rarity: 'common' },
      { name: '1000₽', value: 1000, rarity: 'rare' },
      { name: '2500₽', value: 2500, rarity: 'epic' },
      { name: '5000₽', value: 5000, rarity: 'epic' },
      { name: '10000₽', value: 10000, rarity: 'legendary' },
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
  const [balance, setBalance] = useState(1000);
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);
  const [activeTab, setActiveTab] = useState<'cases' | 'profile' | 'leaderboard'>('cases');
  const [freeCaseAvailable, setFreeCaseAvailable] = useState(true);

  const handleOpenCase = (caseData: CaseData) => {
    if (caseData.price === 0 && !freeCaseAvailable) {
      return;
    }
    
    if (caseData.price > balance) {
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
    }
    setSelectedCase(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
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
            
            <Button variant="outline" className="gap-2">
              <Icon name="Plus" size={18} />
              Пополнить
            </Button>
          </div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="flex gap-1 border-t border-border">
            <Button
              variant={activeTab === 'cases' ? 'default' : 'ghost'}
              className="rounded-none border-b-2 border-transparent data-[active=true]:border-primary"
              data-active={activeTab === 'cases'}
              onClick={() => setActiveTab('cases')}
            >
              <Icon name="Package" size={18} className="mr-2" />
              Кейсы
            </Button>
            <Button
              variant={activeTab === 'profile' ? 'default' : 'ghost'}
              className="rounded-none border-b-2 border-transparent data-[active=true]:border-primary"
              data-active={activeTab === 'profile'}
              onClick={() => setActiveTab('profile')}
            >
              <Icon name="User" size={18} className="mr-2" />
              Профиль
            </Button>
            <Button
              variant={activeTab === 'leaderboard' ? 'default' : 'ghost'}
              className="rounded-none border-b-2 border-transparent data-[active=true]:border-primary"
              data-active={activeTab === 'leaderboard'}
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <UserProfile balance={balance} />
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
    </div>
  );
};

export default Index;
