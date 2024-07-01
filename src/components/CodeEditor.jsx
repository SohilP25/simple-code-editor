import React, { useState, useRef, useEffect } from 'react';
import { Highlight, themes } from 'prism-react-renderer';

const themeNames = Object.keys(themes);
const languages = ['javascript', 'python', 'css', 'html', 'typescript', 'jsx', 'tsx'];

const CodeEditor = () => {
  const [code, setCode] = useState('function add(a, b) {\n  return a + b;\n} \n // **Choose a language for better syntax highlighting.**');
  const [themeName, setThemeName] = useState('nightOwl');
  const [language, setLanguage] = useState('javascript');
  const [cursorPosition, setCursorPosition] = useState({ start: 0, end: 0 });
  const textareaRef = useRef(null);
  const highlightRef = useRef(null);

  const handleChange = (event) => {
    setCode(event.target.value);
    setCursorPosition({
      start: event.target.selectionStart,
      end: event.target.selectionEnd,
    });
  };

  const handleThemeChange = (event) => {
    setThemeName(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleScroll = () => {
    if (highlightRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.setSelectionRange(cursorPosition.start, cursorPosition.end);
    }
  }, [code, cursorPosition]);

  return (
    <div className="w-full max-w-5xl mx-auto h-screen flex flex-col justify-center content-center px-5">
    <span className=' text-center text-white text-3xl'>Code Editor</span>
      <div className="mb-4 flex justify-between">
        <select
          value={language}
          onChange={handleLanguageChange}
          className="bg-white border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        <select
          value={themeName}
          onChange={handleThemeChange}
          className="bg-white border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {themeNames.map((theme) => (
            <option key={theme} value={theme}>
              {theme}
            </option>
          ))}
        </select>
      </div>
      <div className="relative w-full h-80 font-mono text-sm border border-gray-300 rounded-md overflow-hidden">
        <Highlight theme={themes[themeName]} code={code} language={language}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              ref={highlightRef}
              className={`${className} absolute top-0 left-0 w-full h-full m-0 p-4 overflow-auto`}
              style={style}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
        <textarea
          ref={textareaRef}
          value={code}
          onChange={handleChange}
          onScroll={handleScroll}
          spellCheck="false"
          className="absolute top-0 left-0 w-full h-full resize-none text-transparent bg-transparent caret-white border-none outline-none p-4 font-inherit"
        />
      </div>
    </div>
  );
};

export default CodeEditor;