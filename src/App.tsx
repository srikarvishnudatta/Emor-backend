import {ChangeEvent, useState} from "react";



function App() {


    const [file, setFile] = useState<File |null>(null)
    const [result, setResult] = useState('')
    function handleFile(ev: ChangeEvent<HTMLInputElement>) {
        if (ev.target.files && ev.target.files.length > 0) {
            setFile(ev.target.files[0]);
        }
    }
    async function handleUpload(){
        if (file == null) return;

        const formData = new FormData();
        formData.append('image', file);


        const response = await fetch('http://127.0.0.1:5000/image', {
                    method:'POST',
                    body: formData
        })
        const resData = await response.json()
        setResult(resData[0])

    }
 return <div className={"mt-[100px]"}>
     <div className={"w-1/2 bg-gray-200 mx-auto text-center p-4 flex flex-col gap-5 justify-center items-center overflow-hidden"}>
         <h1 className={"Emor text-6xl text-bold "}>
             Emor
         </h1>
         <p className={"text-sm "}>Upload to a picture with the following emotions to identify the following emotions:

            Angry, Focused, Neutral and Tired
         </p>
         <input type="file" onChange={handleFile}/>
         <button onClick={handleUpload} className={"bg-blue-600 text-white px-4 py-2"}>Submit</button>
     </div>
     <div className={"w-1/2 mx-auto"}>
         <p>Emotion: {result}</p>
     </div>
 </div>
}

export default App
