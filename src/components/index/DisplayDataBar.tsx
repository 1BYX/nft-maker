import { useEffect, useState } from 'react'
import ZipTest from '../filetransfer/ZipTest'
import { trpc } from '../../utils/trpc'
import GENERATE from '../../server/engine/main'
import { IoutputArrays, TimageArray } from '../../interfaces/outputArrays'

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
  const [showProgress, setShowPropgress] = useState(false)

  const [generatedArrays, setGeneratedArrays] = useState<IoutputArrays>({
    imageArray: [],
    jsonArray: [],
    jsonSingleFile: '',
  })

  const [previewArray, setPreviewArray] = useState<Array<string>>([])

  const [isFinishedGenerating, setIsFinishedGenerating] = useState(false)

  useEffect(() => {
    determinePreviewArray()
  }, [isFinishedGenerating])

  const determinePreviewArray = () => {
    setPreviewArray([])
    if (generatedArrays.imageArray.length === config.amount) {
      let previews: Array<string> = []
      if (config.amount < 9 && previewArray.length < config.amount) {
        for (let i = 0; i < config.amount; i++) {
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
            if (previewElement) previews = [...previews, previewElement]
          }
        }
      } else if (config.amount >= 9 && previewArray.length < 9) {
        for (let i = 0; i < 9; i++) {
          if (config.amount < 200) {
            const previewElementId = Math.floor(Math.random() * config.amount)
            const previewElement = generatedArrays.imageArray[previewElementId]?.generatedImage
            if (previewElement) previews = [...previews, previewElement]
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

  const hasDuplicates = (array: Array<string>) => {
    if (array.length !== new Set(array).size) {
      return true
    } else {
      return false
    }
  }

  const updateIsFinishedGenerating = (finished: boolean) => {
    setIsFinishedGenerating(finished)
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
    setIsFinishedGenerating(false)
    console.log('generate is run')
    const getLayers = () => {
      console.log('getLayers is run')
      const unformattedLayers = localStorage.getItem('layers')
      if (unformattedLayers) {
        const layers = JSON.parse(unformattedLayers)
        console.log(layers)
        console.log(config)
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
          layersOrder: [
            {
              name: 'Background',
            },
            {
              name: 'Eyeball',
            },
            {
              name: 'Eye color',
            },
            {
              name: 'Iris',
            },
            {
              name: 'Shine',
            },
            {
              name: 'Bottom lid',
            },
            {
              name: 'Top lid',
            },
          ],
        },
      },
      updateGeneratedArrays,
      updateIsFinishedGenerating,
      updatePercentage
    )

    console.log('OUTPUT ARRAYS IN DISPLAYDATA ---> ', generatedArrays)
  }

  return (
    <div className='w-full h-full'>
      <div className='grid w-full py-10 px-8 border-b border-accent2 grid-cols-[1fr_max-content] items-center justify-end'>
        {showProgress ? (
          <div className='grid w-full grid-cols-[max-content_max-content] items-center gap-4 text-white justify-self-start'>
            <div className='w-32 h-2.5 bg-accent2'>
              <div className='bg-highlightYellow h-2.5' style={{ width: `${progress}%` }}></div>
            </div>
            <div>{progress}%</div>
          </div>
        ) : null}
        <div className='w-max justify-self-end'>
          <button
            type='button'
            onClick={generate}
            className='inline-flex items-center px-6 py-4 text-xl italic font-bold shadow-sm hover:bg-highlightYellowPressed text-accent1 bg-highlightYellow'>
            generate
          </button>
        </div>
      </div>
      {/* <div className='w-full'>
        <ZipTest />
      </div> */}
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
        <div className='grid p-8'>
          <h1 className='text-3xl text-accent7'>download</h1>
        </div>
      </div>
    </div>
  )
}

export default DisplayDataBar
