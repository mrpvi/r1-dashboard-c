export const generateId = () => {
    return Math.random().toString(36).substring(2, 9) + "-" + new Date().getTime();
}