import { useEffect, useState } from 'react'
import DownloadGenerated from '../filetransfer/DownloadGenerated'
import GENERATE from '../../server/engine/main'
import { IoutputArrays, TimageArray } from '../../interfaces/outputArrays'
import { sampleLayers } from '../filetransfer/temp-storage/sampleLayers'

type IDisplayDataBar = {
  network: string
  collectionName: string
  description: string
  amount: number
  baseUri: string
  width: number
  height: number
  dnaTorrance: number
}

const DisplayDataBar: React.FC<IDisplayDataBar> = (config) => {
  const [progress, setProgress] = useState(0)
  const [showProgress, setShowProgress] = useState(false)

  const [generatedArrays, setGeneratedArrays] = useState<IoutputArrays>({
    imageArray: [],
    jsonArray: [],
    jsonSingleFile: '',
  })

  const [previewArray, setPreviewArray] = useState<Array<string>>([])
  const [isFinishedGenerating, setIsFinishedGenerating] = useState(true)
  const [isCancelled, setIsCancelled] = useState(false)

  const toggleShowProgress = (show: boolean) => {
    setShowProgress(show)
  }

  useEffect(() => {
    const determinePreviewArray = () => {
      setPreviewArray([])
      if (generatedArrays.imageArray.length === config.amount) {
        let previews: Array<string> = []
        if (config.amount < 9 && previewArray.length < config.amount) {
          for (let i = 0; i < config.amount; i++) {
            const previewElementId = Math.floor(Math.random() * config.amount)
            const previewElement = generatedArrays.imageArray[previewElementId]?.generatedImage
            if (previewElement) {
              previews = [...previews, previewElement]
              if (hasDuplicates(previews)) {
                previews.pop()
                i--
              }
            }
          }
        } else if (config.amount >= 9 && previewArray.length < 9) {
          for (let i = 0; i < 9; i++) {
            if (config.amount < 200) {
              const previewElementId = Math.floor(Math.random() * config.amount)
              const previewElement = generatedArrays.imageArray[previewElementId]?.generatedImage
              if (previewElement) {
                previews = [...previews, previewElement]
                if (hasDuplicates(previews)) {
                  previews.pop()
                  i--
                }
              }
            } else {
              const previewElementId = Math.floor(Math.random() * 200)
              const previewElement = generatedArrays.imageArray[previewElementId]?.generatedImage
              if (previewElement) {
                previews = [...previews, previewElement]
                if (hasDuplicates(previews)) {
                  previews.pop()
                  i--
                }
              }
            }
          }
        }
        setPreviewArray(previews)
      }
    }
    determinePreviewArray()
  }, [isFinishedGenerating])

  const hasDuplicates = (array: Array<string>) => {
    if (array.length !== new Set(array).size) {
      return true
    } else {
      return false
    }
  }

  const updateIsFinishedGenerating = (finished: boolean) => {
    setIsFinishedGenerating(finished)
    setProgress(100)
  }

  const updateGeneratedArrays = ({ imageArray, jsonArray, jsonSingleFile }: IoutputArrays) => {
    setGeneratedArrays({
      imageArray: imageArray,
      jsonArray: jsonArray,
      jsonSingleFile: jsonSingleFile,
    })
  }
  const updatePercentage = (percentage: number) => {
    setProgress(percentage)
  }

  const getCancelFlag = () => {
    return isCancelled
  }

  const generate = async () => {
    setIsFinishedGenerating(false)
    setIsCancelled(false)
    setShowProgress(true)
    const getLayers = () => {
      const unformattedLayers = localStorage.getItem('layers')
      if (unformattedLayers) {
        const layers = JSON.parse(unformattedLayers)
        return layers
      }
    }

    const layers = getLayers()

    GENERATE(
      layers,
      {
        format: {
          width: config.width,
          height: config.height,
        },
        baseUri: config.baseUri,
        description: config.description,
        uniqueDnaTorrance: config.dnaTorrance,
        namePrefix: config.collectionName,
        network: config.network,
        layerConfigurations: {
          growEditionSizeTo: config.amount,
        },
      },
      updateGeneratedArrays,
      updateIsFinishedGenerating,
      updatePercentage,
      toggleShowProgress,
      getCancelFlag
    )
  }

  const generateSample = () => {
    setIsFinishedGenerating(false)
    setIsCancelled(false)
    setShowProgress(true)
    GENERATE(
      sampleLayers,
      {
        format: {
          width: config.width,
          height: config.height,
        },
        baseUri: config.baseUri,
        description: config.description,
        uniqueDnaTorrance: config.dnaTorrance,
        namePrefix: config.collectionName,
        network: config.network,
        layerConfigurations: {
          growEditionSizeTo: config.amount,
        },
      },
      updateGeneratedArrays,
      updateIsFinishedGenerating,
      updatePercentage,
      toggleShowProgress,
      getCancelFlag
    )
  }

  const abortGeneration = () => {
    setIsFinishedGenerating(true)
  }

  return (
    <div className='w-full h-full'>
      <div className='grid w-full p-10 border-b border-accent2 grid-cols-[1fr_max-content_max-content] items-center justify-end'>
        {showProgress ? (
          <div className='grid w-full grid-cols-[max-content_max-content] items-center gap-4 text-white justify-self-start'>
            <div className='w-32 h-2.5 bg-background'>
              <div className='bg-accent7 h-2.5' style={{ width: `${progress}%` }}></div>
            </div>
            <div>{progress}%</div>
          </div>
        ) : (
          <div className='w-full'>
            <button
              onClick={generateSample}
              className='px-2 py-1 border bg-background hover:bg-accent2 justify-self-start w-max border-accent7 text-accent7'>
              run sample
            </button>
          </div>
        )}
        {!isFinishedGenerating ? (
          <div className='pr-8 w-max justify-self-end'>
            <button
              onClick={() => setIsCancelled(true)}
              id='cancelNftGeneration'
              className='px-2 py-1 border bg-background border-accent7 text-accent7'>
              cancel
            </button>
          </div>
        ) : null}
        <div className='w-max justify-self-end'>
          <button
            type='button'
            onClick={generate}
            disabled={!isFinishedGenerating}
            className={`${
              showProgress ? 'bg-accent2' : 'bg-highlightYellow hover:bg-highlightYellowPressed'
            } inline-flex items-center px-6 py-4 text-2xl shadow-sm text-accent1`}>
            generate
          </button>
        </div>
      </div>
      {isFinishedGenerating && generatedArrays.imageArray.length > 0 ? (
        <div className='grid w-full'>
          <div className='grid w-full border-b border-accent2'>
            <h1 className='pt-8 pl-8 text-3xl text-accent7'>preview</h1>
            <div className='grid grid-cols-3 pt-8 pb-16 w-max gap-7 justify-self-center'>
              {previewArray.map((i) => (
                <div className='text-white w-max' key={i}>
                  <img className='w-48' src={i} />
                </div>
              ))}
            </div>
          </div>
          <div className='grid p-8 justify-items-center'>
            <h1 className='text-3xl text-accent7 justify-self-start'>get your stuff</h1>
            <div className='my-16 w-max'>
              <DownloadGenerated
                imageArray={generatedArrays.imageArray}
                jsonArray={generatedArrays.jsonArray}
                jsonSingleFile={generatedArrays.jsonSingleFile}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className='grid items-center w-full text-2xl h-1/2 justify-items-center text-accent2'>
          <p>no data yet...</p>
        </div>
      )}
    </div>
  )
}

export default DisplayDataBar
