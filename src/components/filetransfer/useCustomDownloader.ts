import useDownloader from 'react-use-downloader'

const useCustomDownloader = () => {
  const { size, elapsed, percentage, download, cancel, error, isInProgress } =
    useDownloader()
  return { size, elapsed, percentage, download, cancel, error, isInProgress }
}

export default useCustomDownloader
