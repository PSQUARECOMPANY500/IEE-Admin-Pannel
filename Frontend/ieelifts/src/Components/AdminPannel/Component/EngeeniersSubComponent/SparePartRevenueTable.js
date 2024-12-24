import React, { useEffect, useState } from "react";
const {
  getRevenueTablerDataAction,
} = require("../../../../ReduxSetup/Actions/AdminActions");

const SparePartRevenueTable = ({ engID }) => {
  const [revenueData, setRevenueData] = useState([]);
  console.log("7777777777777777777777", revenueData);

  useEffect(() => {
    const getData = async () => {
      const response = await getRevenueTablerDataAction(engID);
      //  console.log("response",response.sparePartRevenueData) 
      if(response){
        setRevenueData(response.sparePartRevenueData);
      }

    };
    getData();
  }, [engID]);

  // console.log("this is data it is rendering ",revenueData)

  return (
    <div className="spare-part-table_view">
      <div className="spare-part-sub-table-view">
        <div
          className="spare-part-table-container"
     
        >
          <div className="eng-table-shadow"></div>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>JON</th>
                <th>Client Name</th>
                <th>Spart Part ID</th>
                <th>Spare Part Name</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>

          {
            revenueData?.map((item) =>(
              item.SparePartChanged?.map((sparePart) =>(
              console.log("this is my item ", item),
              console.log("this is my 3333 ", sparePart),
              <tr >
              <td>{item.Date}</td>
              <td>{item.JobOrderNumber}</td>
              <td>{item.ClientName}</td>
              <td>{sparePart.subsparePartspartid}</td>
              <td>{sparePart.sparePartsname}</td>
              <td>1</td>
              <td>{sparePart.partsprice}</td>
              <td>{item.paymentMode}</td>
           </tr>
            ))
          ))
          }
       



       
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SparePartRevenueTable;


// <tbody>
//   {revenueData?.map((item) => {
//     console.log("this is data it is rendering ", item);
//     return item?.SparePartsChanged?.map((part, index) => (
//       <tr key={`${item.Date}-${index}`}>
//         <td>{item.Date}</td>
//         <td>{item.ClientName.JobOrderNumber}</td>
//         <td>{item.ClientName.name}</td>
//         <td>{part.subsparePartspartid}</td>
//         <td>{part.subsparePartspartname}</td>
//         <td>1</td>
//         <td>{part.partsprice}</td>
//         <td>{item.paymentMode}</td>
//       </tr>
//     ));
//   })}
// </tbody>





//correct code

// {revenueData?.map((item) =>
//   console.log("this is data it is rendering ",item),
//   item?.SparePartsChanged?.map((part, index) => (
//     <tr>
//       <td>{item.Date}</td>
//       <td>{item.ClientName.JobOrderNumber}</td>
//       <td>{item.ClientName.name}</td>
//       <td>{part.subsparePartspartid}</td>
//       <td>{part.subsparePartspartname}</td>
//       <td>1</td>
//       <td>{part.partsprice}</td>
//       <td>{item.paymentMode}</td>
//     </tr>
//   ))
// )}