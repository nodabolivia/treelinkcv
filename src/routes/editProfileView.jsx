import DashboardWrapper from "../components/dashboardwrapper";
import { AuthProviders } from "../components/authProvider";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import style from "../styles/editProfileView.module.css"
import {
  getLinks,
  getProfilePhotoUrl,
  setUserProfilePhoto,
  updateUser,
} from "../firebase/firebase";

export default function EditProfileView() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [state, setState] = useState(0);
  const [profileUrl, setProfileUrl] = useState(null);
  const [username, setUsername] = useState("")


  const fileRef = useRef(null);

  async function handleUserLoggeIn(user) {
    setCurrentUser(user);
    const url = await getProfilePhotoUrl(user.profilePicture);
    setProfileUrl(url);
    setState(2);
  }
  function handleUserNotRegistered(user) {
    navigate("/login");
  }
  function handleUserNotLoggedIn() {
    navigate("/login");
  }
  function handleOpenFilePicker() {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }

  function handleChangeFile(e) {
    const files = e.target.files;
    const fileReader = new FileReader();
    if (fileReader && files && files.length > 0) {
      // convertir de archivo a BLOB
      fileReader.readAsArrayBuffer(files[0]);
      fileReader.onload = async function () {
        const imageData = fileReader.result;
        const res = await setUserProfilePhoto(currentUser.uid, imageData);
        console.log(res);
        if (res) {
          const tmpUser = { ...currentUser };
          tmpUser.profilePicture = res.metadata.fullPath;
          await updateUser(tmpUser);
          setCurrentUser({ ...tmpUser });
          const url = await getProfilePhotoUrl(currentUser.profilePicture);
          setProfileUrl(url);
        }
        return res;
      };
    }
  }

  if (state !== 2) {
    return (
      <AuthProviders
        onUserLoggedIn={handleUserLoggeIn}
        onUserNotLoggedIn={handleUserNotLoggedIn}
        onUserNotRegistered={handleUserNotRegistered}
      ></AuthProviders>
    );
  }
  return (
    <DashboardWrapper>
      <div>
        <h2>Edit Profile Info</h2>
        <div className={style.profilePictureContainer}>
          <div>
            <img src={profileUrl} alt="" width={100} />
          </div>
          <div>
            <button 
            className="btn"
            onClick={handleOpenFilePicker}>
              Choose new profile picture
            </button>
            <input
              className={style.fileInput}
              ref={fileRef}
              type="file"
              onChange={handleChangeFile}
            />
          </div>
        </div>
        <div>
          <form>
            
          </form>
        </div>
      </div>
    </DashboardWrapper>
  );
}
