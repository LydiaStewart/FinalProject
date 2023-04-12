import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styled from "styled-components";
import {HiOutlineLogout} from "react-icons/hi"
import { NavLink } from "react-router-dom";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return ( <Div>
    <HiOutlineLogout />
    <Button onClick={() => logout({ logoutParams: { returnTo: "http://localhost:3000" } })}>
      Log out
    </Button>
    </Div>
  );
};
const Div = styled.div`
display: flex;
margin: 10px 0px;
`
const Button = styled(NavLink)`
/* position: absolute;
z-index: 1; */
display: inline-block;
border: none;

`
export default LogoutButton;