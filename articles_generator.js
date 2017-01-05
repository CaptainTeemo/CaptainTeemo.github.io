var fs = require('fs');

fs.readdir("./public/articles/", (error, files) => {
    let fileNames = files.map((fileName) => {
        return fileName.replace('.md', '');
    }).filter((fileName) => {
        return fileName !== "Welcome";
    });
    fileNames.unshift("Welcome");
    let articles = JSON.stringify(fileNames);
    fs.writeFile("./public/articles.json", articles, (error) => {
        if (error) { throw error; }
    });
});
