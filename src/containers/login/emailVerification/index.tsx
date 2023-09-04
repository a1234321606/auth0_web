import React, { useState, useEffect } from 'react';
import {
  Card, CardContent, TextField, Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch, authActions } from 'src/redux/store';
import axios from 'src/utilities/axios';
import { Container } from './components';

const EmailVerificationPage = () => {
  const { unverifiedEmail, auth0: { user } } = useAppSelector((state) => state.authReducer);
  const [prevEmail, setPrevEmail] = useState<string>(user.email);
  const [email, setEmail] = useState<string>(user.email);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let timer: NodeJS.Timeout;

  const checkEmailVerified = async () => {
    try {
      clearTimeout(timer);
      const res = await axios.get('users/profile');
      const profile = res.data;
      if (profile.email_verified) {
        dispatch(authActions.setUnverifiedEmail(''));
        navigate('/');
      } else {
        timer = setTimeout(() => {
          checkEmailVerified();
        }, 5000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onResend = async () => {
    try {
      if (prevEmail !== email) {
        await axios.put('users', { email });
        setPrevEmail(email);
      }
      await axios.post('users/verify-email');
      setDisabled(true);
      setSeconds(60);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const cd = setTimeout(() => {
      if (seconds > 1) setSeconds(seconds - 1);
      else setDisabled(false);
    }, 1000);

    return () => {
      clearTimeout(cd);
    };
  }, [seconds]);

  useEffect(() => {
    if (unverifiedEmail) checkEmailVerified();
  }, []);

  return (
    <Container>
      <Card sx={{ minWidth: 800 }}>
        <CardContent>
          <h1>Email Verification</h1>
          <p>
            We&apos;ve sent an email to&nbsp;
            <strong>{email}</strong>
            .&nbsp;
            Please click on the link to complete the verification process.
          </p>
          <p>In case you may enter incorrect email, You could re-enter a new one and try again</p>
          <TextField style={{ width: '50%', marginRight: '20px' }} disabled={disabled} label="Email" value={email} onChange={onEmailChange} />
          <Button variant="contained" disabled={disabled} onClick={onResend}>
            {disabled ? `Resend in ${seconds} seconds` : 'Resend'}
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EmailVerificationPage;
