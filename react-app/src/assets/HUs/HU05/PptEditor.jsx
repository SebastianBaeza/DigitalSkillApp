import PptSlide from './PptSlide';

export function PptEditor ({ slide, actualContent, setCurrentContent }) {
  return (
    <div className="ppt-editor">
      <PptSlide slide={slide} actualContent={actualContent} setCurrentContent={setCurrentContent}/>
      <div>{slide.id}</div>
    </div>
  );
};

export default PptEditor;