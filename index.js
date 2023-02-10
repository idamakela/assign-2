import chalk from 'chalk';
import fs from 'fs/promises'
import {formatDistanceToNow, isAfter, isBefore, parse, format, isToday, set} from 'date-fns'
import {Command} from 'commander';
import getGitVersion from './src/getGitVersion.js';


//EXTRA OUTPUT
const gitVersion = await getGitVersion()
const first = 'Ida'
const last = 'Mäkelä'

//FOR CONSOLE LOG
const name = `${chalk.bgBlue(first)} ${chalk.bgBlue(last)}`


//DATE CODE
const argumentParser = new Command();
argumentParser.option('--date')
argumentParser.parse();

const dateStringSentAsArgument = argumentParser.args[0]
const dateSentAsArgument = parse(dateStringSentAsArgument, 'yyyy-MM-dd', new Date())
const currentDate = set(new Date(), {hours: 0, minutes: 0, seconds: 0, milliseconds: 0})

console.log('isToday', isToday(dateSentAsArgument))
console.log('isAfter', isAfter(dateSentAsArgument, currentDate))
console.log('isBefore', isBefore(dateSentAsArgument, currentDate))

//ASSIGNMENT
//function: current date and time to file
let today = format(new Date(), 'yyyy-MM-dd HH:mm:ss z');

//function: how long since the course started
const startOfCourse = new Date(2023, 0, 31)
let daysFromCourseStart = formatDistanceToNow(startOfCourse)

//date as argument (like input and check if its after or before course start)
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