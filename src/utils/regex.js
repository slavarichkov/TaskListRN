
const regexEmailEn = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+(\.[a-zA-Z0-9-_.]+|\.[а-яА-ЯёЁ0-9-_.]+)$/;
const regexPassword = /^[a-zA-Z0-9]+$/;
const regexStrokeInput = /^[a-zA-ZÀ-öø-ÿА-Яа-яÄäÖöÜüßß0-9\s.,()-]*$/;

export { regexStrokeInput, regexEmailEn, regexPassword }