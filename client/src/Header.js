import styled from "styled-components";
import LoginButton from "./Login";
import LogoutButton from "./Logout";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import {CgProfile} from "react-icons/cg";
import {BiMessageDetail} from "react-icons/bi";
import { NavLink } from "react-router-dom";


const Header = () => {
    const [search, setSearch] = useState("");
    const {user, isAuthenticated} = useAuth0();
    const navigate = useNavigate();
    const [searchingFor, setSearchingFor] = useState([])
    const [eventValue, setEventValue] = useState("title");
   
    useEffect(() => {
        
        if (user) {
            fetch("/api/newuser", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    email: user.email, 
                email_verified: user.email_verified,
                name: user.name,
                nickname: user.nickname,
                picture: user.picture,
                sub: user.sub,
                updated_at: user.updated_at,
                readBooks: [],
                favoriteBooks: [],
                toRead: [],
                following: [],
                followedBy: [],
                inbox: []
                  }),
            })
            .then((res) => res.json())
            .then((data) => {
               
            })
            .catch((error) => {
                console.log(error.message)
            })
        }
       
    }, [user])

    const authorOrGenreHandler = (event) => {
        console.log(event)
        if (event.key === "Enter") {
        if (eventValue === "author") {
            navigate(`/author/${event.target.value}`)
        }
        else if (eventValue === "genre") {
           navigate(`/genre/${event.target.value}`)
        }
        }
    }

        const searchHandler = (searchTerm) => {
            setSearch(searchTerm)
            
               if (searchTerm.length > 2) {
                fetch(`/api/search/${eventValue}/${searchTerm}`)
                .then(res => res.json())
                .then((data) => {
                 console.log(data)
              if (eventValue === "user" && data.data) {
                
                let userArr = [];
                userArr.push(data.data)
                     setSearchingFor(userArr)
                  }
                 else {
                    setSearchingFor(data.data.items)
                 } 
              })
                
                .catch((err)=> {
                    console.log(err)

                })
                   
                
               }
              
        
        }
      

    return <>
    <Wrapper>
    <AppIcon src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7UkRjBrTczw7tOxSIltzEgSfSvNpE232tQ&usqp=CAU" 
    onClick={() => {
    navigate("/")
    }} />
    
    <form>
        <SelectDiv>
        <Label htmlFor="choice">What are you searching for? </Label>
        <Select onChange={(event => setEventValue(event.target.value))} id="choice" name="choiceList" form="choiceList">
            <Option  value="title" >Title</Option>
            <Option value="author" >Author</Option>
            <Option value="genre" >Genre or theme</Option>
            <Option value="user" >User</Option>
        </Select>
        </SelectDiv>
            <div>
    <Search  type="text" placeholder="Type..." value={search} onChange={event=>searchHandler(event.target.value)} onKeyPress={event=>authorOrGenreHandler(event)} 
    />
    
     </div> 
    {
        search.length >= 2 &&
      <List>
  {
    searchingFor?.map((book) => {
      
        if (eventValue === "title") {

        
        if (book.volumeInfo.title.toLowerCase().includes(search.toLowerCase()) === true) {
            let indexNum = book.volumeInfo.title.toLowerCase().indexOf(search.toLowerCase());
           const firstHalf = book.volumeInfo.title.slice(0, indexNum + search.length);
           const secondHalf = book.volumeInfo.title.slice(indexNum + search.length);
        
        return (
            <div key={book.id}>
                <ListTitle  onClick={() => {
                    navigate(`/book/${book.id}`)
                    setSearch("")}}>
                <JustToFlex>
                    {
                        book.volumeInfo.imageLinks
                        && <SearchImage src={book.volumeInfo.imageLinks.thumbnail} />
                    }
                  
                  <Column>
                  <TitleDiv>
                <TypedBold>{firstHalf}</TypedBold>
             
               <Prediction>{secondHalf}</Prediction>
               </TitleDiv>
              
                <Author>By {book.volumeInfo.authors}</Author>
                </Column>
                </JustToFlex>
       
        
        </ListTitle>
       
            </div>
        ) 
        }
     } 
      else if (eventValue === "author") {

     return (  <div key={book.id} onClick={() => {
        navigate(`/book/${book.id}`)
        setSearch("")}}>
         <ListTitle>
         <JustToFlex>
            {
                book.volumeInfo.imageLinks
                && <SearchImage src={book.volumeInfo.imageLinks.smallThumbnail} />
            }
         <Column>
         <Prediction>{book.volumeInfo.title}</Prediction>
         <Author>{book.volumeInfo.authors}</Author>
         </Column>
         </JustToFlex>
         </ListTitle>
        </div> )

      }

      else if (eventValue === "genre") {

        return (  <div key={book.id} onClick={() => {
            navigate(`/book/${book.id}`)
            setSearch("")}}>
            <ListTitle>
            <JustToFlex>
               {
                   book.volumeInfo.imageLinks
                   && <SearchImage src={book.volumeInfo.imageLinks.smallThumbnail} />
               }
            <Column>
            <Prediction>{book.volumeInfo.title}</Prediction>
            <Author>{book.volumeInfo.authors}</Author>
            </Column>
            </JustToFlex>
            </ListTitle>
           </div> )
      }
      else if (eventValue === "user") {
        
        return (
            <div key={book._id}>
                <ListTitle onClick={() => {
                    navigate(`/profile/${book._id}`)
                    setSearch("")}} >
                <span>
              <JustToFlex>
                <SearchImage src={book.picture} />
                <Column>
               <Prediction>{book.nickname}</Prediction>
               <Author>{book.name}</Author>
               </Column>
               </JustToFlex>
               
               </span>
       
        
        </ListTitle>
            </div>
        ) 
    }
  } ) }
  </List>
}

    </form>
    
    { !user
      ? <InButton />
      : <LargeDiv>
        <Div>
        <DropdownMenu>
        <Avatar src={user.picture} onClick={() => navigate('/yourprofile')}/>
        <Dropdown>
           <Li> <PDiv>
        <CgProfile />
        <Profile to="/yourprofile">Profile</Profile>
           </PDiv> </Li>
         <Li> <IDiv>
            <BiMessageDetail />
        <Inbox to="/inbox">Inbox</Inbox>
        </IDiv> </Li>
       <Li> <LogoutButton /> </Li>
        </Dropdown>
        </DropdownMenu>
        </Div>
        
        </LargeDiv>
    }
    
    
    </Wrapper>
    <TopDiv>
    <Banner src="https://static01.nyt.com/images/2019/12/17/books/review/17fatbooks/17fatbooks-superJumbo.jpg" />
    <Title>Page Turners</Title>
    <Subtitle>A reader lives a thousand lives.</Subtitle>
    </TopDiv>
    </>
}
const Select = styled.select`

`
const Option = styled.option`

`
const TitleDiv = styled.div`
margin-left: 5px;
margin-top: 10px;
`
const Column = styled.div`
display: flex;
flex-direction: column;
`
const Label = styled.label`
color:#D8D8D8;
font-weight: bold;
`
const SelectDiv = styled.div`
padding-top: 15px;
`
 const Li = styled.li`
 display: none;
margin-left: -35px;
 `
