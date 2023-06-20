module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      spacing: {
        '0': '0rem',
        '01': '0.1rem',
        '02': '0.2rem',
        '03': '0.3rem',
        '04': '0.4rem',
        '05': '0.5rem',
        '06': '0.6rem',
        '07': '0.7rem',
        '08': '0.8rem',
        '09': '0.9rem',
        '1': '1rem',
        '2': '2rem',
        '3': '3rem',
        '4': '4rem',
        '5': '5rem',
        '6': '6rem',
        '7': '7rem',
        '8': '8rem',
        '9': '9rem',
        '10': '10rem',
        '11': '11rem',
        '12': '12rem',
        '13': '13rem',
        '14': '14rem',
        '15': '15rem',
        '16': '16rem',
        '17': '17rem',
        '18': '18rem',
        '19': '19rem',
        '20': '20rem',
      },
  
      extend: {
        screens: {
          'print': { 'raw': 'print' },
        },
        colors: {
            background: "#121212",
            surface: "#1e1e1e",
            primary: "#bb87fa",
            secondary: "#1cd9c5",
            onBackground: "#d8d8d8",
            onSurface:"#e1e1e1",
            onPrimary: "#00000000",
            onSecondary: "#0000",
        },
  
        minHeight: {
          'a4h': '31.7cm',
        },
  
        gridTemplateColumns: {
          "devices": "repeat(auto-fit, minmax(25rem, 35rem))",
        },
  
        keyframes: {
          slideInLeft: {
            "from": {
              transform: "translate3d(-100%, 0, 0)",
              visibility: "visible",
            },
            "to": {
              transform: "translate3d(0, 0, 0)",
              visibility: "visible",
            },
          },
          slideInRight: {
            "from": {
              transform: "translate3d(100%, 0, 0)",
              visibility: "visible",
            },
            "to": {
              transform: "translate3d(0, 0, 0)",
              visibility: "visible",
            },
          },
          slideInDown: {
            "from": {
              transform: "translate3d(0, 100%, 0)",
              visibility: "visible",
            },
            "to": {
              transform: "translate3d(0, 0, 0)",
              visibility: "visible",
            },
          },
          slideInUp: {
            "from": {
              transform: "translate3d(0, -100%, 0)",
              visibility: "visible",
            },
            "to": {
              transform: "translate3d(0, 0, 0)",
              visibility: "visible",
            },
          },
  
          showLogo: {
            "from": {
              opacity: "0",
            },
  
            "to": {
              opacity: "1",
            },
          },
          fadeInDown: {
            "from": {
              opacity: "0",
              transform: "translate3d(0, -100%, 0)",
            },
            "to": {
              opacity: "1",
              transform: "translate3d(0, 0, 0)",
            },
          },
        },
  
        animation: {
          fadeInDown: "fadeInDown 1s cubic-bezier(0.25,0.1,0.25,1.5) 0s 1 forwards",
          slideInLeft: "slideInLeft 1s cubic-bezier(0.25,0.1,0.25,1.5) 0.5s 1 forwards",
          slideInRight: "slideInRight 1s cubic-bezier(0.25,0.1,0.25,1.5) 0.5s 1 forwards",
          slideInDown: "slideInDown 1s cubic-bezier(0.25,0.1,0.25,1.5) 0.5s 1 forwards",
          slideInUp: "slideInUp 1s cubic-bezier(0.25,0.1,0.25,1.5) 0.5s 1 forwards",
          showLogo: "showLogo 1s linear 1s 1 forwards",
        },
  
        animationDelay: {
          '0': "0ms",
          "1": "1s",
          "2": "2s"
        }
      },
    },
    plugins: [],
  }