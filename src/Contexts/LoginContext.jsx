// import { createContext, useContext, useState } from "react";
// import { AuthContext } from "./useAuth";

// export const LoginContext = createContext();

// export function LoginProvider({ children }) {
//   // const [isLoggedIn, setIsLoggedIn] = useState(
//   //   localStorage.getItem("isLoggedIn")
//   //     ? JSON.parse(localStorage.getItem("isLoggedIn"))
//   //     : null
//   // );

//   const {user: isLoggedIn, setUser: setIsLoggedIn} = useContext(AuthContext);

//   localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));

//   return (
//     <LoginContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
//       {children}
//     </LoginContext.Provider>
//   );
// }
