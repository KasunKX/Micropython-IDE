import LeftPanel from "./Components/Explorer"
import Navbar from "./Components/Nabar"
import Editor from "./Components/Editor"
import Console from "./Components/Console"
import './styles/styles.css'
import {useState, useEffect, useRef, useMemo, useCallback} from 'react'
import Micropython from "./Micropython/mp"
import CloseIcon from '@mui/icons-material/Close';
import examples from './examples/exp.json'
import ImageList from "./ImageList"
import scripts from "./exampleCode"
import {useLocation, useNavigate} from 'react-router-dom'


const App = () => {

    const [isConnected, setIsConnected] = useState(false)
    const [files, setFiles] = useState([])
    const [output, setOutput] = useState('')
    const [code, setCode] = useState('#')
    const [showExamples, setShowExamples] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    const pythonInstance = useRef(new Micropython(files, setFiles))

    useEffect(() => {
    
        pythonInstance.current.clear_console()
    }, [files])

    const ExamplesPop = () => {


        return <>
            <div className="ExamplesPop"style={showExamples? {display: 'grid'} : {display: 'none'}} >
            
                <div className="content">
                    <div className="navExmp">
                        <h1 className="headTitle">Examples</h1>
                        <CloseIcon className='closeExamples' onClick={() => {
                            setShowExamples(false)
                        }}/>
                    </div>
                        
                    <div className="tiles">
                        {
                            examples.map((item, index) => {
                               
                                return <>
                                    <div className="exampleTile">
                                        <img src={ImageList[index]} alt="example" />
                                        
                                        <div className="tileContent">
                                            <h1 className="title">{item.Proj_title}</h1>
                                            <p className="description">{item.Proj_desc}</p>

                                            <div className="tute">
                                                <button className="code" onClick={() => {
                                                    let cd = fetch(scripts[index]).then(e => {
                                                        return e.text()
                                                    })
                                                    cd.then(e => {
                                                        setCode(e)
                                                    })
                                               
                                                    setShowExamples(false)
                                                }}>
                                                    code
                                                </button>
                                                
                                                <button className="learn">
                                                    <a href={item.Proj_tutorial} target="_blank" rel="noreferrer">Learn </a>
                                                </button>

                                            </div>

                                        </div>
                                    </div>
                                </>
                            })
                        }
                    </div>

                </div>
    
            </div>
        </>
    }

    useEffect(() => {

        try{
            location.state.authenticated ? console.log("Ok") : navigate('/')
        }catch{
            navigate('/')
        }
        
       
        fetch(scripts[0]).then(e => {
            return e.text()
        }).then(e => {
            // console.log(e)
        })
    }, [])

    const updateConsole = useCallback((newValue) => {

        
        setOutput(e => e+newValue)
        console.log(output)
        

    }, [output])

    return <>

        <Navbar connection={isConnected}
            setCon={setIsConnected} 
            instance={pythonInstance.current} 
            setOut={setOutput} 
            output={output}
        />

        <div className="container" style={showExamples ? {filter: 'blur(5px)'} :  {filter: 'none'}} onClick={() => {
            if(showExamples){
                setShowExamples(false)
            }
        }}>

            <div className="leftExplorer gridCom">
                <LeftPanel fileList={files} 
                    instance={pythonInstance.current} 
                    code={code} setCode={setCode} 
                    showExamples={showExamples} 
                    setShowExamples={setShowExamples}/>
            </div>

            <div className="middle gridCom">
                <Editor 
                    instance={pythonInstance.current} 
                    code={code} setCode={setCode}
                    output={output} setOut={setOutput}/>
            </div>

            <div className="right gridCom">
                <Console 
                    output={output} 
                    setOut={setOutput}
                    updateConsole={updateConsole}
                    />
            </div>
        </div>

        <ExamplesPop/>
    
    </>
}

export default App