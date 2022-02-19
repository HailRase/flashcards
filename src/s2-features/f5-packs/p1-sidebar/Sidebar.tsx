import {FC, MouseEvent, useState} from "react";

import s from "./sidebar.module.css"

const Sidebar: FC = () => {
    const [showCards, setShowCards] = useState<"all" | "my">("all");

    const onSelect = (select: string) => {
        if (showCards === "all" && select === "my") {
            setShowCards("my");
        }

        if (showCards === "my" && select === "all") {
            setShowCards("all");
        }
    }

    return <aside className={s.sidebar}>
        <div className={s.title}>Show Packs</div>
        <div className={s.select_container}>
            <div className={`${s.select} ${showCards === "my" && s.selected}`} onClick={() => onSelect("my")}>My</div>
            <div className={`${s.select} ${showCards === "all" && s.selected}`} onClick={() => onSelect("all")}>All
            </div>
        </div>
        <div className={s.title}>Number of cards</div>
    </aside>
}

export default Sidebar;