//  THIS IS FOR TO MAKE DATA IN CSV FORMAT.
// const downloadData = () => {
//   // Determine which data to use based on search
//   const dataToDownload = searchQuery ? filteredData : data;

//   // Add headers to CSV data
//   const headers =
//     "Employee ID,First Name,Last Name,Worked Hours,Project Name,Datum";
//   const csvData = [headers];

//   // Convert each data item to CSV format
//   dataToDownload.forEach((item) => {
//     const rowData = `${item.MedewerkerId},${item.Voornaam},${item.Achternaam},${item.AantalGewerktUren},${item.Projectnaam},${item.Datum}`;
//     csvData.push(rowData);
//   });

//   // Convert CSV array to string
//   const csvString = csvData.join("\n");

//   // Create blob and trigger download
//   const blob = new Blob([csvString], { type: "text/csv" });
//   saveAs(blob, "worked_hours.csv");
// };
