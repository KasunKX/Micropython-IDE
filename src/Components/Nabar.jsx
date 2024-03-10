import logo from '../res/logo.png'
import UsbOffIcon from '@mui/icons-material/UsbOff';
import UsbIcon from '@mui/icons-material/Usb';
import {useState, useCallback, useEffect} from 'react'


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
                <h2 className='title'>Micropython</h2>
                <h2 className="live">Live</h2>
            </div>

            <div className="right">
                <button className="connect" onClick={connectDevice}>
                        {
                            connection ? <UsbIcon/> : <UsbOffIcon/>
                        }

                        {
                            connection ? 'Disconnect' : 'Connect'
                        }
                </button>
            </div>
        </nav>
    </>
}

export default Navbar