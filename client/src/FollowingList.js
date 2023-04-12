import { useNavigate } from "react-router-dom"
import styled from "styled-components"


const FollowingList = (friend) => {
    const navigate = useNavigate()

    return (<>
    <Wrapper>
    {
        friend.friend.following.map((follow) => {
        return  <FriendDiv key={follow._id} onClick={() => navigate(`/profile/${follow._id}`)}>
        <Pic src={follow.picture} />
        <Name>{follow.nickname} •</Name>
        <Email> {follow.name}</Email>
       </FriendDiv>
    
        })
    }
    </Wrapper>
    </>)
}
const Wrapper = styled.div`
display: flex;
flex-direction: column;
`
const FriendDiv = styled.div`
display: flex;
margin-left: 30px;
&:hover {
    cursor: pointer;
}
`
const Pic = styled.img`

`
const Name = styled.p`

`
const Email = styled.p`
font-style: italic;
`

export default FollowingList;