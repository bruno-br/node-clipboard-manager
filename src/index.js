import blessed from 'blessed'
import { Table } from './widgets.js'
import { getClipboardHistory, updateClipboardHistory } from './clipboard_manager.js'

const prefixLength = 4
const maxValueLength = 20

const screen = blessed.screen()
const clipboardTable = Table({
  keys: true,
  vi: true,
  fg: 'white',
  selectedFg: 'white',
  selectedBg: 'blue',
  interactive: true,
  label: 'Clipboard History',
  width: '50%',
  height: '50%',
  border: { type: "line", fg: "white" },
  columnSpacing: 4,
  columnWidth: [18, 36]
})

clipboardTable.focus()
screen.append(clipboardTable)

clipboardTable.setData({
  headers: [' '.repeat(prefixLength) + 'Titles', 'Values'],
  data: getClipboardTableData()
})

screen.key(['escape', 'q', 'C-c'], function (ch, key) {
  return process.exit(0)
})

screen.render()

function getClipboardTableData() {
  updateClipboardHistory()

  const result = []
  const clipboardHistory = getClipboardHistory()

  for (let count = 0; count < clipboardHistory.length; count++) {
    const value = formatClipboardValue(clipboardHistory[count])
    result.push([`[${count}] Clipboard ${count}`, value])
  }

  return result
}

function formatClipboardValue(value) {
  if (value.length > maxValueLength)
    value = `${value.slice(0, maxValueLength)}...`
  return JSON.stringify(value)
}
