import React, { useState } from "react";
import { addJobSchedule } from "../actions/JobAction";
import { useDispatch } from "react-redux";
// import { NavLink } from "react-router-dom";
import TextField from "@mui/material/TextField";
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";


function AddJobSchedule() {
  let [data, setData] = useState({
    name: "",
    email: "",
    contact: "",
    city: "",
    state: "",
    address: "",
    zipcode: "",
    type_of_loss: "",
    living_space: "",
    no_of_furnace: "",
    schedule_date: "",
    arrival_time: "",
    status: "InProgress",
  });
  const [value, setValue] = useState(Date());
  const [arrivalTime, setArrivalTime] = useState();
  const [livingSpace, setLivingSpace] = useState('');
  const [typeLoss, setTypeLoss] = useState();
  const [furnace, setFurnace] = useState('');
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    
    dispatch(
      addJobSchedule({
        name: data.name,
        email: data.email,
        contact: data.contact,
        city: data.city,
        state: data.state,
        zipcode: data.zipcode,
        type_of_loss: data.type_of_loss,
        living_space: data.living_space,
        no_of_furnace: data.no_of_furnace,
        schedule_date: data.schedule_date,
        arrival_time: data.arrival_time,
        status: data.status,
        address: data.address,
      })
    );
  
    setData({
        name: "",
    email: "",
    contact: "",
    city: "",
    state: "",
    zipcode: "",
    type_of_loss: "",
    living_space: "",
    no_of_furnace: "",
    schedule_date: "",
    arrival_time: "",
    address: "",
    status: "InProgress",
    });
    navigate('/')
  }
  const GetValueInputForm = (e) => {
    const inputData = { ...data };
    inputData[e.target.id] = e.target.value;
    
    setData(inputData);
  }
  return (
    <FormControl 
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        component="form"
        sx={{
          border: 1,
          display: "flex",
          flexDirection: "column",
          "& .MuiTextField-root": { m: 1, width: "35ch" },
          width: "50%",
          p: "25px",
          borderRadius: "16px",
        }}
        noValidate
        autoComplete="off"
      >
        <h2 sx={{ p: "5px 0" }}>Add Scheduled Jobs Details</h2>
        <Box component="form" sx={{ display: "flex", alignItems: "center" }}>
          <TextField onChange={(e)=>GetValueInputForm(e)} value={data.name} fullWidth label="Full Name" id="name" />
          <TextField onChange={(e)=>GetValueInputForm(e)} value={data.email} fullWidth label="Email" id="email" />
        </Box>

        <Box component="form" sx={{ display: "flex", alignItems: "center" }}>
          <TextField onChange={(e)=>GetValueInputForm(e)} value={data.contact} fullWidth label="Contact" id="contact" />
          <TextField onChange={(e)=>GetValueInputForm(e)} value={data.city} fullWidth label="City" id="city" />
        </Box>

        <Box component="form" sx={{ display: "flex", alignItems: "center" }}>
          <TextField onChange={(e)=>GetValueInputForm(e)} value={data.state} fullWidth label="state" id="state" />
          <TextField onChange={(e)=>GetValueInputForm(e)} value={data.zipcode} fullWidth label="Zip Code" id="zipcode" />
        </Box>

        <FormLabel id="demo-radio-buttons-group-label">Type of Loss</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="fire"
          name="radio-buttons-group"
          onChange={(e)=>GetValueInputForm(e)} value={data.type_of_loss = typeLoss}
        >
          <Box component="form" sx={{ display: "flex", alignItems: "center" }}>
            <FormControlLabel onClick={(e)=>setTypeLoss(e.target.value)} value="fire" control={<Radio />} label="Fire" />
            <FormControlLabel onClick={(e)=>setTypeLoss(e.target.value)} value="water" control={<Radio />} label="Water" />
            <FormControlLabel onClick={(e)=>setTypeLoss(e.target.value)} value="other" control={<Radio />} label="Other" />
          </Box>
        </RadioGroup>

        <FormLabel id="demo-radio-buttons-group-label">
          Sq. Footage Living space
        </FormLabel>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue='0-1000'
          
          onChange={(e)=>setLivingSpace(e.target.value)} value={data.living_space = livingSpace}
        >
          <MenuItem  value='0-1000'>0-1000</MenuItem>
          <MenuItem  value='1001-2000'>1001-2000</MenuItem>
          <MenuItem   value='2001-2900'>2001-2900</MenuItem>
          <MenuItem  value='2900+'>2900+</MenuItem>
        </Select>
        <Box component="form" sx={{ display: "flex", alignItems: "center" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          
         <DatePicker
          views={['day']}
          label="Just date"
          value={data.schedule_date = value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />

          </LocalizationProvider>
          <FormLabel id="demo-radio-buttons-group-label">
          No. Of Furnace
        </FormLabel>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          
          onChange={(e) => setFurnace(e.target.value)}
           value={data.no_of_furnace = furnace}
        >
          <MenuItem  value='0'>0</MenuItem>
          <MenuItem  value='1'>1</MenuItem>
          <MenuItem  value='2'>2</MenuItem>
          <MenuItem  value='3+'>3+</MenuItem>
        </Select>
          
        </Box>
        <FormLabel id="demo-radio-buttons-group-label">
            Type of Loss
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="fire"
            name="radio-buttons-group"
          >
            <Box
              component="form"
              sx={{ display: "flex", alignItems: "center" }}
              onChange={(e)=>GetValueInputForm(e)}
               value={data.arrival_time = arrivalTime}
            >
              <FormControlLabel
              onClick={(e)=>setArrivalTime(e.target.value)} value='8-9 AM'
                
                control={<Radio />}
                label="8-9 AMe"
              />
              <FormControlLabel
             onClick={(e)=>setArrivalTime(e.target.value)} value='11 AM - 1 PM'
                
                control={<Radio />}
                label="11 AM - 1 PM"
              />
              <FormControlLabel
              onClick={(e)=>setArrivalTime(e.target.value)} value='1-4 PM'
            
                control={<Radio />}
                label="1-4 PM"
              />
            </Box>
          </RadioGroup>
        <TextField
          fullWidth

          label="Address"
          multiline
          rows={4}
          onChange={(e)=>GetValueInputForm(e)} value={data.address}
          id="address"
        />
        <Button  onClick={(e)=> handleSubmit(e)} variant="contained" color="success">
          Submit
        </Button>
      </Box>
    </FormControl>
  );
}

export default AddJobSchedule;
