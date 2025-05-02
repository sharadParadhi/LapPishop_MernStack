import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Row, Col, InputGroup,Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector(state => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  let obj={email,password}
  console.log("user",obj)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin=()=>{
    window.open('http://localhost:5000/api/v1/users/auth/google', '_self');
  }

  const submitHandler = async e => {
    e.preventDefault();
    try {
      const res = await login({ email, password, remember }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success('Login successful');
    } catch (error) {
      toast.error(error?.message || error.error);
    }
  };
  return (
    <FormContainer>
      <Meta title={'Sign In'} />
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            value={email}
            placeholder='Enter email'
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              value={password}
              placeholder='Enter password'
              onChange={e => setPassword(e.target.value)}
            />
            <InputGroup.Text
              onClick={togglePasswordVisibility}
              id='togglePasswordVisibility'
              style={{ cursor: 'pointer' }}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className='mb-3' controlId='checkbox'>
              <Form.Check
                type='checkbox'
                label='Keep me signed in.'
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
            </Form.Group>
          </Col>
          <Col className='text-end'>
            <Link to={'/reset-password'} className=' mx-2'>
              Forgot password?
            </Link>
          </Col>
        </Row>
        <Button
          className='mb-3 w-100'
          variant='warning'
          type='submit'
          disabled={isLoading}
        >
          Sign In
        </Button>
      </Form>
      <Row>
        <Col>
          New Customer?
          <Link
            to={redirect ? `/register?redirect=${redirect}` : '/register'}
            className=' mx-2'
          >
            Register
          </Link>
        </Col>
      </Row>
     <span><hr></hr>Or<hr></hr></span>

      {/* <div className="container mt-5 w-100%">
      <Button className="btn btn-primary w-auto" onClick={handleGoogleLogin} >
        <span > <FcGoogle size={30} style={{backgroundColor:"white",padding: "2px",marginRight:"10px"}} />  &nbsp; </span>
        Continue with Google
      </Button>
    </div> */}
    </FormContainer>
  );
};

export default LoginPage;
