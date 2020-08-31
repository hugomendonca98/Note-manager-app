import { createMuiTheme } from '@material-ui/core/styles';
import { PrimaryColor, WhiteColor, GrayColor } from '../Colors';

const theme = createMuiTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: PrimaryColor,
      },
      secondary: {
        // This is green.A700 as hex.
        main: WhiteColor,
        dark: GrayColor,
      },
    },
  });

  export default theme;