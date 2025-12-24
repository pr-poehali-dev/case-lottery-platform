import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface WithdrawModalProps {
  onClose: () => void;
  onWithdraw: (amount: number, cardNumber: string) => void;
  availableBalance: number;
}

const WithdrawModal = ({ onClose, onWithdraw, availableBalance }: WithdrawModalProps) => {
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleWithdraw = async () => {
    const withdrawAmount = parseInt(amount);
    
    if (!withdrawAmount || withdrawAmount < 100) {
      return;
    }

    if (withdrawAmount > availableBalance) {
      return;
    }

    if (cardNumber.replace(/\s/g, '').length !== 16) {
      return;
    }

    setIsProcessing(true);
    
    setTimeout(() => {
      onWithdraw(withdrawAmount, cardNumber);
      setIsProcessing(false);
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  const quickAmounts = [100, 500, 1000, 5000];
  const filteredQuickAmounts = quickAmounts.filter(q => q <= availableBalance);

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-md p-6 bg-card border-2 border-border animate-scale-in">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Icon name="Banknote" size={28} />
              Вывод средств
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

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Доступно для вывода:</span>
              <span className="text-xl font-bold text-green-500">
                {availableBalance.toLocaleString('ru-RU')}₽
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold mb-2 block">
                Сумма вывода
              </label>
              <Input
                type="number"
                placeholder="Минимум 100₽"
                value={amount}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 0;
                  if (val <= availableBalance) {
                    setAmount(e.target.value);
                  }
                }}
                className="text-lg h-12"
                disabled={isProcessing}
              />
              {filteredQuickAmounts.length > 0 && (
                <div className="flex gap-2 mt-2 flex-wrap">
                  {filteredQuickAmounts.map((quickAmount) => (
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAmount(availableBalance.toString())}
                    disabled={isProcessing}
                  >
                    Все
                  </Button>
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold mb-2 block">
                Номер карты для вывода
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
                  <Icon name="Clock" size={12} className="mr-1" />
                  Обработка до 24 часов
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  <Icon name="Shield" size={12} className="mr-1" />
                  Безопасно
                </Badge>
              </div>
            </div>

            {amount && parseInt(amount) >= 100 && parseInt(amount) <= availableBalance && (
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">К получению:</span>
                  <span className="text-2xl font-bold text-orange-500">
                    {parseInt(amount).toLocaleString('ru-RU')}₽
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Комиссия: 0% • Средства поступят в течение 24 часов
                </p>
              </div>
            )}

            <Button
              onClick={handleWithdraw}
              disabled={
                !amount || 
                parseInt(amount) < 100 || 
                parseInt(amount) > availableBalance ||
                cardNumber.replace(/\s/g, '').length !== 16 || 
                isProcessing
              }
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
                  <Icon name="Send" size={20} className="mr-2" />
                  Вывести средства
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WithdrawModal;
