import { React,useEffect, useContext, useState } from 'react';        //importing required artifacts from react
import { useNavigate, useLocation } from "react-router-dom";        //importing required artifacts from react-router-dom
import { storage } from '../../firebase';         //importing storage artifacts from our firebase config
import { ref,listAll, uploadBytesResumable, getDownloadURL } from "firebase/storage";         //importing required artifacts from firebase
import { db } from "../../firebase";          //importing database from our firebase config
import { collection, getDocs, setDoc, doc, deleteDoc, } from "firebase/firestore";      

import './ShowDocument.css'
import Header from "../../Components/Header/Header";        //importing header from components
import Footer from "../../Components/Footer/Footer";        //importing footer from components
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner"       //importing loading spinner from components



function ShowDocument() {
    const { state } = useLocation();      //importing state from previous page
    const {file} = state;      //file from previous state
    const {project} = state;      //project from previous state
    const fileRef = ref(storage, "files/");         //files in storage reference
    const [Url, setUrl] = useState('');            // url for file which is about to be displayed
    const [isLoading, setIsLoading] = useState(true);       //state to check if site data is loading
    let navigate = useNavigate();         //navigator used to navigate between pages

    useEffect(() => {
      /* download all the files url from storage*/
      listAll(fileRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            if(url.includes(file.file)){setUrl(url);}  
          });

        });
          setIsLoading(false);      //change is loading state to false after retrival of files
      });

    }, []);
    /* a function which delete a specified document*/
    function onDeleteDoc(){
      const doc = project.Documents.filter(object => {
        return object.filename !== file.filename;
      })
      /* update documents into database */
      updatedocs(doc);  
    }
    const updatedocs = async (newarr) => {
      //handles updating Documents array into the database
      await setDoc(
        doc(db, "Projects", project.id),
        {
          Documents: newarr,
        },
        { merge: true }
      );
      alert("Document Deleted");
      goBack();
    };
  /* change path to landing to unable changes to reflect*/
    const goBack = () => {
        navigate(-1);
    };
    return (
        <div>
          <div>
            <Header />
          </div>
          <div >
            <div className='filename'>{file.filename}</div>
            {isLoading && <div> <LoadingSpinner /> </div>}
            {!isLoading &&
            <div>
              <object width="100%" height="700px" data={Url} type="application/pdf" >   </object>
            </div>} 
        </div>
        <button className='delete-doc-btn' onClick={() => onDeleteDoc()}>Delete Document</button>
          <div>
            <Footer />
          </div> 
        </div>
    )
}
export default ShowDocument