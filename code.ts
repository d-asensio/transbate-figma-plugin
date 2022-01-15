const {
  showUI,
  ui,
  currentPage,
  closePlugin
} = figma

init()

function init () {
  showUI(__html__);
  sendSelectedTextNodeDataToUI()

  ui.onmessage = handleMessage
}

function sendSelectedTextNodeDataToUI () {
  const { selection } = currentPage
  const selectedTextNode = selection.find(
      ({ type }) => type === 'TEXT'
  )

  const {id, characters} = selectedTextNode
  ui.postMessage({
    type: 'text-selected',
    payload: { id, characters }
  })
}

function handleMessage(msg) {
  if (msg.type === 'create-copy') {
    console.log('Creating copy', msg.payload)
  }

  closePlugin();
}
