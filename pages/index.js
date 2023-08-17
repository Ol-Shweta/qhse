import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import yoozhooLogo from '../assets/logo.png';



const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [text, setText] = useState('');
const [isGenerating, setIsGenerating] = useState(false);

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setText(`${output.text}`);
  console.log("Text Speech...", setText);
  
  setIsGenerating(false);
}
  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>AI | oligoqhse</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>AI based OligoQHSE</h1>
          </div>
          <div className="header-title">
            <h2>make your HSE easier</h2>
          </div>
          <div className="header-subtitle">
            <h2>Elevating Operations through Safety and Environmental Leadership</h2>
          </div>
        </div>
        <div className="prompt-container">
        <textarea className="prompt-box" placeholder="start typing here" value={userInput} onChange={onUserChangedText}/>
        </div>
        <div className="prompt-buttons">
  <a
    className={isGenerating ? 'generate-button loading' : 'generate-button'}
    onClick={callGenerateEndpoint}
  >
    <div className="generate">
    {isGenerating ? <span className="loader"></span> : <p>Submit</p>}
    </div>
  </a>

  <div><button className="generate-button1" onClick={() => {  
let msg = {text}.text;
let utterance = new SpeechSynthesisUtterance(msg);
let voicesArray = speechSynthesis.getVoices();
utterance.voice = voicesArray[2];
speechSynthesis.speak(utterance);
 }}>Speaker </button></div>

</div>


  
    {apiOutput && (
  <div className="output">
   {/*  <div className="output-header-container">
      <div className="output-header">
        <h3>Output</h3>
      </div>
    </div> */}
    <div className="prompt-container">
      <p className="prompt-box">{apiOutput}</p>
    </div>
  </div>
)}
      </div>
      
      <div className="badge-container grow">
        <a
          href="https://oligoqhse.com"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
           {/* <Image src={qhse} alt="Oligoqhse logo" /> */} 
            <p>oligoqhse</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;