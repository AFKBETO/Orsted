import { CommandInt } from '../interfaces/CommandInt'
import { lewdRoxy } from './lewdRoxy'
import { magicNumber } from './magicNumber'
import { match } from './match'
import { ship } from './ship'
import simpleCmd from './simpleCmd'
import { chatMsg } from './chatMsg'
import { wholesomeKiss } from './wholesomeKiss'
import { spank } from './spank'
import { donut } from './donut'

const simpleCommands = simpleCmd()

export const CommandList: CommandInt[] = [
  chatMsg,
  ...simpleCommands,
  magicNumber,
  lewdRoxy,
  wholesomeKiss,
  ship,
  match,
  spank,
  donut
]