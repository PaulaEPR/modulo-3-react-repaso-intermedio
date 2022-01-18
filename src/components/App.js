import { useEffect, useState } from 'react';
import contactList from '../data/contact.json';
import initialState from '../data/initialState.json';
import ls from '../services/localStorage';
import '../styles/App.scss';

function App() {
  const [data, setData] = useState(ls.get('userData', contactList));
  const [search, setSearch] = useState('');
  const [newContact, setNewContact] = useState(initialState);

  /* --- Local Storage --- */
  useEffect(() => {
    ls.set('userData', data);
  }, [data]);

  /* --- Handlers --- */
  const handleChangeSearch = (event) => {
    setSearch(event.currentTarget.value);
  };

  const handleChangeNewContact = (event) => {
    setNewContact({
      ...newContact,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  };

  const handleSubmitNewContact = (event) => {
    event.preventDefault();
    setData([...data, newContact]);
    setNewContact(initialState);
  };

  /* --- Add HTML for Contact List --- */
  const htmlContactList = data
    .filter(
      (contact) =>
        contact.name.toLowerCase().includes(search.toLowerCase()) ||
        contact.lastname.toLowerCase().includes(search.toLowerCase())
    )
    .map((contact, index) => (
      <li className="contact__item" key={index}>
        <p className="contact__name">
          <label className="contact__label">Nombre:</label>
          {contact.name} {contact.lastname}
        </p>
        <p className="contact__phone">
          <label className="contact__label">Teléfono:</label>
          <a
            href={`tel:${contact.phone}`}
            title={`Pulsa aquí para llamar a ${contact.name}`}
            target="_blank"
            rel="noreferrer"
          >
            {contact.phone}
          </a>
        </p>
        <p className="contact__mail">
          <label className="contact__label">Email:</label>
          <a
            href={`mailto:${contact.email}`}
            title={`Pulsa aquí para escribir a ${contact.name}`}
            target="_blank"
            rel="noreferrer"
          >
            {contact.email}
          </a>
        </p>
      </li>
    ));

  /* --- Add HTML for New Contact --- */
  const newContactInput = [
    { id: 'name', ph: 'Nombre', t: "text", v: newContact.name },
    { id: 'lastname', ph: 'Apellidos', t: "text", v: newContact.lastname },
    { id: 'phone', ph: 'Teléfono', t: "phone", v: newContact.phone },
    { id: 'email', ph: 'Email', t: "email", v: newContact.email },
  ];
  const htmlNewContactInput = newContactInput.map((property, index) => (
    <input
      key={index}
      className="new-contact__input"
      type={property.t}
      name={property.id}
      id={property.id}
      placeholder={property.ph}
      onChange={handleChangeNewContact}
      value={property.v}
    />
  ));

  /* --- Return --- */
  return (
    <div className="page">
      {/* header */}
      <header className="header">
        <h1 className="header__title">Mi agenda de contactos</h1>
        <form>
          <input
            className="header__search"
            autoComplete="off"
            spellCheck="false"
            type="search"
            name="search"
            placeholder="Filtrar contactos por nombre"
            onChange={handleChangeSearch}
            value={search}
          />
        </form>
      </header>

      <main>
        {/* contact list */}
        <ul className="contact__list">{htmlContactList}</ul>

        {/* new contact */}
        <form className="new-contact__form">
          <h2 className="new-contact__title">Añade un nuevo contacto</h2>
          {htmlNewContactInput}
          <input
            className="new-contact__btn"
            type="submit"
            value="Añadir"
            onClick={handleSubmitNewContact}
          />
        </form>
      </main>
    </div>
  );
}

export default App;
