import CodeMirror from '@uiw/react-codemirror';
import {python} from '@codemirror/lang-python'
import { aura } from '@uiw/codemirror-theme-aura';
import { materialDark } from '@uiw/codemirror-theme-material';
import DeleteIcon from '@mui/icons-material/Delete';
import TerminalIcon from '@mui/icons-material/Terminal';
import {useRef, useEffect} from 'react'

const Console = (props) => {

    const {output, setOut} = props
    const outRef = useRef()

    useEffect(() => {
        let interval = setInterval(() => {
            outRef.current.scrollTop = 900
            
        }, 1000);
        return () => clearInterval(interval)
      }, []);

    return <>
        
        <div className="Consolecontainer">

            <div className="compnav">
                <div className="left">
                    <TerminalIcon style={{fill: 'white'}}/>
                    <h2>Console</h2>
                </div>

                <DeleteIcon style={{fill: 'white'}} onClick={() => {setOut('')}}/>
            </div>

                <div className="consoleeditor" ref={outRef}>
                <CodeMirror
                    value={output}
                    theme={materialDark}
                    
                    className='codemirror-out'
                    height='83vh'
                    // extensions={python[({ jsx: true })]}
                    readOnly={true}

                    
                />
                </div>
        </div>

    </>
}

export default Console