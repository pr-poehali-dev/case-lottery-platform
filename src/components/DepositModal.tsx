import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface DepositModalProps {
  onClose: () => void;
  onDeposit: (amount: number) => void;
}

const quickAmounts = [100, 500, 1000, 5000, 10000];

const DepositModal = ({ onClose, onDeposit }: DepositModalProps) => {
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDeposit = async () => {
    const depositAmount = parseInt(amount);
    
    if (!depositAmount || depositAmount < 100) {
      return;
    }

    if (cardNumber.replace(/\s/g, '').length !== 16) {
      return;
    }

    setIsProcessing(true);
    
    setTimeout(() => {
      onDeposit(depositAmount);
      setIsProcessing(false);
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-md p-6 bg-card border-2 border-border animate-scale-in">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Icon name="CreditCard" size={28} />
              Пополнение баланса
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              disabled={isProcessing}
            >
              <Icon name="X" size={24} />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold mb-2 block">
                Сумма пополнения
              </label>
              <Input
                type="number"
                placeholder="Минимум 100₽"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-lg h-12"
                disabled={isProcessing}
              />
              <div className="flex gap-2 mt-2 flex-wrap">
                {quickAmounts.map((quickAmount) => (
                  <Button
                    key={quickAmount}
                    variant="outline"
                    size="sm"
                    onClick={() => setAmount(quickAmount.toString())}
                    disabled={isProcessing}
                  >
                    {quickAmount.toLocaleString('ru-RU')}₽
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold mb-2 block">
                Номер карты
              </label>
              <Input
                type="text"
                placeholder="0000 0000 0000 0000"
                value={cardNumber}
                onChange={(e) => {
                  const cleaned = e.target.value.replace(/\D/g, '');
                  if (cleaned.length <= 16) {
                    setCardNumber(formatCardNumber(cleaned));
                  }
                }}
                className="text-lg h-12 font-mono"
                disabled={isProcessing}
                maxLength={19}
              />
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary" className="text-xs">
                  <Icon name="Shield" size={12} className="mr-1" />
                  Безопасная оплата
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  <Icon name="Lock" size={12} className="mr-1" />
                  SSL шифрование
                </Badge>
              </div>
            </div>

            {amount && parseInt(amount) >= 100 && (
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">К зачислению:</span>
                  <span className="text-2xl font-bold text-green-500">
                    +{parseInt(amount).toLocaleString('ru-RU')}₽
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Комиссия: 0% • Зачисление мгновенное
                </p>
              </div>
            )}

            <Button
              onClick={handleDeposit}
              disabled={!amount || parseInt(amount) < 100 || cardNumber.replace(/\s/g, '').length !== 16 || isProcessing}
              className="w-full h-12 text-lg font-semibold"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                  Обработка...
                </>
              ) : (
                <>
                  <Icon name="CreditCard" size={20} className="mr-2" />
                  Пополнить баланс
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DepositModal;
