import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

import fakeServer from "../../../../server/fakeServer";
import getAuthLink from "../../../lib/links/getAuthLink";
import Spinner from "../../Spinner/Spinner";

import styles from "./index.module.css";

function MainPage() {
    const [authUser, setAuthUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchAuthUser() {
            const userAuth = await fakeServer.getAuthUser();
            if (userAuth === "") {
                setAuthUser(false);
            } else {
                setAuthUser(true);
            }
        }
        fetchAuthUser();
    }, []);

    function onClickEnter() {
        navigate(getAuthLink());
    }

    async function onClickExit() {
        setAuthUser(null);
        await fakeServer.setAuthUser("");
        setAuthUser(false);
    }

    if (authUser === null) {
        return <Spinner />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.mainPage}>Главная страница</div>

            <div className={styles.enterButton}>
                {authUser ? (
                    <Button onClick={onClickExit}>Выйти</Button>
                ) : (
                    <Button onClick={onClickEnter}>Войти</Button>
                )}
            </div>
        </div>
    );
}

export default MainPage;
