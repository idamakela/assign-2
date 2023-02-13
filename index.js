import chalk from 'chalk';
import fs from 'fs/promises'
import {formatDistanceToNow, parse, format, isLeapYear, isValid} from 'date-fns'
import {Command} from 'commander';
import getGitVersion from './src/getGitVersion.js';


//EXTRA OUTPUT
const gitVersion = await getGitVersion()
const first = 'Ida'
const last = 'Mäkelä'

//FOR CONSOLE LOG
const name = `${chalk.bgBlue(first)} ${chalk.bgBlue(last)}`

//ASSIGNMENT
//function: current date and time to file
let today = format(new Date(), 'yyyy-MM-dd HH:mm:ss z');

//function: how long since the course started
const startOfCourse = new Date(2023, 0, 31)
let daysFromCourseStart = formatDistanceToNow(startOfCourse)

//date as argument (like which quarter todays date belongs to) 
const argumentInput = new Command();
argumentInput.option('--date');
argumentInput.parse();

const dateStringSentAsArgument = argumentInput.args[0];
const dateSentAsArgument = parse(dateStringSentAsArgument, 'yyyy-MM-dd', new Date());
//assignment is: function: figure out if date sent as a argument is before or after the date when you run the file 


//date argument test function


let leapYearVar = isLeapYear(dateSentAsArgument);
let dateValidator = isValid(dateSentAsArgument);

if(dateValidator == false) {
    console.log('Try and write "npm run start --date" followed by a date with the format "yyyy-MM-dd" in double parenthesis');
} else {
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