import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import type { CaseData } from '@/pages/Index';

interface CaseOpeningProps {
  caseData: CaseData;
  onClose: () => void;
  onComplete: (prize: number) => void;
}

const rarityColors = {
  common: 'bg-gray-500',
  rare: 'bg-blue-500',
  epic: 'bg-purple-500',
  legendary: 'bg-yellow-500',
};

const CaseOpening = ({ caseData, onClose, onComplete }: CaseOpeningProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonItem, setWonItem] = useState<typeof caseData.items[0] | null>(null);
  const [items, setItems] = useState<typeof caseData.items>([]);

  useEffect(() => {
    const extendedItems = [];
    for (let i = 0; i < 50; i++) {
      extendedItems.push(...caseData.items);
    }
    
    const shuffled = extendedItems.sort(() => Math.random() - 0.5);
    setItems(shuffled);

    setTimeout(() => {
      setIsSpinning(true);
      
      const totalPrice = caseData.price || 10;
      const rand = Math.random();
      
      let selectedItem;
      if (rand < 0.5) {
        const commonItems = caseData.items.filter(item => item.rarity === 'common');
        selectedItem = commonItems[Math.floor(Math.random() * commonItems.length)];
      } else if (rand < 0.75) {
        const rareItems = caseData.items.filter(item => item.rarity === 'rare');
        selectedItem = rareItems.length > 0 
          ? rareItems[Math.floor(Math.random() * rareItems.length)]
          : caseData.items[Math.floor(Math.random() * caseData.items.length)];
      } else if (rand < 0.92) {
        const epicItems = caseData.items.filter(item => item.rarity === 'epic');
        selectedItem = epicItems.length > 0
          ? epicItems[Math.floor(Math.random() * epicItems.length)]
          : caseData.items[Math.floor(Math.random() * caseData.items.length)];
      } else {
        const legendaryItems = caseData.items.filter(item => item.rarity === 'legendary');
        selectedItem = legendaryItems.length > 0
          ? legendaryItems[Math.floor(Math.random() * legendaryItems.length)]
          : caseData.items[Math.floor(Math.random() * caseData.items.length)];
      }

      setTimeout(() => {
        setWonItem(selectedItem);
        setIsSpinning(false);
      }, 4000);
    }, 100);
  }, [caseData]);

  const handleClaim = () => {
    if (wonItem) {
      onComplete(wonItem.value);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-4xl p-8 bg-card border-2 border-border animate-scale-in">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-3xl">{caseData.image}</span>
              {caseData.name}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              disabled={isSpinning}
            >
              <Icon name="X" size={24} />
            </Button>
          </div>

          <div className="relative h-80 bg-muted rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <div className="w-1 h-full bg-primary opacity-80" />
            </div>

            <div className="absolute inset-y-0 left-0 right-0 flex items-center overflow-hidden">
              <div
                className={`flex gap-4 px-4 transition-all ${
                  isSpinning ? 'duration-[4000ms] ease-out' : 'duration-0'
                }`}
                style={{
                  transform: isSpinning ? `translateX(-${items.length * 140 - 1800}px)` : 'translateX(0)',
                }}
              >
                {items.map((item, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 w-32 h-32 rounded-lg ${rarityColors[item.rarity]} flex items-center justify-center text-white font-bold text-xl border-2 border-white/20`}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {wonItem && !isSpinning && (
            <div className="text-center space-y-4 animate-fade-in">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-muted-foreground">Вы выиграли</h3>
                <div className={`inline-block px-8 py-4 rounded-lg ${rarityColors[wonItem.rarity]}`}>
                  <p className="text-4xl font-bold text-white">{wonItem.value}₽</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {wonItem.value > caseData.price ? (
                    <span className="text-green-500 font-semibold">
                      +{wonItem.value - caseData.price}₽ прибыль
                    </span>
                  ) : wonItem.value === caseData.price ? (
                    <span className="text-yellow-500 font-semibold">
                      Возврат ставки
                    </span>
                  ) : (
                    <span className="text-red-500 font-semibold">
                      {wonItem.value - caseData.price}₽
                    </span>
                  )}
                </p>
              </div>

              <Button onClick={handleClaim} size="lg" className="w-full max-w-xs mx-auto">
                <Icon name="Check" size={20} className="mr-2" />
                Забрать выигрыш
              </Button>
            </div>
          )}

          {isSpinning && (
            <div className="text-center">
              <p className="text-lg text-muted-foreground animate-pulse">
                Открываем кейс...
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CaseOpening;
