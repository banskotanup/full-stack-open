import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ courses }) => {
  console.log(courses);
  return (
    <>
      {courses.map((course) => {
        return <div key={course.id}>
          <Header course={course.name} />
          <Content course={course.parts} />
          <Total course={course.parts} />
        </div>
      })}
    </>
  );
};

export default Course;
