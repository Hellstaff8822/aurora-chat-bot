import { useEffect } from "react";
import openai from "../lib/openaiClient";

function DebugTest() {
  useEffect(() => {
    const run = async () => {
      const res = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "Привіт!" }],
      });

      console.log("🤖 Aurora:", res.choices[0].message.content);
    };

    run();
  }, []);

  return <div className="text-white">Відкрий консоль 😉</div>;
}

export default DebugTest;