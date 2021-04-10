module.exports = {
	//---------------------------------------------------------------------
	// Action Name
	//
	// This is the name of the action displayed in the editor.
	//---------------------------------------------------------------------

	name: "Store Member Info MOD",

	//---------------------------------------------------------------------
	// Action Section
	//
	// This is the section the action will fall into.
	//---------------------------------------------------------------------

	section: "Member Control",

	//---------------------------------------------------------------------
	// Action Subtitle
	//
	// This function generates the subtitle displayed next to the name.
	//---------------------------------------------------------------------

	subtitle: function(data) {
		const members = ["Mentioned User", "Command Author", "Temp Variable", "Server Variable", "Global Variable"];
		const info = ["Member Object", "Member ID", "Member Username", "Member Display Name", "Member Discriminator", "Member Tag", "Member Last Message", "Member Last Message ID", "Member Last Channel ID", "Member Hoist Role", "Member Color Role", "Member Highest Role", "Member Role Amount", "Member Role List", "Member Hex Color", "Member Server", "Member Custom Status", "Member Status", "Member Is Deafened?", "Member Is Bannable?", "Member Is In Voice Channel?", "Member is Muted?", "Owner ID", "Member Created at", "Member Created Timestamp", "Member Joined At", "Member Joined Timestamp", "Member Permission List", "Member Flag List", "Member Client Status"];
		return `${members[parseInt(data.member)]} - ${info[parseInt(data.info)]}`;
	},

	//---------------------------------------------------------------------
	// Action Storage Function
	//
	// Stores the relevant variable info for the editor.
	//---------------------------------------------------------------------

	variableStorage: function(data, varType) {
		const type = parseInt(data.storage);
		if(type !== varType) return;
		const info = parseInt(data.info);
		let dataType = "Unknown Type";
		switch(info) {
			case 0:
				dataType = "Server Member";
				break;
			case 1:
				dataType = "Server Member ID";
				break;
			case 2:
				dataType = "Member Username";
				break;
			case 3:
				dataType = "Display Member Name";
				break;
			case 4:
				dataType = "Discriminator";
				break;
			case 5:
				dataType = "Member Tag";
				break;
			case 6:
				dataType = "Last Message";
				break;
			case 7:
				dataType = "Last Message ID";
				break;
			case 8:
				dataType = "Last Channel ID";
				break;
			case 9:
				dataType = "Hoist Role";
				break;
			case 10:
				dataType = "Color role";
				break;
			case 11:
				dataType = "Highest Role";
				break;
			case 12:
				dataType = "Role Amount";
				break;
			case 13:
				dataType = "Role list";
				break;
			case 14:
				dataType = "Hex Color";
				break;
			case 15:
				dataType = "Server";
				break;
			case 16:
				dataType = "Member Custom Status";
				break;
			case 17:
				dataType = "Member Status";
				break;
			case 18:
				dataType = "Member Avatar URL";
				break;
			case 19:
				dataType = "Deafened?";
				break;
			case 20:
				dataType = "Bannable?";
				break;
			case 21:
				dataType = "Voice channel?";
				break;
			case 22:
				dataType = "Muted?";
				break;
			case 23:
				dataType = "Owner ID";
				break;
			case 24:
				dataType = "Date";
				break;
			case 25:
				dataType = "Timestamp";
				break;
			case 26:
				dataType = "Date";
				break;
			case 27:
				dataType = "Timestamp";
				break;
			case 28:
				dataType = "Permission List";
				break;
			case 29:
				dataType = "Flag List";
				break;
			case 30:
				dataType = "Client Status";
				break;
		}
		return ([data.varName2, dataType]);
	},

	//---------------------------------------------------------------------
	// Action Fields
	//
	// These are the fields for the action. These fields are customized
	// by creating elements with corresponding IDs in the HTML. These
	// are also the names of the fields stored in the action's JSON data.
	//---------------------------------------------------------------------

	fields: ["member", "varName", "info", "storage", "varName2"],

	//---------------------------------------------------------------------
	// Command HTML
	//
	// This function returns a string containing the HTML used for
	// editting actions.
	//
	// The "isEvent" parameter will be true if this action is being used
	// for an event. Due to their nature, events lack certain information,
	// so edit the HTML to reflect this.
	//
	// The "data" parameter stores constants for select elements to use.
	// Each is an array: index 0 for commands, index 1 for events.
	// The names are: sendTargets, members, roles, channels,
	//                messages, servers, variables
	//---------------------------------------------------------------------

	html: function(isEvent, data) {
		return `
<div>
	<div style="float: left; width: 35%;">
		Source Member:<br>
		<select id="member" class="round" onchange="glob.memberChange(this, 'varNameContainer')">
			${data.members[isEvent ? 1 : 0]}
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
			<option value="0" selected>Member Object</option>
			<option value="1">Member ID</option>
			<option value="2">Member Username</option>
			<option value="3">Member Display Name</option>
			<option value="4">Member Discriminator</option>
			<option value="5">Member Tag</option>
			<option value="6">Member Last Message</option>
			<option value="7">Member Last Message ID</option>
			<option value="8">Member Last Channel ID</option>
			<option value="9">Member Hoist Role</option>
			<option value="10">Member Color Role</option>
			<option value="11">Member Highest Role</option>
			<option value="12">Member Roles Amount</option>
			<option value="13">Member Role List</option>
			<option value="14">Member Hex Color</option>
			<option value="15">Member Server</option>
			<option value="16">Member Custom Status</option>
			<option value="17">Member Status</option>
			<option value="18">Member Avatar URL</option>
      <option value="19">Member Is Deafened?</option>
      <option value="20">Member Member Is Bannable?</option>
      <option value="21">Member Is in Voice Channel?</option>
      <option value="22">Member is Muted?</option>
      <option value="23">Member Owner ID</option>
      <option value="24">Member Created At</option>
      <option value="25">Member Created Timestamp</option>
      <option value="26">Member Joined At</option>
      <option value="27">Member Joined Timestamp</option>
      <option value="28">Member Permission List</option>
      <option value="29">Member Flags List</option>
      <option value="30">Member Client Status</option>
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
</div>`;
	},

	//---------------------------------------------------------------------
	// Action Editor Init Code
	//
	// When the HTML is first applied to the action editor, this code
	// is also run. This helps add modifications or setup reactionary
	// functions for the DOM elements.
	//---------------------------------------------------------------------

	init: function() {
		const { glob, document } = this;

		glob.memberChange(document.getElementById("member"), "varNameContainer");
	},

	//---------------------------------------------------------------------
	// Action Bot Function
	//
	// This is the function for the action within the Bot's Action class.
	// Keep in mind event calls won't have access to the "msg" parameter,
	// so be sure to provide checks for variable existance.
	//---------------------------------------------------------------------

	action: function(cache) {
		const data = cache.actions[cache.index];
		const member = parseInt(data.member);
		const varName = this.evalMessage(data.varName, cache);
		const info = parseInt(data.info);
		const mem = this.getMember(member, varName, cache);
		if(!mem) {
			this.callNextAction(cache);
			return;
		}
		let result;
		switch(info) {
			case 0:
				result = mem;
				break;
			case 1:
				result = mem.id;
				break;
			case 2:
				if(mem.user) {
					result = mem.user.username;
				}
				break;
			case 3:
				result = mem.displayName;
				break;
			case 4:
				result = this.dest(mem.user, "discriminator");
				break;
			case 5:
				result = this.dest(mem.user, "tag");
				break;
			case 6:
				result = mem.lastMessage;
				break;
			case 7:
				result = mem.lastMessageID;
				break;
			case 8:
				result = mem.lastMessageChannelID;
				break;
			case 9:
				result = this.dest(mem.roles, "hoist");
				break;
			case 10:
				result = this.dest(mem.roles, "color");
				break;
			case 11:
				result = this.dest(mem.roles, "highest");
				break;
			case 12:
				this.dest(mem.roles, "cache", "size");
				break;
			case 13:
				 if(this.dest(mem.roles, "cache")) {
					result = mem.roles.cache.array();
				}
				break;
			case 14:
				result = mem.displayHexColor;
				break;
			case 15:
				result = mem.guild;
				break;
			case 16:
				if(this.dest(mem.presence, "activities")) {
					const status = mem.presence.activities.filter((s) => s.type !== "CUSTOM_STATUS");
					result = status && this.dest(status[0], "name");
				}
				break;
			case 17:
				if(this.dest(mem.presence, "status")) {
					const status = mem.presence.status;
					if(status === "online") result = "Online";
					else if(status === "offline") result = "Offline";
					else if(status === "idle") result = "Idle";
					else if(status === "dnd") result = "Do Not Disturb";
				}
				break;
			case 18:
				if(mem.user) {
					result = mem.user.displayAvatarURL({ dynamic: true, format: "png", size: 4096 });
				}
				break;
			case 19:
				result = this.dest(mem.voice, "deaf");
				break;
			case 20:
				result = mem.bannable;
				break;
			case 21:
				result = this.dest(mem.voice, "channel");
				break;
			case 22:
				result = this.dest(mem.voice, "mute");
				break;
			case 23:
				if(this.dest(mem.guild, "ownerID")) {
					result = mem.id === mem.guild.ownerID;
				}
				break;
			case 24:
				result = this.dest(mem.user, "createdAt");
				break;
			case 25:
				result = this.dest(mem.user, "createdTimestamp");
				break;
			case 26:
				result = mem.joinedAt;
				break;
			case 27:
				result = mem.joinedTimestamp;
				break;
			case 28:
				mem.permissions && mem.permissions.toArray();
				break;
			case 29:
				const flags = this.dest(mem.user, "flags");
				result = flags && flags.toArray();
				break;
			case 30:
				const status = this.dest(mem.presence, "clientStatus");
				result = status && Object.keys(status); 
				break;
			default:
				break;
		}
		if(result !== undefined) {
			const storage = parseInt(data.storage);
			const varName2 = this.evalMessage(data.varName2, cache);
			this.storeValue(result, storage, varName2, cache);
		}
		this.callNextAction(cache);
	},

	//---------------------------------------------------------------------
	// Action Bot Mod
	//
	// Upon initialization of the bot, this code is run. Using the bot's
	// DBM namespace, one can add/modify existing functions if necessary.
	// In order to reduce conflictions between mods, be sure to alias
	// functions you wish to overwrite.
	//---------------------------------------------------------------------

	mod: function() {}
}; // End of module
