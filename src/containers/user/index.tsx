import React, { useState, useEffect } from 'react';
import {
  Card, CardContent, TextField, Divider, Tooltip, Skeleton,
} from '@mui/material';
import { DateTime } from 'luxon';
import { useIntl } from 'react-intl';
import Table, { GridColDef } from 'src/components/table';
import axios from 'src/utilities/axios';
import { Container } from './components';

interface IUser {
  user_id: string
  name: string
  email: string | undefined
  given_name: string | undefined
  family_name: string | undefined
  logins_count: number
  last_login: number
  created_at: string
}

export default () => {
  const [rowData, setRowData] = useState<IUser[]>([]);
  const [filterData, setFilterData] = useState<IUser[]>([]);
  const [signinUsers, setSigninUsers] = useState<number>(0);
  const [avgSigninUsers, setAvgSigninUsers] = useState<number>(0);
  const [isUserListLoading, setIsUserListLoading] = useState<boolean>(true);
  const [isUserStatsLoading, setIsUserStatsLoading] = useState<boolean>(true);
  const { formatMessage } = useIntl();
  const columns: GridColDef[] = [
    { field: 'name', headerName: formatMessage({ id: 'user_name' }), flex: 1 },
    { field: 'email', headerName: formatMessage({ id: 'user_email' }), flex: 1 },
    { field: 'given_name', headerName: formatMessage({ id: 'user_given_name' }), flex: 1 },
    { field: 'family_name', headerName: formatMessage({ id: 'user_family_name' }), flex: 1 },
    { field: 'logins_count', headerName: formatMessage({ id: 'user_login_count' }), width: 130 },
    {
      field: 'last_login',
      headerName: formatMessage({ id: 'user_last_login' }),
      flex: 1,
      valueGetter: ({ row }) => row.last_login && DateTime.fromMillis(row.last_login).toFormat('yyyy-MM-dd HH:mm:ss'),
    },
    {
      field: 'created_at',
      headerName: formatMessage({ id: 'user_signup_time' }),
      flex: 1,
      valueGetter: ({ row }) => DateTime.fromISO(row.created_at).toFormat('yyyy-MM-dd HH:mm:ss'),
    },
  ];

  const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLocaleLowerCase();
    const data = rowData.filter((r) => r.name.toLocaleLowerCase().includes(value)
      || r.email?.toLocaleLowerCase().includes(value)
      || r.given_name?.toLocaleLowerCase().includes(value)
      || r.family_name?.toLocaleLowerCase().includes(value));
    setFilterData(data);
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('users');
      setRowData(res.data);
      setFilterData(res.data);
    } catch (e) {
      console.error(e);
    }
    setIsUserListLoading(false);
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get('users/stats', {
        start_timestamp: DateTime.now().plus({ day: -6 }).startOf('day').toMillis(),
        end_timestamp: DateTime.now().endOf('day').toMillis(),
      });
      const count: number = res.data.users[res.data.users.length - 1];
      const avg: number = res.data.users.reduce((sum: number, u: number) => sum + u, 0);
      setSigninUsers(count);
      setAvgSigninUsers(Math.round(avg / res.data.users.length));
    } catch (e) {
      console.error(e);
    }
    setIsUserStatsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, []);

  return (
    <Container>
      <div className="statistics-card">
        <div className="statistics-item-group">
          <Tooltip title={formatMessage({ id: 'stats_total_tooltip' })} followCursor>
            <Card className="statistics-item">
              <div className="title">{formatMessage({ id: 'stats_total' })}</div>
              {isUserStatsLoading ? <Skeleton variant="rounded" height="100%" />
                : <div className="value">{rowData.length}</div>}
            </Card>
          </Tooltip>
          <Divider orientation="vertical" sx={{ borderWidth: 1 }} />
          <Tooltip title={formatMessage({ id: 'stats_today_tooltip' })} followCursor>
            <Card className="statistics-item">
              <div className="title">{formatMessage({ id: 'stats_today' })}</div>
              {isUserStatsLoading ? <Skeleton variant="rounded" height="100%" />
                : <div className="value">{signinUsers}</div>}
            </Card>
          </Tooltip>
          <Divider orientation="vertical" sx={{ borderWidth: 1 }} />
          <Tooltip title={formatMessage({ id: 'stats_7days_tooltip' })} followCursor>
            <Card className="statistics-item">
              <div className="title">{formatMessage({ id: 'stats_7days' })}</div>
              {isUserStatsLoading ? <Skeleton variant="rounded" height="100%" />
                : <div className="value">{avgSigninUsers}</div>}
            </Card>
          </Tooltip>
        </div>
      </div>
      <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', minWidth: '800px' }}>
        <CardContent>
          <h1>{formatMessage({ id: 'user_list' })}</h1>
          <TextField
            fullWidth
            sx={{ marginBottom: '20px' }}
            placeholder={`${formatMessage({ id: 'search' })}...`}
            onChange={onFilterChange}
          />
          <Table
            sx={{ width: 1200 }}
            columns={columns}
            rows={filterData}
            loading={isUserListLoading}
            getRowId={(row) => row.user_id}
          />
        </CardContent>
      </Card>
    </Container>
  );
};
