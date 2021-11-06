export let access_token = "";

export const retrieveAccessToken = () => access_token;
export const setAccessToken = (token) => (access_token = token);
