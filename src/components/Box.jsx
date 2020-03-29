/* eslint-disable no-param-reassign, no-console */
import React, { useState } from 'react';

import { ExtSelect, ExtOption } from './ExtSelect';
import { AvatarSelect, AvatarOption } from './AvatarSelect';

const Box = () => {
  const initialState = {
    select1: null,
    select2: null,
    input1: '',
    input2: '',
    input3: '',
  };
  const [state, setState] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
  };

  const handleReset = () => {
    setState(initialState);
  };

  const handleSelectChange = (name, id) => {
    setState((prevState) => ({ ...prevState, [name]: id }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="box">
        <ExtSelect
          name="select1"
          placeholder="Select buyer"
          selected={state.select1}
          onChange={handleSelectChange}
        >
          <ExtOption>TestBuyer 0</ExtOption>
          <ExtOption>TestBuyer 1</ExtOption>
          <ExtOption>TestBuyer 2</ExtOption>
          <ExtOption>TestBuyer 3</ExtOption>
          <ExtOption>TestBuyer 4</ExtOption>
          <ExtOption>TestBuyer 5</ExtOption>
          <ExtOption>TestBuyer 6</ExtOption>
          <ExtOption>TestBuyer 7</ExtOption>
          <ExtOption>TestBuyer 8</ExtOption>
          <ExtOption>TestBuyer 9</ExtOption>
          <ExtOption>TestBuyer 10</ExtOption>
          <ExtOption>TestBuyer 11</ExtOption>
          <ExtOption>TestBuyer 12</ExtOption>
          <ExtOption>TestBuyer 13</ExtOption>
          <ExtOption>TestBuyer 14</ExtOption>
          <ExtOption>TestBuyer 15</ExtOption>
          <ExtOption>TestBuyer 16</ExtOption>
          <ExtOption>TestBuyer 17</ExtOption>
        </ExtSelect>
        <AvatarSelect
          name="select2"
          placeholder="Select buyer"
          selected={state.select2}
          onChange={handleSelectChange}
        >
          <AvatarOption avatar="https://i.pravatar.cc/50?img=1">Ms Smith</AvatarOption>
          <AvatarOption avatar="https://i.pravatar.cc/50?img=2">TestBuyer 1</AvatarOption>
          <AvatarOption avatar="https://i.pravatar.cc/50?img=3">TestBuyer 2</AvatarOption>
          <AvatarOption avatar="https://i.pravatar.cc/50?img=4">TestBuyer 3</AvatarOption>
          <AvatarOption avatar="https://i.pravatar.cc/50?img=5">TestBuyer 4</AvatarOption>
          <AvatarOption avatar="https://i.pravatar.cc/50?img=6">TestBuyer 5</AvatarOption>
          <AvatarOption avatar="https://i.pravatar.cc/50?img=7">TestBuyer 6</AvatarOption>
        </AvatarSelect>
        <input type="text" name="input1" value={state.input1} onChange={handleInputChange} placeholder="Text field" autoComplete="off" />
        <input type="text" name="input2" value={state.input2} onChange={handleInputChange} placeholder="Text field" autoComplete="off" />
        <input type="text" name="input3" value={state.input3} onChange={handleInputChange} placeholder="Text field" autoComplete="off" />
        <button type="button" onClick={() => handleReset()}>Reset</button>
        <button type="submit">Filter</button>
      </div>
    </form>
  );
};

export default Box;
