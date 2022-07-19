import React, { useState } from "react";

import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import styles from "./AddUser.module.css";

/**
 *
 * @param {*} props
 * @returns
 */
function AddUser(props) {
  const [enteredUserName, setEnteredUserName] = useState("");
  const [enteredUserAge, setEnteredUserAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();

    // validation check
    // empty check
    if (
      enteredUserName.trim().length === 0 ||
      enteredUserAge.trim().length === 0
    ) {
      console.log("wth");
      setError({
        title: "Invalid username or age",
        message: "Please enter valid username and age. (non-empty string)",
      });
      return;
    }

    // negative age check
    if (parseInt(enteredUserAge.trim()) < 0) {
      console.log("wth again");
      setError({
        title: "Invalid age",
        message: "Please enter age greater than zero",
      });

      return;
    }

    // saving input
    props.onAddUser(enteredUserName, enteredUserAge);

    // emptying input fields after insertion
    setEnteredUserName("");
    setEnteredUserAge("");
  };

  const onUserNameChangeHandler = (event) => {
    setEnteredUserName(event.target.value);
  };
  const onUserAgeChangeHandler = (event) => {
    setEnteredUserAge(event.target.value);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        ></ErrorModal>
      )}

      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="user_name">Name</label>
          <input
            type="text"
            id="user_name"
            value={enteredUserName}
            onChange={onUserNameChangeHandler}
          ></input>
          <label htmlFor="user_age">Age (in years)</label>
          <input
            type="number"
            id="user_age"
            value={enteredUserAge}
            onChange={onUserAgeChangeHandler}
          ></input>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
}

export default AddUser;
