import CodeMirror from '@uiw/react-codemirror';
import {python} from '@codemirror/lang-python'
import { aura } from '@uiw/codemirror-theme-aura';
import { materialDark } from '@uiw/codemirror-theme-material';
import DeleteIcon from '@mui/icons-material/Delete';
import TerminalIcon from '@mui/icons-material/Terminal';
import {useRef, useEffect, useState} from 'react'
import { Client, Message } from 'paho-mqtt';

const Console = (props) => {

    const {output, setOut, updateConsole} = props
    const outRef = useRef()
    const [device, setDevice] = useState("08d1f9d0a1d0")
 

    const [stream, setStream] = useState("https://st2.magicbit.cc:1015/player/BOT30")

    const brokerUrl = 'broker.hivemq.com'; // HiveMQ broker URL
    const brokerPort = 8884; // HiveMQ broker port number
    const clientId = `client-${Math.random().toString(16).substr(2, 8)}`; // Generate a unique client ID
    
    const client = new Client(brokerUrl, brokerPort, clientId);

    const options = {
        useSSL: true,
        onSuccess: onConnect,
        
      };
 
    
    client.connect(options);

    const subbedRef = useRef(false)
    
    function onConnect() {
        if (!subbedRef.current){
            client.unsubscribe(`dpb/${device}/out`);
            client.subscribe(`dpb/${device}/out`);

            subbedRef.current = true;
            
        }
    }

    const onMessage = (message) => {

        let recievedMessage  = message.payloadString
        let fromTopic = message.topic    

        if (fromTopic === `dpb/${device}/out`){
            let newOut = recievedMessage + '\n'
            updateConsole(newOut)
            outRef.current.scrollTop = outRef.current.height
        }
    
    }

    client.onMessageArrived = onMessage

    useEffect(() => {
        console.log('Connecting to MQTT broker...');
        
        


    }, [])


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

                <div className="consoleeditor" >

                <CodeMirror
                    value={output}
                    theme={materialDark}
                    
                    className='codemirror-out'
                    height='50vh'
                    // extensions={python[({ jsx: true })]}
                    readOnly={true}
                    ref={outRef}
                />

                <div className="stream cmca">
                    <iframe id="livestream" controls="" autoplay="" muted="" src={stream}></iframe>
                </div>

                </div>
        </div>

    </>
}

export default Console