const SearchImage = styled.img`
width: 35px;
height: 35px;
margin-left: -30px;
padding-top: 5px;
`
const TypedBold = styled.span`
font-weight: bold;
`
const JustToFlex = styled.p`
 display: flex;
`
const Author = styled.p`
margin-top: -2px;
font-size: 13px;
margin-left: 5px;
`

const LargeDiv = styled.div`
display: flex;
flex-direction: column;
`
const TopDiv = styled.div`
margin-top: -80px;
margin-bottom: 20px;
`
const Banner = styled.img`
z-index: 0;
height: 240px;
object-fit: cover;
width: 100%;
position: absolute;
opacity: .6;
`
const Title = styled.h1`
padding-top: 10px;
position: relative;
font-family: Great Vibes;
font-size: 120px;
padding: 20px;
z-index: 1;
text-align: center;
`
const Subtitle = styled.h2`
position:relative;
font-family: Great Vibes;
font-size: 50px;
padding-left: 20px;
margin-top: -60px;
z-index: 1;
text-align: center;
`
const IDiv = styled.div`
display: flex;
margin-top: 10px;
`
const DropdownMenu = styled.div`
position: relative;
display: inline-block;
z-index: 100;

&:hover li {
    display: block;
    z-index: 200; 
}
`
const Prediction = styled.span`
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
width: 290px;
opacity: .8;
`
const Inbox = styled(NavLink)`
display: inline-block;
border: none;
`
const PDiv = styled.div`
display: inline-block;
margin-top: 10px;
`
const Profile = styled(NavLink)`
border: none;

`
const Search = styled.input`
height: 15px;
width: 310px;
margin-top: 10px;
`
const InButton = styled(LoginButton)`
border: none;
`

const Dropdown = styled.ul`
position: absolute;
z-index: 1;
width: 80px;
margin-top: -4px;
margin-right: -20px;
background-color: white;
`
const Avatar = styled.img`
height: 80px;

:hover& {
    opacity: .7;
    cursor: pointer;
}
`
const Wrapper = styled.div`
height: 80px;
display: flex;
justify-content: space-between;
background-color: #408E91;
`
const Div = styled.div`
display: flex;
`
const AppIcon = styled.img`
height:100%;
cursor: pointer;
`


export default Header;