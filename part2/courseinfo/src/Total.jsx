const Total = (props) => {
  console.log("Total Exercise: ", props);
  const total = props.course.reduce((sum, p) => sum + p.exercises, 0);

  return <p><b>Number of exercises { total }</b></p>
};

export default Total;
