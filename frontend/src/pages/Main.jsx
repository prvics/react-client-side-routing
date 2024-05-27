import { useEffect, useState } from "react";

export default function Main() {
  const [languages, setLanguages] = useState(null);

  useEffect(() => {
    fetch("/api/v2/languages")
      .then((res) => res.json())
      .then((languageData) => setLanguages(languageData))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>Popular programming languages</h1>
      <table>
        <tbody>
          {languages &&
            languages.map((lang) => {
              return (
                <tr key={lang.langid}>
                  <td>{lang.name}</td>
                  <td>

                    {/* TASK 15: Language details */}

                    <button>Show details</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
