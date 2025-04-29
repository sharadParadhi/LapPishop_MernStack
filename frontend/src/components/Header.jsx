import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  Badge,
  NavDropdown,
  Image,
  Col,
} from "react-bootstrap";
import { FaShoppingCart, FaUser, FaStore } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { toast } from "react-toastify";
import SearchBox from "./SearchBox";
import logo from "../assets/lapshop_logo.png";
import  "./header.css"

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());

      navigate("/login");
      toast.success("Logout successful");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="md"
      collapseOnSelect
      className="fixed-top z-2 "
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <Col xs={6} md={4}>
              <Image src={logo} style={{ width: "50px" }} roundedCircle />{" "}
              LapPyShop
            </Col>
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="mx-md-auto w-70 justify-content-center"
            style={{
              width: "100%", // For small screens (mobile)
              maxWidth: "70%", // For medium screens and larger
            }}
          >
            <SearchBox />
          </Nav>

          <Nav className="ms-auto m-2 d-flex justify-content-between">
            <LinkContainer to="/products" >
              <Nav.Link>
                <FaStore style={{ marginRight: "5px" }} />
                Products
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/cart">
              <Nav.Link>
                <FaShoppingCart style={{ marginRight: "5px" }} />
          Cart
                {cartItems.length > 0 && (
                  <Badge
                    pill
                    bg="warning"
                    style={{ marginLeft: "5px" }}
                    className="text-dark"
                  >
                    <strong>
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </strong>
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown title={`Hello👋, ${userInfo.name}`} id="username">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaUser style={{ marginRight: "5px" }} />
                  Sign-in
                </Nav.Link>
              </LinkContainer>
            )}
            {/* {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/product-list'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/order-list'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/user-list'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )} */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;



























// import React from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Navbar,
//   Nav,
//   Container,
//   Badge,
//   NavDropdown,
//   Image,
// } from "react-bootstrap";
// import { FaShoppingCart, FaUser, FaStore } from "react-icons/fa";
// import { LinkContainer } from "react-router-bootstrap";
// import { useSelector, useDispatch } from "react-redux";
// import { useLogoutMutation } from "../slices/usersApiSlice";
// import { logout } from "../slices/authSlice";
// import { toast } from "react-toastify";
// import SearchBox from "./SearchBox";
// import logo from "../assets/lapshop_logo.png";
// import "./header.css";

// const Header = () => {
//   const { cartItems } = useSelector((state) => state.cart);
//   const { userInfo } = useSelector((state) => state.auth);
//   const [logoutApiCall] = useLogoutMutation();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const logoutHandler = async () => {
//     try {
//       await logoutApiCall().unwrap();
//       dispatch(logout());
//       navigate("/login");
//       toast.success("Logout successful");
//     } catch (error) {
//       toast.error(error?.data?.message || error.error);
//     }
//   };

//   return (
//     <Navbar bg="dark" variant="dark" expand="md" className="fixed-top z-2">
//       <Container>
//         {/* Left-aligned logo */}
//         <LinkContainer to="/">
//           <Navbar.Brand className="me-auto">
//             <Image src={logo} style={{ width: "50px" }} roundedCircle alt="logo" />
//             LapPyShop
//           </Navbar.Brand>
//         </LinkContainer>

//         {/* Centered search box */}
//         <Nav className="mx-auto">
//           <SearchBox />
//         </Nav>

//         {/* Right-aligned nav links with spacing */}
//         <Nav className="ms-auto right-nav-links">
//           <LinkContainer to="/products">
//             <Nav.Link>
//               <FaStore style={{ marginRight: "5px" }} />
//               Products
//             </Nav.Link>
//           </LinkContainer>

//           <LinkContainer to="/cart">
//             <Nav.Link>
//               <FaShoppingCart style={{ marginRight: "5px" }} />
//               Cart
//               {cartItems.length > 0 && (
//                 <Badge pill bg="warning" className="text-dark ms-1">
//                   {cartItems.reduce((acc, item) => acc + item.qty, 0)}
//                 </Badge>
//               )}
//             </Nav.Link>
//           </LinkContainer>

//           {userInfo ? (
//             <NavDropdown title={`Hello👋, ${userInfo.name}`} id="username">
//               <LinkContainer to="/profile">
//                 <NavDropdown.Item>Profile</NavDropdown.Item>
//               </LinkContainer>
//               <NavDropdown.Item onClick={logoutHandler}>
//                 Logout
//               </NavDropdown.Item>
//             </NavDropdown>
//           ) : (
//             <LinkContainer to="/login">
//               <Nav.Link>
//                 <FaUser style={{ marginRight: "5px" }} />
//                 Sign-in
//               </Nav.Link>
//             </LinkContainer>
//           )}
//         </Nav>
//       </Container>
//     </Navbar>
//   );
// };

// export default Header;
