import fs from 'fs'
import clipboard from 'clipboardy'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const clipboard_history_path = path.resolve(__dirname, '../data/clipboard_history.json')

export function getClipboardHistory() {
  return importClipboardHistoryJson()
}

export function updateClipboardHistory() {
  const currClipboardValue = clipboard.readSync()
  const clipboard_history = importClipboardHistoryJson()

  if (clipboard_history.length > 0){
    const lastIndex = clipboard_history.length - 1
    if (clipboard_history[lastIndex] == currClipboardValue) return
  }

  const data = JSON.stringify([...clipboard_history, currClipboardValue])
  fs.writeFileSync(clipboard_history_path, data, (err) => { console.log(err)})
}

function importClipboardHistoryJson(){
  const data = fs.readFileSync(clipboard_history_path)
  return JSON.parse(data)
}
