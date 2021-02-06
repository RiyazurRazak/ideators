import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

function Loading({isLoading}) {
    return (
        <>

         <Backdrop className="backdrop" open={isLoading} >
             <CircularProgress color="inherit" thickness={5.5} size={60} />
         </Backdrop>
            
        </>
    )
}

export default Loading
