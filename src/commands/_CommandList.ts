import { CommandInt } from '../interfaces/CommandInt'
import { lewdRoxy } from './lewdRoxy'
import { magicNumber } from './magicNumber'
import simpleCmd from './simpleCmd'
import { testCmd } from './testCmd'
import { wholesomeKiss } from './wholesomeKiss'

const simpleCommands = simpleCmd()

export const CommandList: CommandInt[] = [
  testCmd,
  ...simpleCommands,
  magicNumber,
  lewdRoxy,
  wholesomeKiss
]