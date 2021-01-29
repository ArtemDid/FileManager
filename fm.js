//Модуль нужен для того чтобы считывать данные с консоли (с командной строки)
const readline = require("readline");
const fs = require("fs");

//для этого нужно получить доступ к стандартному потоку ввода stdin
//доступ к нему можно получить из суперглобального объекта Node.JS - process
//этот объект является аналогом объекта window в браузерном JS

//1.Нужно создать интерфейс для ввода/вывода данных
const ioInterface = readline.createInterface({

    input: process.stdin,
    output: process.stdout

});

//В качестве источника данных (поле input) будет использоваться стандартный поток ввода - клавиатура, она же stdin
//В качестве источника вывода (поле output) будет использоваться стандартный поток вывода - консоль (монитор)

//Позволяет вывести на экран любую строку. Как правило вопрос / запрос к пользователю и ждать ответа
//ответ передаётся callback - функции
//answer - храни то что ввёл пользователь

const menu =
    `
1 - Create file
2 - Delete file
3 - Rename file
4 - Copy file
5 - Create directory
6 - Delete directory
`;


ioInterface.question(menu, function (option) {

    switch (option) {
        case "1":
        case "2":
        case "3":
        case "4":
            ioInterface.question("Enter file name\n", function (fileName) {
                switch (option) {
                    case "1":
                        fs.writeFile(fileName, "sampleText", function (err) { });
                        ioInterface.close();
                        break;
                    case "2":
                        fs.unlink(fileName, function (err) { });
                        ioInterface.close();
                        break;
                    case "3":
                    case "4":
                        ioInterface.question("Enter file new name\n", function (fileNewName) {
                            switch (option) {
                                case "3":
                                    fs.rename(fileName, fileNewName, function (err) {
                                        if (err) throw err;
                                        console.log("File renamed");
                                    });
                                    break;
                                case "4":
                                    fs.copyFile(fileName, fileNewName, function (err) {
                                        if (err) throw err;
                                        console.log("File copied");
                                    });
                                    break;
                            }
                            ioInterface.close();
                        });
                        break;
                }
            });
            break;
        case "5":
        case "6":
            ioInterface.question("Enter dir name\n", function (dirName) {

                switch (option) {
                    case "5":
                        fs.mkdir(dirName, function (err) { });
                        break;

                    case "6":
                        fs.rmdir(dirName, { recursive: true }, function (err) { });
                        break;

                }

                ioInterface.close();

            });
            break;
    }

});
