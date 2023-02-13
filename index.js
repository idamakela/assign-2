import chalk from 'chalk';
import fs from 'fs/promises'
import {formatDistanceToNow, parse, format, set, isLeapYear, isValid, isAfter, isBefore, isToday} from 'date-fns'
import {Command} from 'commander';
import getGitVersion from './src/getGitVersion.js';


//EXTRA OUTPUT
let gitVersion = await getGitVersion()
let first = 'Ida'
let last = 'Mäkelä'

//FOR CONSOLE LOG
let name = `${chalk.bgBlue(first)} ${chalk.bgBlue(last)}`

//ASSIGNMENT
//function: current date and time to file
let today = format(new Date(), 'yyyy-MM-dd HH:mm:ss z');

//function: how long since the course started
let startOfCourse = new Date(2023, 0, 31)
let daysFromCourseStart = formatDistanceToNow(startOfCourse)

//date as argument (like which quarter todays date belongs to) 
let argumentParser = new Command();
argumentParser.option('--date');
argumentParser.parse();

let dateStringSentAsArgument = argumentParser.args[0];
let dateSentAsArgument = parse(dateStringSentAsArgument, 'yyyy-MM-dd', new Date());
let currentDate = set(new Date(), {hours: 0, minutes: 0, seconds: 0, milliseconds: 0})
let leapYearVar = isLeapYear(dateSentAsArgument);
let dateValidator = isValid(dateSentAsArgument);

if(dateValidator == false) {
    console.log('Try and write "npm run start --date" followed by a date with the format "yyyy-MM-dd" in double parenthesis');
} else {
    console.log('isBefore', isBefore(dateSentAsArgument, currentDate))
    console.log('isToday', isToday(dateSentAsArgument))
    console.log('isAfter', isAfter(dateSentAsArgument, currentDate))

    leapYearTest(dateSentAsArgument);
}

function leapYearTest() {
    if(leapYearVar == true) {
        console.log('This date occurs under a leap year')
    } else {
        console.log('This date does not occur under a leap year')
    }
}

//good formatting for date and time (that "everyone" can understand)
//function: creates plain runnable .html file in addition to .md file. Include 


//INDEX.MD FILE OUTPUT
let fileContent = `
    date: ${today}

    name: ${first} ${last}
    npm & node: ${process.env.npm_config_user_agent}
    git version: ${gitVersion}

    days since course start: ${daysFromCourseStart}
`;

await fs.writeFile('index.md', fileContent);

//CONSOLE LOG FILE CONTENT VAR