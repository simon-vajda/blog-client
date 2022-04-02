import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { Layout } from "./components/Layout";
import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";
import PostPage from "./components/PostPage";

export default function App() {
  const [currentUser, setCurrentUser] = useState(getUserFromStorage());

  // save user state to local storage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route exact path="/" element={<PostList />} />
            <Route exact path="/login" element={<Login></Login>} />
            <Route exact path="/signup" element={<SignUp></SignUp>} />
            <Route exact path="/create" element={<CreatePost></CreatePost>} />
            <Route exact path="/post/:id" element={<PostPage></PostPage>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

function getUserFromStorage() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}
