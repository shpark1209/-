import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Main";
import Login from "./Login";
import Signup from "./Signup";
import LoginAPI from "./api/LoginAPI";
import SeeCompany from "./SeeCompany";
import CompanyDetail from "./component/CompanyDetail";
import BookMark from "./component/BookMark";
import Password from "./Password";
import NewPassword from "./NewPassword";
import FindAccount from "./FindAccount";
import Event from "./Event";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main></Main>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/users" element={<LoginAPI></LoginAPI>}></Route>
          <Route path="/company" element={<SeeCompany></SeeCompany>}></Route>
          <Route path="/detail" element={<CompanyDetail></CompanyDetail>}></Route>
          <Route path="/bookmark" element={<BookMark></BookMark>}></Route>
          <Route path="/password" element={<Password></Password>}></Route>
          <Route path="/checkPw" element={<NewPassword></NewPassword>}></Route>
          <Route path="/findacc" element={<FindAccount></FindAccount>}></Route>
          <Route path="event" element={<Event></Event>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
