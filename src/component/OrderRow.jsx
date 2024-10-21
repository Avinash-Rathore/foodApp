import React from 'react';

const OrderRow = ({ item }) => {
    const cellStyle = {
        padding: '10px',
        border: '1px solid #ddd',
        textAlign: 'center',
      };
  return (
    <tr>
      <td style={cellStyle}>{item.date}</td>
      <td style={cellStyle}>{item.status.breakfast}</td>
      <td style={cellStyle}>{item.status.lunch}</td>
      <td style={cellStyle}>{item.status.dinner}</td>
      <td style={cellStyle}>{item.dailyFine}</td>
    </tr>
  );
};



export default OrderRow;
