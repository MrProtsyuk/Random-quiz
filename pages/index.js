import { encodeGetParams } from "../utils/queryString";
import { useRouter } from "next/router";
import { useState } from "react";

function Home() {
  const [amount, setAmount] = useState(10);

  const router = useRouter();
  const submitForm = (e) => {
    e.preventDefault();
    console.log(e.target);
    const formData = new FormData(e.target);
    let values = {};
    for (let pair of formData.entries()) {
      if (pair[1] !== "any") values[pair[0]] = pair[1];
    }
    router.push({
      pathname: "/quiz",
      query: values,
    });

    console.log(encodeGetParams(values));
  };
  return (
    <form onSubmit={(e) => submitForm(e)}>
      <h2 className="form-signin-heading">API Helper</h2>

      <label htmlFor="amount">Number of Questions:</label>
      <input
        type="number"
        name="amount"
        id="amount"
        className="form-control"
        min="1"
        max="50"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <br />

      <label htmlFor="category">Select Category: </label>
      <select name="category" className="form-control">
        <option value="any">Any Category</option>
        <option value="9">General Knowledge</option>
        <option value="10">Entertainment: Books</option>
        <option value="11">Entertainment: Film</option>
        <option value="12">Entertainment: Music</option>
        <option value="13">Entertainment: Musicals &amp; Theatres</option>
        <option value="14">Entertainment: Television</option>
        <option value="15">Entertainment: Video Games</option>
        <option value="16">Entertainment: Board Games</option>
        <option value="17">Science &amp; Nature</option>
        <option value="18">Science: Computers</option>
        <option value="19">Science: Mathematics</option>
        <option value="20">Mythology</option>
        <option value="21">Sports</option>
        <option value="22">Geography</option>
        <option value="23">History</option>
        <option value="24">Politics</option>
        <option value="25">Art</option>
        <option value="26">Celebrities</option>
        <option value="27">Animals</option>
        <option value="28">Vehicles</option>
        <option value="29">Entertainment: Comics</option>
        <option value="30">Science: Gadgets</option>
        <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
        <option value="32">Entertainment: Cartoon &amp; Animations</option>{" "}
      </select>

      <br />

      <label htmlFor="difficulty">Select Difficulty: </label>
      <select name="difficulty" className="form-control">
        <option value="any">Any Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <br />

      <label htmlFor="type">Select Type: </label>
      <select name="type" className="form-control">
        &gt;
        <option value="any">Any Type</option>
        <option value="multiple">Multiple Choice</option>
        <option value="boolean">True / False</option>
      </select>

      <br />

      <button className="btn btn-lg btn-primary btn-block" type="submit">
        Generate API URL
      </button>
    </form>
  );
}

export default Home;
