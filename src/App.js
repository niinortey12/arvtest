import React, { useState, useEffect } from "react";

import Autocomplete from "react-google-autocomplete";
let data = {
  args: {},
  data: "",
  files: {},
  form: {
    address_autocomplete: "",
    city: "",
    country: "",
    street: "",
    zip: "",
  },
  headers: {
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9",
    "Cache-Control": "max-age=0",
    "Content-Length": "49",
    "Content-Type": "application/x-www-form-urlencoded",
    Host: "httpbin.org",
    Origin: "https://workwithafterpay.z6.web.core.windows.net",
    Referer: "https://workwithafterpay.z6.web.core.windows.net/",
    "Sec-Ch-Ua":
      '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": '"Windows"',
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "cross-site",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
    "X-Amzn-Trace-Id": "Root=1-6277de85-4e6a5c60543105af6db333c1",
  },
  json: null,
  origin: "72.255.33.90",
  url: "https://httpbin.org/post",
};
function App() {
  const [placeObject, SetPlace] = useState("");
  const [form, SetForm] = useState(false);
  const [EditAddress, SetEditAddress] = useState(false);
  const [fields, SetFields] = useState(false);

  useEffect(() => {
    if (EditAddress === true) {
    }
  }, [EditAddress]);

  const CheckFields = (e) => {
    e.preventDefault();
    if (
      document.getElementById("zip").value &&
      document.getElementById("city").value &&
      document.getElementById("street").value &&
      document.getElementById("country").value
    ) {
      data.form.city = document.getElementById("city").value;
      data.form.zip = document.getElementById("zip").value;
      data.form.street = document.getElementById("street").value;
      data.form.country = document.getElementById("country").value;
      SetForm(!form);
      SetFields(true);
    }
  };

  console.log(placeObject.geometry);

  console.log("object", data);
  return (
    <div className="App">
      <div className="container-fluid">
        {form === false ? (
          <>
            {" "}
            {EditAddress === false ? (
              <Autocomplete
                apiKey={process.env.api}
                onPlaceSelected={(place) => {
                  console.log(place);
                  SetPlace(place);
                }}
              />
            ) : null}
            {EditAddress === true ? (
              <>
                <div className="below">
                  <p>Address</p>
                  <p>
                    Return to{" "}
                    <span
                      onClick={() => {
                        SetEditAddress(false);
                      }}
                    >
                      address search
                    </span>{" "}
                  </p>
                </div>
                <br />
                <form>
                  <div class="form-group">
                    <label for="inputAddress2">Street</label>
                    <input
                      type="text"
                      class="form-control"
                      id="street"
                      placeholder=""
                      required
                    />
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="inputEmail4">Zip Code</label>
                      <input
                        type="text"
                        class="form-control"
                        id="zip"
                        placeholder=""
                        required
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputPassword4">City</label>
                      <input
                        type="text"
                        class="form-control"
                        id="city"
                        placeholder=""
                        required
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="inputAddress2">Country</label>
                    <input
                      type="text"
                      class="form-control"
                      id="country"
                      placeholder=""
                      required
                    />
                  </div>
                  <button type="submit" onClick={CheckFields}>
                    Submit form
                  </button>
                </form>
              </>
            ) : (
              <div className="below">
                <p>Address</p>
                <p>
                  Can’t find your address?{" "}
                  <span
                    onClick={() => {
                      SetEditAddress(true);
                    }}
                  >
                    Edit
                  </span>{" "}
                </p>
              </div>
            )}
            <br />
            {placeObject && placeObject.formatted_address ? (
              <iframe
                title="Afadsfads"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDR3E0Ko3uYrfQaqX9964woDyJ8NoDn4tg
          &q=${placeObject.formatted_address}`}
                width="600"
                height="450"
                zoom
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            ) : null}
            <br />
            {placeObject ? (
              <>
                <h2>Address:</h2>
                <p>{placeObject.formatted_address}</p>
              </>
            ) : null}
            <br />
            <br />
            {EditAddress === false ? (
              <button
                onClick={() => {
                  SetForm(!form);
                }}
              >
                Submit form
              </button>
            ) : null}
          </>
        ) : null}

        {form ? <h1>Form Has Been Submitted</h1> : null}
        <pre>
          {form && placeObject && placeObject.formatted_address
            ? JSON.stringify(data, undefined, 2)
            : null}
        </pre>

        <pre>
          {EditAddress === true && form && fields === true
            ? JSON.stringify(data, undefined, 2)
            : null}
        </pre>
      </div>
    </div>
  );
}

export default App;
