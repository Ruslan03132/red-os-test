import data from "./mockData";
import users from "./mockUsers";
import { TIME_GET_DATA, TIME_AUTH_USER } from "./consts/constsTimeout";

const fakeServer = {
    async getAuthUser() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (localStorage.getItem("authUser") === null) {
                    localStorage.setItem("authUser", "");
                }
                resolve(localStorage.getItem("authUser"));
            }, TIME_AUTH_USER);
        });
    },

    async setAuthUser(login) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(localStorage.setItem("authUser", login));
            }, TIME_AUTH_USER);
        });
    },

    async setAuthorizedUser(login, password) {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                if (users[login] && users[login] === password) {
                    await this.setAuthUser(login);
                    resolve(false);
                } else {
                    resolve(true);
                }
            }, TIME_AUTH_USER);
        });
    },

    async getData() {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                resolve(data);
            }, TIME_GET_DATA);
        });
    },
};

export default fakeServer;
