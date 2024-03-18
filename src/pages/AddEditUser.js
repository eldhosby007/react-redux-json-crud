import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  MDBValidation,
  MDBBtn,
  MDBInput,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import { createUserStart, updateUserStart } from "../redux/actions";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  phonenum: "",
  address: "",
};

const AddEditUser = () => {
  const [formValue, SetformValue] = useState(initialState);
  const { name, email, phonenum, address } = formValue;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { users } = useSelector((state) => state.data);
  const [editMode, seteditMode] = useState(false);

  useEffect(() => {
    if (id) {
      seteditMode(true);
      const singleUser = users.find((item) => item.id === id);
      SetformValue({ ...singleUser });
    } else {
      seteditMode(false);
      SetformValue({ ...initialState });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && phonenum && address) {
      if (!editMode) {
        dispatch(createUserStart(formValue));
        toast.success("User added successfully!");
        setTimeout(() => navigate("/"), 500);
      } else {
        dispatch(updateUserStart({ id, formValue }));
        seteditMode(false);
        toast.success("User updated successfully!");
        setTimeout(() => navigate("/"), 500);
      }
    }
  };

  const onInputchange = (e) => {
    let { name, value } = e.target;
    SetformValue({ ...formValue, [name]: value });
  };

  return (
    <MDBValidation
      className="row g-3"
      style={{ marginTop: "100px" }}
      noValidate
      onSubmit={handleSubmit}
    >
      <p className="fs-2 fw-bold">
        {!editMode ? "Add user details" : "Update user details"}
      </p>
      <div
        style={{
          margin: "auto",
          maxWidth: "400px",
          alignContent: "center",
          padding: "15px",
        }}
      >
        <MDBValidationItem feedback="Please enter your name" invalid>
          <MDBInput
            value={name || ""}
            type="text"
            name="name"
            onChange={onInputchange}
            required
            label="Name"
          />
        </MDBValidationItem>
        <br />
        <MDBValidationItem feedback="Please enter your email" invalid>
          <MDBInput
            value={email || ""}
            type="email"
            name="email"
            onChange={onInputchange}
            required
            label="Email"
          />
        </MDBValidationItem>
        <br />
        <MDBValidationItem feedback="Please enter your Phone Number" invalid>
          <MDBInput
            value={phonenum || ""}
            type="number"
            name="phonenum"
            onChange={onInputchange}
            required
            label="Phone Number"
          />
        </MDBValidationItem>
        <br />
        <MDBValidationItem feedback="Please enter your Address" invalid>
          <MDBInput
            value={address || ""}
            type="text"
            name="address"
            onChange={onInputchange}
            required
            label="Address"
          />
        </MDBValidationItem>
        <br />
        <div className="col-12">
          <MDBBtn style={{ marginRight: "15px" }} type="submit">
            {!editMode ? "Add" : "Update"}
          </MDBBtn>
          <MDBBtn onClick={() => navigate("/")} color="danger">
            Go back
          </MDBBtn>
        </div>
      </div>
    </MDBValidation>
  );
};

export default AddEditUser;
