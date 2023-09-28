const fs = require('fs/promises');
const dbJson = require('../db.json');
const path = require('path');

class Cube {
    constructor(name, imageUrl, description, difficultyLevel){
        this.name = name,
        this.imageUrl = imageUrl,
        this.description = description,
        this.difficultyLevel = difficultyLevel
    }

    static async save(cube){
        cube.id = dbJson.cubes[dbJson.cubes.length - 1].id + 1;
        dbJson.cubes.push(cube);
        const jsonData = JSON.stringify(dbJson, null, 2);
        await fs.writeFile(path.resolve(__dirname, '../db.json'), jsonData);
    }
}

module.exports = Cube;