import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { Layout } from "./components/Layout";
import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import PostList from "./components/PostList";
import PostPage from "./components/PostPage";
import PostEditor from "./components/PostEditor";

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
            <Route exact path="/create" element={<PostEditor></PostEditor>} />
            <Route exact path="/post/:id" element={<PostPage></PostPage>} />
            <Route
              exact
              path="/post/:id/edit"
              element={<PostEditor></PostEditor>}
            />
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
