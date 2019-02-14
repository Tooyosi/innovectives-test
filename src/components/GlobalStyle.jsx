import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
*{
    box-sizing : border-box;
}
:root {
    --color-primary: #ff0073;
    --color-grey: 3d3d3d;
    --font-primary: 'Open sans', Regular;
}
body {
    margin: 0;
    font-family: --font-primary;
    font-size: 15px;
}
`
export default GlobalStyle;