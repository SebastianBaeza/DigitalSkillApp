export function PptSlide ({ id, slideTitle, setCurrentSlide}) {
    
    return (
        <div key={id} className="ppt-slide" onClick={setCurrentSlide(id)}>
            AAAA
            {slideTitle}
        </div>
    )
}

export default PptSlide;