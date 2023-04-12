import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { FiLoader } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import PersonalBooklist from "./PersonalBooklist";
import FollowerList from "./FollowersList";
import FollowingList from "./FollowingList";
import ErrorPage from "./ErrorPage";

const Profile = () => {
const {user} = useAuth0();
const [userNow, setUserNow] = useState(null);
const navigate = useNavigate();
const [pageState, setPageState] = useState("books")
const [error, setError] = useState(false)
const {logout} = useAuth0;

useEffect(() => {
    if (user) {
        fetch(`/api/user/${user.sub}`)
        .then((res) => res.json())
        .then((data) => {

 setUserNow(data.data)
        })
        .catch((err) => {
            console.log(err.message)
            setError(true)
        })
    }
    
}, [user])

if (error) {

return <ErrorPage />
}

if (!userNow) {
    return <Loading />
}
return <>
<InfoDiv>
<img src={userNow.picture} alt="Your avatar"/>
<Name>{userNow.nickname}</Name>
</InfoDiv>
<TriDiv>
<Books id="books" 
 onClick={() => setPageState("books")}
>Books</Books>
<Followers id="followers" 
 onClick={() => {
    setPageState("followers")
    console.log(pageState)}}
>Followers ({userNow.followedBy.length})</Followers>
<Following id="following" 
onClick={() => setPageState("following")}
>Following ({userNow.following.length})</Following>
    </TriDiv>

{
        pageState === "books"
        && <PersonalBooklist />
     }
     
     {
         pageState === "followers"
         && <FollowerList friend={userNow} />
     }
    {
        pageState === "following"
        && <FollowingList friend={userNow} />
    }  

</>
}

const Books = styled.div`
text-align: center;
width: 150px;
padding-bottom: 10px;
&:hover {
    color:#408E91;
    border-bottom: 2px solid #408E91;
}
&:active {
    color:#408E91;
    border-bottom: 2px solid #408E91;
}
`
const Followers = styled.div`
text-align: center;
width: 150px;
padding-bottom: 10px;
&:hover {
    color:#408E91;
    border-bottom: 2px solid #408E91;
}
&:active {
    color:#408E91;
    border-bottom: 2px solid #408E91;
}
`

const Following = styled.div`
text-align: center;
width: 150px;
padding-bottom: 10px;
&:hover {
    color:#408E91;
    border-bottom: 2px solid #408E91;
}
&:active {
    color:#408E91;
    border-bottom: 2px solid #408E91;
}
`

const TriDiv = styled.div`
display: flex;
justify-content: space-around;
margin: 40px;
padding-bottom: 15px;
font-weight: bold;
border-bottom: 2px solid black;
`

const Name = styled.h1`
margin-left: 20px;
justify-self: flex-end;
`
const InfoDiv = styled.div`
display: flex;
margin-left: 30px;
`
const Loading = styled(FiLoader)`

  animation: spin 2s linear infinite;
  color: white;
  position: absolute;
    top: 70%;
    left: 50%;
    margin-top: -70px;
    margin-left: -50px;
    width: 100px;
    height: 100px;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`
export default Profile;