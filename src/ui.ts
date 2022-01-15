onmessage = handleMessage

const tagInputEl = $('tag-input') as HTMLInputElement
const englishInputEl = $('english-input') as HTMLInputElement
const saveButtonEl = $('save-button') as HTMLButtonElement

saveButtonEl.onclick = handleSaveClick

function handleSaveClick() {
  sendMessage({
    type: 'create-copy',
    payload: {
      tag: tagInputEl.value,
      languages: {
        en: englishInputEl.value
      }
    }
  })
}

function handleMessage({data}) {
  const {type, payload} = data.pluginMessage
  if (type === 'text-selected') {
    englishInputEl.value = payload.characters
  }
}

function sendMessage(message) {
  parent.postMessage({pluginMessage: message}, '*')
}

function $(elementId) {
  return document.getElementById(elementId)
}
