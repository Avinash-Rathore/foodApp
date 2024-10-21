import React, { useEffect, useState } from 'react';
import OrderTable from './OrderTable';

const FoodOrderReport = () => {
  const [report, setReport] = useState([]);
  const [totalFine, setTotalFine] = useState(0);
  const month = 11; // Set your desired month here

  const fetchFoodOrders = async (month) => {
    const token =  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZWRhNWExODU0OTFhYWE0MmY5YzMyZjRhMTU5MDM1ODk4ZjZiMzMxNWUzZjJjNGRiZDA1N2IyNGE3NTAzMDc3NDBlMjFlYjZmNGE4Mjk0MGUiLCJpYXQiOjE3MDQ4MDA4OTAuODc5OTI1OTY2MjYyODE3MzgyODEyNSwibmJmIjoxNzA0ODAwODkwLjg3OTkyOTA2NTcwNDM0NTcwMzEyNSwiZXhwIjoxNzM2NDIzMjkwLjgzNDkxMjA2MTY5MTI4NDE3OTY4NzUsInN1YiI6IjI2NSIsInNjb3BlcyI6W119.CwDEjlHoRtOXdFcaO6KGGxV202AOA7MMtJVPtKzgLqzTFzUUnDLGBd7PNAtHO2--3YOathM9HOG8hYjY8wjktXZIoCGUR9GWIaEVUxLwFq927CrSf05NuqTBTrJcDeBOjXDvKcSBiJ2A994FC2IunPcdkaZ4jpoaWBIaWueYUbHviYSQuLec3tFcAMg4njrImAlaN9k-QKkHetpdrdbUEX1Wzq4X-1QwuOx7W3W2nbbxaoNgFX1gaabxi00ZO7h5MokGvtqy_gCkS9TYoM74VfxmTyAAczjttLcPqDNiAL_ZJdutDMezw32CZj8G8l8PUL46F_BuaxatZDBUZxeClZh4_0Wvo9GX4zqF2XvHdzZHnwdB414vNCl8itaGW9w7QWbdchPOglhnek32ZmkH0MIqeOBhnAyHo5_WbP0uLd_3qmz3w04nvTbTGV25-QebaxPAsVD0-7Za1sVpqB_FD6yEeliaEzdxl_8gA5IH59uowpfPYgUIjom8NVEASuYsAwb0q3f0jhNRfwg2zmXNenoDunh_dN9l2NRjI2gdZueSMwu6IJLQK46jpn01uG2iQ1xx-pFJAGe_bzSceLsho3dbtabym3tMqi0Ac02xUP9Mn50LdkFJGNVU9jiuHQfyjQirDtGUfya3aIvpJlCGx9Cx99s_4P89uDnOiXy3A1Q";

    try {
      const response = await fetch(
        "http://canteen.benzyinfotech.com/api/v3/customer/report",
        {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
            Cookie:
            "XSRF-TOKEN=eyJpdiI6InVqMzlHS1Z2YWRwSkRrd3Fwc3BMQUE9PSIsInZhbHVlIjoiNE5FU0IrMWhPMERsb213QVFoQ3BYc3VMUTNBMCswR2ErWDFkVUVmV2NXV2RQU2VwR1Fkb3lLNWx3ZVpGbnExcXZSd29zVTVLZ1BRQWF0ME1sNjkrc3dpaGVrSEl2QnFocTBEM0FaUThuc2ZLbnBOaFI3WXFNeTNDZFFTMnV3SU8iLCJtYWMiOiI1YmQ5OTM5Yjg4NGE2ZWY2YjgwNGRkYzRkOGNkMDQ5Mjc1MmRmMjcxMWJjNzkyOTBlY2MxZjliNDUyMGJlMTRhIiwidGFnIjoiIn0%3D; canteen_session=eyJpdiI6Imx5TXhDemlJMVE5UE05MFEvWjV6elE9PSIsInZhbHVlIjoiVmYva2Y2QVZGZkVSN3ZQL0lHaHR1RkVRaGlzeWs3TVVnbk01WFpsejB1SUxubXB1TE9GOFgvNEZVSjltQlF5UjY4UVloRDczWHNHOStHbE9LeUgxeWVnWXpQbDhrUUVTczdmMXNWOG5YR2VGZ0pLZWNuYXJYemdoaUpVRDZ5T0ciLCJtYWMiOiJhM2YyMmEwOTZmYjA3NjMwYWQ2NTVkNDM0MTAyZjJhZWVkZDczZjJjMTVkNjFmOWUyNjU5MDdkMDY4OGNlNDM1IiwidGFnIjoiIn0%3D",
          },
          body: JSON.stringify({ month }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching food orders:", error);
      alert("Failed to fetch data. Please try again later.");
    }
  };

  const calculateFine = (orders) => {
    let totalFine = 0;
    const finePerWastage = 100;

    const report = orders?.map((order) => {
      let dailyFine = 0;
      const status = {};

      ["breakfast", "lunch", "dinner"].forEach((meal) => {
        if (order.opt_ins[meal] === "Pending") {
          dailyFine += finePerWastage;
          status[meal] = "Wasted";
        } else if (order.opt_ins[meal] === "Delivered") {
          status[meal] = "Consumed";
        } else {
          status[meal] = "Canceled";
        }
      });

      totalFine += dailyFine;

      return {
        date: order.date,
        status,
        dailyFine,
      };
    });

    return { report, totalFine };
  };

  const displayFoodOrders = async (month) => {
    const data = await fetchFoodOrders(month);
    if (!data) return;

    const { report, totalFine } = calculateFine(data.reports);
    setReport(report);
    setTotalFine(totalFine);
  };

  useEffect(() => {
    displayFoodOrders(month);
  }, [month]);

  return (
    <div>
      <h1>Employee Food Order Report</h1>
      <OrderTable report={report} />
      <h3>Total Fine for the Month: Rs {totalFine}</h3>
    </div>
  );
};

export default FoodOrderReport;
