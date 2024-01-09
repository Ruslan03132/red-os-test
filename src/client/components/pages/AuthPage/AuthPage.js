import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Form } from "antd";

import fakeServer from "../../../../server/fakeServer";
import getHomeLink from "../../../lib/links/getHomeLink";
import { LOGIN_RULES, PASSWORD_RULES } from "../../../consts/auth";
import Spinner from "../../Spinner/Spinner";

import styles from "./index.module.css";

function AuthPage() {
    const [errorPassword, setErrorPassword] = useState(false);
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const loginForm = Form.useWatch("login", form);
    const passwordForm = Form.useWatch("password", form);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchAuthUser() {
            const userAuth = await fakeServer.getAuthUser();
            if (userAuth) {
                navigate(getHomeLink());
            } else {
                setAuthUser(false);
            }
        }
        fetchAuthUser();
    }, []);

    async function onClickEnter() {
        if (loginForm && passwordForm) {
            setLoading(true);
            const result = await fakeServer.setAuthorizedUser(
                loginForm,
                passwordForm
            );
            setLoading(false);
            if (result) {
                setErrorPassword(true);
            } else {
                navigate(getHomeLink());
            }
        }
    }

    function onClickPassword() {
        setErrorPassword(false);
    }

    function onClickLogin() {
        setErrorPassword(false);
    }

    if (authUser === null || loading) {
        return <Spinner></Spinner>;
    }

    return (
        <div>
            <Form
                form={form}
                name="basic"
                initialValues={{ remember: true }}
                autoComplete="off"
                className={styles.container}
            >
                {errorPassword && (
                    <div className={styles.passwordError}>
                        Неверный логин или пароль
                    </div>
                )}
                <Form.Item
                    label="Логин"
                    name="login"
                    rules={LOGIN_RULES}
                    className={styles.login}
                    onClick={onClickLogin}
                >
                    <Input autoComplete="off" />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={PASSWORD_RULES}
                    onClick={onClickPassword}
                >
                    <Input.Password autoComplete="off" />
                </Form.Item>

                <Form.Item className={styles.enterButton}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={onClickEnter}
                    >
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AuthPage;
