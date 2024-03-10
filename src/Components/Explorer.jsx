import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import SourceIcon from '@mui/icons-material/Source';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import '../styles/expolore.css'
import {useEffect, useCallback, useState, useRef} from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import ExtensionIcon from '@mui/icons-material/Extension';
import libs from'../pylib/libraries.json'
import DownloadIcon from '@mui/icons-material/Download';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {saveAs} from 'file-saver'


export default function LeftPanel(props) {

  const {fileList, instance, showExamples, setShowExamples, code, setCode} = props
  const [activeFile, setActive] = useState('main.py')
  const [pylib, setLibs] = useState([])
  const [up, setup] = useState(0)
  const [reservedFiles, setReservedFiles] = useState(['main.py', 'boot.py', 'uploader.py'])
  const fileInputRef = useRef()


  const delIconRef = useRef([])

  const getFiles = () => {
  
      
      if (instance.isConnected){
        instance.reqFiles = true
        instance.getFiles()
        // instance.clear_console()
      }
  
  }

  useEffect(() => {
  

    pylib.forEach(e => {
      if (fileList.includes(e.name)){
        e.installed = true
      }
    })

  }, [fileList])

  useEffect(() => {

      let libList = []

      libs.forEach((e) => {
        
        let installed = false

        if (fileList.includes(e.name)){
          installed = true 
        }

        libList.push({
          name: e.name,
          installed: installed,
          content : e.content
        })
        


      })


      setLibs(libList)
      console.log(libList)



  }, [libs, instance.isConnected, fileList])

  
  const savePyFile = () => {
        
    const blb = new Blob([code], {text: 'text/plain;charset=utf-8'})
    saveAs(blb, 'index.py')
  
}

const openFile = (e) => {
  console.log('File input event:', e);
  const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target.result;
      console.log('File content:', content);
      setCode(content)
      // Now you can set the code state with the content if needed
      // setCode(content);
    };

    reader.readAsText(file);
  } else {
    console.error('No file selected.');
  }
};

  return (

    <div className='LeftPanel'>
      <Accordion>

        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          className='fileExpolere'
          onClick={getFiles}
        >
          <div className="headExp">
              <SourceIcon className='expIcon' style={{fill: "rgb(128, 128, 255)"}}/>
              <h3 className="expTitle">Files</h3>
          </div>
        </AccordionSummary>

        <AccordionDetails>

          {
            fileList.map((e, i) => {
              let dis = 'grid'

              const deleteFile = (e) => {
                if (reservedFiles.includes(e)){
                  alert("This file cannot be deleted ! ")
                }else{
                  instance.deleteFile(e)

                  getFiles()
                }
              }
              
              return <>
                <div className={`fileContainer`}>

                  <div className={`left ${e == activeFile ? 'activeFile' : ''}`}
                  onMouseOver={() => {
                    delIconRef.current[i].style.display = 'grid'
                  }}
                  onMouseLeave={() => {
                    delIconRef.current[i].style.display = 'none'
                  }}
                  onClick={() => {
                    // setActive(e)
                  }}
                  >
                    <h3 className={`filaName`}>{e}</h3>
                    <DeleteIcon className={`delIcon`}
              
                      ref={el => delIconRef.current[i] = el}
                      onClick={() => {
                        deleteFile(e)

                        setTimeout(() => {
                          getFiles()
                        }, 200)
                      }}
                      />
                  </div>

                  
                </div>
              </>
            })
          }

          <div className="fileButtons">
            <button className="save" onClick={() => {savePyFile()}}>Save</button>
            

            <input
              type="file"
              ref={fileInputRef}
              onClick={openFile}
              accept=".py"
              style={{ display: 'none' }}
            />
            <button className="open" onClick={() => {
              fileInputRef.current.click()
            }}>
              Open
          </button>
          </div>

          

          <div className="refreshFiles">
            <RefreshIcon className='refreshIcon' onClick={getFiles}/>
          
          </div>

        </AccordionDetails>


      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
        <div className="headExp">
              <LightbulbIcon className='expIcon examples' style={{fill: "rgb(255, 235, 16)"}}/>
              <h3 className="expTitle">Examples</h3>
              
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="examplesBtnCon">
            <button className="ex" onClick={() => {
              setShowExamples(true)
            }}>View Examples</button>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
          onClick={getFiles}
        >
        <div className="headExp">
              <ExtensionIcon className='expIcon libraries' style={{fill: "orange"}}/>
              <h3 className="expTitle">Libraries</h3>
              
          </div>
        </AccordionSummary>
        
        <AccordionDetails>
       
          
         <div className="libSet">
            {
              instance.isConnected ? pylib.map(e => {
                return <>
                  <div className="lib">
                    <h2 className='libName'> {e.name} </h2>
                    {e.installed ? <CheckCircleIcon 
                            className='libIcon' /> 
                          : 
                            <DownloadIcon className='libIcon' onClick={() => {
                              
                              let cd = e.content.split('\n');
                              cd = cd.map(line => line + '\n');
                              instance.installLib(e.name, cd)
                              instance.getFiles()
                            }}/> }
                  </div>
                </>
              }) 
              :
              <h2>-</h2>
            }
         </div>

        </AccordionDetails>
       
      </Accordion>

    
    </div>
  );
}