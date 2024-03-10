import CodeMirror from '@uiw/react-codemirror';
import {python} from '@codemirror/lang-python'
import {javascript} from '@codemirror/lang-javascript'
import { aura } from '@uiw/codemirror-theme-aura';
import { eclipse } from '@uiw/codemirror-theme-eclipse';
// import DeleteIcon from '@mui/icons-material/Delete';
import CodeIcon from '@mui/icons-material/Code';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import {bbedit} from '@uiw/codemirror-theme-bbedit'
import {useState, useRef, useCallback} from 'react'

const Editor = (props) => {

    const {instance, code, setCode} = props 
    const codemirror = useRef()


    const runCode = () => {
        console.log("Running Code Func")
        let cd = code.split('\n');
        cd = cd.map(line => line + '\n');
      
        instance.runCode(cd, 'main.py', 'not')
    }

    const stopCode = () => {
        console.log("Stopping Code")
        instance.stop_code()
    }

    return <>
        
        <div className="editorContainer">

            <div className="compnav">
                    <div className="left">
                        <CodeIcon/>
                        <h2>Code Editor</h2>
                    </div>

                    <div className="buttons">
                        <button className="run btn-act" onClick={() => {runCode()}}>
                        <PlayArrowIcon/>
                        Run
                        </button>

                        <button className="stop btn-act" onClick={() => {stopCode()}}>
                            <StopIcon/>
                            Stop
                        </button>
                    </div>
                </div>

                <div className="editor">
                <CodeMirror
                    extensions={[python({ jsx: true })]}
                    value={code}
                    theme={bbedit}
                    className='codemirror'
                    height='83vh'  
                    ref={codemirror}
                    onChange={(value, viewUpdate) => {
                        setCode(value)
                    }}
                    
                />

                </div>
        </div>

    </>
}

export default Editor