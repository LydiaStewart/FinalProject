import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FillOutPreferences = () => {
const {user} = useAuth0()
const [userNow, setUserNow] = useState(null)
const [error, setError] = useState(false)
const navigate = useNavigate()
const [homepageCategories, setHomepageCategories] = useState(null)

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

const handleSubmit = (event) => {
    console.log(event)
    console.log(event.target.value)
    setHomepageCategories(event.target.value)
if (user) {
    fetch(`/api/sethomesections/${user.sub}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            homepageCategories
          ),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
        console.log(error.message)
        
    })
}

// else {
//     homepageSections.push(event.target.value)
// }
}

return (<>
<Wrapper>
<Background src="https://res.cloudinary.com/djpf4btfn/image/upload/c_crop,g_south,h_732,w_2048,x_0/v1681333361/17fatbooks-superJumbo_r8bgyz.jpg" />
<BigDiv>
<Div>
<h2>What kind of books do you like?</h2>
</Div>
<FormDiv>
<Form >
<CheckDiv>

<Input type="checkbox" name="fiction" value="fiction"></Input>
<Label for="fiction">Fiction</Label>
</CheckDiv>
<CheckDiv>

<Input type="checkbox" name="mystery" value="mystery"></Input>
<Label for="mystery">Mystery</Label>
</CheckDiv>
<CheckDiv>

<Input type="checkbox" name="adventure" value="adventure"></Input>
<Label for="adventure">Adventure</Label>
</CheckDiv>
<CheckDiv>

<Input type="checkbox" name="fantasy" value="fantasy"></Input>
<Label for="fantasy">Fantasy</Label>
</CheckDiv>
<CheckDiv>

<Input type="checkbox" name="historical fiction" value="historical fiction"></Input>
<Label for="historical fiction">Historical Fiction</Label>
</CheckDiv>
<CheckDiv>

<Input type="checkbox" name="thriller" value="thriller"></Input>
<Label for="thriller">Thriller</Label>
</CheckDiv>
<CheckDiv>

<Input type="checkbox" name="young adult" value="young adult"></Input>
<Label for="young adult">Young Adult</Label>
</CheckDiv>
<CheckDiv>

<Input type="checkbox" name="detective" value="detective"></Input>
<Label for="detective">Detective</Label>
</CheckDiv>
<CheckDiv>

<Input type="checkbox" name="romance" value="romance"></Input>
<Label for="romance">Romance</Label>
</CheckDiv>
<CheckDiv>

<Input type="checkbox" name="non-fiction" value="non-fiction"></Input>
<Label for="non-fiction">Non-fiction</Label>
</CheckDiv>
<CheckDiv>

<Input type="checkbox" name="poetry" value="poetry"></Input>
<Label for="poetry">Poetry</Label>
</CheckDiv>
<CheckDiv>

<Input type="checkbox" name="science-fiction" value="science-fiction"></Input>
<Label for="science-fiction">Science Fiction</Label>
</CheckDiv>
<CheckDiv>

<Input type="checkbox" name="dystopian" value="dystopian"></Input>
<Label for="dystopian">Dystopian</Label>
</CheckDiv>
<CheckDiv>

<Input type="checkbox" name="horror" value="horror"></Input>
<Label for="horror">Horror</Label>
</CheckDiv>
<CheckDiv>

<Input type="checkbox" name="true crime" value="true crime"></Input>
<Label for="true crime">True Crime</Label>
</CheckDiv>
<CheckDiv>

<Input type="checkbox" name="memoir" value="memoir"></Input>
<Label for="memoir">Memoir</Label>
</CheckDiv>
<Submit type="submit" value="SUBMIT" onSubmit={(event) => handleSubmit(event)}></Submit>
</Form>
</FormDiv>
<SubmitDiv>

</SubmitDiv>
</BigDiv>
</Wrapper>
</>)
}
const SubmitDiv = styled.div`
display: flex;
justify-content: center;
width: 100%;
margin-top: 30px;
`
const Submit = styled.input`
cursor: pointer;
background-color: black;
color: white;
font-family: Oswald;
padding: 10px;
border-radius: 20px;
font-size: 15px;
`
const CheckDiv = styled.div`
display: flex;
margin: 10px;
`
const FormDiv = styled.div`
width: 100%;
font-size: 20px;
font-weight:bold;
//border: 2px solid black;
display: flex;
justify-content: center;
margin-top: 30px;
`
const Form = styled.form`
display: inline-grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
align-items: center;
justify-content: center;
`
const BigDiv = styled.div`
position: relative;
`
const Label = styled.label`

`
const Input = styled.input`

`
const Wrapper = styled.div`
height: 100%;
width: 100%;
//background-image: url("https://static01.nyt.com/images/2019/12/17/books/review/17fatbooks/17fatbooks-superJumbo.jpg");
`
const Background = styled.img`
margin-top: -32px;
opacity: .6;
object-fit: none;
width: 100%;
position: absolute;

`
const Div = styled.div`
margin-top: -30px;
position: relative;
display: flex;
flex-direction: column;
align-items: center;
box-shadow: black 0px 2px 4px 0px, black 0px 2px 16px 0px;
`
export default FillOutPreferences;