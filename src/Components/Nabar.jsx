import logo from '../res/logo.png'
import UsbOffIcon from '@mui/icons-material/UsbOff';
import UsbIcon from '@mui/icons-material/Usb';
import {useState, useCallback, useEffect} from 'react'
import remote from '../res/wifi-solid.svg'


const Navbar = (props) => {

    const {connection, setCon, instance, setOut, output} = props

    const connectDevice = async () => {
        let a = await instance.connect_serial(setOut, output)
        setCon(a)
        console.log(a)
    }


    return <>
        <nav>
            <div className="left">
                <img src={logo} alt="" />
                <h2 className='title'>Robot as a Service</h2>
            
                    <img src={remote} className='remote' alt="" />
                
            </div>

            <div className="right">
                {/* <button className="connect" onClick={connectDevice}>
                        {
                            connection ? <UsbIcon/> : <UsbOffIcon/>
                        }

                        {
                            connection ? 'Disconnect' : 'Connect'
                        }
                </button> */}
            </div>
        </nav>
    </>
}

export default Navbar