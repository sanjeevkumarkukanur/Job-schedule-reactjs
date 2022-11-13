import React, {useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useDispatch, useSelector } from 'react-redux';
import { getJobSchedule, PostEditJobSchedule } from '../actions/JobAction';
import { Button, InputBase, MenuItem, Select } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink, useNavigate } from 'react-router-dom';
import { green } from '@mui/material/colors';


const columns = [
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'email', label: 'email', minWidth: 100 },
  { id: 'contact', label: 'Contact', minWidth: 100 },
  { id: 'address', label: 'Address', minWidth: 100 },
  { id: 'city', label: 'City', minWidth: 100 },
  { id: 'state', label: 'State', minWidth: 100 },
  { id: 'zipcode', label: 'Zipcode', minWidth: 100 },
  { id: 'type_of_loss', label: 'Type of Loss', minWidth: 100 },
  { id: 'living_space', label: 'Sq. Footage Living space', minWidth: 100 },
  { id: 'no_of_furnace', label: 'No. Of Furnace', minWidth: 100 },
  { id: 'schedule_date', label: 'Schedule Date', minWidth: 100 },
  { id: 'arrival_time', label: 'Arrival Time', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 100 },

];

function Products() {
    const [data, setData] = useState('');
 
    const [input, setInput] = useState("");
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState("ASC");
    const [rowsPerPage, setRowsPerPage] = useState(10);


    let dispatch = useDispatch();
    let navigate = useNavigate();
    const products = useSelector(state => state.ProductRD);

    const jobScheduleList = products.filter((item) =>
    item.name.toLowerCase().includes(input)
  );
  
  useEffect(() => {
    dispatch(getJobSchedule());
}, []);
 
const handleStatus = (e) =>{
    const editData = e.target.value.split("-")
    const inputData={...data}
    inputData[e.target.id]=editData[0];
    
    setData(inputData);
    dispatch(PostEditJobSchedule(data));
    navigate('/')
}
const sorting = (col) => {
    if(order === 'ASC'){
      const JobSorted = [...jobScheduleList].sort((a,b)=>
      a[col].toLowerCase() > b[col].toLowerCase() ? 1 :-1
      )
      setData(JobSorted)
      setOrder("DEC")
     
    }
    if(order === 'DEC'){
      const JobSorted = [...jobScheduleList].sort((a,b)=>
      a[col].toLowerCase() < b[col].toLowerCase() ? 1 :-1
      )
      setData(JobSorted)
      setOrder("ASC")
     
    }
  }

    const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  
  return (
    <Paper  sx={{  display: 'flex',flexDirection: 'column', alignItems: 'center',justifyContent: 'space-between' }}>
    <Paper
    component="form"
    sx={{ p: '2px 15px',m: '2px ', display: 'flex', alignItems: 'center',justifyContent: 'space-between', width: '80% ' }}
  >
    <NavLink exact to="/add">
    <Button variant="contained">Add Job Schedule</Button>
            </NavLink>
    
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
      <SearchIcon />
    </IconButton>
    <InputBase
        onChange={(e) => setInput(e.target.value)}
      sx={{ ml: 1, flex: 1 }}
      placeholder="Search Jobs"
      inputProps={{ 'aria-label': 'search jobs' }}
    />
    
    
  </Paper>

    <Paper sx={{ width: '100%' }}>
      <TableContainer >
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
         
            <TableRow  >
              {columns.map((column) => (
                
                <TableCell sx={{ background: green[500] }} onClick={()=> sorting(column.id)}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data ? data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          
          defaultValue='change'
          onChange={(e) => handleStatus(e)}

        >
          <MenuItem  value={'InProgress'}>InProgress</MenuItem>
          <MenuItem  value={'Completed'}>Completed</MenuItem>
          <MenuItem  value={'Scheduled'}>Scheduled</MenuItem>
          
        </Select>
                  </TableRow>
                );
              }):
              jobScheduleList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                     <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          
          defaultValue='change'
          onChange={(e) => handleStatus(e)}
        >
          <MenuItem  value={'InProgress'}>InProgress</MenuItem>
          <MenuItem  value={'Completed'}>Completed</MenuItem>
          <MenuItem  value={'Scheduled'}>Scheduled</MenuItem>
        </Select>
                  </TableRow>
                  
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={jobScheduleList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </Paper>
  );
}


export default Products;