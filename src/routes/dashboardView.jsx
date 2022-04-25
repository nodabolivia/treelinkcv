import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthProviders } from "../components/authProvider";
import { v4 as uuidv4 } from "uuid";
import { deleteLink, getLinks, insertNewLink, updateLink } from "../firebase/firebase";
import DashboardWrapper from "../components/dashboardwrapper";
import Link from "../components/link";
import style from "../styles/dashboardView.module.css";



export default function DashboardView() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [state, setState] = useState(0);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);

  async function handleUserLoggeIn(user) {
    setCurrentUser(user);
    setState(2);
    const resLinks = await getLinks(user.uid);
    setLinks([...resLinks]);
  }
  function handleUserNotRegistered(user) {
    navigate("/login");
  }
  function handleUserNotLoggedIn() {
    navigate("/login");
  }

  if (state == 0) {
    return (
      <AuthProviders
        onUserLoggedIn={handleUserLoggeIn}
        onUserNotLoggedIn={handleUserNotRegistered}
        onUserNotRegistered={handleUserNotLoggedIn}
      ></AuthProviders>
    );
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    addLink();
  }

  function addLink() {
    if (title !== "" && url !== "") {
      const newLink = {
        id: uuidv4(),
        title: title,
        url: url,
        uid: currentUser.uid,
      };
      const res = insertNewLink(newLink);
      newLink.docId = res.id;
      setTitle("");
      setUrl("");
      setLinks([...links, newLink]);
    }
  }

  function handleOnChange(e) {
    const value = e.target.value;
    if (e.target.name === "title") {
      setTitle(value);
    }
    if (e.target.name === "url") {
      setUrl(value);
    }
  }

  async function handleDeleteLink(docId) {
    await deleteLink(docId);
    const tmp = links.filter(link=> link.docId !== docId);
    setLinks([...tmp]);
  }

  async function handleUpdateLink(docId, title, url) {
    const link = links.find((item) => item.docId === docId);
    link.title = title;
    link.url = url;
    await updateLink(docId,link);
  }

  return (
    <DashboardWrapper>
      <div>
        <h1>Dashboard</h1>

        <form className={style.entryContainer} onSubmit={handleOnSubmit}>
          <label htmlFor="tittle"> Título</label>
          <input className="input" type="text" name="title" onChange={handleOnChange} />
          <label htmlFor="url"> URL</label>
          <input className="input" type="textarea" name="url" onChange={handleOnChange} />

          <input className="btn" type="submit" value="Crear link" />
        </form>

        <div>
          {links.map((link) => (
            <Link
              key={link.docId}
              docId={link.docId}
              url={link.url}
              title={link.title}
              onDelete={handleDeleteLink}
              onUpdate={handleUpdateLink}
            ></Link>
          ))}
        </div>
      </div>
    </DashboardWrapper>
  );
}
