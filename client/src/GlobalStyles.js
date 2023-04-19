import {createGlobalStyle} from "styled-components"

export const breakpoints = {tablet: "600px"}

export default createGlobalStyle`
:root {

}
html, body {
        margin: 0;
        //background-image: url("https://static01.nyt.com/images/2019/12/17/books/review/17fatbooks/17fatbooks-superJumbo.jpg") 
        background-color: #D8D8D8;
        // #456c6f
        
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
        font-family: Raleway;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    h1, h2, h3 {
      color: var(--primary-color);
      font-family: var(--heading-font-family);
    }
    h2 {
      font-size: 28px;
    }
`