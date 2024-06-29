import { useEffect, useState } from 'react';

const randomName = () => {
  const firstNames = [
    'João', 'Maria', 'Pedro', 'Ana', 'Carlos', 'Lúcia', 'Mariana', 'Fernanda', 'Rafael',
    'Juliana', 'Rodrigo', 'Carolina', 'Paulo', 'Camila', 'Lucas', 'Beatriz', 'Gustavo',
    'Natália', 'Thiago', 'Amanda', 'Bruno', 'Tatiane', 'Diego', 'Patrícia', 'Luciana',
    'Marcelo', 'Isabela', 'Fábio', 'Bianca', 'Luiz', 'Letícia', 'Vinícius', 'Michele',
    'Ricardo', 'Fernanda', 'Henrique', 'Débora', 'Felipe', 'Daniela', 'Renato', 'Priscila',
    'Gabriel', 'Vanessa', 'Adriano', 'Jéssica', 'Anderson', 'Carla', 'Sergio', 'Julia'
  ];
  const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  return randomFirstName;
};

const randomLetter = () => {
  return String.fromCharCode(65 + Math.floor(Math.random() * 26));
};

const randomAmount = () => {
  return Math.floor(Math.random() * (200 - 10 + 1) + 10); // Gera um número aleatório entre 10 e 200
};

const Notification = () => {
  const [winner, setWinner] = useState('');
  const [showWinner, setShowWinner] = useState(false);
  const [amount, setAmount] = useState(randomAmount());

  useEffect(() => {
    const interval = setInterval(() => {
      setWinner(`${randomName()} ${randomLetter()}.`);
      setShowWinner(true);
      const newAmount = randomAmount();
      setAmount(newAmount);

      setTimeout(() => {
        setShowWinner(false);
      }, 4000); // Remove a notificação após 3 segundos
    }, 8000); // Mostra uma nova notificação a cada 6 segundos

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        width: 'auto',
        maxWidth: 'calc(100vw - 40px)', // Largura máxima igual à largura da tela menos 40px
        backgroundColor: 'green',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
        zIndex: 50,
        opacity: showWinner ? '1' : '0', // Define a opacidade como 1 se houver um vencedor, caso contrário, define como 0
        transition: 'opacity 1s', // Adiciona uma transição de 1 segundo para a mudança de opacidade
      }}
    >
      {winner && `${winner} acabou de ganhar R$${amount}`}
    </div>
  );
};

export default Notification;
