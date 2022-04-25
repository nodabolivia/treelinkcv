import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  existUsername,
  getProfilePhotoUrl,
  getUserPublicProfileInfo,
} from "../firebase/firebase";
import PublicLink from "./publicLink";
import style from "../styles/publicProfileView.module.css";
import styleLinks from "../styles/publicLink.module.css";

export default function PublicProfileView() {
  const params = useParams(); //permite tener info de las URL
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
          try {
            const userInfo = await getUserPublicProfileInfo(userUid);
            setProfile(userInfo);
            const url = await getProfilePhotoUrl(
              userInfo.profileInfo.profilePicture
            );
            setUrl(url);
          } catch (error) {
            console.log(error);
          }
        } else {
          setstate(7);
        }
      } catch (error) {}
    }
  }, [params]);

  if (state === 7) {
    return <div>Username does not exist</div>;
  }
  return (
    <div className={style.profileContainer}>
      <div className={style.profilePicture}>
        <img src={url} alt="Profile photo" width="100px" />
      </div>
      <h2>{profile?.profileInfo.username}</h2>
      <h3>{profile?.profileInfo.displayName}</h3>
      <div className={styleLinks.publicLinksContainer}>
        {profile?.linksInfo.map((link) => (
          <PublicLink key={link.docId} url={link.url} title={link.title} />
        ))}
      </div>
    </div>
  );
}
