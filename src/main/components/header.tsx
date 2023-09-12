import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import {
  AppBar, Button, IconButton, Menu, MenuItem, Avatar,
} from '@mui/material';
import { useAppSelector } from 'src/redux/store';

interface IMenu {
  key: number
  path: string
  label: string | JSX.Element
  children: IMenu[]
}

interface IProps {
  menuConfig: IMenu[]
}

export default ({ menuConfig }: IProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>();
  const [target, setTarget] = useState<string | null>();
  const [avatarAlt, setAvatarAlt] = useState<string>();
  const { username, auth0: { user, logout } } = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const { formatMessage } = useIntl();

  const onAvatarClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);

  const onAvatarClose = (item: string) => {
    setAnchorEl(null);
    setTarget(item);
  };

  useEffect(() => {
    setAvatarAlt(username.split(' ').map((s: string) => s[0]).join('').toUpperCase());
  }, [username]);

  useEffect(() => {
    if (target) {
      if (target === formatMessage({ id: 'menu_profile' })) navigate('/profile');
      else if (target === formatMessage({ id: 'menu_logout' })) {
        logout({ logoutParams: { returnTo: window.location.origin } });
      }
      setTarget(null);
    }
  }, [target]);

  return (
    <AppBar position="relative" style={{ flexDirection: 'row', alignItems: 'center', padding: '0 24px' }}>
      <div style={{ display: 'flex', flex: 1 }}>
        {menuConfig.map((item) => (
          <Button
            key={item.path}
            onClick={() => { }}
            sx={{ my: 2, color: 'white' }}
            component={NavLink}
            to={item.path}
          >
            {item.label}
          </Button>
        ))}
      </div>
      <div>
        <IconButton onClick={onAvatarClick}>
          <Avatar src={user?.sub.startsWith('auth0') ? avatarAlt : user?.picture}>{avatarAlt}</Avatar>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={onAvatarClose}
        >
          {[formatMessage({ id: 'menu_profile' }), formatMessage({ id: 'menu_logout' })]
            .map((label) => (
              <MenuItem key={label} onClick={() => onAvatarClose(label)}>{label}</MenuItem>
            ))}
        </Menu>
      </div>

    </AppBar>
  );
};
