import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { FiLoader } from "react-icons/fi";

const Book = (book) => {
const navigate = useNavigate();
   
  return ( !book
            ? <Loading />
            : <BookInfo >
          <EbookTitle onClick={(event) => {
          event.stopPropagation();
          navigate(`/book/${book.book.id}`) }}>{book.book.volumeInfo.title}</EbookTitle>
          <EbookThumbnail src={book.book.volumeInfo.imageLinks.smallThumbnail} onClick={(event) => {
          event.stopPropagation();
          navigate(`/book/${book.book.id}`) }}/>
          {
           book.book.volumeInfo.authors.map((author) => {
         return <Author key={book.book.id} onClick={() => navigate(`/author/${author}`)}>{author}</Author>
  })
}
          </BookInfo>
     )
}
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
const EbookTitle = styled.p`
font-weight: bold;
font-size: 20px;
`
const EbookThumbnail = styled.img`
width: 180px;
`
const Author = styled.p`

&:hover {
  text-decoration: underline;
}
`
const BookInfo = styled.div`
position: relative;
margin: 30px;
width: 180px;
text-align: center;
margin-top: -30px;
transition: transform .3s;


&:hover {
  cursor: pointer;
  transform: scale(1.2);
}
`

export default Book;