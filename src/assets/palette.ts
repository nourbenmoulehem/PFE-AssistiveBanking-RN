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
        rectangleColor: '#2b2f39',
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
      primary: {
        100: '#151539',
        200: '#292a72',
        300: '#3e3fab',
        400: '#6c6eca',
        500: '#a7a8df',
        600: '#b7b8e5',
        700: '#c9caec',
        800: '#dbdbf2',
        900: '#ededf9',
      }, //periwinkle
      secondary: {
        100: '#101125',
        200: '#212249',
        300: '#31326e',
        400: '#424392',
        500: '#5758b4',
        600: '#7879c2',
        700: '#9a9bd1',
        800: '#bbbce1',
        900: '#dddef0',
      }, // iris
      tertiary: {
        100: '#04040d',
        200: '#08091a',
        300: '#0d0d27',
        400: '#111234',
        500: '#151641',
        600: '#2a2b81',
        700: '#3f41c1',
        800: '#7f81d6',
        900: '#bfc0ea',
      }, // space_cadet
      accent: {
        100: '#2f2f07',
        200: '#5e5e0f',
        300: '#8c8c16',
        400: '#bbbb1d',
        500: '#dfdf2e',
        600: '#e5e559',
        700: '#ecec83',
        800: '#f2f2ac',
        900: '#f9f9d6',
      }, // pear
      secondaryAccent: {
        100: '#272706',
        200: '#4f4f0d',
        300: '#767613',
        400: '#9e9e1a',
        500: '#c7c620',
        600: '#e0e03e',
        700: '#e7e76e',
        800: '#efef9f',
        900: '#f7f7cf',
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
        backgroundColor: '#181C27',
        buttonColor: '#fb8500',
        fontColor: 'white',
        rectangleColor: '#2b2f39',
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
  };

  // Check if mode is defined and exists in colorSchemes
  if (mode && colorSchemes[mode]) {
    return colorSchemes[mode];
  } else {
    // Return a default color scheme if mode is not defined or does not match a key
    return colorSchemes['light'];
  }
};

    