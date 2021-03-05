import React from 'react';
                                                           
const AddInventory = (props) => (
  <div>
    <form method='POST' action='/'>
      <label>Year</label>
      <input type="text"></input>
      <label>Make</label>
      <input type="text"></input>
      <label>Model</label>
      <input type="text"></input>
      <button type="submit">Submit</button>
    </form>
  </div>
);

export default AddInventory;
