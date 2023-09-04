import React from 'react';
import { useIntl } from 'react-intl';

export default () => {
  const { formatMessage } = useIntl();

  return (
    <div style={{ height: '100%', margin: 0, display: 'flex' }}>
      <h1 style={{ margin: 'auto' }}>{formatMessage({ id: 'no_data' })}</h1>
    </div>
  );
};
