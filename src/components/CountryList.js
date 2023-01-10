import React from 'react'
import {useEffect,useState} from 'react'
import axios from 'axios';

function CountryList() {
  const[data,setData]= useState([]);
  const[getCountry,setCountry]=useState([]);
  const[getState,setState]=useState([]);
  const[selectedState,setSelectedState]=useState();
  const[cities,setCities]=useState([]);

  useEffect(()=>{
    axios.get('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json')
    .then(res=> {
      if(res.data){
        setData(res.data);
        let country = [...new Set(res.data.map(item=>item.country))];
        country.sort();
        setCountry(country)
      }
    })
    .catch(err=>console.log(err))
  },[]);

  const handleCountry=(e)=>{
    if(e.target.value){
      let states=data.filter(state=>state.country===e.target.value);
      states= [...new Set (states.map(item=> item.subcountry))];
      states.sort();
      setState(states);
    }
  }

  const handleState=(e)=>{
    if(e.target.value){
      let cities = data.filter(city=>city.subcountry === e.target.value);
      cities.sort();
      setCities(cities);
    }
  }

  return (
    <div>
      <div>
        <label>Country:</label>
        <select onChange={(e)=>handleCountry(e)}>
          <option value ="">Select Country</option>
          {getCountry.map(items=><option key={items} value={items}>{items}</option>)}
        </select>
      </div>
      <div>
        <label>State:</label>
        <select onChange={(e)=>handleState(e)}>
          <option value ="">Select State</option>
          {getState.map(items=> <option key={items} value={items}>{items}</option>)}
        </select>
      </div>
      <div>
        <label>City:</label>
        <select >
          <option value ="">Select City</option>
          {cities.map(items=> <option key={items.name} value={items.name}>{items.name}</option>)}
        </select>
      </div>
    </div>
  );
}

export default CountryList;
