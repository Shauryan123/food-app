export const setAllUserDetails = (data) => {
    return {
        type: "SET_ALL_USERS",
        allUsers: data,
    };
};

export const getAllUserDetails = (data) => {
    return {
        type: "GET_ALL_USERS",
    };
};