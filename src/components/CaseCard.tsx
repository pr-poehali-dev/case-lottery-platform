import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import type { CaseData } from '@/pages/Index';

interface CaseCardProps {
  caseData: CaseData;
  onOpen: () => void;
  disabled?: boolean;
}

const rarityColors = {
  common: 'bg-gray-500',
  rare: 'bg-blue-500',
  epic: 'bg-purple-500',
  legendary: 'bg-yellow-500',
};

const CaseCard = ({ caseData, onOpen, disabled = false }: CaseCardProps) => {
  const maxValue = Math.max(...caseData.items.map((item) => item.value));
  const minValue = Math.min(...caseData.items.map((item) => item.value));

  return (
    <Card className="overflow-hidden hover:scale-105 transition-transform duration-300 border-2 border-border bg-card">
      <div className="p-6 space-y-4">
        <div className="text-center">
          <div className="text-6xl mb-3">{caseData.image}</div>
          <h3 className="text-xl font-bold mb-1">{caseData.name}</h3>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>{minValue}₽</span>
            <span>—</span>
            <span className="text-foreground font-semibold">{maxValue}₽</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 justify-center">
          {caseData.items.map((item, index) => (
            <Badge
              key={index}
              className={`${rarityColors[item.rarity]} text-white text-xs`}
            >
              {item.name}
            </Badge>
          ))}
        </div>

        <Button
          onClick={onOpen}
          disabled={disabled}
          className="w-full font-semibold text-lg h-12"
          size="lg"
        >
          {caseData.price === 0 ? (
            <>
              <Icon name="Gift" size={20} className="mr-2" />
              Открыть бесплатно
            </>
          ) : (
            <>
              <Icon name="PackageOpen" size={20} className="mr-2" />
              Открыть за {caseData.price}₽
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default CaseCard;
