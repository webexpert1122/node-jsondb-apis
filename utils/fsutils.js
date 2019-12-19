const fs = require('fs')

module.exports = {
    /**
     * @name: isExist
     * @param path: file system path
     * @returns: return promise that resolve true on exist or false
     * @throws: this function doesn't throw any exception
     */
    isExist(path) {
        return new Promise(resolve => {
            fs.access(path, error => {
                resolve(!error);
            });
        });
    },

    /**
     * @name: createFile
     * @param path: file system path
     * @returns: return promise that resolve true on exist or false
     * @throws: this function doesn't throw any exception
     */
    createFile(path) {
        return new Promise(resolve => {
            fs.writeFile(path, "{}", error => {
                resolve(!error);
            });
        });
    }
};


