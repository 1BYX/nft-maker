import React from 'react'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import useDownloader from 'react-use-downloader'
import { useState } from 'react'
import useCustomDownloader from './useCustomDownloader'

const ZipTest: React.FC = () => {
  const { size, elapsed, percentage, download, cancel, error, isInProgress } =
    useCustomDownloader()
  const downloadFiles = () => {
    let zip = new JSZip()

    zip.file('hello.txt', 'hello world\n')

    zip.generateAsync({ type: 'blob' }).then(function (content) {
      saveAs(content, 'example.zip')
    })

    const fileUrl = 'example.zip'
    const filename = 'example.zip'

    download(fileUrl, filename)
  }

  return (
    <div className='w-max'>
      <button className='w-24 h-16 bg-accent7'>generate zip</button>
      <button className='w-24 h-16 bg-accent7' onClick={downloadFiles}>
        download
      </button>
      {/* <button className='w-24 h-16 bg-accent7' onClick={() => cancel()}>
        cancel
      </button> */}
    </div>
  )
}

export default ZipTest
