import { Title } from "./assets/HUs/HU05/Title";
import { PptToolbar } from "./assets/HUs/HU05/PptToolbar";
import { PptSlide } from "./assets/HUs/HU05/PptSlide";
import './assets/HUs/HU05/styles/HU05.css';

export function HU05 () {
    return (
        <>
            <Title name="Historia 5" />
            <PptToolbar />
            <aside className="ppt-slides-bar">
                <PptSlide />
            </aside>
        </>
    )
}