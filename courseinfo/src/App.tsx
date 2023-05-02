import assertNever from "./utils";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface coursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends coursePartDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends coursePartDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends coursePartDescription {
  requirements: string[];
  kind: "special";
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

const Header = ({ name }: { name: string }) => {
  return <h1>{name}</h1>;
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          {part.description}
        </p>
      );
    case "group":
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          project exercises {part.groupProjectCount}
        </p>
      );
    case "background":
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          {part.description}
          <br />
          submit to {part.backgroundMaterial}
        </p>
      );

    case "special":
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          {part.description}
          <br />
          required skills: {part.requirements.map((r) => r + ",")}
        </p>
      );
    default:
      return assertNever(part);
  }
};

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </>
  );
};

const Total = ({ count }: { count: number }) => {
  return <p>Number of exercises {count}</p>;
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total
        count={courseParts.reduce(
          (carry, part) => carry + part.exerciseCount,
          0
        )}
      />
    </div>
  );
};

export default App;
