import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import styled from "styled-components";
import { FiLoader } from "react-icons/fi";
import ErrorPage from "./ErrorPage";
import { useEffect } from "react";

const Inbox = () => {
    const [search, setSearch] = useState("");
    const [sendMessageTo, setSendMessageTo] = useState(null);
    const [message, setMessage] = useState("");
    const {user} = useAuth0();
   const [choose, setChoose] = useState(null)
   const [error, setError] = useState(false);
   const [userNow, setUserNow] = useState(null);
   //const [friend, setFriend] = useState(null)

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

    const searchHandler = (searchTerm) => {
            
        setSearch(searchTerm)
        if (searchTerm.length >= 2) {
         fetch(`/api/search/user/${searchTerm}`)
         .then(res => res.json())
         .then((data) => {
         if (data.status === 200) {
            let userArr = [];
            userArr.push(data.data)
                setSendMessageTo(userArr)
         }
           })
           .catch((err)=> {
            console.log(err.message)
            setError(true)
         })
           }
       }

 const messageHandler = () => {
    fetch(`/api/message/${user.sub}/${choose._id}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {message}
          ),
    })
    .then((res) => res.json())
    .then((data) => {
       console.log(data)
    })
    .catch((error) => {
        console.log(error.message)
        setError(true)
    })

 }
// if (userNow) {
//     const messageHistorySent = userNow?.inbox.sentTo.some((inboxFriend) => {
    //   return inboxFriend._id === choose._id
    //  })
    //  const messageHistoryReceived = userNow?.inbox.sentBy.some((inboxFriend) => {
    //   return inboxFriend._id === choose._id
    //  })
//}


//  if (messageHistorySent) {
//   fetch(`/api/user/${choose._id}`)
//         .then((res) => res.json())
//         .then((data) => {
  
//   setFriend(data.data)
//         })
//         .catch((err) => {
//             console.log(err.message)
//             setError(true)
//         })
// }

// if (messageHistoryReceived) {
//   fetch(`/api/user/${choose._id}`)
//         .then((res) => res.json())
//         .then((data) => {
//   setFriend(data.data)
//         })
//         .catch((err) => {
//             console.log(err.message)
//             setError(true)
//         })
// }
let inboxFriendsArr = [];

if (userNow) {
  const noDuplicates = [...new Map(userNow.inbox.map((unique)=> [unique._id, unique])).values()];
  inboxFriendsArr.push(noDuplicates);
  console.log(inboxFriendsArr)
}
 console.log(userNow)
 if (error) {
    return <ErrorPage /> 
 }
    return ( !userNow
           ? <Loading />
        : <>
        <h1>Inbox</h1>
        <Search  type="text" name="search" placeholder="Send a message to..." value={search} onChange={event=>searchHandler(event.target.value)} 
    />
    
     {
        search.length >= 2 &&
      <List>
        {
            sendMessageTo !== null
    && sendMessageTo.map((friend) => {
        console.log(friend)
     
            return (
                <div key={friend._id} onClick={() => {
                setChoose(friend)
                setSendMessageTo(null)}}>
                    <ListTitle>
                    <span>
                  <JustToFlex>
                    {
                        friend.picture
                        && <SearchImage src={friend.picture} />
                    }
                    
                   <Prediction>{friend.nickname}</Prediction>
                   <Author>{friend.name}</Author>
                   </JustToFlex>
                   
                   </span>
           
            
            </ListTitle>
       
                </div>
            ) 
        
      }) 
       }
      </List>
    }
    <form onSubmit={() => messageHandler(message)}>
    <Message type="text" name="message" placeholder="Type your message here." value={message}  onChange={event=> setMessage(event.target.value)} ></Message>
    <Submit type="submit" value="Submit" />
    </form>

{
  

 
}

        </>
    ) 

}
const Submit = styled.input`

`
const Message = styled.input`
width: 500px;
height: 200px;
`
const JustToFlex = styled.p`
 //display: flex;
`
const Author = styled.p`
margin-top: -8px;
font-size: 13px;
`

const SearchImage = styled.img`
width: 35px;
height: 35px;
margin-left: -30px;
padding-top: 5px;
`

const Prediction = styled.span`
margin-top: 15px;
margin-left: 5px;
`
const ListTitle= styled.li`
padding: 2px;
font-size: 15px;
list-style-type: none;


&:hover {
background-color: lightgray;
cursor: pointer;
}
`
const List = styled.ul`
margin-top: 10px;
background-color: white;
position: absolute;
z-index: 2;
width: 210px;
opacity: .8;
`
const Search = styled.input`
height: 15px;
width: 200px;
margin-top: 10px;
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
export default Inbox;