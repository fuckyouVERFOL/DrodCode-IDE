# DrodCode Architecture & IPC API Reference 📡

## Main - Renderer IPC Channels

### File Operations (`IPC_CHANNELS.FILE`)
- `file:read`: Reads UTF-8 file content.
- `file:write`: Writes content to disk.
- `file:delete`: Removes file or directory recursively.
- `file:list-dir`: Scans directory entries.

### Terminal Operations (`IPC_CHANNELS.TERMINAL`)
- `terminal:create`: Spawns node-pty instance.
- `terminal:input`: Sends user keystrokes to shell.
- `terminal:resize`: Synchronizes cols/rows dimension.

### Git Version Control (`IPC_CHANNELS.GIT`)
- `git:status`: Returns staged/unstaged file list and branch commits.
- `git:commit`: Creates new local commit.
- `git:push` / `git:pull`: Syncs with remote repositories.
