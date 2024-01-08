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
  const clipboard_history = importClipboardHistoryJson()
  const curr_clipboard_value = getCurrentClipboardValue()

  if (curr_clipboard_value.length == 0) return

  if (clipboard_history.length == 0){
    const lastIndex = clipboard_history.length - 1
    if (clipboard_history[lastIndex] == curr_clipboard_value) return
  }

  const data = JSON.stringify([...clipboard_history, curr_clipboard_value])
  fs.writeFileSync(clipboard_history_path, data, () => {})
}

function importClipboardHistoryJson(){
  const data = fs.readFileSync(clipboard_history_path)
  return JSON.parse(data)
}

function getCurrentClipboardValue(){
  try {
    return clipboard.readSync()
  } catch (err) {
    return ''
  }
}
