// import React from 'react';
// import OrderRow from './OrderRow';

// const OrderTable = ({ report }) => {
//     const headerStyle = {
//         padding: '10px',
//         border: '1px solid #ddd',
//         textAlign: 'center',
//         backgroundColor: '#f4f4f4',
//       };
//   return (
//     <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
//       <thead>
//         <tr>
//           <th style={headerStyle}>Date</th>
//           <th style={headerStyle}>Breakfast</th>
//           <th style={headerStyle}>Lunch</th>
//           <th style={headerStyle}>Dinner</th>
//           <th style={headerStyle}>Daily Fine (Rs)</th>
//         </tr>
//       </thead>
//       <tbody>
//         {report.map((item, index) => (
//           <OrderRow key={index} item={item} />
//         ))}
//       </tbody>
//     </table>
//   );
// };



// export default OrderTable;
import React from 'react';

const OrderTable = ({ report }) => {
    const headerStyle = {
                border: '1px solid #ddd',
                textAlign: 'center',
                backgroundColor: '#f4f4f4',
              };
  const getCellStyle = (status) => {
    return status === 'Wasted' ? { backgroundColor: 'red', color: 'white' } : {};
  };

  return (
    <table style={{ width: '100%', marginTop: '20px',border:"2px solid black",textAlign:"center" }}>
      <thead>
        <tr>
          <th style={headerStyle}>Date</th>
          <th style={headerStyle}>Breakfast</th>
          <th style={headerStyle}>Lunch</th>
          <th style={headerStyle}>Dinner</th>
          <th style={headerStyle}>Daily Fine (Rs)</th>
        </tr>
      </thead>
      <tbody>
        {report.map((item, index) => (
          <tr key={index}>
            <td className='content'>{item.date}</td>
            <td className='content' style={getCellStyle(item.status.breakfast)}>{item.status.breakfast}</td>
            <td className='content' style={getCellStyle(item.status.lunch)}>{item.status.lunch}</td>
            <td className='content' style={getCellStyle(item.status.dinner)}>{item.status.dinner}</td>
            <td className='content'>{item.dailyFine}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;

