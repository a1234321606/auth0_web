import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, TextField, Button, Divider,
} from '@mui/material';
import { useIntl } from 'react-intl';
import { useAppSelector, useAppDispatch, authActions } from 'src/redux/store';
import Notification, { useNotification } from 'src/components/notification';
import Confirm, { useConfirm } from 'src/components/confirm';
import UploadAvatar from 'src/components/uploadAvatar';
import PasswordInput from 'src/components/passwordInput';
import axios from 'src/utilities/axios';
import validator from 'src/utilities/validator';
import { Container } from './components';

export default () => {
  const { username, auth0: { logout, user } } = useAppSelector((state) => state.authReducer);
  const [isSocial, setIsSocial] = useState<boolean>();
  const [userProfile, setUserProfile] = useState<any>({});
  const [userData, setUserData] = useState<any>({});
  const [emailData, setEmailData] = useState<string>();
  const [passwordData, setPasswordata] = useState<any>({});
  const [userErrors, setUserErrors] = useState<any>({});
  const [emailError, setEmailError] = useState<string>();
  const [passwordErrors, setPasswordErrors] = useState<any>({});
  const notification = useNotification();
  const confirm = useConfirm();
  const dispatch = useAppDispatch();
  const { formatMessage } = useIntl();

  const getUser = async () => {
    try {
      const res = await axios.get('users/profile');
      if (res.data.user_metadata?.name) res.data.name = res.data.user_metadata.name;
      setUserProfile(res.data);
      setUserData({
        name: res.data.name,
        given_name: res.data.given_name,
        family_name: res.data.family_name,
      });
      setEmailData(res.data.email);
    } catch (e) {
      console.error(e);
    }
  };

  const updateUser = async () => {
    const d: any = {};
    ['name', 'given_name', 'family_name'].forEach((k) => {
      if ((userData[k] && !userProfile[k]) || userData[k] !== userProfile[k]) d[k] = userData[k];
    });
    if (Object.keys(userErrors).length || !Object.keys(d).length) return;

    try {
      await axios.put('users', d);
      if (d.name) dispatch(authActions.setUsername(d.name || userData.name));
      notification.open({
        severity: 'success',
        message: formatMessage({ id: 'update_success' }),
      });
    } catch (e) {
      console.error(e);
      notification.open({
        severity: 'error',
        message: formatMessage({ id: 'update_fail' }),
      });
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });

    const errors = { ...userErrors };
    const field = formatMessage({ id: `user_${e.target.name}` });
    if (e.target.required && !e.target.value) {
      errors[e.target.name] = formatMessage({ id: 'validate_required' }, { field });
    } else if (e.target.name === 'given_name' && !validator.isAlphabetic(e.target.value)) {
      errors[e.target.name] = formatMessage({ id: 'validate_alphabetic' }, { field });
    } else if (e.target.name === 'family_name' && !validator.isAlphabetic(e.target.value)) {
      errors[e.target.name] = formatMessage({ id: 'validate_alphabetic' }, { field });
    } else delete errors[e.target.name];
    setUserErrors(errors);
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailData(e.target.value);

    const field = formatMessage({ id: `user_${e.target.name}` });
    if (e.target.required && !e.target.value) {
      setEmailError(formatMessage({ id: 'validate_required' }, { field }));
    } else if (!validator.isEmail(e.target.value)) {
      setEmailError(formatMessage({ id: 'validate_invalid' }, { field }));
    } else setEmailError(undefined);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = { ...passwordData };
    if (e.target.value) data[e.target.name] = e.target.value;
    else delete data[e.target.name];
    setPasswordata(data);

    const errors = { ...passwordErrors };
    const field = formatMessage({ id: `user_profile_${e.target.name}` });
    if (e.target.getAttribute('data-valid') === 'false') {
      errors[e.target.name] = formatMessage({ id: 'validate_invalid' }, { field });
    } else if (e.target.name === 'new_password' || e.target.name === 'confirm_password') {
      const name = e.target.name === 'new_password' ? 'confirm_password' : 'new_password';
      if (e.target.value && passwordData[name] && e.target.value !== passwordData[name]) {
        errors.confirm_password = formatMessage({ id: 'validate_not_match' });
      } else {
        delete errors.new_password;
        delete errors.confirm_password;
      }
    } else delete errors[e.target.name];
    setPasswordErrors(errors);
  };

  const changeEmail = async () => {
    if (!emailData || emailData === userProfile.email || emailError) return;
    try {
      await axios.put('users', { email: emailData });
      await axios.post('users/verify-email');
      confirm.open({
        title: formatMessage({ id: 'change_email_title' }),
        content: <>{formatMessage({ id: 'change_email_content' }, { email: <b>{emailData}</b> })}</>,
        onOk: () => logout({ logoutParams: { returnTo: window.location.origin } }),
      });
    } catch (e) {
      notification.open({
        severity: 'error',
        message: formatMessage({ id: 'change_email_fail' }),
      });
    }
  };

  const changePassword = async () => {
    if (Object.keys(passwordData).length !== 3 || Object.keys(passwordErrors).length) return;
    try {
      await axios.post('users/change-password', passwordData);
      confirm.open({
        title: formatMessage({ id: 'change_pwd_title' }),
        content: formatMessage({ id: 'change_pwd_content' }),
        onOk: () => logout({ logoutParams: { returnTo: window.location.origin } }),
      });
    } catch (e: any) {
      notification.open({
        severity: 'error',
        message: formatMessage({ id: 'change_pwd_fail' }),
      });
    }
  };

  const deleteAccount = () => {
    confirm.open({
      title: formatMessage({ id: 'delete_account_title' }),
      content: (
        <>
          <p style={{ color: 'red' }}>{formatMessage({ id: 'delete_account_content1' })}</p>
          <p>{formatMessage({ id: 'delete_account_content2' })}</p>
        </>
      ),
      onOk: async () => {
        try {
          await axios.delete('users');
          logout({ logoutParams: { returnTo: window.location.origin } });
        } catch (e) {
          notification.open({
            severity: 'error',
            message: formatMessage({ id: 'delete_account_fail' }),
          });
        }
      },
      onCancel: () => confirm.close(),
    });
  };

  useEffect(() => {
    setIsSocial(!user?.sub.startsWith('auth0'));
    getUser();
  }, []);

  return (
    <Container>
      <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', minWidth: '800px' }}>
        <CardContent>
          <div style={{ display: 'grid', gridTemplate: 'auto / 1fr 1fr', gridGap: '20px 8px' }}>
            <h1 style={{ gridColumn: '1 / -1' }}>{formatMessage({ id: 'user_profile' })}</h1>
            <div style={{
              display: 'grid', gridColumn: '1 / -1', gridTemplate: 'auto / 30% 1fr', gap: '20px 8px',
            }}
            >
              <UploadAvatar
                style={{
                  width: '140px', height: '140px', gridRow: '1 / 5', justifySelf: 'center',
                }}
                src={isSocial ? user?.picture : ''}
                alt={username.split(' ').map((s: string) => s[0]).join('').toUpperCase()}
                readOnly
              />
              <TextField
                label={formatMessage({ id: 'user_name' })}
                name="name"
                required
                value={userData.name || ''}
                error={!!userErrors.name}
                helperText={userErrors.name}
                onChange={onInputChange}
              />
              <TextField
                label={formatMessage({ id: 'user_given_name' })}
                name="given_name"
                value={userData.given_name || ''}
                error={!!userErrors.given_name}
                helperText={userErrors.given_name}
                disabled={isSocial}
                onChange={onInputChange}
              />
              <TextField
                label={formatMessage({ id: 'user_family_name' })}
                name="family_name"
                value={userData.family_name || ''}
                error={!!userErrors.family_name}
                helperText={userErrors.family_name}
                disabled={isSocial}
                onChange={onInputChange}
              />
              <div><Button variant="contained" onClick={updateUser}>{formatMessage({ id: 'save' })}</Button></div>
            </div>
            <Divider style={{ gridColumn: '1 / -1' }} />
            <TextField
              label={formatMessage({ id: 'user_email' })}
              name="email"
              required
              disabled={isSocial}
              value={emailData || ''}
              error={!!emailError}
              helperText={emailError}
              onChange={onEmailChange}
            />
            <div>
              <Button variant="contained" disabled={isSocial} onClick={changeEmail}>
                {formatMessage({ id: 'change_email_title' })}
              </Button>
            </div>
            <Divider style={{ gridColumn: '1 / -1' }} />
            <PasswordInput
              label={formatMessage({ id: 'user_profile_new_password' })}
              name="new_password"
              disabled={isSocial}
              helperText={passwordErrors.new_password}
              onChange={onPasswordChange}
            />
            <PasswordInput
              label={formatMessage({ id: 'user_profile_confirm_password' })}
              name="confirm_password"
              disabled={isSocial}
              helperText={passwordErrors.confirm_password}
              onChange={onPasswordChange}
            />
            <PasswordInput
              label={formatMessage({ id: 'user_profile_old_password' })}
              name="old_password"
              disabled={isSocial}
              helperText={passwordErrors.old_password}
              onChange={onPasswordChange}
            />
            <div>
              <Button variant="contained" disabled={isSocial} onClick={changePassword}>
                {formatMessage({ id: 'change_pwd_title' })}
              </Button>

            </div>
            <Divider style={{ gridColumn: '1 / -1' }} />
            <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" color="error" onClick={deleteAccount}>
                {formatMessage({ id: 'delete_account_title' })}
              </Button>
              <Button variant="contained" color="secondary" onClick={logout}>
                {formatMessage({ id: 'logout' })}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Notification ref={notification.ref} />
      <Confirm ref={confirm.ref} />
    </Container>
  );
};
