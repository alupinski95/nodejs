"use strict"
const users = [
    { id: 1, login: "admin", password: "!QAZxsw2" },
    { id: 2, login: "user1", password: "1qazXSW@1" },
    { id: 3, login: "user2", password: "2qazXSW@2" }
];
let authUserId = 0;

const authMiddleware = (req, res, next) => {
    let key = req.headers?.authorization?.split(":");
    let authUser = null;
    if (key) {
        users.forEach((element) => {
            if (element.login == key[0] && element.password == key[1])
                authUser = element;
        });
    }
    if (!authUser) {
        res.status(401);
        res.send();
    }
    else {
        authUserId = authUser.id;
        next();
    }

};

const isUserCanModify = (creeatorId) => {
    return authUserId === creeatorId;
}

module.exports = {
    authMiddleware: authMiddleware,
    isUserCanModify: isUserCanModify
};
