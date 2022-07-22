import { CommandInt } from '../interfaces/CommandInt'
import simpleCmd from './simpleCmd'
import { testCmd } from './testCmd'

const simpleCommands = simpleCmd()

export const CommandList: CommandInt[] = [testCmd, ...simpleCommands]