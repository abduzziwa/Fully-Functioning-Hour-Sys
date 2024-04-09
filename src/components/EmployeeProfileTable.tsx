import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./component styles/profile.css";

interface EmployeeProfileTableProps {
  userId: string | number | null | undefined; // Prop for user ID
}

interface MedewerkerData {
  Voornaam: string;
  Achternaam: string;
  MedewerkerId: number;
  AantalGewerktUren: number;
  Projectnaam: string;
  Datum: string;
}

interface MyError {
  message: string;
}

const EmployeeProfileTable: React.FC<EmployeeProfileTableProps> = ({
  userId,
}) => {
  const [data, setData] = useState<MedewerkerData[]>([]);
  const [error, setError] = useState<MyError | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [, setIsDataLoaded] = useState(false);

  useEffect(() => {
    axios
      .get<MedewerkerData[]>(
        `http://localhost/Projects/backendcode/medewerkerProjectHours.php?id=${userId}`
      )
      .then((res) => {
        setData(res.data);
        setIsDataLoaded(true);
      })
      .catch((err) => {
        setError(
          err instanceof axios.AxiosError ? err : { message: err.message }
        );
      });
  }, [userId]);

  const filteredData = data.filter((item) =>
    item.Projectnaam.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="EmpTable">
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
          <table className="table table-striped table-hover custom-table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Employee ID</th>
                <th scope="col">Voornaam</th>
                <th scope="col">Achternaam</th>
                <th scope="col">GewerktUren</th>
                <th scope="col">Projectnaam</th>
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
                  <td>{item.Datum}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default EmployeeProfileTable;
