import { Spin } from "antd";

import styles from "./index.module.css";

function Spinner() {
    return <Spin size="large" className={styles.spinner}></Spin>;
}

export default Spinner;
