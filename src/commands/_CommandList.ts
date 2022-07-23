import { CommandInt } from '../interfaces/CommandInt'
import { magicNumber } from './magicNumber'
import simpleCmd from './simpleCmd'
import { testCmd } from './testCmd'

const simpleCommands = simpleCmd()

export const CommandList: CommandInt[] = [testCmd, ...simpleCommands, magicNumber]