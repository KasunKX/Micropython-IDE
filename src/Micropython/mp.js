class Micropython {

    constructor (files, setFiles){
        this.isConnected = false
        this.out = undefined
        this.setFiles = setFiles
        this.setOut = undefined
        this.reqFiles = false
        this.fileList = files
        this.out = ''
        this.canGetFiles = false
        this.blockMessages = false
        this.readFile = false
        this.readVal = ''
    }

    async connect_serial(setOut, out){
        
        if (this.isConnected == false){
            this.port = await navigator.serial.requestPort()

            await this.port.open({
                baudRate : 115200
            })

            this.writer = this.port.writable.getWriter();
            this.reader = this.port.readable.getReader();

            this.setOut = setOut
            this.init()

            this.isConnected = true
            this.readLoop(setOut, out)
        
            return this.isConnected
        
        }else{
            window.location.reload()
        }

        return this.isConnected

    }

    async readLoop(setOut, out){
        while (true){
            const { value, done } = await this.reader.read();
            let val = new TextDecoder().decode(value);

            if (val.includes("ignore") == false && val.includes("uploader.writeCode") == false && val.includes("uploader.clearFile") == false && val.includes("import uploader") == false){
                
                if (this.blockMessages == false){
                    this.out += val
                    setOut(this.out)
                    
                } 

                
                
            }

            let inputString = `import os
>>> print(os.listdir())
['boot.py', 'executer.py', 'hcsr04.py', 'main.py', 'ssd1306.py', 'uploader.py']
>>> file=open('main.py', 'r')
>>> print(file.read())
for i in range(100):
  print(i) 

print("completed")

>>>`;

          

            

        }
    }

    async init(setOut){

        this.stop_code()
    
        let uploader = `
from machine import reset

def writeCode(code, filename):
    with open(filename, "a") as file:
        file.write(str(code))
        file.close()

def clearFile(filename):
    with open(filename, "w") as file:
        file.write('')
        file.close()

            `

           
            let lines = uploader.split('\n');
            this.sendCommand("ignorethis = open('uploader.py', 'w')");
            this.sendCommand("ignorethis.write('')");
            this.sendCommand("ignorethis.close()");

            this.sendCommand("ignorethis = open('uploader.py', 'a')");
            
            
            this.blockMessages = true
            for (let i = 0; i < lines.length; i++) {
                setTimeout(() => {
                 
                    let line = lines[i];
                    this.sendCommand(`ignorethis.write('''${line}\\n''')`);
                
                    if (i == lines.length - 1){
                        this.sendCommand("ignorethis.close()");
                        this.setOut('Successfully Connected ! ')
                        this.sendCommand("import uploader")
                        this.blockMessages = false
                        this.setOut('Successfully Connected ! ')
                    }
                }, 1000 * (i*0.1))

            }
            // this.setOut("Device Connected ! ")
        
    
    }

    async sendCommand(command) {
        const encoder = new TextEncoder("utf-8")
        
        let a = await this.writer.write(encoder.encode(command + '\r\n'))
        
        

        // Read and log the output
        
    }

    clear_console(){
        if (this.isConnected){
            this.out = ''
            this.setOut('')
        }
    }

    runCode(code, filename, mod){
        this.blockMessages = true
        this.stop_code()
        this.clear_console()
        this.sendCommand("import uploader");
        this.sendCommand("uploader.clearFile('" + filename + "')");
        

        for (let i = 0; i < code.length; i++) {
            code[i].replace(/\n/g, '\\n')

            setTimeout(() => {
                // console.log(code[i])
                let line = code[i]
                line = line.replace(/\n/g, '\\n')
                
                this.sendCommand('uploader.writeCode("""' + line + '""", """' + filename + '""")');

                if (i == code.length - 1){
                    // console.log("done writing code")
                    this.sendCommand("from machine import reset;reset()")
                    this.sendCommand("reset()")
                    this.blockMessages = false
                    this.clear_console()
                     mod == 'main' ? console.log("its main") : this.sendCommand(`import ${mod}`)
                    
                }else{
                    // console.log("still writing code")
                }

            }, 1000 * (i * 0.1))
            
            
        }
    

    }

    stop_code(){
        if(this.isConnected){
            let arrays = new Uint8Array(1);
            arrays[0] = 0x03;
            //arrays[1] = 0x04

            this.writer.write(arrays)
            // this.runCode("","main.py", "main")
            this.clear_console()
        }
      
    }

    getFiles(){
        this.reqFiles = true
     
     
        this.sendCommand("import os");
        this.sendCommand("print(os.listdir())")

        const fileListRegex = /\['(.*?)'\]/g;
        
        let fileList = [];
        let match;
    
        while ((match = fileListRegex.exec(this.out)) !== null) {
            if (fileList != match[0]) {
            
                fileList = JSON.parse(match[0].replace(/'/g, '"'));
                
            }
        }

        this.setFiles(this.fileList)
        this.fileList = fileList

        if (this.fileList.toString().includes("boot.py")){
            this.reqFiles = false
            this.readFileContents()
        
        }
        console.log("Rading Content")
            
            
            
    }

    readFileContents() {
        try {
            // Send command to MicroPython device to read main.py file
            this.sendCommand("file=open('main.py', 'r')")
            this.readFile = true
            this.sendCommand("print(file.read())")
            this.readFile = false
            console.log(this.readVal)
    
        } catch (error) {
            console.error('Error reading main.py:', error);
            throw error;
        }
    }

    async installLib(name, content){
     
        this.sendCommand("import uploader");
        this.sendCommand("uploader.clearFile('" + name + "')");
        let percent = 0
        this.blockMessages = true

        for (let i = 0; i < content.length; i++) {
            content[i].replace(/\n/g, '\\n')

            setTimeout(() => {
                // console.log(code[i])
               
                // line = line.replace(/\n/g, '\\n')
                let line = content[i]
                line = line.replace(/\n/g, '\\n')
                
                this.sendCommand('uploader.writeCode("""' + line + '""", """' + name + '""")');

            
                if (i == content.length - 1){
                    // console.log("done writing code")
                
                    
                    
                    this.setOut(`${name} Successfully Installed !`)

                    this.getFiles()
                    this.blockMessages = false
                    
                }else{
                    percent = Math.round((i/content.length) * 100)
                    this.setOut(`Installation progress : ${percent}%`)
                    
                    // console.log("still writing code")
                }

            }, 1000 * (i * 0.1))
            
            
        }
    
    }
        
    async deleteFile(file){
        this.sendCommand("import os")
        this.sendCommand("os.remove('" + file + "')")
        
    }

    async fileContent (file){
        this.sendCommand("# RFCTIAIOFRTRA")
    }

    clearUseless(){

    }

    
}

export default Micropython