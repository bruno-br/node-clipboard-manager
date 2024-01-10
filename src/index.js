import blessed from 'blessed'
import { table } from 'blessed-contrib'
import { getClipboardHistory, updateClipboardHistory } from './clipboard_manager.js'

const prefixLength = 4
const maxValueLength = 20

const screen = blessed.screen()
const clipboardTable = table({
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

const toolbarOptions = [
  '[N] New Group',
  '[S] Search',
  '[C] Clear',
  '[H] Help',
  '[O] Options'
]

screen.append(blessed.text({
  bottom: 2, 
  fg: 'black',
  bg: 'green',
  tags: true,
  align: 'center',
  content: toolbarOptions.join('\t'),
  left: 'center',
  width: '100%'
}))

screen.render()

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
