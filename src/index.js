import { main, toolbar, clipboardTable } from './components/index.js'

const exitKeys = ['escape', 'q', 'C-c']

function start() {
  main.appendComponent(clipboardTable)
  main.appendComponent(toolbar)
  main.listenToKey(exitKeys, () => { process.exit(0) })
  main.render()
}

start()
