const Content = (props) => {
  console.log("Course Content: ", props);
  return (
    <>
      {props.course.parts.map((p, index) => {
        return (
          <p key={index}>
            {p.name} {p.exercises}
          </p>
        );
      })}
    </>
  );
};

export default Content;
