import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Sidebar";
import "./component styles/profile.css";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

interface MedewerkerData {
  Voornaam: string;
  Achternaam: string;
  MedewerkerId: number;
  AantalGewerktUren: string;
  Projectnaam: string;
  Datum: string;
  KlantNaam: string;
}

interface MyError {
  message: string;
}

const MedewerkersHourTable = () => {
  const [data, setData] = useState<MedewerkerData[]>([]);
  const [error, setError] = useState<MyError | null>(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    axios
      .get<MedewerkerData[]>(
        "http://localhost/Projects/backendcode/medewerkerProjectHours.php"
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError(
          err instanceof axios.AxiosError ? err : { message: err.message }
        );
      });
  }, []);

  const filteredData = data.filter(
    (item) =>
      item.KlantNaam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.Voornaam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.Datum.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.MedewerkerId.toString().includes(searchQuery.toLowerCase()) ||
      item.Achternaam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.Projectnaam.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calculateTotalWorkedHours = (filteredData: MedewerkerData[]) => {
    const totalWorkedHours: { [key: string]: number } = {};
    filteredData.forEach((item) => {
      const hours = parseFloat(item.AantalGewerktUren);
      if (!isNaN(hours)) {
        if (totalWorkedHours[item.Projectnaam]) {
          totalWorkedHours[item.Projectnaam] += hours;
        } else {
          totalWorkedHours[item.Projectnaam] = hours;
        }
      }
    });

    // Round the total worked hours to 2 decimal places
    Object.keys(totalWorkedHours).forEach((key) => {
      totalWorkedHours[key] = parseFloat(totalWorkedHours[key].toFixed(2));
    });

    return totalWorkedHours;
  };

  const downloadDataAsPDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add headers to the PDF with the specified font size
    doc.setFontSize(30);
    doc.text("Gewerkte Uren", 10, 10);

    // Select the table element
    const table = document.querySelector(".table");

    if (table instanceof HTMLElement) {
      // Convert table to canvas using html2canvas
      html2canvas(table).then((canvas) => {
        // Convert canvas to PDF
        const imgData = canvas.toDataURL("image/png");

        // Calculate dimensions and aspect ratio
        const width = 190; // Desired width of the image in PDF
        const scaleFactor = width / canvas.width; // Scale factor
        const height = canvas.height * scaleFactor; // Adjusted height based on aspect ratio

        // Add image of canvas to PDF with adjusted dimensions
        doc.addImage(imgData, "PNG", 10, 20, width, height);

        // Calculate total worked hours for each project
        const totalWorkedHours = calculateTotalWorkedHours(filteredData);

        // Add footer with total worked hours for each project
        let footerPosition = height + 35;
        Object.keys(totalWorkedHours).forEach((projectName) => {
          const totalHours = totalWorkedHours[projectName];
          doc.setFontSize(18);
          doc.setFont("Arial");
          doc.text(
            `Total Uren voor ${projectName} project: ${totalHours} Uren`,
            10,
            footerPosition
          );
          footerPosition += 20; // Increase the position for next footer line
        });

        // Download PDF
        doc.save("worked_hours.pdf");
      });
    } else {
      console.error("Table element not found.");
    }
  };

  return (
    <div className="Dash">
      <div className="d-flex">
        <Sidebar />
        <div className="dash">
          <h2 className="dashh2">Tabel met gewerkte uren</h2>
          {error ? (
            <p>Error fetching data: {error.message}</p>
          ) : (
            <>
              <div>
                <input
                  type="text"
                  className="form-control w-50 mb-3"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div>
                  {filteredData.length === 0 && (
                    <p className="text-danger">No records found.</p>
                  )}
                </div>
              </div>
              {/* <button className="btn btn-primary mb-3" onClick={downloadData}>
                Download Worked Hours
              </button> */}
              <button
                className="btn btn-primary mb-3"
                onClick={downloadDataAsPDF}
              >
                Download Worked Hours as PDF
              </button>
              <table className="table table-striped table-hover custom-table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Medewerker ID</th>
                    <th scope="col">Voornaam</th>
                    <th scope="col">Achternaam</th>
                    <th scope="col">GewerkteUren</th>
                    <th scope="col">Projectnaam</th>
                    <th scope="col">KlantNaam / Bedrijf</th>
                    <th scope="col">Datum</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr key={index} className="table-row">
                      <td>{item.MedewerkerId}</td>
                      <td>{item.Voornaam}</td>
                      <td>{item.Achternaam}</td>
                      <td>{item.AantalGewerktUren}</td>
                      <td>{item.Projectnaam}</td>
                      <td>{item.KlantNaam}</td>
                      <td>{item.Datum}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedewerkersHourTable;
