declare global {
  interface Window {
    devtools: {
      isOpen: boolean;
    };
  }
}


// Impedir ctrl+c na página
document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && (event.key === 'c' || event.key === 'C')) {
    event.preventDefault();
  }
});

// Impedir abrir o modo desenvolvedor
document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.shiftKey && (event.key === 'i' || event.key === 'I' || event.key === 'j' || event.key === 'J')) {
    event.preventDefault();
  }
  if (event.key === 'F12') {
    event.preventDefault();
  }
});

// Impedir clicar com o botão direito e abrir o menu
document.addEventListener('contextmenu', function (event) {
  event.preventDefault();
});

// // Ficar dando refresh automatico na página se o desenvolvedor estiver aberto
// let devtoolsOpen = false;

// // Verificar a largura do console do desenvolvedor
// const checkDevtools = () => {
//   const widthThreshold = window.outerWidth - window.innerWidth > 160;
//   const heightThreshold = window.outerHeight - window.innerHeight > 160;
//   devtoolsOpen = widthThreshold || heightThreshold;
// };

// // Atualizar a variável devtoolsOpen
// checkDevtools();

// // Verificar periodicamente se o console do desenvolvedor está aberto
// setInterval(() => {
//   checkDevtools();
//   if (devtoolsOpen) {
//     console.log('Console do desenvolvedor está aberto!');
//     window.location.reload();
//   }
// }, 1000);

export {};