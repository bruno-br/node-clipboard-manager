import blessed from 'blessed'

const toolbarOptions = [
  '[N] New Group',
  '[S] Search',
  '[C] Clear',
  '[H] Help',
  '[O] Options'
]

export default () => blessed.text({
  bottom: 2,
  fg: 'black',
  bg: 'green',
  tags: true,
  align: 'center',
  content: toolbarOptions.join('\t'),
  left: 'center',
  width: '100%'
})

