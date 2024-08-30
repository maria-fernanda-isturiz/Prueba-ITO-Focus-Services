import React, { useState, useEffect } from 'react';

interface TimerProps {
    product: {
        id: string;
        name: string;
        preparation_time: number;
    };
    onComplete: () => void;
}

const Timer: React.FC<TimerProps> = ({ product, onComplete }) => {
    const [timeLeft, setTimeLeft] = useState(product.preparation_time);

    useEffect(() => {
        if (timeLeft === 0) {
            onComplete();
            return;
        }

        const timerId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft, onComplete]);

    return (
        <div>
            <span>{product.name} - Tiempo restante: {timeLeft} segundos</span>
        </div>
    );
};

export default Timer;
