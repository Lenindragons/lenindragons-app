import { useState, useEffect, useRef } from 'react';
import { Button } from '@mui/material';

const Timer = () => {
  const [inputTime, setInputTime] = useState(''); // Valor do input (formato MM:SS)
  const [time, setTime] = useState(0); // Tempo restante em segundos
  const [isRunning, setIsRunning] = useState(false); // Estado do timer
  const intervalRef = useRef<any>(null); // Referência para o intervalo

  // Efeito para limpar o intervalo ao desmontar o componente
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  // Função para formatar o input no formato MM:SS
  const formatInput = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    // Adiciona os dois pontos após os primeiros dois dígitos
    if (numbers.length > 2) {
      return `${numbers.slice(0, 2)}:${numbers.slice(2, 4)}`;
    }
    return numbers;
  };

  // Função para converter o formato MM:SS em segundos
  const convertToSeconds = (timeString: string) => {
    const [minutes, seconds] = timeString.split(':').map(Number);
    return minutes * 60 + (seconds || 0);
  };

  // Função para converter segundos em formato MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Função para iniciar ou parar o timer
  const handleStartStop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current); // Para o timer
    } else {
      const seconds = convertToSeconds(inputTime); // Converte o input para segundos
      if (seconds > 0) {
        setTime(seconds); // Define o tempo inicial
        intervalRef.current = setInterval(() => {
          setTime((prevTime) => {
            if (prevTime > 0) {
              const newTime = prevTime - 1;
              setInputTime(formatTime(newTime)); // Atualiza o input com o tempo restante
              return newTime;
            } else {
              clearInterval(intervalRef.current); // Para o timer ao chegar a zero
              setIsRunning(false);
              return 0;
            }
          });
        }, 1000);
      }
    }
    setIsRunning(!isRunning); // Alterna o estado do timer
  };

  // Função para resetar o timer
  const handleReset = () => {
    clearInterval(intervalRef.current); // Para o timer
    setTime(0); // Zera o tempo
    setInputTime(''); // Limpa o input
    setIsRunning(false); // Define o estado como parado
  };

  return (
    <>
      <input
        type="text"
        onChange={(e) => setInputTime(formatInput(e.target.value))}
        value={isRunning ? formatTime(time) : inputTime}
        placeholder='00:00'
        disabled={isRunning}
        style={{
          background: 'none',
          border: 0,
          height: '200px',
          textAlign: 'center',
          fontSize: '120px',
          fontFamily: 'monospace',
          marginTop: '150px',
          outline: 'none'
        }}
      />
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleStartStop}
          style={{ margin: '10px' }}
        >
          {isRunning ? 'Parar' : 'Iniciar'}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleReset}
          style={{ margin: '10px' }}
        >
          Resetar
        </Button>
      </div>
    </>
  );
};

export default Timer;