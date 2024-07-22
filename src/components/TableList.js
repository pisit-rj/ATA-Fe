import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { Box, Typography, useTheme } from '@mui/material';
import { useSelector } from "react-redux";

function TableList() {

    const theme = useTheme();
    const data = useSelector(state => state.data.data == null ? "" : state.data.data)

    const defaultColumns = [
        { id: 'account', accessorKey: 'account', header: 'Account' },
        { id: 'operation', accessorKey: 'operation', header: 'Operation' },
        { id: 'symbol', accessorKey: 'symbol', header: 'Symbol' },
        { id: 'description', accessorKey: 'description', header: 'Description', size: 200 },
        { id: 'qty', accessorKey: 'qty', header: 'Qty' },
        { id: 'filledQty', accessorKey: 'filledQty', header: 'Filled Qty' },
        { id: 'price', accessorKey: 'price', header: 'Price' },
        { id: 'status', accessorKey: 'status', header: 'Status' },
        { id: 'date', accessorKey: 'date', header: 'Date' },
        { id: 'expiration', accessorKey: 'expiration', header: 'Expiration' },
        { id: 'noRef', accessorKey: 'noRef', header: 'No. Ref.' },
        { id: 'extRef', accessorKey: 'extRef', header: 'Ext. Ref.', size: 150 },
    ]

    defaultColumns.map(item=>{item['muiTableHeadCellProps'] = {align: 'center'};item['muiTableBodyCellProps'] = {align: 'center'}})
    
    const mobileColumns = [ 'account', 'operation', 'symbol', 'status' ]
    // window.innerWidth = 400
    const columns = window.innerWidth <= 900 ? defaultColumns.filter(obj => mobileColumns.includes(obj.id)) : defaultColumns

    const table = useMaterialReactTable({
        columns,
        data,
        enableExpandAll: false,
        enableExpanding: true,
        enableColumnActions: false,
        enableColumnFilters: false,
        enablePagination: false,
        enableStickyHeader: true,
        defaultColumn: {
            minSize: 20, maxSize: 400, size: 130
        },

        renderDetailPanel: ({ row }) =>
          row.original.account ? (
            <Box
              sx={{
                display: 'grid',
                margin: 'auto',
                gridTemplateColumns: '1fr',
                width: '100%',
                gridGap: '5px',
              }}
            >
                <Box
                    sx={{
                        display: 'grid',
                        gridGap: '5px',
                        [theme.breakpoints.down('sm')]: {
                            gridTemplateColumns: '2fr 2fr 3fr',
                        },
                        [theme.breakpoints.up('sm')]: {
                            gridTemplateColumns: '1fr 1fr 0.5fr 1fr 1fr',
                        },
                        [theme.breakpoints.up('md')]: {
                            gridTemplateColumns: '1fr 1fr 2fr 1fr 1fr',
                        },
                        [theme.breakpoints.up('lg')]: {
                            gridTemplateColumns: '1fr 1fr 7fr 1fr 1fr',
                        },
                    }}>
                    <Typography>{row.original.firstName} {row.original.lastName}</Typography>
                    <button type="button" class="btn btn-outline-primary rounded-pill" >
                        Full review details
                    </button>
                    <div></div>
                    <button type="button" class="btn btn-primary rounded-pill" >
                        ACCEPT
                    </button>
                    <button type="button" class="btn btn-outline-danger rounded-pill" >
                        <b>Reject</b>
                    </button>
                </Box>
                <Box
                    sx={{
                        display: 'grid',
                        [theme.breakpoints.down('sm')]: {
                            gridTemplateColumns: '1fr 1fr 1fr',
                        },
                        [theme.breakpoints.up('sm')]: {
                            gridTemplateColumns: '1fr 1fr',
                        },
                        [theme.breakpoints.up('md')]: {
                            gridTemplateColumns: '1fr 1fr 1fr',
                        },
                        [theme.breakpoints.up('lg')]: {
                            gridTemplateColumns: '1fr 1fr 1fr 1fr',
                        },
                    }}>
                    <span>Net Amount: {row.original.netAmount}</span>
                    <span>Price: {row.original.price}</span>
                    <span>Exchange Rate: {row.original.exchangeRate}</span>
                    <span>O/S Limit: {row.original.osLimit}</span>
                    <span>Reference Number: {row.original.referenceNumber}</span>
                    <span>Date / Time: {row.original.dateTime}</span>
                    <span>Telephone Rate: {row.original.phoneNumber}</span>
                    <span>User Id: {row.original.userId}</span>
                </Box>
                <Box>
                    <Typography>Free text</Typography>
                </Box>
            </Box>
          ) : null,
        muiExpandButtonProps: ({ row, table }) => ({
            onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }),
            sx: {
              transform: row.getIsExpanded() ? 'rotate(180deg)' : 'rotate(-90deg)',
              transition: 'transform 0.2s',
            },
          }),
        options: {
            expandable: true,
            detailPanel: (rowData) => (
              <div>
                <p>Additional details for {rowData.account}</p>
                <p>Operation: {rowData.operation}</p>
                <p>Symbol: {rowData.symbol}</p>
                {/* Add more details as needed */}
              </div>
            )},
        defaultDisplayColumn: { enableResizing: true },
        enableColumnResizing: true,
        muiTableContainerProps: { 
            sx: {
                height: '650px',
            },
        },
    });

    return (
        <div style={{
            width: '98%',
            margin: 'auto'}}>
            <MaterialReactTable table={table}/>
        </div>
    )
}

export default TableList