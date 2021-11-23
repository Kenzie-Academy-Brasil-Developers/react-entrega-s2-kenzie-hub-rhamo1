import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    font-family: 'PT Mono', monospace;
    
}

#root{
    height: 100vh;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    align-items: center;
}
`;
