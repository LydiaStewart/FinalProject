import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import styled from "styled-components";
import { FiLoader } from "react-icons/fi";


const PersonalBooklist = () => {
    const {user} = useAuth0();
    const [userNow, setUserNow] = useState(null);
    const navigate = useNavigate()
    const {logout} = useAuth0()

    useEffect(() => {
        if (user) {
            fetch(`/api/user/${user.sub}`)
            .then((res) => res.json())
            .then((data) => {
    
     setUserNow(data.data)
            })
        }
        
    }, [user])

const deleteUser = () => {
  fetch(`/api/deleteuser/${userNow._id}`,
  {method: 'DELETE'})
  .then(() => logout({ logoutParams: { returnTo: "http://localhost:3000" } }))
}

return ( !userNow
? <Loading />
: <>

<Words>What's next for you? ({userNow.toRead.length})</Words>
<NextDiv>
{ userNow.toRead.length === 0
  ? <p onClick={() => navigate("/")}>Add some books to your to-read list!</p>
   : userNow.toRead.slice(Math.max(userNow.toRead.length - 5, 0)).map((toReadBook) => {
        return <BookDiv key={toReadBook.id}>
        <Title onClick={(event) => {
          event.stopPropagation();
          navigate(`/book/${toReadBook.id}`) }}>{toReadBook.volumeInfo.title} </Title>
        <Image src={toReadBook.volumeInfo.imageLinks.smallThumbnail} 
        onClick={(event) => {
            event.stopPropagation();
            navigate(`/book/${toReadBook.id}`) }} />
       {
        toReadBook.volumeInfo.authors.map((author) => {
            return   <Author onClick={() => navigate(`/author/${author}`)}>{author}</Author>
        })
       }
      
        </BookDiv>
    })
}
{
    userNow.toRead.length >= 6
    && <Full onClick={() => navigate(`/toreadbooks/${userNow._id}`)}>Full list <AiOutlineArrowRight /></Full>
}
</NextDiv>
{/* <Clear>Clear to-read list</Clear> */}
<Words>Your favorites ({userNow.favoriteBooks.length})</Words>
<NextDiv>
{ 
    userNow.favoriteBooks.length === 0
    ? <p onClick={() => navigate("/")}>Add some of your favorites!</p>
   
   : userNow.favoriteBooks.slice(Math.max(userNow.favoriteBooks.length - 5, 0)).map((readBook) => {
        return <BookDiv key={readBook.id}>
        <Title onClick={(event) => {
          event.stopPropagation();
          navigate(`/book/${readBook.id}`) }}>{readBook.volumeInfo.title}</Title>
        <Image src={readBook.volumeInfo.imageLinks.smallThumbnail} 
        onClick={(event) => {
          event.stopPropagation();
          navigate(`/book/${readBook.id}`) }}/>
        {
        readBook.volumeInfo.authors.map((author) => {
            return   <Author onClick={() => navigate(`/author/${author}`)}>{author}</Author>
        })
       }
        </BookDiv>
      })
}
{
    userNow.favoriteBooks.length >= 6
    && <Full onClick={() => navigate(`/favoritebooks/${userNow._id}`)}>Full list <AiOutlineArrowRight /></Full>
}
</NextDiv>
{/* <Clear>Clear favorites list</Clear> */}
<Words>What you've read ({userNow.readBooks.length})</Words>
<NextDiv>
{   userNow.readBooks.length === 0
   ? <p onClick={() => navigate("/")}>Add some books you've read!</p>
   : userNow.readBooks.slice(Math.max(userNow.readBooks.length - 5, 0)).map((readBook) => {
        return <BookDiv key={readBook.id}>
        <Title onClick={(event) => {
          event.stopPropagation();
          navigate(`/book/${readBook.id}`) }}>{readBook.volumeInfo.title}</Title>
        <Image src={readBook.volumeInfo.imageLinks.smallThumbnail} 
        onClick={(event) => {
          event.stopPropagation();
          navigate(`/book/${readBook.id}`) }}/>
        {
        readBook.volumeInfo.authors.map((author) => {
            return   <Author onClick={() => navigate(`/author/${author}`)}>{author}</Author>
        })
       }
        </BookDiv>
      })
}
{
    userNow.readBooks.length >= 6
    && <Full onClick={() => navigate(`/readbooks/${userNow._id}`)}>Full list <AiOutlineArrowRight /></Full>
}
</NextDiv>
{/* <Clear>Clear read list</Clear> */}

<Delete onClick={() => deleteUser()}>Delete your account</Delete>
</>)
}
const Delete = styled.button`
margin-left: 30px;
`
const Clear = styled.button`
margin-left: 30px;
`
const Author = styled.p`

&:hover {
    cursor: pointer;
    text-decoration: underline;
}
`
const Full = styled.p`

&:hover {
    cursor: pointer;
}
`
const Words = styled.h1`
margin-left: 30px;
`
const Title = styled.p`
font-weight: bold;
font-size: 20px;

&:hover {
    cursor: pointer;
}
`
const Image = styled.img`
width: 150px;

&:hover {
    cursor: pointer;
}
`
const BookDiv = styled.div`
margin-right: 30px;
width: 150px;
text-align: center;
` 
const NextDiv = styled.div`
display: flex;
margin: 0px 30px;
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

export default PersonalBooklist;