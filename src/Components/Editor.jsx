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

    const {instance, code, setCode, output, setOut} = props 
    const codemirror = useRef()

    const runCode = () => {
        setOut("Writing Your Code on Device....")
        
        setTimeout(() => {
            setOut("Executing...")
            setTimeout(() => {
                setOut('')
            }, 2000)
        }, 7000)

        localStorage.setItem("userCode", code)
        let send = code.replace(/print/g, 'act.mqtt_print')
        let mod = "from actions import act\n"

        let sending = document.createElement("h2")

        send = mod + send

        // Analog Values Modification
        let importAnalogMod = 'from mod_input import modify_analog, dhtSensor \n' // import modified class instead of ADC
        send = importAnalogMod + send

 
        // Comment atten
        send = send.replace(/\(ADC/g, '#');
        send = send.replace('atten(', 'atten#')

        // Modify if PotentioMeter defined
        send = send.replace('ADC(Pin(39))', 'modify_analog(39)')
        send = send.replace('ADC(Pin(39, Pin.IN))', 'modify_analog(39)')  
        send = send.replace('ADC(Pin(39,Pin.IN))', 'modify_analog(39)') 
        send = send.replace('machine.ADC(machine.Pin(39))', 'modify_analog(39)')
        send = send.replace('machine.ADC(machine.Pin(39, Pin.IN))', 'modify_analog(39)')
        send = send.replace('machine.ADC(machine.Pin(39,Pin.IN))', 'modify_analog(39)')
       
        
        // Modify if LDR defined
        // send = send.replace('ADC(Pin(36))', 'modify_analog(36)')
        // send = send.replace('ADC(Pin(36, Pin.IN))', 'modify_analog(36)')
        // send = send.replace('ADC(Pin(36,Pin.IN))', 'modify_analog(36)')
        // send = send.replace('machine.ADC(machine.Pin(36))', 'modify_analog(36)')
        // send = send.replace('machine.ADC(machine.Pin(36, Pin.IN))', 'modify_analog(36)')
        // send = send.replace('machine.ADC(machine.Pin(36,Pin.IN))', 'modify_analog(36)')

        // Modify if DHT11 Defined
        send = send.replace('dht.DHT11(machine.Pin(26))', 'dhtSensor(26)')
        send = send.replace('dht.DHT11(Pin(26))', 'dhtSensor(26)')
        send = send.replace('DHT11(Pin(26))', 'dhtSensor(26)')

        send = send.replace('ADC(Pin(5))', 'modify_analog(5)')
        send = send.replace('ADC(Pin(5, Pin.IN))', 'modify_analog(5)')
        send = send.replace('ADC(Pin(5,Pin.IN))', 'modify_analog(5)') 
        send = send.replace('machine.ADC(machine.Pin(5))', 'modify_analog(5)')
        send = send.replace('machine.ADC(machine.Pin(5, Pin.IN))', 'modify_analog(5)')

        send = send.replace('machine.Pin(35, machine.Pin.IN)', 'modify_analog(35)')
        send = send.replace('Pin(35, Pin.IN)', 'modify_analog(35)') 
        send = send.replace('Pin(35,Pin.IN)', 'modify_analog(35)') 
        send = send.replace('Pin(35)', 'modify_analog(35)')   

        // machine.Pin(35, Pin.IN)
        send = send.replace('machine.Pin(34, machine.Pin.IN)', 'modify_analog(34)')
        send = send.replace('Pin(34, Pin.IN)', 'modify_analog(34)')  
        send = send.replace('Pin(34,Pin.IN)', 'modify_analog(34)')
        send = send.replace('Pin(34)', 'modify_analog(34)')

        // Ultrasonic 
        send = send.replace('HCSR04(5)', 'modify_analog(5)')
        send = send.replace('HCSR04(05)', 'modify_analog(5)')
        send = send.replace('.distance_cm', '.read')

       
        fetch(`https://dpapi.magicbit.cc:8888/sendCode/08d1f9d0a1d0/`, { // 30
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({code: send}),
        })
    }

    const stopCode = () => {
        
        fetch(`https://dpapi.magicbit.cc:8888/sendCode/08d1f9d0a1d0/`, { // 30
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({code: ''}),
        })

        setOut("Execution Terminated !")
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