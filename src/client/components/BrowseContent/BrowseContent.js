import React, { useState } from "react";

import styles from "./index.module.css";

export default function BrowseContent({ childContent }) {
    const [isVisible, setIsVisible] = useState(false);
    const expand = () => {
        setIsVisible(!isVisible);
    };

    return (
        <>
            <span onClick={expand} className={styles.name}>
                {childContent.name}
            </span>

            {isVisible &&
                childContent?.children?.map((child) => {
                    return (
                        <div key={child.key} className={styles.content}>
                            <BrowseContent childContent={child} />
                        </div>
                    );
                })}
        </>
    );
}
