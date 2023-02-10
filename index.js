import chalk from 'chalk';

//Fredriks kod, lite omgjord

import fs from 'fs/promises'
import {formatDistanceToNow, isAfter, isBefore, parse, format, isToday, set} from 'date-fns'
import {Command} from 'commander';
import getGitVersion from './src/getGitVersion.js';


//TERMINAL OUTPUT
const gitVersion = await getGitVersion()
console.log(`git version: ${gitVersion}`);

const first = 'Ida'
const last = 'Mäkelä'
const name = `${chalk.bgBlue(first)} ${chalk.bgBlue(last)}`
console.log('name', name)

console.log(`npm & node: ${process.env.npm_config_user_agent}`)

//INDEX.MD FILE OUTPUT
const fileContent = `
    name: ${first} ${last}
    npm & node: ${process.env.npm_config_user_agent}
    git version: ${gitVersion}
`;

await fs.writeFile('index.md', fileContent);

//DATE CODE
const startOfCourse = new Date(2023, 0, 31)
console.log(formatDistanceToNow(startOfCourse))

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
//function: how long since the course started
//date as argument (like input and check if its after or before course start)
//good formatting for date and time (that "everyone" can understand)
//function: creates plain runnable .html file in addition to .md file. Include 
