import blessed from 'blessed'
import { Table } from './widgets.js'
import { getClipboardHistory } from './clipboard_manager.js'

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
    columnSpacing: 1,
    columnWidth: [16, 12]
})

clipboardTable.focus()
screen.append(clipboardTable)

clipboardTable.setData({
  headers: ['Index', 'Content'],
  data: getClipboardTableData()
})

screen.key(['escape', 'q', 'C-c'], function (ch, key) {
  return process.exit(0)
})

screen.render()

function getClipboardTableData() {
  const result = []
  const clipboardHistory = getClipboardHistory()

  for (let count = 0; count < clipboardHistory.length; count++) {
    result.push([count, clipboardHistory[count]])
  }

  return result
}
