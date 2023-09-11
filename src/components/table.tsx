import React, { useState } from 'react';
import {
  DataGrid, GridColDef, DataGridProps, GridSelectedRowCount, GridPagination,
} from '@mui/x-data-grid';
import { IconButton, LinearProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import NoRowsOverlay from 'src/components/noData';

// TODO: implement delete function
const createFooter = (selected: any[]) => (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <div style={{ display: 'flex' }}>
      {selected.length > 0 && (
      <>
        <GridSelectedRowCount selectedRowCount={selected.length} />
        <IconButton onClick={() => {}}><DeleteIcon /></IconButton>
      </>
      )}
    </div>
    <GridPagination />
  </div>
);

export default ({
  columns, rows, sx, checkboxSelection, loading, getRowId,
}: DataGridProps) => {
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <div style={{ overflow: 'auto' }}>
      <DataGrid
        sx={rows.length ? { minHeight: 'fit-content', ...sx } : { height: 400, ...sx }}
        getRowId={getRowId}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 50, 100]}
        disableColumnMenu
        checkboxSelection={checkboxSelection}
        loading={loading}
        onRowSelectionModelChange={checkboxSelection ? (e: any) => setSelectedRows(e) : undefined}
        slots={{
          loadingOverlay: LinearProgress,
          noRowsOverlay: NoRowsOverlay,
          footer: () => createFooter(selectedRows),
        }}
      />
    </div>
  );
};

export type {
  GridColDef,
};
