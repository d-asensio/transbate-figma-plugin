init()

function init() {
  figma.showUI(__html__);
  sendSelectedTextNodeDataToUI()

  figma.ui.onmessage = handleUIMessage
}

function sendSelectedTextNodeDataToUI() {
  const selectedTextNode = getSelectedTextNode()

  const {id, characters} = selectedTextNode
  figma.ui.postMessage({
    type: 'text-selected',
    payload: {id, characters}
  })
}

function getSelectedTextNode() {
  const {selection} = figma.currentPage
  const selectedTextNode = selection.find(
    ({type}) => type === 'TEXT'
  )

  return selectedTextNode as TextNode
}

function handleUIMessage(msg) {
  if (msg.type === 'create-copy') {
    console.log('Creating copy', msg.payload)
  }

  figma.closePlugin();
}
