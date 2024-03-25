const installEvent = () => {
    self.addEventListener('install', () => {
      console.log('The service worker is installed!!!!');
    });
  };
  installEvent();
  
  const activateEvent = () => {
    self.addEventListener('activate', () => {
      console.log('The service worker is activated!!!');
    });
  };

  activateEvent();
