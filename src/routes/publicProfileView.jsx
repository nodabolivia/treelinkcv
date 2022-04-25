import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  existUsername,
  getProfilePhotoUrl,
  getUserPublicProfileInfo,
} from "../firebase/firebase";
import PublicLink from "./publicLink";

export default function PublicProfileView() {
  const params = useParams();  //permite tener info de las URL
  const [profile, setProfile] = useState(null);
  const [url, setUrl] = useState("");
  const [state, setstate] = useState(0);
  useEffect(() => {
      getProfile();
    async function getProfile() {
      const username = params.username;
      try {
        const userUid = await existUsername(username);
        if (userUid) {
          const userInfo = await getUserPublicProfileInfo(userUid);
          setProfile(userInfo);
          const url = await getProfilePhotoUrl(
            userInfo.profileInfo.profilePicture
          );
          setUrl(url);
        }else{
            setstate(7);
        }
      } catch (error) {}
    }
  }, [params]);

  if(state == 7){
      return(
          <div>
              Username does not exist
          </div>
      )
  }
  return (
    <div>
        <div>
            <img src={url} />
            
        </div>
        <h2>{profile.profileInfo.username}</h2>
        <h3>{profile.profileInfo.displayName}</h3>
        <div>
            {profile?.linksInfo.map((link)=>(
                <PublicLink key={link.docId} url={link.url} title={link.title} />
            ))}
        </div>
      
    </div>
  );
}
