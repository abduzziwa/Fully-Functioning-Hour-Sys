import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

interface UserData {
  ID: number;
  Voornaam: string;
  Tussenvoegsel: string;
  Achternaam: string;
  Geboortedatum: string;
  Functie: string;
  Werkmail: string;
  Kantoorruimte: string;
}

interface MyError {
  message: string;
}

const TableUsers = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [error, setError] = useState<MyError | null>(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    axios
      .get<UserData[]>("http://localhost/Projects/Backend/usersgroep3.php")
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
      item.ID.toString().includes(searchQuery.toLowerCase()) ||
      item.Achternaam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.Functie.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.Werkmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.Kantoorruimte.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="table1">
      {error ? (
        <p>Error fetching data: {error.message}</p>
      ) : (
        <>
          <input
            type="text"
            value={searchQuery}
            className="form-control w-50 mb-3"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Zoek op naam, functie, e-mailadres of kantoorruimte."
          />
          <table className="table table-striped table-hover custom-table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Medewerker ID</th>
                <th scope="col">Naam</th>
                <th scope="col">Functie</th>
                <th scope="col">Werkmail</th>
                <th scope="col">Kantoorruimte</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.ID} className="table-row">
                  <td>{item.ID}</td>
                  <td>
                    {item.Voornaam} {item.Tussenvoegsel} {item.Achternaam}
                  </td>
                  <td>{item.Functie}</td>
                  <td>{item.Werkmail}</td>
                  <td>{item.Kantoorruimte}</td>
                  <td>
                    <Link to={`/profile/${item.ID}`} className="btn btn-info">
                      Info
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default TableUsers;
