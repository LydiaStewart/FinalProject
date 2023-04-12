import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styled from "styled-components";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return <Button onClick={() => loginWithRedirect()}>LOG IN</Button>
}

const Button = styled.button`
font-size: 15px;
width: 80px;
//font-weight: bold;

&:hover {
    cursor: pointer;
}
`
export default LoginButton;