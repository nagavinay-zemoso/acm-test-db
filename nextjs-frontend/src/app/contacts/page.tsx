"use client";

import { useEffect, useState } from "react";
import styles from "../page.module.css";

interface ContactPropsType {
  id: number;
  name: string;
  age: number;
}

const Contacts = () => {
  const [contacts, setContacts] = useState<ContactPropsType[]>([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  const handleSubmit = () => {
    if (name.length > 0 && age > 0) {
      fetch("http://localhost:4000/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          age: age,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setContacts([...contacts, data]);
          setName("");
          setAge(0);
        })
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    fetch("http://localhost:4000/contacts")
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.main}>
      <h1>Contacts</h1>

      <div>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          required
        />
        <input
          type="number"
          onChange={(e) => setAge(+e.target.value)}
          placeholder="Enter age"
          required
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      {contacts.length > 0 &&
        contacts.map((contact: ContactPropsType) => {
          return (
            <div key={contact.id}>
              <p>id : {contact.id}</p>
              <p>name : {contact.name}</p>
              <p>age : {contact.age}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Contacts;
