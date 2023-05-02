import { SyntheticEvent, useEffect, useState } from "react";
import { createNewEntry, getAllEntries } from "./services/diaryService";
import { Diary } from "./types";
import axios from "axios";

const Content = ({ diaries }: { diaries: Diary[] }) => {
  return (
    <>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <p>
            <strong>{diary.date}</strong>
          </p>
          <div>visibility: {diary.visibility}</div>
          <div>weather: {diary.weather}</div>
        </div>
      ))}
    </>
  );
};

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getAllEntries().then((data) => setDiaries(data));
  }, []);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const newEntry = {
      date,
      weather,
      visibility,
      comment,
    };

    createNewEntry(newEntry)
      .then((data) => setDiaries(diaries.concat(data)))
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data);
          setTimeout(() => {
            setError("");
          }, 3000);
        }
      });

    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  return (
    <>
      <h2>Add new Entry</h2>
      <p style={{ color: "red" }}>{error}</p>
      <form onSubmit={handleSubmit}>
        <div>
          date:{" "}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          visibility: great{" "}
          <input
            type="radio"
            name="visibility"
            value="great"
            onChange={(e) => setVisibility(e.target.value)}
          />
          good{" "}
          <input
            type="radio"
            name="visibility"
            value="good"
            onChange={(e) => setVisibility(e.target.value)}
          />
          ok{" "}
          <input
            type="radio"
            name="visibility"
            value="ok"
            onChange={(e) => setVisibility(e.target.value)}
          />
          poor{" "}
          <input
            type="radio"
            name="visibility"
            value="poor"
            onChange={(e) => setVisibility(e.target.value)}
          />
        </div>

        <div>
          weather: sunny
          <input
            type="radio"
            value="sunny"
            name="weather"
            onChange={(e) => setWeather(e.target.value)}
          />
          rainy
          <input
            type="radio"
            value="rainy"
            name="weather"
            onChange={(e) => setWeather(e.target.value)}
          />
          cloudy
          <input
            type="radio"
            value="cloudy"
            name="weather"
            onChange={(e) => setWeather(e.target.value)}
          />
          stormy
          <input
            type="radio"
            value="stormy"
            name="weather"
            onChange={(e) => setWeather(e.target.value)}
          />
          windy
          <input
            type="radio"
            value="windy"
            name="weather"
            onChange={(e) => setWeather(e.target.value)}
          />
        </div>

        <div>
          comment:{" "}
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Diary Entries</h2>
      <Content diaries={diaries} />
    </>
  );
};

export default App;
