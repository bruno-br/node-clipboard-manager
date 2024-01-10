import blessed from 'blessed'

const screen = blessed.screen()

const getScreen = () => screen

const listenToKey = (keys, callback) => { screen.key(keys, callback) }

const appendComponent = (component) => { screen.append(component()) }

const render = () => { screen.render() }

export default {
  getScreen: getScreen,
  listenToKey: listenToKey,
  appendComponent: appendComponent,
  render: render
}
