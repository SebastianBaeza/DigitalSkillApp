import PptSlide from './PptSlide';

export function PptEditor ({ slide }) {
  return (
    <div className="ppt-editor">
      <PptSlide slide={slide} />
      <div>{slide.id}</div>
    </div>
  );
};

export default PptEditor;