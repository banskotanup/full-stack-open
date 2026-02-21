const Persons = ({ personsToShow }) => {
    return (
        personsToShow.map((p) => {
        return <div key={p.id}>{p.name} { p.number }</div>
      })
    );
};

export default Persons;
