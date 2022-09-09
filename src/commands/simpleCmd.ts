import { SlashCommandBuilder } from 'discord.js'
import { CommandInt } from '../interfaces/CommandInt'

const cmds = {
  axa: {
    desc: 'AxA is the best thing since Shakespeare',
    msg: 'https://images-ext-2.discordapp.net/external/aZqy-7bn2Kjl2QeIEsF_wmXC-ZLlTVDz3R-a_BXcX-Q/https/media.discordapp.net/attachments/558540706302394368/817231396484677673/Comp_1_1.gif?width=894&height=503'
  },
  iloveyou: {
    desc: 'God will confess her love!',
    msg: 'https://media.discordapp.net/attachments/824175906120663060/847311210730487848/IMG_20210521_070902.png?width=960&height=408'
  },
  roxynom: {
    desc: 'Feed Roxy!',
    msg: 'https://media.discordapp.net/attachments/814309698295562240/838067728711024700/8f68c86.gif'
  },
  nontr: {
    desc: 'NTR is banned!',
    msg: 'https://media.discordapp.net/attachments/823953644500156416/953241557971111956/image0.jpg?width=358&height=676'
  },
  nofuta: {
    desc: 'Futa is banned!',
    msg: 'https://cdn.discordapp.com/attachments/954785875764604989/954785974339133480/92g0aoeoqpi21.png'
  },
  ntr: {
    desc: 'You want NTR?',
    msg: 'https://cdn.discordapp.com/attachments/824175906120663060/954792431839215706/unknown.png'
  },
  bread: {
    desc: 'Breadgasm!',
    msg: 'https://www.sakugabooru.com/data/a56fea265f7f85d50f5ef5e9b48c39bf.mp4'
  },
  cunny: {
    desc: 'Give me your body!',
    msg: 'https://cdn.discordapp.com/attachments/403019763825246209/894328456609939516/1633281014083.webm'
  },
  holyemotes: {
    desc: 'Praise the holy emotes!',
    msg: '<:KissRoxy:814462711974068254><:KissSylphy:814462730055843851>'
  }
}

const simpleCmd = (): CommandInt[] => {
  const res: CommandInt[] = []
  let cmd: keyof typeof cmds
  for (cmd in cmds) {
    const obj = cmds[cmd]
    const command: CommandInt = {
      data: new SlashCommandBuilder()
      .setName(cmd)
      .setDescription(obj.desc),
      run: async (interaction) => {
        try {
          await interaction.reply(obj.msg)
        } catch (error) {
          console.error(new Date(Date.now()), cmd)
          console.error(error)
        }
      }
    }
    res.push(command)
  }
  return res
}

export default simpleCmd