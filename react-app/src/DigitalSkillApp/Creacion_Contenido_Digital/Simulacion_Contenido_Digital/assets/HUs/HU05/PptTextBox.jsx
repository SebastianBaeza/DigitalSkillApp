import { useState } from 'react';

export default function PptTextBox ({ initialText, onUpdate }) {
	const [text, setText] = useState(initialText);

	const handleChange = (e) => {
    setText(e.target.value);
    onUpdate(e.target.value);
  };

  return (
    <textarea className="ppt-text-box" value={text} onChange={handleChange} placeholder="Escribe algo..."/>
  );
}