import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import {Tooltip} from "react-tippy";
import styled from "styled-components";
import { FiLoader } from "react-icons/fi";
import FollowingList from "./FollowingList";
import FollowerList from "./FollowersList";
import BookList from "./BookList";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import ErrorPage from "./ErrorPage";

const FriendProfile = () => {
const {user} = useAuth0();
const {userId} = useParams();
const [friend, setFriend] = useState(null);
const [currentUser, setCurrentUser] = useState(null)
const [pageState, setPageState] = useState("books")
const [error, setError] = useState(false);
const [update, setUpdate] = useState(true)

useEffect(() => {
    fetch(`/api/user/${userId}`)
    .then((res) => res.json())
    .then((data) => {
        setFriend(data.data)
    })
    .catch((err) => {
        console.log(err.message)
        setError(true)
      })
}, [userId])

useEffect(() => {
    if (user) {
        fetch(`/api/user/${user.sub}`)
        .then((res) => res.json())
        .then((data) => {
           
            setCurrentUser(data.data)
        })
        .catch((err) => {
            console.log(err.message)
            setError(true)
          })
    }
    
}, [user])


     
    const removeThisUser = () => {
         fetch(`/api/removefollower/${user.sub}`, {
                method: "PATCH",
                      headers: {
                          Accept: "application/json",
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(
                        friend
                        ),
                        })
                  .then((res) => res.json())
                  .then((data) => {
                    setUpdate(!update)
                  })
                  .catch((error) => {
                      console.log(error.message)
                  })
            
        
  
}


    const followThisUser = () => {
        fetch(`/api/addfollower/${user.sub}`, {
        method: "POST",
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(
                friend
                ),
                })
          .then((res) => res.json())
          .then((data) => {
            setUpdate(!update)
          })
          .catch((error) => {
              console.log(error.message)
          })
        }

   
        


const areTheyFollowing = currentUser?.following.some((follower) => {
    return follower._id === friend._id
   })

if (error) {
    return <ErrorPage />
}

return (   !friend
    ? <Loading />
    : <>
    <InfoDiv>
    <img src={friend.picture} />
    <SmallDiv>
    <Name>{friend.nickname}</Name>
    {
        !areTheyFollowing 
        ? <Button onClick={() => {
            followThisUser()
        }}>Follow <AiOutlinePlus /></Button>
        : <Tooltip title="Unfollow">
          <FollowingButton onClick={() => removeThisUser()}>Following <AiOutlineCheck /></FollowingButton>
          </Tooltip>
    }
    </SmallDiv>
</InfoDiv>
    <TriDiv>
<Books id="books" 
 onClick={() => setPageState("books")}
>Books</Books>
<Followers id="followers" 
 onClick={() => setPageState("followers")}
>Followers ({friend.followedBy.length})</Followers>
<Following id="following" 
onClick={() => setPageState("following")}
>Following ({friend.following.length})</Following>
    </TriDiv>
    
     {
        pageState === "books"
        && <BookList friend={friend}/>
     }
     
     {
         pageState === "followers"
         && <FollowerList friend={friend} />
     }
    {
        pageState === "following"
        && <FollowingList friend={friend} />
    }  
    </>
)

}
const SmallDiv = styled.div`
display: flex;
width: 350px;
`
const Name = styled.h1`
margin-left: 20px;
justify-self: flex-end;
`

const Books = styled.div`
text-align: center;
width: 150px;
padding-bottom: 10px;
&:hover {
    color:#408E91;
    border-bottom: 2px solid #408E91;
    cursor: pointer;
}
&:active {
    color:#408E91;
}
`
const Followers = styled.div`
text-align: center;
width: 150px;
padding-bottom: 10px;
&:hover {
    color:#408E91;
    border-bottom: 2px solid #408E91;
    cursor: pointer;
}
`

const Following = styled.div`
text-align: center;
width: 150px;
padding-bottom: 10px;
&:hover {
    color:#408E91;
    border-bottom: 2px solid #408E91;
    cursor: pointer;
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
const InfoDiv = styled.div`
display: flex;
width: 100vw;
margin-left: 30px;
`
const FollowingButton = styled.button`
margin-top: 25px;
margin-left: 25px;
border-radius: 20px;
`
const Button = styled.button`
height: 30px;
border-radius: 20px;
font-size: 15px;
margin-top: 25px;
margin-left: 25px;

&:hover {
    cursor: pointer;
    background-color: white;
}
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

export default FriendProfile;