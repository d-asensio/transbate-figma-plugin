interface NodeIntlMetadata {
  nodeId: string
  tag: string
  languages: Record<string, string>
}


init()

function init() {
  figma.showUI(__html__);
  sendSelectedTextNodeDataToUI()

  figma.ui.onmessage = handleUIMessage
}

function sendSelectedTextNodeDataToUI() {
  const selectedTextNode = getSelectedTextNode()
  const payload = getNodeMetadata(selectedTextNode)

  figma.ui.postMessage({
    type: 'text-selected',
    payload
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
    const editedNode = figma.getNodeById(msg.payload.nodeId)
    setNodeMetadata(editedNode, msg.payload)
    editedNode.setRelaunchData({
      edit: ''
    })

  }

  figma.closePlugin();
}

function getNodeMetadata(node: BaseNode): NodeIntlMetadata {
  const tag = node.getPluginData("tag")
  const languages = node.getPluginData("languages") || "{}"
  console.log(languages)
  return {
    nodeId: node.id,
    tag,
    languages: JSON.parse(languages),
  }
}

function setNodeMetadata(node: BaseNode, {tag, languages}: NodeIntlMetadata) {
  node.setPluginData("tag", tag)
  node.setPluginData("languages", JSON.stringify(languages))
}
