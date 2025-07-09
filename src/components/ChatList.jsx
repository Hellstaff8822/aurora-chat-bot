import { useEffect } from "react";
import gemini from "../lib/geminiClient";

function ChatList() {
  useEffect(() => {
    async function test() {
      const response = await gemini.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Explain how AI works in a few words",
      });
      console.log(response.text);
    }
    test();
  }, []);
  return (
    <ul className='flex-1 overflow-y-auto sidebar-scroll'>
      <li className='px-4 py-3 hover:bg-[#232a3a] cursor-pointer'>
        Example chat 1
      </li>
      <li className='px-4 py-3 hover:bg-[#232a3a] cursor-pointer'>
        Example chat 2
      </li>
    </ul>
  );
}
export default ChatList;
