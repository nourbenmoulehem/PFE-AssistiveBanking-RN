export const tokens = (mode: string) => {
  type ColorScheme = {
    primary: {[key: string]: string};
    secondary: {[key: string]: string};
    tertiary: {[key: string]: string};
    accent: {[key: string]: string};
    secondaryAccent: {[key: string]: string};
    background: {[key: string]: string};
    main: {
      backgroundColor: string;
      buttonColor: string;
      fontColor: string;
      rectangleColor: string;
      warning: string,
      danger: string,
      pass: string,
      warningText: string,
      dangerText: string,
      passText: string,
      old:string,
      new:string,
      gaugeBG:string,
    };
  };

  const colorSchemes: {[key: string]: ColorScheme} = {
    dark: {
      primary: {
        100: '#FEE2D8',
        200: '#FBC5B2',
        300: '#F6A68D',
        400: '#F28769',
        500: '#EE6445',
        600: '#E93E1C',
        700: '#C92E13',
        800: '#A0210E',
        900: '#7B1509',
      },
      secondary: {
        100: '#FEE6B9',
        200: '#FCCC78',
        300: '#FAAA33',
        400: '#F99810',
        500: '#E58006',
        600: '#C26A05',
        700: '#A45704',
        800: '#824003',
        900: '#643002',
      },
      tertiary: {
        100: '#FCE2CF',
        200: '#F8C2A0',
        300: '#F3A87C',
        400: '#EE8A58',
        500: '#EA6D34',
        600: '#DC5318',
        700: '#B94213',
        800: '#95300F',
        900: '#712109',
      },
      accent: {
        100: '#E1ECFE',
        200: '#C9DCFC',
        300: '#ADC7FA',
        400: '#91B0F7',
        500: '#7698F4',
        600: '#5F84F1',
        700: '#456AEE',
        800: '#163EDF',
        900: '#0F2BA9',
      },
      secondaryAccent: {
        100: '#CEF8FD',
        200: '#A0EDF8',
        300: '#71E0F4',
        400: '#45CFEE',
        500: '#24C3EB',
        600: '#14A6D2',
        700: '#1089B1',
        800: '#0B6B8E',
        900: '#08516D',
      },
      background: {
        // dark blue
        100: '#161A25',
        200: '#2C3344',
        300: '#424C61',
        400: '#57637A',
        500: '#6D7D97',
        600: '#8B98AC',
        700: '#A7B3C3',
        800: '#C1CBD7',
        900: '#DFE5EC',
      },
      main: {
        backgroundColor: '#161A25',
        buttonColor: '#fb8500',
        fontColor: 'white',
        rectangleColor: '#2C3344',
        warning: '#FCCC78',
        danger: '#F6A68D',
        pass: '#C9DCFC',
        warningText: '#824003',
        dangerText: '#7B1509',
        passText: '#5F84F1',
        old:'#F8C2A0',
      new:'#EE8A58',
      gaugeBG:'#999999',
      },
    },
    light: {
      primary: {
        // tomato
        100: '#7B1509',
        200: '#A0210E',
        300: '#C92E13',
        400: '#E93E1C',
        500: '#EE6445',
        600: '#F28769',
        700: '#F6A68D',
        800: '#FBC5B2',
        900: '#FEE2D8',
      },
      secondary: {
        // yellow
        100: '#643002',
        200: '#824003',
        300: '#A45704',
        400: '#C26A05',
        500: '#E58006',
        600: '#F99810',
        700: '#FAAA33',
        800: '#FCCC78',
        900: '#FEE6B9',
      },
      tertiary: {
        // cream
        100: '#712109',
        200: '#95300F',
        300: '#B94213',
        400: '#DC5318',
        500: '#EA6D34',
        600: '#EE8A58',
        700: '#F3A87C',
        800: '#F8C2A0',
        900: '#FCE2CF',
      },
      accent: {
        // indigo
        100: '#0F2BA9',
        200: '#163EDF',
        300: '#456AEE',
        400: '#5F84F1',
        500: '#7698F4',
        600: '#91B0F7',
        700: '#ADC7FA',
        800: '#C9DCFC',
        900: '#E1ECFE',
      },
      secondaryAccent: {
        // cyan
        100: '#08516D',
        200: '#0B6B8E',
        300: '#1089B1',
        400: '#14A6D2',
        500: '#24C3EB',
        600: '#45CFEE',
        700: '#71E0F4',
        800: '#A0EDF8',
        900: '#CEF8FD',
      },
      background: {
        // light cream

        100: '#EEEEEF',
        200: '#D8D8DA',
        300: '#C4C4C5',
        400: '#ADADAD',
        500: '#999999',
        600: '#828282',
        700: '#6E6E6E',
        800: '#575757',
        900: '#424243',
      },
      main: {
        backgroundColor: '#EEEEEF',
          buttonColor: '#fb8500',
          fontColor: 'black',
          rectangleColor: '#D8D8DA',
            warning: '#A45704',
          danger: '#F6A68D',
          pass: '#ADC7FA',
          warningText: '#A45704',
          dangerText: '#C92E13',
          passText: '#0F2BA9',
          old:'#EE8A58',
        new:'#DC5318',
        gaugeBG:'#999999',

      },
    },
    protanopia: {
      primary: { //moss_green
        100: '#F7E7B8',
        200: '#E7D27A',
        300: '#D0B93A',
        400: '#C4AE1D',
        500: '#AC9917',
        600: '#918014',
        700: '#796B12',
        800: '#5E530F',
        900: '#49400C'
      }, 
      secondary: { // olive
        100: '#f3f3c3',
        200: '#e7e68c',
        300: '#d7d64f',
        400: '#cece30',
        500: '#b9b823',
        600: '#9b9b1d',
        700: '#828118',
        800: '#656411',
        900: '#4d4d0d'
      }, 
      tertiary: { // pearl
        100: '#f0f0d3',
        200: '#r0r0a8',
        300: '#d2d186',
        400: '#c2c164',
        500: '#b3b241',
        600: '#a09f26',
        700: '#85841e',
        800: '#696816',
        900: '#4e4d0e'
      }, 
      accent: { // periwinkle
        100: '#e5e5f9',
        200: '#d1d1f4',
        300: '#b8b8ed',
        400: '#9e9ee5',
        500: '#8485dd',
        600: '#6f6fd6',
        700: '#5555ce',
        800: '#2727b8',
        900: '#1b1b8a',
      }, 
      secondaryAccent: { // cornflower_blue
        100: '#Ee0e0fb',
        200: '#c1c2f5',
        300: '#a1a2ef',
        400: '#8081e6',
        500: '#686ae1',
        600: '#5354c7',
        700: '#4445a7',
        800: '#343585',
        900: '#272866'
      },
      background: {
        // raisin_black
        100: '#171722',
        200: '#2f2f3f',
        300: '#46465b',
        400: '#5c5c74',
        500:  '#737490',
        600:  '#9090a7',
        700: '#acacbf',
        800:  '#c5c5d4',
        900: '#E1E1EA',
      },
      main: {
        backgroundColor: '#171722',
        buttonColor: '#C7C620',
        fontColor: 'white',
        rectangleColor: '#2f2f3f',
        warning: '#E7E68C',
        danger: '#D3D293',
        pass: '#D1D1F4',
        warningText: '#656411',
        dangerText: '#4E4D0B',
        passText: '#6F6FD6',
        old:'#E0E0A8',
        new:'#C2C164',
        gaugeBG:'#999999',
      },
    },
    deuteranopia: {
      primary: {
        100: '#FFE0DB',
        200: '#F1C8AF',
        300: '#DBB089',
        400: '#C79B63',
        500: '#B2873E',
        600: '#A07700',
        700: '#876400',
        800: '#6B4F00',
        900: '#523D00'
      }, 
      secondary: {
        100: '#f5f6c6',
        200: '#eaed91',
        300: '#dce256',
        400: '#d4db38',
        500: '#bfc62a',
        600: '#a1a723',
        700: '#878c1c',
        800: '#696e15',
        900: '#50540f'
      }, 
      tertiary: {
        100: '#f2f4d4',
        200: '#e3e7aa',
        300: '#d6dc89',
        400: '#c8d067',
        500: '#bbc445',
        600: '#a8b229',
        700: '#8c9521',
        800: '#6f7618',
        900: '#535910'
      }, 
      accent: {
      100: '#e5e4f8',
      200: '#d0cef2',
      300: '#b6b4ea',
      400: '#9c9ae1',
      500: '#8280d8',
      600: '#6c6ad0',
      700: '#5250c6',
      800: '#2522ae',
      900: '#191783'
      }, 
      secondaryAccent: {
        100: '#dddafb',
        200: '#bcb7f4',
        300: '#9a92ee',
        400: '#786ee4',
        500: '#5f53df',
        600: '#4a3fc4',
        700: '#3d34a5',
        800: '#2f2783',
        900: '#231d64'
      },
      background: {
        
        100: '#171721',
        200: '#2E2E3E',
        300: '#45455A',
        400: '#5B5A73',
        500:  '#73718F',
        600:  '#8F8EA6',
        700: '#ABAABE',
        800:  '#C4C4D3',
        900: '#E1E0E9',
      },
      main: {
        backgroundColor: '#171721',
        buttonColor: '#CED727',
        fontColor: 'white',
        rectangleColor: '#2E2E3E',
        warning: '#EAED91',
        danger: '#D8DE94',
        pass: '#D0CEF2',
        warningText: '#696E15',
        dangerText: '#545C0C',
        passText: '#6C6AD0',
        old:'#E3E7AA',
        new:'#C8D067',
        gaugeBG:'#999999',
      },
    },
    tritanopia: {
      primary: {
        100: '#FFDEEE',
        200: '#FFBFCE',
        300: '#F9A0AC',
        400: '#F4818A',
        500: '#EF6066',
        600: '#E93D3F',
        700: '#C82F30',
        800: '#9F2425',
        900: '#7A1A1B'
      },
      secondary: {
        100: '#fcccce',
        200: '#F99c9f',
        300: '#f6666b',
        400: '#f44a50',
        500: '#df3a3f',
        600: '#bd3034',
        700: '#a0272b',
        800: '#7e1d1f',
        900: '#611517'
      },
      tertiary: {
        100: '#fad7d8',
        200: '#f5aeb0',
        300: '#ef8f90',
        400: '#e96d6f',
        500: '#e34c4f',
        600: '#d53134',
        700: '#b32729' ,
        800: '#8f1d1e',
        900: '#6d1314'
      },
      accent: {
        100: '#e1f6f5',
        200: '#c9eeec',
        300: '#aee2e1',
        400: '#92d8d5',
        500: '#77ccc8',
        600: '#60c1bd',
        700: '#46b4af',
        800: '#189992',
        900: '#10726d'
      },
      secondaryAccent: {
        100: '#d9fafa',
        200: '#a3f3f2',
        300: '#76ebea',
        400: '#4be0df',
        500: '#2bd9d8',
        600: '#1bbebd',
        700: '#169f9e',
        800: '#0f7e7d',
        900: '#0b605f'
      },
      background: {
        100: '#16201F',
        200: '#2C3C3B',
        300: '#425757',
        400: '#57706F',
        500: '#6D8B8A',
        600: '#8BA3A2',
        700: '#8BA3A2',
        800: '#A7BCBB',
        900: '#DFE8E8'
      },
    main: {
        backgroundColor: '#16201F',
        buttonColor: '#F5393F',
        fontColor: 'white',
        rectangleColor: '#2C3C3B',
        warning: '#F99C9F',
        danger: '#F29798',
        pass: '#C9EEEC',
        warningText: '#7E1D1F',
        dangerText: '#750E0E',
        passText: '#60C1BD',
        old: '#F5AEB0',
        new: '#E96D6F',
        gaugeBG: '#999999',
    },
  },

  };

  // Check if mode is defined and exists in colorSchemes
  if (mode && colorSchemes[mode]) {
    return colorSchemes[mode];
  } else {
    // Return a default color scheme if mode is not defined or does not match a key
    return colorSchemes['light'];
  }
};

    