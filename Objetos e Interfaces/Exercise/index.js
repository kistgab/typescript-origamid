"use strict";
// 1 - Crie uma interface UserData para o formulário abaixo
// 2 - Crie uma variável global UserData no window, ela será um objeto qualquer
// 3 - Adicione um evento de keyup ao formulário
// 4 - Quando o evento ocorrer adicione a {[id]: value} ao UserData
// 5 - Salve UserData no localStorage
// 6 - Crie uma User Type Guard, para verificar se o valor de localStorage é compatível com UserData
// 7 - Ao refresh da página, preencha os valores de localStorage (caso seja UserData) no formulário e em window.UserData
var UserDataProps;
(function (UserDataProps) {
    UserDataProps["nome"] = "nome";
    UserDataProps["email"] = "email";
    UserDataProps["cpf"] = "cpf";
})(UserDataProps || (UserDataProps = {}));
const USER_DATA_KEY = "userData";
function isValidJSON(string) {
    try {
        JSON.parse(string);
    }
    catch (e) {
        return false;
    }
    return true;
}
function saveObjectInLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
function handleFormKeyUp({ target }) {
    if (target instanceof HTMLInputElement &&
        (target.id === UserDataProps.cpf ||
            target.id === UserDataProps.nome ||
            target.id === UserDataProps.email)) {
        const userDataProperty = target.id;
        window.userData[userDataProperty] = target.value;
    }
    saveObjectInLocalStorage(USER_DATA_KEY, window.userData);
}
function isUserData(data) {
    const isObject = typeof data === "object";
    if (!isObject || !data)
        return false;
    const hasUserDataProps = UserDataProps.nome in data ||
        UserDataProps.email in data ||
        UserDataProps.cpf in data;
    return hasUserDataProps;
}
function initilizeFormData() {
    window.userData = {};
    const localUserData = localStorage.getItem(USER_DATA_KEY);
    if (localUserData && isValidJSON(localUserData)) {
        const userData = JSON.parse(localUserData);
        window.userData = userData;
        fillFormData(userData);
    }
}
function fillFormData(formData) {
    Object.entries(formData).forEach(([key, value]) => {
        if (typeof value !== "string") {
            return;
        }
        const input = document.getElementById(key);
        input.value = value;
    });
}
function initializeEvent(id, eventName, callback) {
    const formElement = document.querySelector(id);
    formElement?.addEventListener(eventName, callback);
}
initializeEvent("#form", "keyup", handleFormKeyUp);
initilizeFormData();
