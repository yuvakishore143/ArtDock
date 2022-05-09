import { useNavigate } from "react-router-dom";





const NotLoginErrorPage = () => {


     const navigator = useNavigate()

    return ( 
        <>
        <h1 style={{
            color:'rgb(9, 101, 168)',
            position:'absolute',
            left:'25%',
            top:'40%',
        }}> 
            To access the website you need to login with college email Id
        </h1>
        <button onClick={()=>navigator('/')} style={{
                                                     backgroundColor:'#f5a742',
                                                     position:'absolute',
                                                     top:'55%',
                                                     left:'45%',
                                                     width:'200px',
                                                     height:'50px',
                                                     color:'whitesmoke',
                                                     fontWeight:'bold',
                                                     borderRadius:'10px'
                                                       }}
                                                       >Go to login page</button>
        </>
     );
}
 
export default NotLoginErrorPage;