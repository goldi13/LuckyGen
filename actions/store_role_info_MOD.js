module.exports = {
  name: 'Store Role Info MOD',
  section: 'Role Control',

  subtitle (data) {
    const roles = ['Mentioned Role', '1st Author Role', '1st Server Role', 'Temp Variable', 'Server Variable', 'Global Variable']
    const info = ['Role Object', 'Role ID', 'Role Name', 'Role Server', 'Role Position', 'Role Hex Color', 'Role Is Mentionable?', 'Role Is Editable?', 'Role Is Managed?', 'Role Member List', 'Role Member Amount', 'Role Created At', 'Role Created Timestamp', 'Role is Hoist?', 'Role Permission List', 'Role Permissions']
    return `${roles[parseInt(data.role)]} - ${info[parseInt(data.info)]}`
  },

  variableStorage (data, varType) {
    const type = parseInt(data.storage)
    if (type !== varType) return
    const info = parseInt(data.info)
    let dataType = 'Unknown Type'
    switch (info) {
      case 0:
        dataType = 'Role'
        break
      case 1:
        dataType = 'Role ID'
        break
      case 2:
        dataType = 'Role Name'
        break
      case 3:
        dataType = 'Role Server'
        break
      case 4:
        dataType = 'Role Position'
        break
      case 5:
        dataType = 'Role Color'
        break
      case 6:
        dataType = 'Is Mentionable?'
        break
      case 7:
        dataType = 'Is Editable?'
        break
      case 8:
        dataType = 'Is Managed?'
        break
      case 9:
        dataType = 'Member List'
        break
      case 10:
        dataType = 'Role Member Amount'
        break
      case 11:
        dataType = 'Role Created At'
        break
      case 12:
        dataType = 'Role Created Timestamp'
        break
      case 13:
        dataType = 'Is Hoist?'
        break
      case 14:
        dataType = 'Role Permission List'
        break
      case 15:
        dataType = 'Role Permisions'
        break
    }
    return ([data.varName2, dataType])
  },

  fields: ['role', 'varName', 'info', 'storage', 'varName2'],

  html (isEvent, data) {
    return `
<div><p>This action has been modified by DBM Mods.</p></div><br>
<div>
  <div style="float: left; width: 35%;">
    Source Role:<br>
    <select id="role" class="round" onchange="glob.roleChange(this, 'varNameContainer')">
      ${data.roles[isEvent ? 1 : 0]}
    </select>
  </div>
  <div id="varNameContainer" style="display: none; float: right; width: 60%;">
    Variable Name:<br>
    <input id="varName" class="round" type="text" list="variableList"><br>
  </div>
</div><br><br><br>
<div>
  <div style="padding-top: 8px; width: 70%;">
    Source Info:<br>
    <select id="info" class="round">
      <option value="0" selected>Role Object</option>
      <option value="1">Role ID</option>
      <option value="2">Role Name</option>
      <option value="3">Role Server</option>
      <option value="4">Role Position</option>
      <option value="5">Role Hex Color</option>
      <option value="6">Role Is Mentionable?</option>
      <option value="7">Role Is Editable?</option>
      <option value="8">Role Is Managed By Bot/Integration</option>
      <option value="9">Role Member List</option>
      <option value="10">Role Member Amount</option>
      <option value="11">Role Created At</option>
      <option value="12">Role Created Timestamp</option>
      <option value="13">Role Is Separate From Others?</option>
      <option value="14">Role Permissions List</option>
      <option value="15">Role Permissions</option>

    </select>
  </div>
</div><br>
<div>
  <div style="float: left; width: 35%;">
    Store In:<br>
    <select id="storage" class="round">
      ${data.variables[1]}
    </select>
  </div>
  <div id="varNameContainer2" style="float: right; width: 60%;">
    Variable Name:<br>
    <input id="varName2" class="round" type="text"><br>
  </div>
</div>`
  },

  init () {
    const { glob, document } = this

    glob.roleChange(document.getElementById('role'), 'varNameContainer')
  },

  action (cache) {
    const data = cache.actions[cache.index]
    const role = parseInt(data.role)
    const varName = this.evalMessage(data.varName, cache)
    const info = parseInt(data.info)
    const targetRole = this.getRole(role, varName, cache)
    if (!targetRole) {
      this.callNextAction(cache)
      return
    }
    let result
    switch (info) {
      case 0:
        result = targetRole
        break
      case 1:
        result = targetRole.id
        break
      case 2:
        result = targetRole.name
        break
      case 3:
        result = targetRole.guild
        break
      case 4:
        result = targetRole.position
        break
      case 5:
        result = targetRole.hexColor
        break
      case 6:
        result = targetRole.mentionable
        break
      case 7:
        result = targetRole.editable
        break
      case 8:
        result = targetRole.managed
        break
      case 9:
        result = targetRole.members.array()
        break
      case 10:
        result = targetRole.members.size
        break
      case 11:
        result = targetRole.createdAt
        break
      case 12:
        result = targetRole.createdTimestamp
        break
      case 13:
        result = targetRole.hoist
        break
      case 14:
        result = targetRole.permissions.toArray().join(', ').replace(/_/g, ' ').toLowerCase()
        break
      case 15:
        result = targetRole.permissions.toArray()
        break
      default:
        break
    }
    if (result !== undefined) {
      const storage = parseInt(data.storage)
      const varName2 = this.evalMessage(data.varName2, cache)
      this.storeValue(result, storage, varName2, cache)
    }
    this.callNextAction(cache)
  },

  mod () {}
}
