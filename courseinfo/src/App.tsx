// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseDescriptionPart extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CourseDescriptionPart {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDescriptionPart {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface SpecialCoursePart extends CourseDescriptionPart {
  type: "special";
  requirements: string[];
}

type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | SpecialCoursePart;

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is the easy course part",
    type: "normal",
  },
  {
    name: "Advanced",
    exerciseCount: 7,
    description: "This is the hard course part",
    type: "normal",
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    type: "groupProject",
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    type: "submission",
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    type: "special",
  },
];

const Part = ({ course }: { course: CoursePart }) => {
  let element;
  switch (course.type) {
    case "normal":
      element = (
        <div>
          <h3>
            {course.name} {course.exerciseCount}
          </h3>
          <i>{course.description}</i>
        </div>
      );
      break;
    case "submission":
      element = (
        <div>
          <h3>
            {course.name} {course.exerciseCount}
          </h3>
          <i>{course.description}</i>
          <div>Submit to {course.exerciseSubmissionLink}</div>
        </div>
      );
      break;
    case "groupProject":
      element = (
        <div>
          <h3>
            {course.name} {course.exerciseCount}
          </h3>
          project exercises {course.groupProjectCount}
        </div>
      );
      break;
    case "special":
      element = (
        <div>
          <h3>
            {course.name} {course.exerciseCount}
          </h3>
          <i>{course.description}</i>
          <div>
            required skills: {course.requirements.map((skill) => skill + " ")}
          </div>
        </div>
      );
      break;
    default:
      break;
  }

  return <>{element}</>;
};

const Header = ({ name }: { name: string }) => {
  return <h1>{name}</h1>;
};

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((course) => (
        <Part key={Math.floor(Math.random() * 10000)} course={course} />
      ))}
    </div>
  );
};

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

const App = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
