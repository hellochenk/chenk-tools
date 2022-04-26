// 工具函数 粘贴剪切板
const fallbackCopyTextToClipboard = (text?:string) => {
  const textArea = document.createElement('textarea')
  textArea.value = text || eMailAddress

  // Avoid scrolling to bottom
  textArea.style.top = '0'
  textArea.style.left = '0'
  textArea.style.position = 'fixed'
  textArea.style.opacity = '0'

  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  try {
    const successful = document.execCommand('copy')
    if (successful) {
      // do something
    }
  } catch (err) {
    // do something
  }

  document.body.removeChild(textArea)
}

const copyTextToClipboard = (text?:string) => {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text || eMailAddress)
    return
  }
  navigator.clipboard.writeText(text || eMailAddress).then(() => {
    // do something
  }).catch(() => null) // pass
  // do something
}
