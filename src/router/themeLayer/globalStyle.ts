import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body {
        overflow: auto;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }
    ::-webkit-scrollbar-track {
        background: #A9B3BF;
        border-radius: 8px;
        -webkit-box-shadow: initial;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 8px;
        background: #354252;
    }
    ul {
        padding: 0;
        margin: 0 16px;

        & > li {
            margin-bottom: 8px;
            padding-left: 8px;

            &.valid {
                color: #13a688;

                &::marker {
                    content: "✓";
                    color: #13a688;
                }
            }
            &.invalid {
                color: red;
            }
        }
    }
`;
