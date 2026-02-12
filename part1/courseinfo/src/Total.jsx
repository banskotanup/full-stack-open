const Total = (props) => {
  console.log("Total Exercise: ", props);
  const total = props.course.parts.reduce((sum, p) => sum + p.exercises, 0);

  return <p>Number of exercises { total }</p>
};

export default Total;
