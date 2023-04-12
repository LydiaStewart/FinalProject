
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FiLoader } from "react-icons/fi";
import ErrorPage from "./ErrorPage";

const ToReadBooks = () => {
    const [userNow, setUserNow] = useState();
    const {user} = useAuth0();
    const navigate = useNavigate();
    const [error, setError] = useState(false)

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

    return ( !userNow
         ? <Loading />
         : <>
         <H2>{user.nickname}'s to-read books</H2>
         <BigDiv>
         <NextDiv>
    {
        userNow.toReadBooks.map((readBook) => {
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
    return <Author onClick={() => navigate(`/author/${author}`)}>{author}</Author>
  })
}
          
            </BookDiv>
          })
    }
    </NextDiv>
    </BigDiv>
    </>)
}
const BigDiv = styled.div`
width: 100vw;
justify-content: center;
`
const H2 = styled.h2`
font-family: Great Vibes;
font-size: 50px;
margin-left: 60px;
`
const Author = styled.p`
text-align: center;

&:hover {
    cursor: pointer;
    text-decoration: underline;
}
`

const NextDiv = styled.div`
display: inline-grid;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
align-items: center;
justify-content: center;
border: none;
margin: 30px;
border-radius: 20px;
padding-top: 40px;
box-shadow: #408E91 0px 2px 4px 0px, #408E91 0px 2px 16px 0px;
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
margin: 30px;
width: 150px;
text-align: center;
transition: transform .3s;


&:hover {
  cursor: pointer;
  transform: scale(1.2);
}
` 
export default ToReadBooks;