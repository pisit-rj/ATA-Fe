import './SearchTab.css';
import { Dropdown } from "react-bootstrap";
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { fetchData } from '../action/dataAction';
import mockData from '../MOCK_DATA.json'
    
function SearchTab() {

    const dispatch = useDispatch()
    const [state, setState] = useState({
        dateFrom: dayjs(new Date().toString()),
        dateTo: dayjs(new Date().toString()),
        period: "Transmission",
        status: "Waiting",
        searchResultCount: 0,
    })

    const search = () => {
        //call api filter by state
        let data = mockData
        data = data.filter(item => {
            return item.status === state.status && state.dateFrom.isBefore(item.date) && state.dateTo.isAfter(item.date)
        })

        setState({...state, searchResultCount: data.length})
        dispatch(fetchData(data))
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('MOCK_DATA.json',
            {headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }}); 
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const jsonData = await response.json();
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData()
      }, [])

    return (
        <div id="search-tab">
            <div id="search-title">
                <h1>Search</h1>
                <span>Search results : {state.searchResultCount}</span>
            </div>
            <div id="search-filter">
                <div className='search-filter-item'>
                    <span className='search-filter-title'>Period</span>
                    <Dropdown className="d-inline mx-2" title="Period" onSelect={(eventKey)=>{setState({...state, period: eventKey})}}>
                        <Dropdown.Toggle id="dropdown-autoclose-true">
                            {state.period}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="Transmission">Transmission</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className='search-filter-item'>
                    <span className='search-filter-title'>Status</span>
                    <Dropdown className="d-inline mx-2" title="Status" onSelect={(eventKey)=>{setState({...state, status: eventKey})}}>
                        <Dropdown.Toggle id="dropdown-autoclose-true">
                            {state.status}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="Waiting">Waiting</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className='search-filter-item date-picker'>
                    <span className='search-filter-title'>From</span>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                       <DatePicker format="DD/MM/YYYY" maxDate={state.dateTo} defaultValue={state.dateFrom} onChange={(value)=>setState({...state, dateFrom: value})}/>
                    </LocalizationProvider>
                </div>
                <div className='search-filter-item date-picker'>
                    <span className='search-filter-title'>To</span>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                       <DatePicker format="DD/MM/YYYY" minDate={state.dateFrom} defaultValue={state.dateTo} onChange={(value)=>setState({...state, dateTo: value})}/>
                    </LocalizationProvider>
                </div>
                <button type="button" class="btn btn-primary rounded-pill" onClick={search}>
                    Search
                </button>
            </div>
        </div>
    );
}

export default SearchTab