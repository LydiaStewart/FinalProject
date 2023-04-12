import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { FiLoader } from "react-icons/fi";
import { useAuth0 } from "@auth0/auth0-react";
import { ImStarEmpty, ImStarFull } from "react-icons/im";
import {BsBook, BsBookmark, BsBookFill, BsBookmarkFill} from "react-icons/bs"
import {Tooltip} from "react-tippy";
import {CiFaceFrown} from "react-icons/ci"
import ErrorPage from "./ErrorPage";

const BookDetails = () => {
const [book, setBook] = useState();
   const { bookId } = useParams();
  const {user} = useAuth0();
const [userNow, setUserNow] = useState();
const [error, setError] = useState(false)
const navigate = useNavigate();
const [update, setUpdate] = useState(true)

   useEffect(() => {
    fetch(`/api/book/${bookId}`)
    .then((res) => res.json())
    .then((data) => {
      setBook(data.data)
    })
    .catch((err) => {
      console.log(err.message)
      setError(true)
    })
}, [bookId])

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

}, [user, update])

  const addBookToBeenReadList = () => {
    const foundId = userNow.readBooks.some((readBook) =>{
       
     return readBook.id === book.id
        
       })
 
       if (foundId === false) {
    
        fetch(`/api/read/${user.sub}`, {
          method: "POST",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(
              book
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
   }

   const removeBookFromBeenReadList = () => {
    const foundId = userNow.readBooks.some((readBook) =>{
       
     return readBook.id === book.id
        
       })
 
       if (foundId === true) {
    
        fetch(`/api/nonread/${user.sub}`, {
          method: "PATCH",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(
              book
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
   }

const addBookToFavorites = () => {
  const foundId = userNow.favoriteBooks.some((favoriteBook) =>{
       
    return favoriteBook.id === book.id
       
      })

      if (foundId === false) {
    
      fetch(`/api/favorites/${user.sub}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            book
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
    
}
const removeBookFromFavorites = () => {
  const foundId = userNow.favoriteBooks.some((readBook) =>{
     
   return readBook.id === book.id
      
     })

     if (foundId === true) {
  
      fetch(`/api/nonfavorites/${user.sub}`, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            book
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
 }


   const addBookToReadList = () => {
    const foundId = userNow.toRead.some((toReadBook) =>{
       
     return toReadBook.id === book.id
        
       })
 
       if (foundId === false) {
     
        fetch(`/api/toread/${user.sub}`, {
          method: "POST",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(
              book
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
   }

   const removeBookFromToReadList = () => {
    const foundId = userNow.toRead.some((readBook) =>{
       
     return readBook.id === book.id
        
       })
  
       if (foundId === true) {
    
        fetch(`/api/nontoread/${user.sub}`, {
          method: "PATCH",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(
              book
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
   }

  const removeHtml = () => {
    const one = book.volumeInfo.description.replaceAll('<b>', '');
    const two = one.replaceAll('</b>', '');
    const three = two.replaceAll('<i>', '');
    const four = three.replaceAll('</i>', '');
    const five = four.replaceAll('<p>', '');
    const six = five.replaceAll('</p>', '');
    const seven = six.replaceAll('<br>', '');
    const eight = seven.replaceAll('</br>', '');

    return eight;
  }
 
  const favTrue = userNow?.favoriteBooks.some((favBook) =>{
       
    return favBook.id === book.id
       
      })
  const toReadTrue = userNow?.toRead.some((toReadBook) =>{
       
    return toReadBook.id === book.id
       
      })

      const readTrue = userNow?.readBooks.some((readBook) =>{
       
        return readBook.id === book.id
           
          })

if (error) {
  return <ErrorPage />
}    

return ( 
   book === undefined
        ? <Loading />
      : <div>
        
<Title>{book.volumeInfo.title}</Title>
{ book.subtitle 
&& <Subtitle>"{book.volumeInfo.subtitle}"</Subtitle>
}
<Wrapper>
<SideDiv>
  {
    user
&& <Buttondiv>
  { !favTrue
   ? <Tooltip title="Add to favorites">
  <ButtonZ onClick={() => {
    addBookToFavorites();
    }}></ButtonZ>
  </Tooltip>
  : <Tooltip title="Remove from favorites">
    <ImStarFull onClick={() => removeBookFromFavorites()}/>
    </Tooltip>
  }
  { !toReadTrue
    ? <Tooltip title="Add to to-read list">
  <ButtonO onClick={() => {
    addBookToReadList() 
    }}></ButtonO>
  </Tooltip>
  : <Tooltip title="Remove from to-read list">
  <BsBookmarkFill onClick={() => removeBookFromToReadList()} />
  </Tooltip>
  }
  { !readTrue
    ? <Tooltip title="I've read this book">
    <ButtonT onClick={() => {
      addBookToBeenReadList() 
      }}></ButtonT>
    </Tooltip>
    : <Tooltip title="Actually, I haven't">
    <BsBookFill onClick={() => {
      removeBookFromBeenReadList()
    }}/>
    </Tooltip>
  }
  
  </Buttondiv>
}
{
  book.volumeInfo.imageLinks
  ? <BookPic src={book.volumeInfo.imageLinks.thumbnail}></BookPic>
  : <p>No image available <CiFaceFrown /></p>
}

{
  book.volumeInfo.authors.map((author) => {
    return <Author onClick={() => navigate(`/author/${author}`)}>{author}</Author>
  })
}
</SideDiv>
<InnerDiv>
  {
    book.volumeInfo.description
    ? <Desc>{removeHtml()}</Desc>
    : <p>No description available <CiFaceFrown /></p>
  }

<p>Number of pages: {book.volumeInfo.pageCount}</p>
<p>Publish date: {book.volumeInfo.publishedDate}</p>
{ book.saleInfo.buyLink
 && <a href={book.saleInfo.buyLink}>Available as e-book!</a>
}
 
</InnerDiv>
</Wrapper>



</div>
)
}
const Wrapper = styled.div`
display: flex;
`
const SideDiv = styled.div`
display: flex;
flex-direction: column;
width: 200px;
margin-left: 30px;
`
const ButtonZ = styled(ImStarEmpty)`

&:hover {
  cursor: pointer;
}
`
const ButtonT = styled(BsBook)`

&:hover {
  cursor: pointer;
}
`
const ButtonO = styled(BsBookmark)`

&:hover {
  cursor: pointer;
}
`
const Buttondiv = styled.div`
display: flex;
justify-content: space-around;
width: 190px;
margin-left: 30px;
margin-bottom: 15px;
`
const Author = styled.p`
text-align: center;
font-weight: bold;
font-size: 20px;

&:hover {
  cursor: pointer;
}
`
const InnerDiv = styled.div`
display: flex;
flex-direction: column;
margin: 30px;
text-align: center;
`
const Desc = styled.p`
margin-top: -5px;
font-size: 18px;
text-align: center;
margin-left: 20px;
`
const BookPic = styled.img`
height: 280px;
`
const Title = styled.h1`
text-align: center;
`
const Subtitle = styled.h3`
text-align: center;
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
export default BookDetails;