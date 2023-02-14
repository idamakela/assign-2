import chalk from 'chalk';
import fs from 'fs/promises';
import {formatDistanceToNow, parse, format, set, isLeapYear, isValid, isAfter, isBefore, isToday} from 'date-fns';
import {Command} from 'commander';
import getGitVersion from './src/getGitVersion.js';

//SUGGESTIONS FOR BETTER CODE
//functions for creating the container divs and its content in htmlContent
//placeholders in funciton, ie checkDate

let gitVersion = await getGitVersion();
let first = 'Ida';
let last = 'Mäkelä';

let name = `${chalk.bgBlue(first)} ${chalk.bgBlue(last)}`;
console.log(name);

let today = format(new Date(), 'yyyy-MM-dd HH:mm:ss z');

let startOfCourse = new Date(2023, 0, 31);
let daysFromCourseStart = formatDistanceToNow(startOfCourse);

let argumentParser = new Command();
argumentParser.option('--date');
argumentParser.parse();

let dateStringSentAsArgument = argumentParser.args[0];
let dateSentAsArgument = parse(dateStringSentAsArgument, 'yyyy-MM-dd', new Date());
let currentDate = set(new Date(), {hours: 0, minutes: 0, seconds: 0, milliseconds: 0});

let leapYearTest = isLeapYear(dateSentAsArgument);
let isBeforeTest = isBefore(dateSentAsArgument, currentDate);
let isTodayTest = isToday(dateSentAsArgument);
let isAfterTest = isAfter(dateSentAsArgument, currentDate);

let dateValidator = isValid(dateSentAsArgument);

if(!dateValidator) {
    console.log('Try and write "npm run start --date" followed by a date with the format "yyyy-MM-dd" in parenthesis');
} else {
    checkDate(dateSentAsArgument);
    isDateLeapYear(dateSentAsArgument);
}

function checkDate() {
    if(isBeforeTest) {
        console.log('The date is before todays date');
        return;
    } 

    if(isTodayTest){
        console.log('The date is todays date');
        return;
    }

    if(isAfterTest){
        console.log('The date is after todays date');
        return;
    }
}

function isDateLeapYear() {
    if(leapYearTest) {
        console.log('This date occurs under a leap year');
    } else {
        console.log('This date does not occur under a leap year');
    }
}

let fileContent = `
date: ${today}

name: ${first} ${last}
npm & node: ${process.env.npm_config_user_agent}
git version: ${gitVersion}

days since course start: ${daysFromCourseStart}
`;

let htmlContent = `
<!DOCTYPE html>

<html lang="en">
    <head>
        <title>JavScript Framework course | Assignment week two</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="src/style.css">
        <meta charset="UTF-8">
    </head>
    <body>
        <header>
            <h1>OUTPUT HTML FILE</h1>
        </header>
        <main>
            <div class='container'>
                <p>File run last on:</p>
                <p>${today}</p>
            </div>

            <div class='container'>
                <p>The JS Framework course started ${daysFromCourseStart} ago</p>
            </div>

            <div class='container'>
                <p>Name of author:</p>
                <p>${first} ${last}</p>
            </div>

            <div class='container'>
                <p>Local version specifications:</p>
                <p>npm & node: ${process.env.npm_config_user_agent}</p>
                <p>git version: ${gitVersion}</p>
            </div>

            <div class='container'>
                <p>Take a look in the terminal and run the index.js file!</p>
            </div>
        </main>
        <footer>
            <h2>&copy; Ida Mäkelä</h2>
        </footer>
    </body>
</html>
`;

await fs.writeFile('index.md', fileContent);
await fs.writeFile('index.html', htmlContent);