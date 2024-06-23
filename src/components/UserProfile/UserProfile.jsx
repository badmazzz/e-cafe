import React, { useContext, useState, useEffect } from "react";
import "./UserProfile.css";
import { StoreContext } from "../../context/StoreContext";

export default function UserProfile() {
  const { user, updateProfile, updateAvatar } = useContext(StoreContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleSubmit = () => {
    const data = {
      email,
      street,
      city,
      zipcode,
      phone,
    };
    updateProfile(data);
  };

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setStreet(user.address[0].street);
      setCity(user.address[0].city);
      setZipcode(user.address[0].zipcode);
      setPhone(user.phone);
    }
  }, [user]);

  useEffect(() => {
    updateAvatar(avatar);
  }, [avatar]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  return (
    <div className="container-xl px-4 mt-4">
      <hr className="mt-0 mb-4" />
      <div className="profile-container">
        <div className="profile-picture">
          <div className="card mb-4 mb-xl-0">
            <div className="card-header">Profile Picture</div>
            <div className="card-body text-center">
              <img
                className="img-account-profile rounded-circle mb-2"
                src={user.avatar}
                alt=""
              />
              <div className="small font-italic text-muted mb-4">
                JPG or PNG no larger than 5 MB
              </div>
              <label htmlFor="avatarUpload" className="btn">
                Upload new image
              </label>
              <input
                type="file"
                id="avatarUpload"
                accept=".jpg,.png,.jpeg"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>
        <div className="account-details">
          <div className="card mb-4">
            <div className="card-header">Account Details</div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputUsername">
                    Username
                  </label>
                  <input
                    className="form-control"
                    id="inputUsername"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={true}
                  />
                </div>
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputEmailAddress">
                    Email address
                  </label>
                  <input
                    className="form-control"
                    id="inputEmailAddress"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="row row-flex gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputStreet">
                      Street
                    </label>
                    <input
                      className="form-control"
                      id="inputStreet"
                      type="text"
                      placeholder="Enter your street"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputCity">
                      City
                    </label>
                    <input
                      className="form-control"
                      id="inputCity"
                      type="text"
                      placeholder="Enter your city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputZipcode">
                      Pin code
                    </label>
                    <input
                      className="form-control"
                      id="inputZipcode"
                      type="text"
                      placeholder="Enter your pin code"
                      value={zipcode}
                      onChange={(e) => setZipcode(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row row-flex gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputPhone">
                      Phone number
                    </label>
                    <input
                      className="form-control"
                      id="inputPhone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputPassword">
                      Password
                    </label>
                    <input
                      className="form-control"
                      id="inputPassword"
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      defaultValue="06/10/1988"
                    />
                  </div>
                </div>
                <button className="btn" type="button" onClick={handleSubmit}>
                  Save changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
