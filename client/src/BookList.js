import styled from "styled-components"
import { FiLoader } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { AiOutlineArrowRight } from "react-icons/ai"

const BookList = (friend) => {
const navigate = useNavigate()


    return ( !friend
     ? <Loading />
     : <>
       <H2>{friend.friend.nickname}'s favorites ({friend.friend.favoriteBooks.length})</H2>
    <BiggerDiv>
        {
        friend.friend.favoriteBooks.slice(Math.max(friend.friend.favoriteBooks.length - 5, 0)).map((favorite) => {
        return <Div key={favorite.id}>
        <Title onClick={() => navigate(`/book/${favorite.id}`)}>{favorite.volumeInfo.title}</Title>
        <Pic src={favorite.volumeInfo.imageLinks.smallThumbnail} onClick={() => navigate(`/book/${favorite.id}`)}/>
        {
  favorite.volumeInfo.authors.map((author) => {
    return <Author key={author} onClick={() => navigate(`/author/${author}`)}>{author}</Author>
  })
}
        </Div>
        })
    }
    {
    friend.friend.favoriteBooks.length >= 6
    && <Full onClick={() => navigate(`/favoritebooks/${friend.friend._id}`)}>Full list <AiOutlineArrowRight /></Full>
}
    </BiggerDiv> 

 <H2>{friend.friend.nickname}'s read books ({friend.friend.readBooks.length})</H2>
    <BiggerDiv>
        {
        friend.friend.readBooks.slice(Math.max(friend.friend.readBooks.length - 5, 0)).map((readBook) => {
        return <Div key={readBook.id}>
        <Title onClick={() => navigate(`/book/${readBook.id}`)}>{readBook.volumeInfo.title}</Title>
        <Pic src={readBook.volumeInfo.imageLinks.smallThumbnail} onClick={() => navigate(`/book/${readBook.id}`)}/>
        {
  readBook.volumeInfo.authors.map((author) => {
    return <Author key={author} onClick={() => navigate(`/author/${author}`)}>{author}</Author>
  })
}
        </Div>
        })
    }
    {
    friend.friend.readBooks.length >= 6
    && <Full onClick={() => navigate(`/readbooks/${friend.friend._id}`)}>Full list <AiOutlineArrowRight /></Full>
}
    </BiggerDiv> 
     <H2>{friend.friend.nickname}'s to-read list ({friend.friend.toRead.length})</H2>
    <BiggerDiv>
        {
        friend.friend.toRead.slice(Math.max(friend.friend.toRead.length - 5, 0)).map((toReadBook) => {
        return <Div key={toReadBook.id}>
        <Title onClick={() => navigate(`/book/${toReadBook.id}`)}>{toReadBook.volumeInfo.title}</Title>
        <Pic src={toReadBook.volumeInfo.imageLinks.smallThumbnail} onClick={() => navigate(`/book/${toReadBook.id}`)}/>
        {
  toReadBook.volumeInfo.authors.map((author) => {
    return <Author key={author} onClick={() => navigate(`/author/${author}`)}>{author}</Author>
  })
}
        </Div>
        })
        }
        {
    friend.friend.toRead.length >= 6
    && <Full onClick={() => navigate(`/toread/${friend.friend._id}`)}>Full list <AiOutlineArrowRight /></Full>
}
    </BiggerDiv> 
    </>)
}
const H2 = styled.h2`
margin-left: 30px;
`
const Full = styled.p`
&:hover {
    cursor: pointer;
}
`
const BiggerDiv = styled.div`
display: flex;
`
const Div = styled.div`
width: 150px;
text-align: center;
margin: 30px;
`
const Title = styled.p`
font-weight: bold;
font-size: 20px;

&:hover {
    cursor: pointer;
}
`
const Pic = styled.img`
width: 150px;

&:hover {
    cursor: pointer;
}
`
const Author = styled.p`

&:hover {
    text-decoration: underline;
    cursor: pointer;
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
export default BookList; 