import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

interface UserData {
  ID: number;
  Bedrijfsnaam: string;
  Voornaam: string;
  Tussevoegsel: string;
  Achternaam: string;
  Email: string;
  Telefoonnummer: string;
  Adress: string;
}

interface MyError {
  message: string;
}

const CustomersTable = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [error, setError] = useState<MyError | null>(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    axios
      .get<UserData[]>("http://localhost/Projects/Backend/Customers.php")
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
      item.Voornaam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.Bedrijfsnaam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.Achternaam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.Telefoonnummer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredData.length === 0) {
    console.log("No record");
  } else {
    // Display filteredData
  }

  return (
    <div className="table1">
      {error ? (
        <p>Error fetching data: {error.message}</p>
      ) : (
        <>
          <div>
            <input
              type="text"
              className="form-control w-50 mb-3"
              placeholder="Zoek..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div>
              {filteredData.length === 0 && (
                <p className="text-danger">Geen record gevonden.</p>
              )}
            </div>
          </div>
          <table className="table table-striped table-hover custom-table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Klant ID</th>
                <th scope="col">Bedrijf</th>
                <th scope="col">Naam</th>
                <th scope="col">Email</th>
                <th scope="col">Telefoonnummer</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.ID} className="table-row">
                  <td>{item.ID}</td>
                  <td>{item.Bedrijfsnaam}</td>
                  <td>
                    {item.Voornaam} {item.Tussevoegsel} {item.Achternaam}
                  </td>
                  <td>{item.Email}</td>
                  <td>{item.Telefoonnummer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default CustomersTable;
