import React from 'react';
import ReactDOM from 'react-dom';

function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const { numbers } = props;
  const listItems = numbers.map((number) =>
    // Correct! Key should be specified inside the array.
    <ListItem key={number.toString()} value={number} />);
  return (
    <ul>
      {listItems}
    </ul>
  );
}
