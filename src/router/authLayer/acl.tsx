import React from 'react';
import { useAppSelector } from 'src/redux/store';
import { useIntl } from 'react-intl';

interface IProps {
  children: JSX.Element
}

const Acl = ({ children }: IProps) => {
  const { auth0 } = useAppSelector((state) => state.authReducer);
  const { formatMessage } = useIntl();

  // TODO: update menuConfig for ACL

  return !Object.keys(auth0).length || auth0.isLoading
    ? <div>{formatMessage({ id: 'loading_msg' })}</div> : children;
};
export default Acl;
