import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {FiLoader} from "react-icons/fi"
import Book from "./Book";
import ErrorPage from "./ErrorPage";

const Homepage = () => {
const navigate = useNavigate()
const [error, setError] = useState(false);
const [sections, setSections] = useState({});
const homepageSections = ["fiction", "fantasy", "horror", "historical fiction", "detective", "classics"]

    useEffect(()=> {
      const sectionFetch = async () => {
        await Promise.all(homepageSections.map(async (section) => {
        const response = await fetch(`/api/section/${section}`)
        const parsedResponse = await response.json()
        
          setSections((prev) => {return {...prev, [section]: parsedResponse.data.items}}) 
        }))
        .catch((err) => {
          console.log(err.message)
          setError(true)
        })
      }
    
    sectionFetch()
    }, [])
    
if (error) {
  return <ErrorPage />
}
 return (
    
 
     !sections.fiction
     ? <Loading />
     :   <Wrapper>
        <H1>Explore...</H1>
        <NewFictionBooks>
        
        {
homepageSections.map((section) => {
  return (<Section key={section}>
  <EbooksTitle onClick={() => navigate(`/genre/${section}`)}>{`New in ${section}`}</EbooksTitle>
  <BooksDiv>
  {sections[section]
    && sections[section].map((book) => {
      
        return <Book key={book.id} book={book} />
    })}
    </BooksDiv>
  </Section>)
})
        }

       </NewFictionBooks>
        </Wrapper>
    )
}
const H1 = styled.h1`
margin-left: 185px;
margin-bottom: -30px;
`
const BooksDiv = styled.div`
display: inline-grid;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
align-items: center;
justify-content: center;
border: none;
margin: -15px 0px 15px -30px;
border-radius: 20px;
padding-top: 40px;
box-shadow: #408E91 0px 2px 4px 0px, #408E91 0px 2px 16px 0px;
`
const Section = styled.div`
width: 80vw;
`

const EbooksTitle = styled.h2`
font-family: Great Vibes;
font-size: 50px;
margin-left: 60px;

&:hover {
  cursor: pointer;
}
`
const NewFictionBooks = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`

const Wrapper = styled.div`

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

export default Homepage;