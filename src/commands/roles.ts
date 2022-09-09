import { APIApplicationCommandOptionChoice, CommandInteractionOptionResolver, EmbedBuilder, GuildMember, RoleResolvable, SlashCommandBuilder } from 'discord.js'
import { CommandInt } from '../interfaces/CommandInt'
import { addRoleData, getRoleData, removeRoleData } from '../modules/roleData'

const roleList: APIApplicationCommandOptionChoice<string>[] = []

export const fetchAll = async (): Promise<void> => {
  const roles = await getRoleData()
  for (const role of roles) {
    roleList.push({ name: role.roleName, value: role.roleId})
  }
}

export const getRole: CommandInt = {
  data: new SlashCommandBuilder()
    .setName('roleget')
    .setDescription('Get a role')
    .addStringOption((option) =>
      option
        .setName('role')
        .setDescription('Select a role to get')
        .addChoices(...roleList)
        .setRequired(true)
    ) as SlashCommandBuilder,
  run: async (interaction) => {
    try {
      await interaction.deferReply({})
      const roleId = (interaction.options as CommandInteractionOptionResolver).getString('role', true)
      const role = interaction.guild?.roles.cache.find(role => role.id === roleId)
      const guildMember = interaction.member as GuildMember
      await guildMember.roles.add(role as RoleResolvable)
      const embed = new EmbedBuilder()
        .setAuthor({
          name: guildMember.user.tag,
          iconURL: guildMember.displayAvatarURL()
        })
        .setDescription(`Has added ${role} role!`)

      await interaction.editReply({ embeds: [embed]})
    } catch (error) {
      console.error(new Date(Date.now()), 'getRole')
      console.error(error)
    }
  }
}

export const removeRole: CommandInt = {
  data: new SlashCommandBuilder()
    .setName('roleremove')
    .setDescription('Remove a role')
    .addStringOption((option) =>
      option
        .setName('role')
        .setDescription('Select a role to remove')
        .addChoices(...roleList)
        .setRequired(true)
    ) as SlashCommandBuilder,
  run: async (interaction) => {
    try {
      await interaction.deferReply({})
      const roleId = (interaction.options as CommandInteractionOptionResolver).getString('role', true)
      const role = interaction.guild?.roles.cache.find(role => role.id === roleId)
      const guildMember = interaction.member as GuildMember
      await guildMember.roles.remove(role as RoleResolvable)
      const embed = new EmbedBuilder()
        .setAuthor({
          name: guildMember.user.tag,
          iconURL: guildMember.displayAvatarURL()
        })
        .setDescription(`Has removed ${role} role!`)

      await interaction.editReply({ embeds: [embed]})
    } catch (error) {
      console.error(new Date(Date.now()), 'removeRole')
      console.error(error)
    }
  }
}

export const addRoleToList: CommandInt = {
  data: new SlashCommandBuilder()
    .setName('rolelistadd')
    .setDescription('Add a role to the list')
    .addRoleOption((option) =>
      option
        .setName('role')
        .setDescription('Select a role to add to the list')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(0),
  run: async (interaction) => {
    try {
      await interaction.deferReply({ ephemeral: true })
      const guildMember = interaction.member as GuildMember
      const role = (interaction.options as CommandInteractionOptionResolver).getRole('role', true)
      await addRoleData(role.id, role.name)
      roleList.push({ name: role.name, value: role.id})
      const embed = new EmbedBuilder()
        .setAuthor({
          name: guildMember.user.tag,
          iconURL: guildMember.displayAvatarURL()
        })
        .setDescription(`Added ${role} role to the list!`)

      await interaction.editReply({ embeds: [embed]})
    } catch (error) {
      console.error(new Date(Date.now()), 'addRoleToList')
      console.error(error)
    }
  }
}

export const removeRoleFromList: CommandInt = {
  data: new SlashCommandBuilder()
    .setName('rolelistremove')
    .setDescription('Remove a role from the list')
    .addStringOption((option) =>
      option
        .setName('role')
        .setDescription('Select a role to remove from the list')
        .addChoices(...roleList)
        .setRequired(true)
    )
    .setDefaultMemberPermissions(0),
  run: async (interaction) => {
    try {
      await interaction.deferReply({ ephemeral: true })
      const roleId = (interaction.options as CommandInteractionOptionResolver).getString('role', true)
      const guildMember = interaction.member as GuildMember
      await removeRoleData(roleId)
      roleList.splice(roleList.findIndex(r => r.value = roleId), 1)
      const embed = new EmbedBuilder()
        .setAuthor({
          name: guildMember.user.tag,
          iconURL: guildMember.displayAvatarURL()
        })
        .setDescription(`Removed <@${roleId}> role from the list!`)

      await interaction.editReply({ embeds: [embed]})
    } catch (error) {
      console.error(new Date(Date.now()), 'removeRoleFromList')
      console.error(error)
    }
  }
}

export const listRoles: CommandInt = {
  data: new SlashCommandBuilder()
    .setName('rolels')
    .setDescription('List all available roles'),
  run: async (interaction) => {
    try {
      await interaction.deferReply()
      let message: string
      if (roleList.length > 0) {
        for (const role of roleList) {
          
        }
      }
      const embed = new EmbedBuilder()
        .setAuthor({
          name: interaction.user.tag,
          iconURL: interaction.user.displayAvatarURL()
        })
        .setDescription('')
    } catch (error) {
      console.error(new Date(Date.now()), 'listRoles')
      console.error(error)
    }
  }
}