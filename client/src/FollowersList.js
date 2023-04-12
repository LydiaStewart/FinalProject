import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FollowerList = (friend) => {
    const navigate = useNavigate();

return (<>
<Wrapper>
        {
        friend.friend.followedBy.map((follower) => {
        return  <FriendDiv key={follower._id} onClick={() => navigate(`/profile/${follower._id}`)}>
        <Pic src={follower.picture} />
        <Name>{follower.nickname}  •</Name>
        <Email> {follower.name}</Email>
        
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
export default FollowerList;