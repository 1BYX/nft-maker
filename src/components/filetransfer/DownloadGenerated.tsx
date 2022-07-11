import React, { useState } from 'react'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { IoutputArrays } from '../../interfaces/outputArrays'

const DownloadGenerated: React.FC<IoutputArrays> = ({ imageArray, jsonArray, jsonSingleFile }) => {
  console.log('imageaarray -> ', imageArray)
  const downloadFile = () => {
    let zip = new JSZip()
    let imgs = zip.folder('images')
    let metadata = zip.folder('metadata')

    for (let i = 0; i < imageArray.length; i++) {
      const unformattedUrl = imageArray[i]?.generatedImage
      if (unformattedUrl) {
        const b64urlSplit = unformattedUrl.split(',')
        const b64url = b64urlSplit[1]
        if (b64url) {
          imgs?.file(`${i}.png`, b64url, {
            base64: true,
          })
        }
      }
    }

    for (let j = 0; j < jsonArray.length; j++) {
      const jsonObj = jsonArray[j]?.generatedJson
      if (jsonObj) {
        metadata?.file(`${j}.json`, jsonObj)
      }
    }

    metadata?.file('_metadata', jsonSingleFile)

    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, 'new-collection')
    })
  }

  return (
    <div className=''>
      <button
        className='px-6 py-4 text-2xl border text-accent1 bg-accent7 border-accent7'
        onClick={downloadFile}>
        download
      </button>
    </div>
  )
}

export default DownloadGenerated
