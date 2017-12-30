import { createMuiTheme } from 'material-ui/styles';

import blue from 'material-ui/colors/blue';
import pink from 'material-ui/colors/pink';
import grey from 'material-ui/colors/grey';
import common from 'material-ui/colors/common';

const blue300 = blue['300'];
const blue500 = blue['500'];
const blue700 = blue['700'];
const blue900 = blue['900'];
const pinkA200 = pink.A200;
const grey100 = grey['100'];
const grey200 = grey['200'];
const grey300 = grey['300'];
const grey500 = grey['500'];
const white = common.white;
const darkBlack = common.darkBlack;
const fullBlack = common.fullBlack;

export default createMuiTheme({
    palette: {
        primary1Color: blue700,
        primary2Color: blue900,
        primary3Color: grey200,
        accent1Color: blue700,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: grey100,
        pickerHeaderColor: blue500,
        clockCircleColor: grey500,
        shadowColor: fullBlack,
    },
});