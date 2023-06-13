import { ThemeOptions } from '@mui/material/styles';

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#a0532d',
    },
    background: {
        default: '#222831',
        paper: '#393E46'
    },
    text: {
      primary: '#e2eff6',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)'
    },
    action: {
      active: '#e2eff6',
      hover: 'rgba(255, 255, 255, 0.08)',
      selected: 'rgba(255, 255, 255, 0.16)',
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)'
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
};

export default darkThemeOptions;
