const Persons = ({ personsToShow, handleDelete }) => {
    return (
        personsToShow.map((p) => {
          return (
            <div key={p.id}>
              <div>{p.name} {p.number}</div>
              <button onClick={() => handleDelete(p.id, p.name)}>delete</button>
            </div>
          );
      })
    );
};

export default Persons;
