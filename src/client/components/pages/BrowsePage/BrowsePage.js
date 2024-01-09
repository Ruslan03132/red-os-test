import { useEffect, useState, React } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Select } from "antd";

import fakeServer from "../../../../server/fakeServer";
import BrowseContent from "../../BrowseContent/BrowseContent";
import getHomeLink from "../../../lib/links/getHomeLink";
import getAuthLink from "../../../lib/links/getAuthLink";
import makeMarkerTree from "../../../lib/filterTree/makeMarkerTree";
import deepFilterTree from "../../../lib/filterTree/deepFilterTree";
import { OPTIONS_SORT } from "../../../consts/browse";
import Spinner from "../../Spinner/Spinner";

import styles from "./index.module.css";

function BrowsePage() {
    const [authUser, setAuthUser] = useState(null);
    const [data, setData] = useState(null);
    const [searchItem, setSearchItem] = useState("");
    const [sortValue, setSortValue] = useState("default");
    const navigate = useNavigate();
    const { Search } = Input;

    const onSearch = (e) => {
        setSearchItem(e.target.value);
    };

    const handleChangeSelect = async (value) => {
        setSortValue(value);
    };

    useEffect(() => {
        async function fetchAuthUser() {
            const userAuth = await fakeServer.getAuthUser();
            if (!userAuth) {
                navigate(getAuthLink());
            } else {
                setAuthUser(true);
                setData(await fakeServer.getData());
            }
        }
        fetchAuthUser();
    }, []);

    useEffect(() => {
        async function makeFilterTree() {
            if (data) {
                const _data = JSON.parse(
                    JSON.stringify(await fakeServer.getData())
                );
                if (searchItem === "") {
                    setData(_data);
                } else {
                    makeMarkerTree(_data, searchItem);
                    const filterResult = deepFilterTree(_data);
                    if (filterResult.length === 0) {
                        filterResult.push({ key: "_", name: "root" });
                    }
                    setData(filterResult);
                }
            }
        }
        makeFilterTree();
    }, [searchItem]);

    useEffect(() => {
        async function makeSortTree() {
            if (sortValue === "default") {
                setData(await fakeServer.getData());
            } else if (sortValue === "asc") {
                const sData = JSON.parse(JSON.stringify(data));
                function sortDataRecursively(sData) {
                    sData.sort((a, b) => a.name.localeCompare(b.name));
                    sData.forEach((item) => {
                        if (item.children) {
                            sortDataRecursively(item.children);
                        }
                    });
                }
                sortDataRecursively(sData);
                setData(sData);
            }
        }
        makeSortTree();
    }, [sortValue]);

    async function onClickExit() {
        await fakeServer.setAuthUser("");
    }

    if (authUser === null) {
        return <Spinner></Spinner>;
    }

    return (
        <div className={styles.container}>
            <Link to={getHomeLink()}>
                <Button onClick={onClickExit}>Выйти</Button>
            </Link>

            <div className={styles.filter}>
                <Search
                    placeholder="введите текст для поиска"
                    onChange={onSearch}
                    className={styles.search}
                />

                <Select
                    defaultValue="default"
                    className={styles.sort}
                    onChange={handleChangeSelect}
                    options={OPTIONS_SORT}
                />
            </div>

            {data && data.length !== 0 ? (
                <div className={styles.content}>
                    <BrowseContent childContent={data[0]}></BrowseContent>
                </div>
            ) : (
                <Spinner></Spinner>
            )}
        </div>
    );
}

export default BrowsePage;
