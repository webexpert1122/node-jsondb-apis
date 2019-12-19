const { DB_ROOT } = require("./config/database");
const path = require("path");
const fs = require("fs");

module.exports = {

    async setProperty(studentId, propPath, option) {
        const exist = await isExistStudent(studentId);
        if (!exist) createStudent(studentId);
        
        const data = await readStudent(studentId);
        const properties = propPath.split('/');

        let item = data;
        for (let property of properties) {
            if (!item[property]) {
                item[property] = {};
            }

            item = item[property];
        }

        for (let key in option) {
            item[key] = option[key];
        }

        return await saveStudent(studentId, data);
    },

    async getProperty(studentId, propPath) {
        const exist = await isExistStudent(studentId);
		if (!exist) throw `Student ${studentId} doesn't exist`;

		const data = await readStudent(studentId) || {};
		const properties = propPath.split('/');

		let item = data;
		let props = '';
		for (let property of properties) {
			props += `${property}/`;
			item = item[property];
			if (!item) throw `Property ${props} doesn't exist`;
		}

		return item;
    },

    async deleteProperty(studentId, propPath) {
        const exist = await isExistStudent(studentId);
        if (!exist) throw  `Student ${studentId} doesn't exist`;

        const data = await readStudent(studentId);
        const properties = propPath.split('/');

        // option 1
		let code = 'delete data';
		for (let property of properties) {
			code += `['${property}']`;
		}

		// console.log('delete code: ', code);
        const result = eval(code);
        
        // option 2
		// let parent = data, child = data;
		// let props = '';
		// for (let property of properties) {
		// 	props += `${property}/`;
		// 	parent = child;
		// 	child = child[property];
		// 	if (!child) throw `Property ${props} doesn't exist`;
        // }
        
        // delete parent[child];

        if (!result) {
            console.log('Some error occurs');
            throw 'Some error occurs';
        }

        return await saveStudent(studentId, data);
    }
}

const isExistStudent = id => isExist(`${DB_ROOT}/${id}.json`);

const createStudent = id => createFile(`${DB_ROOT}/${id}.json`);

const readStudent = id => new Promise((resolve, reject) => {
    fs.readFile(`${DB_ROOT}/${id}.json`, {}, (error, data) => {
        if (error){
            console.log('Reading file failed');
            return reject(error);
        }

        if (data.length === 0) data = "{}";
        resolve(JSON.parse(data));
    });
});

const saveStudent = (id, data) => new Promise(resolve => {
    fs.writeFile(`${DB_ROOT}/${id}.json`,
        JSON.stringify(data),
        error => {
            if (error) {
                console.log('Saving file failed');
                return reject(error);
            }
            
            resolve(true);
        });
});


// === generic file system functions

/**
 * @name: isExist
 * @param path: file system path
 * @returns: return promise that reolve true on success or false on fail
 * @throws: this function doesn't throw any exception
 */
const isExist = path => new Promise(resolve => {
    fs.access(path, error => {
        resolve(!error);
    });
});

/**
 * @name: createFile
 * @param path: file system path
 * @returns: return promise that reolve true on success or false on fail
 * @throws: this function doesn't throw any exception
 */
const createFile = path => new Promise(resolve => {
    fs.writeFile(path, "{}", error => {
        resolve(!error);
    });
});