import { useEffect, useState } from 'react'
import DownloadGenerated from '../filetransfer/DownloadGenerated'
import GENERATE from '../../server/engine/main'
import { IoutputArrays, TimageArray } from '../../interfaces/outputArrays'
import { sampleLayers } from '../filetransfer/temp-storage/sampleLayers'
import DNAerrorNotification from '../commons/DNAerrorNotification'

type IDisplayDataBar = {
  updateErrors: (errors: Array<any>) => void
  network: string
  collectionName: string
  description: string
  amount: string
  baseUri: string
  width: string
  height: string
  dnaTorrance: string
}

const DisplayDataBar: React.FC<IDisplayDataBar> = (config) => {
  const [progress, setProgress] = useState(0)
  const [showProgress, setShowProgress] = useState(false)

  const [generatedArrays, setGeneratedArrays] = useState<IoutputArrays>({
    imageArray: [],
    jsonArray: [],
    jsonSingleFile: '',
  })

  const [previewArray, setPreviewArray] = useState<Array<string | undefined>>([])
  const [isFinishedGenerating, setIsFinishedGenerating] = useState(true)

  const toggleShowProgress = (show: boolean) => {
    setShowProgress(show)
  }
  const [DNAerror, setDNAerror] = useState(false)

  const updateDNAerror = () => {
    setDNAerror(true)
    setShowProgress(false)
    setTimeout(() => {
      setDNAerror(false)
    }, 6000)
  }

  const validateConfig = () => {
    let errors: Array<string> = []
    if (config.network === '' || !config.network) {
      errors.push('network')
    }
    if (config.collectionName === '' || !config.collectionName) {
      errors.push('collectionName')
    }
    if (config.description === '' || !config.description) {
      errors.push('description')
    }
    if (Number(config.amount) === 0 || !config.amount) {
      errors.push('amount')
    }
    if (config.baseUri === '' || !config.baseUri) {
      errors.push('baseUri')
    }
    if (Number(config.width) === 0 || !config.width) {
      errors.push('width')
    }
    if (Number(config.height) === 0 || !config.height) {
      errors.push('height')
    }
    if (Number(config.dnaTorrance) === 0 || !config.dnaTorrance) {
      errors.push('dnaTorrance')
    }
    return errors
  }

  useEffect(() => {
    const determinePreviewArray = () => {
      setPreviewArray([])
      if (generatedArrays.imageArray.length === Number(config.amount)) {
        let previews: Array<string | undefined> = []
        for (let i = 0; i < 9; i++) {
          if (generatedArrays.imageArray[i]?.generatedImage) {
            previews = [...previews, generatedArrays.imageArray[i]?.generatedImage]
          }
        }
        setPreviewArray(previews)
      }
    }
    determinePreviewArray()
  }, [isFinishedGenerating])

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

  const generate = async () => {
    setDNAerror(false)
    const errors = validateConfig()
    if (errors.length === 0) {
      setIsFinishedGenerating(false)
      setShowProgress(true)
      const getLayers = () => {
        const unformattedLayers = localStorage.getItem('layers')
        if (unformattedLayers) {
          const layers = JSON.parse(unformattedLayers)
          return layers
        }
      }

      const layers = getLayers()

      try {
        GENERATE(
          layers,
          {
            format: {
              width: Number(config.width),
              height: Number(config.height),
            },
            baseUri: config.baseUri,
            description: config.description,
            uniqueDnaTorrance: Number(config.dnaTorrance),
            namePrefix: config.collectionName,
            network: config.network,
            layerConfigurations: {
              growEditionSizeTo: Number(config.amount),
            },
          },
          updateGeneratedArrays,
          updateIsFinishedGenerating,
          updatePercentage,
          toggleShowProgress,
          updateDNAerror
        )
      } catch (err) {
        console.log('error -> ', err)
      }
    } else {
      config.updateErrors(errors)
    }
  }

  const generateSample = () => {
    setDNAerror(false)
    setIsFinishedGenerating(false)
    setShowProgress(true)
    GENERATE(
      sampleLayers,
      {
        format: {
          width: Number(config.width),
          height: Number(config.height),
        },
        baseUri: config.baseUri,
        description: config.description,
        uniqueDnaTorrance: Number(config.dnaTorrance),
        namePrefix: config.collectionName,
        network: config.network,
        layerConfigurations: {
          growEditionSizeTo: Number(config.amount),
        },
      },
      updateGeneratedArrays,
      updateIsFinishedGenerating,
      updatePercentage,
      toggleShowProgress,
      updateDNAerror
    )
  }

  const abortGeneration = () => {
    setIsFinishedGenerating(true)
  }

  return (
    <div className='w-full h-full'>
      <div className='grid w-full p-6 lg:p-10 border-b border-accent2 grid-cols-[1fr_max-content_max-content] items-center justify-end'>
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
              className='px-1 text-sm border lg:text-base lg:px-2 lg:py-1 bg-background hover:bg-accent2 justify-self-start w-max border-accent7 text-accent7'>
              run sample
            </button>
          </div>
        )}
        <div className='w-max justify-self-end'>
          <button
            type='button'
            onClick={generate}
            disabled={!isFinishedGenerating}
            className={`${
              !isFinishedGenerating
                ? 'bg-accent2'
                : 'bg-highlightYellow hover:bg-highlightYellowPressed'
            } inline-flex items-center px-3 lg:px-6 py-2 lg:py-4 lg:text-2xl text-xl shadow-sm text-accent1`}>
            generate
          </button>
        </div>
      </div>
      {isFinishedGenerating && generatedArrays.imageArray.length > 0 && previewArray.length > 0 ? (
        <div className='grid w-full'>
          <div className='grid w-full border-b border-accent2'>
            <h1 className='pt-8 pl-8 text-3xl text-accent7'>preview</h1>
            <div className='grid grid-cols-3 gap-2 pt-8 pb-16 w-max md:gap-7 justify-self-center'>
              {previewArray.map((i, index) => (
                <div className='text-white w-max' key={index}>
                  <img className='w-20 sm:36 md:w-40' src={i} />
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
      <DNAerrorNotification
        show={DNAerror}
        closeShow={() => setDNAerror(false)}
        amount={Number(config.amount)}
      />
    </div>
  )
}

export default DisplayDataBar
