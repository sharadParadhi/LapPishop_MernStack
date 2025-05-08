// import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap';

// const Footer = () => {
//   const currentYear = new Date().getFullYear();
//   return (
//     <Container>
//       <Row>
//         <Col className='text-center py-3'>MERN Shop &copy; {currentYear}</Col>
//       </Row>
//     </Container>
//   );
// };

// export default Footer;



import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-dark text-light pt-4 mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <h5 className="mb-3">lapPyShop</h5>
            <p>Your trusted destination for the latest and most reliable laptops. Performance meets affordability.</p>
          </Col>
          <Col md={2} className="mb-4">
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/products" className="text-light text-decoration-none">Shop</a></li>
              <li><a href="/about" className="text-light text-decoration-none">About Us</a></li>
              <li><a href="/contact" className="text-light text-decoration-none">Contact</a></li>
              <li><a href="/faq" className="text-light text-decoration-none">FAQ</a></li>
            </ul>
          </Col>
          <Col md={3} className="mb-4">
            <h6>Customer Support</h6>
            <p>Email: support@lappyshop.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>Mon - Fri: 9am - 6pm</p>
          </Col>
          <Col md={3} className="mb-4">
            <h6>Follow Us</h6>
            <div className="d-flex gap-3">
              <a href="#" className="text-light fs-5"><FaFacebookF /></a>
              <a href="#" className="text-light fs-5"><FaInstagram /></a>
              <a href="#" className="text-light fs-5"><FaTwitter /></a>
              <a href="#" className="text-light fs-5"><FaYoutube /></a>
            </div>
          </Col>
        </Row>
        <hr className="border-secondary" />
        <Row>
          <Col className="text-center py-2">
            &copy; {currentYear} lapPyShop. All Rights Reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

