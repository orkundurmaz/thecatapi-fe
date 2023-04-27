const localStorageHelper = {
    getItem(key) {
        try {
            const item = localStorage.getItem(key);
            if (item !== undefined) { /* a key can hold null or false */
                return JSON.parse(item)
            }
            else {
                throw new Error("localStorage: Item not found");
            }
        } catch (error) {
            console.log(error);
        }
    },
    setItem(item, key=`${item}`) {
        try {
            localStorage.setItem(key, JSON.stringify(item));
        } catch (error) {
            console.log(error);
        }
    },
    getAll() {

    },
    removeItem(key) {
        try {
            localStorage.removeItem(key)
        } catch (error) {
            console.log(error);
        }
    },
    removeAll(){
        localStorage.clear()
    }

}

export default localStorageHelper