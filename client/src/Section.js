import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { FiLoader } from "react-icons/fi";
import { CiFaceFrown } from "react-icons/ci";
import ErrorPage from "./ErrorPage";

const Section = () => {
const {section} = useParams();
const [books, setBooks] = useState(null);
const navigate = useNavigate();
const [error, setError] = useState(false)

useEffect(() =>{
    fetch(`/api/search/genre/${section}`)
    .then((res) => res.json())
    .then((data) => {
    setBooks(data.data.items)
    })
    .catch((err) => {
    console.log(err.message)
    setError(true)
    })
}, [section])

if (error) {
    return <ErrorPage />
}

return ( !books
       ? <Loading />
     :<>
     <H1>{section} novels</H1>
     <BigDiv>
<Div>
    {
        books.map((book) => {
            return  <BookInfo key={book.id} >
               
                <Title onClick={() => navigate(`/book/${book.id}`)}>{book.volumeInfo.title}</Title>
                {
                    book.volumeInfo.imageLinks
                    ? <Thumbnail src={book.volumeInfo.imageLinks.thumbnail} onClick={() => navigate(`/book/${book.id}`)}/>
                    : <p>No image available <CiFaceFrown /></p>
                }
                  {/*    */}
                  { !book.volumeInfo.authors
                    ? <p>No author is listed <CiFaceFrown /></p>
                    : book.volumeInfo.authors.map((author) => {
                       return <TheAuthor onClick={() => navigate(`/author/${author}`)}>{author}</TheAuthor>
                     })
                  }
                 
                
            </BookInfo>
            
        })
    }
</Div>
</BigDiv>
</>)


}
const BigDiv = styled.div`
width: 100%;
display: flex;
justify-content: center;
`
const H1 = styled.h1`
font-family: Great Vibes;
margin-left: 60px;
font-size: 50px;
`
const Div = styled.div`
display: inline-grid;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
align-items: center;
justify-content: center;
border: none;
border-radius: 20px;
padding-top: 40px;
box-shadow: #408E91 0px 2px 4px 0px, #408E91 0px 2px 16px 0px;
//margin: 0px 30px 30px 30px;
padding: 30px;
`
const Title = styled.p`
font-weight: bold;
font-size: 20px;
`
const Thumbnail = styled.img`
width: 180px;
`
const TheAuthor = styled.p`

&:hover {
text-decoration: underline;
cursor: pointer;
}
`
const BookInfo = styled.div`
display: flex;
flex-direction: column;
margin: 30px;
width: 150px;
text-align: center;
transition: transform .3s;


&:hover {
  transform: scale(1.2);
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

export default Section;