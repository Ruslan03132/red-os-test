import { Link, useLocation } from "react-router-dom";
import { Button } from "antd";

import getHomeLink from "../../lib/links/getHomeLink";
import getBrowseLink from "../../lib/links/getBrowseLink";

import styles from "./index.module.css";

function NavigationPanel() {
    const location = useLocation();

    if (location.pathname === "/") {
        return (
            <div className={styles.navigationBlock}>
                <div className={styles.browse}>
                    <Link to={getBrowseLink()}>
                        <Button type="primary">Просмотр</Button>
                    </Link>
                </div>
            </div>
        );
    }

    if (location.pathname === "/browse") {
        return (
            <div className={styles.navigationBlock}>
                <div className={styles.main}>
                    <Link to={getHomeLink()}>
                        <Button type="primary">На главную</Button>
                    </Link>
                </div>
            </div>
        );
    }

    if (location.pathname === "/login") {
        return (
            <div className={styles.navigationBlock}>
                <div className={styles.main}>
                    <Link to={getHomeLink()}>
                        <Button type="primary">На главную</Button>
                    </Link>
                </div>
                <div className={styles.browse}>
                    <Link to={getBrowseLink()}>
                        <Button type="primary">Просмотр</Button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default NavigationPanel;
