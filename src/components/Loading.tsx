


type loadingState ={
    loading: boolean
}

const Loading = ({loading}:loadingState) => {
  return (
    <div className={`w-screen h-screen grid place-content-center text-2xl fixed top-0 z-10 bg-white ${loading ? '' : 'loadingContainer'}`}><p>Loading...</p> </div>
  )
}

export default Loading