const Content = (props) => {
  console.log("Course Content: ", props);
  return (
    <>
      <p>
        {props.part} {props.exercise}
      </p>
    </>
  );
};

export default Content;
