import React, { useEffect, useState } from "react";
import bookService from "../../Services/book.service";
import livre1 from '../../Assets/Image/livre1.jpg'
import { saveAs } from 'file-saver'
import { toast } from "react-toastify";

function AccueilLibrairie() {

    const [book, setBook] = useState([])
    useEffect ( () => {
        bookService.getPublicBook()
            .then ((response) => {
                console.log(response.data.data)
                setBook(response.data.data);
               
            })
            .catch ((error) => console.error(error))
            .finally(() => console.log("Completed"))
     }, []);

     const DoawnloadBook = async (id, fileName) => {
        try{
          const {data} = await bookService.DownloadBook(id)
          const blob = new Blob([data], { type: 'application/pdf' })
          saveAs(blob, fileName )
          toast.success(data.message);
        }
        catch (error) {
          if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
          ) {
            toast.error(error.response.data.message);
          }
        }
      }
    
    
    

    return(
        <div>
          <div className= 'librairieContainer'> 
            <div className="grid grid-cols-3 gap-4" style={{marginTop: '8vh'}}>
                {
                    book.map((data, key) => 
                    <div key = {key} className = 'book'>
                        <div className="bookinfo">
                            <div className="fond"></div>
                            <div className='mx-auto text-white z-10 self-center uppercase tracking-widest sm-text'>
                                <h1 className="bookname">{data.title}</h1>
                                <p> partager par : </p>
                                <p style={{marginTop: '-1vh'}}> {data.userName} </p>
                                <p>{data.type}</p>
                            </div>
                        </div>
                        <img src={livre1} style={{width :'50vh' ,height : '60vh'}}/>
                    </div>
                    )
                }
            </div>
            <button className='mbutton' style={{marginLeft : '60vh', marginTop : '5vh', marginBottom: '15vh'}}>Voir plus</button>
            
        </div>
        </div>
       
     
    )
}

export default AccueilLibrairie