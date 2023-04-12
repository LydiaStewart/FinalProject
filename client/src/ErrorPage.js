import {GiPerspectiveDiceSixFacesRandom} from "react-icons/gi"
import styled from "styled-components";

const ErrorPage = () => {

    return (
        <>
        <Div>
        <Dice />
        <p>An unknown error has occured.</p>
        <p>Please try refreshing the page, or <Span>contact support</Span> if the problem persists.</p>
        </Div>
        </>
    )

}
const Span = styled.span`
color: blue;
text-decoration: underline;

&:hover {
    cursor: pointer;
}
`
const Dice = styled(GiPerspectiveDiceSixFacesRandom)`
width: 75px;
height: 75px;
`
const Div = styled.div`
width: 100vw;
flex-direction: column;
display: flex;
align-items: center;
justify-content: center;
`
export default ErrorPage;