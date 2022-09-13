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
    <div className="bg-lime-100 min-h-screen flex items-center place-content-center">
      <form
        className="text-center border-solid bg-amber-50 text-black shadow-xl box-content h-500 w-500 rounded-lg"
        onSubmit={(e) => submitForm(e)}
      >
        <h2 className="form-signin-heading p-2 mt-3 text-2xl">
          Random Quiz, quiz!
        </h2>
        <div className="p-2">
          <label htmlFor="amount" className="mr-4">
            Number of Questions:
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            className="form-control text-center pl-3 py-1 border-solid border-black border rounded"
            min="1"
            max="50"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <br />
        <div className="p-2 mx-4">
          <label htmlFor="category" className="mr-4">
            Select Category:{" "}
          </label>
          <select
            name="category"
            className="form-control p-3 text-center border-solid border-black border rounded"
          >
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
            <option value="31">
              Entertainment: Japanese Anime &amp; Manga
            </option>
            <option value="32">Entertainment: Cartoon &amp; Animations</option>{" "}
          </select>
        </div>

        <br />

        <div className="p-2">
          <label htmlFor="difficulty" className="mr-4">
            Select Difficulty:{" "}
          </label>
          <select
            name="difficulty"
            className="form-control ml-0.5 p-3 px-28 text-center border-solid border-black border rounded"
          >
            <option value="any">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <br />

        <div className="p-2">
          <label htmlFor="type" className="mr-4">
            Select Type:{" "}
          </label>
          <select
            name="type"
            className="form-control p-3 ml-5 px-24 text-center border-solid border-black border rounded"
          >
            &gt;
            <option value="any" className="mr-4">
              Any Type
            </option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </select>
        </div>

        <br />

        <button
          className="btn btn-lg btn-primary btn-block p-3 mb-4 bg-white border-solid border-black border rounded hover:bg-stone-50 hover:text-sky-500"
          type="submit"
        >
          Generate Quiz!
        </button>
      </form>
    </div>
  );
}

export default Home;
