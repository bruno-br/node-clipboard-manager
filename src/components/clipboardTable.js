import blessed from 'blessed-contrib'
import { getClipboardHistory, updateClipboardHistory } from '../clipboard_manager.js'

const prefixLength = 4
const maxValueLength = 20

export default () => {
  const clipboardTable = blessed.table({
    align: 'center',
    left: 'center',
    keys: true,
    vi: true,
    fg: 'white',
    selectedFg: 'black',
    selectedBg: 'green',
    interactive: true,
    label: 'Clipboard History',
    width: '80%',
    height: '80%',
    border: { type: "line", fg: "green" },
    columnSpacing: 4,
    columnWidth: [18, 36],
  })

  clipboardTable.focus()

  clipboardTable.setData({
    headers: [' '.repeat(prefixLength) + 'Titles', 'Values'],
    data: getClipboardTableData()
  })

  return clipboardTable
}

function getClipboardTableData() {
  updateClipboardHistory()

  const result = []
  const clipboardHistory = getClipboardHistory()

  for (let count = 0; count < clipboardHistory.length; count++) {
    const title = `[${count}] Clipboard ${count}`
    const value = formatClipboardValue(clipboardHistory[count])
    result.push([title, value])
  }

  return result
}

function formatClipboardValue(value) {
  if (value.length > maxValueLength)
    value = `${value.slice(0, maxValueLength)}...`
  return JSON.stringify(value)
}
