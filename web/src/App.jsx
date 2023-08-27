import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
const api_url = "http://localhost:5005";

function App() {
  const [allPhones, setAllPhones] = useState([]);
  const [onePhone, setOnePhone] = useState();

  useEffect(() => {
    const getPhones = async () => {
      try {
        const { data } = await axios.get(`${api_url}/phones`);
        if (data) {
          setAllPhones(data);
          console.log("phones: ", data);
        } else {
          ("no success");
        }
      } catch (error) {
        console.log("Error fetching all phones: ", error);
      }
    };
    getPhones();
  }, []);

  // using axios due to API. A simpler method would be to setState of onePhone directly with the already available phone data
  const handlePhoneSelection = async (phoneId) => {
    try {
      const { data } = await axios.get(`${api_url}/phones/${phoneId}`);
      if (data) {
        setOnePhone(data);
        console.log("phone: ", data);
      } else {
        ("no success");
      }
    } catch (error) {
      console.log("Error fetching all phones: ", error);
    }
  };

  return (
    <div className="container">
      <h1>Discover our Phones</h1>
      <div className="content">
        <div className="phones-list">
          {allPhones ? (
            allPhones.map((phone) => (
              <div key={phone.id} className="phone-item">
                <h3 onClick={() => handlePhoneSelection(phone.id)}>
                  {phone.name}
                </h3>
              </div>
            ))
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
        {onePhone && (
          <div className="phone-details" key={onePhone.id}>
            <h2>
              {onePhone.name} in {onePhone.color} at ${onePhone.price}
            </h2>
            <img
              src={`../assets/images/${onePhone.imageFileName}`}
              alt="Picture of Phone"
              style={{ height: "150px" }}
            />
            <h3>Manufacturer: {onePhone.manufacturer}</h3>
            <h3>Screen Size: {onePhone.screen}</h3>
            <h3>Processor: {onePhone.processor}</h3>
            <h3>Ram: {onePhone.ram}</h3>
            <p>{onePhone.description}</p>
            <button onClick={() => setOnePhone(null)}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
